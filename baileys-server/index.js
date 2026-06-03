// ═══════════════════════════════════════════════════════════
// Inkfetish Baileys WhatsApp Session Server — index.js
// Port: 3001 | Sessions: ./baileys-sessions/default/
// ═══════════════════════════════════════════════════════════
'use strict';

const express = require('express');
const cors = require('cors');
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

// Baileys imports — using CJS require pattern for v6
const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  Browsers,
  isJidGroup,
} = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');

// ─── Config ──────────────────────────────────────────────
const PORT = process.env.BAILEYS_PORT || 3001;
const SESSION_DIR = path.join(__dirname, 'baileys-sessions', 'default');

// ─── State ───────────────────────────────────────────────
let sock = null;
let connectionStatus = 'disconnected'; // 'disconnected' | 'connecting' | 'qr_pending' | 'connected'
let currentQR = null;         // base64 data URL of latest QR
let sseClients = [];           // SSE response objects for QR streaming
let retryCount = 0;
let retryTimeout = null;

// ─── Logger (silent in prod so it doesn't spam terminal) ─
const logger = pino({ level: 'silent' });

// ─── Ensure session dir exists ───────────────────────────
if (!fs.existsSync(SESSION_DIR)) {
  fs.mkdirSync(SESSION_DIR, { recursive: true });
}

// ─── Helpers ─────────────────────────────────────────────
function toJID(phone) {
  // Strip everything non-digit, then append @s.whatsapp.net
  const clean = String(phone).replace(/\D/g, '');
  return `${clean}@s.whatsapp.net`;
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function broadcastSSE(event, data) {
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  sseClients = sseClients.filter(res => {
    try {
      res.write(payload);
      return true;
    } catch {
      return false;
    }
  });
}

// ─── Core: Create/Restore Baileys Session ────────────────
async function createSession() {
  if (retryTimeout) {
    clearTimeout(retryTimeout);
    retryTimeout = null;
  }

  // Gracefully terminate old socket to prevent multiple concurrent connections (Code 440 conflict)
  if (sock) {
    console.log('[Baileys] Terminating existing socket connection before launching fresh session...');
    try {
      sock.ev.removeAllListeners('connection.update');
      sock.ev.removeAllListeners('creds.update');
      sock.end();
    } catch (err) {
      console.log('[Baileys] Error terminating old socket:', err.message);
    }
    sock = null;
  }

  console.log('[Baileys] Creating session from:', SESSION_DIR);
  connectionStatus = 'connecting';
  broadcastSSE('status', { status: 'connecting' });

  // Load saved auth state (empty on first run, persisted on subsequent runs)
  const { state, saveCreds } = await useMultiFileAuthState(SESSION_DIR);
  const { version } = await fetchLatestBaileysVersion();
  console.log('[Baileys] Using WA Web version:', version.join('.'));

  sock = makeWASocket({
    version,
    auth: state,
    browser: Browsers.ubuntu('Inkfetish Campaign Wizard'),
    logger,
    printQRInTerminal: false,     // We handle QR via SSE
    markOnlineOnConnect: false,   // Anti-ban: don't appear online
    connectTimeoutMs: 60_000,
    keepAliveIntervalMs: 30_000,
    syncFullHistory: false,
  });

  // ────────────────────────────────────────────────────────
  // CRITICAL: Save credentials on every update
  // Signal protocol rotates keys on every message — must always save
  // ────────────────────────────────────────────────────────
  sock.ev.on('creds.update', saveCreds);

  // ─── Connection lifecycle handler ─────────────────────
  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    // New QR code generated — push to all SSE clients
    if (qr) {
      connectionStatus = 'qr_pending';
      retryCount = 0;
      console.log('[Baileys] QR generated — pushing to browser');
      try {
        currentQR = await QRCode.toDataURL(qr, {
          errorCorrectionLevel: 'M',
          margin: 2,
          scale: 8,
          color: { dark: '#000000', light: '#ffffff' },
        });
        broadcastSSE('qr', { qr: currentQR, expiresIn: 20 });
        broadcastSSE('status', { status: 'qr_pending' });
      } catch (err) {
        console.error('[Baileys] QR generation failed:', err.message);
      }
    }

    if (connection === 'open') {
      connectionStatus = 'connected';
      currentQR = null;
      retryCount = 0;
      console.log('[Baileys] ✅ WhatsApp connected!');
      broadcastSSE('status', { status: 'connected' });
    }

    if (connection === 'close') {
      const error = lastDisconnect?.error;
      const statusCode = (error instanceof Boom) ? error.output?.statusCode : undefined;

      console.log('[Baileys] Connection closed. Code:', statusCode);

      // loggedOut = user removed device from phone → delete session & ask for QR again
      if (statusCode === DisconnectReason.loggedOut) {
        console.log('[Baileys] Logged out — clearing session creds');
        connectionStatus = 'disconnected';
        currentQR = null;
        broadcastSSE('status', { status: 'disconnected', reason: 'logged_out' });
        // Delete saved creds so next connect shows QR
        try {
          fs.rmSync(SESSION_DIR, { recursive: true, force: true });
          fs.mkdirSync(SESSION_DIR, { recursive: true });
        } catch {}
        // Reconnect fresh to show QR
        setTimeout(createSession, 2000);
        return;
      }

      // badSession or multideviceMismatch → same as logged out
      if (statusCode === DisconnectReason.badSession || statusCode === DisconnectReason.multideviceMismatch) {
        console.log('[Baileys] Bad/mismatched session — clearing and reconnecting');
        try {
          fs.rmSync(SESSION_DIR, { recursive: true, force: true });
          fs.mkdirSync(SESSION_DIR, { recursive: true });
        } catch {}
        setTimeout(createSession, 2000);
        return;
      }

      // All other cases: reconnect with exponential backoff
      // NOTE: undefined error after QR scan is NORMAL — do NOT treat as failure
      connectionStatus = 'connecting';
      broadcastSSE('status', { status: 'connecting' });

      retryCount++;
      const delay = Math.min(1000 * Math.pow(2, retryCount - 1), 30000) + Math.random() * 1000;
      console.log(`[Baileys] Reconnecting in ${(delay / 1000).toFixed(1)}s (attempt ${retryCount})`);
      retryTimeout = setTimeout(createSession, delay);
    }
  });

  return sock;
}

