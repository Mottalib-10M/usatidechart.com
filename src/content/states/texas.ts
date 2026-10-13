import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const keys = K.inState('texas').map((s) => s.key);
const e = K.extremesOf(keys);
const all = keys.map(K.st);
const hi = [...all].sort((a, b) => b.stats.maxHigh.h - a.stats.maxHigh.h)[0];
const lo = [...all].sort((a, b) => a.stats.minLow.h - b.stats.minLow.h)[0];
const gv = K.st('texas/galveston'), cc = K.st('texas/corpus-christi');

export default defineState({
  state: 'texas',
  title: 'Texas Tides 2026: Galveston, Corpus Christi and Padre',
  description: 'Texas tides today: tide charts for Galveston, Port Aransas, Corpus Christi and South Padre Island, with 7-day high and low tide times and solunar periods. 2026.',
  intro: 'Four gauges along some 350 miles of barrier islands, from the Galveston seawall to the Rio Grande end of Padre Island.',
  resume: `${K.ft(e.max.stats.meanRange)} at ${e.max.place} down to ${K.ft(e.min.stats.meanRange)} at ${e.min.place}: across the ${all.length} Texas stations on this site, the average daily tide never reaches two and a half feet. Bob Hall Pier at Corpus Christi sits between, at ${K.ft(cc.stats.meanRange)}, with South Padre Island close to it. Most days bring ${K.typeWords('texas/galveston')}, a diurnal rhythm that peaks when the moon stands far from the equator, so the strong days arrive in runs twice a month rather than with each new and full moon. Almost the whole coast is a chain of barrier islands, and behind them lie Galveston, Matagorda, San Antonio, Aransas and Corpus Christi bays and the long Laguna Madre. The tide gets into those waters only through a handful of passes and loses much of its height on the way. Wind and passing fronts move Texas water as much as the moon, and often more. Pick a station in the tool above for today's curve, or open its page for seven days, extremes and a planner.`,
  featured: 'texas/galveston',
  body: (h) => `
<h2>Barrier islands and a few narrow doors</h2>
<p>From Bolivar Peninsula to Brazos Santiago, the Texas shore is a line of sand islands with shallow bays behind them. Bolivar Roads at ${h.a('st:texas/galveston', 'Galveston')}, Pass Cavallo, Aransas Pass at ${h.a('st:texas/port-aransas', 'Port Aransas')} and Brazos Santiago Pass by ${h.a('st:texas/south-padre-island', 'South Padre Island')} carry most of the exchange with the Gulf, along with a few dredged cuts. Water squeezed through those openings runs fast on the change of tide, then spreads into bays only a few feet deep, where the rise is slower and smaller. The Laguna Madre, between Padre Island and the mainland, is so long and so poorly connected that its tide is barely measurable through much of its length, and its water is often saltier than the Gulf's.</p>
<h2>A coast tuned to the seasons</h2>
<p>On top of the daily tide, Gulf sea level runs through a yearly cycle: higher in fall, lower in winter. The Texas predictions show it. The highest predicted high on the coast, ${h.ft(hi.stats.maxHigh.h)} at ${hi.place}, falls on ${h.date(hi.stats.maxHigh.date)}, while the deepest low, ${h.ft(lo.stats.minLow.h)} at ${lo.place}, comes on ${h.date(lo.stats.minLow.date)}. Galveston alone shows ${gv.stats.negativeLowDays} days in the window with a low below the chart datum. Autumn is when beaches narrow and low streets near the bays take water on calm days; winter is the season of wide sand and exposed flats.</p>
<h2>Northers and onshore winds</h2>
<p>A blue norther can drop the temperature by tens of degrees in hours and, with it, blow the bays out. Water drains from Galveston Bay and the Laguna Madre, boats sit in the mud at their slips, and the beach widens well past what any table predicts. Before a front, or during long spells of southeast wind in spring and summer, the reverse stacks water against the islands and runs it up to the dunes. The numbers on these pages are astronomical tide only. For a ramp in a shallow bay, check the ${h.a('boat-ramp-tide-planner', 'boat ramp planner')} and then the wind; for surf fishing along the passes and jetties, the ${h.a('fishing-tides', 'fishing tides guide')} explains why moving water matters more than height.</p>`,
  faqs: [
    { q: 'Which Texas beach has the biggest tide?', a: 'Galveston, though big is relative. Among the Texas stations on this site, the Galveston Pleasure Pier averages about two feet between low and high, while Port Aransas, inside Aransas Pass, averages about one foot. Corpus Christi and South Padre Island fall between. Wind often moves the level on any Texas beach by as much as the tide itself.' },
    { q: 'Why does the Texas coast often have one high tide a day?', a: 'The Gulf of Mexico responds mostly to the diurnal part of the tide, which depends on how far the moon stands north or south of the equator. On most days that gives Texas a single high and a single low. When the moon crosses the equator, the swing shrinks to a few inches and two small highs can appear for a few days.' },
    { q: 'Does the Laguna Madre in Texas have tides?', a: 'Very small ones. The Laguna Madre is long, shallow and linked to the Gulf through only a few passes, so the astronomical tide fades quickly once inside. Through much of the lagoon, wind decides the water level: a north wind can drain the flats, and a steady southeast wind can push water across them. The station pages show the tide at the passes.' },
    { q: 'When are the lowest tides on the Texas coast?', a: 'In winter, mostly from December to February. The diurnal tide is strong around the solstice and Gulf sea level is at its yearly low, so the deepest predicted lows of the year fall in those months at Galveston, Port Aransas, Corpus Christi and South Padre. A strong norther can then push the water a foot or more below the prediction.' },
  ],
});
