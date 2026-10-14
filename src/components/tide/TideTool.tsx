/**
 * The tide tool of a station page (fixed station) and of the home and state pages (station
 * picker): the day's curve, highs and lows, tide coefficient, sun, moon and solunar periods, the
 * next seven days, and a planner ("when can I walk the beach / launch the boat?").
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import NumberField from '../ui/NumberField';
import Chart from './Chart';
import { useStation } from './useStation';
import { eventsBetween, stateAt, dayRange, coefficient, coefficientLabel } from '../../lib/engine/tide';
import { dayStartUtc, addDays, clock, shortDate, longDate, duration } from '../../lib/engine/time';
import { periods, phaseName, dayRating } from '../../lib/engine/solunar';
import { plan } from '../../lib/engine/planner';
import { ft, ft1, zoneLabel, distMi, miles } from './fmt';
import type { Lite, Win } from '../../lib/client/types';

interface Props {
  stations: Lite[]; initialKey: string; initialWin: Win; buildMin: number;
  /** Show the station picker (home, state pages). */
  picker?: boolean;
  /** Restrict the picker to these keys (a state page); all stations otherwise. */
  only?: string[];
  methodHref: string;
  idPrefix?: string;
  /** Show the planner block (station pages). */
  planner?: boolean;
}

const stars = (n: number) => '★'.repeat(n) + '☆'.repeat(4 - n);

