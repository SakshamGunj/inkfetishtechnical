'use client';

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Send,
  Mail,
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
  email: string;
  name: string;
  variables: Record<string, string>;
}

export default function EmailAutomation() {
  // SMTP credentials state
  const [smtpUser, setSmtpUser] = useState('');
  const [smtpPass, setSmtpPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [testRecipient, setTestRecipient] = useState('');
  const [testStatus, setTestStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [testError, setTestError] = useState('');

  // Bulk Broadcast State
  const [csvInput, setCsvInput] = useState(
    "email,name,certificate_id,event_name\ngunj06saksham@gmail.com,Saksham Gunj,548707489160,Poetry Festival Season 2\nsakshamgunj@gmail.com,Saksham Gunj Personal,552819935760,Poetry Festival Season 2"
  );
  const [emailSubject, setEmailSubject] = useState(
    "Congratulations {{name}}! Your Poetry Festival Certificate is Verified"
  );
  const [emailBody, setEmailBody] = useState(
    `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Georgia', serif; background-color: #fdfbf7; color: #1a1a1a; margin: 0; padding: 40px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; padding: 40px; border: 1px solid #e0d9cc; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
    .header { text-align: center; border-bottom: 2px solid #c5a059; padding-bottom: 20px; margin-bottom: 30px; }
    .title { font-size: 24px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; color: #000000; }
    .name { font-size: 20px; font-style: italic; color: #c5a059; font-weight: bold; margin: 20px 0; }
    .body-text { font-size: 15px; line-height: 1.6; color: #444444; }
    .certificate-id { font-family: monospace; background: #f5f0e6; padding: 10px 15px; display: inline-block; font-size: 16px; font-weight: bold; letter-spacing: 1px; margin: 20px 0; border: 1px dashed #c5a059; }
    .button-container { text-align: center; margin: 30px 0; }
    .btn { background-color: #000000; color: #ffffff; padding: 12px 25px; text-decoration: none; font-size: 13px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; border-radius: 2px; display: inline-block; }
    .footer { text-align: center; font-size: 11px; color: #888888; border-top: 1px solid #eeeeee; padding-top: 20px; margin-top: 40px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="title">Inkfetish Publications</div>
    </div>
    <div class="body-text">
      Dear {{name}},
      <br><br>
      We are absolutely thrilled to inform you that your registration and participation for <strong>{{event_name}}</strong> has been officially processed and verified!
      <br><br>
      Your certificate is active and available in our secure online ledger system.
      <br><br>
      <div style="text-align: center;">
        <div class="certificate-id">ID: {{certificate_id}}</div>
      </div>
      <br>
      You can view and print your live verification statement at any time by visiting your unique link:
    </div>
    <div class="button-container">
      <a href="https://www.inkfetish.in/poetryfestival/s2/{{certificate_id}}" class="btn" target="_blank">View Verification Page</a>
    </div>
    <div class="body-text">
      Thank you for sharing your outstanding and beautiful poetry with our community. It was a true masterclass in literary writing.
      <br><br>
      Warm regards,<br>
      <strong>Inkfetish Editorial Team</strong>
    </div>
    <div class="footer">
      This is an automated delivery on behalf of Inkfetish Publications.<br>
      © 2026 Inkfetish. All rights reserved.
    </div>
  </div>
</body>
</html>`
  );

  // Anti-Spam Safeguards State
  const [staggerDelay, setStaggerDelay] = useState(8);
  const [enableJitter, setEnableJitter] = useState(true);
  const [stopOnFailure, setStopOnFailure] = useState(true);

  // PDF Attachment State
  const [attachmentType, setAttachmentType] = useState<'none' | 'static' | 'dynamic'>('none');
  const [staticAttachmentUrl, setStaticAttachmentUrl] = useState('');
  const [staticAttachmentName, setStaticAttachmentName] = useState('Certificate.pdf');
  const [dynamicAttachmentColumn, setDynamicAttachmentColumn] = useState('');

  // Local file for test email
  const [testFileBase64, setTestFileBase64] = useState<string | null>(null);
  const [testFileName, setTestFileName] = useState('');

  // Dynamic CSV headers state
  const [detectedHeaders, setDetectedHeaders] = useState<string[]>(['email', 'name', 'certificate_id', 'event_name']);
  const [emailColumn, setEmailColumn] = useState<string>('');

  // Active broadcast tracking
  const [broadcastState, setBroadcastState] = useState<'idle' | 'running' | 'paused' | 'stopped' | 'completed'>('idle');
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, failed: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [logs, setLogs] = useState<LogItem[]>([]);

  // Refs for loop controls
  const broadcastStateRef = useRef(broadcastState);
  const currentIndexRef = useRef(currentIndex);
  const statsRef = useRef(stats);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const consecutiveFailuresRef = useRef(0);

  // Sync state values to references
  useEffect(() => {
    broadcastStateRef.current = broadcastState;
  }, [broadcastState]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    statsRef.current = stats;
  }, [stats]);

  // Scroll to bottom of logs console
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Load saved credentials from localStorage on mount
  useEffect(() => {
    document.body.style.backgroundColor = '#050505';

    const savedUser = localStorage.getItem('ink_smtp_user');
    const savedPass = localStorage.getItem('ink_smtp_pass');

    if (savedUser) setSmtpUser(savedUser);
    if (savedPass) setSmtpPass(savedPass);

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  // Parse CSV headers and guess the "email" column
  useEffect(() => {
    try {
      const parsed = parseCsv();
      if (parsed.headers.length > 0) {
        setDetectedHeaders(parsed.headers);

        const normalizedHeaders = parsed.headers.map(h => h.toLowerCase().replace(/\s+/g, '_'));
        const currentNorm = emailColumn.toLowerCase().replace(/\s+/g, '_');

        if (!emailColumn || !normalizedHeaders.includes(currentNorm)) {
          const candidates = ['email', 'email_address', 'customer_email', 'consignee_email', 'mail'];
          let guessed = '';
          for (const cand of candidates) {
            const idx = normalizedHeaders.indexOf(cand);
            if (idx !== -1) {
              guessed = parsed.headers[idx];
              break;
            }
          }
          if (!guessed && parsed.headers.length > 0) {
            guessed = parsed.headers[0];
          }
          if (guessed) {
            setEmailColumn(guessed);
          }
        }
      }
    } catch (e) {
      console.error('Failed to parse CSV headers:', e);
    }
  }, [csvInput]);

  // Save credentials to localStorage
  const handleSaveCredentials = () => {
    localStorage.setItem('ink_smtp_user', smtpUser);
    localStorage.setItem('ink_smtp_pass', smtpPass);
    addLog('success', 'SMTP Credentials saved locally to browser storage.');
    alert('Credentials saved successfully!');
  };

  const handleClearCredentials = () => {
    localStorage.removeItem('ink_smtp_user');
    localStorage.removeItem('ink_smtp_pass');
    setSmtpUser('');
    setSmtpPass('');
    addLog('warning', 'SMTP credentials cleared from local storage.');
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

  // CSV parser utility
  const parseCsv = (customEmailColumn?: string): { recipients: Recipient[]; headers: string[] } => {
    const lines = csvInput.split('\n');
    const recipientsList: Recipient[] = [];
    let headers: string[] = [];
    const activeEmailCol = (customEmailColumn || emailColumn || '').toLowerCase().replace(/\s+/g, '_');

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
      let email = '';
      let name = 'Recipient';

      headers.forEach((header, index) => {
        const val = parts[index] || '';
        const normalizedHeader = header.toLowerCase().replace(/\s+/g, '_');

        if (activeEmailCol && normalizedHeader === activeEmailCol) {
          email = val;
        } else if (!activeEmailCol && (normalizedHeader === 'email' || normalizedHeader === 'email_address' || normalizedHeader === 'customer_email' || normalizedHeader === 'mail')) {
          email = val;
        }

        if (normalizedHeader === 'name' || normalizedHeader === 'consignee_name' || normalizedHeader === 'recipient_name') {
          name = val || 'Recipient';
        }
        variables[header] = val;
      });

      if (!email && !activeEmailCol && parts[0] && parts[0].includes('@')) {
        email = parts[0];
      }

      if (email) {
        recipientsList.push({ email, name, variables });
      }
    }

    return { recipients: recipientsList, headers };
  };

  // Compile template tags
  const compileTemplate = (template: string, recipient: Recipient): string => {
    let output = template;
    output = output.replace(/\{\{name\}\}/gi, recipient.name);
    output = output.replace(/\{\{email\}\}/gi, recipient.email);

    Object.keys(recipient.variables).forEach((key) => {
      const value = recipient.variables[key];
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'gi');
      output = output.replace(regex, value);
    });

    return output;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setTestFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setTestFileBase64(event.target.result as string);
        addLog('info', `File "${file.name}" loaded successfully from computer.`);
      }
    };
    reader.onerror = () => {
      addLog('error', 'Failed to read file from computer.');
    };
    reader.readAsDataURL(file);
  };

  const handleClearTestFile = () => {
    setTestFileBase64(null);
    setTestFileName('');
    addLog('info', 'Attached test file cleared.');
  };

  // Send single test email
  const handleSendTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!smtpUser || !smtpPass) {
      alert('Please fill in your SMTP Gmail credentials first.');
      return;
    }
    if (!testRecipient) {
      alert('Please enter a recipient email for testing.');
      return;
    }

    setTestStatus('sending');
    setTestError('');

    try {
      const dummyRecipient: Recipient = {
        email: testRecipient,
        name: 'Test Laureate',
        variables: {
          certificate_id: '548707489160',
          event_name: 'Poetry Festival Season 2'
        }
      };

      const subject = compileTemplate(emailSubject, dummyRecipient);
      const html = compileTemplate(emailBody, dummyRecipient);

      let attachmentUrl = '';
      let attachmentName = '';

      // If a local file is uploaded from the computer, only attach that file and ignore general settings
      if (testFileBase64) {
        attachmentName = testFileName;
      } else {
        if (attachmentType === 'static') {
          attachmentUrl = staticAttachmentUrl;
          attachmentName = staticAttachmentName;
        } else if (attachmentType === 'dynamic') {
          attachmentUrl = dummyRecipient.variables[dynamicAttachmentColumn] || '';
          attachmentName = 'Certificate.pdf';
        }
      }

      const res = await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          smtpUser,
          smtpPass,
          to: testRecipient,
          subject,
          html,
          attachmentUrl: attachmentUrl || undefined,
          attachmentName: attachmentName || undefined,
          attachmentBase64: testFileBase64 || undefined,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setTestStatus('success');
        addLog('success', `Test email dispatched to ${testRecipient} successfully.`);
      } else {
        throw new Error(data.error || 'Server SMTP rejection');
      }
    } catch (err: any) {
      setTestStatus('error');
      setTestError(err.message || 'SMTP Authentication failed');
      addLog('error', `Test send failed for ${testRecipient}: ${err.message}`);
    }
  };

  // Primary Broadcast send loop
  const runBroadcastLoop = async (currentIdx: number, list: Recipient[]) => {
    let index = currentIdx;
    consecutiveFailuresRef.current = 0;

    addLog('info', `Initializing staggered email dispatch loop for ${list.length} contacts...`);

    while (index < list.length && broadcastStateRef.current === 'running') {
      const recipient = list[index];

      const subject = compileTemplate(emailSubject, recipient);
      const html = compileTemplate(emailBody, recipient);

      addLog('info', `[${index + 1}/${list.length}] Dispatching email to ${recipient.name} (${recipient.email})...`);

      let attachmentUrl = '';
      let attachmentName = 'Certificate.pdf';

      if (attachmentType === 'static') {
        attachmentUrl = staticAttachmentUrl;
        attachmentName = staticAttachmentName;
      } else if (attachmentType === 'dynamic') {
        attachmentUrl = recipient.variables[dynamicAttachmentColumn] || '';
        attachmentName = `${recipient.name.replace(/\s+/g, '_')}_Certificate.pdf`;
      }

      try {
        const res = await fetch('/api/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            smtpUser,
            smtpPass,
            to: recipient.email,
            subject,
            html,
            attachmentUrl: attachmentUrl || undefined,
            attachmentName: attachmentUrl ? attachmentName : undefined,
          }),
        });

        const data = await res.json();

        if (data.success) {
          addLog('success', `[SUCCESS] Sent to ${recipient.email}. Message ID: ${data.messageId} ✅`);
          setStats(prev => ({ ...prev, completed: prev.completed + 1 }));
          consecutiveFailuresRef.current = 0;
        } else {
          throw new Error(data.error || 'SMTP Error response');
        }
      } catch (err: any) {
        addLog('error', `[FAILED] Send failed to ${recipient.email}: ${err.message || 'SMTP Authentication error'} ❌`);
        setStats(prev => ({ ...prev, failed: prev.failed + 1 }));

        consecutiveFailuresRef.current += 1;
        if (stopOnFailure && consecutiveFailuresRef.current >= 3) {
          setBroadcastState('paused');
          addLog('error', '🚨 Safe Lock: 3 consecutive sending failures detected. Paused broadcast to preserve account reputation.');
          break;
        }
      }

      const nextIndex = index + 1;
      setCurrentIndex(nextIndex);
      index = nextIndex;

      // Completion check
      if (nextIndex >= list.length) {
        setBroadcastState('completed');
        addLog('success', `🎉 Broadcast campaign complete! Success: ${statsRef.current.completed}, Failed: ${statsRef.current.failed}.`);
        break;
      }

      // Stagger Delay logic
      let delayMs = staggerDelay * 1000;
      if (enableJitter) {
        const jitter = (Math.random() * 0.6 - 0.3) * delayMs;
        delayMs = Math.max(3000, delayMs + jitter);
      }

      addLog('info', `🤖 Pacing: Sleeping for ${(delayMs / 1000).toFixed(1)}s to simulate human behavior...`);
      await interruptibleSleep(delayMs);

      if (broadcastStateRef.current === 'paused') {
        addLog('warning', `⏸ Broadcast execution paused at item ${nextIndex + 1}/${list.length}.`);
        break;
      }
      if (broadcastStateRef.current === 'stopped') {
        addLog('error', '🛑 Broadcast loop forcibly halted.');
        break;
      }
    }
  };

  const startBroadcast = async () => {
    if (!smtpUser || !smtpPass) {
      alert('Please fill in your SMTP Gmail credentials before starting the campaign.');
      return;
    }

    const parsed = parseCsv();
    if (parsed.recipients.length === 0) {
      alert('No valid recipients found in the CSV dataset. Check your email column guesser.');
      return;
    }

    setRecipients(parsed.recipients);
    setStats({ total: parsed.recipients.length, completed: 0, failed: 0 });
    setCurrentIndex(0);
    setLogs([]);
    setBroadcastState('running');

    setTimeout(() => {
      runBroadcastLoop(0, parsed.recipients);
    }, 100);
  };

  const pauseBroadcast = () => {
    setBroadcastState('paused');
    addLog('warning', 'Requesting pause... Pacing timer will hold loop on next cycle.');
  };

  const resumeBroadcast = () => {
    setBroadcastState('running');
    addLog('info', `Resuming campaign from recipient ${currentIndex + 1}/${recipients.length}...`);
    setTimeout(() => {
      runBroadcastLoop(currentIndex, recipients);
    }, 100);
  };

  const stopBroadcast = () => {
    setBroadcastState('stopped');
    addLog('error', 'Forcibly halted sending queue.');
  };

  const resetBroadcast = () => {
    setBroadcastState('idle');
    setRecipients([]);
    setCurrentIndex(0);
    setStats({ total: 0, completed: 0, failed: 0 });
    setLogs([]);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#fdfbf7] font-sans overflow-x-hidden selection:bg-gold selection:text-black pb-20">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        
        {/* Title Header */}
        <div className="mb-10 border-b border-white/5 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-gold/30 bg-gold/5 mb-3 text-gold text-[10px] uppercase tracking-widest font-black rounded-sm">
            <Mail className="w-3.5 h-3.5" /> Gmail Sender Portal
          </div>
          <h1 className="text-3.5xl md:text-5xl font-serif font-black uppercase tracking-tight text-[#fdfbf7]">
            Simple Email <span className="italic font-light text-gold">Broadcaster.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#aaa] font-light max-w-2xl mt-2 leading-relaxed">
            Follow the 4 simple steps below to configure your Gmail SMTP settings, import your contact list, write your message, and broadcast safely.
          </p>
        </div>

        {/* Outer grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT 2 COLUMNS: Step-by-Step Forms */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* STEP 1: Gmail Account Settings */}
            <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-sm shadow-md">
              <h2 className="text-base font-serif font-black uppercase tracking-wider text-gold flex items-center gap-2 mb-2">
                <Settings className="w-4 h-4" /> Step 1: Connect Gmail Account
              </h2>
              <p className="text-xs text-[#666] mb-4">
                Enter your Gmail address and Gmail App Password below. Click "Save" to keep them on your device.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#555] font-bold block mb-1">
                    Gmail Address
                  </label>
                  <input
                    type="email"
                    value={smtpUser}
                    onChange={e => setSmtpUser(e.target.value)}
                    placeholder="e.g. user@gmail.com"
                    className="w-full bg-[#121212] border border-white/10 rounded-sm py-2 px-3 text-xs text-white focus:outline-none focus:border-gold font-mono"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#555] font-bold block">
                      Gmail App Password (16 Letters)
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="text-[9px] uppercase tracking-widest text-gold hover:underline"
                    >
                      {showPass ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={smtpPass}
                    onChange={e => setSmtpPass(e.target.value)}
                    placeholder="e.g. abcd efgh ijkl mnop"
                    className="w-full bg-[#121212] border border-white/10 rounded-sm py-2 px-3 text-xs text-white focus:outline-none focus:border-gold font-mono"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 pt-2 border-t border-white/5">
                <button
                  onClick={handleSaveCredentials}
                  className="px-4 py-2 bg-white hover:bg-[#eaeaea] text-[#050505] font-sans font-black text-[10px] uppercase tracking-widest rounded-sm transition-all"
                >
                  Save Credentials
                </button>
                <button
                  onClick={handleClearCredentials}
                  className="px-4 py-2 border border-white/10 hover:border-white/20 text-[#666] hover:text-[#aaa] font-sans font-bold text-[10px] uppercase tracking-widest rounded-sm transition-all"
                >
                  Clear Details
                </button>
              </div>

              {/* SMTP test block */}
              <div className="mt-6 pt-4 border-t border-white/5 bg-[#121212]/50 p-4 rounded-sm">
                <label className="text-[10px] uppercase tracking-widest text-[#555] font-bold block mb-1">
                  Send a Single Test Email (Recommended before bulk sending)
                </label>
                <div className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    value={testRecipient}
                    onChange={e => setTestRecipient(e.target.value)}
                    placeholder="e.g. target@domain.com"
                    className="flex-grow bg-[#121212] border border-white/10 rounded-sm py-2 px-3 text-xs text-white focus:outline-none focus:border-gold font-mono"
                  />
                  <button
                    onClick={handleSendTest}
                    disabled={testStatus === 'sending'}
                    className="px-4 py-2 bg-gold hover:bg-[#d4a843] text-black font-sans font-black text-[10px] uppercase tracking-widest rounded-sm transition-all shrink-0"
                  >
                    {testStatus === 'sending' ? 'Sending...' : 'Test Send'}
                  </button>
                </div>

                {/* Local PDF file input from computer */}
                <div className="mt-4 max-w-md">
                  <label className="text-[9px] uppercase tracking-widest text-[#555] font-bold block mb-1">
                    Attach PDF from Computer (Optional for test email)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="application/pdf,image/*"
                      onChange={handleFileChange}
                      className="text-[10px] text-[#aaa] bg-[#121212] border border-white/10 rounded-sm p-1.5 w-full focus:outline-none focus:border-gold"
                    />
                    {testFileBase64 && (
                      <button
                        type="button"
                        onClick={handleClearTestFile}
                        className="text-[9px] uppercase tracking-widest text-red-500 hover:underline shrink-0"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
                {testStatus === 'success' && (
                  <div className="text-[10px] text-green-500 font-bold uppercase tracking-wider mt-2">
                    ✓ Test email sent successfully! Check your inbox/spam.
                  </div>
                )}
                {testStatus === 'error' && (
                  <div className="text-[10px] text-red-500 font-bold uppercase tracking-wider mt-2">
                    ⚠ {testError}
                  </div>
                )}
              </div>
            </div>

            {/* STEP 2: Import CSV Data */}
            <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-sm shadow-md">
              <h2 className="text-base font-serif font-black uppercase tracking-wider text-gold flex items-center gap-2 mb-2">
                <FileSpreadsheet className="w-4 h-4" /> Step 2: Import CSV Recipients List
              </h2>
              <p className="text-xs text-[#666] mb-4">
                Paste your CSV content below. The first row must contain column headers.
              </p>

              <div className="space-y-4">
                <textarea
                  rows={5}
                  value={csvInput}
                  onChange={e => setCsvInput(e.target.value)}
                  className="w-full bg-[#121212] border border-white/10 rounded-sm py-2 px-3 text-xs text-[#aaa] focus:outline-none focus:border-gold font-mono leading-relaxed"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#555] font-bold block mb-1">
                      Which column is the email address?
                    </label>
                    <select
                      value={emailColumn}
                      onChange={e => setEmailColumn(e.target.value)}
                      className="w-full bg-[#121212] border border-white/10 rounded-sm py-2 px-3 text-xs text-white focus:outline-none focus:border-gold uppercase tracking-wider"
                    >
                      {detectedHeaders.map(header => (
                        <option key={header} value={header}>
                          {header}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-[#150a25] border border-purple-900/30 p-3 rounded-sm flex flex-col justify-center">
                    <div className="text-[8px] uppercase tracking-widest text-purple-400 font-bold">
                      Variables you can use:
                    </div>
                    <div className="text-[10px] text-[#888] font-mono mt-1 flex flex-wrap gap-x-2">
                      {detectedHeaders.map(h => (
                        <span key={h} className="text-purple-300">
                          {"{{" + h + "}}"}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3: Message Template */}
            <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-sm shadow-md">
              <h2 className="text-base font-serif font-black uppercase tracking-wider text-gold flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4" /> Step 3: Write Email Template
              </h2>
              <p className="text-xs text-[#666] mb-4">
                Use `{"{{name}}"}` or `{"{{certificate_id}}"}` to automatically inject recipient information.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#555] font-bold block mb-1">
                    Email Subject Line
                  </label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={e => setEmailSubject(e.target.value)}
                    className="w-full bg-[#121212] border border-white/10 rounded-sm py-2.5 px-3 text-xs text-white focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#555] font-bold block mb-1">
                    HTML Message Body
                  </label>
                  <textarea
                    rows={10}
                    value={emailBody}
                    onChange={e => setEmailBody(e.target.value)}
                    className="w-full bg-[#121212] border border-white/10 rounded-sm py-2.5 px-3 text-xs text-[#aaa] focus:outline-none focus:border-gold font-mono leading-relaxed"
                  />
                </div>

                {/* Optional PDF Attachments */}
                <div className="bg-[#121212]/30 p-4 border border-white/5 rounded-sm mt-4">
                  <label className="text-[10px] uppercase tracking-widest text-gold font-bold block mb-2">
                    Optional PDF Attachment
                  </label>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[9px] uppercase tracking-widest text-[#555] font-bold block mb-1">
                        Attachment Mode
                      </label>
                      <select
                        value={attachmentType}
                        onChange={e => setAttachmentType(e.target.value as any)}
                        className="bg-[#121212] border border-white/10 rounded-sm py-1.5 px-3 text-xs text-white focus:outline-none focus:border-gold uppercase tracking-wider"
                      >
                        <option value="none">No Attachment</option>
                        <option value="static">Static URL (Same PDF file for all)</option>
                        <option value="dynamic">Dynamic Column (Get URL from CSV column)</option>
                      </select>
                    </div>

                    {attachmentType === 'static' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[9px] uppercase tracking-widest text-[#555] font-bold block mb-1">
                            PDF File URL
                          </label>
                          <input
                            type="url"
                            value={staticAttachmentUrl}
                            onChange={e => setStaticAttachmentUrl(e.target.value)}
                            placeholder="https://example.com/document.pdf"
                            className="w-full bg-[#121212] border border-white/10 rounded-sm py-2 px-3 text-xs text-white focus:outline-none focus:border-gold"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] uppercase tracking-widest text-[#555] font-bold block mb-1">
                            Attachment Name
                          </label>
                          <input
                            type="text"
                            value={staticAttachmentName}
                            onChange={e => setStaticAttachmentName(e.target.value)}
                            placeholder="Document.pdf"
                            className="w-full bg-[#121212] border border-white/10 rounded-sm py-2 px-3 text-xs text-white focus:outline-none focus:border-gold"
                          />
                        </div>
                      </div>
                    )}

                    {attachmentType === 'dynamic' && (
                      <div>
                        <label className="text-[9px] uppercase tracking-widest text-[#555] font-bold block mb-1">
                          CSV Column containing PDF link
                        </label>
                        <select
                          value={dynamicAttachmentColumn}
                          onChange={e => setDynamicAttachmentColumn(e.target.value)}
                          className="bg-[#121212] border border-white/10 rounded-sm py-1.5 px-3 text-xs text-white focus:outline-none focus:border-gold uppercase tracking-wider"
                        >
                          <option value="">-- Select Column --</option>
                          {detectedHeaders.map(header => (
                            <option key={header} value={header}>
                              {header}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 4: Start campaign */}
            <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-sm shadow-md">
              <h2 className="text-base font-serif font-black uppercase tracking-wider text-gold flex items-center gap-2 mb-2">
                <Play className="w-4 h-4" /> Step 4: Stagger Settings & Dispatch
              </h2>
              <p className="text-xs text-[#666] mb-4">
                Set a delay between emails to avoid triggering Google spam controls.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 border-b border-white/5 pb-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#555] font-bold block mb-1">
                    Stagger Delay (seconds between sends)
                  </label>
                  <input
                    type="number"
                    value={staggerDelay}
                    onChange={e => setStaggerDelay(Number(e.target.value))}
                    min={3}
                    className="w-24 bg-[#121212] border border-white/10 rounded-sm py-2 px-3 text-xs text-white focus:outline-none focus:border-gold font-mono"
                  />
                  <span className="text-[9px] text-[#555] block mt-1">Recommended: 8 - 15 seconds.</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      id="jitter-chk"
                      checked={enableJitter}
                      onChange={e => setEnableJitter(e.target.checked)}
                      className="accent-gold"
                    />
                    <label htmlFor="jitter-chk" className="text-xs text-[#aaa] font-bold select-none cursor-pointer">
                      Jitter Delay (+/- 30%)
                    </label>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      id="stop-chk"
                      checked={stopOnFailure}
                      onChange={e => setStopOnFailure(e.target.checked)}
                      className="accent-gold"
                    />
                    <label htmlFor="stop-chk" className="text-xs text-[#aaa] font-bold select-none cursor-pointer">
                      Stop on Failure
                    </label>
                  </div>
                </div>
              </div>

              {/* Progress and status */}
              {broadcastState !== 'idle' && (
                <div className="mb-6 bg-[#121212] p-4 rounded-sm border border-white/5">
                  <div className="flex justify-between items-center mb-2 text-xs">
                    <span className="font-bold">
                      Sending: {currentIndex} / {stats.total} recipients
                    </span>
                    <span className="text-[10px] text-[#888]">
                      (Success: <span className="text-green-500">{stats.completed}</span> | Failed: <span className="text-red-500">{stats.failed}</span>)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold transition-all duration-300"
                      style={{ width: `${(currentIndex / stats.total) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                {broadcastState === 'idle' && (
                  <button
                    onClick={startBroadcast}
                    className="flex-grow sm:flex-grow-0 px-6 py-3.5 bg-gold hover:bg-[#d4a843] text-black font-sans font-black text-xs uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="w-3.5 h-3.5" /> Start Broadcast
                  </button>
                )}

                {broadcastState === 'running' && (
                  <button
                    onClick={pauseBroadcast}
                    className="flex-grow sm:flex-grow-0 px-6 py-3.5 bg-yellow-600 hover:bg-yellow-700 text-white font-sans font-black text-xs uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Pause className="w-3.5 h-3.5" /> Pause Campaign
                  </button>
                )}

                {broadcastState === 'paused' && (
                  <>
                    <button
                      onClick={resumeBroadcast}
                      className="px-6 py-3.5 bg-green-600 hover:bg-green-700 text-white font-sans font-black text-xs uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2"
                    >
                      <Play className="w-3.5 h-3.5" /> Resume
                    </button>
                    <button
                      onClick={stopBroadcast}
                      className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-sans font-black text-xs uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2"
                    >
                      <Square className="w-3.5 h-3.5" /> Stop
                    </button>
                  </>
                )}

                {(broadcastState === 'completed' || broadcastState === 'stopped') && (
                  <button
                    onClick={resetBroadcast}
                    className="flex-grow sm:flex-grow-0 px-6 py-3.5 border border-white/10 hover:bg-white/5 text-white font-sans font-black text-xs uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Clear & Reset Panel
                  </button>
                )}
              </div>
            </div>

            {/* Execution Console */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden">
              <div className="bg-[#121212] px-6 py-3 border-b border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-sans font-black uppercase tracking-wider text-gold flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> Live Execution Logs
                </span>
                <button
                  onClick={() => setLogs([])}
                  className="text-[9px] uppercase tracking-widest text-[#555] hover:text-[#aaa] font-bold"
                >
                  Clear Logs
                </button>
              </div>
              <div className="p-4 bg-[#030303] min-h-[200px] max-h-[280px] overflow-y-auto font-mono text-[10px] leading-relaxed space-y-1 text-[#888]">
                {logs.length === 0 ? (
                  <div className="text-[#444] italic">System console is idle. Start broadcast to see logs...</div>
                ) : (
                  logs.map(log => (
                    <div key={log.id} className="flex items-start gap-1.5">
                      <span className="text-[#444]">[{log.timestamp}]</span>
                      <span
                        className={
                          log.type === 'success'
                            ? 'text-green-500'
                            : log.type === 'error'
                            ? 'text-red-500 font-bold'
                            : log.type === 'warning'
                            ? 'text-yellow-500'
                            : 'text-[#888]'
                        }
                      >
                        {log.text}
                      </span>
                    </div>
                  ))
                )}
                <div ref={terminalEndRef} />
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Instructions Guide Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* GUIDE 1: App password setup */}
            <div className="bg-[#0a0a0a] border border-purple-950/40 p-6 rounded-sm shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-900/5 blur-[30px] rounded-full pointer-events-none" />
              
              <h3 className="text-sm font-serif font-black uppercase tracking-wider text-purple-400 flex items-center gap-2 mb-4">
                <Info className="w-4 h-4" /> Gmail App Password Setup
              </h3>

              <div className="space-y-4 text-xs text-[#aaa] leading-relaxed">
                <p>
                  To secure your Gmail account, Google blocks standard third-party password access. You must generate a unique 16-character password specifically for this app.
                </p>
                <div className="space-y-3 bg-[#050505] p-4 rounded-sm border border-purple-950/20">
                  <div className="font-bold text-[#fdfbf7]">How to create one:</div>
                  <ol className="list-decimal pl-4 space-y-2 text-[#888]">
                    <li>Open your <a href="https://myaccount.google.com" target="_blank" className="text-gold hover:underline font-semibold">Google Account Settings</a> page.</li>
                    <li>Navigate to the <strong>Security</strong> tab in the sidebar.</li>
                    <li>Ensure <strong>2-Step Verification</strong> is enabled.</li>
                    <li>Search for <strong>"App passwords"</strong> in Google search bar.</li>
                    <li>Name your app (e.g. <em>Inkfetish Broadcaster</em>) and click <strong>Create</strong>.</li>
                    <li>Copy the highlighted <strong>16-character code</strong> (ignore spaces) and paste it into Step 1.</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* GUIDE 2: CSV Formatting rules */}
            <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-sm shadow-md">
              <h3 className="text-sm font-serif font-black uppercase tracking-wider text-gold flex items-center gap-2 mb-4">
                <FileSpreadsheet className="w-4 h-4" /> CSV Formatting Rules
              </h3>

              <div className="space-y-3 text-xs text-[#aaa] leading-relaxed">
                <p>
                  Formatting your contact spreadsheet correctly guarantees error-free broadcasts.
                </p>
                <ul className="list-disc pl-4 space-y-1 text-[#888]">
                  <li>The first line <strong>must</strong> define the headers.</li>
                  <li>One column must contain the recipient email.</li>
                  <li>Do not use special characters or spaces in headers.</li>
                  <li>Keep values simple; do not include line breaks inside cells.</li>
                </ul>
              </div>
            </div>

            {/* GUIDE 3: Daily Limits */}
            <div className="bg-[#0a0a0a] border border-red-950/40 p-6 rounded-sm shadow-md">
              <h3 className="text-sm font-serif font-black uppercase tracking-wider text-red-500 flex items-center gap-2 mb-4">
                <AlertTriangle className="w-4 h-4" /> Sending Limits & Reputation
              </h3>

              <div className="space-y-3 text-xs text-[#aaa] leading-relaxed">
                <p>
                  Gmail limits free accounts to <strong>500 emails per day</strong> (and Google Workspace to 2000/day).
                </p>
                <p className="text-[#888]">
                  To avoid getting flagged as spam:
                </p>
                <ul className="list-disc pl-4 space-y-1 text-[#888]">
                  <li>Keep stagger delay above 8s.</li>
                  <li>Keep jitter delay active.</li>
                  <li>Do not send large campaigns daily to new users who might report you.</li>
                </ul>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
