/**
 * Tide curve from NOAA predictions.
 *
 * Reference (harmonic) stations: NOAA's hourly predicted heights plus its predicted highs and
 * lows, joined by a monotone cubic (Fritsch–Carlson), so the curve passes through every NOAA
 * value and never overshoots a high or a low.
 *
 * Subordinate stations: NOAA publishes only the highs and lows (corrected from a reference
 * station). Between two of them the water is drawn as half a cosine wave,
 * h(t) = (h1 + h2)/2 + (h1 − h2)/2 · cos(π · (t − t1)/(t2 − t1)), the usual assumption behind
 * "height of tide at any time" tables and the rule of twelfths.
 *
 * tests/tide.test.ts measures both against NOAA's own 6-minute predictions.
 */
export type Ev = [t: number, h: number, high: number];
export interface Hourly { t0: number; v: number[] }

export interface Model {
  ev: Ev[];
  /** Knots of the curve: [t (epoch minutes), h (ft)], sorted. */
  pts: Array<[number, number]>;
  /** Slope at each knot, ft per minute. */
  m: number[];
  hourly: boolean;
}

/** Last index i with xs[i][0] <= t, or −1. */
export function idxBefore<T extends [number, ...unknown[]]>(xs: T[], t: number): number {
  let lo = 0, hi = xs.length - 1, ans = -1;
  while (lo <= hi) { const mid = (lo + hi) >> 1; if (xs[mid][0] <= t) { ans = mid; lo = mid + 1; } else hi = mid - 1; }
  return ans;
}

const cosSeg = (a: Ev, b: Ev, t: number) => (a[1] + b[1]) / 2 + ((a[1] - b[1]) / 2) * Math.cos(Math.PI * ((t - a[0]) / (b[0] - a[0])));

/** Builds the curve. `hourly` (hundredths of a foot) is optional; without it, cosine knots every 20 min. */
export function model(ev: Ev[], hourly?: Hourly | null): Model {
  let pts: Array<[number, number]> = [];
  if (hourly && hourly.v.length) {
    const evT = ev.map((e) => e[0]);
    let j = 0;
    for (let i = 0; i < hourly.v.length; i++) {
      const t = hourly.t0 + i * 60;
      while (j < evT.length && evT[j] < t - 5) j++;
      if (j < evT.length && Math.abs(evT[j] - t) <= 5) continue; // the event itself is a knot
      pts.push([t, hourly.v[i] / 100]);
    }
    for (const e of ev) pts.push([e[0], e[1]]);
    pts.sort((a, b) => a[0] - b[0]);
  } else {
    for (let i = 0; i < ev.length - 1; i++) {
      const a = ev[i], b = ev[i + 1];
      pts.push([a[0], a[1]]);
      for (let t = a[0] + 20; t < b[0] - 5; t += 20) pts.push([t, cosSeg(a, b, t)]);
    }
    if (ev.length) pts.push([ev[ev.length - 1][0], ev[ev.length - 1][1]]);
  }
  // Fritsch–Carlson slopes: monotone between knots, zero at the highs and lows.
  const n = pts.length, d: number[] = [], m: number[] = new Array(n).fill(0);
  for (let i = 0; i < n - 1; i++) d.push((pts[i + 1][1] - pts[i][1]) / (pts[i + 1][0] - pts[i][0]));
  for (let i = 1; i < n - 1; i++) {
    if (d[i - 1] * d[i] <= 0) { m[i] = 0; continue; }
    const h0 = pts[i][0] - pts[i - 1][0], h1 = pts[i + 1][0] - pts[i][0];
    const w1 = 2 * h1 + h0, w2 = h1 + 2 * h0;
    m[i] = (w1 + w2) / (w1 / d[i - 1] + w2 / d[i]);
  }
  if (n > 1) { m[0] = d[0]; m[n - 1] = d[n - 2]; }
  const evSet = new Set(ev.map((e) => e[0]));
  for (let i = 0; i < n; i++) if (evSet.has(pts[i][0])) m[i] = 0;
  pts = pts.map(([t, h]) => [t, h]);
  return { ev, pts, m, hourly: !!(hourly && hourly.v.length) };
}

