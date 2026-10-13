/**
 * Sky times. Sunrise and sunset are checked against an independent formula, NOAA Global Monitoring
 * Laboratory's "General Solar Position Calculations" (accurate to about a minute at these
 * latitudes); the moon against two eclipses whose instants are fixed: the total lunar eclipse of
 * March 3, 2026 (greatest eclipse 11:33 UTC, full moon) and the total solar eclipse of August 12,
 * 2026 (greatest eclipse 17:46 UTC, new moon).
 */
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import * as A from 'astronomy-engine';
import REG from '../src/data/stations.json';
import { dayList, dayStartUtc } from '../src/lib/engine/time';
import { skyOf, periods, phaseName, dayRating, type SkyRow } from '../src/lib/engine/solunar';

const rad = Math.PI / 180;
function noaaSun(iso: string, lat: number, lng: number, rise: boolean) {
  const d = new Date(`${iso}T12:00:00Z`);
  const doy = Math.round((d.getTime() - Date.UTC(d.getUTCFullYear(), 0, 0)) / 86400000);
  const g = (2 * Math.PI / 365) * (doy - 1);
  const eq = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  const dec = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
  const ha = Math.acos(Math.cos(90.833 * rad) / (Math.cos(lat * rad) * Math.cos(dec)) - Math.tan(lat * rad) * Math.tan(dec)) / rad;
  return Math.round(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 60000) + 720 - 4 * (lng + (rise ? ha : -ha)) - eq;
}

type St = { state: string; slug: string; lat: number; lng: number; tz: string; place: string };
const stations = REG.stations as St[];
const file = (s: St) => JSON.parse(fs.readFileSync(`public/data/${s.state}/${s.slug}.json`, 'utf8')) as { from: string; to: string; sky: SkyRow[] };

describe('sunrise and sunset vs the NOAA solar formula', () => {
  for (const key of ['california/san-diego', 'south-carolina/myrtle-beach', 'alaska/anchorage', 'hawaii/honolulu', 'maine/bar-harbor']) {
    it(key, () => {
      const s = stations.find((x) => `${x.state}/${x.slug}` === key)!;
      const f = file(s);
      const days = dayList(f.from, f.to);
      for (const i of [0, 60, 120, 200, 300, 400]) {
        const sky = skyOf(f.sky[i]);
        // the station's local day, the formula's UTC day: compare to the nearest event
        const r = noaaSun(days[i], s.lat, s.lng, true), st = noaaSun(days[i], s.lat, s.lng, false);
        const near = (x: number, y: number) => Math.min(Math.abs(x - y), Math.abs(x - y - 1440), Math.abs(x - y + 1440));
        expect(near(sky.sr!, r)).toBeLessThan(4);
        expect(near(sky.ss!, st)).toBeLessThan(4);
      }
    });
  }
});

describe('moon', () => {
  it('is full at the lunar eclipse of March 3, 2026', () => {
    expect(Math.abs(A.MoonPhase(new Date('2026-03-03T11:33:00Z')) - 180)).toBeLessThan(1.5);
  });
  it('is new at the solar eclipse of August 12, 2026', () => {
    const p = A.MoonPhase(new Date('2026-08-12T17:46:00Z'));
    expect(Math.min(p, 360 - p)).toBeLessThan(1.5);
  });
  it('transits overhead and underfoot about 12 h 25 min apart', () => {
    const s = stations[0], f = file(s);
    let n = 0;
    for (const row of f.sky.slice(0, 60)) { const k = skyOf(row); if (k.tu && k.tl) { const gap = Math.abs(k.tu - k.tl); expect(Math.abs(gap - 745)).toBeLessThan(40); n++; } }
    expect(n).toBeGreaterThan(40);
  });
  it('names phases', () => {
    expect(phaseName(2)).toBe('New moon');
    expect(phaseName(178)).toBe('Full moon');
    expect(phaseName(92)).toBe('First quarter');
    expect(phaseName(355)).toBe('New moon');
  });
});

describe('solunar periods', () => {
  const base = dayStartUtc('2026-10-12', 'America/New_York');
  const sky = { sr: base + 430, ss: base + 1110, dawn: base + 405, dusk: base + 1135, mr: base + 440, ms: base + 1100, tu: base + 770, tl: null, phase: 3, illum: 1 };
  it('majors last 2 hours, minors 1 hour', () => {
    const p = periods(sky);
    expect(p.filter((x) => x.kind === 'major').map((x) => x.end - x.start)).toEqual([120]);
    expect(p.filter((x) => x.kind === 'minor').map((x) => x.end - x.start)).toEqual([60, 60]);
  });
  it('rates a new-moon day with a period at sunrise 4 out of 4', () => {
    expect(dayRating(sky).score).toBe(4);
    expect(dayRating({ ...sky, phase: 90, mr: null, ms: null, tu: base + 200 }).score).toBe(1);
  });
});
