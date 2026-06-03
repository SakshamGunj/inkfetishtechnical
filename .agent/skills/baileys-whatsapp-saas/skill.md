---
name: baileys-whatsapp-saas
description: >
  MASTER production-grade skill for building WhatsApp automation SaaS using Baileys
  (@whiskeysockets/baileys or the new "baileys" package). Use this skill for ANY task
  involving WhatsApp bots, QR-based session auth, multi-session management, bulk messaging,
  webhooks, REST API wrappers, Socket.io real-time QR delivery, Redis/PostgreSQL session
  storage, rate limiting, anti-ban strategies, message queues, Prisma schema design,
  Docker deployment, or anything related to a WhatsApp SaaS platform. Trigger for phrases
  like: "WhatsApp bot", "Baileys", "WhatsApp automation", "QR login WhatsApp", "WhatsApp
  SaaS", "send WhatsApp message", "WhatsApp multi-session", "WA API", "WhatsApp bulk",
  "WhatsApp webhook", "connect WhatsApp", "WhatsApp session", or anything that involves
  programmatic interaction with WhatsApp. This skill is the SINGLE SOURCE OF TRUTH for
  Baileys — always consult it before writing any Baileys-related code. Do NOT attempt to
  build without reading this skill first.
---

# ═══════════════════════════════════════════════════════
# BAILEYS WHATSAPP SAAS — ULTIMATE PRODUCTION SKILL
# ═══════════════════════════════════════════════════════

> **This skill is the complete, production-grade playbook for building a WhatsApp
> automation SaaS with Baileys. Every section is mandatory reading before writing code.**

---

## TABLE OF CONTENTS

