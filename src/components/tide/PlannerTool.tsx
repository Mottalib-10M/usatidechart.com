/**
 * Planner pages: pick a station, a water level and a period; the windows come first, then the
 * curve of the day of the first window with the level drawn across it.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import NumberField from '../ui/NumberField';
import Chart from './Chart';
import { useStation } from './useStation';
import { plan } from '../../lib/engine/planner';
import { dayStartUtc, addDays, clock, shortDate, longDate, duration } from '../../lib/engine/time';
import { ft, zoneLabel } from './fmt';
import type { Lite, Win } from '../../lib/client/types';

interface Props { stations: Lite[]; initialKey: string; initialWin: Win; buildMin: number; mode: 'below' | 'above'; methodHref: string; idPrefix?: string }

export default function PlannerTool({ stations, initialKey, initialWin, buildMin, mode, methodHref, idPrefix = 'pl' }: Props) {
  const S = useStation(stations, initialKey, initialWin, buildMin);
  const { st, M, now, today } = S;
  const defLevel = (r: number) => Math.round((mode === 'below' ? r * 0.25 : r * 0.5) * 10) / 10 || (mode === 'below' ? 0.5 : 1);
  const [level, setLevel] = useState(defLevel(st.meanRange));
  const [span, setSpan] = useState('7');
  const [daylight, setDaylight] = useState('1');
  const [minLen, setMinLen] = useState('60');
  const [pick, setPick] = useState(0);
  useEffect(() => { setLevel(defLevel(st.meanRange)); setPick(0); }, [st.key]); // eslint-disable-line react-hooks/exhaustive-deps
  const nDays = Number(span);
  useEffect(() => { S.ensure(today, nDays); }, [nDays, today]); // eslint-disable-line react-hooks/exhaustive-deps
  const windows = useMemo(() => {
    const days = Array.from({ length: nDays }, (_, i) => addDays(today, i)).filter((d) => S.has(d));
    return plan(M, days, st.tz, S.skyFor, { level, mode, daylight: daylight === '1', minMinutes: Number(minLen) }).filter((w) => w.end > now);
  }, [nDays, today, M, st.tz, S, level, mode, daylight, minLen, now]);
  const total = windows.reduce((a, w) => a + w.end - Math.max(w.start, now), 0);
  const w0 = windows[Math.min(pick, Math.max(0, windows.length - 1))];
  const showDay = w0 ? w0.date : today;
  const start = dayStartUtc(showDay, st.tz), end = dayStartUtc(addDays(showDay, 1), st.tz);
  const sky = S.skyFor(showDay);
  return (
    <div className="rechner rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <form onSubmit={(e) => e.preventDefault()} className="grid min-w-0 grid-cols-1 content-start gap-x-4 gap-y-3 sm:grid-cols-2">
          <SelectField id={`${idPrefix}-station`} label="Station" value={S.pending} onChange={S.choose} options={stations.map((s) => ({ value: s.key, label: `${s.place}, ${s.abbr}` }))} help={`Times in ${zoneLabel(st.tz)}`} />
          <NumberField id={`${idPrefix}-level`} label={mode === 'below' ? 'Water below' : 'Water at least'} value={level} onChange={setLevel} unit="ft" decimals={1} min={-5} max={40} help={`Above MLLW · average range here ${ft(st.meanRange)}`} />
          <SelectField id={`${idPrefix}-span`} label="Over the next" value={span} onChange={setSpan} options={[{ value: '3', label: '3 days' }, { value: '7', label: '7 days' }, { value: '14', label: '14 days' }, { value: '30', label: '30 days' }, { value: '60', label: '60 days' }]} />
          <SelectField id={`${idPrefix}-light`} label="Daylight only" value={daylight} onChange={setDaylight} options={[{ value: '1', label: 'Yes, sunrise to sunset' }, { value: '0', label: 'No, day and night' }]} />
          <SelectField id={`${idPrefix}-min`} label="Shortest useful window" value={minLen} onChange={setMinLen} options={[{ value: '30', label: '30 minutes' }, { value: '60', label: '1 hour' }, { value: '120', label: '2 hours' }, { value: '180', label: '3 hours' }]} />
        </form>
        <div data-resultat aria-live="polite" className="rounded-lg bg-accent-50 p-4 text-navy-900">
          <p className="text-sm font-medium text-navy-700">{st.place}, {st.abbr}: water {mode === 'below' ? 'below' : 'above'} {ft(level)}</p>
          <p className="mt-1 font-serif text-3xl font-bold tabular-nums">{windows.length} window{windows.length === 1 ? '' : 's'}</p>
          <p className="text-sm text-navy-700">{duration(total)} in all over {nDays} days{daylight === '1' ? ', daylight only' : ''}</p>
          {S.loading && <p className="mt-2 text-sm">Loading more days…</p>}
          <ol className="mt-3 max-h-72 space-y-1 overflow-y-auto text-sm tabular-nums">
            {windows.slice(0, 40).map((w, i) => (
              <li key={w.start}><button type="button" onClick={() => setPick(i)} className={`w-full rounded px-2 py-1 text-left ${i === pick ? 'bg-white font-semibold' : 'hover:bg-white'}`}>{shortDate(w.date)}, {clock(Math.max(w.start, now), st.tz)}–{clock(w.end, st.tz)} <span className="text-navy-600">({duration(w.end - Math.max(w.start, now))}, {mode === 'below' ? 'low' : 'high'} {ft(w.extreme)})</span></button></li>
            ))}
          </ol>
          {windows.length === 0 && <p className="mt-2 text-sm">No window long enough. Try a level {mode === 'below' ? 'higher' : 'lower'} than {ft(level)}, or a longer period.</p>}
          <p className="mt-3 text-xs text-navy-600"><a href={methodHref} className="underline">How windows are computed</a> · Not for navigation</p>
        </div>
      </div>
      <div className="mt-4">
        <Chart M={M} tz={st.tz} start={start} end={end} sr={sky?.sr} ss={sky?.ss} now={showDay === today ? now : null} level={level} title={`${st.place} tide on ${longDate(showDay)} with the ${ft(level)} level`} />
        <p className="mt-1 text-xs text-navy-600">{longDate(showDay)}. The dashed line is your level; shaded hours are night.</p>
      </div>
    </div>
  );
}
