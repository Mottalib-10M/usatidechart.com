/**
 * Mini-simulators of the guides (RECETTE §9.3): one subject, one calculation, the figure first.
 * Station minis start on the page's default station (its slice is in the page) and load another
 * station's file when the visitor picks it. `data-chrome`: the widget's labels count neither in
 * the page's words nor in the comparison between pages.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import NumberField from '../ui/NumberField';
import { model, stateAt, heightAt, eventsBetween, dayRange, coefficient, coefficientLabel, type Ev } from '../../lib/engine/tide';
import { dayStartUtc, addDays, clock, shortDate, localDate, duration, fullDate, dayIndex } from '../../lib/engine/time';
import { skyOf, periods, phaseName } from '../../lib/engine/solunar';
import { loadFull } from '../../lib/client/load';
import { ft, ft1, zoneLabel } from './fmt';
import type { Lite, Win } from '../../lib/client/types';

export type MiniKind = 'next' | 'height' | 'kings' | 'lows' | 'coef' | 'solunar' | 'twelfths' | 'depth' | 'ramp' | 'range';
interface Extremes { [key: string]: { highs: Array<[number, number]>; lows: Array<[number, number]>; negDays: number; mhhw: number | null } }
interface Props { kind: MiniKind; stations: Lite[]; initialKey: string; initialWin: Win; buildMin: number; extremes?: Extremes; href?: string; cta?: string }

function Shell({ title, kind, children, href, cta }: { title: string; kind: string; children: React.ReactNode; href?: string; cta?: string }) {
  return (
    <div data-chrome data-simulateur-secondaire data-mini={kind} className="not-prose my-8 rounded-xl border border-accent-200 bg-white p-4 sm:p-5">
      <p className="text-base font-semibold text-navy-900">{title}</p>
      {children}
      {href && <a href={href} className="mt-4 inline-block text-sm font-medium text-accent-700 hover:underline">{cta ?? 'Open the full tide chart'} →</a>}
    </div>
  );
}
function Out({ head, big, rows, note }: { head: string; big: string; rows: Array<[string, string]>; note?: string }) {
  return (
    <div aria-live="polite" className="rounded-lg bg-navy-50 p-4">
      <p className="text-sm font-medium text-navy-600">{head}</p>
      <p className="tabular-nums mt-1 text-3xl font-bold text-navy-900">{big}</p>
      <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
        {rows.map(([l, x]) => <tr key={l}><td className="py-1.5 pr-3 text-navy-600">{l}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{x}</td></tr>)}
      </tbody></table>
      {note && <p className="mt-2 text-xs text-navy-600">{note}</p>}
    </div>
  );
}

export default function Mini({ kind, stations, initialKey, initialWin, buildMin, extremes, href, cta }: Props) {
  const [key, setKey] = useState(initialKey);
  const [wins, setWins] = useState<Record<string, Win>>({ [initialKey]: initialWin });
  const [now, setNow] = useState(buildMin);
  const [hour, setHour] = useState('12');
  const [a, setA] = useState(kind === 'twelfths' ? 0.5 : kind === 'depth' ? 4 : kind === 'ramp' ? 2 : 0);
  const [b, setB] = useState(kind === 'twelfths' ? 6.5 : kind === 'depth' ? 2.5 : kind === 'ramp' ? 1 : 0);
  const [c, setC] = useState(kind === 'twelfths' ? '3' : '1');
  const [key2, setKey2] = useState(stations.find((s) => s.key !== initialKey)?.key ?? initialKey);
  useEffect(() => { setNow(Math.floor(Date.now() / 60000)); }, []);
  const pick = (k: string) => { setKey(k); if (!wins[k]) loadFull(k).then((w) => setWins((o) => ({ ...o, [k]: w }))).catch(() => {}); };
  const st = stations.find((s) => s.key === key)!;
  const win = wins[key] ?? wins[initialKey];
  const M = useMemo(() => model(win.events, win.hourly), [win]);
  const today = localDate(now, st.tz);
  const options = stations.map((s) => ({ value: s.key, label: `${s.place}, ${s.abbr}` }));
  const stationField = <SelectField id={`mini-${kind}-station`} label="Station" value={key} onChange={pick} options={options} help={`Times in ${zoneLabel(st.tz)}`} />;
  const loading = !wins[key];
  const grid = (...f: React.ReactNode[]) => <form className="grid grid-cols-1 gap-x-4 gap-y-3" onSubmit={(e) => e.preventDefault()}>{f}</form>;
  const two = (left: React.ReactNode, right: React.ReactNode) => <div className="mt-3 grid gap-5 sm:grid-cols-2">{left}{right}</div>;

  if (kind === 'next') {
    const s = stateAt(M, now);
    const ahead = M.ev.filter((e) => e[0] > now);
    const h = ahead.find((e) => e[2] === 1), l = ahead.find((e) => e[2] === 0);
    return <Shell title="Next high and low tide" kind={kind} href={st.href} cta={`${st.place} tide chart`}>{two(grid(stationField),
      <Out head={s ? `${st.place}: tide ${s.rising ? 'rising' : 'falling'}` : st.place} big={s ? ft(s.height) : loading ? '…' : '–'}
        rows={[['Next high', h ? `${clock(h[0], st.tz)}, ${ft(h[1])} (in ${duration(h[0] - now)})` : '…'], ['Next low', l ? `${clock(l[0], st.tz)}, ${ft(l[1])} (in ${duration(l[0] - now)})` : '…']]}
        note="Height now, read on the predicted curve; NOAA predictions, not observations." />)}</Shell>;
  }
  if (kind === 'height') {
    const t = dayStartUtc(today, st.tz) + Number(hour) * 60;
    const hh = heightAt(M, t);
    const s = stateAt(M, t);
    const hours = Array.from({ length: 24 }, (_, i) => ({ value: String(i), label: i === 0 ? '12 AM' : i === 12 ? '12 PM' : i < 12 ? `${i} AM` : `${i - 12} PM` }));
    return <Shell title="Water height at the hour you choose, today" kind={kind} href={st.href} cta={`${st.place} tide chart`}>{two(grid(stationField, <SelectField key="h" id="mini-height-hour" label="Time today" value={hour} onChange={setHour} options={hours} />),
      <Out head={`${st.place}, ${shortDate(today)} at ${hours[Number(hour)].label}`} big={hh !== null ? ft(hh) : '…'}
        rows={s ? [['Tide', s.rising ? 'rising' : 'falling'], [`Next ${s.next[2] ? 'high' : 'low'}`, `${clock(s.next[0], st.tz)}, ${ft(s.next[1])}`], ['Since last turn', duration(t - s.prev[0])]] : []}
        note="Read off the curve between NOAA's predicted heights." />)}</Shell>;
  }
  if (kind === 'kings' || kind === 'lows') {
    const x = extremes![key];
    const list = kind === 'kings' ? x.highs : x.lows;
    return <Shell title={kind === 'kings' ? 'Highest predicted tides at a station' : 'Lowest predicted tides at a station'} kind={kind} href={st.href} cta={`${st.place} tide chart`}>{two(grid(stationField),
      <Out head={kind === 'kings' ? `Highest high, ${fullDate(localDate(list[0][0], st.tz))}` : `Lowest low, ${fullDate(localDate(list[0][0], st.tz))}`} big={ft(list[0][1])}
        rows={list.slice(1, 5).map((e) => [shortDate(localDate(e[0], st.tz)) + ' ' + localDate(e[0], st.tz).slice(0, 4), `${clock(e[0], st.tz)}, ${ft(e[1])}`] as [string, string])}
        note={kind === 'kings' ? (x.mhhw !== null ? `Average higher high (MHHW) here: ${ft(x.mhhw)}. Wind and storm surge come on top of these predictions.` : 'Wind and storm surge come on top of these predictions.') : `${x.negDays} days with a low below zero (MLLW) in the prediction period.`} />)}</Shell>;
  }
  if (kind === 'coef') {
    const rows: Array<[string, string]> = [];
    let peak: [string, number] | null = null;
    for (let i = 0; i < 9; i++) {
      const d = addDays(today, i);
      if (dayIndex(win.from, d) >= win.sky.length) break;
      const r = dayRange(M.ev, dayStartUtc(d, st.tz), dayStartUtc(addDays(d, 1), st.tz));
      if (r === null) continue;
      const cf = coefficient(r, st.meanRange);
      if (!peak || cf > peak[1]) peak = [d, cf];
      if (i < 5) rows.push([shortDate(d), `${cf} · ${ft(r)}`]);
    }
    const r0 = dayRange(M.ev, dayStartUtc(today, st.tz), dayStartUtc(addDays(today, 1), st.tz));
    const c0 = r0 !== null ? coefficient(r0, st.meanRange) : null;
    return <Shell title="Tide coefficient today and the coming days" kind={kind} href={st.href} cta={`${st.place} tide chart`}>{two(grid(stationField),
      <Out head={c0 !== null ? `${st.place} today: ${coefficientLabel(c0)}` : st.place} big={c0 !== null ? String(c0) : '…'} rows={rows}
        note={peak ? `Largest range of the next days: ${shortDate(peak[0])} (${peak[1]}). 100 = this station's average range, ${ft(st.meanRange)}.` : undefined} />)}</Shell>;
  }
  if (kind === 'solunar') {
    const i = dayIndex(win.from, today);
    const row = win.sky[i];
    const sky = row ? skyOf(row) : null;
    const s0 = dayStartUtc(today, st.tz), s1 = dayStartUtc(addDays(today, 1), st.tz);
    const ps = sky ? periods(sky).filter((p) => p.center >= s0 && p.center < s1) : [];
    return <Shell title="Today's solunar periods" kind={kind} href={st.href} cta={`${st.place} tides and fishing times`}>{two(grid(stationField),
      <Out head={sky ? `${st.place}, ${phaseName(sky.phase)}` : st.place} big={ps.filter((p) => p.kind === 'major').map((p) => clock(p.center, st.tz)).join(' · ') || '…'}
        rows={ps.map((p) => [`${p.kind === 'major' ? 'Major' : 'Minor'} (${p.anchor})`, `${clock(p.start, st.tz)}–${clock(p.end, st.tz)}`] as [string, string])}
        note="Big figure: the centre of each major period (moon overhead or underfoot)." />)}</Shell>;
  }
  if (kind === 'range') {
    const s2 = stations.find((s) => s.key === key2)!;
    return <Shell title="Compare the tide range of two stations" kind={kind}>{two(grid(stationField, <SelectField key="s2" id="mini-range-2" label="Compared with" value={key2} onChange={setKey2} options={options} />),
      <Out head={`${st.place} vs ${s2.place}, average daily range`} big={`${ft1(st.meanRange)} / ${ft(s2.meanRange)}`}
        rows={[['Ratio', `${ft1(st.meanRange / s2.meanRange)} to 1`], [`Water moves per hour at ${st.place}`, `up to ${ft(st.meanRange * 0.25)}`], [`At ${s2.place}`, `up to ${ft(s2.meanRange * 0.25)}`]]}
        note="Per-hour figure: a quarter of the range, the rule-of-twelfths peak (3 twelfths) in the middle hours." />)}</Shell>;
  }
  if (kind === 'twelfths') {
    const n = Number(c), rng = b - a;
    const tw = [0, 1, 3, 6, 9, 11, 12][n] / 12;
    const cos = (1 - Math.cos((Math.PI * n) / 6)) / 2;
    return <Shell title="Rule of twelfths: height after the low tide" kind={kind}>{two(grid(
      <NumberField key="a" id="mini-tw-low" label="Low tide height" value={a} onChange={setA} unit="ft" decimals={1} min={-5} max={40} />,
      <NumberField key="b" id="mini-tw-high" label="Next high tide height" value={b} onChange={setB} unit="ft" decimals={1} min={-5} max={60} />,
      <SelectField key="c" id="mini-tw-hour" label="Hours after the low" value={c} onChange={setC} options={[1, 2, 3, 4, 5, 6].map((h) => ({ value: String(h), label: `${h} hour${h > 1 ? 's' : ''}` }))} />),
      <Out head={`Height ${n} h after low water`} big={ft(a + rng * tw)}
        rows={[['Rule of twelfths', ft(a + rng * tw)], ['Cosine curve', ft(a + rng * cos)], ['Rise during that hour', ft(rng * ([0, 1, 2, 3, 3, 2, 1][n] / 12))]]}
        note="Assumes a 6-hour rise; real tides take 5 to 7 hours and mixed tides are lopsided." />)}</Shell>;
  }
  if (kind === 'depth') {
    return <Shell title="Water depth = charted depth + tide height" kind={kind}>{two(grid(
      <NumberField key="a" id="mini-dp-chart" label="Depth printed on the chart" value={a} onChange={setA} unit="ft" decimals={1} min={0} max={200} help="Charts show depth at MLLW" />,
      <NumberField key="b" id="mini-dp-tide" label="Predicted tide height" value={b} onChange={setB} unit="ft" decimals={1} min={-5} max={40} help="From the tide table, can be negative" />),
      <Out head="Expected depth at that time" big={ft(a + b)} rows={[['Charted depth (MLLW)', ft(a)], ['Tide above MLLW', ft(b)], ['Change vs the chart', `${b >= 0 ? '+' : ''}${ft1(b)} ft`]]} note="Predicted astronomical tide only: wind and pressure move the water too. Not for navigation." />)}</Shell>;
  }
  // ramp
  return <Shell title="Lowest tide that still floats your boat off the ramp" kind={kind}>{two(grid(
    <NumberField key="a" id="mini-rp-draft" label="Boat draft on the trailer" value={a} onChange={setA} unit="ft" decimals={1} min={0} max={20} help="Hull and lower unit, trimmed up" />,
    <NumberField key="b" id="mini-rp-end" label="Depth at the ramp's end at 0 ft" value={b} onChange={setB} unit="ft" decimals={1} min={0} max={20} help="Ask the marina or sound it at a known low" />,
    <SelectField key="c" id="mini-rp-margin" label="Safety margin" value={c} onChange={setC} options={[{ value: '0.5', label: '0.5 ft' }, { value: '1', label: '1 ft' }, { value: '1.5', label: '1.5 ft' }, { value: '2', label: '2 ft' }]} />),
    <Out head="Launch when the tide is at least" big={ft(Math.max(-5, a + Number(c) - b))} rows={[['Draft plus margin', ft(a + Number(c))], ['Depth already there at 0 ft', ft(b)]]} note="Enter the result in the boat-ramp planner to see the hours that work. Not for navigation." />)}</Shell>;
}
export type { Ev };
