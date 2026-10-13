/**
 * State shared by the tide islands: the chosen station, its predictions and the current minute.
 * First render = the build's slice and the build minute, so the HTML served is the HTML hydrated
 * (RECETTE §17.5); the real clock and, when needed, the full prediction file come after mount.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { model } from '../../lib/engine/tide';
import { skyOf } from '../../lib/engine/solunar';
import { dayIndex, localDate, addDays } from '../../lib/engine/time';
import { loadFull } from '../../lib/client/load';
import type { Lite, Win } from '../../lib/client/types';

export function useStation(stations: Lite[], initialKey: string, initialWin: Win, buildMin: number) {
  const [pair, setPair] = useState<{ key: string; win: Win; full: boolean }>({ key: initialKey, win: initialWin, full: false });
  const [pending, setPending] = useState(initialKey);
  const [now, setNow] = useState(buildMin);
  const [error, setError] = useState('');
  useEffect(() => {
    setNow(Math.floor(Date.now() / 60000));
    const id = setInterval(() => setNow(Math.floor(Date.now() / 60000)), 60000);
    return () => clearInterval(id);
  }, []);
  const st = stations.find((s) => s.key === pair.key)!;
  const M = useMemo(() => model(pair.win.events, pair.win.hourly), [pair.win]);
  const today = localDate(now, st.tz);
  const has = useCallback((iso: string) => { const i = dayIndex(pair.win.from, iso); return i >= 0 && i < pair.win.sky.length; }, [pair.win]);
  const loadKey = useCallback((k: string) => {
    setPending(k); setError('');
    loadFull(k).then((w) => setPair({ key: k, win: w, full: true })).catch(() => setError('The predictions for this station could not be loaded. Check your connection and try again.'));
  }, []);
  /** Make sure `iso` (and the days after it) are covered; loads the full file if not. */
  const ensure = useCallback((iso: string, extraDays = 0) => {
    if (pair.full) return;
    if (!has(iso) || !has(addDays(iso, extraDays))) loadKey(pair.key);
  }, [pair.full, pair.key, has, loadKey]);
  useEffect(() => { ensure(today, 7); }, [today, ensure]);
  const skyFor = useCallback((iso: string) => { const i = dayIndex(pair.win.from, iso); const r = pair.win.sky[i]; return r ? skyOf(r) : null; }, [pair.win]);
  const lastDay = addDays(pair.win.from, pair.win.sky.length - 1);
  return { st, M, win: pair.win, full: pair.full, now, today, has, ensure, skyFor, choose: loadKey, pending, loading: pending !== pair.key, error, lastDay };
}
