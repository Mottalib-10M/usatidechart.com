/**
 * The generated part of a station page: title, description, the folded answer, the data
 * sections and three questions, all written from the station's own figures. The sentence
 * chosen depends on the data (tide type, range, negative lows, subordinate or not), so two
 * stations of different character read differently; these blocks are marked `data-chrome`
 * because their wording repeats from station to station (RECETTE §6.4). The prose that makes
 * each page unique is the hand-written file of src/content/stations/.
 */
import { station, STATE_INFO, stationsIn, DATA_META, type Station } from './stations';
import { ft, ft1, int } from '../components/tide/fmt';
import { fullDate, clock, localDate, monthName } from './engine/time';
import type { FAQ } from './page-types';

const zone: Record<string, string> = { 'America/New_York': 'Eastern Time', 'America/Chicago': 'Central Time', 'America/Los_Angeles': 'Pacific Time', 'America/Anchorage': 'Alaska Time', 'Pacific/Honolulu': 'Hawaii-Aleutian Standard Time' };
function dupes(): Set<string> {
  const all = (Object.keys(STATE_INFO) as string[]).flatMap((st) => stationsIn(st).map((s) => s.place));
  return new Set(all.filter((p, i) => all.indexOf(p) !== i));
}
const DUP = dupes();
export const pname = (s: Station) => (DUP.has(s.place) ? `${s.place} ${STATE_INFO[s.state].abbr}` : s.place);
export const pnameComma = (s: Station) => (DUP.has(s.place) ? `${s.place}, ${STATE_INFO[s.state].abbr}` : s.place);

const pick = (cands: string[], lo: number, hi: number) => cands.find((c) => c.length >= lo && c.length <= hi) ?? null;

export function stationTitle(s: Station): string {
  const p = pname(s);
  const t = pick([
    `${p} Tides 2026: Tide Chart, High and Low Tide Times`,
    `${p} Tides 2026: Tide Chart and High and Low Tides`,
    `${p} Tides 2026: Tide Chart, Highs, Lows, Fishing`,
    `${p} Tides 2026: Today's Tide Chart and Times`,
    `${p} Tides 2026: Tide Chart, Highs and Lows`,
    `${p} Tides 2026: Tide Chart and Times`,
    `${p} Tides 2026: High and Low Tide Times`,
    `${p} Tides 2026: Tide Chart`,
  ], 50, 60);
  if (!t) throw new Error(`No title fits for ${s.key}: set "title" in its content file`);
  return t;
}

export function stationDescription(s: Station): string {
  const p = pname(s), r = ft1(s.stats.meanRange);
  const t = pick([
    `${p} tide chart for today and 7 days: high and low tide times, tide coefficient, sunrise, moon and solunar fishing times. Average range ${r} ft, 2026.`,
    `${p} tide chart for today and 7 days: high and low tides, coefficient, sunrise, moon and solunar fishing times. Average range ${r} ft in 2026.`,
    `${p} tide chart for today and 7 days: high and low tides, coefficient, sun, moon and solunar fishing times. Average range ${r} ft, 2026.`,
    `${p} tide chart for 2026: today and 7 days of high and low tide times, coefficient, sunrise and solunar periods. Average range ${r} ft.`,
    `${p} tide chart 2026: today and 7 days of high and low tides, coefficient, sun and solunar times. Average range ${r} ft.`,
    `${p} tide chart today and for 7 days: high and low tide times, coefficient, sunrise and solunar fishing times. Average range ${r} ft in 2026.`,
    `${p} tides: today's tide chart, 7-day high and low tide times, coefficient, sunrise and solunar times. Average range ${r} ft in 2026.`,
    `${p} tides today: tide chart, 7-day high and low times, coefficient, sun, moon and fishing times. Average range ${r} ft, 2026 data.`,
    `${p} tides: chart, 7-day highs and lows, coefficient, sun and solunar times. Average range ${r} ft, 2026 NOAA data.`,
  ], 150, 160);
  if (!t) throw new Error(`No description fits for ${s.key}: set "description" in its content file`);
  return t;
}

