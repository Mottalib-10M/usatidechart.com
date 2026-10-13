import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'new-jersey/ocean-city',
  intro: 'For Ocean City, New Jersey, the closest NOAA reference station is Longport, just inside Great Egg Harbor Inlet at the north end of the island.',
  body: (h) => {
    const s = h.st('new-jersey/ocean-city');
    return `
<h2>An inlet station for a barrier-island town</h2>
<p>Ocean City occupies a barrier island between Great Egg Harbor Inlet to the north and Corson's Inlet to the south. NOAA has no reference gauge on its ocean beach, so this page uses Longport, on the inside of Great Egg Harbor Inlet facing the north end of Ocean City across the water. The average day there runs ${h.ft(s.stats.meanRange)} from low to high. On the ocean beachfront the tide turns somewhat earlier than inside the inlet; the ${h.a('st:new-jersey/atlantic-city', 'Atlantic City ocean station')}, nine miles up the coast, is a good guide to the beach timing.</p>
<h2>Great Egg Harbor Bay and the back channels</h2>
<p>West of the island, the bay and its creeks fill through the inlet, and the tide lags. NOAA predicts Beesleys Point, at the bridge to the mainland, from Atlantic City with high water 55 minutes later and low water an hour and a half later; Lakes Bay at Pleasantville is predicted with high water an hour later. For crabbing and launching on the bay side, those later times are the ones that matter.</p>
<h2>Lows for the flats, highs for the bay streets</h2>
<p>The bayside of Ocean City is low ground, and the highest tides of the year can bring water into streets near the bay, more so with an east wind. This period's top prediction at Longport is ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}. At the other end, the lowest low is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}, when the sandbars around the inlet show.</p>`;
  },
  faqs: [
    { q: 'Which tide station is used for Ocean City, NJ?', a: 'NOAA has no reference gauge on the Ocean City, NJ, beachfront, so this page uses Longport, inside Great Egg Harbor Inlet at the north end of the island. For the ocean beach, the turn comes a little earlier; for the bay behind the island, NOAA predicts Beesleys Point with high water about 55 minutes after Atlantic City.' },
  ],
});