1. [What Is Baileys & Why It Works](#1-what-is-baileys)
2. [Package Installation & Project Setup](#2-installation--project-setup)
3. [TypeScript Configuration](#3-typescript-configuration)
4. [Core Architecture: How QR Auth Actually Works](#4-qr-authentication--the-core-mechanism)
5. [Socket Configuration: All Options Explained](#5-socket-configuration-all-options)
6. [Connection Lifecycle & Reconnection Logic](#6-connection-lifecycle--reconnection-logic)
7. [QR Code Delivery to Frontend (SaaS Pattern)](#7-qr-code-delivery-to-frontend)
8. [Auth State — Dev vs Production Storage](#8-auth-state-storage)
9. [Redis Auth State Adapter (Production)](#9-redis-auth-state-production)
10. [PostgreSQL Auth State Adapter (Production)](#10-postgresql-auth-state-production)
11. [Multi-Session Manager (The SaaS Engine)](#11-multi-session-manager)
12. [Sending Every Message Type](#12-sending-messages--all-types)
13. [Receiving & Processing Messages](#13-receiving--processing-messages)
14. [Media Handling (Images, Docs, Audio, Video)](#14-media-handling)
15. [Groups Management](#15-groups-management)
16. [Webhooks: Outbound Event Delivery](#16-webhooks)
17. [REST API Layer (Full Express Server)](#17-rest-api-layer)
18. [Socket.io Real-time Layer](#18-socketio-real-time-layer)
19. [BullMQ Message Queue (Anti-Spam, Rate Limiting)](#19-message-queue--bullmq)
20. [Prisma Schema for Full SaaS](#20-prisma-schema)
21. [Anti-Ban Strategy & Rate Limits](#21-anti-ban-strategy)
22. [Error Handling & Disconnect Reason Codes](#22-error-handling--disconnect-codes)
23. [Logging with Pino](#23-logging-with-pino)
24. [Docker & Docker Compose](#24-docker--docker-compose)
25. [PM2 Process Management](#25-pm2-process-management)
26. [Environment Variables (Full .env)](#26-environment-variables)
27. [Complete SaaS Project Structure](#27-complete-project-structure)
28. [Common Bugs & Gotchas](#28-critical-bugs--gotchas)
29. [Security Checklist](#29-security-checklist)
30. [Baileys v7 Breaking Changes](#30-baileys-v7-breaking-changes)

---

## 1. WHAT IS BAILEYS

**Official package (new)**: `baileys`
**Old package (still works)**: `@whiskeysockets/baileys`
**Docs**: https://baileys.wiki
**GitHub**: https://github.com/WhiskeySockets/Baileys
**Discord**: https://whiskey.so/discord

> **IMPORTANT**: As of late 2025, the package was renamed from `@whiskeysockets/baileys`
> to just `baileys`. Both work, but new projects should use `baileys`. v7.0.0 introduced
> breaking changes — see Section 30.

Baileys is a **pure TypeScript/JavaScript implementation** of the WhatsApp Web WebSocket
protocol. It communicates directly with `wss://web.whatsapp.com` — no Selenium, no
Puppeteer, no headless Chrome.

| Feature | Baileys | Puppeteer-based libs |
|---|---|---|
| Headless | ✅ True headless | ❌ Requires Chrome |
| RAM | ~50 MB per session | 300–600 MB per session |
| Startup | <1 second | 5–10 seconds |
| Multi-device | ✅ Full MD support | ⚠️ Partial |
| TypeScript types | ✅ Full | ❌ None |
| Media streaming | ✅ Streams (no full buffer) | ⚠️ Flaky |
| Production stability | ✅ With proper handling | ❌ Poor |

---

## 2. INSTALLATION & PROJECT SETUP

### Initialize project
```bash
mkdir whatsapp-saas && cd whatsapp-saas
npm init -y
```

### Install core dependencies
```bash
# Core Baileys (use new package name for v7+)
npm install baileys

# OR for v6.x stable
npm install @whiskeysockets/baileys

# QR Code handling
npm install qrcode qrcode-terminal

# Sharp for image processing (peer dep of Baileys)
npm install sharp

# Boom for error handling (peer dep)
npm install @hapi/boom

# Express + Socket.io for REST API + real-time
npm install express socket.io cors helmet express-rate-limit

# Database (Prisma ORM)
npm install prisma @prisma/client

# Redis (for session storage + queue)
npm install ioredis bullmq

# Auth state adapters
npm install baileys-redis-auth   # Redis auth state
npm install baileysauth pg       # PostgreSQL auth state (optional)

# Validation
npm install zod

# Logging
npm install pino pino-pretty pino-http

# Utilities
npm install uuid dotenv axios

# Types
npm install -D typescript @types/node @types/express ts-node-dev
npm install -D @types/qrcode @types/cors
```

### Initialize Prisma
```bash
npx prisma init
```

---

## 3. TYPESCRIPT CONFIGURATION

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": false,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

`package.json` scripts:
```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate deploy"
  }
}
```

---

## 4. QR AUTHENTICATION — THE CORE MECHANISM

### How QR Auth Works (MUST understand this completely)

```
Step 1: makeWASocket() → opens WebSocket to wss://web.whatsapp.com
Step 2: WhatsApp sends a QR string → fires connection.update { qr: "..." }
Step 3: User scans QR with phone WhatsApp → Settings → Linked Devices
Step 4: WhatsApp sends credentials to Baileys → fires creds.update
Step 5: YOU MUST SAVE CREDS NOW → sock.ev.on('creds.update', saveCreds)
Step 6: WhatsApp disconnects briefly (NORMAL) → Baileys reconnects with creds
Step 7: connection.update { connection: 'open' } → you are live
Step 8: Next boot → saved creds exist → connects WITHOUT scanning QR again
```

**Critical facts:**
- QR codes expire in ~20 seconds — generate fresh on every `qr` event
- The post-scan disconnect with `undefined` error is NORMAL — do NOT treat as failure
- `loggedOut` disconnect = user manually unlinked device from phone — DELETE creds
- `creds.update` fires on EVERY message sent/received (Signal protocol key rotation)
  — you MUST save creds every time, not just once

### Minimal working connection (dev/test only)
```typescript
import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  Browsers,
} from 'baileys'
import { Boom } from '@hapi/boom'

async function connect() {
  const { state, saveCreds } = await useMultiFileAuthState('./auth')
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    auth: state,
    browser: Browsers.ubuntu('MyApp'),
    printQRInTerminal: true,
    markOnlineOnConnect: false,
  })

  // MUST be present — saves Signal protocol key state
  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update
    if (connection === 'close') {
      const code = (lastDisconnect?.error as Boom)?.output?.statusCode
      const shouldReconnect = code !== DisconnectReason.loggedOut
      if (shouldReconnect) connect()
      else console.log('Logged out — delete ./auth and re-scan')
    }
    if (connection === 'open') console.log('Connected!')
  })

  return sock
}

connect()
```

---

## 5. SOCKET CONFIGURATION: ALL OPTIONS

```typescript
import makeWASocket, {
  Browsers,
  fetchLatestBaileysVersion,
  makeInMemoryStore,
} from 'baileys'
import pino from 'pino'

const { version } = await fetchLatestBaileysVersion()

const sock = makeWASocket({
  // ─── Authentication ───────────────────────────────────
  auth: state,                          // REQUIRED: auth state from your adapter

  // ─── Version ──────────────────────────────────────────
  version,                              // Always fetch latest WA Web version
  // Hardcoded fallback: [2, 3000, 1015901307]

  // ─── Browser fingerprint ──────────────────────────────
  // Customize what WhatsApp sees as the connecting "browser"
  browser: Browsers.ubuntu('MySaaS'),   // Recommended for server
  // browser: Browsers.macOS('Desktop') // For desktop-style history sync
  // browser: Browsers.windows('Chrome')

  // ─── Logging ──────────────────────────────────────────
  logger: pino({ level: 'silent' }),    // Silence in production (see Section 23)

  // ─── QR / Connection ──────────────────────────────────
  printQRInTerminal: false,             // FALSE in production (handle via events)
  markOnlineOnConnect: false,           // Keep phone notifications working!
  connectTimeoutMs: 60_000,             // 60 second connection timeout
  keepAliveIntervalMs: 30_000,          // Heartbeat every 30 seconds

  // ─── History sync ─────────────────────────────────────
  syncFullHistory: false,               // TRUE only for desktop browser fingerprint
                                        // FALSE saves memory on multi-session SaaS

  // ─── Message retries ──────────────────────────────────
  maxMsgRetryCount: 5,                  // Retry failed message sends

  // ─── Store (optional in-memory) ───────────────────────
  // Only needed if you want to reply by quoting, look up messages
  // DO NOT use in-memory store in prod with many sessions — use Redis store

  // ─── Firewall / Proxy ─────────────────────────────────
  // agent: new HttpsProxyAgent(proxyUrl),  // Uncomment for proxy per session

  // ─── Mobile presence ──────────────────────────────────
  // mobile: false,  // Do not set to true — breaks things

  // ─── getMessage (needed for retries) ──────────────────
  // Baileys will call this when it needs to retry/re-decrypt a message
  getMessage: async (key) => {
    // Return the message from your DB if you have it stored
    return undefined  // return proto.IMessage if available
  },
})
```

---

## 6. CONNECTION LIFECYCLE & RECONNECTION LOGIC

This is where 80% of production bugs happen. Handle every case.

```typescript
// src/lib/connectionHandler.ts

import { DisconnectReason, ConnectionState } from 'baileys'
import { Boom } from '@hapi/boom'

export const DISCONNECT_REASONS = {
  [DisconnectReason.badSession]:         'badSession',         // 500 — bad creds, re-scan
  [DisconnectReason.connectionClosed]:   'connectionClosed',   // 428 — reconnect
  [DisconnectReason.connectionLost]:     'connectionLost',     // 440 — reconnect
  [DisconnectReason.connectionReplaced]: 'connectionReplaced', // 440 — another client took over
  [DisconnectReason.loggedOut]:          'loggedOut',          // 401 — DELETE session
  [DisconnectReason.forbidden]:          'forbidden',          // 403 — account banned
  [DisconnectReason.restartRequired]:    'restartRequired',    // 515 — reconnect
  [DisconnectReason.timedOut]:           'timedOut',           // 408 — reconnect
  [DisconnectReason.multideviceMismatch]:'multideviceMismatch',// 411 — re-scan
}

export type ReconnectAction = 'reconnect' | 'delete_and_rescan' | 'banned' | 'replaced'

export function getReconnectAction(error?: Error): ReconnectAction {
  if (!error) return 'reconnect'   // undefined error after QR scan = normal, reconnect

  const statusCode = (error as Boom)?.output?.statusCode

  switch (statusCode) {
    case DisconnectReason.loggedOut:
      return 'delete_and_rescan'    // User removed device from phone

    case DisconnectReason.badSession:
      return 'delete_and_rescan'    // Corrupted session, force re-scan

    case DisconnectReason.multideviceMismatch:
      return 'delete_and_rescan'    // MD protocol mismatch

    case DisconnectReason.forbidden:
      return 'banned'               // Account banned — stop retrying

    case DisconnectReason.connectionReplaced:
      return 'replaced'             // Another socket took this session

    case DisconnectReason.connectionClosed:
    case DisconnectReason.connectionLost:
    case DisconnectReason.restartRequired:
    case DisconnectReason.timedOut:
    default:
      return 'reconnect'            // Transient — safe to reconnect
  }
}

// Exponential backoff reconnection
export class ExponentialBackoff {
  private attempts = 0
  private readonly maxDelay = 60_000  // 60 seconds max
  private readonly baseDelay = 1_000  // 1 second base

  next(): number {
    const delay = Math.min(
      this.baseDelay * Math.pow(2, this.attempts),
      this.maxDelay
    )
    this.attempts++
    return delay + Math.random() * 1000  // Add jitter
  }

  reset() { this.attempts = 0 }
}
```

### Using the handler in your session
```typescript
const backoff = new ExponentialBackoff()

sock.ev.on('connection.update', async (update) => {
  const { connection, lastDisconnect, qr } = update

  if (qr) {
    backoff.reset()  // Reset backoff on fresh QR — good sign
    await handleQREvent(sessionId, qr)
  }

  if (connection === 'open') {
    backoff.reset()
    logger.info({ sessionId }, 'WhatsApp connected')
    await updateSessionStatus(sessionId, 'connected')
    io.to(sessionId).emit('status', { status: 'connected' })
  }

  if (connection === 'close') {
    const action = getReconnectAction(lastDisconnect?.error)

    switch (action) {
      case 'reconnect': {
        const delay = backoff.next()
        logger.info({ sessionId, delay }, 'Reconnecting...')
        await updateSessionStatus(sessionId, 'reconnecting')
        setTimeout(() => createSession(sessionId), delay)
        break
      }
      case 'delete_and_rescan': {
        logger.warn({ sessionId }, 'Session invalid — deleting creds')
        await deleteSessionCreds(sessionId)
        await updateSessionStatus(sessionId, 'disconnected')
        io.to(sessionId).emit('status', { status: 'disconnected', reason: 'logged_out' })
        break
      }
      case 'banned': {
        logger.error({ sessionId }, 'Account banned')
        await updateSessionStatus(sessionId, 'banned')
        io.to(sessionId).emit('status', { status: 'banned' })
        break
      }
      case 'replaced': {
        logger.warn({ sessionId }, 'Session replaced by another client')
        sessions.delete(sessionId)
        break
      }
    }
  }
})
```

---

## 7. QR CODE DELIVERY TO FRONTEND

In a SaaS, the QR code must be shown to the end user on the web dashboard.
Never print it to terminal in production. Two patterns:

### Pattern A: Socket.io (Recommended — real-time)
```typescript
// Server side
import QRCode from 'qrcode'
import { Server as IOServer } from 'socket.io'

async function handleQREvent(sessionId: string, qr: string, io: IOServer) {
  // Convert QR string to base64 data URL
  const qrDataUrl = await QRCode.toDataURL(qr, {
    errorCorrectionLevel: 'M',
    margin: 2,
    scale: 8,
    color: { dark: '#000000', light: '#ffffff' },
  })

  // Push to the user's browser room
  io.to(`user:${sessionId}`).emit('qr_update', {
    sessionId,
    qr: qrDataUrl,
    expiresIn: 20,  // QR expires in ~20 seconds
    timestamp: Date.now(),
  })
}

// Client side (React example)
socket.on('qr_update', ({ qr, expiresIn }) => {
  setQRCode(qr)  // Display <img src={qr} /> in your UI
  // Start a 20-second countdown timer
})
socket.on('status', ({ status }) => {
  if (status === 'connected') setQRCode(null)  // Hide QR, show success
})
```

### Pattern B: SSE (Server-Sent Events — simpler, no socket.io)
```typescript
// GET /sessions/:id/qr-stream
app.get('/sessions/:sessionId/qr-stream', (req, res) => {
  const { sessionId } = req.params

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.flushHeaders()

  // Register this SSE connection
  qrStreams.set(sessionId, res)

  req.on('close', () => {
    qrStreams.delete(sessionId)
  })
})

// When QR fires:
async function pushQRToSSE(sessionId: string, qr: string) {
  const stream = qrStreams.get(sessionId)
  if (!stream) return
  const qrDataUrl = await QRCode.toDataURL(qr)
  stream.write(`data: ${JSON.stringify({ qr: qrDataUrl })}\n\n`)
}

// Client (vanilla JS)
const evtSource = new EventSource(`/sessions/${sessionId}/qr-stream`)
evtSource.onmessage = (e) => {
  const { qr } = JSON.parse(e.data)
  document.getElementById('qr-img').src = qr
}
```

### QR on Frontend (React component)
```tsx
function QRScanner({ sessionId }: { sessionId: string }) {
  const [qr, setQr] = useState<string | null>(null)
  const [status, setStatus] = useState<'pending' | 'scanning' | 'connected'>('pending')
  const [timeLeft, setTimeLeft] = useState(20)

  useEffect(() => {
    socket.emit('join_session', sessionId)

    socket.on('qr_update', ({ qr: qrData }) => {
      setQr(qrData)
      setStatus('scanning')
      setTimeLeft(20)
    })

    socket.on('status', ({ status: s }) => {
      if (s === 'connected') {
        setQr(null)
        setStatus('connected')
      }
    })

    return () => { socket.off('qr_update'); socket.off('status') }
  }, [sessionId])

  // Countdown timer
  useEffect(() => {
    if (!qr) return
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(t); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [qr])

  if (status === 'connected') return <div>✅ WhatsApp Connected!</div>

  return (
    <div>
      {qr ? (
        <>
          <img src={qr} alt="Scan this QR code" width={256} height={256} />
          <p>Expires in {timeLeft}s — Open WhatsApp → Linked Devices → Scan</p>
        </>
      ) : (
        <p>Initializing... QR will appear shortly</p>
      )}
    </div>
  )
}
```

---

## 8. AUTH STATE STORAGE

| Storage | When to use | Pros | Cons |
|---|---|---|---|
| `useMultiFileAuthState` | Dev/testing only | Simple, no deps | File I/O, not cloud-safe |
| Redis (HSet) | Production SaaS | Fast, scalable, TTL | Requires Redis |
| PostgreSQL | Enterprise | ACID, queryable | Slower than Redis |
| In-memory | Tests only | Zero latency | Lost on restart |

**NEVER use `useMultiFileAuthState` in production.** It writes JSON to disk on every
message — on a loaded server with 50+ sessions this causes disk I/O race conditions.

### useMultiFileAuthState (dev reference only)
```typescript
import { useMultiFileAuthState } from 'baileys'

// Creates a folder per session with creds.json + keys/
const { state, saveCreds } = await useMultiFileAuthState(`./sessions/${sessionId}`)

const sock = makeWASocket({ auth: state })
sock.ev.on('creds.update', saveCreds)  // ALWAYS
```

---

## 9. REDIS AUTH STATE (PRODUCTION)

### Option A: Using `baileys-redis-auth` package
```bash
npm install baileys-redis-auth ioredis
```

```typescript
import { useRedisAuthStateWithHSet, deleteKeysWithPattern, listHSetSessions } from 'baileys-redis-auth'
import Redis from 'ioredis'
import makeWASocket from 'baileys'

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  retryStrategy: (times) => Math.min(times * 50, 2000),
})

async function createSocketWithRedisAuth(sessionId: string) {
  // Each session stored under prefix `authState:{sessionId}` as Redis Hash
  const { state, saveCreds } = await useRedisAuthStateWithHSet({
    redisOptions: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
    },
    sessionId,  // Used as namespace: `{sessionId}:auth`
  })

  const sock = makeWASocket({ auth: state })
  sock.ev.on('creds.update', saveCreds)
  return sock
}

// List all active sessions in Redis
const sessions = await listHSetSessions({ redis })
console.log('Active sessions:', sessions)

// Delete a session's auth data
await deleteKeysWithPattern({ redis, sessionId: 'user_123' })
```

### Option B: Raw Redis adapter (full control)
```typescript
import Redis from 'ioredis'
import { BufferJSON, initAuthCreds, proto } from 'baileys'

export async function useRedisAuthState(redis: Redis, sessionId: string) {
  const KEY = (id: string) => `baileys:${sessionId}:${id}`

  const writeData = async (id: string, data: any) => {
    const json = JSON.stringify(data, BufferJSON.replacer)
    await redis.set(KEY(id), json, 'EX', 86400 * 30)  // 30 day TTL
  }

  const readData = async (id: string) => {
    const raw = await redis.get(KEY(id))
    if (!raw) return null
    return JSON.parse(raw, BufferJSON.reviver)
  }

  const removeData = async (id: string) => {
    await redis.del(KEY(id))
  }

  const creds = (await readData('creds')) || initAuthCreds()

  const state = {
    creds,
    keys: {
      get: async (type: string, ids: string[]) => {
        const data: Record<string, any> = {}
        await Promise.all(
          ids.map(async (id) => {
            let value = await readData(`${type}:${id}`)
            if (value && type === 'app-state-sync-key') {
              value = proto.Message.AppStateSyncKeyData.fromObject(value)
            }
            data[id] = value
          })
        )
        return data
      },
      set: async (data: Record<string, Record<string, any>>) => {
        const tasks: Promise<void>[] = []
        for (const category of Object.keys(data)) {
          for (const id of Object.keys(data[category])) {
            const value = data[category][id]
            const task = value
              ? writeData(`${category}:${id}`, value)
              : removeData(`${category}:${id}`)
            tasks.push(task)
          }
        }
        await Promise.all(tasks)
      },
    },
  }

  const saveCreds = async () => {
    await writeData('creds', state.creds)
  }

  // Delete entire session
  const deleteCreds = async () => {
    const keys = await redis.keys(`baileys:${sessionId}:*`)
    if (keys.length) await redis.del(...keys)
  }

  return { state, saveCreds, deleteCreds }
}
```

---

## 10. POSTGRESQL AUTH STATE (PRODUCTION)

### Using `baileysauth` with PostgreSQL
```bash
npm install baileysauth pg
```

```typescript
import { useBaileysAuthState } from 'baileysauth'

const { state, saveCreds } = await useBaileysAuthState(
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`,
  {
    tableName: 'whatsapp_auth',   // Custom table name
    sessionName: sessionId,       // One row per session
  }
)

const sock = makeWASocket({ auth: state })
sock.ev.on('creds.update', saveCreds)
```

### Using Keyv adapter (works with both Redis and Postgres)
```bash
npm install @rodrigogs/baileys-store @keyv/redis @keyv/postgres keyv
```

```typescript
import { makeKeyvAuthState } from '@rodrigogs/baileys-store'
import Keyv from 'keyv'
import KeyvRedis from '@keyv/redis'

// Redis version
const store = new Keyv({
  store: new KeyvRedis(process.env.REDIS_URL!),
  namespace: sessionId,  // Crucial for multi-session isolation
})

const { state, saveCreds } = await makeKeyvAuthState(store, sessionId)
const sock = makeWASocket({ auth: state })
sock.ev.on('creds.update', saveCreds)
```

---

## 11. MULTI-SESSION MANAGER

This is the **core engine of your WhatsApp SaaS**. Every customer who connects their
WhatsApp gets one entry in this manager.

```typescript
// src/lib/sessionManager.ts

import makeWASocket, {
  fetchLatestBaileysVersion,
  Browsers,
  WASocket,
  DisconnectReason,
} from 'baileys'
import { Boom } from '@hapi/boom'
import pino from 'pino'
import { Server as IOServer } from 'socket.io'
import QRCode from 'qrcode'
import { useRedisAuthState } from './redisAuth'
import { ExponentialBackoff, getReconnectAction } from './connectionHandler'
import { db } from './db'   // Prisma client
import { redis } from './redis'
import { webhookDispatcher } from './webhooks'

const logger = pino({ level: process.env.LOG_LEVEL || 'info' })

interface SessionEntry {
  sock: WASocket
  status: 'connecting' | 'qr_pending' | 'connected' | 'disconnected' | 'banned'
  retries: number
  backoff: ExponentialBackoff
  createdAt: Date
}

class SessionManager {
  private sessions = new Map<string, SessionEntry>()
  private io: IOServer | null = null

  setIO(io: IOServer) { this.io = io }

  // ─── Create or restore a session ───────────────────────
  async create(sessionId: string, tenantId: string): Promise<void> {
    // Prevent duplicate socket creation
    if (this.sessions.has(sessionId)) {
      logger.warn({ sessionId }, 'Session already exists, skipping create')
      return
    }

    logger.info({ sessionId }, 'Creating WhatsApp session')

    const { state, saveCreds, deleteCreds } = await useRedisAuthState(redis, sessionId)
    const { version } = await fetchLatestBaileysVersion()

    const sock = makeWASocket({
      version,
      auth: state,
      browser: Browsers.ubuntu('MySaaS Platform'),
      logger: pino({ level: 'silent' }),
      markOnlineOnConnect: false,
      printQRInTerminal: false,
      connectTimeoutMs: 60_000,
      keepAliveIntervalMs: 30_000,
      syncFullHistory: false,
    })

    const entry: SessionEntry = {
      sock,
      status: 'connecting',
      retries: 0,
      backoff: new ExponentialBackoff(),
      createdAt: new Date(),
    }

    this.sessions.set(sessionId, entry)

    // ─── Save credentials on every update ──────────────
    sock.ev.on('creds.update', saveCreds)

    // ─── Connection lifecycle ───────────────────────────
    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update

      if (qr) {
        entry.status = 'qr_pending'
        entry.backoff.reset()
        await this.handleQR(sessionId, qr)
      }

      if (connection === 'open') {
        entry.status = 'connected'
        entry.retries = 0
        entry.backoff.reset()
        logger.info({ sessionId }, '✅ WhatsApp connected')

        await db.whatsappSession.update({
          where: { sessionId },
          data: { status: 'connected', connectedAt: new Date() },
        })
        this.io?.to(`tenant:${tenantId}`).emit('session_status', {
          sessionId, status: 'connected'
        })
      }

      if (connection === 'close') {
        const action = getReconnectAction(lastDisconnect?.error)
        logger.warn({ sessionId, action }, 'Connection closed')

        switch (action) {
          case 'reconnect': {
            this.sessions.delete(sessionId)
            const delay = entry.backoff.next()
            entry.retries++
            if (entry.retries > 10) {
              logger.error({ sessionId }, 'Too many retries — giving up')
              await db.whatsappSession.update({
                where: { sessionId },
                data: { status: 'error' },
              })
              return
            }
            logger.info({ sessionId, delay, retry: entry.retries }, 'Scheduling reconnect')
            setTimeout(() => this.create(sessionId, tenantId), delay)
            break
          }
          case 'delete_and_rescan': {
            this.sessions.delete(sessionId)
            await deleteCreds()
            await db.whatsappSession.update({
              where: { sessionId },
              data: { status: 'disconnected', connectedAt: null },
            })
            this.io?.to(`tenant:${tenantId}`).emit('session_status', {
              sessionId, status: 'disconnected', reason: 'logged_out'
            })
            break
          }
          case 'banned': {
            this.sessions.delete(sessionId)
            await db.whatsappSession.update({
              where: { sessionId },
              data: { status: 'banned' },
            })
            this.io?.to(`tenant:${tenantId}`).emit('session_status', {
              sessionId, status: 'banned'
            })
            break
          }
          case 'replaced': {
            this.sessions.delete(sessionId)
            break
          }
        }
      }
    })

    // ─── Message events → forward to webhooks ──────────
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
      if (type !== 'notify') return

      for (const msg of messages) {
        if (!msg.message || msg.key.fromMe) continue

        await db.messageLog.create({
          data: {
            sessionId,
            from: msg.key.remoteJid || '',
            body: msg.message?.conversation
              || msg.message?.extendedTextMessage?.text
              || '[media]',
            type: Object.keys(msg.message)[0],
            rawPayload: JSON.stringify(msg),
            timestamp: new Date(Number(msg.messageTimestamp) * 1000),
          },
        })

        await webhookDispatcher.dispatch(tenantId, 'message.received', {
          sessionId,
          from: msg.key.remoteJid,
          body: extractMessageText(msg),
          timestamp: msg.messageTimestamp,
          messageId: msg.key.id,
        })
      }
    })
  }

  private async handleQR(sessionId: string, qr: string) {
    const qrDataUrl = await QRCode.toDataURL(qr, { scale: 8 })
    this.io?.to(`session:${sessionId}`).emit('qr_update', {
      sessionId,
      qr: qrDataUrl,
      expiresIn: 20,
    })
    logger.info({ sessionId }, 'QR code generated and pushed to frontend')
  }

  get(sessionId: string): WASocket | null {
    return this.sessions.get(sessionId)?.sock || null
  }

  getStatus(sessionId: string): string {
    return this.sessions.get(sessionId)?.status || 'not_found'
  }

  async destroy(sessionId: string) {
    const entry = this.sessions.get(sessionId)
    if (entry) {
      try { await entry.sock.logout() } catch {}
      this.sessions.delete(sessionId)
    }
  }

  // Restore all sessions on server boot
  async restoreAll() {
    const activeSessions = await db.whatsappSession.findMany({
      where: { status: { in: ['connected', 'connecting', 'reconnecting'] } },
    })
    logger.info({ count: activeSessions.length }, 'Restoring sessions on boot')
    for (const session of activeSessions) {
      await this.create(session.sessionId, session.tenantId)
    }
  }

  count(): number { return this.sessions.size }
  list(): string[] { return Array.from(this.sessions.keys()) }
}

export const sessionManager = new SessionManager()
```

---

## 12. SENDING MESSAGES — ALL TYPES

### JID Format (CRITICAL — get this wrong and nothing works)
```typescript
// Individual chat
const jid = `${phoneNumber}@s.whatsapp.net`   // 919876543210@s.whatsapp.net
// NO + sign. Include full country code.

// Group chat
const groupJid = `${groupId}@g.us`

// Status broadcast
const statusJid = 'status@broadcast'

// Newsletter
const newsletterJid = `${newsletterId}@newsletter`

// HELPER: Format phone to JID
export function toJID(phone: string): string {
  const clean = phone.replace(/[^0-9]/g, '')  // strip all non-digits
  return `${clean}@s.whatsapp.net`
}

// HELPER: Check if number is on WhatsApp before sending
export async function isOnWhatsApp(sock: WASocket, phone: string): Promise<boolean> {
  const [result] = await sock.onWhatsApp(toJID(phone))
  return result?.exists ?? false
}
```

### Text Message
```typescript
await sock.sendMessage(jid, {
  text: 'Hello from MySaaS! 🚀',
})

// With link preview
await sock.sendMessage(jid, {
  text: 'Check this out: https://example.com',
  // linkPreview will be generated automatically
})

// Disable link preview
await sock.sendMessage(jid, {
  text: 'No preview here: https://example.com',
  linkPreview: null,
})
```

### Image
```typescript
// From URL
await sock.sendMessage(jid, {
  image: { url: 'https://example.com/image.jpg' },
  caption: 'Look at this!',
  mimetype: 'image/jpeg',
})

// From file buffer
import { readFileSync } from 'fs'
await sock.sendMessage(jid, {
  image: readFileSync('./image.png'),
  caption: 'Caption here',
})

// From base64
const base64 = Buffer.from(base64String, 'base64')
await sock.sendMessage(jid, { image: base64 })
```

### Video
```typescript
await sock.sendMessage(jid, {
  video: { url: 'https://example.com/video.mp4' },
  caption: 'Watch this!',
  gifPlayback: false,   // TRUE to play as GIF (note: WhatsApp doesn't support .gif natively)
})
```

### Audio / Voice Note
```typescript
// Regular audio
await sock.sendMessage(jid, {
  audio: { url: 'https://example.com/audio.mp3' },
  mimetype: 'audio/mpeg',
  ptt: false,   // FALSE for regular audio file
})

// Voice note (PTT = Push to Talk)
await sock.sendMessage(jid, {
  audio: readFileSync('./voice.ogg'),
  mimetype: 'audio/ogg; codecs=opus',
  ptt: true,   // TRUE for voice note style
})
```

### Document / File
```typescript
await sock.sendMessage(jid, {
  document: { url: 'https://example.com/report.pdf' },
  fileName: 'Q3_Report_2025.pdf',
  mimetype: 'application/pdf',
  caption: 'Please review this report',
})
```

### Sticker
```typescript
// Sticker must be webp
await sock.sendMessage(jid, {
  sticker: readFileSync('./sticker.webp'),
})
```

### Location
```typescript
await sock.sendMessage(jid, {
  location: {
    degreesLatitude: 28.6139,
    degreesLongitude: 77.2090,
    name: 'New Delhi',
    address: 'New Delhi, India',
  },
})
```

### Contact Card
```typescript
const vcard = `BEGIN:VCARD
VERSION:3.0
FN:John Doe
TEL;type=CELL;waid=919876543210:+91 98765 43210
END:VCARD`

await sock.sendMessage(jid, {
  contacts: {
    displayName: 'John Doe',
    contacts: [{ vcard }],
  },
})
```

### Quote / Reply
```typescript
// To reply to a specific message
await sock.sendMessage(jid, {
  text: 'This is my reply!',
}, {
  quoted: originalMessage,  // The WAMessage object you want to quote
})
```

### React to a message
```typescript
await sock.sendMessage(jid, {
  react: {
    text: '🔥',            // The emoji
    key: targetMessage.key, // The message key to react to
  },
})
// Remove reaction
await sock.sendMessage(jid, {
  react: { text: '', key: targetMessage.key },
})
```

### Edit a sent message
```typescript
await sock.sendMessage(jid, {
  edit: sentMessageKey,
  text: 'Corrected message text',
})
```

### Delete a sent message
```typescript
await sock.sendMessage(jid, {
  delete: sentMessageKey,
})
```

### Buttons (interactive)
```typescript
await sock.sendMessage(jid, {
  text: 'What do you need help with?',
  footer: 'MySaaS Support',
  buttons: [
    { buttonId: 'billing', buttonText: { displayText: '💳 Billing' }, type: 1 },
    { buttonId: 'support', buttonText: { displayText: '🆘 Support' }, type: 1 },
    { buttonId: 'features', buttonText: { displayText: '✨ Features' }, type: 1 },
  ],
  headerType: 1,
})
```

### List Message
```typescript
await sock.sendMessage(jid, {
  text: 'Select your plan:',
  footer: 'Tap to choose',
  title: '💼 Plans',
  buttonText: 'View Plans',
  sections: [
    {
      title: 'Monthly',
      rows: [
        { title: '🥉 Starter — ₹999/mo', description: '1 device, 1000 msgs', rowId: 'starter' },
        { title: '🥈 Pro — ₹2999/mo', description: '5 devices, unlimited', rowId: 'pro' },
        { title: '🥇 Enterprise', description: 'Custom pricing', rowId: 'enterprise' },
      ],
    },
  ],
})
```

---

## 13. RECEIVING & PROCESSING MESSAGES

```typescript
// src/lib/messageHandler.ts

import { WAMessage, WAMessageContent, proto } from 'baileys'

// ─── Extract text from any message type ────────────────
export function extractMessageText(msg: WAMessage): string {
  const content = msg.message
  if (!content) return ''

  return (
    content.conversation ||
    content.extendedTextMessage?.text ||
    content.imageMessage?.caption ||
    content.videoMessage?.caption ||
    content.documentMessage?.caption ||
    content.buttonsResponseMessage?.selectedButtonId ||
    content.listResponseMessage?.singleSelectReply?.selectedRowId ||
    content.templateButtonReplyMessage?.selectedId ||
    ''
  )
}

// ─── Extract message type ───────────────────────────────
export function getMessageType(msg: WAMessage): string {
  if (!msg.message) return 'unknown'
  const types = Object.keys(msg.message)
  return types.find(t => t !== 'messageContextInfo') || 'unknown'
}

// ─── Main event handler ────────────────────────────────
sock.ev.on('messages.upsert', async ({ messages, type }) => {
  // type = 'notify'  → real-time incoming message (process this)
  // type = 'append'  → history sync (usually skip this)
  if (type !== 'notify') return

  for (const msg of messages) {
    // Skip if no message payload
    if (!msg.message) continue

    // Skip messages you sent (fromMe = true)
    if (msg.key.fromMe) continue

    // Skip status updates (stories)
    if (msg.key.remoteJid === 'status@broadcast') continue

    const from = msg.key.remoteJid!
    const isGroup = from.endsWith('@g.us')
    const body = extractMessageText(msg)
    const msgType = getMessageType(msg)
    const sender = isGroup ? msg.key.participant : from  // In groups, participant = actual sender

    console.log({
      from,
      sender,
      isGroup,
      body,
      msgType,
      timestamp: new Date(Number(msg.messageTimestamp) * 1000),
    })

    // Mark message as read
    await sock.readMessages([msg.key])

    // Show typing indicator (optional, human-like)
    await sock.sendPresenceUpdate('composing', from)
    await new Promise(r => setTimeout(r, 1200))  // Simulate typing delay
    await sock.sendPresenceUpdate('paused', from)

    // Your bot logic here
    await processCommand(sock, from, body, msg)
  }
})

// ─── Message delivery receipt ──────────────────────────
sock.ev.on('message-receipt.update', (receipts) => {
  for (const { key, receipt } of receipts) {
    // receipt.receiptTimestamp = delivered
    // receipt.readTimestamp = read (blue tick)
    console.log('Receipt update for', key.id, receipt)
  }
})
```

---

## 14. MEDIA HANDLING

### Download incoming media
```typescript
import { downloadMediaMessage } from 'baileys'
import { createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'

sock.ev.on('messages.upsert', async ({ messages, type }) => {
  if (type !== 'notify') return

  for (const msg of messages) {
    const msgType = getMessageType(msg)

    if (['imageMessage', 'videoMessage', 'audioMessage', 'documentMessage'].includes(msgType)) {
      // Download as stream (saves memory — do NOT load entire buffer for large files)
      const stream = await downloadMediaMessage(
        msg,
        'stream',
        {},
        {
          logger: pino({ level: 'silent' }),
          reuploadRequest: sock.updateMediaMessage,
        }
      )

      // Save to disk
      const filename = `./media/${msg.key.id}.bin`
      await pipeline(stream, createWriteStream(filename))
      console.log('Saved media to', filename)

      // OR: Load as buffer (only for small files)
      const buffer = await downloadMediaMessage(msg, 'buffer', {})
    }
  }
})
```

### Upload and send media (memory-efficient)
```typescript
// Always use URL or stream — never load entire large file as buffer
await sock.sendMessage(jid, {
  image: { url: './large-image.jpg' },  // Baileys streams from disk
  caption: 'Here you go!',
})

// For S3 or CDN-hosted media
await sock.sendMessage(jid, {
  video: { url: 'https://cdn.example.com/video.mp4' },
  caption: 'Watch this!',
})
```

---

## 15. GROUPS MANAGEMENT

```typescript
// ─── Get all groups ────────────────────────────────────
const groups = await sock.groupFetchAllParticipating()
console.log('Groups:', Object.keys(groups).length)

// ─── Get specific group metadata ───────────────────────
const groupMetadata = await sock.groupMetadata('1234567890-1234567890@g.us')
console.log('Group name:', groupMetadata.subject)
console.log('Participants:', groupMetadata.participants.length)

// ─── Create a group ────────────────────────────────────
const group = await sock.groupCreate('My Group Name', [
  '919876543210@s.whatsapp.net',
  '919876543211@s.whatsapp.net',
])
console.log('Created group JID:', group.gid)

// ─── Add participants ──────────────────────────────────
await sock.groupParticipantsUpdate(
  groupJid,
  ['919876543212@s.whatsapp.net'],
  'add'
)

// ─── Remove participants ───────────────────────────────
await sock.groupParticipantsUpdate(groupJid, [participantJid], 'remove')

// ─── Promote to admin ──────────────────────────────────
await sock.groupParticipantsUpdate(groupJid, [participantJid], 'promote')

// ─── Demote from admin ─────────────────────────────────
await sock.groupParticipantsUpdate(groupJid, [participantJid], 'demote')

// ─── Update group subject ──────────────────────────────
await sock.groupUpdateSubject(groupJid, 'New Group Name')

// ─── Update group description ──────────────────────────
await sock.groupUpdateDescription(groupJid, 'New description here')

// ─── Get invite link ───────────────────────────────────
const inviteCode = await sock.groupInviteCode(groupJid)
const inviteLink = `https://chat.whatsapp.com/${inviteCode}`

// ─── Revoke invite link ────────────────────────────────
await sock.groupRevokeInvite(groupJid)

// ─── Leave group ───────────────────────────────────────
await sock.groupLeave(groupJid)

// ─── Group participant events ──────────────────────────
sock.ev.on('group-participants.update', async ({ id, participants, action }) => {
  console.log(`Group ${id}: ${action}`, participants)
  // action: 'add' | 'remove' | 'promote' | 'demote'
})
```

---

## 16. WEBHOOKS

Webhooks let your customers receive WhatsApp events at their own server URL.

```typescript
// src/lib/webhooks.ts

import axios from 'axios'
import crypto from 'crypto'
import { db } from './db'
import { messageQueue } from './queue'

interface WebhookPayload {
  event: string
  sessionId: string
  tenantId: string
  data: any
  timestamp: number
}

export class WebhookDispatcher {
  async dispatch(tenantId: string, event: string, data: any) {
    const webhooks = await db.webhook.findMany({
      where: {
        tenantId,
        isActive: true,
        events: { has: event },
      },
    })

    for (const webhook of webhooks) {
      // Queue the delivery for reliability (retry on failure)
      await messageQueue.webhookQueue.add('deliver', {
        webhookId: webhook.id,
        url: webhook.url,
        secret: webhook.secret,
        payload: {
          event,
          sessionId: data.sessionId,
          tenantId,
          data,
          timestamp: Date.now(),
        },
      }, {
        attempts: 5,
        backoff: { type: 'exponential', delay: 2000 },
      })
    }
  }

  async deliverWebhook(url: string, secret: string, payload: WebhookPayload) {
    const body = JSON.stringify(payload)
    const signature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex')

    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': `sha256=${signature}`,
        'X-Webhook-Event': payload.event,
        'User-Agent': 'MySaaS-Webhooks/1.0',
      },
      timeout: 10_000,
    })

    return response.status
  }
}

export const webhookDispatcher = new WebhookDispatcher()
```

---

## 17. REST API LAYER

```typescript
// src/routes/sessions.ts
import { Router } from 'express'
import { z } from 'zod'
import { sessionManager } from '../lib/sessionManager'
import { db } from '../lib/db'
import { toJID, isOnWhatsApp } from '../lib/utils'

const router = Router()

// ─── Initialize / connect session ─────────────────────
router.post('/', async (req, res) => {
  const { tenantId } = req.user  // From auth middleware
  const sessionId = `${tenantId}_${Date.now()}`

  await db.whatsappSession.create({
    data: { sessionId, tenantId, status: 'connecting' },
  })

  await sessionManager.create(sessionId, tenantId)

  res.status(201).json({
    sessionId,
    status: 'connecting',
    message: 'Connect via WebSocket to receive QR code',
    wsRoom: `session:${sessionId}`,
  })
})

// ─── Get session status ────────────────────────────────
router.get('/:sessionId/status', async (req, res) => {
  const { sessionId } = req.params
  const session = await db.whatsappSession.findUnique({ where: { sessionId } })
  if (!session) return res.status(404).json({ error: 'Session not found' })
  res.json({ sessionId, status: session.status, connectedAt: session.connectedAt })
})

// ─── List sessions for tenant ──────────────────────────
router.get('/', async (req, res) => {
  const { tenantId } = req.user
  const sessions = await db.whatsappSession.findMany({ where: { tenantId } })
  res.json({ sessions })
})

// ─── Send text message ─────────────────────────────────
router.post('/:sessionId/send/text', async (req, res) => {
  const { sessionId } = req.params
  const { to, message } = z.object({
    to: z.string().min(10),
    message: z.string().min(1).max(4096),
  }).parse(req.body)

  const sock = sessionManager.get(sessionId)
  if (!sock) return res.status(404).json({ error: 'Session not connected' })

  const jid = toJID(to)
  const result = await sock.sendMessage(jid, { text: message })

  await db.sentMessage.create({
    data: { sessionId, to: jid, type: 'text', content: message, messageId: result?.key?.id },
  })

  res.json({ success: true, messageId: result?.key?.id })
})

// ─── Send media message ────────────────────────────────
router.post('/:sessionId/send/media', async (req, res) => {
  const { sessionId } = req.params
  const { to, mediaUrl, mediaType, caption, filename } = req.body

  const sock = sessionManager.get(sessionId)
  if (!sock) return res.status(404).json({ error: 'Session not connected' })

  const jid = toJID(to)
  let result

  switch (mediaType) {
    case 'image':
      result = await sock.sendMessage(jid, { image: { url: mediaUrl }, caption })
      break
    case 'video':
      result = await sock.sendMessage(jid, { video: { url: mediaUrl }, caption })
      break
    case 'document':
      result = await sock.sendMessage(jid, {
        document: { url: mediaUrl },
        fileName: filename || 'file',
        mimetype: 'application/octet-stream',
        caption,
      })
      break
    case 'audio':
      result = await sock.sendMessage(jid, { audio: { url: mediaUrl }, ptt: false })
      break
    default:
      return res.status(400).json({ error: 'Invalid mediaType' })
  }

  res.json({ success: true, messageId: result?.key?.id })
})

// ─── Check if number is on WhatsApp ───────────────────
router.get('/:sessionId/check/:phone', async (req, res) => {
  const { sessionId, phone } = req.params
  const sock = sessionManager.get(sessionId)
  if (!sock) return res.status(404).json({ error: 'Session not connected' })
  const exists = await isOnWhatsApp(sock, phone)
  res.json({ phone, exists })
})

// ─── Disconnect/logout session ─────────────────────────
router.delete('/:sessionId', async (req, res) => {
  const { sessionId } = req.params
  await sessionManager.destroy(sessionId)
  await db.whatsappSession.update({
    where: { sessionId },
    data: { status: 'disconnected' },
  })
  res.json({ success: true })
})

export default router

// ─── Webhook management routes ─────────────────────────
// src/routes/webhooks.ts
router.post('/', async (req, res) => {
  const { tenantId } = req.user
  const { url, events, secret } = z.object({
    url: z.string().url(),
    events: z.array(z.enum(['message.received', 'status.updated', 'connection.updated'])),
    secret: z.string().min(16),
  }).parse(req.body)

  const webhook = await db.webhook.create({
    data: { tenantId, url, events, secret, isActive: true },
  })
  res.status(201).json({ webhook })
})
```

### Main Express Server
```typescript
// src/index.ts
import express from 'express'
import { createServer } from 'http'
import { Server as IOServer } from 'socket.io'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import pino from 'pino'
import pinoHttp from 'pino-http'
import { sessionManager } from './lib/sessionManager'
import sessionsRouter from './routes/sessions'
import webhooksRouter from './routes/webhooks'
import { authMiddleware } from './middleware/auth'

const app = express()
const httpServer = createServer(app)
const io = new IOServer(httpServer, {
  cors: { origin: process.env.FRONTEND_URL, credentials: true },
})

const logger = pino({ level: process.env.LOG_LEVEL || 'info' })

// ─── Middleware ───────────────────────────────────────
app.use(helmet())
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
app.use(express.json({ limit: '50mb' }))
app.use(pinoHttp({ logger }))

// Global rate limiter
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: { error: 'Too many requests' },
}))

// Auth middleware on all /api routes
app.use('/api', authMiddleware)

// ─── Routes ──────────────────────────────────────────
app.use('/api/sessions', sessionsRouter)
app.use('/api/webhooks', webhooksRouter)

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    sessions: sessionManager.count(),
    uptime: process.uptime(),
  })
})

// ─── Socket.io ───────────────────────────────────────
sessionManager.setIO(io)

io.on('connection', (socket) => {
  logger.info({ socketId: socket.id }, 'Socket connected')

  socket.on('join_session', (sessionId: string) => {
    socket.join(`session:${sessionId}`)
    logger.info({ socketId: socket.id, sessionId }, 'Joined session room')
  })

  socket.on('join_tenant', (tenantId: string) => {
    socket.join(`tenant:${tenantId}`)
  })

  socket.on('disconnect', () => {
    logger.info({ socketId: socket.id }, 'Socket disconnected')
  })
})

// ─── Boot ─────────────────────────────────────────────
const PORT = process.env.PORT || 3000

httpServer.listen(PORT, async () => {
  logger.info({ port: PORT }, '🚀 WhatsApp SaaS server started')
  await sessionManager.restoreAll()  // Restore sessions from DB on boot
})
```

---

## 18. SOCKET.IO REAL-TIME LAYER

```typescript
// All events the server emits to clients:

// QR code available (scan with phone)
socket.emit('qr_update', {
  sessionId: string,
  qr: string,          // base64 data URL
  expiresIn: 20,       // seconds until QR expires
  timestamp: number,
})

// Session status changed
socket.emit('session_status', {
  sessionId: string,
  status: 'connecting' | 'qr_pending' | 'connected' | 'disconnected' | 'banned' | 'error',
  reason?: string,
})

// New incoming message
socket.emit('message_received', {
  sessionId: string,
  from: string,
  body: string,
  type: string,
  timestamp: number,
})

// Message delivery status
socket.emit('message_status', {
  messageId: string,
  status: 'sent' | 'delivered' | 'read',
})
```

---

## 19. MESSAGE QUEUE WITH BULLMQ

For bulk sends and webhook delivery — never fire-and-forget in production.

```typescript
// src/lib/queue.ts
import { Queue, Worker } from 'bullmq'
import { redis } from './redis'
import { sessionManager } from './sessionManager'
import { webhookDispatcher } from './webhooks'
import pino from 'pino'

const logger = pino({ level: 'info' })

const connection = { connection: redis }

// ─── Queues ──────────────────────────────────────────
export const messageQueue = new Queue('messages', connection)
export const webhookQueue = new Queue('webhooks', connection)
export const bulkQueue = new Queue('bulk', connection)

// ─── Message Worker ───────────────────────────────────
const messageWorker = new Worker('messages', async (job) => {
  const { sessionId, jid, content, type } = job.data
  const sock = sessionManager.get(sessionId)
  if (!sock) throw new Error(`Session ${sessionId} not connected`)

  switch (type) {
    case 'text':
      return await sock.sendMessage(jid, { text: content.text })
    case 'image':
      return await sock.sendMessage(jid, { image: { url: content.url }, caption: content.caption })
    case 'document':
      return await sock.sendMessage(jid, { document: { url: content.url }, fileName: content.fileName })
    default:
      throw new Error(`Unknown message type: ${type}`)
  }
}, {
  ...connection,
  concurrency: 3,          // Process 3 messages simultaneously per session
  limiter: {
    max: 10,               // Max 10 jobs per duration
    duration: 10_000,      // per 10 seconds
  },
})

// ─── Bulk Send Worker ─────────────────────────────────
const bulkWorker = new Worker('bulk', async (job) => {
  const { sessionId, recipients, content, delayMs = 2000 } = job.data
  const sock = sessionManager.get(sessionId)
  if (!sock) throw new Error('Session not found')

  const results = []
  for (const recipient of recipients) {
    try {
      const jid = `${recipient}@s.whatsapp.net`
      const result = await sock.sendMessage(jid, { text: content })
      results.push({ recipient, success: true, messageId: result?.key?.id })
      job.updateProgress(Math.floor(results.length / recipients.length * 100))
    } catch (err: any) {
      results.push({ recipient, success: false, error: err.message })
    }
    // CRITICAL: Delay between sends to avoid ban
    await new Promise(r => setTimeout(r, delayMs))
  }

  return results
}, { ...connection, concurrency: 1 })  // Only 1 bulk job at a time per session

// ─── Webhook Worker ───────────────────────────────────
const webhookWorker = new Worker('webhooks', async (job) => {
  const { url, secret, payload } = job.data
  const status = await webhookDispatcher.deliverWebhook(url, secret, payload)
  if (status >= 400) throw new Error(`Webhook returned ${status}`)
  return { delivered: true, status }
}, {
  ...connection,
  concurrency: 10,
})

// ─── Event listeners ─────────────────────────────────
messageWorker.on('failed', (job, err) => {
  logger.error({ jobId: job?.id, err: err.message }, 'Message job failed')
})

webhookWorker.on('failed', (job, err) => {
  logger.error({ jobId: job?.id, err: err.message }, 'Webhook delivery failed')
})

// Add bulk job helper
export async function enqueueBulkSend(
  sessionId: string,
  recipients: string[],
  content: string,
  delayMs = 2000
) {
  return await bulkQueue.add('bulk_send', {
    sessionId, recipients, content, delayMs,
  }, {
    attempts: 3,
    backoff: { type: 'exponential', delay: 5000 },
  })
}
```

---

## 20. PRISMA SCHEMA

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── Tenants (your SaaS customers) ───────────────────
model Tenant {
  id            String            @id @default(uuid())
  name          String
  email         String            @unique
  apiKey        String            @unique @default(uuid())
  plan          Plan              @default(STARTER)
  isActive      Boolean           @default(true)
  createdAt     DateTime          @default(now())
  updatedAt     DateTime          @updatedAt

  sessions      WhatsappSession[]
  webhooks      Webhook[]
  sentMessages  SentMessage[]
  messageLogs   MessageLog[]
}

enum Plan {
  STARTER
  PRO
  ENTERPRISE
}

// ─── WhatsApp Sessions ───────────────────────────────
model WhatsappSession {
  id          String          @id @default(uuid())
  sessionId   String          @unique
  tenantId    String
  tenant      Tenant          @relation(fields: [tenantId], references: [id])
  displayName String?         // User's WhatsApp name
  phoneNumber String?
  status      SessionStatus   @default(CONNECTING)
  connectedAt DateTime?
  lastSeenAt  DateTime?
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt

  sentMessages SentMessage[]
  messageLogs  MessageLog[]

  @@index([tenantId])
  @@index([status])
}

enum SessionStatus {
  CONNECTING
  QR_PENDING
  CONNECTED
  DISCONNECTED
  BANNED
  ERROR
}

// ─── Webhooks ─────────────────────────────────────────
model Webhook {
  id          String    @id @default(uuid())
  tenantId    String
  tenant      Tenant    @relation(fields: [tenantId], references: [id])
  url         String
  secret      String
  events      String[]  // ['message.received', 'status.updated']
  isActive    Boolean   @default(true)
  failCount   Int       @default(0)
  lastSuccess DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([tenantId])
}

// ─── Sent Messages ────────────────────────────────────
model SentMessage {
  id          String    @id @default(uuid())
  sessionId   String
  session     WhatsappSession @relation(fields: [sessionId], references: [sessionId])
  tenantId    String
  tenant      Tenant    @relation(fields: [tenantId], references: [id])
  to          String    // JID
  type        String    // text, image, document, etc.
  content     String?
  mediaUrl    String?
  messageId   String?   // Baileys returned key.id
  status      String    @default("sent")   // sent, delivered, read, failed
  createdAt   DateTime  @default(now())

  @@index([sessionId])
  @@index([tenantId])
  @@index([to])
}

// ─── Incoming Message Log ─────────────────────────────
model MessageLog {
  id          String    @id @default(uuid())
  sessionId   String
  session     WhatsappSession @relation(fields: [sessionId], references: [sessionId])
  tenantId    String
  tenant      Tenant    @relation(fields: [tenantId], references: [id])
  from        String    // JID
  body        String?
  type        String
  rawPayload  Json?
  timestamp   DateTime
  createdAt   DateTime  @default(now())

  @@index([sessionId])
  @@index([from])
  @@index([timestamp])
}

// ─── Auth Middleware Model ────────────────────────────
model ApiKeyLog {
  id        String   @id @default(uuid())
  tenantId  String
  endpoint  String
  method    String
  ip        String
  createdAt DateTime @default(now())

  @@index([tenantId])
}
```

---

## 21. ANTI-BAN STRATEGY

This is critical. WhatsApp bans numbers aggressively. Follow every rule here.

### The Golden Rules
1. **NEVER send bulk without delay** — minimum 2–5 seconds between messages
2. **New numbers need warm-up** — don't blast immediately after connecting
3. **Never send to numbers that haven't messaged you first** (cold outreach = ban)
4. **Vary message content** — identical messages to many recipients = ban
5. **Keep sessions alive** — heartbeat every 30 seconds via keepAlive config
6. **Use proper browser fingerprint** — `Browsers.ubuntu('AppName')`
7. **Always set `markOnlineOnConnect: false`** — prevents spam detection
8. **Handle media via URL streams** — don't upload identical files repeatedly
9. **Max 200–300 messages/day per number** for new accounts
10. **Max 1000 messages/day** for aged accounts (6 months+)

### Rate limiter implementation
```typescript
// src/lib/rateLimiter.ts
import { redis } from './redis'

export async function checkRateLimit(
  sessionId: string,
  window: 'minute' | 'hour' | 'day',
  maxCount: number
): Promise<{ allowed: boolean; remaining: number; resetIn: number }> {
  const windows = { minute: 60, hour: 3600, day: 86400 }
  const ttl = windows[window]
  const key = `rate:${sessionId}:${window}`

  const count = await redis.incr(key)
  if (count === 1) await redis.expire(key, ttl)

  const remaining = Math.max(0, maxCount - count)
  const resetIn = await redis.ttl(key)

  return { allowed: count <= maxCount, remaining, resetIn }
}

// Use before every send
async function safeSend(sessionId: string, jid: string, content: any) {
  const { allowed, remaining } = await checkRateLimit(sessionId, 'minute', 20)
  if (!allowed) throw new Error(`Rate limit exceeded. Try again later.`)

  const sock = sessionManager.get(sessionId)
  if (!sock) throw new Error('Session not connected')

  return await sock.sendMessage(jid, content)
}
```

### Number warm-up schedule
```
Day 1–3:   Max 50 messages/day, only to known contacts
Day 4–7:   Max 100 messages/day
Day 8–14:  Max 200 messages/day
Day 15+:   Max 500–1000 messages/day (with delays)

Rule: Always add 1.5–3 second delay between messages
Rule: Use random delay variance (1500ms + Math.random() * 2000ms)
Rule: Mix message types (text, image, etc.) — don't send only text
```

### Delay utility
```typescript
export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

export function randomDelay(minMs = 1500, maxMs = 4000): Promise<void> {
  const delay = minMs + Math.random() * (maxMs - minMs)
  return sleep(delay)
}

// In bulk send loop:
for (const recipient of recipients) {
  await sock.sendMessage(`${recipient}@s.whatsapp.net`, { text: message })
  await randomDelay(2000, 5000)   // 2–5 second random delay
}
```

---

## 22. ERROR HANDLING & DISCONNECT CODES

```typescript
import { DisconnectReason } from 'baileys'

// All disconnect status codes and what to do:
const DISCONNECT_ACTIONS: Record<number, { action: string; description: string }> = {
  [DisconnectReason.loggedOut]:           { action: 'DELETE_SESSION', description: 'User logged out from phone' },
  [DisconnectReason.badSession]:          { action: 'DELETE_SESSION', description: 'Corrupted credentials' },
  [DisconnectReason.multideviceMismatch]: { action: 'DELETE_SESSION', description: 'MD protocol mismatch' },
  [DisconnectReason.forbidden]:           { action: 'MARK_BANNED',    description: 'Account banned/restricted' },
  [DisconnectReason.connectionClosed]:    { action: 'RECONNECT',      description: 'WebSocket closed cleanly' },
  [DisconnectReason.connectionLost]:      { action: 'RECONNECT',      description: 'Connection lost' },
  [DisconnectReason.connectionReplaced]:  { action: 'STOP',           description: 'Another client took over' },
  [DisconnectReason.restartRequired]:     { action: 'RECONNECT',      description: 'WA requires restart' },
  [DisconnectReason.timedOut]:            { action: 'RECONNECT',      description: 'Connection timed out' },
  401:                                    { action: 'DELETE_SESSION',  description: 'Unauthorized' },
  403:                                    { action: 'MARK_BANNED',     description: 'Forbidden' },
  408:                                    { action: 'RECONNECT',       description: 'Request timeout' },
  428:                                    { action: 'RECONNECT',       description: 'Connection closed' },
  440:                                    { action: 'RECONNECT',       description: 'Connection replaced' },
  500:                                    { action: 'DELETE_SESSION',  description: 'Server error / bad session' },
  515:                                    { action: 'RECONNECT',       description: 'Restart required' },
}

// Try/catch pattern for all sendMessage calls
async function sendSafe(sock: WASocket, jid: string, content: any) {
  try {
    return await sock.sendMessage(jid, content)
  } catch (err: any) {
    if (err.message?.includes('not-authorized')) {
      throw new Error('Session expired — re-scan QR')
    }
    if (err.message?.includes('rate-overlimit')) {
      throw new Error('WhatsApp rate limit hit — slow down')
    }
    if (err.output?.statusCode === 404) {
      throw new Error('Number not on WhatsApp')
    }
    throw err
  }
}
```

---

## 23. LOGGING WITH PINO

```typescript
// src/lib/logger.ts
import pino from 'pino'

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV === 'development'
    ? { target: 'pino-pretty', options: { colorize: true, translateTime: 'SYS:standard' } }
    : undefined,
  redact: ['req.headers.authorization', 'req.headers["x-api-key"]', '*.password', '*.secret'],
  serializers: {
    err: pino.stdSerializers.err,
  },
})

// For Baileys socket — silence in production (it's very noisy)
export const baileysLogger = pino({ level: 'silent' })

// Structured logging pattern:
logger.info({ sessionId, event: 'connected', phone: '91987...' }, 'WhatsApp session connected')
logger.error({ sessionId, err: error.message, code: error.code }, 'Message send failed')
logger.warn({ sessionId, retries: 3 }, 'Reconnecting after disconnect')
```

---

## 24. DOCKER & DOCKER COMPOSE

```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy built app
COPY dist/ ./dist/
COPY prisma/ ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Create sessions directory
RUN mkdir -p sessions media

EXPOSE 3000
CMD ["node", "dist/index.js"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@db:5432/whatsapp_saas
      - REDIS_URL=redis://redis:6379
      - LOG_LEVEL=info
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    volumes:
      - sessions_data:/app/sessions
      - media_data:/app/media
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: whatsapp_saas
    volumes:
      - pg_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app

volumes:
  pg_data:
  redis_data:
  sessions_data:
  media_data:
```

```nginx
# nginx.conf — WebSocket + HTTP support
server {
    listen 443 ssl;
    server_name api.yoursaas.com;

    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;

    # WebSocket upgrade for Socket.io
    location /socket.io/ {
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_read_timeout 86400;
    }

    location / {
        proxy_pass http://app:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

---

## 25. PM2 PROCESS MANAGEMENT

```yaml
# ecosystem.config.js (for non-Docker deployments)
module.exports = {
  apps: [{
    name: 'whatsapp-saas',
    script: 'dist/index.js',
    instances: 1,           // ALWAYS 1 for Baileys (sessions are in-memory)
    exec_mode: 'fork',      // NOT cluster mode — Baileys sockets can't be shared
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    merge_logs: true,
    watch: false,
    autorestart: true,
    restart_delay: 5000,    // 5 second delay before restart
    max_restarts: 10,
  }],
}
```

> **CRITICAL**: NEVER run Baileys in `cluster` mode or multiple PM2 instances sharing
> the same session folder. Each WhatsApp session must live in exactly ONE process.
> If you need horizontal scaling, use separate Node.js processes with session affinity
> (route each sessionId to a fixed server).

---

## 26. ENVIRONMENT VARIABLES

```env
# ─── App ──────────────────────────────────────────────
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://app.yoursaas.com
LOG_LEVEL=info

# ─── Database ─────────────────────────────────────────
DATABASE_URL=postgresql://user:pass@localhost:5432/whatsapp_saas

# ─── Redis ────────────────────────────────────────────
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
REDIS_URL=redis://:your_redis_password@localhost:6379

# ─── Security ─────────────────────────────────────────
JWT_SECRET=your_jwt_secret_min_32_chars
JWT_EXPIRY=7d
API_KEY_SALT=your_api_key_salt

# ─── Webhook ──────────────────────────────────────────
WEBHOOK_SECRET_SALT=your_webhook_salt
WEBHOOK_TIMEOUT_MS=10000
WEBHOOK_MAX_RETRIES=5

# ─── WhatsApp / Baileys ───────────────────────────────
WA_CONNECT_TIMEOUT_MS=60000
WA_KEEPALIVE_INTERVAL_MS=30000
WA_MAX_RETRY_COUNT=10
WA_BROWSER_NAME=MySaaS

# ─── Rate Limits ──────────────────────────────────────
RATE_LIMIT_MSGS_PER_MINUTE=20
RATE_LIMIT_MSGS_PER_DAY=1000
RATE_LIMIT_BULK_DELAY_MS=2000

# ─── File Storage (if using local) ────────────────────
UPLOAD_DIR=./media
MAX_FILE_SIZE_MB=50
```

---

## 27. COMPLETE PROJECT STRUCTURE

```
whatsapp-saas/
├── src/
│   ├── index.ts                    ← Main entry: Express + Socket.io + Boot
│   ├── lib/
│   │   ├── sessionManager.ts       ← Core multi-session engine
│   │   ├── connectionHandler.ts    ← Disconnect codes, backoff logic
│   │   ├── redisAuth.ts            ← Redis auth state adapter
│   │   ├── queue.ts                ← BullMQ workers + queues
│   │   ├── webhooks.ts             ← Webhook dispatcher
│   │   ├── messageHandler.ts       ← Message parsing utils
│   │   ├── rateLimiter.ts          ← Per-session rate limiting
│   │   ├── db.ts                   ← Prisma client singleton
│   │   ├── redis.ts                ← Redis client singleton
│   │   └── logger.ts               ← Pino logger
│   ├── routes/
│   │   ├── sessions.ts             ← Session CRUD + send endpoints
│   │   ├── webhooks.ts             ← Webhook management
│   │   ├── messages.ts             ← Message history
│   │   └── health.ts               ← Health check
│   ├── middleware/
│   │   ├── auth.ts                 ← API key / JWT validation
│   │   ├── rateLimit.ts            ← Express rate limiter
│   │   └── validate.ts             ← Zod request validation
│   └── utils/
│       ├── jid.ts                  ← JID formatting helpers
│       ├── media.ts                ← Media download/upload utils
│       └── crypto.ts               ← HMAC signature helpers
├── prisma/
│   └── schema.prisma               ← Full DB schema
├── docker-compose.yml
├── Dockerfile
├── ecosystem.config.js             ← PM2 config
├── nginx.conf                      ← Nginx reverse proxy
├── .env.example
├── tsconfig.json
└── package.json
```

---

## 28. CRITICAL BUGS & GOTCHAS

### 🚨 Bug 1: `useMultiFileAuthState` in production
**Problem**: Writes all creds/keys to disk JSON files on EVERY message. Race conditions
under load. Files corrupt. Sessions drop.
**Fix**: Use Redis or PostgreSQL adapter in ALL non-local environments.

### 🚨 Bug 2: Not saving `creds.update`
**Problem**: Session works until first restart. On boot — forces QR re-scan every time.
**Fix**: `sock.ev.on('creds.update', saveCreds)` must be present in EVERY socket.
This is not optional. Signal protocol rotates keys on every message.

### 🚨 Bug 3: Treating post-scan disconnect as error
**Problem**: After QR scan, WhatsApp disconnects to exchange creds. Code deletes session.
**Fix**: Undefined error on disconnect = normal reconnect. Only `DisconnectReason.loggedOut`
should trigger session deletion.

### 🚨 Bug 4: QR code expires — not refreshing
**Problem**: User takes too long. QR expires. Nothing happens on UI.
**Fix**: QR fires new event every ~20 seconds automatically. Listen to EVERY `qr` event
and push fresh QR to frontend. Never cache the first QR — always use latest.

### 🚨 Bug 5: Running multiple sockets for same phone number
**Problem**: Account gets banned instantly. WhatsApp sees it as a compromised session.
**Fix**: One phone number = one active socket. Track in DB. Before `create()`, check if
session already exists and return early.

### 🚨 Bug 6: Cluster mode / multiple PM2 instances
**Problem**: Two processes try to own same session. Signal keys conflict. Messages fail.
**Fix**: `instances: 1` in PM2. NEVER cluster mode for Baileys. Use session-aware
load balancing if you need scale (route by sessionId hash to fixed server).

### 🚨 Bug 7: Sending too fast — bulk ban
**Problem**: Sent 500 messages in 5 minutes. Number banned.
**Fix**: Always delay 2–5 seconds between messages. Use BullMQ rate limiter. Warm up
new numbers slowly (see Section 21).

### 🚨 Bug 8: `connection === 'close'` with undefined `lastDisconnect`
**Problem**: Random production disconnects, no clear reason code, socket never reconnects.
**Fix**: When `lastDisconnect` is undefined or `lastDisconnect.error` is undefined,
always treat as reconnect. Undefined = normal WhatsApp keepalive cycle.
```typescript
const action = getReconnectAction(lastDisconnect?.error)
// getReconnectAction handles undefined by returning 'reconnect'
```

### 🚨 Bug 9: Not calling `fetchLatestBaileysVersion()`
**Problem**: WhatsApp updates its Web version. Hardcoded version stops working.
**Fix**: Always call `fetchLatestBaileysVersion()` at startup and pass to socket.
Cache it for 24 hours to avoid hammering the endpoint on every boot.

### 🚨 Bug 10: JID format wrong
**Problem**: `sendMessage` fails silently or throws. Number not found.
**Fix**: Format is `{countryCode+number}@s.whatsapp.net`. No +, no spaces, no dashes.
`919876543210@s.whatsapp.net` ✅ | `+91-9876543210@s.whatsapp.net` ❌

### 🚨 Bug 11: `syncFullHistory: true` with many sessions
**Problem**: On connect, WhatsApp syncs full chat history. 50 sessions × huge history = OOM crash.
**Fix**: `syncFullHistory: false` unless you specifically need message history and use
a proper store (not in-memory).

### 🚨 Bug 12: Missing `getMessage` for retry
**Problem**: WhatsApp asks Baileys to re-send a message for a contact. Baileys can't find it.
Messages fail to deliver.
**Fix**: Implement `getMessage` in socket config to look up messages from your DB.

### 🚨 Bug 13: "Closing stale open session for new outgoing prekey bundle"
**Problem**: Signal sessions being closed during key rotation. Messages stop delivering.
Seen after reconnects or idle periods.
**Fix**: This is a Baileys internal Signal protocol issue. Keep connection alive with
`keepAliveIntervalMs: 30_000`. If it persists, destroy and recreate socket (controlled restart).

### 🚨 Bug 14: Not handling `messages.upsert` type
**Problem**: Processing history sync messages as new messages. Bot replies to old chats.
**Fix**: Always check `if (type !== 'notify') return` at the start of your handler.
`notify` = real new message. `append` = history sync. Only process `notify`.

---

## 29. SECURITY CHECKLIST

```
[ ] API keys hashed in DB (never store plaintext)
[ ] API key rate limiting per tenant
[ ] HMAC signature on all webhooks (X-Webhook-Signature header)
[ ] Webhook signatures verified on receiver side
[ ] JWT expiry set (never infinite tokens)
[ ] CORS restricted to your frontend domain
[ ] Helmet.js enabled
[ ] Request body size limits
[ ] Input validation on all endpoints (Zod)
[ ] Redis auth password set
[ ] PostgreSQL not exposed publicly
[ ] Session IDs are non-guessable UUIDs
[ ] Media files served from private bucket (not public URL)
[ ] Logs redacted of API keys / secrets / phone numbers
[ ] No session creds stored in application logs
[ ] Docker containers run as non-root user
[ ] Nginx handles TLS — Node.js never handles raw SSL
[ ] Webhook URLs validated (no internal/localhost URLs)
[ ] Rate limit bulk sends per tenant
[ ] Audit log for all sent messages
```

---

## 30. BAILEYS V7 BREAKING CHANGES

> As of v7.0.0 (late 2025), major breaking changes were introduced.
> Migration guide: https://whiskey.so/migrate-latest

### Key changes in v7:
1. **Package renamed**: `@whiskeysockets/baileys` → `baileys`
   ```bash
   npm uninstall @whiskeysockets/baileys
   npm install baileys
   ```
   Update all imports: `from 'baileys'` instead of `from '@whiskeysockets/baileys'`

2. **Import style**: Some exports may have changed. Always check `import { X } from 'baileys'`
   against the actual package exports.

3. **Node.js version**: v7 requires Node.js 18+. Ensure your runtime is current.

4. **`useMultiFileAuthState` still works** but the internal key structure may differ
   from v6. Do not mix v6 and v7 auth state files.

5. **`fetchLatestBaileysVersion`** is still the correct way to get WA Web version.

6. **Check breaking changes before upgrading production**. Test in staging first.
   Keep your `baileys` version pinned in `package.json`:
   ```json
   { "dependencies": { "baileys": "7.x.x" } }
   ```

---

## QUICK REFERENCE CARD

### 5-minute startup checklist
```bash
# 1. Install
npm install baileys ioredis bullmq express socket.io qrcode

# 2. Import
import makeWASocket, {
  useMultiFileAuthState,    # Dev only — use Redis adapter in prod
  fetchLatestBaileysVersion,
  DisconnectReason,
  Browsers,
} from 'baileys'
import { Boom } from '@hapi/boom'

# 3. Minimum viable socket
const { version } = await fetchLatestBaileysVersion()
const { state, saveCreds } = await useMultiFileAuthState('./auth')
const sock = makeWASocket({
  version, auth: state,
  browser: Browsers.ubuntu('App'),
  printQRInTerminal: true,         # true for dev, false for prod
  markOnlineOnConnect: false,
})
sock.ev.on('creds.update', saveCreds)   # NEVER FORGET THIS

# 4. Connection handler
sock.ev.on('connection.update', ({ connection, lastDisconnect, qr }) => {
  if (qr) { /* push to frontend */ }
  if (connection === 'open') { /* session live */ }
  if (connection === 'close') {
    const code = (lastDisconnect?.error as Boom)?.output?.statusCode
    if (code !== DisconnectReason.loggedOut) reconnect()
    else deleteSession()
  }
})

# 5. Send a message
await sock.sendMessage('919876543210@s.whatsapp.net', { text: 'Hello!' })
```

### JID cheat sheet
```
Individual: {countryCode}{number}@s.whatsapp.net   → 919876543210@s.whatsapp.net
Group:      {groupId}@g.us                         → 120363025557123456@g.us
Broadcast:  status@broadcast
```

### Events cheat sheet
```typescript
sock.ev.on('creds.update', saveCreds)              // ALWAYS PRESENT
sock.ev.on('connection.update', handler)            // QR, open, close
sock.ev.on('messages.upsert', handler)             // Incoming messages
sock.ev.on('messages.update', handler)             // Read receipts, status
sock.ev.on('message-receipt.update', handler)      // Delivery receipts
sock.ev.on('chats.set', handler)                   // History sync
sock.ev.on('chats.upsert', handler)                // New chats
sock.ev.on('contacts.upsert', handler)             // Contact updates
sock.ev.on('groups.upsert', handler)               // New groups
sock.ev.on('groups.update', handler)               // Group info changed
sock.ev.on('group-participants.update', handler)   // Join/leave/promote
sock.ev.on('call', handler)                        // Incoming call events
```
