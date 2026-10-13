/**
 * Solunar calendar: two weeks of major and minor periods for a station, each day rated with the
 * rule printed on the method page, next to sunrise, sunset and the tide turns.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { useStation } from './useStation';
import { eventsBetween } from '../../lib/engine/tide';
import { dayStartUtc, addDays, clock, shortDate, longDate } from '../../lib/engine/time';
import { fishWindows, phaseName, dayRating } from '../../lib/engine/solunar';
import { zoneLabel } from './fmt';
import type { Lite, Win } from '../../lib/client/types';

interface Props { stations: Lite[]; initialKey: string; initialWin: Win; buildMin: number; methodHref: string; idPrefix?: string }
const stars = (n: number) => '★'.repeat(n) + '☆'.repeat(4 - n);

export default function SolunarTool({ stations, initialKey, initialWin, buildMin, methodHref, idPrefix = 'so' }: Props) {
  const S = useStation(stations, initialKey, initialWin, buildMin);
  const { st, M, today } = S;
  const [startDay, setStartDay] = useState<string | null>(null);
  const first = startDay ?? today;
  useEffect(() => { S.ensure(first, 13); }, [first]); // eslint-disable-line react-hooks/exhaustive-deps
  const days = useMemo(() => Array.from({ length: 14 }, (_, i) => addDays(first, i)).filter((d) => S.has(d)).map((d) => {
    const s0 = dayStartUtc(d, st.tz), s1 = dayStartUtc(addDays(d, 1), st.tz);
    const turns = eventsBetween(M.ev, s0, s1);
    const sky = S.skyFor(d)!;
    return { d, sky, turns, wins: fishWindows(sky, turns.map((e) => e[0])).filter((p) => p.center >= s0 && p.center < s1), rating: dayRating(sky) };
  }), [first, st, M, S]);
  const d0 = days[0];
  const starts = Array.from({ length: 6 }, (_, i) => addDays(today, i * 14)).map((d, i) => ({ value: d, label: i === 0 ? `From today, ${shortDate(d)}` : `From ${shortDate(d)}` }));
  if (!starts.some((o) => o.value === first)) starts.unshift({ value: first, label: `From ${shortDate(first)}` });
  const best = d0 ? [...d0.wins].sort((a, b) => Number(b.atLight) + Number(b.nearTurn) + (b.kind === 'major' ? 1 : 0) - (Number(a.atLight) + Number(a.nearTurn) + (a.kind === 'major' ? 1 : 0)))[0] : null;
  return (
    <div className="rechner rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <form onSubmit={(e) => e.preventDefault()} className="grid min-w-0 grid-cols-1 content-start gap-x-4 gap-y-3 sm:grid-cols-2">
          <SelectField id={`${idPrefix}-station`} label="Station" value={S.pending} onChange={S.choose} options={stations.map((s) => ({ value: s.key, label: `${s.place}, ${s.abbr}` }))} help={`Times in ${zoneLabel(st.tz)}`} />
          <SelectField id={`${idPrefix}-start`} label="Two weeks" value={first} onChange={setStartDay} options={starts} />
        </form>
        <div data-resultat aria-live="polite" className="rounded-lg bg-accent-50 p-4 text-navy-900">
          {d0 ? <>
            <p className="text-sm font-medium text-navy-700">{st.place}, {longDate(d0.d)}</p>
            <p className="mt-1 font-serif text-3xl font-bold" aria-label={`${d0.rating.score} out of 4`}>{stars(d0.rating.score)}</p>
            <p className="text-sm text-navy-700">{phaseName(d0.sky.phase)}, {d0.sky.illum}% lit{d0.rating.reasons.length ? `: ${d0.rating.reasons.join(', ')}` : ''}</p>
            {best && <p className="mt-2 text-sm">Best period: <strong>{best.kind} {clock(best.start, st.tz)}–{clock(best.end, st.tz)}</strong> ({best.anchor}{best.atLight ? ', at first or last light' : ''}{best.nearTurn ? ', near a tide turn' : ''})</p>}
            <ul className="mt-2 space-y-0.5 text-sm tabular-nums">{d0.wins.map((w) => <li key={w.start}>{w.kind === 'major' ? 'Major' : 'Minor'} {clock(w.start, st.tz)}–{clock(w.end, st.tz)} · {w.anchor}</li>)}</ul>
          </> : <p className="text-sm">Loading…</p>}
          <p className="mt-3 text-xs text-navy-600"><a href={methodHref} className="underline">How the rating works</a></p>
        </div>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="journal w-full min-w-[44rem] text-sm">
          <caption className="mb-2 text-left text-sm text-navy-700">Solunar table for {st.place}: major periods are 2 hours around the moon overhead or underfoot, minor periods 1 hour around moonrise or moonset.</caption>
          <thead><tr><th scope="col" className="px-2 py-2 text-left">Day</th><th scope="col" className="px-2 py-2 text-left">Rating</th><th scope="col" className="px-2 py-2 text-left">Major</th><th scope="col" className="px-2 py-2 text-left">Minor</th><th scope="col" className="px-2 py-2 text-left">Sun</th><th scope="col" className="px-2 py-2 text-left">Tide turns</th></tr></thead>
          <tbody>
            {days.map((x) => (
              <tr key={x.d}>
                <td className="border-b border-navy-100 px-2 py-2 font-medium">{shortDate(x.d)}<span className="block text-xs font-normal text-navy-600">{phaseName(x.sky.phase)}</span></td>
                <td className="border-b border-navy-100 px-2 py-2">{stars(x.rating.score)}</td>
                <td className="border-b border-navy-100 px-2 py-2 tabular-nums">{x.wins.filter((w) => w.kind === 'major').map((w) => `${clock(w.start, st.tz)}–${clock(w.end, st.tz)}`).join(', ')}</td>
                <td className="border-b border-navy-100 px-2 py-2 tabular-nums">{x.wins.filter((w) => w.kind === 'minor').map((w) => `${clock(w.start, st.tz)}–${clock(w.end, st.tz)}`).join(', ')}</td>
                <td className="border-b border-navy-100 px-2 py-2 tabular-nums">{x.sky.sr ? clock(x.sky.sr, st.tz) : ''}–{x.sky.ss ? clock(x.sky.ss, st.tz) : ''}</td>
                <td className="border-b border-navy-100 px-2 py-2 tabular-nums">{x.turns.map((e) => `${e[2] ? 'H' : 'L'} ${clock(e[0], st.tz)}`).join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
