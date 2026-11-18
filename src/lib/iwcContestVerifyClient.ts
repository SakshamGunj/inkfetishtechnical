const ORDER_KEY = 'iwc_contest_2026_order_id';
const ORDER_IDS_KEY = 'iwc_contest_2026_order_ids';
const DRAFT_REG_KEY = 'iwc_contest_2026_draft_reg';

export interface IwcDraftRegistration {
  docId: string;
  registrationId: string;
  fullName: string;
  email: string;
  whatsapp: string;
  age: string;
  tier: '1_entry' | '2_entries';
  amount: number;
  paymentStatus: 'PENDING' | 'PAID';
  paidOrderId?: string;
  submitted?: boolean;
}

export function rememberIwcOrderId(orderId: string) {
  if (!orderId || typeof window === 'undefined') return;
  localStorage.setItem(ORDER_KEY, orderId);
  try {
    const existing = JSON.parse(localStorage.getItem(ORDER_IDS_KEY) || '[]');
    const next = Array.isArray(existing) ? existing : [];
    if (!next.includes(orderId)) next.push(orderId);
    localStorage.setItem(ORDER_IDS_KEY, JSON.stringify(next));
  } catch {
    localStorage.setItem(ORDER_IDS_KEY, JSON.stringify([orderId]));
  }
}

export function readRememberedIwcOrderIds(): string[] {
  if (typeof window === 'undefined') return [];
  const ids: string[] = [];
  const latest = localStorage.getItem(ORDER_KEY);
  if (latest) ids.push(latest);
  try {
    const stored = JSON.parse(localStorage.getItem(ORDER_IDS_KEY) || '[]');
    if (Array.isArray(stored)) {
      ids.push(...stored.filter((id) => typeof id === 'string'));
    }
  } catch {
    /* ignore */
  }
  return Array.from(new Set(ids.filter(Boolean)));
}

export function saveIwcDraftReg(reg: IwcDraftRegistration) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(DRAFT_REG_KEY, JSON.stringify(reg));
  } catch {
    /* ignore */
  }
}

export function readIwcDraftReg(): IwcDraftRegistration | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(DRAFT_REG_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as IwcDraftRegistration;
  } catch {
    return null;
  }
}

export function clearIwcDraftAfterSubmit() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(ORDER_KEY);
    localStorage.removeItem(ORDER_IDS_KEY);
    localStorage.removeItem(DRAFT_REG_KEY);
  } catch {
    /* ignore */
  }
}

export async function verifyIwcPaymentStatus(params: {
  orderId?: string;
  orderIds?: string[];
  docId?: string;
  registrationId?: string;
  email?: string;
  phone?: string;
}): Promise<{
  paid: boolean;
  status?: string;
  orderId?: string;
  docId?: string;
  registration?: {
    docId: string;
    registrationId: string;
    fullName: string;
    email: string;
    whatsapp: string;
    age: string;
    tier: '1_entry' | '2_entries';
    amount: number;
    status?: string;
  };
}> {
  try {
    const res = await fetch('/api/indian-writers-championship/verify-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_id: params.orderId,
        order_ids: params.orderIds,
        docId: params.docId,
        registrationId: params.registrationId,
        email: params.email,
        phone: params.phone,
      }),
      cache: 'no-store',
    });
    const data = await res.json();
    const isPaid = data.status === 'PAID' || data.order_status === 'PAID';
    return {
      paid: isPaid,
      status: data.status || data.order_status,
      orderId: data.order_id,
      docId: data.docId,
      registration: data.registration,
    };
  } catch {
    return { paid: false };
  }
}

export async function pollIwcPaymentStatus(params: {
  orderId?: string;
  orderIds?: string[];
  docId?: string;
  registrationId?: string;
  email?: string;
  phone?: string;
  attempts?: number;
}) {
  const maxAttempts = params.attempts ?? 4;
  let lastResult: Awaited<ReturnType<typeof verifyIwcPaymentStatus>> = { paid: false };
  for (let i = 0; i < maxAttempts; i++) {
    if (i > 0) {
      await new Promise((r) => setTimeout(r, i * 1000));
    }
    lastResult = await verifyIwcPaymentStatus(params);
    if (lastResult.paid || lastResult.status === 'ALREADY_SUBMITTED') {
      return lastResult;
    }
  }
  return lastResult;
}
