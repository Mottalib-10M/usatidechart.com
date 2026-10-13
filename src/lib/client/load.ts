/** Browser side: the full prediction file of a station, fetched once from this site (same origin). */
import type { Win } from './types';
const cache = new Map<string, Promise<Win>>();
export function loadFull(key: string): Promise<Win> {
  let p = cache.get(key);
  if (!p) {
    p = fetch(`/data/${key}.json`).then((r) => { if (!r.ok) throw new Error(`${key}: ${r.status}`); return r.json(); })
      .then((d) => ({ from: d.from, events: d.events, hourly: d.hourly, sky: d.sky }));
    cache.set(key, p);
  }
  return p;
}