/** The folded answer: ONE paragraph of 120 words or more (RECETTE §21), chosen by the data. */
export function stationResume(s: Station): string {
  const st = s.stats, p = pnameComma(s);
  const parts: string[] = [];
  parts.push(`Tide times for ${p} come from the National Ocean Service prediction for station ${s.id}, ${s.noaaName}${s.type === 'S' && s.referenceName ? `, a subordinate station whose highs and lows NOAA corrects from ${s.referenceName}` : ''}.`);
  if (st.tideType === 'diurnal') parts.push(`The tide here is mostly diurnal: on ${int(st.oneHighShare * 100)}% of days there is a single high and a single low, and the water rises or falls for hours at a time with an average daily range of only ${ft(st.meanRange)}.`);
  else if (st.tideType === 'mixed') parts.push(`The tide here is mixed: two highs and two lows most days, but of unequal size, the two highs of a day differing by ${ft(st.highInequality)} on average, for an average daily range of ${ft(st.meanRange)} between the higher high and the lower low.`);
  else parts.push(`The tide here is semidiurnal: two highs and two lows of similar height every day, about six hours and a quarter apart, with an average daily range of ${ft(st.meanRange)}.`);
  parts.push(`Around the new and full moon the range grows to about ${ft(st.springRange)} on one day in ten, and at the quarter moons it shrinks to ${ft(st.neapRange)}.`);
  parts.push(`Heights are in feet above Mean Lower Low Water, the zero of nautical charts, so a negative number is water below that zero: ${st.negativeLowDays} of the ${st.days} days from ${fullDate(DATA_META.begin)} to ${fullDate(DATA_META.end)} have one, down to ${ft(st.minLow.h)} on ${fullDate(st.minLow.date)}.`);
  parts.push(`The highest predicted tide of that period is ${ft(st.maxHigh.h)} on ${fullDate(st.maxHigh.date)}. Clock times are ${zone[s.tz]}${s.tz === 'Pacific/Honolulu' ? ', which has no daylight saving time' : ', daylight saving time included'}.`);
  return parts.join(' ');
}

/** Generated questions (3), 40 to 90 words each, every answer from the station's figures. */
export function stationFaqs(s: Station): FAQ[] {
  const st = s.stats, p = pnameComma(s), out: FAQ[] = [];
  const d = s.datums;
  out.push({ q: `How high does the tide get at ${p}?`, a: `The highest tide predicted at ${s.noaaName} between ${monthName(DATA_META.begin)} and ${monthName(DATA_META.end)} is ${ft(st.maxHigh.h)} above MLLW, on ${fullDate(st.maxHigh.date)} at ${clock(st.maxHigh.t, s.tz)}. ${d?.MHHW !== undefined ? `An ordinary higher high reaches ${ft(d.MHHW)} (the station's MHHW datum).` : `An ordinary high tide reaches about ${ft(st.meanHigh)}.`} Onshore wind or a storm surge adds water on top of the prediction, so flooding can start lower than the table suggests.` });
  out.push({ q: `Does ${p} get negative low tides?`, a: st.negativeLowDays > 0
    ? `Yes. On ${st.negativeLowDays} of the ${st.days} days of the prediction period at least one low falls below 0 ft, the Mean Lower Low Water datum. The lowest is ${ft(st.minLow.h)} on ${fullDate(st.minLow.date)} at ${clock(st.minLow.t, s.tz)}. Negative lows bunch around the new and full moon and uncover the most beach, flats and tide pools.`
    : `No low tide falls below 0 ft (Mean Lower Low Water) during the prediction period at ${s.noaaName}; the lowest is ${ft(st.minLow.h)} on ${fullDate(st.minLow.date)}. Lows are lowest around the new and full moon, when the range is largest.` });
  if (st.tideType === 'diurnal') out.push({ q: `Why does ${p} often have only one high tide a day?`, a: `Along this part of the Gulf of Mexico the daily (diurnal) tidal constituents dominate the twice-daily ones, so on ${int(st.oneHighShare * 100)}% of days the water makes a single rise and a single fall. When the moon is far north or south of the equator the single tide is strongest; near the equator crossings the tide weakens and two small highs can appear.` });
  else if (st.tideType === 'mixed') out.push({ q: `Why are the two high tides at ${p} different heights?`, a: `This coast has a mixed tide: the daily and twice-daily constituents are of comparable size, so one high of the day stands taller than the other, by ${ft(st.highInequality)} on average here, and the two lows differ by ${ft(st.lowInequality)}. The gap is largest when the moon is far from the equator, and it is why charts list a higher high and a lower low.` });
  else out.push({ q: `How long is it between high and low tide at ${p}?`, a: `About six hours and twelve minutes on average, because the tide here is semidiurnal: two highs and two lows in each lunar day of 24 hours 50 minutes. That is why each tide comes roughly 50 minutes later than the day before. The water moves fastest in the middle two hours of a rise or fall and slows near the turn.` });
  return out;
}

/** Other stations of the state, nearest first (internal links). */
export function neighbours(s: Station, n = 5): Station[] {
  const r = Math.PI / 180;
  const d = (a: Station) => Math.acos(Math.min(1, Math.sin(s.lat * r) * Math.sin(a.lat * r) + Math.cos(s.lat * r) * Math.cos(a.lat * r) * Math.cos((a.lng - s.lng) * r)));
  return stationsIn(s.state).filter((x) => x.key !== s.key).sort((a, b) => d(a) - d(b)).slice(0, n);
}
export { station, localDate };
