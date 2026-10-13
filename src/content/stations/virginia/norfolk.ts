import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'virginia/norfolk',
  intro: 'The Sewells Point station, at the Norfolk naval base, measures the tide of Hampton Roads, the great harbor at the mouth of the James River.',
  body: (h) => {
    const s = h.st('virginia/norfolk');
    return `
<h2>The reference for Hampton Roads</h2>
<p>Sewells Point sits on the shore of the naval station, where the James, Elizabeth and Nansemond rivers meet the Chesapeake. The average day there runs ${h.ft(s.stats.meanRange)} from low to high. NOAA predicts the rest of the harbor from it: Old Point Comfort across the water within minutes, Craney Island 18 minutes later, downtown Norfolk on the Elizabeth River 23 minutes later, Newport News 29 minutes later, Pig Point on the Nansemond 42 minutes later, all with high-water heights a little larger than Sewells Point.</p>
<h2>A city that floods on sunny days</h2>
<p>Norfolk is one of the places on the East Coast where high-tide flooding has become common: low neighborhoods near the Lafayette and Elizabeth rivers take water on the highest tides, even without a storm, as the land subsides and the sea rises. The highest prediction this period is ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}; a northeast wind can add a foot. The ${h.a('king-tides', 'king tides guide')} and ${h.src('high_tide_flooding', 'NOAA’s page on high tide flooding')} explain the trend.</p>
<h2>Boating in the roads</h2>
<p>For small boats, the tidal currents in the main channels and around the bridge-tunnels run strongly with the flood and ebb, and big-ship traffic shares the water. The tide's height matters most in the creeks and at the ramps of the rivers. The lowest low of the period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}.</p>`;
  },
  faqs: [
    { q: 'Why does Norfolk flood at high tide without a storm?', a: 'Because the highest predicted tides already reach low ground in parts of the city, and the margin keeps shrinking: the land around Hampton Roads is sinking while sea level rises. On king tide days, low streets near the rivers take water even in fair weather, and a northeast wind or heavy rain makes it worse.' },
  ],
});
