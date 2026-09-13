const STORAGE_KEY = 'september_contest_order_id';
const STORAGE_IDS_KEY = 'september_contest_order_ids';

export function rememberSeptemberOrderId(orderId: string) {
  if (!orderId || typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, orderId);
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_IDS_KEY) || '[]');
    const next = Array.isArray(existing) ? existing : [];
    if (!next.includes(orderId)) next.push(orderId);
    localStorage.setItem(STORAGE_IDS_KEY, JSON.stringify(next));
  } catch {
    localStorage.setItem(STORAGE_IDS_KEY, JSON.stringify([orderId]));
  }
}

export function readRememberedSeptemberOrderIds(): string[] {
  if (typeof window === 'undefined') return [];
  const ids: string[] = [];
  const latest = localStorage.getItem(STORAGE_KEY);
  if (latest) ids.push(latest);
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_IDS_KEY) || '[]');
    if (Array.isArray(stored)) ids.push(...stored.filter((id) => typeof id === 'string'));
  } catch {
    /* ignore */
  }
  return Array.from(new Set(ids.filter(Boolean)));
}

export async function checkSeptemberOrderPaidOnce(orderId: string): Promise<boolean> {
  try {
    const verifyRes = await fetch('/api/september-contest/verify-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order_id: orderId }),
      cache: 'no-store',
    });
    const verifyData = await verifyRes.json();
    const status = verifyData.status || verifyData.order_status;
    return status === 'PAID';
  } catch {
    return false;
  }
}

export async function pollSeptemberOrderPaid(orderId: string): Promise<boolean> {
  for (let attempt = 0; attempt < 5; attempt++) {
    if (attempt > 0) {
      await new Promise((resolve) => setTimeout(resolve, attempt * 1200));
    }
    const isPaid = await checkSeptemberOrderPaidOnce(orderId);
    if (isPaid) return true;
  }
  return false;
}

export async function anySeptemberOrderPaid(orderIds: string[]): Promise<string | null> {
  const unique = Array.from(new Set(orderIds.filter(Boolean)));
  if (unique.length === 0) return null;

  // Check all orders concurrently once
  const results = await Promise.all(
    unique.map(async (id) => {
      const paid = await checkSeptemberOrderPaidOnce(id);
      return paid ? id : null;
    })
  );

  const paidId = results.find(id => id !== null);
  if (paidId) return paidId;
  
  return null;
}
