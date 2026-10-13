/**
 * Time in the station's own zone. Every instant is stored as whole minutes since 1970-01-01 UTC
 * ("epoch minutes"); the display converts with Intl in the station's IANA zone, so a visitor in
 * Denver reading the Myrtle Beach page sees Myrtle Beach clock times. Numbers come from
 * `formatToParts` and are assembled here, never from a locale string, so the server build and the
 * browser produce the same characters (RECETTE §17.5).
 */
export type Tz = string;

/** NOAA `timezonecorr` (standard offset, hours) → IANA zone. All coastal stations of the site
 *  observe US daylight saving time except Hawaii. */
export function tzOf(corr: number): Tz {
  const map: Record<string, Tz> = { '-5': 'America/New_York', '-6': 'America/Chicago', '-8': 'America/Los_Angeles', '-9': 'America/Anchorage', '-10': 'Pacific/Honolulu' };
  const z = map[String(corr)];
  if (!z) throw new Error(`No time zone for offset ${corr}`);
  return z;
}

const cache = new Map<Tz, Intl.DateTimeFormat>();
function fmt(tz: Tz) {
  let f = cache.get(tz);
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    cache.set(tz, f);
  }
  return f;
}

export interface Parts { y: number; m: number; d: number; h: number; mi: number }
export function parts(epochMin: number, tz: Tz): Parts {
  const o: Record<string, number> = {};
  for (const p of fmt(tz).formatToParts(new Date(epochMin * 60000))) if (p.type !== 'literal') o[p.type] = Number(p.value);
  return { y: o.year, m: o.month, d: o.day, h: o.hour === 24 ? 0 : o.hour, mi: o.minute };
}

/** Minutes to add to UTC to get the station's wall clock at that instant (−240 for EDT). */
export function offsetMin(epochMin: number, tz: Tz): number {
  const p = parts(epochMin, tz);
  return Math.round(Date.UTC(p.y, p.m - 1, p.d, p.h, p.mi) / 60000) - epochMin;
}

const pad = (n: number) => String(n).padStart(2, '0');
export const isoOf = (p: Parts) => `${p.y}-${pad(p.m)}-${pad(p.d)}`;
/** Local calendar date of an instant: "2026-10-12". */
export const localDate = (epochMin: number, tz: Tz) => isoOf(parts(epochMin, tz));

/** Epoch minute of local midnight on a calendar date (handles the 23- and 25-hour DST days). */
export function dayStartUtc(iso: string, tz: Tz): number {
  const [y, m, d] = iso.split('-').map(Number);
  const guess = Math.round(Date.UTC(y, m - 1, d) / 60000);
  let t = guess - offsetMin(guess, tz);
  t = guess - offsetMin(t, tz);
  return t;
}
/** Length of a local day in minutes: 1440, or 1380 / 1500 on the DST change days. */
export const dayLength = (iso: string, tz: Tz) => dayStartUtc(addDays(iso, 1), tz) - dayStartUtc(iso, tz);

export function addDays(iso: string, n: number): string {
  const [y, m, d] = iso.split('-').map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return `${t.getUTCFullYear()}-${pad(t.getUTCMonth() + 1)}-${pad(t.getUTCDate())}`;
}
export function dayList(from: string, to: string): string[] {
  const out: string[] = [];
  for (let d = from; d <= to; d = addDays(d, 1)) out.push(d);
  return out;
}
export const dayIndex = (from: string, iso: string) => Math.round((Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10)) - Date.UTC(+from.slice(0, 4), +from.slice(5, 7) - 1, +from.slice(8, 10))) / 86400000);

/** "3:42 PM" in the station zone. */
export function clock(epochMin: number, tz: Tz): string {
  const p = parts(epochMin, tz);
  const h12 = p.h % 12 === 0 ? 12 : p.h % 12;
  return `${h12}:${pad(p.mi)} ${p.h < 12 ? 'AM' : 'PM'}`;
}
/** Minutes since local midnight (0–1439), for positioning on a 24-hour chart. */
export const minuteOfDay = (epochMin: number, tz: Tz) => { const p = parts(epochMin, tz); return p.h * 60 + p.mi; };

const WD = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MO = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const wdOf = (iso: string) => new Date(`${iso}T12:00:00Z`).getUTCDay();
/** "Monday, October 12" */
export const longDate = (iso: string) => `${WD[wdOf(iso)]}, ${MO[+iso.slice(5, 7) - 1]} ${+iso.slice(8, 10)}`;
/** "Mon Oct 12" */
export const shortDate = (iso: string) => `${WD[wdOf(iso)].slice(0, 3)} ${MO[+iso.slice(5, 7) - 1].slice(0, 3)} ${+iso.slice(8, 10)}`;
/** "October 12, 2026" */
export const fullDate = (iso: string) => `${MO[+iso.slice(5, 7) - 1]} ${+iso.slice(8, 10)}, ${iso.slice(0, 4)}`;
/** "October 2026" */
export const monthName = (iso: string) => `${MO[+iso.slice(5, 7) - 1]} ${iso.slice(0, 4)}`;
/** "2 h 15 min" */
export function duration(min: number): string {
  const m = Math.max(0, Math.round(min));
  const h = Math.floor(m / 60), r = m % 60;
  return h ? (r ? `${h} h ${r} min` : `${h} h`) : `${r} min`;
}
