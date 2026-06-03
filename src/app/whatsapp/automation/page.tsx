'use client';

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Send, 
  Zap, 
  ShieldCheck, 
  Play, 
  Pause, 
  Square, 
  CheckCircle2, 
  AlertTriangle, 
  Terminal, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  FileSpreadsheet, 
  Loader2, 
  Sparkles,
  Info,
  Layers,
  Trash2,
  Plus,
  HelpCircle,
  Download
} from 'lucide-react';
import Navbar from '@/components/Navbar';

interface LogItem {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'error' | 'warning';
  text: string;
}

interface Recipient {
  phone: string;
  name: string;
  variables: Record<string, string>;
}

export default function WhatsappAutomation() {
  // Config state (kept for legacy fetch payload compatibility — values unused by Baileys route)
  const [authToken] = useState('baileys');
  const [senderPhone] = useState('baileys');
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'connected' | 'error'>('idle');
  const [connectionMessage, setConnectionMessage] = useState('');
  const [isConfigCollapsed, setIsConfigCollapsed] = useState(false);

  // Baileys session state
  const [baileysStatus, setBaileysStatus] = useState<'disconnected' | 'connecting' | 'qr_pending' | 'connected'>('disconnected');
  const [baileysQR, setBaileysQR] = useState<string | null>(null);
  const [qrExpiry, setQrExpiry] = useState(20);
  const sseRef = useRef<EventSource | null>(null);

  // Direct Tester State
  const [directPhone, setDirectPhone] = useState('');
  const [directText, setDirectText] = useState('');
  const [directType, setDirectType] = useState<'chat' | 'image'>('chat');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaFilename, setMediaFilename] = useState('image.jpg');
  const [mediaMimetype, setMediaMimetype] = useState('image/jpeg');
  const [directStatus, setDirectStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [directError, setDirectError] = useState('');
  const [directLogs, setDirectLogs] = useState<string[]>([]);
  const [isTesterCollapsed, setIsTesterCollapsed] = useState(true);

  // Bulk Broadcast State & Step Wizard
  const [broadcastMode, setBroadcastMode] = useState<'native' | 'legacy'>('legacy');
  const [csvInput, setCsvInput] = useState(
    "tracking_number,estimated_delivery,service_description,sender_company_name,sender_email,consignee_name,consignee_email,envia_tracking_head,fulltracking,head_no.,fullnumber,consignee_phone\n13115319319822,2026-06-04 20:00:00,Delhivery Surface,Inkfetish Publications,gunj06saksham@gmail.com,AARIFF MOHAMMED,aariff8462@gmail.com,https://envia.com/en-IN/tracking?label=,https://envia.com/en-IN/tracking?label=13115319319822,91,917250504240,9531919067"
  );
  
  // Sequence Editor templates array
  const [messageTemplates, setMessageTemplates] = useState<string[]>([
    "Hi {{consignee_name}},\n\nThank you for choosing *{{sender_company_name}}*! Your package is registered under tracking number *{{tracking_number}}*. {Ink runs in our veins! ✨|We bleed in ink. 🖤}",
    "Your package has been successfully dispatched via *{{service_description}}* and is estimated to deliver by *{{estimated_delivery}}*. Track it live here: {{fulltracking}}"
  ]);

  // Anti-Ban Safeguards State
  const [staggerDelay, setStaggerDelay] = useState(12); // Default 12 seconds for supreme safety
  const [enableJitter, setEnableJitter] = useState(true);
  const [enableWarmUp, setEnableWarmUp] = useState(true); // Dynamically scale sending delay at startup
  const [enableOptOut, setEnableOptOut] = useState(true); // Random unsubscribes footer injection
  const [stopOnFailure, setStopOnFailure] = useState(true); // Auto pause on 3 successive failures
  const [dailySendCap, setDailySendCap] = useState(1000); // Campaign enqueues safety limit
  const [enableBatching, setEnableBatching] = useState(false);
  const [batchSize, setBatchSize] = useState(20);
  const [batchPause, setBatchPause] = useState(120); // 2-min pause for high volume rest
  
  // Per-person sequence inter-message delay (random between min & max)
  const [seqDelayMin, setSeqDelayMin] = useState(1); // seconds
  const [seqDelayMax, setSeqDelayMax] = useState(3); // seconds
  
  const [isSafeguardsExpanded, setIsSafeguardsExpanded] = useState(false);

  // Dynamic CSV headers state
  const [detectedHeaders, setDetectedHeaders] = useState<string[]>(['phone', 'name', 'tracking_id', 'delivery_partner']);
  const [phoneColumn, setPhoneColumn] = useState<string>('');

  // Active broadcast tracking
  const [broadcastState, setBroadcastState] = useState<'idle' | 'running' | 'paused' | 'stopped' | 'completed'>('idle');
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, failed: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [logs, setLogs] = useState<LogItem[]>([]);

  // Periskope Queue Tracking
  const [activeBroadcastId, setActiveBroadcastId] = useState<string | null>(null);
  const [queueStatus, setQueueStatus] = useState<any>(null);
  const [isPurging, setIsPurging] = useState(false);

  // WhatsApp Group Members Extractor State
  const [groupJidInput, setGroupJidInput] = useState('');
  const [isFetchingMembers, setIsFetchingMembers] = useState(false);
  const [fetchedMembers, setFetchedMembers] = useState<any[] | null>(null);
  const [membersFetchError, setMembersFetchError] = useState('');
  const [isGroupToolExpanded, setIsGroupToolExpanded] = useState(false);
  const [groupList, setGroupList] = useState<any[] | null>(null);
  const [isFetchingGroups, setIsFetchingGroups] = useState(false);

  // Refs for loop controls
  const broadcastStateRef = useRef(broadcastState);
  const currentIndexRef = useRef(currentIndex);
  const statsRef = useRef(stats);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const pollingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const consecutiveFailuresRef = useRef(0);

  // Sync references
  useEffect(() => {
    broadcastStateRef.current = broadcastState;
  }, [broadcastState]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    statsRef.current = stats;
  }, [stats]);

  // Scroll to bottom of terminal whenever logs update
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Dynamic CSV headers extraction and auto phone column guesser
  useEffect(() => {
    try {
      const parsed = parseCsv();
      if (parsed.headers.length > 0) {
        setDetectedHeaders(parsed.headers);
        
        // Auto guess default phone column if current is not in headers
        const normalizedHeaders = parsed.headers.map(h => h.toLowerCase().replace(/\s+/g, '_'));
        const currentNorm = phoneColumn.toLowerCase().replace(/\s+/g, '_');
        
        if (!phoneColumn || !normalizedHeaders.includes(currentNorm)) {
          // Look for common phone column names in headers
          const candidates = ['fullnumber', 'consignee_phone', 'phone', 'number', 'recipient', 'full_number'];
          let guessed = '';
          for (const cand of candidates) {
            const idx = normalizedHeaders.indexOf(cand);
            if (idx !== -1) {
              guessed = parsed.headers[idx];
              break;
            }
          }
          if (!guessed && parsed.headers.length > 0) {
            guessed = parsed.headers[0]; // fallback to first column
          }
          if (guessed) {
            setPhoneColumn(guessed);
          }
        }
      }
    } catch (e) {
      console.error('Failed to parse CSV headers:', e);
    }
  }, [csvInput]);

  // Connect to Baileys SSE stream on mount — live QR + status events
  useEffect(() => {
    document.body.style.backgroundColor = '#090503';

    const connectSSE = () => {
      if (sseRef.current) sseRef.current.close();
      const es = new EventSource('http://localhost:3001/qr-stream');
      sseRef.current = es;

      es.addEventListener('status', (e) => {
        const { status, reason } = JSON.parse((e as MessageEvent).data);
        setBaileysStatus(status);
        if (status === 'connected') {
          setBaileysQR(null);
          setConnectionStatus('connected');
          setConnectionMessage('✅ Baileys WhatsApp session is live!');
          setIsConfigCollapsed(true);
        } else if (status === 'disconnected') {
          setConnectionStatus('idle');
          setConnectionMessage(reason === 'logged_out' ? '⚠️ Logged out from phone. Scan QR again.' : '');
        } else if (status === 'connecting' || status === 'qr_pending') {
          setConnectionStatus('idle');
        }
      });

      es.addEventListener('qr', (e) => {
        const { qr, expiresIn } = JSON.parse((e as MessageEvent).data);
        setBaileysQR(qr);
        setBaileysStatus('qr_pending');
        setQrExpiry(expiresIn || 20);
      });

      es.onerror = () => {
        setBaileysStatus('disconnected');
        setConnectionStatus('error');
        setConnectionMessage('Cannot reach Baileys server on port 3001. Start it with: cd baileys-server && node index.js');
      };
    };

    connectSSE();

    return () => {
      document.body.style.backgroundColor = '';
      if (pollingTimerRef.current) clearInterval(pollingTimerRef.current);
      if (sseRef.current) sseRef.current.close();
    };
  }, []);

  // QR expiry countdown
  useEffect(() => {
    if (!baileysQR) return;
    setQrExpiry(20);
    const t = setInterval(() => {
      setQrExpiry(prev => {
        if (prev <= 1) { clearInterval(t); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [baileysQR]);

  // Auto groups list loader when tool panel is expanded (only when Baileys is connected)
  useEffect(() => {
    if (isGroupToolExpanded && (!groupList || groupList.length === 0) && baileysStatus === 'connected') {
      fetchGroupList();
    }
  }, [isGroupToolExpanded, baileysStatus]);

  // Baileys: logout = clear session on server
  const disconnectBaileys = async () => {
    if (!confirm('Disconnect and clear the WhatsApp session? You will need to scan QR again.')) return;
    try {
      await fetch('http://localhost:3001/logout', { method: 'POST' });
      setBaileysStatus('disconnected');
      setBaileysQR(null);
      setConnectionStatus('idle');
      addLog('warning', 'WhatsApp session cleared. Scan QR to reconnect.');
    } catch {
      addLog('error', 'Failed to reach Baileys server.');
    }
  };

  // No-op stubs: Baileys has no server-side queue/broadcast tracking
  const fetchQueueStatus = async () => {};
  const fetchQueueStatusDirect = async (_token: string, _phone: string) => {};
  const handlePurgeQueue = async () => {
    addLog('info', 'Queue management not available with Baileys (messages send directly). No queue to purge.');
  };

  const addLog = (type: LogItem['type'], text: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        timestamp,
        type,
        text
      }
    ]);
  };

  const interruptibleSleep = (ms: number) => {
    return new Promise<void>((resolve) => {
      const start = Date.now();
      const interval = setInterval(() => {
        if (
          broadcastStateRef.current === 'stopped' || 
          broadcastStateRef.current === 'paused' ||
          broadcastStateRef.current === 'idle'
        ) {
          clearInterval(interval);
          resolve();
        } else if (Date.now() - start >= ms) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  };

  // Send Direct single message
  const handleSendDirect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!directPhone) {
      setDirectStatus('error');
      setDirectError('Recipient number is required.');
      return;
    }

    setDirectStatus('sending');
    setDirectError('');
    setDirectLogs(prev => [...prev, `[System] Dispatching direct message to ${directPhone}...`]);

    try {
      const res = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authToken,
          senderPhone,
          recipientPhone: directPhone,
          messageText: directText,
          messageType: directType,
          mediaUrl: directType === 'image' ? mediaUrl : undefined,
          mediaFilename: directType === 'image' ? mediaFilename : undefined,
          mediaMimetype: directType === 'image' ? mediaMimetype : undefined,
        })
      });

      const data = await res.json();
      if (data.success) {
        setDirectStatus('success');
        setDirectLogs(prev => [
          ...prev, 
          `[Success] Message dispatched. ID: ${data.data?.unique_id || 'Sent'} ✅`
        ]);
        addLog('success', `Direct message to ${directPhone} successfully queued.`);
        setDirectText('');
        fetchQueueStatus();
      } else {
        throw new Error(data.error || 'Server responded with an error.');
      }
    } catch (err: any) {
      setDirectStatus('error');
      setDirectError(err.message || 'Failed to send message.');
      setDirectLogs(prev => [...prev, `[Error] ${err.message || 'Network error occurred.'} ❌`]);
      addLog('error', `Direct send failed for ${directPhone}: ${err.message}`);
    }
  };

  // Dynamic CSV parser
  const parseCsv = (customPhoneColumn?: string): { recipients: Recipient[]; headers: string[] } => {
    const lines = csvInput.split('\n');
    const recipientsList: Recipient[] = [];
    let headers: string[] = [];
    const activePhoneCol = (customPhoneColumn || phoneColumn || '').toLowerCase().replace(/\s+/g, '_');

    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      if (!trimmed || trimmed.startsWith('//')) continue;

      const parts = trimmed.split(',').map(p => p.trim());
      if (parts.length === 0 || !parts[0]) continue;

      if (headers.length === 0) {
        headers = parts.map(h => h.toLowerCase().replace(/\s+/g, '_'));
        continue;
      }

      const variables: Record<string, string> = {};
      let phone = '';
      let name = 'Writer';

      headers.forEach((header, index) => {
        const val = parts[index] || '';
        const normalizedHeader = header.toLowerCase().replace(/\s+/g, '_');
        
        if (activePhoneCol && normalizedHeader === activePhoneCol) {
          phone = val;
        } else if (!activePhoneCol && (normalizedHeader === 'phone' || normalizedHeader === 'number' || normalizedHeader === 'recipient' || normalizedHeader === 'consignee_phone' || normalizedHeader === 'fullnumber')) {
          phone = val;
        }
        
        if (normalizedHeader === 'name' || normalizedHeader === 'consignee_name') {
          name = val || 'Writer';
        }
        variables[header] = val;
      });

      if (!phone && !activePhoneCol && parts[0]) {
        phone = parts[0];
      }

      if (phone) {
        recipientsList.push({ phone, name, variables });
      }
    }

    return { recipients: recipientsList, headers };
  };

  // Randomized Spintax bracket choices resolver
  const parseSpintax = (text: string): string => {
    return text.replace(/\{([^{}]+)\}/g, (match, choicesStr) => {
      const choices = choicesStr.split('|');
      return choices[Math.floor(Math.random() * choices.length)];
    });
  };

  // Opt-out footer random generator to reduce manual user spam flags
  const generateOptOutFooter = (): string => {
    if (!enableOptOut) return '';
    const footers = [
      '\n\n_Reply STOP to unsubscribe_',
      '\n\n_Send UNSUB to opt-out_',
      '\n\n_Reply 9 to unsubscribe_',
      '\n\n_Reply STOP to unsubscribe from alerts_'
    ];
    return footers[Math.floor(Math.random() * footers.length)];
  };

  // Dynamic Placeholder Interpolator matching dynamic CSV keys
  const compileTemplate = (template: string, recipient: Recipient): string => {
    let message = template;
    message = message.replace(/\{\{name\}\}/gi, recipient.name);
    
    Object.keys(recipient.variables).forEach((key) => {
      const value = recipient.variables[key];
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'gi');
      message = message.replace(regex, value);
    });
    
    return message;
  };

  // Polling Loop for Native Broadcast Campaign Monitoring
  const startPollingBroadcastStatus = (broadcastId: string, totalCount: number, onComplete: () => void) => {
    if (pollingTimerRef.current) clearInterval(pollingTimerRef.current);
    
    addLog('info', `🤖 Active polling: tracking campaign progress for Broadcast sequence ID ${broadcastId}...`);
    
    let pollCount = 0;
    pollingTimerRef.current = setInterval(async () => {
      if (broadcastStateRef.current !== 'running') {
        clearInterval(pollingTimerRef.current!);
        return;
      }

      try {
        const res = await fetch('/api/whatsapp/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            authToken,
            senderPhone,
            action: 'getBroadcastStatus',
            broadcastId
          })
        });
        const result = await res.json();
        if (result.success && result.data) {
          const bStatus = result.data;
          
          const sent = Number(bStatus.sent_chats !== undefined ? bStatus.sent_chats : (bStatus.sent_count || 0));
          const failed = Number(bStatus.failed_chats !== undefined ? bStatus.failed_chats : (bStatus.failed_count || 0));
          const queued = Number(bStatus.pending_chats !== undefined ? bStatus.pending_chats : (bStatus.queued_count || 0));
          const total = Number(bStatus.total_chats !== undefined ? bStatus.total_chats : (bStatus.total_count || totalCount));
          const status = bStatus.broadcast_status || 'in-progress';

          setStats({
            total,
            completed: sent,
            failed: failed
          });

          pollCount++;
          if (pollCount % 3 === 0 || queued === 0) {
            addLog('info', `📡 Live Stats • State: [${status.toUpperCase()}] • Queued: ${queued} • Sent: ${sent} • Failed: ${failed}`);
          }

          // Safe lock check if successive failures occur inside Periskope queue
          if (failed >= 3 && sent === 0 && stopOnFailure) {
            addLog('error', '🚨 Safe Lock triggered: detected multiple failed dispatches inside Periskope queue. Check number status.');
          }

          if (status === 'completed' || (queued === 0 && (sent + failed >= total))) {
            clearInterval(pollingTimerRef.current!);
            onComplete();
          }
        }
      } catch (err: any) {
        console.error('Error polling broadcast status:', err);
      }
    }, 3000);
  };

  // Compile and launch a single native broadcast campaign
  const launchNativeBroadcastCampaign = async (templateText: string, list: Recipient[], campaignIndex: number, totalCampaigns: number): Promise<string> => {
    addLog('info', `🚀 Compiling campaign variables & Spintax keys for Broadcast #${campaignIndex}/${totalCampaigns}...`);
    
    // Resolve Spintax and dynamic variables on client per contact, and inject into a single Periskope template variable "{{personal_copy}}"
    const variablesPayload = list.map(r => {
      const interpolatedText = compileTemplate(templateText, r);
      let fullyHumanizedText = parseSpintax(interpolatedText);
      
      // Inject random opt-out instructions footer to reduce direct block rates
      if (enableOptOut) {
        fullyHumanizedText += generateOptOutFooter();
      }

      return {
        chat_id: r.phone,
        values: {
          personal_copy: fullyHumanizedText
        }
      };
    });

    const chatIdsList = list.map(r => r.phone);

    const res = await fetch('/api/whatsapp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        authToken,
        senderPhone,
        action: 'broadcast',
        chatIds: chatIdsList,
        messageText: '{{personal_copy}}', // Template body passes the resolved custom personal text
        delay: staggerDelay,
        variables: variablesPayload
      })
    });

    const data = await res.json();
    if (data.success && data.data?.broadcast_id) {
      return data.data.broadcast_id;
    } else {
      throw new Error(data.error || 'Server rejected broadcast request.');
    }
  };

  // Main Staggered Multi-Template Native Dispatch Loop
  const runNativeBroadcastSequence = async (list: Recipient[]) => {
    addLog('info', `✨ Launching server-side campaign sequence (${messageTemplates.length} messages)...`);
    
    for (let c = 0; c < messageTemplates.length; c++) {
      if (broadcastStateRef.current !== 'running') break;

      const templateText = messageTemplates[c];
      addLog('info', `📡 Initializing Native Broadcast Campaign #${c + 1}/${messageTemplates.length}...`);

      try {
        const broadcastId = await launchNativeBroadcastCampaign(templateText, list, c + 1, messageTemplates.length);
        setActiveBroadcastId(broadcastId);
        addLog('success', `🎉 Broadcast Campaign #${c + 1} enqueued successfully! Broadcast ID: ${broadcastId}`);
        fetchQueueStatus();

        // Promise to wait for this campaign's completion
        await new Promise<void>((resolve) => {
          startPollingBroadcastStatus(broadcastId, list.length, () => {
            resolve();
          });
        });

        if (c < messageTemplates.length - 1 && broadcastStateRef.current === 'running') {
          const sequenceRestDelay = 15;
          addLog('warning', `⏳ Pacing: Campaign #${c + 1} complete. Pausing for ${sequenceRestDelay}s before launching Campaign #${c + 2}...`);
          await interruptibleSleep(sequenceRestDelay * 1000);
        }

      } catch (err: any) {
        addLog('error', `🚨 Campaign #${c + 1} launch failed: ${err.message || 'Unknown error'}`);
        setBroadcastState('stopped');
        break;
      }
    }

    if (broadcastStateRef.current === 'running') {
      setBroadcastState('completed');
      addLog('success', `✨ Multi-Template Broadcast sequence fully complete! All campaigns enqueued successfully. 🚀`);
      fetchQueueStatus();
    }
  };

  // Main Staggered Multi-Template Legacy Dispatch Loop (Client-side sequential)
  const runLegacyBroadcastLoop = async (currentIdx: number, list: Recipient[]) => {
    let index = currentIdx;
    consecutiveFailuresRef.current = 0;
    
    addLog('info', `Starting browser sequential broadcast sequence for ${list.length} contacts...`);

    while (index < list.length && broadcastStateRef.current === 'running') {
      const recipient = list[index];
      
      addLog('info', `💬 Sequence sequence started for: ${recipient.name} (+${recipient.phone})...`);

      // Dispatch sequence of messages to this recipient
      for (let t = 0; t < messageTemplates.length; t++) {
        if (broadcastStateRef.current !== 'running') break;

        const rawTemplate = messageTemplates[t];
        const interpolatedText = compileTemplate(rawTemplate, recipient);
        let fullyHumanizedText = parseSpintax(interpolatedText);

        // Inject random opt-out instructions footer to reduce direct block rates
        if (enableOptOut) {
          fullyHumanizedText += generateOptOutFooter();
        }

        addLog('info', `[${index + 1}/${list.length}] Dispatching Message #${t + 1}/${messageTemplates.length} to ${recipient.name}...`);

        try {
          const res = await fetch('/api/whatsapp/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              authToken,
              senderPhone,
              recipientPhone: recipient.phone,
              messageText: fullyHumanizedText,
              messageType: 'chat'
            })
          });

          const data = await res.json();
          if (data.success) {
            addLog('success', `[SUCCESS] Sent Message #${t + 1}/${messageTemplates.length} to ${recipient.name}. Job ID: ${data.data?.queue_id || 'Queued'} ✅`);
            consecutiveFailuresRef.current = 0; // Reset consecutive failures on success
          } else {
            throw new Error(data.error || 'Server error.');
          }
        } catch (err: any) {
          addLog('error', `[FAILED] Message #${t + 1}/${messageTemplates.length} to ${recipient.name} failed: ${err.message || 'Unknown error'} ❌`);
          
          consecutiveFailuresRef.current += 1;
          // Emergency Safe Lock: Auto pause if 3 consecutive failures occur
          if (stopOnFailure && consecutiveFailuresRef.current >= 3) {
            setBroadcastState('paused');
            addLog('error', '🚨 EMERGENCY SAFE LOCK TRIGGERED: 3 consecutive message failures occurred! Campaign automatically paused to prevent account suspension. Check gateway connectivity or recipient number formats.');
            break;
          }
        }

        // Add short humanized pause between sequence messages for the same person
        if (t < messageTemplates.length - 1 && broadcastStateRef.current === 'running') {
          const minMs = Math.max(500, seqDelayMin * 1000);
          const maxMs = Math.max(minMs, seqDelayMax * 1000);
          const typingPause = minMs + Math.random() * (maxMs - minMs);
          addLog('info', `🤖 [Sequence gap] Waiting ${(typingPause / 1000).toFixed(1)}s before Message #${t + 2} to same recipient...`);
          await interruptibleSleep(typingPause);
        }
      }

      // Check if emergency safe lock paused loop
      if ((broadcastStateRef.current as string) === 'paused' && stopOnFailure && consecutiveFailuresRef.current >= 3) {
        break;
      }

      setStats(prev => ({ ...prev, completed: prev.completed + 1 }));

      const nextIndex = index + 1;
      setCurrentIndex(nextIndex);
      index = nextIndex;

      // Check if campaign reached daily/batch cap
      if (nextIndex >= dailySendCap) {
        setBroadcastState('completed');
        addLog('warning', `⚠️ Safety Cap reached: Successfully processed limit cap of ${dailySendCap} messages in this campaign run. Stopped to keep phone reputation safe.`);
        fetchQueueStatus();
        break;
      }

      // Check if finished
      if (nextIndex >= list.length) {
        setBroadcastState('completed');
        addLog('success', `✨ Legacy sequential broadcast complete! Total processed: ${list.length}. Success: ${statsRef.current.completed}, Failed: ${statsRef.current.failed}.`);
        fetchQueueStatus();
        break;
      }

      // Safe batching limits
      if (enableBatching && nextIndex % batchSize === 0) {
        addLog('warning', `⚡ Batch limit of ${batchSize} reached. Injecting batch rest pause of ${batchPause}s...`);
        
        let countdown = batchPause;
        while (countdown > 0 && broadcastStateRef.current === 'running') {
          if (countdown % 15 === 0 || countdown <= 5) {
            addLog('info', `⏳ Batch pause: Resuming in ${countdown} seconds...`);
          }
          await interruptibleSleep(1000);
          countdown--;
        }
      } else {
        // Dynamic reputational warm-up delay scaling
        let currentDelay = staggerDelay;
        if (enableWarmUp) {
          if (nextIndex <= 10) {
            currentDelay = staggerDelay * 2.5; // 2.5x slower delay (warm-up zone 1)
          } else if (nextIndex <= 30) {
            currentDelay = staggerDelay * 1.8; // 1.8x slower delay (warm-up zone 2)
          } else if (nextIndex <= 60) {
            currentDelay = staggerDelay * 1.3; // 1.3x slower delay (warm-up zone 3)
          }
        }

        let delayMs = currentDelay * 1000;
        
        if (enableJitter) {
          const jitterAmount = (Math.random() * 0.6 - 0.3) * delayMs;
          delayMs = Math.max(2000, delayMs + jitterAmount);
          
          if (enableWarmUp && nextIndex <= 60) {
            addLog('info', `🤖 dynamic warm-up: sleeping for ${(delayMs / 1000).toFixed(1)}s (Message #${nextIndex} in warm-up curve)...`);
          } else {
            addLog('info', `🤖 Organic staggering: sleeping for ${(delayMs / 1000).toFixed(1)}s before next contact...`);
          }
        } else {
          addLog('info', `⏳ Staggering: sleeping for ${currentDelay}s before next contact...`);
        }

        await interruptibleSleep(delayMs);
      }

      if ((broadcastStateRef.current as string) === 'paused') {
        addLog('warning', `⏸ Broadcast execution paused at item ${nextIndex + 1}/${list.length}. Progression saved.`);
        break;
      }
      if ((broadcastStateRef.current as string) === 'stopped') {
        addLog('error', `🛑 Broadcast loop forcibly halted.`);
        break;
      }
    }
  };

  const startBroadcast = async () => {
    if (connectionStatus !== 'connected') {
      alert('Please connect your WhatsApp session in Step 1 before launching the campaign.');
      return;
    }

    const parsed = parseCsv();
    if (parsed.recipients.length === 0) {
      alert('No valid recipients found. Please verify your CSV format.');
      return;
    }

    setRecipients(parsed.recipients);
    setStats({ total: parsed.recipients.length, completed: 0, failed: 0 });
    setCurrentIndex(0);
    setLogs([]);
    setBroadcastState('running');

    if (broadcastMode === 'native') {
      setTimeout(() => {
        runNativeBroadcastSequence(parsed.recipients);
      }, 100);
    } else {
      setTimeout(() => {
        runLegacyBroadcastLoop(0, parsed.recipients);
      }, 100);
    }
  };

  const pauseBroadcast = () => {
    setBroadcastState('paused');
    addLog('warning', 'Pausing broadcast process... Resolving active sleep timer.');
  };

  const resumeBroadcast = () => {
    setBroadcastState('running');
    addLog('info', `Resuming broadcast from item ${currentIndex + 1}/${recipients.length}...`);
    setTimeout(() => {
      runLegacyBroadcastLoop(currentIndex, recipients);
    }, 100);
  };

  const stopBroadcast = () => {
    setBroadcastState('stopped');
    addLog('error', 'Stopping broadcast campaign loop. Active queues terminated locally.');
    if (pollingTimerRef.current) clearInterval(pollingTimerRef.current);
  };

  const resetBroadcast = () => {
    setBroadcastState('idle');
    setRecipients([]);
    setCurrentIndex(0);
    setStats({ total: 0, completed: 0, failed: 0 });
    setLogs([]);
    setActiveBroadcastId(null);
    if (pollingTimerRef.current) clearInterval(pollingTimerRef.current);
  };

  // WhatsApp Group Members Extractor Tool Functions
  const fetchGroupList = async () => {
    if (connectionStatus !== 'connected') {
      setMembersFetchError('Please connect your WhatsApp session in Step 1 first.');
      return;
    }

    setIsFetchingGroups(true);
    setMembersFetchError('');
    addLog('info', 'Querying Baileys server for all active WhatsApp groups...');

    try {
      const res = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authToken,
          senderPhone,
          action: 'listGroups'
        })
      });

      const result = await res.json();
      if (result.success && result.data) {
        let rawChats: any[] = [];
        if (Array.isArray(result.data)) {
          rawChats = result.data;
        } else if (result.data && Array.isArray(result.data.chats)) {
          rawChats = result.data.chats;
        }

        const groups = rawChats.map(c => ({
          chat_id: c.chat_id,
          name: c.name || c.chat_name || 'Unnamed Group'
        })).filter(g => g.chat_id.endsWith('@g.us'));

        setGroupList(groups);
        addLog('success', `Successfully retrieved ${groups.length} WhatsApp groups from your phone gateway! 📋`);
        if (groups.length === 0) {
          setMembersFetchError('No active WhatsApp groups found associated with this sender gateway phone.');
        }
      } else {
        throw new Error(result.error || 'Failed to list WhatsApp groups.');
      }
    } catch (err: any) {
      console.error(err);
      setMembersFetchError(err.message || 'Failed to retrieve groups.');
      addLog('error', `Groups listing failed: ${err.message || 'Check your gateway connectivity.'}`);
    } finally {
      setIsFetchingGroups(false);
    }
  };

  const fetchGroupMembers = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupJidInput) {
      setMembersFetchError('Please enter a WhatsApp Group ID (ends with @g.us).');
      return;
    }

    if (connectionStatus !== 'connected') {
      setMembersFetchError('Please connect your WhatsApp session in Step 1 first.');
      return;
    }

    setIsFetchingMembers(true);
    setMembersFetchError('');
    setFetchedMembers(null);
    addLog('info', `Initiating group members extraction for group ID: "${groupJidInput}"...`);

    let targetJid = groupJidInput.trim();
    
    // Auto format if user just typed group numbers
    if (!targetJid.includes('@')) {
      targetJid = `${targetJid}@g.us`;
    }

    try {
      const res = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authToken,
          senderPhone,
          action: 'getChatDetails',
          recipientPhone: targetJid
        })
      });

      const result = await res.json();
      if (result.success && result.data) {
        const chatData = result.data;
        if (chatData.members) {
          const list = Object.keys(chatData.members).map(jid => {
            const info = chatData.members[jid];
            const phone = jid.split('@')[0];
            return {
              jid,
              phone,
              name: info.name || info.pushname || 'WhatsApp Contact',
              role: info.role || 'member'
            };
          });

          setFetchedMembers(list);
          addLog('success', `Extracted ${list.length} group members successfully! 📥`);
        } else {
          throw new Error('No members dictionary returned. Verify this is a valid WhatsApp group chat.');
        }
      } else {
        throw new Error(result.error || 'Failed to fetch group details.');
      }
    } catch (err: any) {
      console.error(err);
      setMembersFetchError(err.message || 'Failed to retrieve group members.');
      addLog('error', `Group extraction failed: ${err.message || 'Check your JID format.'}`);
    } finally {
      setIsFetchingMembers(false);
    }
  };

  const importMembersToCampaign = () => {
    if (!fetchedMembers || fetchedMembers.length === 0) return;

    if (!confirm(`Are you sure you want to IMPORT all ${fetchedMembers.length} group members into your Step 2 Campaign Audience? This will overwrite the current CSV list.`)) {
      return;
    }

    addLog('info', 'Compiling group member phone list into dynamic tracking CSV format...');

    const headers = [
      'tracking_number', 'estimated_delivery', 'service_description', 
      'sender_company_name', 'sender_email', 'consignee_name', 'consignee_email', 
      'envia_tracking_head', 'fulltracking', 'head_no.', 'fullnumber', 'consignee_phone'
    ];

    const csvRows = [headers.join(',')];

    fetchedMembers.forEach((member, i) => {
      const row = [
        `MOCK-TRK-${1000 + i}`,                   // tracking_number
        '2026-06-05 18:00:00',                    // estimated_delivery
        'Delhivery Surface',                      // service_description
        'Inkfetish Publications',                 // sender_company_name
        'gunj06saksham@gmail.com',                // sender_email
        member.name.replace(/,/g, ''),            // consignee_name
        'writer@inkfetish.com',                   // consignee_email
        'https://envia.com/en-IN/tracking?label=',// envia_tracking_head
        `https://envia.com/en-IN/tracking?label=MOCK-TRK-${1000 + i}`, // fulltracking
        '91',                                     // head_no.
        member.phone,                             // fullnumber
        member.phone                              // consignee_phone
      ];
      csvRows.push(row.join(','));
    });

    const newCsvContent = csvRows.join('\n');
    setCsvInput(newCsvContent);
    setPhoneColumn('fullnumber');
    
    addLog('success', `Campaign database populated with ${fetchedMembers.length} group contacts successfully! 🚀`);
    setIsGroupToolExpanded(false);
  };

  // Template Sequence Operations
  const addMessageTemplate = () => {
    setMessageTemplates(prev => [...prev, '']);
    addLog('info', `Added new Message Template #${messageTemplates.length + 1} to sequence.`);
  };

  const updateMessageTemplate = (index: number, val: string) => {
    setMessageTemplates(prev => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const deleteMessageTemplate = (index: number) => {
    if (messageTemplates.length <= 1) {
      alert('The sequence must contain at least one message template.');
      return;
    }
    setMessageTemplates(prev => prev.filter((_, idx) => idx !== index));
    addLog('warning', `Removed Message Template #${index + 1} from sequence.`);
  };

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-500 selection:text-stone-900 pb-16">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-stone-850 pb-8 mb-10">
          <div>
            <div className="flex items-center gap-2 text-amber-500 text-xs font-mono uppercase tracking-[0.2em] mb-2">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Campaign Wizard v3.2 • High-Volume Anti-Ban Suite</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-glow text-[#F5E6CC] font-serif">
              WhatsApp <span className="text-stone-400 italic">Campaigns</span>
            </h1>
            <p className="text-stone-500 text-sm mt-1 max-w-xl font-serif">
              Streamlined wizard workspace for high-volume automated dispatching (up to 1,000+ messages) with reputational warmups and dynamic Spintax randomization.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Live Queue Health counter */}
            {queueStatus && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-950/40 text-[10px] font-mono bg-stone-950/60 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Gateway Queue Depth: {queueStatus.active_jobs_count || 0} active • {queueStatus.queued_jobs_count || 0} queued</span>
              </div>
            )}
          </div>
        </div>

        {/* --- STEP-BY-STEP CAMPAIGN WIZARD FLOW --- */}
        <div className="space-y-8">

          {/* STEP 1: 🔐 WHATSAPP SESSION (BAILEYS) */}
          <div className="bg-stone-900/40 backdrop-blur-md rounded-2xl border border-stone-800 shadow-xl overflow-hidden">
            <button
              onClick={() => setIsConfigCollapsed(!isConfigCollapsed)}
              className="w-full flex items-center justify-between p-5 hover:bg-stone-900/20 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg transition-colors ${baileysStatus === 'connected' ? 'bg-emerald-500/10 text-emerald-400' : baileysStatus === 'qr_pending' ? 'bg-amber-500/10 text-amber-400 animate-pulse' : 'bg-stone-800 text-stone-400'}`}>
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#F5E6CC] flex items-center gap-2">
                    <span>Step 1: WhatsApp Session</span>
                    {baileysStatus === 'connected' && (
                      <span className="text-xs font-mono text-emerald-400 px-2 py-0.5 bg-emerald-950/40 rounded-full border border-emerald-900/40 animate-pulse">● Live</span>
                    )}
                    {baileysStatus === 'qr_pending' && (
                      <span className="text-xs font-mono text-amber-400 px-2 py-0.5 bg-amber-950/40 rounded-full border border-amber-900/40">📱 Scan QR</span>
                    )}
                    {baileysStatus === 'connecting' && (
                      <span className="text-xs font-mono text-stone-400 px-2 py-0.5 bg-stone-900/40 rounded-full border border-stone-800">⏳ Connecting...</span>
                    )}
                    {baileysStatus === 'disconnected' && (
                      <span className="text-xs font-mono text-rose-400 px-2 py-0.5 bg-rose-950/40 rounded-full border border-rose-900/40">Offline</span>
                    )}
                  </h3>
                  <p className="text-[10px] text-stone-500 font-mono uppercase tracking-wider">Baileys Local Session • No API credits needed</p>
                </div>
              </div>
              <span className="text-xs font-mono text-stone-500 hover:text-stone-300">
                {isConfigCollapsed ? 'Expand [+]' : 'Collapse [-]'}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {!isConfigCollapsed && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden border-t border-stone-850"
                >
                  <div className="p-6 bg-stone-950/20">

                    {/* Connected State */}
                    {baileysStatus === 'connected' && (
                      <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3 p-4 bg-emerald-950/20 rounded-xl border border-emerald-900/30">
                            <CheckCircle2 className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                            <div>
                              <p className="text-emerald-400 font-semibold text-sm">WhatsApp Connected ✅</p>
                              <p className="text-stone-400 text-xs font-mono mt-0.5">Baileys session is active. Messages will send via your phone.</p>
                            </div>
                          </div>
                          <p className="text-[10px] font-mono text-stone-500 leading-relaxed">
                            🔒 Session is saved to disk — you won't need to scan QR again after restarts.
                          </p>
                        </div>
                        <button
                          onClick={disconnectBaileys}
                          className="px-5 py-2.5 bg-rose-950/30 border border-rose-900/40 hover:bg-rose-950/50 text-rose-400 font-mono text-xs rounded-xl transition-all flex items-center gap-2"
                        >
                          <Square className="w-4 h-4" />
                          Disconnect
                        </button>
                      </div>
                    )}

                    {/* QR Pending State */}
                    {baileysStatus === 'qr_pending' && baileysQR && (
                      <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* QR Image */}
                        <div className="relative flex-shrink-0">
                          <div className="p-3 bg-white rounded-2xl shadow-2xl shadow-amber-500/10">
                            <img
                              src={baileysQR}
                              alt="WhatsApp QR Code — scan with your phone"
                              width={220}
                              height={220}
                              className="rounded-lg"
                            />
                          </div>
                          {/* Expiry countdown ring */}
                          <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-mono font-bold border
                            ${qrExpiry > 10 ? 'bg-emerald-950/80 text-emerald-400 border-emerald-900/50' : qrExpiry > 5 ? 'bg-amber-950/80 text-amber-400 border-amber-900/50' : 'bg-rose-950/80 text-rose-400 border-rose-900/50'}`}
                          >
                            ⏱ {qrExpiry}s
                          </div>
                        </div>

                        {/* Instructions */}
                        <div className="space-y-4 flex-1">
                          <div>
                            <h4 className="text-[#F5E6CC] font-serif text-base mb-2">Scan to connect WhatsApp</h4>
                            <ol className="space-y-2 text-xs font-mono text-stone-400">
                              <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">1.</span> Open WhatsApp on your phone</li>
                              <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">2.</span> Go to Settings → Linked Devices</li>
                              <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">3.</span> Tap "Link a Device"</li>
                              <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">4.</span> Point camera at the QR code</li>
                            </ol>
                          </div>
                          <div className="p-3 bg-amber-950/10 border border-amber-900/20 rounded-xl">
                            <p className="text-[10px] font-mono text-amber-500/80 leading-relaxed">
                              ⚡ QR refreshes automatically every ~20s. Once scanned, this panel will collapse and show "Live". Your session is saved permanently.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Connecting / Loading State */}
                    {(baileysStatus === 'connecting') && (
                      <div className="flex items-center gap-4 p-4 bg-stone-900/40 rounded-xl border border-stone-800">
                        <Loader2 className="w-6 h-6 text-amber-500 animate-spin flex-shrink-0" />
                        <div>
                          <p className="text-stone-300 text-sm font-medium">Connecting to WhatsApp...</p>
                          <p className="text-stone-500 text-xs font-mono mt-0.5">Restoring saved session. QR will appear if re-scan is needed.</p>
                        </div>
                      </div>
                    )}

                    {/* Disconnected / Error State */}
                    {baileysStatus === 'disconnected' && (
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-4 bg-rose-950/10 rounded-xl border border-rose-900/30">
                          <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-rose-400 font-medium text-sm">Baileys Server Not Running</p>
                            <p className="text-stone-400 text-xs font-mono mt-1 leading-relaxed">
                              {connectionMessage || 'Cannot reach localhost:3001. Start the Baileys server first.'}
                            </p>
                          </div>
                        </div>
                        <div className="p-3 bg-stone-950/40 rounded-xl border border-stone-850">
                          <p className="text-[10px] font-mono text-stone-500 mb-2 uppercase tracking-widest">Start command:</p>
                          <code className="text-xs font-mono text-amber-400">cd baileys-server &amp;&amp; node index.js</code>
                        </div>
                      </div>
                    )}

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* STEP 2: 👥 AUDIENCE DATABASE */}
          <div className="bg-stone-900/40 backdrop-blur-md rounded-2xl border border-stone-800 shadow-xl p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-850 pb-3 mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#F5E6CC]">Step 2: Campaign Audience Database</h3>
                  <p className="text-[10px] text-stone-500 font-mono uppercase tracking-wider">Paste or upload recipient records</p>
                </div>
              </div>
            </div>

            {/* Group Extractor Toggle Strip */}
            <button
              type="button"
              onClick={() => { console.log('group toggle clicked', !isGroupToolExpanded); setIsGroupToolExpanded(v => !v); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all cursor-pointer
                ${isGroupToolExpanded 
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-400' 
                  : 'bg-stone-950/60 border-stone-800 hover:border-amber-500/30 hover:bg-amber-950/10 text-amber-500'}
              `}
            >
              <span className="flex items-center gap-2 font-mono text-xs font-bold tracking-wide">
                <RefreshCw className={`w-4 h-4 ${isFetchingGroups ? 'animate-spin' : ''}`} />
                📥 Extract from WhatsApp Group — Import contacts directly from a WA group
              </span>
              <span className="font-mono text-[10px] opacity-60">{isGroupToolExpanded ? '▲ Collapse' : '▼ Expand'}</span>
            </button>

            {/* Collapsible WhatsApp Group Members Extractor Panel */}
            {isGroupToolExpanded && (
              <div className="border border-amber-950/20 bg-amber-950/5 rounded-xl p-4 md:p-5 space-y-4 transition-all duration-300">
                  <div className="flex items-center justify-between border-b border-stone-850 pb-3">
                    <h4 className="font-serif text-sm text-[#F5E6CC] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                      <span>WhatsApp Group Members Extractor Tool</span>
                    </h4>
                    <span className="text-[9px] font-mono text-stone-500 uppercase tracking-wider">
                      Baileys Local REST Engine
                    </span>
                  </div>

                  {/* Select Group Dropdown & Action sync */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div>
                      <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-2">
                        📋 Select from your Active WhatsApp Groups:
                      </label>
                      <div className="relative">
                        <select
                          className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 pr-10 text-[#F5E6CC] font-mono text-xs outline-none focus:border-amber-500/40 transition-colors appearance-none cursor-pointer"
                          value={groupJidInput}
                          onChange={(e) => {
                            setGroupJidInput(e.target.value);
                            setMembersFetchError('');
                            setFetchedMembers(null);
                            // Auto trigger fetch when a group is selected!
                            if (e.target.value) {
                              setTimeout(() => {
                                const fetchBtn = document.getElementById('btn-fetch-members');
                                if (fetchBtn) fetchBtn.click();
                              }, 100);
                            }
                          }}
                          disabled={isFetchingGroups || isFetchingMembers}
                        >
                          <option value="" className="bg-stone-950 text-stone-500">
                            {isFetchingGroups ? '⏳ Loading groups list from gateway...' : 'Select a group...'}
                          </option>
                          {groupList && groupList.map((g) => (
                            <option key={g.chat_id} value={g.chat_id} className="bg-stone-950 text-stone-300">
                              {g.name} ({g.chat_id.split('@')[0]})
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500">
                          ▼
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={fetchGroupList}
                        disabled={isFetchingGroups || isFetchingMembers}
                        className="px-4 py-3 bg-stone-950 border border-stone-850 hover:bg-stone-900 text-stone-300 font-mono text-xs rounded-xl flex items-center gap-1.5 transition-all"
                        title="Reload groups list from WhatsApp"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isFetchingGroups ? 'animate-spin' : ''}`} />
                        <span>Sync Groups</span>
                      </button>

                      <button
                        id="btn-fetch-members"
                        type="button"
                        onClick={(e) => fetchGroupMembers(e)}
                        disabled={isFetchingMembers || !groupJidInput}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isFetchingMembers ? (
                          <>
                            <Loader2 className="animate-spin w-4 h-4" />
                            <span>Extracting...</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4 text-stone-950 fill-stone-950" />
                            <span>Fetch Members</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Collapsible Manual Advanced Input Backup */}
                  <div className="p-2 border border-dashed border-stone-850 rounded-xl bg-stone-950/20">
                    <details className="cursor-pointer">
                      <summary className="text-[9px] font-mono text-stone-500 hover:text-stone-300 uppercase tracking-widest select-none">
                        ⚙️ Manually enter Group ID / Link (Advanced Backup)
                      </summary>
                      <div className="pt-2">
                        <input 
                          type="text"
                          placeholder="Manual Group JID (e.g. 120363292415174542@g.us)"
                          className="w-full bg-stone-950 border border-stone-850 rounded-lg p-2.5 text-stone-300 font-mono text-xs focus:border-amber-500/30 outline-none transition-colors"
                          value={groupJidInput}
                          onChange={e => {
                            setGroupJidInput(e.target.value);
                            setMembersFetchError('');
                          }}
                          disabled={isFetchingMembers}
                        />
                      </div>
                    </details>
                  </div>

                  {membersFetchError && (
                    <div className="p-3 bg-rose-950/20 text-rose-400 border border-rose-900/40 rounded-xl text-xs font-mono">
                      <p className="flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> {membersFetchError}</p>
                    </div>
                  )}

                  {fetchedMembers && (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-stone-850 pt-3">
                        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Extracted {fetchedMembers.length} active group participants:</span>
                        </span>
                        
                        <div className="flex items-center gap-2">
                          {/* ⬇ Download CSV of group members */}
                          <button
                            type="button"
                            title="Download group members as CSV"
                            onClick={() => {
                              const header = 'name,phone,role';
                              const rows = fetchedMembers.map(m =>
                                `"${(m.name || '').replace(/"/g, '""')}","${m.phone}","${m.role}"`
                              );
                              const csv = [header, ...rows].join('\n');
                              const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                              const url = URL.createObjectURL(blob);
                              const a = document.createElement('a');
                              a.href = url;
                              a.download = `whatsapp-group-members-${Date.now()}.csv`;
                              document.body.appendChild(a);
                              a.click();
                              document.body.removeChild(a);
                              URL.revokeObjectURL(url);
                            }}
                            className="flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-700 hover:border-emerald-600/50 text-emerald-400 font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download CSV</span>
                          </button>

                          <button
                            type="button"
                            onClick={importMembersToCampaign}
                            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-emerald-950/20"
                          >
                            <FileSpreadsheet className="w-4 h-4 text-white" />
                            <span>Import as CSV Audience</span>
                          </button>
                        </div>
                      </div>

                      {/* Display Table/List of members */}
                      <div className="max-h-60 overflow-y-auto border border-stone-850 rounded-xl bg-stone-950/50 scrollbar-thin">
                        <table className="w-full font-mono text-[10px] border-collapse text-left">
                          <thead>
                            <tr className="bg-stone-900/80 border-b border-stone-850 text-stone-400 select-none">
                              <th className="p-2.5 pl-4 uppercase tracking-wider text-[9px]">Name</th>
                              <th className="p-2.5 uppercase tracking-wider text-[9px]">Phone Number</th>
                              <th className="p-2.5 pr-4 uppercase tracking-wider text-[9px]">Group Role</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-900 text-stone-300">
                            {fetchedMembers.map((member) => (
                              <tr key={member.jid} className="hover:bg-stone-900/30 transition-colors">
                                <td className="p-2.5 pl-4 font-medium text-stone-200">{member.name}</td>
                                <td className="p-2.5 text-stone-400 select-all">{member.phone}</td>
                                <td className="p-2.5 pr-4">
                                  <span className={`px-2 py-0.5 rounded text-[8px] uppercase font-bold border 
                                    ${member.role === 'admin' 
                                      ? 'bg-rose-950/25 text-rose-400 border-rose-900/30' 
                                      : 'bg-stone-900 text-stone-400 border-stone-800'}
                                  `}>
                                    {member.role}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
              </div>
            )}

            {/* Dynamic CSV Headers Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-3 bg-stone-950/80 rounded-xl border border-stone-850">
              <div>
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-stone-400 uppercase tracking-widest mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Detected dynamic variables from CSV (Double-click to copy):</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {detectedHeaders.map((header) => (
                    <span 
                      key={header} 
                      className={`px-2 py-1 rounded bg-stone-900 border text-[10px] font-mono select-all cursor-copy transition-colors
                        ${phoneColumn.toLowerCase().replace(/\s+/g, '_') === header.toLowerCase().replace(/\s+/g, '_') 
                          ? 'border-amber-500/40 text-amber-400 bg-amber-950/15' 
                          : 'border-stone-800 text-[#F5E6CC]/70 hover:text-white'}
                      `}
                      title="Double-click to copy variable tag"
                      onDoubleClick={() => {
                        navigator.clipboard.writeText(`{{${header}}}`);
                      }}
                    >
                      {"{{"}{header}{"}}"}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t md:border-t-0 md:border-l border-stone-850 pt-3 md:pt-0 md:pl-4">
                <label className="text-[9px] font-mono text-stone-400 uppercase tracking-widest block mb-2">
                  📞 Recipient Phone Column:
                </label>
                <div className="relative">
                  <select
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl p-2.5 text-[#F5E6CC] font-mono text-xs outline-none focus:border-amber-500/40 transition-colors appearance-none cursor-pointer"
                    value={phoneColumn}
                    onChange={(e) => {
                      setPhoneColumn(e.target.value);
                      addLog('info', `Changed recipient phone number column to: "${e.target.value}"`);
                    }}
                  >
                    {detectedHeaders.map((header) => (
                      <option key={header} value={header} className="bg-stone-950 text-stone-300">
                        {header}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500">
                    ▼
                  </div>
                </div>
                <p className="text-[8.5px] font-mono text-stone-500 mt-1.5">
                  Campaign messages will be sent to the phone numbers in the selected column.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {/* Toolbar row: row count + download */}
              {csvInput.trim() && (
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-stone-500 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    {(() => {
                      const rows = csvInput.trim().split('\n').filter(Boolean);
                      const dataRows = rows.length > 1 ? rows.length - 1 : 0;
                      return <>{dataRows} recipient{dataRows !== 1 ? 's' : ''} loaded&nbsp;&nbsp;•&nbsp;&nbsp;{rows[0]?.split(',').length ?? 0} columns</>;
                    })()}
                  </span>
                  <button
                    type="button"
                    title="Download audience as CSV"
                    onClick={() => {
                      const blob = new Blob([csvInput], { type: 'text/csv;charset=utf-8;' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `inkfetish-campaign-audience-${Date.now()}.csv`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-800/40 hover:border-emerald-600/50 text-emerald-400 font-mono text-[10px] rounded-lg transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download CSV</span>
                  </button>
                </div>
              )}
              <textarea 
                rows={3}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-stone-300 font-mono text-xs focus:border-amber-500/40 outline-none transition-colors resize-none scrollbar-thin"
                value={csvInput}
                onChange={e => setCsvInput(e.target.value)}
                disabled={broadcastState !== 'idle'}
                placeholder="phone, name, tracking_id, delivery_partner..."
              />
            </div>
          </div>

          {/* STEP 3: ✍️ CAMPAIGN SEQUENCER */}
          <div className="bg-stone-900/40 backdrop-blur-md rounded-2xl border border-stone-800 shadow-xl p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-850 pb-3 mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#F5E6CC]">Step 3: Personalized Message Sequencer</h3>
                  <p className="text-[10px] text-stone-500 font-mono uppercase tracking-wider">Configure sequence copy & dynamic Spintax options</p>
                </div>
              </div>

              {broadcastState === 'idle' && (
                <button
                  onClick={addMessageTemplate}
                  className="px-3 py-1.5 text-[10px] font-mono bg-stone-950 hover:bg-stone-900 text-amber-500 border border-stone-850 hover:border-amber-500/30 rounded-lg flex items-center gap-1 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Sequence message</span>
                </button>
              )}
            </div>

            {/* templates display */}
            <div className="space-y-4">
              {messageTemplates.map((template, idx) => (
                <div key={idx} className="p-4 bg-stone-950/70 border border-stone-850 rounded-xl space-y-2 relative group">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest">
                      Message #{idx + 1} in sequence flow
                    </span>
                    
                    {broadcastState === 'idle' && messageTemplates.length > 1 && (
                      <button
                        onClick={() => deleteMessageTemplate(idx)}
                        className="text-[9px] font-mono text-rose-500 hover:text-rose-400 transition-colors uppercase tracking-widest"
                      >
                        Remove Slot
                      </button>
                    )}
                  </div>

                  <textarea
                    rows={3}
                    value={template}
                    onChange={(e) => updateMessageTemplate(idx, e.target.value)}
                    disabled={broadcastState !== 'idle'}
                    placeholder={`Enter Message #${idx + 1} copy... E.g. {Hi|Hello} {{name}}, your dynamic tracking code is {{tracking_id}}.`}
                    className="w-full bg-stone-950 border border-stone-900 rounded-lg p-3 text-stone-300 text-xs font-serif focus:border-amber-500/30 outline-none transition-colors resize-none scrollbar-thin"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* STEP 4: 🛡️ ANTI-BAN SAFEGUARDS */}
          <div className="bg-stone-900/40 backdrop-blur-md rounded-2xl border border-stone-800 shadow-xl overflow-hidden">
            <button 
              onClick={() => setIsSafeguardsExpanded(!isSafeguardsExpanded)}
              className="w-full flex items-center justify-between p-5 hover:bg-stone-900/20 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#F5E6CC]">Step 4: Campaign Anti-Ban Safeguards</h3>
                  <p className="text-[10px] text-stone-500 font-mono uppercase tracking-wider">Dynamic warmup pacing & Opt-out structures</p>
                </div>
              </div>
              <span className="text-xs font-mono text-stone-500 hover:text-stone-300">
                {isSafeguardsExpanded ? 'Collapse [-]' : 'Expand advanced safeguards [+]'}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isSafeguardsExpanded ? (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden border-t border-stone-850 bg-stone-950/20"
                >
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Left: Timing presets */}
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-xs mb-2">
                            <span className="text-stone-400">Target Stagger Delay:</span>
                            <span className="font-mono text-amber-500 font-bold">{staggerDelay} Seconds</span>
                          </div>
                          <input 
                            type="range" 
                            min={3} 
                            max={30} 
                            step={1}
                            className="w-full accent-amber-500 bg-stone-900 rounded-lg cursor-pointer h-1.5"
                            value={staggerDelay}
                            onChange={e => setStaggerDelay(Number(e.target.value))}
                            disabled={broadcastState !== 'idle'}
                          />
                          <p className="text-[9px] font-mono text-stone-500 mt-2">
                            {staggerDelay < 10 ? '⚠️ Speeds below 10s risk block flags under high volumes.' : '✅ Secure Staggering: 10s+ delay allows natural enqueuing intervals.'}
                          </p>
                        </div>

                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-900/40">
                          <div>
                            <div className="text-xs text-stone-300 font-medium">Random Delay Jitter</div>
                            <div className="text-[9px] text-stone-500 font-mono">Appends random variations (+/- 30%) to simulate human speeds</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer"
                              checked={enableJitter}
                              onChange={e => setEnableJitter(e.target.checked)}
                              disabled={broadcastState !== 'idle'}
                            />
                            <div className="w-9 h-5 bg-stone-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-stone-300 after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500 peer-checked:after:bg-stone-950 peer-checked:after:border-stone-950"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-900/40">
                          <div>
                            <div className="text-xs text-stone-300 font-medium">Dynamic Reputational Warm-Up</div>
                            <div className="text-[9px] text-stone-500 font-mono">Starts 2.5x slower at campaign launch, scaling up over time</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer"
                              checked={enableWarmUp}
                              onChange={e => setEnableWarmUp(e.target.checked)}
                              disabled={broadcastState !== 'idle'}
                            />
                            <div className="w-9 h-5 bg-stone-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-stone-300 after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500 peer-checked:after:bg-stone-950 peer-checked:after:border-stone-950"></div>
                          </label>
                        </div>
                      </div>

                      {/* Right: Limits & Guards */}
                      <div className="space-y-4 border-t md:border-t-0 md:border-l border-stone-800 pt-4 md:pt-0 md:pl-6">
                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-900/40">
                          <div>
                            <div className="text-xs text-stone-300 font-medium">Spam Reduction Opt-Out Footer</div>
                            <div className="text-[9px] text-stone-500 font-mono">Appends a random unsub footer to reduce direct block reports</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer"
                              checked={enableOptOut}
                              onChange={e => setEnableOptOut(e.target.checked)}
                              disabled={broadcastState !== 'idle'}
                            />
                            <div className="w-9 h-5 bg-stone-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-stone-300 after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500 peer-checked:after:bg-stone-950 peer-checked:after:border-stone-950"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-900/40">
                          <div>
                            <div className="text-xs text-stone-300 font-medium">Stop-On-Failure Safe Lock</div>
                            <div className="text-[9px] text-stone-500 font-mono">Automatically pauses campaigns if 3 successive dispatches fail</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer"
                              checked={stopOnFailure}
                              onChange={e => setStopOnFailure(e.target.checked)}
                              disabled={broadcastState !== 'idle'}
                            />
                            <div className="w-9 h-5 bg-stone-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-stone-300 after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500 peer-checked:after:bg-stone-950 peer-checked:after:border-stone-950"></div>
                          </label>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[9px] font-mono text-stone-500 uppercase tracking-wider block mb-1">Campaign Send Cap</label>
                            <input 
                              type="number" 
                              min={10} 
                              max={5000}
                              className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-stone-300 font-mono text-xs outline-none"
                              value={dailySendCap}
                              onChange={e => setDailySendCap(Math.max(10, Number(e.target.value)))}
                              disabled={broadcastState !== 'idle'}
                              title="Caps maximum messages enqueued in this broadcast sequence run"
                            />
                          </div>
                          <div className="flex items-end">
                            <div className="text-[8.5px] font-mono text-stone-500 leading-relaxed border border-stone-850 p-2 rounded bg-stone-950/20">
                              🔒 1000+ Suite: Daily safety caps help maintain healthy reputational scores.
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Sequence Message Gap (Per-Person) */}
                    <div className="border-t border-stone-800 pt-4 mt-2">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-xs font-medium text-stone-300">Per-Person Sequence Gap</span>
                        <span className="text-[9px] font-mono text-stone-500 ml-1">— random delay between messages sent to the same person</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[9px] font-mono text-stone-500 uppercase tracking-wider block mb-1">Min Gap (seconds)</label>
                          <input
                            type="number"
                            min={0}
                            max={seqDelayMax}
                            step={0.5}
                            className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-amber-400 font-mono text-xs outline-none focus:border-amber-500/40 transition-colors"
                            value={seqDelayMin}
                            onChange={e => setSeqDelayMin(Math.max(0, Number(e.target.value)))}
                            disabled={broadcastState !== 'idle'}
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-mono text-stone-500 uppercase tracking-wider block mb-1">Max Gap (seconds)</label>
                          <input
                            type="number"
                            min={seqDelayMin}
                            max={30}
                            step={0.5}
                            className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-amber-400 font-mono text-xs outline-none focus:border-amber-500/40 transition-colors"
                            value={seqDelayMax}
                            onChange={e => setSeqDelayMax(Math.max(seqDelayMin, Number(e.target.value)))}
                            disabled={broadcastState !== 'idle'}
                          />
                        </div>
                      </div>
                      <p className="text-[9px] font-mono text-stone-500 mt-2">
                        📬 Each recipient gets ALL {messageTemplates.length} message{messageTemplates.length !== 1 ? 's' : ''} in order before moving to the next person. Random {seqDelayMin}–{seqDelayMax}s gap between each message in the sequence.
                      </p>
                    </div>

                  </div>
                </motion.div>
              ) : (
                <div className="px-5 py-3.5 bg-stone-950/10 text-stone-500 text-[10px] font-mono border-t border-stone-850/60 flex items-center justify-between">
                  <span>⚡ Presets Online • Warmup: {enableWarmUp ? 'Enabled' : 'Disabled'} • Opt-Out: {enableOptOut ? 'Enabled' : 'Disabled'} • Target Stagger: {staggerDelay}s • Seq Gap: {seqDelayMin}–{seqDelayMax}s</span>
                  <span className="text-emerald-400">Optimal Anti-Spam protection active</span>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* STEP 5: 📡 TRACKING STATION */}
          <div className="bg-stone-900/40 backdrop-blur-md rounded-2xl border border-stone-800 shadow-xl p-5 md:p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-850 pb-5 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                  <Layers className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#F5E6CC]">Step 5: Campaign Launch & Active Progress Monitor</h3>
                  <p className="text-[10px] text-stone-500 font-mono uppercase tracking-wider">Execute sequences and track delivery health metrics</p>
                </div>
              </div>

              {/* Master execution keys */}
              <div className="flex items-center gap-2">
                {broadcastState === 'idle' && (
                  <button
                    onClick={startBroadcast}
                    disabled={connectionStatus !== 'connected'}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-amber-950/15"
                  >
                    <Play className="w-4 h-4 fill-stone-950" />
                    <span>Launch Campaign</span>
                  </button>
                )}

                {broadcastState === 'running' && (
                  <>
                    {broadcastMode === 'legacy' && (
                      <button
                        onClick={pauseBroadcast}
                        className="px-4 py-2.5 bg-stone-950 border border-stone-800 hover:bg-stone-900 text-amber-500 font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center gap-2"
                      >
                        <Pause className="w-4 h-4 fill-amber-500" />
                        <span>Pause</span>
                      </button>
                    )}
                    <button
                      onClick={stopBroadcast}
                      className="px-4 py-2.5 bg-stone-950 border border-stone-800 hover:bg-rose-950/20 hover:border-rose-900/50 text-rose-400 font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center gap-2"
                    >
                      <Square className="w-4 h-4 fill-rose-400" />
                      <span>Halt Campaigns</span>
                    </button>
                  </>
                )}

                {broadcastState === 'paused' && (
                  <>
                    <button
                      onClick={resumeBroadcast}
                      className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center gap-2"
                    >
                      <Play className="w-4 h-4 fill-stone-950" />
                      <span>Resume</span>
                    </button>
                    <button
                      onClick={stopBroadcast}
                      className="px-4 py-2.5 bg-stone-950 border border-stone-800 hover:bg-rose-950/20 hover:border-rose-900/50 text-rose-400 font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center gap-2"
                    >
                      <Square className="w-4 h-4 fill-rose-400" />
                      <span>Stop</span>
                    </button>
                  </>
                )}

                {(broadcastState === 'completed' || broadcastState === 'stopped') && (
                  <button
                    onClick={resetBroadcast}
                    className="px-4 py-2.5 bg-stone-950 border border-stone-800 hover:bg-stone-900 text-stone-300 font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4 text-amber-500" />
                    <span>Reset Workspace</span>
                  </button>
                )}

                {/* Gateway Purge button */}
                <button
                  onClick={handlePurgeQueue}
                  disabled={isPurging || connectionStatus !== 'connected'}
                  className="px-4 py-2.5 bg-stone-950 border border-stone-800 hover:bg-rose-950/20 hover:text-rose-400 text-stone-400 font-bold text-xs uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 flex items-center gap-2"
                  title="Purges ongoing enqueues from gateway"
                >
                  {isPurging ? <Loader2 className="animate-spin w-4 h-4 text-rose-500" /> : <Trash2 className="w-4 h-4 text-rose-500" />}
                  <span>Purge Queue</span>
                </button>
              </div>
            </div>

            {/* Campaign tracking interface */}
            {broadcastState !== 'idle' ? (
              <div className="space-y-6">
                {/* Stats strip */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-stone-950 rounded-xl p-3 border border-stone-850 text-center">
                    <div className="text-[9px] font-mono text-stone-500 uppercase tracking-wider mb-1">Total Audience</div>
                    <div className="text-xl font-bold font-mono text-[#F5E6CC]">{stats.total}</div>
                  </div>
                  <div className="bg-stone-950 rounded-xl p-3 border border-emerald-950/20 text-center">
                    <div className="text-[9px] font-mono text-stone-500 uppercase tracking-wider mb-1">Sent</div>
                    <div className="text-xl font-bold font-mono text-emerald-400">{stats.completed}</div>
                  </div>
                  <div className="bg-stone-950 rounded-xl p-3 border border-rose-950/20 text-center">
                    <div className="text-[9px] font-mono text-stone-500 uppercase tracking-wider mb-1">Failed</div>
                    <div className="text-xl font-bold font-mono text-rose-400">{stats.failed}</div>
                  </div>
                  <div className="bg-stone-950 rounded-xl p-3 border border-stone-850 text-center">
                    <div className="text-[9px] font-mono text-stone-500 uppercase tracking-wider mb-1">Pacing %</div>
                    <div className="text-xl font-bold font-mono text-amber-500">
                      {stats.total > 0 ? Math.round(((stats.completed + stats.failed) / stats.total) * 100) : 0}%
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-stone-950 rounded-full h-2 overflow-hidden border border-stone-850">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-amber-600 h-full transition-all duration-500"
                    style={{ width: `${stats.total > 0 ? ((stats.completed + stats.failed) / stats.total) * 100 : 0}%` }}
                  />
                </div>

                {/* Terminal Console */}
                <div className="bg-stone-950 rounded-xl border border-stone-850 p-4 shadow-inner">
                  <div className="flex items-center justify-between border-b border-stone-900 pb-2 mb-3">
                    <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                      <span>Live Dispatch sequence logs terminal</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[9px] font-mono text-stone-500 uppercase">
                      State: {broadcastState} ({broadcastMode === 'legacy' ? 'Sequential' : 'Native'} mode)
                    </span>
                  </div>

                  <div className="h-60 overflow-y-auto font-mono text-xs space-y-1.5 scrollbar-thin select-text">
                    {logs.map((log) => (
                      <div key={log.id} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-stone-600 flex-shrink-0">[{log.timestamp}]</span>
                        <span className={`flex-shrink-0 font-bold ${
                          log.type === 'success' ? 'text-emerald-500' :
                          log.type === 'error' ? 'text-rose-500' :
                          log.type === 'warning' ? 'text-amber-500' : 'text-blue-400'
                        }`}>
                          {log.type === 'success' ? '✔' : log.type === 'error' ? '✖' : log.type === 'warning' ? '⚠' : 'ℹ'}
                        </span>
                        <span className={
                          log.type === 'success' ? 'text-emerald-200' :
                          log.type === 'error' ? 'text-rose-200' :
                          log.type === 'warning' ? 'text-amber-200' : 'text-stone-300'
                        }>
                          {log.text}
                        </span>
                      </div>
                    ))}
                    <div ref={terminalEndRef} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 border border-dashed border-stone-850 rounded-xl bg-stone-950/20 text-stone-500 font-serif text-sm">
                ℹ️ Sequence templates loaded and Spintax compilation engines ready. Press **Launch Campaign** above to begin staggered bulk broadcasting.
              </div>
            )}
          </div>

          {/* DUAL-PURPOSE COLLAPSIBLE CARD: DIRECT TESTER */}
          <div className="bg-stone-900/40 backdrop-blur-md rounded-2xl border border-stone-800 shadow-xl overflow-hidden">
            <button 
              onClick={() => setIsTesterCollapsed(!isTesterCollapsed)}
              className="w-full flex items-center justify-between p-5 hover:bg-stone-900/20 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#F5E6CC]">🛠️ Auxiliary Tools: Direct Tester</h3>
                  <p className="text-[10px] text-stone-500 font-mono uppercase tracking-wider">Single Message Routing & Troubleshooting</p>
                </div>
              </div>
              <span className="text-xs font-mono text-stone-500 hover:text-stone-300">
                {isTesterCollapsed ? 'Expand Direct Tester [+]' : 'Collapse [-]'}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {!isTesterCollapsed && (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden border-t border-stone-850 bg-stone-950/20"
                >
                  <div className="p-6">
                    <form onSubmit={handleSendDirect} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-2">Recipient Phone</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-600 font-mono text-xs">+91</span>
                            <input 
                              type="tel"
                              required
                              placeholder="9876543210"
                              className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 pl-11 text-stone-300 font-mono text-xs focus:border-amber-500/40 outline-none transition-colors"
                              value={directPhone.replace(/^91/, '')}
                              onChange={e => setDirectPhone(`91${e.target.value.replace(/\D/g, '')}`)}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-2">Message Type</label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setDirectType('chat')}
                              className={`py-2 px-3 rounded-lg border text-xs font-mono transition-all uppercase tracking-wide
                                ${directType === 'chat' ? 'bg-amber-500/10 text-amber-500 border-amber-500/30' : 'bg-stone-950 border-stone-850 text-stone-500'}
                              `}
                            >
                              Text Chat
                            </button>
                            <button
                              type="button"
                              onClick={() => setDirectType('image')}
                              className={`py-2 px-3 rounded-lg border text-xs font-mono transition-all uppercase tracking-wide
                                ${directType === 'image' ? 'bg-amber-500/10 text-amber-500 border-amber-500/30' : 'bg-stone-950 border-stone-850 text-stone-500'}
                              `}
                            >
                              Rich Image
                            </button>
                          </div>
                        </div>
                      </div>

                      {directType === 'image' && (
                        <div className="space-y-3 p-3 bg-stone-950 rounded-xl border border-stone-850">
                          <div>
                            <label className="text-[9px] font-mono text-stone-500 uppercase tracking-wider block mb-1">Image URL</label>
                            <input 
                              type="url"
                              placeholder="https://example.com/image.jpg"
                              className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-stone-300 font-mono text-xs outline-none"
                              value={mediaUrl}
                              onChange={e => setMediaUrl(e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[9px] font-mono text-stone-500 uppercase tracking-wider block mb-1">Filename</label>
                              <input 
                                type="text"
                                placeholder="file.jpg"
                                className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-stone-300 font-mono text-xs outline-none"
                                value={mediaFilename}
                                onChange={e => setMediaFilename(e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="text-[9px] font-mono text-stone-500 uppercase tracking-wider block mb-1">Mime Type</label>
                              <input 
                                type="text"
                                placeholder="image/jpeg"
                                className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-stone-300 font-mono text-xs outline-none"
                                value={mediaMimetype}
                                onChange={e => setMediaMimetype(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-2">
                          {directType === 'image' ? 'Caption' : 'Message Body'}
                        </label>
                        <textarea 
                          rows={3}
                          placeholder={directType === 'image' ? 'Add image caption text here...' : 'Enter your message... Use *bold* or _italics_ for styling.'}
                          className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-stone-300 text-xs focus:border-amber-500/40 outline-none transition-colors resize-none"
                          value={directText}
                          onChange={e => setDirectText(e.target.value)}
                        />
                      </div>

                      {directError && (
                        <div className="p-3 bg-rose-950/20 text-rose-400 border border-rose-900/40 rounded-xl text-xs font-mono">
                          <p className="flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> {directError}</p>
                        </div>
                      )}

                      <div className="flex justify-end">
                        <button 
                          type="submit"
                          disabled={directStatus === 'sending' || connectionStatus !== 'connected'}
                          className="px-6 py-3 bg-stone-950 border border-stone-850 hover:bg-stone-900 hover:text-white text-stone-300 font-bold text-xs uppercase tracking-widest rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {directStatus === 'sending' ? (
                            <>
                              <Loader2 className="animate-spin w-4 h-4 text-amber-500" />
                              <span>Sending Test Payload...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 text-amber-500" />
                              <span>Dispatch Direct</span>
                            </>
                          )}
                        </button>
                      </div>

                      {directLogs.length > 0 && (
                        <div className="bg-stone-950 rounded-xl p-3 border border-stone-850 max-h-24 overflow-y-auto text-[10px] font-mono text-stone-500 space-y-1 scrollbar-thin">
                          {directLogs.map((log, i) => (
                            <div key={i} className="leading-relaxed">{log}</div>
                          ))}
                        </div>
                      )}
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
