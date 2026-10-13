import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'georgia/st-simons-island',
  intro: 'The St. Simons Light station, at the island’s southern tip by the lighthouse, is the reference tide gauge for the Golden Isles.',
  body: (h) => {
    const s = h.st('georgia/st-simons-island');
    return `
<h2>The Golden Isles' tide</h2>
<p>St. Simons Island, Sea Island and Jekyll Island sit on the Georgia coast near Brunswick, behind wide marshes. The reference station near the St. Simons lighthouse averages ${h.ft(s.stats.meanRange)} from low to high, ${h.ft(s.stats.springRange)} on spring tides. That large range, typical of the Georgia Bight, floods and drains the marshes of Glynn twice a day. St. Simons Sound bar, offshore, is predicted from Fort Pulaski with almost the same time.</p>
<h2>Up the Frederica and Mackay rivers</h2>
<p>The tide climbs the rivers behind the island slowly. NOAA predicts the Frederica River bridge from Fort Pulaski with high water 43 minutes later, the Frederica River further north 48 minutes later, and the Mackay River near daymark 239 almost an hour later. Jekyll Island's marina, across the sound, is predicted from Fernandina Beach in Florida with low water 36 minutes later. Boaters on the Intracoastal Waterway behind the islands meet shallow spots at low tide.</p>
<h2>East Beach and the sound</h2>
<p>At low tide, East Beach on St. Simons opens wide, with sand bars and tidal pools; at high tide the water reaches far up the beach. The pier near the lighthouse looks out on St. Simons Sound, where the current runs hard in the middle of the tide. The lowest low this period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}. The ${h.a('state:georgia', 'Georgia page')} compares the island with Tybee.</p>`;
  },
  faqs: [
    { q: 'Is the tide on Jekyll Island the same as St. Simons?', a: 'Close in size but not in timing. NOAA predicts the Jekyll Island marina on Jekyll Creek from Fernandina Beach, Florida, with high water 3 minutes later and low water 36 minutes later, while St. Simons Light is a reference station of its own. On the beaches, the two islands turn within minutes; in the creeks, the lag grows.' },
  ],
});
