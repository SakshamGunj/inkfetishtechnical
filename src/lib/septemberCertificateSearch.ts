import certificatesData from '@/data/september_certificates.json';

export interface SeptemberCertificate {
  sno: number;
  name: string;
  rawName: string;
  phone: string;
  email: string;
  writingType: string;
  theme: string;
  title: string;
  pdfUrl: string;
}

export interface SearchHit extends SeptemberCertificate {
  score: number;
  matchType: 'phone' | 'name' | 'sno';
}

export const CERTIFICATES = certificatesData as SeptemberCertificate[];

/* ---------- Normalisation & Phonetics ---------- */

const stripAccents = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

export const normalizeText = (s: string) => stripAccents(s).replace(/[^a-z0-9]+/g, ' ').trim();

export const cleanDigits = (s: string) => s.replace(/\D/g, '');

/**
 * Phonetic normalizer tailored for Indian names & common transliterations
 */
export function phon(word: string): string {
  let w = stripAccents(word).replace(/[^a-z]/g, '');
  w = w
    .replace(/ai|ei|ay|ey|ee|ea/g, 'i')
    .replace(/oo|ou/g, 'u')
    .replace(/ph/g, 'f')
    .replace(/ck|q/g, 'k')
    .replace(/w/g, 'v')
    .replace(/z/g, 's')
    .replace(/x/g, 'ks')
    .replace(/h/g, '') // collapses sh/kh/gh/th/dh/bh/jh to base consonants
    .replace(/[yi]/g, 'i')
    .replace(/e/g, 'i')
    .replace(/[ou]/g, 'u')
    .replace(/(.)\1+/g, '$1'); // collapse duplicate consecutive letters (e.g. tt -> t, nn -> n)
  return w;
}

/* ---------- Bounded Damerau-Levenshtein edit distance ---------- */

function lev(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const m = a.length;
  const n = b.length;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= n; j++) {
      let v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      // transposition check ("sarha" -> "sarah")
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        v = Math.min(v, prev[j - 2] + 1);
      }
      cur[j] = v;
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > max) return max + 1;
    prev = cur;
  }
  return prev[n];
}

/* ---------- Search Indexing ---------- */

interface IndexedCert {
  cert: SeptemberCertificate;
  normalizedName: string;
  normalizedRaw: string;
  compactName: string;
  tokens: string[];
  phonTokens: string[];
  phone: string;
  snoStr: string;
}

const INDEX: IndexedCert[] = CERTIFICATES.map((cert) => {
  const normalizedName = normalizeText(cert.name);
  const normalizedRaw = normalizeText(cert.rawName);
  const compactName = normalizedName.replace(/ /g, '');
  const tokens = Array.from(new Set([...normalizedName.split(' '), ...normalizedRaw.split(' ')]))
    .filter(Boolean)
    .filter((t) => t !== 'dr'); // keep dr as token if needed, but tokens include others
  const phonTokens = tokens.map(phon);

  return {
    cert,
    normalizedName,
    normalizedRaw,
    compactName,
    tokens,
    phonTokens,
    phone: cert.phone,
    snoStr: String(cert.sno),
  };
});

/** Token similarity score from 0 to 100 */
function tokenScore(q: string, qPhon: string, t: string, tPhon: string): number {
  if (t === q) return 100;
  if (t.startsWith(q)) return 95 - Math.min(10, t.length - q.length);
  if (q.length >= 3 && qPhon.length >= 2) {
    if (tPhon === qPhon) return 92;
    if (tPhon.startsWith(qPhon)) return 86 - Math.min(8, tPhon.length - qPhon.length);
  }
  if (q.length >= 3 && t.includes(q)) return 72;

  if (q.length >= 3) {
    const maxErrors = q.length <= 4 ? 1 : q.length <= 7 ? 2 : 3;
    const prefixDist = lev(q, t.slice(0, q.length), maxErrors);
    const fullDist = lev(q, t, maxErrors);
    const d = Math.min(prefixDist + 0.5, fullDist);
    if (d <= maxErrors) return Math.max(20, 80 - d * 14);

    if (qPhon.length >= 3) {
      const pd = Math.min(lev(qPhon, tPhon.slice(0, qPhon.length), 1) + 0.5, lev(qPhon, tPhon, 1));
      if (pd <= 1) return Math.max(20, 68 - pd * 10);
    }
  }
  return 0;
}

/**
 * Main search function:
 * Supports:
 * - Phone numbers (partial, exact 10-digit, formatted)
 * - Names (exact, partial, phonetic, with typos/misspellings)
 * - Serial number (1 to 105)
 */
