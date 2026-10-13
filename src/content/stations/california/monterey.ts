import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'california/monterey',
  intro: 'The Monterey gauge sits in the harbor at the southern end of Monterey Bay and serves as the NOAA reference for the bay and for Carmel.',
  body: (h) => {
    const s = h.st('california/monterey');
    return `
<h2>The southern corner of a great bay</h2>
<p>Monterey Bay opens wide to the west, a curve of shoreline more than 20 miles across from Santa Cruz to the Monterey Peninsula. The harbor gauge sits in its sheltered southern corner, behind the peninsula that blocks the northwest swell. An average day here spans ${h.ft(s.stats.meanRange)}, close to the figure of the Southern California beaches and well short of the Oregon estuaries. Spring tides reach ${h.ft(s.stats.springRange)}. Across the peninsula, NOAA predicts Carmel Cove from this gauge with high water 3 minutes earlier and heights at 97 percent, so a single table covers both shores.</p>
<h2>Granite benches of the peninsula</h2>
<p>West of the harbor, past Cannery Row, the coast becomes a rocky shelf of granite all the way around to Point Pinos and the shore of Pacific Grove. This is one of the classic places in California for looking at the intertidal zone, and the tide decides how much of it shows. The upper band of rock is dry most of the day; the lower one, with its deeper pools, comes out only when the water falls below the chart zero, on ${s.stats.negativeLowDays} days of the prediction period. The whole bay is part of a national marine sanctuary, so treat what you lift as something to put back.</p>
<h2>Kayaks and the kelp edge</h2>
<p>Paddlers leaving the harbor beaches often prefer the morning, before the afternoon wind comes up. A higher tide gives more water over the rocks near shore; a lower one exposes them and shrinks the passages through the kelp. The ${h.a('st:california/santa-cruz', 'Santa Cruz page')} gives the other end of the bay.</p>`;
  },
  faqs: [
    { q: "Is the Carmel tide the same as the Monterey tide?", a: "Very close. NOAA predicts Carmel Cove, on Carmel Bay across the Monterey Peninsula, from the Monterey harbor gauge with high water about 3 minutes earlier, low water about 4 minutes earlier and heights at 97 to 99 percent. The difference is too small to change a beach plan. The surf, which is much stronger on the open Carmel shore than in the harbor, matters far more there." },
  ],
});
