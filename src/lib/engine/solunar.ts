/**
 * Solunar periods (John Alden Knight's tables, 1926): two major periods centred on the moon's
 * upper and lower transit, two minor periods centred on moonrise and moonset. This site uses the
 * common widths: 2 hours for a major period (transit ± 60 min), 1 hour for a minor one (rise or
 * set ± 30 min). The sky times come from scripts/build-sky.mjs.
 *
 * The theory is a fishing tradition, not a proven law: studies give mixed results. The site
 * shows the periods because anglers ask for them, and says so (see the solunar tables page).
 */
export interface Sky { sr: number | null; ss: number | null; dawn: number | null; dusk: number | null; mr: number | null; ms: number | null; tu: number | null; tl: number | null; phase: number; illum: number }
export type SkyRow = [number | null, number | null, number | null, number | null, number | null, number | null, number | null, number | null, number, number];
export const skyOf = (r: SkyRow): Sky => ({ sr: r[0], ss: r[1], dawn: r[2], dusk: r[3], mr: r[4], ms: r[5], tu: r[6], tl: r[7], phase: r[8], illum: r[9] });

export const MAJOR_HALF = 60;
export const MINOR_HALF = 30;
export interface Period { kind: 'major' | 'minor'; anchor: 'moon overhead' | 'moon underfoot' | 'moonrise' | 'moonset'; center: number; start: number; end: number }

export function periods(s: Sky): Period[] {
  const out: Period[] = [];
  const add = (kind: Period['kind'], anchor: Period['anchor'], c: number | null, half: number) => { if (c !== null) out.push({ kind, anchor, center: c, start: c - half, end: c + half }); };
  add('major', 'moon overhead', s.tu, MAJOR_HALF);
  add('major', 'moon underfoot', s.tl, MAJOR_HALF);
  add('minor', 'moonrise', s.mr, MINOR_HALF);
  add('minor', 'moonset', s.ms, MINOR_HALF);
  return out.sort((a, b) => a.center - b.center);
}

/** Eight phase names from the ecliptic longitude difference moon − sun (0 = new, 180 = full). */
export function phaseName(deg: number): string {
  const names = ['New moon', 'Waxing crescent', 'First quarter', 'Waxing gibbous', 'Full moon', 'Waning gibbous', 'Last quarter', 'Waning crescent'];
  return names[Math.round((((deg % 360) + 360) % 360) / 45) % 8];
}
/** Days from the nearest new or full moon, approximated from the phase angle (12.19° a day). */
export const daysFromSyzygy = (deg: number) => { const a = ((deg % 180) + 180) % 180; return Math.min(a, 180 - a) / 12.19; };

const overlaps = (a0: number, a1: number, b0: number, b1: number) => a0 < b1 && b0 < a1;

/**
 * Day rating, 1 to 4, as this site defines it: 1 point for every day; +2 within 2 days of a new
 * or full moon (+1 within 4 days); +1 when a solunar period overlaps the hour around sunrise or
 * sunset. Printed with its rule on the method page; not a forecast of fish.
 */
export function dayRating(s: Sky): { score: number; reasons: string[] } {
  const reasons: string[] = [];
  let score = 1;
  const d = daysFromSyzygy(s.phase);
  const which = Math.abs(((s.phase % 360) + 360) % 360 - 180) < 90 ? 'full' : 'new';
  if (d <= 2) { score += 2; reasons.push(`within 2 days of the ${which} moon`); }
  else if (d <= 4) { score += 1; reasons.push(`${Math.round(d)} days from the ${which} moon`); }
  const ps = periods(s);
  const edge = [s.sr, s.ss].filter((x): x is number => x !== null);
  if (ps.some((p) => edge.some((e) => overlaps(p.start, p.end, e - 60, e + 60)))) { score += 1; reasons.push('a solunar period meets sunrise or sunset'); }
  return { score: Math.min(4, score), reasons };
}

export interface FishWindow extends Period { atLight: boolean; nearTurn: boolean }
/** Solunar periods of a day, flagged when they meet the hour around sunrise/sunset or a tide turn (±60 min). */
export function fishWindows(s: Sky, turns: number[]): FishWindow[] {
  const edge = [s.sr, s.ss].filter((x): x is number => x !== null);
  return periods(s).map((p) => ({ ...p, atLight: edge.some((e) => overlaps(p.start, p.end, e - 60, e + 60)), nearTurn: turns.some((t) => overlaps(p.start, p.end, t - 60, t + 60)) }));
}
