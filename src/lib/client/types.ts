/** Shapes shared by the build and the browser islands (no data imports here). */
import type { Ev, Hourly } from '../engine/tide';
import type { SkyRow } from '../engine/solunar';

/** What an island needs to know about a station. */
export interface Lite {
  key: string; slug: string; state: string; stateName: string; abbr: string; place: string;
  noaaName: string; id: string; tz: string; lat: number; lng: number; meanRange: number;
  curve: 'hourly' | 'shaped' | 'cosine'; href: string;
}
/** A slice of a station file (or the whole file): local days from `from`. */
export interface Win { from: string; events: Ev[]; hourly: Hourly | null; sky: SkyRow[] }
