import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'oregon/tillamook-bay',
  intro: 'The Garibaldi gauge sits on the north shore of Tillamook Bay, close to the entrance, and is the NOAA reference station for this broad, shallow estuary.',
  body: (h) => {
    const s = h.st('oregon/tillamook-bay'), cc = h.st('california/crescent-city');
    return `
<h2>A bay that empties to the mud</h2>
<p>Tillamook Bay is wide but shallow, fed by five rivers, and on a low tide a large share of it turns into mudflats and sandbars cut by channels. The tide that does this is big: ${h.ft(s.stats.meanRange)} on an average day at Garibaldi, ${h.ft(s.stats.springRange)} at spring tides, compared with ${h.ft(cc.stats.meanRange)} at Crescent City, California, the reference for most of the stations around the bay. With so much water moving over so little depth, a skiff that floated at noon can be sitting on the flat by mid-afternoon. Watch the clock more than the depth sounder.</p>
<h2>Each shore runs on its own delay</h2>
<p>The entrance is a jettied gap at Barview, just northwest of town, and the farther a place lies from it, the later the water arrives. NOAA predicts all of these from Crescent City:</p>
<ul>
<li>Barview, at the entrance: high water 42 minutes later, low water 56 minutes later.</li>
<li>Miami Cove, a mile east of Garibaldi: 75 and 86 minutes.</li>
<li>Bay City, on the east shore: 93 and 120 minutes, lows at 83 percent.</li>
<li>Hoquarten Slough at Tillamook: 112 minutes at high water, 195 at low water, lows at 58 percent.</li>
</ul>
<p>At the head of the bay, the low comes more than two hours after the low at the entrance and never drains as far, because river water and the slow flats hold it up. Plan a launch at the south end with the Tillamook times, not this page.</p>
<h2>The ocean side of Garibaldi</h2>
<p>Outside the jetties, the beaches north toward Rockaway face the open sea and follow the entrance clock. The bar at the mouth can break hard on an outgoing tide with swell, and the ${h.a('boat-ramp-tide-planner', 'ramp planner')} helps pick a launch on the flood.</p>`;
  },
  faqs: [
    { q: "Why does low tide come so late at the south end of Tillamook Bay?", a: "The bay is shallow and the water has to drain across miles of flats and up the sloughs to reach Tillamook, while the rivers keep pushing fresh water down. NOAA predicts Hoquarten Slough from Crescent City with low water more than three hours later, against under an hour at Barview near the entrance, and with much shallower lows. The south end is never as empty as the mouth." },
  ],
});
