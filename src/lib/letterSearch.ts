import letters from '@/data/iwl_s2_letters.json';

export interface Letter {
  id: number;
  name: string;
}
export interface Hit extends Letter {
  score: number;
}

export const LETTERS = letters as Letter[];

/* ---------- normalisation ---------- */

const strip = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

/** lowercase, accents removed, punctuation -> space */
export const norm = (s: string) => strip(s).replace(/[^a-z0-9]+/g, ' ').trim();

/**
 * Rough Indian-name phonetic key so "Shaikh/Sheikh", "Dwivedy/Dwivedi",
 * "Aayushi/Ayushi", "Vishal/Wishal", "Fatima/Phatima" collapse to the same thing.
 */
export function phon(word: string): string {
  let w = strip(word).replace(/[^a-z]/g, '');
  w = w
    .replace(/ai|ei|ay|ey/g, 'i')
    .replace(/ph/g, 'f')
    .replace(/ck|q/g, 'k')
    .replace(/w/g, 'v')
    .replace(/z/g, 's')
    .replace(/x/g, 'ks')
    .replace(/h/g, '') // sh/kh/gh/th/dh/bh -> s/k/g/t/d/b
    .replace(/[yi]/g, 'i')
    .replace(/e/g, 'i')
    .replace(/[ou]/g, 'u')
    .replace(/(.)\1+/g, '$1'); // doubled letters
  return w;
}

/* ---------- edit distance (bounded) ---------- */

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
      // adjacent transposition ("sarha" -> "sarah")
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, prev[j - 2] + 1);
      cur[j] = v;
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > max) return max + 1;
    prev = cur;
  }
  return prev[n];
}

const isSubsequence = (q: string, t: string) => {
  let i = 0;
  for (let j = 0; j < t.length && i < q.length; j++) if (t[j] === q[i]) i++;
  return i === q.length;
};

/* ---------- index (built once) ---------- */

interface Indexed {
  letter: Letter;
  full: string;
  compact: string;
  tokens: string[];
  ptokens: string[];
}

const INDEX: Indexed[] = LETTERS.map((letter) => {
  const full = norm(letter.name);
  const tokens = full.split(' ').filter(Boolean);
  return { letter, full, compact: full.replace(/ /g, ''), tokens, ptokens: tokens.map(phon) };
});

/** Score one query token against one name token (0 = no match, 100 = best). */
function tokenScore(q: string, pq: string, t: string, pt: string): number {
  if (t === q) return 100;
  if (t.startsWith(q)) return 94 - Math.min(10, t.length - q.length);
  if (q.length >= 3 && pq.length >= 2) {
    if (pt === pq) return 92;
    if (pt.startsWith(pq)) return 86 - Math.min(8, pt.length - pq.length);
  }
  if (q.length >= 3 && t.includes(q)) return 70;

  if (q.length >= 3) {
    const max = q.length <= 5 ? 1 : q.length <= 8 ? 2 : 3;
    // typed-so-far fuzzy: compare against the same-length prefix of the name token
    const pre = lev(q, t.slice(0, q.length), max);
    const whole = lev(q, t, max);
    const d = Math.min(pre + 0.5, whole);
    if (d <= max) return 78 - d * 10;
    if (pq.length >= 4) {
      const pd = Math.min(lev(pq, pt.slice(0, pq.length), 1) + 0.5, lev(pq, pt, 1));
      if (pd <= 1) return 66 - pd * 8;
    }
    if (isSubsequence(q, t)) return 32;
  }
  return 0;
}

export function searchLetters(query: string, limit = 8): Hit[] {
  const q = norm(query);
  if (!q) return [];

  // typing a number => match by letter ID
  if (/^\d+$/.test(q)) {
    return INDEX.filter((x) => String(x.letter.id).startsWith(q))
      .slice(0, limit)
      .map((x) => ({ ...x.letter, score: 100 }));
  }

  const qt = q.split(' ');
  const qp = qt.map(phon);
  const qc = q.replace(/ /g, '');
  const hits: Hit[] = [];

  for (const x of INDEX) {
    let sum = 0;
    let strong = 0;
    const used = new Set<number>();

    for (let i = 0; i < qt.length; i++) {
      let best = 0;
      let bj = -1;
      for (let j = 0; j < x.tokens.length; j++) {
        if (used.has(j)) continue;
        const s = tokenScore(qt[i], qp[i], x.tokens[j], x.ptokens[j]);
        if (s > best) {
          best = s;
          bj = j;
        }
      }
      if (bj >= 0) used.add(bj);
      if (best >= 60) strong++;
      sum += best;
    }

    let score = sum / qt.length;

    // whole-string compact match: "bineetdwi", "sarahwasim"
    if (qc.length >= 4) {
      if (x.compact.startsWith(qc)) score = Math.max(score, 92);
      else {
        const max = qc.length <= 6 ? 1 : 2;
        const d = lev(qc, x.compact.slice(0, qc.length), max);
        if (d <= max) score = Math.max(score, 76 - d * 8);
      }
    }

    if (x.full === q) score += 10;
    else if (x.full.startsWith(q)) score += 6;
    if (qt.length > 1 && strong === qt.length) score += 4;

    // a half-wrong multi-word query still needs at least one solid word
    if (score >= 34 && (strong > 0 || qt.length === 1 || score >= 60)) hits.push({ ...x.letter, score });
  }

  hits.sort((a, b) => b.score - a.score || a.name.length - b.name.length || a.id - b.id);
  return hits.slice(0, limit);
}

/** Split a display name into [text, highlighted] segments for the dropdown. */
export function highlight(name: string, query: string): { t: string; h: boolean }[] {
  const qts = norm(query).split(' ').filter(Boolean);
  if (!qts.length) return [{ t: name, h: false }];
  const out: { t: string; h: boolean }[] = [];
  for (const part of name.split(/(\s+)/)) {
    const n = norm(part);
    const q = qts.find((t) => n && n.startsWith(t));
    if (q) {
      // highlight the first N visible chars matching the typed prefix
      let seen = 0;
      let cut = 0;
      for (; cut < part.length && seen < q.length; cut++) if (/[a-z0-9]/i.test(strip(part[cut]))) seen++;
      out.push({ t: part.slice(0, cut), h: true }, { t: part.slice(cut), h: false });
    } else out.push({ t: part, h: false });
  }
  return out.filter((s) => s.t);
}
