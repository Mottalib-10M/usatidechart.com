/** Station statistics computed once at build time from the predictions (src/data/stations.json). */
import type { Ev } from './tide.ts';
import { dayRange } from './tide.ts';
import { dayStartUtc, addDays, localDate, type Tz } from './time.ts';

export interface Extreme { t: number; h: number; date: string }
export interface StationStats {
  days: number;
  meanRange: number; springRange: number; neapRange: number;
  /** Share of days with a single high tide (diurnal days). */
  oneHighShare: number;
  /** Mean difference between the two highs of a two-high day, ft. */
  highInequality: number;
  lowInequality: number;
  tideType: 'semidiurnal' | 'mixed' | 'diurnal';
  maxHigh: Extreme; minLow: Extreme;
  /** Highest highs on distinct days, highest first. */
  topHighs: Extreme[];
  /** Lowest lows on distinct days, lowest first. */
  topLows: Extreme[];
  negativeLows: number; negativeLowDays: number;
  meanHigh: number; meanLow: number;
}

const r2 = (x: number) => Math.round(x * 100) / 100;
const pctile = (xs: number[], p: number) => { const s = [...xs].sort((a, b) => a - b); return s[Math.min(s.length - 1, Math.max(0, Math.round(p * (s.length - 1))))]; };

export function stationStats(ev: Ev[], days: string[], tz: Tz): StationStats {
  const ranges: number[] = [];
  let one = 0, two = 0, hiIneq = 0, loIneq = 0, nHi = 0, nLo = 0;
  for (const d of days) {
    const s = dayStartUtc(d, tz), e = dayStartUtc(addDays(d, 1), tz);
    const r = dayRange(ev, s, e);
    if (r !== null) ranges.push(r);
    const de = ev.filter((x) => x[0] >= s && x[0] < e);
    const hs = de.filter((x) => x[2] === 1).map((x) => x[1]);
    const ls = de.filter((x) => x[2] === 0).map((x) => x[1]);
    if (hs.length === 1) one++;
    if (hs.length === 2) { two++; hiIneq += Math.abs(hs[0] - hs[1]); nHi++; }
    if (ls.length === 2) { loIneq += Math.abs(ls[0] - ls[1]); nLo++; }
  }
  const meanRange = ranges.reduce((a, b) => a + b, 0) / ranges.length;
  const oneHighShare = one / Math.max(1, one + two);
  const highInequality = nHi ? hiIneq / nHi : 0, lowInequality = nLo ? loIneq / nLo : 0;
  const ineq = (highInequality + lowInequality) / 2 / meanRange;
  const tideType = oneHighShare >= 0.5 ? 'diurnal' : oneHighShare > 0.12 || ineq > 0.2 ? 'mixed' : 'semidiurnal';
  const ext = (e: Ev): Extreme => ({ t: e[0], h: r2(e[1]), date: localDate(e[0], tz) });
  const highs = ev.filter((e) => e[2] === 1), lows = ev.filter((e) => e[2] === 0);
  const distinct = (xs: Ev[], n: number) => { const seen = new Set<string>(); const out: Extreme[] = []; for (const e of xs) { const x = ext(e); if (seen.has(x.date)) continue; seen.add(x.date); out.push(x); if (out.length === n) break; } return out; };
  const byHigh = [...highs].sort((a, b) => b[1] - a[1]);
  const byLow = [...lows].sort((a, b) => a[1] - b[1]);
  const neg = lows.filter((e) => e[1] < 0);
  return {
    days: days.length,
    meanRange: r2(meanRange), springRange: r2(pctile(ranges, 0.9)), neapRange: r2(pctile(ranges, 0.1)),
    oneHighShare: r2(oneHighShare), highInequality: r2(highInequality), lowInequality: r2(lowInequality), tideType,
    maxHigh: ext(byHigh[0]), minLow: ext(byLow[0]),
    topHighs: distinct(byHigh, 6), topLows: distinct(byLow, 6),
    negativeLows: neg.length, negativeLowDays: new Set(neg.map((e) => localDate(e[0], tz))).size,
    meanHigh: r2(highs.reduce((a, e) => a + e[1], 0) / highs.length), meanLow: r2(lows.reduce((a, e) => a + e[1], 0) / lows.length),
  };
}
