/**
 * Tides near me: the visitor's position (kept in the browser) or a state, then the closest
 * stations with their next high and low. The next tides of every station for the days after the
 * build are part of the page; later days load from the station files.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { clock, shortDate, localDate, duration } from '../../lib/engine/time';
import { loadFull } from '../../lib/client/load';
import { ft, distMi, miles, zoneLabel } from './fmt';
import type { Ev } from '../../lib/engine/tide';
import type { Lite } from '../../lib/client/types';

interface Props { stations: Lite[]; next: Record<string, Ev[]>; buildMin: number; states: Array<{ value: string; label: string }>; initialState: string; idPrefix?: string }

export default function NearTool({ stations, next, buildMin, states, initialState, idPrefix = 'nr' }: Props) {
  const [now, setNow] = useState(buildMin);
  const [state, setState] = useState(initialState);
  const [here, setHere] = useState<{ lat: number; lng: number } | null>(null);
  const [msg, setMsg] = useState('');
  const [extra, setExtra] = useState<Record<string, Ev[]>>({});
  useEffect(() => { setNow(Math.floor(Date.now() / 60000)); }, []);
  const shown = useMemo(() => {
    if (here) return [...stations].map((s) => ({ s, d: distMi(here, s) })).sort((a, b) => a.d - b.d).slice(0, 8);
    return stations.filter((s) => s.state === state).map((s) => ({ s, d: null as number | null }));
  }, [here, state, stations]);
  const evOf = (k: string) => extra[k] ?? next[k] ?? [];
  useEffect(() => { // stale page: load the station files whose next tides are not in the page
    for (const { s } of shown) if (!evOf(s.key).some((e) => e[0] > now + 720) && !extra[s.key]) loadFull(s.key).then((w) => setExtra((o) => ({ ...o, [s.key]: w.events }))).catch(() => {});
  }, [shown, now]); // eslint-disable-line react-hooks/exhaustive-deps
  const locate = () => {
    if (!navigator.geolocation) { setMsg('Your browser does not share its location: pick a state.'); return; }
    setMsg('Locating…');
    navigator.geolocation.getCurrentPosition((p) => { setHere({ lat: p.coords.latitude, lng: p.coords.longitude }); setMsg('Sorted by distance from you. Your position is not sent anywhere.'); }, () => setMsg('Location refused or unavailable: pick a state instead.'), { timeout: 10000 });
  };
  return (
    <div className="rechner rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
      <form onSubmit={(e) => e.preventDefault()} className="grid content-start grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-[minmax(0,1fr)_auto]">
        <SelectField id={`${idPrefix}-state`} label="State" value={state} onChange={(v) => { setHere(null); setMsg(''); setState(v); }} options={states} />
        <div className="grid grid-rows-subgrid row-span-3 content-start"><span className="mb-1 block text-sm font-medium text-navy-700">Or</span><button type="button" onClick={locate} className="h-12 rounded-lg bg-accent-500 px-5 font-semibold text-white hover:bg-accent-700">Use my location</button></div>
      </form>
      {msg && <p className="mt-2 text-sm text-navy-700">{msg}</p>}
      <div data-resultat aria-live="polite" className="mt-4 overflow-x-auto">
        <table className="journal w-full min-w-[36rem] text-sm">
          <thead><tr><th scope="col" className="px-2 py-2 text-left">Station</th><th scope="col" className="px-2 py-2 text-left">Next high</th><th scope="col" className="px-2 py-2 text-left">Next low</th>{here && <th scope="col" className="px-2 py-2 text-right">Distance</th>}</tr></thead>
          <tbody>
            {shown.map(({ s, d }) => {
              const ev = evOf(s.key).filter((e) => e[0] > now);
              const h = ev.find((e) => e[2] === 1), l = ev.find((e) => e[2] === 0);
              const cell = (e?: Ev) => e ? <>{localDate(e[0], s.tz) === localDate(now, s.tz) ? '' : `${shortDate(localDate(e[0], s.tz))} `}{clock(e[0], s.tz)} · {ft(e[1])}<span className="block text-xs text-navy-600">in {duration(e[0] - now)}</span></> : '…';
              return (
                <tr key={s.key}>
                  <td className="border-b border-navy-100 px-2 py-2"><a href={s.href} className="font-medium text-accent-700 underline-offset-2 hover:underline">{s.place}, {s.abbr}</a><span className="block text-xs text-navy-600">{zoneLabel(s.tz)}</span></td>
                  <td className="border-b border-navy-100 px-2 py-2 tabular-nums">{cell(h)}</td>
                  <td className="border-b border-navy-100 px-2 py-2 tabular-nums">{cell(l)}</td>
                  {here && <td className="border-b border-navy-100 px-2 py-2 text-right tabular-nums">{d !== null ? miles(d) : ''}</td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
