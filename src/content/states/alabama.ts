import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const keys = K.inState('alabama').map((s) => s.key);
const e = K.extremesOf(keys);
const lo = keys.map(K.st).sort((a, b) => a.stats.minLow.h - b.stats.minLow.h)[0];
const di = K.st('alabama/dauphin-island'), gs = K.st('alabama/gulf-shores');

export default defineState({
  state: 'alabama',
  title: 'Alabama Tides 2026: Gulf Shores and Dauphin Island Charts',
  description: 'Alabama tides today: tide charts for Gulf Shores and Dauphin Island, with 7-day high and low tide times, coefficient, sunrise and solunar periods. 2026.',
  intro: 'Two gauges on a short Gulf coast, one at the mouth of Mobile Bay and one on the canal behind the Gulf Shores beaches.',
  resume: `${K.ft(e.max.stats.meanRange)} at ${e.max.place} and ${K.ft(e.min.stats.meanRange)} at ${e.min.place}: that is the whole spread of the average daily tide on the Alabama coast, among the smallest anywhere in the lower 48. The tide here is diurnal, ${K.typeWords('alabama/dauphin-island')}, and its size follows the moon's swing north and south of the equator more than its phase, so the biggest days come in runs of a week or so twice a month, with near-flat days in between. Dauphin Island sits at the mouth of Mobile Bay, where the tide pushes into a broad, shallow estuary; the Gulf Shores station is on the Intracoastal Waterway behind the beach. Up the bay and in the rivers, high water comes later and the height changes. Wind and cold fronts often move Alabama water more than the moon does. Pick a station in the tool above for today's curve, or open its page for seven days, extremes and a planner.`,
  featured: 'alabama/gulf-shores',
  body: (h) => `
<h2>A tide that keeps a two-week rhythm</h2>
<p>Most of the Atlantic coast lives by the new and full moon. Alabama does not. Its tide is driven mainly by the diurnal part of the tide wave, which grows when the moon sits far north or south of the equator and nearly vanishes when the moon crosses it. On those crossing days the curve at ${h.a('st:alabama/dauphin-island', 'Dauphin Island')} can flatten to a few inches, sometimes with two small bumps instead of one clear high. A week later the same gauge may swing ${h.ft(di.stats.springRange)} in a single rise and fall. Spring range here is about the moon's declination, not its phase, which is why the ${h.a('solunar-tables', 'solunar tables')} and the tide chart do not always line up as anglers expect.</p>
<h2>Mobile Bay, the passes and the Intracoastal</h2>
<p>Mobile Bay is wide and shallow, fed by one of the largest river systems in the country, and its connection to the Gulf narrows between Dauphin Island and Fort Morgan. Tide in the bay arrives through that gap and through Pass aux Herons, which links it to Mississippi Sound in the west. East of Fort Morgan, the ${h.a('st:alabama/gulf-shores', 'Gulf Shores')} gauge reads the canal and back bays, which meet the Gulf by way of Mobile Bay to the west and Perdido Pass to the east. Its average day of ${h.ft(gs.stats.meanRange)} is a little below the bay mouth, and its timing is softened by the long route the water takes. River flow matters too: after heavy rain upstate, the upper bay can stay high for days regardless of the chart.</p>
<h2>Northers, south winds and the real water level</h2>
<p>When a strong cold front sweeps through between late fall and early spring, north wind can push water out of Mobile Bay and the back bays until flats and oyster reefs stand dry. The lowest predicted low of the period, ${h.ft(lo.stats.minLow.h)} at ${lo.place}, falls on ${h.date(lo.stats.minLow.date)}, right in that season, and a norther can drop the water below it. The reverse comes with days of onshore wind ahead of a front or a tropical system, when the beach and canal can run well above any predicted high. The numbers on these pages are astronomical tide only. For a walk on the sand at Gulf Shores or the west end of Dauphin Island, the ${h.a('beach-walk-planner', 'low tide beach planner')} shows the daylight hours with the water under your level; for a bay ramp, the ${h.a('boat-ramp-tide-planner', 'boat ramp planner')} works the same way.</p>`,
  faqs: [
    { q: 'Why does Alabama sometimes have only one high tide a day?', a: 'The Alabama coast has a diurnal tide, driven mainly by the moon’s position north or south of the equator. For much of each month that produces a single high and a single low a day. When the moon crosses the equator the daily tide shrinks to a few inches and two small highs can appear. The pattern repeats about every two weeks.' },
    { q: 'How big is the tide in Mobile Bay, Alabama?', a: 'Small. Near the mouth of the bay, the average day moves between one and one and a half feet, and the largest days reach about two feet. Up the bay the rise comes later and its size varies with the shape of the shore and with river flow. Wind from the north or south often changes the level by as much as the tide, sometimes more.' },
    { q: 'When are the lowest tides in Alabama?', a: 'In winter. The deepest predicted lows of the year at Dauphin Island and Gulf Shores fall between December and February, when the diurnal tide is strong and the Gulf’s seasonal sea level is at its lowest. Cold fronts with north winds can push the water lower still, exposing flats in Mobile Bay and the back bays near the beaches.' },
  ],
});