// ─── Express App ─────────────────────────────────────────
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ─────────────────────────────────────────────────────────
// GET /status  →  current session state
// ─────────────────────────────────────────────────────────
app.get('/status', (req, res) => {
  res.json({
    status: connectionStatus,
    hasQR: !!currentQR,
    retries: retryCount,
  });
});

// ─────────────────────────────────────────────────────────
// GET /qr-stream  →  SSE stream that pushes QR + status events
// ─────────────────────────────────────────────────────────
app.get('/qr-stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.flushHeaders();

  // Send current status immediately on connect
  res.write(`event: status\ndata: ${JSON.stringify({ status: connectionStatus })}\n\n`);

  // If QR is already available, push it right away
  if (currentQR && connectionStatus === 'qr_pending') {
    res.write(`event: qr\ndata: ${JSON.stringify({ qr: currentQR, expiresIn: 20 })}\n\n`);
  }

  sseClients.push(res);

  // Heartbeat every 15s to keep connection alive through proxies
  const heartbeat = setInterval(() => {
    try { res.write(': ping\n\n'); } catch { clearInterval(heartbeat); }
  }, 15000);

  req.on('close', () => {
    clearInterval(heartbeat);
    sseClients = sseClients.filter(c => c !== res);
  });
});

// ─────────────────────────────────────────────────────────
// POST /send  →  send a single WhatsApp message
// Body: { to, text, mediaUrl?, mediaType?, mediaFilename?, mediaMimetype? }
// ─────────────────────────────────────────────────────────
app.post('/send', async (req, res) => {
  if (connectionStatus !== 'connected' || !sock) {
    return res.status(503).json({ success: false, error: `WhatsApp not connected. Status: ${connectionStatus}` });
  }

  const { to, text, mediaUrl, mediaType, mediaFilename, mediaMimetype } = req.body;

  if (!to) {
    return res.status(400).json({ success: false, error: 'Missing required field: to' });
  }

  const jid = toJID(to);

  try {
    let result;

    if (mediaUrl && mediaType) {
      // Media message
      switch (mediaType) {
        case 'image':
          result = await sock.sendMessage(jid, {
            image: { url: mediaUrl },
            caption: text || '',
            mimetype: mediaMimetype || 'image/jpeg',
          });
          break;
        case 'video':
          result = await sock.sendMessage(jid, {
            video: { url: mediaUrl },
            caption: text || '',
          });
          break;
        case 'document':
          result = await sock.sendMessage(jid, {
            document: { url: mediaUrl },
            fileName: mediaFilename || 'file',
            mimetype: mediaMimetype || 'application/octet-stream',
            caption: text || '',
          });
          break;
        case 'audio':
          result = await sock.sendMessage(jid, {
            audio: { url: mediaUrl },
            mimetype: mediaMimetype || 'audio/mpeg',
            ptt: false,
          });
          break;
        default:
          return res.status(400).json({ success: false, error: `Unknown mediaType: ${mediaType}` });
      }
    } else {
      // Plain text message
      result = await sock.sendMessage(jid, { text: text || '' });
    }

    console.log(`[Baileys] ✅ Sent to ${jid} — msgId: ${result?.key?.id}`);
    res.json({ success: true, messageId: result?.key?.id, jid });
  } catch (err) {
    console.error(`[Baileys] ❌ Send failed to ${jid}:`, err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─────────────────────────────────────────────────────────
// GET /groups  →  list all WhatsApp groups this number is in
// ─────────────────────────────────────────────────────────
app.get('/groups', async (req, res) => {
  if (connectionStatus !== 'connected' || !sock) {
    return res.status(503).json({ success: false, error: `WhatsApp not connected. Status: ${connectionStatus}` });
  }

  try {
    const groups = await sock.groupFetchAllParticipating();
    const groupList = Object.values(groups).map(g => ({
      chat_id: g.id,
      name: g.subject || g.id,
      participant_count: g.participants?.length || 0,
      description: g.desc || '',
    }));

    // Sort by name
    groupList.sort((a, b) => a.name.localeCompare(b.name));

    res.json({ success: true, data: { chats: groupList } });
  } catch (err) {
    console.error('[Baileys] ❌ Failed to fetch groups:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─────────────────────────────────────────────────────────
// GET /group/:jid/members  →  get all participants of a group
// ─────────────────────────────────────────────────────────
app.get('/group/:jid/members', async (req, res) => {
  if (connectionStatus !== 'connected' || !sock) {
    return res.status(503).json({ success: false, error: `WhatsApp not connected. Status: ${connectionStatus}` });
  }

  const groupJid = decodeURIComponent(req.params.jid);

  try {
    const meta = await sock.groupMetadata(groupJid);
    const participants = (meta.participants || []).map(p => ({
      jid: p.id,
      phone: p.id.split('@')[0],
      name: p.name || p.notify || p.id.split('@')[0],
      role: p.admin === 'admin' ? 'admin' : p.admin === 'superadmin' ? 'admin' : 'member',
    }));

    res.json({
      success: true,
      data: {
        id: meta.id,
        subject: meta.subject,
        participants,
      },
    });
  } catch (err) {
    console.error('[Baileys] ❌ Failed to fetch group members:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─────────────────────────────────────────────────────────
// POST /logout  →  disconnect and clear session
// ─────────────────────────────────────────────────────────
app.post('/logout', async (req, res) => {
  try {
    if (sock) {
      try { await sock.logout(); } catch {}
      sock = null;
    }
    // Clear saved creds so QR appears next time
    fs.rmSync(SESSION_DIR, { recursive: true, force: true });
    fs.mkdirSync(SESSION_DIR, { recursive: true });

    connectionStatus = 'disconnected';
    currentQR = null;
    broadcastSSE('status', { status: 'disconnected', reason: 'manual_logout' });

    // Start fresh (will show QR)
    setTimeout(createSession, 1000);
    res.json({ success: true, message: 'Logged out. QR will appear shortly.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─────────────────────────────────────────────────────────
// Health check
// ─────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ ok: true, status: connectionStatus, uptime: process.uptime() });
});

// ─── Boot ─────────────────────────────────────────────────
app.listen(PORT, async () => {
  console.log(`\n[Baileys] 🚀 Server started on http://localhost:${PORT}`);
  console.log(`[Baileys] Sessions stored at: ${SESSION_DIR}`);
  console.log(`[Baileys] QR stream: http://localhost:${PORT}/qr-stream`);
  console.log(`[Baileys] Status:    http://localhost:${PORT}/status\n`);
  await createSession();
});
