/**
 * The day's tide curve, drawn in SVG from the engine (no chart library). Night is shaded from
 * sunset to sunrise, solunar periods are bands under the axis, each high and low is labelled,
 * and "now" is a vertical rule when the day shown is today.
 */
import { curve, eventsBetween, type Model } from '../../lib/engine/tide';
import { clock, minuteOfDay } from '../../lib/engine/time';
import type { Period } from '../../lib/engine/solunar';
import { ft } from './fmt';

interface Props {
  M: Model; tz: string; start: number; end: number;
  sr?: number | null; ss?: number | null; now?: number | null; periods?: Period[];
  /** Fixed vertical scale (ft) so that seven small charts compare; defaults to the day's own range. */
  yMin?: number; yMax?: number; compact?: boolean; title: string; level?: number | null;
}

const W = 720, PADL = 40, PADR = 10;

export default function Chart({ M, tz, start, end, sr, ss, now, periods = [], yMin, yMax, compact = false, title, level = null }: Props) {
  const H = compact ? 120 : 230, PADT = compact ? 14 : 26, PADB = compact ? 18 : 44;
  const pts = curve(M, start, end, 10);
  if (pts.length < 2) return <p className="text-sm text-navy-600">No prediction for this day.</p>;
  const hs = pts.map((p) => p[1]);
  let lo = yMin ?? Math.min(...hs), hi = yMax ?? Math.max(...hs);
  if (level !== null) { lo = Math.min(lo, level); hi = Math.max(hi, level); }
  const pad = (hi - lo) * 0.12 || 0.5; lo -= pad; hi += pad;
  const span = end - start;
  const x = (t: number) => PADL + ((t - start) / span) * (W - PADL - PADR);
  const y = (h: number) => PADT + (1 - (h - lo) / (hi - lo)) * (H - PADT - PADB);
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${x(p[0]).toFixed(1)},${y(p[1]).toFixed(1)}`).join('');
  const area = `${d}L${x(pts[pts.length - 1][0]).toFixed(1)},${(H - PADB).toFixed(1)}L${x(pts[0][0]).toFixed(1)},${(H - PADB).toFixed(1)}Z`;
  const evs = eventsBetween(M.ev, start, end);
  const step = hi - lo > 12 ? 5 : hi - lo > 5 ? 2 : hi - lo > 2.5 ? 1 : 0.5;
  const ticks: number[] = [];
  for (let v = Math.ceil(lo / step) * step; v <= hi; v += step) ticks.push(Math.round(v * 10) / 10);
  const hours = [0, 6, 12, 18, 24];
  const hourX = (h: number) => x(start + (h * 60 * span) / 1440);
  const night: Array<[number, number]> = [];
  if (sr != null && sr > start) night.push([start, Math.min(sr, end)]);
  if (ss != null && ss < end) night.push([Math.max(ss, start), end]);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={title}>
      <title>{title}</title>
      {night.map(([a, b], i) => <rect key={i} x={x(a)} y={PADT - 6} width={Math.max(0, x(b) - x(a))} height={H - PADB - PADT + 6} fill="#0f172a" opacity="0.06" />)}
      {ticks.map((v) => (
        <g key={v}>
          <line x1={PADL} x2={W - PADR} y1={y(v)} y2={y(v)} stroke={v === 0 ? '#64748b' : '#e2e8f0'} strokeWidth={v === 0 ? 1 : 0.8} />
          {!compact && <text x={PADL - 6} y={y(v) + 4} textAnchor="end" fontSize="11" fill="#475569">{`${v} ft`}</text>}
        </g>
      ))}
      {level !== null && <line x1={PADL} x2={W - PADR} y1={y(level)} y2={y(level)} stroke="#b45309" strokeDasharray="5 4" strokeWidth="1.4" />}
      <path d={area} fill="#0A3161" opacity="0.10" />
      <path d={d} fill="none" stroke="#0A3161" strokeWidth={compact ? 2 : 2.5} />
      {!compact && hours.map((h) => <text key={h} x={hourX(h)} y={H - PADB + 16} textAnchor={h === 0 ? 'start' : h === 24 ? 'end' : 'middle'} fontSize="11" fill="#475569">{h === 0 || h === 24 ? '12 AM' : h === 12 ? '12 PM' : h < 12 ? `${h} AM` : `${h - 12} PM`}</text>)}
      {!compact && periods.map((p, i) => {
        const a = Math.max(start, p.start), b = Math.min(end, p.end);
        if (b <= a) return null;
        return <rect key={i} x={x(a)} y={H - PADB + 24} width={x(b) - x(a)} height={p.kind === 'major' ? 8 : 5} rx="2" fill={p.kind === 'major' ? '#15803d' : '#4d7c0f'} opacity={p.kind === 'major' ? 0.8 : 0.5}><title>{`${p.kind === 'major' ? 'Major' : 'Minor'} solunar period, ${clock(p.start, tz)} to ${clock(p.end, tz)}`}</title></rect>;
      })}
      {evs.map((e) => {
        const ex = x(e[0]), ey = y(e[1]);
        const above = e[2] === 1;
        const anchor = ex < PADL + 40 ? 'start' : ex > W - 60 ? 'end' : 'middle';
        return (
          <g key={e[0]}>
            <circle cx={ex} cy={ey} r={compact ? 2.5 : 3.5} fill={above ? '#0A3161' : '#ffffff'} stroke="#0A3161" strokeWidth="1.5" />
            {!compact && <text x={ex} y={above ? ey - 9 : ey + 17} textAnchor={anchor} fontSize="11.5" fontWeight="600" fill="#0f172a">{`${clock(e[0], tz)} · ${ft(e[1])}`}</text>}
          </g>
        );
      })}
      {now != null && now >= start && now <= end && <line x1={x(now)} x2={x(now)} y1={PADT - 6} y2={H - PADB} stroke="#b91c1c" strokeWidth="1.5" />}
      <text x={W - PADR} y={11} textAnchor="end" fontSize="10.5" fill="#475569">{compact ? '' : `feet above MLLW · ${minuteOfDay(start, tz) === 0 ? 'local time' : ''}`}</text>
    </svg>
  );
}