export function searchSeptemberCertificates(query: string, limit = 8): SearchHit[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const digits = cleanDigits(trimmed);
  const qNorm = normalizeText(trimmed);

  const hits: SearchHit[] = [];

  // Case 1: If 1 to 3 digits typed without letters (e.g. "1", "42", "105", "#5")
  if (/^#?\d{1,3}$/.test(trimmed)) {
    const parsedSno = parseInt(digits, 10);
    const exactSno = INDEX.find((x) => x.cert.sno === parsedSno);
    if (exactSno) {
      hits.push({ ...exactSno.cert, score: 100, matchType: 'sno' });
    }
    // Also add other S.Nos starting with this digit
    for (const item of INDEX) {
      if (item.snoStr.startsWith(digits) && item.cert.sno !== parsedSno) {
        hits.push({ ...item.cert, score: 88, matchType: 'sno' });
      }
    }
    // Also include phone numbers ending with these digits
    for (const item of INDEX) {
      if (item.phone && item.phone.endsWith(digits) && item.cert.sno !== parsedSno) {
        hits.push({ ...item.cert, score: 75, matchType: 'phone' });
      }
    }
    if (hits.length > 0) {
      hits.sort((a, b) => b.score - a.score || a.sno - b.sno);
      return hits.slice(0, limit);
    }
  }

  // Case 2: Phone number search (4 or more digits typed)
  if (digits.length >= 4) {
    const last10 = digits.slice(-10);
    for (const item of INDEX) {
      if (item.phone) {
        if (item.phone === last10) {
          hits.push({ ...item.cert, score: 100, matchType: 'phone' });
        } else if (item.phone.endsWith(digits)) {
          hits.push({ ...item.cert, score: 92, matchType: 'phone' });
        } else if (item.phone.includes(digits)) {
          hits.push({ ...item.cert, score: 85, matchType: 'phone' });
        }
      }
    }
    if (hits.length > 0) {
      hits.sort((a, b) => b.score - a.score || a.sno - b.sno);
      return hits.slice(0, limit);
    }
  }

  // Case 3: Fuzzy Name search
  if (!qNorm) return [];

  const qTokens = qNorm.split(' ').filter(Boolean);
  const qPhons = qTokens.map(phon);
  const qCompact = qNorm.replace(/ /g, '');

  for (const item of INDEX) {
    let sumScore = 0;
    let strongMatches = 0;
    const usedTokenIdxs = new Set<number>();

    for (let i = 0; i < qTokens.length; i++) {
      let best = 0;
      let bestIdx = -1;
      for (let j = 0; j < item.tokens.length; j++) {
        if (usedTokenIdxs.has(j)) continue;
        const s = tokenScore(qTokens[i], qPhons[i], item.tokens[j], item.phonTokens[j]);
        if (s > best) {
          best = s;
          bestIdx = j;
        }
      }
      if (bestIdx >= 0) usedTokenIdxs.add(bestIdx);
      if (best >= 60) strongMatches++;
      sumScore += best;
    }

    let score = sumScore / qTokens.length;

    // Compact match: e.g. "rittikbora", "jahnavimuralidhar"
    if (qCompact.length >= 3) {
      if (item.compactName.startsWith(qCompact)) {
        score = Math.max(score, 94);
      } else if (item.compactName.includes(qCompact)) {
        score = Math.max(score, 85);
      } else {
        const maxErr = qCompact.length <= 6 ? 1 : 2;
        const dist = lev(qCompact, item.compactName.slice(0, qCompact.length), maxErr);
        if (dist <= maxErr) {
          score = Math.max(score, 80 - dist * 10);
        }
      }
    }

    // Exact or prefix bonuses
    if (item.normalizedName === qNorm || item.normalizedRaw === qNorm) {
      score += 15;
    } else if (item.normalizedName.startsWith(qNorm) || item.normalizedRaw.startsWith(qNorm)) {
      score += 8;
    }

    if (qTokens.length > 1 && strongMatches === qTokens.length) {
      score += 5;
    }

    if (score >= 32 && (strongMatches > 0 || qTokens.length === 1 || score >= 60)) {
      hits.push({ ...item.cert, score: Math.round(score), matchType: 'name' });
    }
  }

  hits.sort((a, b) => b.score - a.score || a.name.length - b.name.length || a.sno - b.sno);
  return hits.slice(0, limit);
}

/**
 * Highlights matching parts of the name in dropdown
 */
export function highlightMatch(name: string, query: string): { text: string; isMatch: boolean }[] {
  const cleanQ = normalizeText(query);
  if (!cleanQ) return [{ text: name, isMatch: false }];

  const tokens = cleanQ.split(' ').filter(Boolean);
  if (!tokens.length) return [{ text: name, isMatch: false }];

  const parts = name.split(/(\s+)/);
  const result: { text: string; isMatch: boolean }[] = [];

  for (const part of parts) {
    const normPart = normalizeText(part);
    const matchedToken = tokens.find((t) => normPart.startsWith(t) || normPart.includes(t));

    if (matchedToken) {
      const idx = part.toLowerCase().indexOf(matchedToken.toLowerCase());
      if (idx >= 0) {
        if (idx > 0) result.push({ text: part.slice(0, idx), isMatch: false });
        result.push({ text: part.slice(idx, idx + matchedToken.length), isMatch: true });
        if (idx + matchedToken.length < part.length) {
          result.push({ text: part.slice(idx + matchedToken.length), isMatch: false });
        }
      } else {
        result.push({ text: part, isMatch: true });
      }
    } else {
      result.push({ text: part, isMatch: false });
    }
  }

  return result.filter((r) => r.text);
}
