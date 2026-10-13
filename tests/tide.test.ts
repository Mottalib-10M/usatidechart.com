/**
 * The curve against NOAA's own 6-minute predictions (fixtures downloaded on 2026-10-12 for
 * October 12–18, 2026), the exact crossings against brute-force sampling, and the time helpers
 * on the daylight-saving days.
 */
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import { heightAt, intervalsWhere, stateAt, dayRange, coefficient, model, type Ev, type Hourly } from '../src/lib/engine/tide';
import { dayStartUtc, dayLength, clock, localDate, addDays, duration, longDate, tzOf } from '../src/lib/engine/time';
import REG from '../src/data/stations.json';

const byId = (id: string) => (REG.stations as Array<{ id: string; state: string; slug: string; place: string }>).find((s) => s.id === id)!;
const raw = (s: { state: string; slug: string }) => JSON.parse(fs.readFileSync(`public/data/${s.state}/${s.slug}.json`, 'utf8')) as { events: Ev[]; hourly: Hourly | null };
const load = (s: { state: string; slug: string }, useHourly = true) => { const r = raw(s); return model(r.events, useHourly ? r.hourly : null); };

export function curveError(id: string, useHourly = true) {
  const six = JSON.parse(fs.readFileSync(`tests/fixtures/noaa-6min-${id}.json`, 'utf8')).predictions as Array<{ t: string; v: string }>;
  const ev = load(byId(id), useHourly);
  let max = 0, sq = 0, n = 0;
  for (const p of six) {
    const t = Math.round(Date.parse(p.t.replace(' ', 'T') + ':00Z') / 60000);
    const h = heightAt(ev, t);
    if (h === null) continue;
    const e = Math.abs(h - Number(p.v));
    max = Math.max(max, e); sq += e * e; n++;
  }
  return { max, rms: Math.sqrt(sq / n), n };
}

describe('curve between highs and lows vs NOAA 6-minute predictions', () => {
  // Bounds measured on 2026-10-12 and printed on the method page (src/data/validation.json).
  const cases: Array<[string, string]> = [['9410170', 'San Diego (mixed)'], ['8661070', 'Myrtle Beach (semidiurnal)'], ['8729807', 'Pensacola Beach (diurnal)'], ['8443970', 'Boston (9 ft range)'], ['9455920', 'Anchorage (28 ft range)']];
  const VAL = JSON.parse(fs.readFileSync('src/data/validation.json', 'utf8')).stations as Record<string, { max: number; rms: number; n: number; cosineMax: number }>;
  for (const [id, label] of cases) {
    it(`${label}: matches the published validation`, () => {
      const r = curveError(id);
      expect(r.n).toBe(1680);
      expect(Math.abs(r.max - VAL[id].max)).toBeLessThan(0.01);
      expect(Math.abs(r.rms - VAL[id].rms)).toBeLessThan(0.01);
      expect(r.max).toBeLessThan(0.6);
      expect(Math.abs(curveError(id, false).max - VAL[id].cosineMax)).toBeLessThan(0.01);
    });
  }
  it('stays within 0.2 ft at Myrtle Beach', () => {
    expect(curveError("8661070").max).toBeLessThan(0.2);
  });
});

describe('exact windows', () => {
  const ev = load(byId('8661070'));
  const from = dayStartUtc('2026-10-12', 'America/New_York'), to = from + 3 * 1440;
  it('agree with sampling every minute', () => {
    for (const lvl of [0.5, 1.5, 3, 4.5]) {
      const w = intervalsWhere(ev, from, to, lvl, true);
      for (let t = from + 1; t < to; t += 7) {
        const inside = w.some(([a, b]) => t > a + 0.01 && t < b - 0.01);
        const outside = w.every(([a, b]) => t < a - 0.01 || t > b + 0.01);
        const h = heightAt(ev, t)!;
        if (inside) expect(h).toBeLessThan(lvl + 1e-6);
        if (outside) expect(h).toBeGreaterThan(lvl - 1e-6);
      }
    }
  });
  it('above and below are complements', () => {
    const lo = intervalsWhere(ev, from, to, 2, true).reduce((a, [s, e]) => a + e - s, 0);
    const hi = intervalsWhere(ev, from, to, 2, false).reduce((a, [s, e]) => a + e - s, 0);
    expect(Math.round(lo + hi)).toBe(to - from);
  });
  it('a level under every low gives no window', () => {
    expect(intervalsWhere(ev, from, to, -5, true)).toEqual([]);
  });
  it('state: rising toward the next high', () => {
    const s = stateAt(ev, from + 600)!;
    expect(s.next[0]).toBeGreaterThan(from + 600);
    expect(s.rising).toBe(s.next[2] === 1);
  });
  it('coefficient: day range over mean range', () => {
    expect(coefficient(6, 5)).toBe(120);
    expect(dayRange(ev.ev, from, from + 1440)).toBeGreaterThan(4);
  });
});

describe('station time', () => {
  it('maps NOAA offsets to zones', () => {
    expect(tzOf(-5)).toBe('America/New_York');
    expect(tzOf(-10)).toBe('Pacific/Honolulu');
  });
  it('handles the DST days', () => {
    expect(dayLength('2026-11-01', 'America/New_York')).toBe(1500);
    expect(dayLength('2027-03-14', 'America/Chicago')).toBe(1380);
    expect(dayLength('2026-11-01', 'Pacific/Honolulu')).toBe(1440);
    expect(localDate(dayStartUtc('2026-11-01', 'America/Los_Angeles'), 'America/Los_Angeles')).toBe('2026-11-01');
  });
  it('writes clock times and durations', () => {
    const t = dayStartUtc('2026-10-12', 'America/New_York');
    expect(clock(t, 'America/New_York')).toBe('12:00 AM');
    expect(clock(t + 13 * 60 + 5, 'America/New_York')).toBe('1:05 PM');
    expect(duration(135)).toBe('2 h 15 min');
    expect(longDate('2026-10-12')).toBe('Monday, October 12');
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
  });
});

import { shapedHourly } from '../src/lib/engine/subordinate';
describe('subordinate stations: shape borrowed from the reference', () => {
  it('rebuilds La Jolla from San Diego within the published bound', () => {
    const lj = raw(byId('9410230')), sd = raw(byId('9410170'));
    const syn = model(lj.events, shapedHourly(lj.events, sd.events, sd.hourly!));
    const six = JSON.parse(fs.readFileSync('tests/fixtures/noaa-6min-9410230.json', 'utf8')).predictions as Array<{ t: string; v: string }>;
    let max = 0;
    for (const p of six) { const t = Math.round(Date.parse(p.t.replace(' ', 'T') + ':00Z') / 60000); const h = heightAt(syn, t); if (h !== null) max = Math.max(max, Math.abs(h - Number(p.v))); }
    const VAL = JSON.parse(fs.readFileSync('src/data/validation.json', 'utf8')).subordinate;
    expect(Math.abs(max - VAL.max)).toBeLessThan(0.01);
    expect(max).toBeLessThan(VAL.cosineMax);
  });
});