export default function TideTool({ stations, initialKey, initialWin, buildMin, picker = false, only, methodHref, idPrefix = 'tt', planner = true }: Props) {
  const S = useStation(stations, initialKey, initialWin, buildMin);
  const { st, M, now, today } = S;
  const [day, setDay] = useState<string | null>(null);
  const sel = day ?? today;
  const [act, setAct] = useState<'walk' | 'boat'>('walk');
  const [level, setLevel] = useState(1);
  const [span, setSpan] = useState('7');
  const [daylight, setDaylight] = useState('1');
  const [geoMsg, setGeoMsg] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => { // a shared link "#day=2026-10-20" opens that day (after mount only)
    const m = /day=(\d{4}-\d{2}-\d{2})/.exec(location.hash);
    if (m) setDay(m[1]);
  }, []);
  useEffect(() => { S.ensure(sel, 1); }, [sel]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { setLevel(act === 'walk' ? Math.round(st.meanRange * 0.25 * 10) / 10 || 0.5 : Math.round(st.meanRange * 0.5 * 10) / 10 || 1); }, [act, st.key, st.meanRange]);

  const list = (only ? stations.filter((s) => only.includes(s.key)) : stations);
  const stationOptions = list.map((s) => ({ value: s.key, label: `${s.place}, ${s.abbr}` }));
  const dayOptions = Array.from({ length: 31 }, (_, i) => { const d = addDays(today, i); return { value: d, label: i === 0 ? `Today, ${shortDate(d)}` : i === 1 ? `Tomorrow, ${shortDate(d)}` : shortDate(d) }; });
  if (!dayOptions.some((o) => o.value === sel)) dayOptions.unshift({ value: sel, label: shortDate(sel) });

  const start = dayStartUtc(sel, st.tz), end = dayStartUtc(addDays(sel, 1), st.tz);
  const covered = S.has(sel);
  const evs = covered ? eventsBetween(M.ev, start, end) : [];
  const sky = S.skyFor(sel);
  const per = sky ? periods(sky).filter((p) => p.center >= start && p.center < end) : [];
  const isToday = sel === today;
  const state = isToday ? stateAt(M, now) : null;
  const range = covered ? dayRange(M.ev, start, end) : null;
  const coef = range !== null ? coefficient(range, st.meanRange) : null;
  const rating = sky ? dayRating(sky) : null;
  const nextEv = state ? state.next : evs[0];

  const week = useMemo(() => Array.from({ length: 7 }, (_, i) => {
    const d = addDays(today, i);
    if (!S.has(d)) return null;
    const s0 = dayStartUtc(d, st.tz), s1 = dayStartUtc(addDays(d, 1), st.tz);
    const e = eventsBetween(M.ev, s0, s1);
    const r = dayRange(M.ev, s0, s1);
    const k = S.skyFor(d);
    return { d, highs: e.filter((x) => x[2] === 1), lows: e.filter((x) => x[2] === 0), coef: r !== null ? coefficient(r, st.meanRange) : null, sky: k, rating: k ? dayRating(k).score : null };
  }).filter((x): x is NonNullable<typeof x> => x !== null), [today, M, st, S]);

  const nDays = Number(span);
  useEffect(() => { if (planner) S.ensure(today, nDays); }, [nDays, today, planner]); // eslint-disable-line react-hooks/exhaustive-deps
  const windows = useMemo(() => {
    if (!planner) return [];
    const days = Array.from({ length: nDays }, (_, i) => addDays(today, i)).filter((d) => S.has(d));
    return plan(M, days, st.tz, S.skyFor, { level, mode: act === 'walk' ? 'below' : 'above', daylight: daylight === '1', minMinutes: 30 }).filter((w) => w.end > now);
  }, [planner, nDays, today, M, st.tz, S, level, act, daylight, now]);

  const locate = () => {
    if (!navigator.geolocation) { setGeoMsg('Your browser does not share its location.'); return; }
    setGeoMsg('Finding the nearest station…');
    navigator.geolocation.getCurrentPosition((p) => {
      const here = { lat: p.coords.latitude, lng: p.coords.longitude };
      const best = [...list].sort((a, b) => distMi(here, a) - distMi(here, b))[0];
      setGeoMsg(`Nearest station: ${best.place}, ${miles(distMi(here, best))} away. Your position stays on your device.`);
      S.choose(best.key);
    }, () => setGeoMsg('Location refused or unavailable: pick a station in the list.'), { timeout: 10000 });
  };
  const copy = () => {
    const url = `${location.origin}${st.href}#day=${sel}`;
    navigator.clipboard?.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const title = `${st.place} tide chart for ${longDate(sel)}`;
  return (
    <div className="rechner rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0">
          <form onSubmit={(e) => e.preventDefault()} className={`grid content-start gap-x-4 gap-y-3 ${picker ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
            {picker && <SelectField id={`${idPrefix}-station`} label="Station" value={S.pending} onChange={(k) => { setDay(null); S.choose(k); }} options={stationOptions} help={`${list.length} beaches, inlets and harbors`} />}
            <SelectField id={`${idPrefix}-day`} label="Day" value={sel} onChange={setDay} options={dayOptions} help={`Times in ${zoneLabel(st.tz)}`} />
          </form>
          {picker && <p className="mt-2 text-sm"><button type="button" onClick={locate} className="font-medium text-accent-700 underline underline-offset-2 hover:text-accent-900">Use my location</button>{geoMsg && <span className="ml-2 text-navy-600">{geoMsg}</span>}</p>}
          {S.error && <p role="alert" className="mt-2 text-sm text-amber-800">{S.error}</p>}
          <div className={`mt-4 ${S.loading ? 'opacity-50' : ''}`}>
            {covered ? <Chart M={M} tz={st.tz} start={start} end={end} sr={sky?.sr} ss={sky?.ss} now={isToday ? now : null} periods={per} title={title} /> : <p className="py-10 text-center text-sm text-navy-600">Loading the predictions for {longDate(sel)}…</p>}
            <p className="mt-1 text-xs text-navy-600">Shaded: night. Green bands: solunar periods (thick = major, thin = minor). Heights in feet above Mean Lower Low Water, the zero of NOAA charts.</p>
          </div>
        </div>
        <div data-resultat aria-live="polite" className="rounded-lg bg-accent-50 p-4 text-navy-900">
          <p className="text-sm font-medium text-navy-700">{st.place}, {st.abbr} · {longDate(sel)}</p>
          {state ? (
            <>
              <p className="mt-1 text-sm text-navy-700">Tide {state.rising ? 'rising' : 'falling'}, {ft(state.height)} now</p>
              <p className="mt-2 font-serif text-3xl font-bold leading-tight tabular-nums">{state.next[2] ? 'High' : 'Low'} {clock(state.next[0], st.tz)}</p>
              <p className="text-sm tabular-nums text-navy-700">{ft(state.next[1])} · in {duration(state.minutesToNext)}</p>
            </>
          ) : nextEv ? (
            <>
              <p className="mt-2 font-serif text-3xl font-bold leading-tight tabular-nums">{nextEv[2] ? 'High' : 'Low'} {clock(nextEv[0], st.tz)}</p>
              <p className="text-sm tabular-nums text-navy-700">{ft(nextEv[1])} · first tide of the day</p>
            </>
          ) : <p className="mt-2 text-sm">Loading…</p>}
          <table className="mt-3 w-full text-sm tabular-nums"><tbody className="divide-y divide-accent-100">
            {evs.map((e) => <tr key={e[0]}><td className="py-1 pr-2 font-medium">{e[2] ? 'High' : 'Low'}</td><td className="py-1 pr-2">{clock(e[0], st.tz)}</td><td className="py-1 text-right">{ft(e[1])}</td></tr>)}
          </tbody></table>
          {coef !== null && <p className="mt-3 text-sm">Tide coefficient <strong>{coef}</strong> ({coefficientLabel(coef)}), range {ft(range!)}</p>}
          {sky && <p className="mt-1 text-sm">Sunrise {sky.sr ? clock(sky.sr, st.tz) : 'none'} · sunset {sky.ss ? clock(sky.ss, st.tz) : 'none'}</p>}
          {sky && <p className="mt-1 text-sm">{phaseName(sky.phase)}, {sky.illum}% lit · fishing day <span aria-label={`${rating!.score} out of 4`}>{stars(rating!.score)}</span></p>}
          {per.length > 0 && <p className="mt-1 text-sm">Solunar: {per.map((p) => `${p.kind === 'major' ? 'major' : 'minor'} ${clock(p.start, st.tz)}–${clock(p.end, st.tz)}`).join(', ')}</p>}
          <p className="mt-3 text-xs text-navy-600"><a href={methodHref} className="underline">How these figures are made</a> · <button type="button" onClick={copy} className="underline">{copied ? 'Link copied' : 'Copy link to this day'}</button></p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-serif text-xl font-bold text-navy-900">{st.place} tide table, next 7 days</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="journal w-full min-w-[40rem] text-sm">
            <thead><tr><th scope="col" className="px-2 py-2 text-left">Day</th><th scope="col" className="px-2 py-2 text-left">High tides</th><th scope="col" className="px-2 py-2 text-left">Low tides</th><th scope="col" className="px-2 py-2 text-right">Coef.</th><th scope="col" className="px-2 py-2 text-left">Sun</th><th scope="col" className="px-2 py-2 text-left">Moon</th></tr></thead>
            <tbody>
              {week.map((w) => (
                <tr key={w.d} className={w.d === sel ? 'bg-accent-50' : ''}>
                  <td className="border-b border-navy-100 px-2 py-2"><button type="button" onClick={() => setDay(w.d)} className="font-medium text-accent-700 underline-offset-2 hover:underline">{shortDate(w.d)}</button></td>
                  <td className="border-b border-navy-100 px-2 py-2 tabular-nums">{w.highs.map((e) => `${clock(e[0], st.tz)} ${ft(e[1])}`).join(' · ')}</td>
                  <td className="border-b border-navy-100 px-2 py-2 tabular-nums">{w.lows.map((e) => `${clock(e[0], st.tz)} ${ft(e[1])}`).join(' · ')}</td>
                  <td className="border-b border-navy-100 px-2 py-2 text-right tabular-nums">{w.coef ?? ''}</td>
                  <td className="border-b border-navy-100 px-2 py-2 tabular-nums">{w.sky?.sr ? `${clock(w.sky.sr, st.tz)}–${w.sky.ss ? clock(w.sky.ss, st.tz) : ''}` : ''}</td>
                  <td className="border-b border-navy-100 px-2 py-2">{w.sky ? `${phaseName(w.sky.phase)} ${stars(w.rating!)}` : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {planner && (
        <div className="mt-6 border-t border-navy-200 pt-5">
          <h2 className="font-serif text-xl font-bold text-navy-900">Plan around the tide at {st.place}</h2>
          <form onSubmit={(e) => e.preventDefault()} className="mt-3 grid content-start grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
            <SelectField id={`${idPrefix}-act`} label="I want to" value={act} onChange={(v) => setAct(v as 'walk' | 'boat')} options={[{ value: 'walk', label: 'Walk the beach at low water' }, { value: 'boat', label: 'Launch or retrieve a boat' }]} />
            <NumberField id={`${idPrefix}-level`} label={act === 'walk' ? 'Water below' : 'Water above'} value={level} onChange={setLevel} unit="ft" decimals={1} min={-5} max={40} help="Height above MLLW" />
            <SelectField id={`${idPrefix}-span`} label="Over the next" value={span} onChange={setSpan} options={[{ value: '3', label: '3 days' }, { value: '7', label: '7 days' }, { value: '14', label: '14 days' }, { value: '30', label: '30 days' }]} />
            <SelectField id={`${idPrefix}-light`} label="Daylight only" value={daylight} onChange={setDaylight} options={[{ value: '1', label: 'Yes' }, { value: '0', label: 'No' }]} />
          </form>
          <div className="mt-4" aria-live="polite">
            {windows.length === 0
              ? <p className="text-sm text-navy-700">No window of 30 minutes or more {act === 'walk' ? 'below' : 'above'} {ft(level)} over the next {nDays} days{daylight === '1' ? ' in daylight' : ''}. Try a {act === 'walk' ? 'higher' : 'lower'} level.</p>
              : <ul className="divide-y divide-navy-100 text-sm tabular-nums">
                  {windows.slice(0, 12).map((w) => <li key={w.start} className="flex flex-wrap justify-between gap-x-4 py-1.5"><span className="font-medium text-navy-900">{shortDate(w.date)}, {clock(Math.max(w.start, now), st.tz)} to {clock(w.end, st.tz)}</span><span className="text-navy-700">{duration(w.end - Math.max(w.start, now))} · {act === 'walk' ? 'lowest' : 'highest'} {ft(w.extreme)} at {clock(w.extremeAt, st.tz)}</span></li>)}
                </ul>}
            <p className="mt-2 text-xs text-navy-600">{act === 'walk' ? 'A falling tide uncovers sand bars and tide pools first; plan to be back before the water rises past the level you chose.' : 'Your ramp’s usable depth depends on its slope and on silting: check the level against a low tide you know.'} Not for navigation.</p>
          </div>
        </div>
      )}
      <p className="mt-4 text-xs text-navy-600">Station {st.noaaName} (NOAA {st.id}). Predicted astronomical tide: wind, river flow and storms can move the real water by a foot or more. {ft1(st.meanRange)} ft is the average daily range here.</p>
    </div>
  );
}
