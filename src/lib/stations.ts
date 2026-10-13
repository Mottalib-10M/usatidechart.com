/**
 * Build-time access to the station registry (src/data/stations.json) and the prediction files
 * (public/data/<state>/<slug>.json). Server side only: the islands receive slices as props.
 */
import fs from 'node:fs';
import path from 'node:path';
import REG from '../data/stations.json';
import STATES from '../data/states.json';
import type { StationStats } from './engine/stats';
import type { Lite, Win } from './client/types';
import { localDate, dayIndex, addDays, dayStartUtc } from './engine/time';

export interface Station {
  key: string; slug: string; state: string; place: string; id: string; noaaName: string; type: 'R' | 'S';
  referenceId: string | null; referenceName: string | null; lat: number; lng: number; tz: string;
  offsets: { refStationId?: string; heightOffsetHighTide?: number; heightOffsetLowTide?: number; timeOffsetHighTide?: number; timeOffsetLowTide?: number; heightAdjustedType?: string } | null;
  datums: { MHHW?: number; MHW?: number; MSL?: number; MLW?: number; MLLW?: number; GT?: number; MN?: number; epoch?: string } | null;
  curve: 'hourly' | 'shaped' | 'cosine';
  stats: StationStats;
}
export const DATA_META = { retrieved: REG.retrieved_at as string, begin: REG.begin as string, end: REG.end as string };
export const STATIONS = REG.stations as unknown as Station[];
export type StateSlug = keyof typeof STATES;
export const STATE_INFO = STATES as Record<string, { name: string; abbr: string; coast: 'east' | 'gulf' | 'west' | 'pacific' }>;
export const STATE_LIST = Object.entries(STATE_INFO).map(([slug, v]) => ({ slug, ...v }));
export const station = (key: string) => { const s = STATIONS.find((x) => x.key === key); if (!s) throw new Error(`Unknown station ${key}`); return s; };
export const stationsIn = (state: string) => STATIONS.filter((s) => s.state === state);

/** Instant of the build, in epoch minutes: the islands' first render uses it (RECETTE §17.5). */
export const BUILD_MIN = Math.floor(Date.now() / 60000);

export function lite(s: Station): Lite {
  const st = STATE_INFO[s.state];
  return { key: s.key, slug: s.slug, state: s.state, stateName: st.name, abbr: st.abbr, place: s.place, noaaName: s.noaaName, id: s.id, tz: s.tz,
    lat: s.lat, lng: s.lng, meanRange: s.stats.meanRange, curve: s.curve, href: `/en/${s.state}/${s.slug}/` };
}
export const ALL_LITE = () => STATIONS.map(lite);

const fileCache = new Map<string, Win & { to: string }>();
export function full(key: string): Win & { to: string } {
  let f = fileCache.get(key);
  if (!f) {
    const d = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/data', `${key}.json`), 'utf8'));
    f = { from: d.from, to: d.to, events: d.events, hourly: d.hourly, sky: d.sky };
    fileCache.set(key, f);
  }
  return f;
}

/** Local "today" at the station when the site was built. */
export const buildDay = (s: Station) => localDate(BUILD_MIN, s.tz);

/** A light slice for the first render: from the day before the build day to 9 days after. */
export function windowOf(key: string, days = 10): Win {
  const s = station(key), f = full(key);
  const first = addDays(buildDay(s), -1);
  const i0 = Math.max(0, dayIndex(f.from, first));
  const from = addDays(f.from, i0);
  const t0 = dayStartUtc(from, s.tz) - 720, t1 = dayStartUtc(addDays(from, days + 1), s.tz) + 720;
  const events = f.events.filter((e) => e[0] >= t0 && e[0] <= t1);
  let hourly = null;
  if (f.hourly) {
    const a = Math.max(0, Math.floor((t0 - f.hourly.t0) / 60)), b = Math.min(f.hourly.v.length, Math.ceil((t1 - f.hourly.t0) / 60) + 1);
    hourly = { t0: f.hourly.t0 + a * 60, v: f.hourly.v.slice(a, b) };
  }
  return { from, events, hourly, sky: f.sky.slice(i0, i0 + days + 1) };
}
