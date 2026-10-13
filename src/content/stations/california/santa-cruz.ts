import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'california/santa-cruz',
  intro: 'Santa Cruz, on the north shore of Monterey Bay, is a NOAA subordinate station whose highs and lows are derived from the Monterey harbor gauge across the bay.',
  body: (h) => {
    const s = h.st('california/santa-cruz'), m = h.st('california/monterey');
    return `
<h2>Across the bay from its reference</h2>
<p>NOAA predicts Santa Cruz from Monterey, about 20 miles to the south across open water, with high water 6 minutes earlier, low water 11 minutes earlier and heights at 97 percent for the highs and 99 percent for the lows. The bay is wide and deep enough for the tide to cross it almost as a single surface, and the corrections show it. In numbers, Santa Cruz averages ${h.ft(s.stats.meanRange)} a day against ${h.ft(m.stats.meanRange)} at ${h.a('st:california/monterey', 'Monterey')}. The curve on this page is built from those NOAA highs and lows, shaped on the Monterey hourly record.</p>
<h2>Cliffs, a wharf and a river mouth</h2>
<p>The city faces south onto the bay, with low cliffs to the west and the long municipal wharf near the mouth of the San Lorenzo River. Each part of that shore reads the tide differently. At the river mouth, the sand bar and the lagoon behind it change with the season and with the flow of the river, and the water there need not follow the ocean table at all. Along the cliffs to the west, the shore is a flat rock terrace cut by the sea, and its pools appear on the lower tides; Natural Bridges State Beach, at the western edge of town, is the best-known spot. Its arch-shaped rock and the reef around it change character completely between high and low water.</p>
<h2>Surf spots and the stage of tide</h2>
<p>Many reef and point breaks along the cliffs work only on part of the tide, and local surfers learn which. A deep low on a winter afternoon, down to ${h.ft(s.stats.minLow.h)} on ${h.date(s.stats.minLow.date)}, empties some of them; a high tide fills others in. The table below gives the times; the surf forecast does the rest.</p>`;
  },
  faqs: [
    { q: "How far apart are the Santa Cruz and Monterey tide times?", a: "Only a few minutes. NOAA sets the Santa Cruz prediction from the Monterey harbor gauge with high water about 6 minutes earlier and low water about 11 minutes earlier, and with heights within a few percent. On a beach day that gap is negligible, but it is why this page shows its own times rather than copying the Monterey table across the bay." },
  ],
});