function herm(M: Model, i: number, t: number): number {
  const [x0, y0] = M.pts[i], [x1, y1] = M.pts[i + 1];
  const h = x1 - x0, s = (t - x0) / h, s2 = s * s, s3 = s2 * s;
  return (2 * s3 - 3 * s2 + 1) * y0 + (s3 - 2 * s2 + s) * h * M.m[i] + (-2 * s3 + 3 * s2) * y1 + (s3 - s2) * h * M.m[i + 1];
}

/** Water height (ft above MLLW) at an instant, or null outside the predictions. */
export function heightAt(M: Model, t: number): number | null {
  const i = idxBefore(M.pts, t);
  if (i < 0) return null;
  if (i >= M.pts.length - 1) return M.pts[i][0] === t ? M.pts[i][1] : null;
  return herm(M, i, t);
}

/** Points of the curve from `from` to `to`, every `step` minutes, plus every high and low inside. */
export function curve(M: Model, from: number, to: number, step = 10): Array<[number, number]> {
  const pts: Array<[number, number]> = [];
  for (let t = from; t <= to; t += step) { const h = heightAt(M, t); if (h !== null) pts.push([t, h]); }
  for (const e of eventsBetween(M.ev, from, to)) pts.push([e[0], e[1]]);
  return pts.sort((a, b) => a[0] - b[0]);
}

export const eventsBetween = (ev: Ev[], from: number, to: number) => ev.filter((e) => e[0] >= from && e[0] < to);

export interface TideState { height: number; rising: boolean; prev: Ev; next: Ev; minutesToNext: number; /** 0 at the last turn, 1 at the next one. */ progress: number }
export function stateAt(M: Model, t: number): TideState | null {
  const i = idxBefore(M.ev, t);
  if (i < 0 || i >= M.ev.length - 1) return null;
  const prev = M.ev[i], next = M.ev[i + 1];
  const h = heightAt(M, t);
  if (h === null) return null;
  return { height: h, rising: next[1] > prev[1], prev, next, minutesToNext: next[0] - t, progress: (t - prev[0]) / (next[0] - prev[0]) };
}

/**
 * Intervals of [from, to] where the water is below (or above) `level` feet. Each segment between
 * two knots is monotone, so it holds at most one crossing, found by bisection to the second.
 */
export function intervalsWhere(M: Model, from: number, to: number, level: number, below: boolean): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  const ok = (h: number) => (below ? h < level : h > level);
  const h0 = heightAt(M, from);
  if (h0 === null) return out;
  let open: number | null = ok(h0) ? from : null;
  let i = Math.max(0, idxBefore(M.pts, from));
  for (; i < M.pts.length - 1 && M.pts[i][0] < to; i++) {
    const a = Math.max(from, M.pts[i][0]), b = Math.min(to, M.pts[i + 1][0]);
    if (b <= a) continue;
    const ha = herm(M, i, a), hb = herm(M, i, b);
    if ((ha - level) * (hb - level) > 0 || ha === hb) continue;
    let lo = a, hi = b;
    for (let k = 0; k < 40; k++) { const mid = (lo + hi) / 2; if ((herm(M, i, mid) - level) * (ha - level) > 0) lo = mid; else hi = mid; }
    const t = (lo + hi) / 2;
    if (t <= from || t >= to) continue;
    const entering = below ? hb < ha : hb > ha;
    if (entering && open === null) open = t;
    else if (!entering && open !== null) { out.push([open, t]); open = null; }
  }
  if (open !== null) out.push([open, to]);
  return out.filter(([s, e]) => e - s > 0.5);
}

/** Largest high minus smallest low among the events of a day, or null without both. */
export function dayRange(ev: Ev[], start: number, end: number): number | null {
  const d = eventsBetween(ev, start, end);
  const hs = d.filter((e) => e[2] === 1).map((e) => e[1]), ls = d.filter((e) => e[2] === 0).map((e) => e[1]);
  if (!hs.length || !ls.length) return null;
  return Math.max(...hs) - Math.min(...ls);
}

/**
 * Tide coefficient as published on this site: the day's range as a percentage of the station's
 * average daily range over the prediction horizon. 100 = an ordinary day; spring tides run
 * above 115, neap tides below 85. Not an official NOAA figure: NOAA publishes ranges in feet.
 */
export const coefficient = (range: number, meanRange: number) => Math.round((range / meanRange) * 100);
export function coefficientLabel(c: number): string {
  if (c >= 130) return 'very large';
  if (c >= 115) return 'large (spring tides)';
  if (c >= 85) return 'average';
  if (c >= 70) return 'small (neap tides)';
  return 'very small';
}
