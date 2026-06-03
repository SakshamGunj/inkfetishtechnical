import { NextRequest, NextResponse } from 'next/server';

// ─── Baileys server is always local ─────────────────────
const BAILEYS_URL = process.env.BAILEYS_URL || 'http://localhost:3001';

function standardizePhone(phone: string): string {
  let clean = String(phone).replace(/\D/g, '');
  if (clean.length === 10) clean = `91${clean}`;
  return clean;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      action = 'send',
      recipientPhone,
      messageText,
      messageType,
      mediaUrl,
      mediaFilename,
      mediaMimetype,
      // Broadcast (legacy sequential) specific
      chatIds,
      variables,
    } = body;

    // ─────────────────────────────────────────────────────
    // 1. Connection health check / test
    // ─────────────────────────────────────────────────────
    if (action === 'test' || messageType === 'test') {
      const res = await fetch(`${BAILEYS_URL}/status`);
      const data = await res.json();

      if (data.status === 'connected') {
        return NextResponse.json({
          success: true,
          message: '✅ Baileys WhatsApp session is active and connected!',
          data,
        });
      } else {
        return NextResponse.json(
          { success: false, error: `Baileys session status: ${data.status}. Please scan the QR code first.` },
          { status: 503 }
        );
      }
    }

    // ─────────────────────────────────────────────────────
    // 2. Single message send
    // ─────────────────────────────────────────────────────
    if (action === 'send') {
      if (!recipientPhone) {
        return NextResponse.json({ success: false, error: 'Missing required field: recipientPhone.' }, { status: 400 });
      }

      const phone = standardizePhone(String(recipientPhone));

      console.log(`[Baileys Proxy] Sending to ${phone}`);

      const payload: any = {
        to: phone,
        text: messageText || '',
      };

      const isMedia = ['image', 'video', 'document', 'audio'].includes(messageType);
      if (isMedia && mediaUrl) {
        payload.mediaUrl = mediaUrl;
        payload.mediaType = messageType;
        payload.mediaFilename = mediaFilename;
        payload.mediaMimetype = mediaMimetype;
      }

      const res = await fetch(`${BAILEYS_URL}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return NextResponse.json(
          { success: false, error: data.error || 'Baileys send failed.' },
          { status: res.status }
        );
      }

      return NextResponse.json({
        success: true,
        data: { queue_id: data.messageId },
        recipient: data.jid,
      });
    }

    // ─────────────────────────────────────────────────────
    // 3. Broadcast — sequentially send to each recipient
    //    (Baileys has no server-side queue; the frontend's
    //     legacy loop already handles this per-person)
    //    We just send to a single chatId at a time.
    // ─────────────────────────────────────────────────────
    if (action === 'broadcast') {
      if (!chatIds || !Array.isArray(chatIds) || chatIds.length === 0) {
        return NextResponse.json({ success: false, error: 'Missing chatIds array.' }, { status: 400 });
      }

      // Resolve variables map by chat_id for personalisation
      const varMap: Record<string, Record<string, string>> = {};
      if (variables && Array.isArray(variables)) {
        for (const v of variables) {
          varMap[standardizePhone(v.chat_id)] = v.values || {};
        }
      }

      const results: any[] = [];
      for (const rawPhone of chatIds) {
        const phone = standardizePhone(String(rawPhone));
        // Apply variables to messageText
        const vars = varMap[phone] || {};
        let text = messageText || '';
        for (const [k, v] of Object.entries(vars)) {
          text = text.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), String(v));
        }

        try {
          const res = await fetch(`${BAILEYS_URL}/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ to: phone, text }),
          });
          const data = await res.json();
          results.push({ phone, success: data.success, messageId: data.messageId });
        } catch (err: any) {
          results.push({ phone, success: false, error: err.message });
        }
      }

      const allOk = results.every(r => r.success);
      return NextResponse.json({
        success: allOk,
        data: { broadcast_id: `baileys-${Date.now()}`, results },
      });
    }

    // ─────────────────────────────────────────────────────
    // 4. List Groups
    // ─────────────────────────────────────────────────────
    if (action === 'listGroups') {
      console.log('[Baileys Proxy] Fetching groups');
      const res = await fetch(`${BAILEYS_URL}/groups`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        return NextResponse.json({ success: false, error: data.error || 'Failed to fetch groups.' }, { status: res.status });
      }
      return NextResponse.json({ success: true, data: data.data });
    }

    // ─────────────────────────────────────────────────────
    // 5. Get Group Members (was getChatDetails in Periskope)
    // ─────────────────────────────────────────────────────
    if (action === 'getChatDetails') {
      const { recipientPhone: chatId } = body;
      if (!chatId) {
        return NextResponse.json({ success: false, error: 'Missing recipientPhone (chat ID).' }, { status: 400 });
      }
      const encodedJid = encodeURIComponent(chatId.trim());
      console.log(`[Baileys Proxy] Fetching members for: ${chatId}`);
      const res = await fetch(`${BAILEYS_URL}/group/${encodedJid}/members`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        return NextResponse.json({ success: false, error: data.error || 'Failed to fetch group members.' }, { status: res.status });
      }
      return NextResponse.json({ success: true, data: data.data });
    }

    // ─────────────────────────────────────────────────────
    // 6. Legacy Periskope actions that no longer apply
    //    Return success stubs so the frontend doesn't crash
    // ─────────────────────────────────────────────────────
    if (['getBroadcastStatus', 'getQueueStatus', 'fetchQueueJobs', 'purgeQueue'].includes(action)) {
      return NextResponse.json({ success: true, data: { status: 'not_applicable', note: 'Using Baileys — no server queue' } });
    }

    return NextResponse.json({ success: false, error: `Unknown action: ${action}` }, { status: 400 });

  } catch (error: any) {
    console.error('[Baileys Proxy Error]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
