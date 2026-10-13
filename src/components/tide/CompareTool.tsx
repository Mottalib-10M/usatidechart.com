/**
 * Comparison of the stations of one stretch of coast (Cape Cod, the Outer Banks): the same day,
 * one curve per station on a common scale, and the times side by side.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { model, eventsBetween, curve, dayRange } from '../../lib/engine/tide';
import { dayStartUtc, addDays, clock, shortDate, localDate, dayIndex } from '../../lib/engine/time';
import { loadFull } from '../../lib/client/load';
import { ft, zoneLabel } from './fmt';
import type { Lite, Win } from '../../lib/client/types';

interface Props { stations: Lite[]; wins: Record<string, Win>; buildMin: number; idPrefix?: string }
const COLORS = ['#0A3161', '#b45309', '#15803d', '#7c3aed', '#be123c', '#0e7490'];

export default function CompareTool({ stations, wins, buildMin, idPrefix = 'cp' }: Props) {
  const [now, setNow] = useState(buildMin);
  const [data, setData] = useState(wins);
  const [day, setDay] = useState<string | null>(null);
  useEffect(() => { setNow(Math.floor(Date.now() / 60000)); }, []);
  const tz = stations[0].tz;
  const today = localDate(now, tz);
  const sel = day ?? today;
  useEffect(() => {
    for (const s of stations) { const w = data[s.key]; const i = dayIndex(w.from, sel); if (i < 0 || i >= w.sky.length) loadFull(s.key).then((f) => setData((o) => ({ ...o, [s.key]: f }))).catch(() => {}); }
  }, [sel]); // eslint-disable-line react-hooks/exhaustive-deps
  const models = useMemo(() => Object.fromEntries(stations.map((s) => [s.key, model(data[s.key].events, data[s.key].hourly)])), [data, stations]);
  const start = dayStartUtc(sel, tz), end = dayStartUtc(addDays(sel, 1), tz);
  const lines = stations.map((s) => curve(models[s.key], start, end, 15));
  const all = lines.flat().map((p) => p[1]);
  const lo = all.length ? Math.min(...all) - 0.3 : 0, hi = all.length ? Math.max(...all) + 0.3 : 1;
  const W = 720, H = 240, L = 40, R = 10, T = 12, B = 30;
  const x = (t: number) => L + ((t - start) / (end - start)) * (W - L - R);
  const y = (h: number) => T + (1 - (h - lo) / (hi - lo)) * (H - T - B);
  const opts = Array.from({ length: 31 }, (_, i) => { const d = addDays(today, i); return { value: d, label: i === 0 ? `Today, ${shortDate(d)}` : shortDate(d) }; });
  if (!opts.some((o) => o.value === sel)) opts.unshift({ value: sel, label: shortDate(sel) });
  const ticks: number[] = []; const step = hi - lo > 6 ? 2 : 1; for (let v = Math.ceil(lo / step) * step; v <= hi; v += step) ticks.push(v);
  return (
    <div className="rechner rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <form onSubmit={(e) => e.preventDefault()} className="grid content-start gap-3">
          <SelectField id={`${idPrefix}-day`} label="Day" value={sel} onChange={setDay} options={opts} help={`Times in ${zoneLabel(tz)}`} />
        </form>
        <div data-resultat aria-live="polite" className="min-w-0">
          <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`Tide curves of ${stations.map((s) => s.place).join(', ')} on ${shortDate(sel)}`}>
            {ticks.map((v) => <g key={v}><line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="#e2e8f0" /><text x={L - 6} y={y(v) + 4} textAnchor="end" fontSize="11" fill="#475569">{`${v} ft`}</text></g>)}
            {[0, 6, 12, 18].map((h) => <text key={h} x={x(start + h * 60)} y={H - 10} fontSize="11" fill="#475569">{h === 0 ? '12 AM' : h === 12 ? '12 PM' : h < 12 ? `${h} AM` : `${h - 12} PM`}</text>)}
            {lines.map((pts, i) => <path key={i} d={pts.map((p, j) => `${j ? 'L' : 'M'}${x(p[0]).toFixed(1)},${y(p[1]).toFixed(1)}`).join('')} fill="none" stroke={COLORS[i % COLORS.length]} strokeWidth="2.2" />)}
            {now >= start && now <= end && <line x1={x(now)} x2={x(now)} y1={T} y2={H - B} stroke="#b91c1c" strokeWidth="1.2" />}
          </svg>
          <div className="mt-3 overflow-x-auto">
            <table className="journal w-full min-w-[34rem] text-sm">
              <thead><tr><th scope="col" className="px-2 py-2 text-left">Station</th><th scope="col" className="px-2 py-2 text-left">High tides</th><th scope="col" className="px-2 py-2 text-left">Low tides</th><th scope="col" className="px-2 py-2 text-right">Range</th></tr></thead>
              <tbody>{stations.map((s, i) => { const M = models[s.key]; const e = eventsBetween(M.ev, start, end); const r = dayRange(M.ev, start, end); return (
                <tr key={s.key}><td className="border-b border-navy-100 px-2 py-2"><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full align-middle" style={{ background: COLORS[i % COLORS.length] }} aria-hidden="true" /><a href={s.href} className="font-medium text-accent-700 underline-offset-2 hover:underline">{s.place}</a></td>
                  <td className="border-b border-navy-100 px-2 py-2 tabular-nums">{e.filter((v) => v[2]).map((v) => `${clock(v[0], s.tz)} ${ft(v[1])}`).join(' · ')}</td>
                  <td className="border-b border-navy-100 px-2 py-2 tabular-nums">{e.filter((v) => !v[2]).map((v) => `${clock(v[0], s.tz)} ${ft(v[1])}`).join(' · ')}</td>
                  <td className="border-b border-navy-100 px-2 py-2 text-right tabular-nums">{r !== null ? ft(r) : ''}</td></tr>); })}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
