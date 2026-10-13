import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const keys = K.inState('oregon').map((s) => s.key);
const e = K.extremesOf(keys);
const all = keys.map(K.st);
const lo = [...all].sort((a, b) => a.stats.minLow.h - b.stats.minLow.h)[0];
const hi = [...all].sort((a, b) => b.stats.maxHigh.h - a.stats.maxHigh.h)[0];
const nw = K.st('oregon/newport'), ao = K.st('oregon/astoria'), tb = K.st('oregon/tillamook-bay');

export default defineState({
  state: 'oregon',
  title: 'Oregon Tides 2026: Newport, Tillamook Bay and Astoria',
  description: 'Oregon tides today: tide charts for Newport, Tillamook Bay and Astoria on the Columbia, with 7-day tide times, summer minus tides and solunar periods. 2026.',
  intro: 'Three gauges on a rugged coast of headlands and river mouths, from Yaquina Bay north to the Columbia.',
  resume: `${K.ft(e.max.stats.meanRange)} at ${e.max.place}, ${K.ft(nw.stats.meanRange)} at Newport and ${K.ft(tb.stats.meanRange)} at Garibaldi on Tillamook Bay: the three Oregon stations on this site sit close together, with ${e.min.place} the lowest. That is well above most of California and close to what the outer Washington coast sees. The tide is mixed, ${K.typeWords('oregon/newport')}, and spring days reach ${K.ft(nw.stats.springRange)} at Newport. Oregon's coast is broken by estuaries rather than wide bays. Each river mouth, from the Columbia to Tillamook, Yaquina and Coos Bay, has a bar at the entrance and a tidal reach that runs inland for miles, where high water arrives later and the low may not drain as far. The Columbia carries the tide far upriver and changes it with every swing in its flow. Pick a station in the tool above for today's curve, or open its page for seven days, extremes and a planner.`,
  featured: 'oregon/newport',
  body: (h) => `
<h2>Summer mornings on the rocks</h2>
<p>The deepest Oregon lows in this window come in early summer, not winter: ${h.ft(lo.stats.minLow.h)} at ${h.a(`st:${lo.key}`, lo.place)} on ${h.date(lo.stats.minLow.date)}. On those days the lower low falls in the morning, and on a coast where the sun rises before six in June, that means a long stretch of bare rock in good light. Basalt headlands and reefs, from Yaquina Head near ${h.a('st:oregon/newport', 'Newport')} to the rocks off Cannon Beach, open their pools then. The rise comes back steadily, and surf on a rising tide can cut off a ledge or a pocket beach under a cliff. Plan the walk with the ${h.a('beach-walk-planner', 'low tide beach planner')} and keep an eye on the water while you are out. The ${h.a('negative-low-tides', 'negative low tide guide')} explains why the lows sink below zero.</p>
<h2>River bars and estuary tides</h2>
<p>Every Oregon harbor sits inside a river mouth, and every river mouth has a bar where the current meets the swell. On the ebb, water leaving the estuary runs against incoming waves and steepens them; on the flood the bar is usually calmer. That is why boaters watch the turn of the tide as closely as its height. Inside, the estuaries behave like long tidal rivers. In Tillamook Bay and Yaquina Bay, high water arrives later the farther you go from the jetties, and wide mud and eelgrass flats drain on the lower lows, the ground clam diggers wait for.</p>
<h2>The Columbia as a tidal river</h2>
<p>${h.a('st:oregon/astoria', 'Astoria')} sits well inside the Columbia, upstream of the bar, yet its tide averages ${h.ft(ao.stats.meanRange)}, as much as the open coast. The tide keeps travelling up the river well past Portland, to the Bonneville Dam, and it weakens and lags as it goes. River flow pushes back. During the spring snowmelt, when the Columbia runs high, levels at Astoria sit above the prediction and the lows stay fuller. The Columbia River Bar at the mouth is among the most dangerous crossings in the country, especially on a strong ebb in winter swell.</p>
<h2>Winter highs and storm surf</h2>
<p>The year's highest predicted water, ${h.ft(hi.stats.maxHigh.h)} at ${hi.place} on ${h.date(hi.stats.maxHigh.date)}, comes in the stormy season. A big high tide plus winter swell throws drift logs onto the upper beach, and a single log rolled by a wave can crush a person. Stay off logs at the waterline whenever the tide is high and the surf is up. The ${h.a('king-tides', 'king tides guide')} has the dates.</p>`,
  faqs: [
    { q: 'When are the lowest tides in Oregon?', a: 'In late spring and early summer, mostly May to July, Oregon gets its deepest minus tides, and they fall in the morning, in daylight. Winter also has negative lows, but often later in the day or after dark. At Newport, Garibaldi and Astoria the strongest summer lows drop roughly two to two and a half feet below the chart datum.' },
    { q: 'Does the tide reach Portland, Oregon?', a: 'Yes. The ocean tide travels up the Columbia River past Astoria and Portland to the Bonneville Dam, and up the Willamette to the falls at Oregon City. It weakens and arrives hours later as it goes, and high river flow during the spring melt can mask it. Portland stations show a much smaller rise than the coast.' },
    { q: 'Why does the tide matter for crossing an Oregon river bar?', a: 'On the ebb, water flowing out of the estuary runs against the incoming swell, which steepens and stacks the waves on the bar. On the flood, current and swell go the same way and the bar is usually easier. Boaters on the Oregon coast time crossings around slack water or the flood and check the latest bar and marine forecast first.' },
  ],
});
