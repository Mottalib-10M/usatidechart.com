#!/usr/bin/env node
/**
 * Adds the sky to every station file and writes the station registry used by the pages.
 *
 * Usage: node scripts/build-sky.mjs   (after python3 scripts/build-tides.py)
 *
 * For each local day of the prediction horizon, in the station's own time zone:
 * sunrise, sunset, civil dawn and dusk, moonrise, moonset, upper and lower moon transit
 * (the four solunar anchors), moon phase angle and illuminated fraction. Computed with
 * astronomy-engine (Don Cross, MIT licence), which follows the VSOP87 and ELP/MPP02 models
 * and is validated by its author against JPL Horizons; the site's own tests compare it with
 * published sunrise and moonrise times (tests/sky.test.ts).
 *
 * Writes public/data/<state>/<slug>.json (events + sky) and src/data/stations.json
 * (metadata + statistics computed from the predictions, read by the pages at build time).
 */
import fs from 'node:fs';
import path from 'node:path';
import * as A from 'astronomy-engine';
import { tzOf, dayStartUtc, addDays, dayList } from '../src/lib/engine/time.ts';
import { stationStats } from '../src/lib/engine/stats.ts';
import { shapedHourly } from '../src/lib/engine/subordinate.ts';

const ROOT = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const META = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/data/noaa-stations.json'), 'utf8'));
const toMin = (t) => (t ? Math.round(t.date.getTime() / 60000) : null);

function skyDay(lat, lng, start) {
  const obs = new A.Observer(lat, lng, 0);
  const d0 = new Date(start * 60000);
  const within = (t) => (t && t.date.getTime() < d0.getTime() + 86400000 ? t : null);
  const sr = within(A.SearchRiseSet(A.Body.Sun, obs, +1, d0, 1));
  const ss = within(A.SearchRiseSet(A.Body.Sun, obs, -1, d0, 1));
  const dawn = within(A.SearchAltitude(A.Body.Sun, obs, +1, d0, 1, -6));
  const dusk = within(A.SearchAltitude(A.Body.Sun, obs, -1, d0, 1, -6));
  const mr = within(A.SearchRiseSet(A.Body.Moon, obs, +1, d0, 1));
  const ms = within(A.SearchRiseSet(A.Body.Moon, obs, -1, d0, 1));
  const up = A.SearchHourAngle(A.Body.Moon, obs, 0, d0, +1);
  const lo = A.SearchHourAngle(A.Body.Moon, obs, 12, d0, +1);
  const tu = up.time.date.getTime() < d0.getTime() + 86400000 ? toMin(up.time) : null;
  const tl = lo.time.date.getTime() < d0.getTime() + 86400000 ? toMin(lo.time) : null;
  const noon = new Date(d0.getTime() + 12 * 3600000);
  const phase = Math.round(A.MoonPhase(noon));
  const illum = Math.round(A.Illumination(A.Body.Moon, noon).phase_fraction * 100);
  return [toMin(sr), toMin(ss), toMin(dawn), toMin(dusk), toMin(mr), toMin(ms), tu, tl, phase, illum];
}

const registry = [];
for (const [key, m] of Object.entries(META.stations)) {
  const file = path.join(ROOT, 'public/data', m.state, `${m.slug}.json`);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const tz = tzOf(m.tzcorr);
  const days = dayList(data.from, data.to);
  const sky = days.map((d) => skyDay(m.lat, m.lng, dayStartUtc(d, tz)));
  let hourly = data.hourly ?? null, shaped = false;
  if (!hourly && m.referenceId) {
    const ref = JSON.parse(fs.readFileSync(path.join(ROOT, '.cache-raw/ref', `${m.referenceId}.json`), 'utf8'));
    hourly = shapedHourly(data.events, ref.events, ref.hourly); shaped = true;
  }
  const out = { id: m.id, tz, from: data.from, to: data.to, events: data.events, hourly, shaped, sky };
  fs.writeFileSync(file, JSON.stringify(out));
  const stats = stationStats(data.events, days, tz);
  registry.push({ key, slug: m.slug, state: m.state, place: m.place, id: m.id, noaaName: m.noaaName, type: m.type,
    referenceId: m.referenceId, referenceName: m.referenceName ?? null, lat: Math.round(m.lat * 1e4) / 1e4, lng: Math.round(m.lng * 1e4) / 1e4,
    tz, offsets: m.offsets, datums: m.datums, curve: m.type === 'R' ? 'hourly' : shaped ? 'shaped' : 'cosine', stats });
  process.stdout.write('.');
}
fs.writeFileSync(path.join(ROOT, 'src/data/stations.json'), JSON.stringify({ retrieved_at: META.retrieved_at, begin: META.begin, end: META.end, stations: registry }, null, 1));
console.log(`\n${registry.length} stations`);
void addDays;
