import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'rhode-island/newport',
  intro: 'The Newport station is on the harbor side of Aquidneck Island at the mouth of Narragansett Bay, the reference for predictions across the bay.',
  body: (h) => {
    const s = h.st('rhode-island/newport');
    return `
<h2>The gate of Narragansett Bay</h2>
<p>Newport Harbor averages ${h.ft(s.stats.meanRange)} from low to high, a moderate range for a sailing harbor where moorings and marina floats see a steady, predictable rise and fall. The gauge here is the reference NOAA uses for much of Narragansett Bay: Castle Hill and Beavertail at the entrance run about five minutes ahead with nearly the same height, while Prudence Island and Conanicut Point inside the bay come seven or eight minutes later with heights 7 to 14 percent larger. The tide grows a little as it pushes up the bay toward Providence.</p>
<h2>Cliff Walk, Sachuest and the rocky shore</h2>
<p>East of town, Sachuest Point is predicted from Newport with high water five minutes earlier and 90 percent of the height. On this rocky coast, the tide changes what is exposed rather than how wide the beach is: ledges, weed and pools along the shore appear at low tide and vanish at high. For Easton's Beach and Second Beach, the times on this page are a fair guide.</p>
<h2>Sailing and the current</h2>
<p>Sailors in the East Passage care about the current as much as the height. The flood runs into the bay and the ebb out of it, strongest in the middle of each, and wind against an ebb raises a short steep chop at the entrance. The lowest low of the period, ${h.ft(s.stats.minLow.h)} on ${h.date(s.stats.minLow.date)}, and the highest high, ${h.ft(s.stats.maxHigh.h)} on ${h.date(s.stats.maxHigh.date)}, set the extremes. ${h.a('st:rhode-island/narragansett', 'Narragansett')} faces the bay's West Passage across Conanicut Island.</p>`;
  },
  faqs: [
    { q: 'Does the tide get bigger farther up Narragansett Bay from Newport?', a: 'A little. NOAA predicts Prudence Island’s south end from Newport with heights about 8 to 14 percent larger and high water eight minutes later, and Conanicut Point with heights 7 percent larger. The bay is long and narrows toward Providence, which slightly amplifies the tide coming in from Rhode Island Sound.' },
  ],
});
