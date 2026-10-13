/**
 * Planner: when is the water low enough to walk the beach, or high enough to launch a boat?
 * Exact crossings on the tide curve (tide.ts), optionally cut to daylight (sunrise to sunset),
 * keeping windows at least `minMinutes` long.
 */
import type { Model } from './tide.ts';
import { intervalsWhere, heightAt } from './tide.ts';
import { dayStartUtc, addDays, localDate, type Tz } from './time.ts';
import type { Sky } from './solunar.ts';

export interface PlanInput { level: number; mode: 'below' | 'above'; daylight: boolean; minMinutes: number }
export interface PlanWindow { date: string; start: number; end: number; minutes: number; /** Lowest (below) or highest (above) water in the window, ft. */ extreme: number; extremeAt: number }

export function plan(M: Model, days: string[], tz: Tz, skyFor: (iso: string) => Sky | null, input: PlanInput): PlanWindow[] {
  const out: PlanWindow[] = [];
  for (const d of days) {
    let from = dayStartUtc(d, tz), to = dayStartUtc(addDays(d, 1), tz);
    if (input.daylight) {
      const s = skyFor(d);
      if (!s || s.sr === null || s.ss === null) continue;
      from = Math.max(from, s.sr); to = Math.min(to, s.ss);
      if (to <= from) continue;
    }
    for (const [a, b] of intervalsWhere(M, from, to, input.level, input.mode === 'below')) {
      if (b - a < input.minMinutes) continue;
      let ex = input.mode === 'below' ? Infinity : -Infinity, exAt = a;
      for (let t = a; t <= b; t += 5) { const h = heightAt(M, t); if (h === null) continue; if (input.mode === 'below' ? h < ex : h > ex) { ex = h; exAt = t; } }
      for (const e of M.ev) if (e[0] >= a && e[0] <= b && (input.mode === 'below' ? e[1] < ex : e[1] > ex)) { ex = e[1]; exAt = e[0]; }
      out.push({ date: localDate(a, tz), start: Math.round(a), end: Math.round(b), minutes: Math.round(b - a), extreme: Math.round(ex * 100) / 100, extremeAt: exAt });
    }
  }
  return out;
}
