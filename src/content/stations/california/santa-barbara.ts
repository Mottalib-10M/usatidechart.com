import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'california/santa-barbara',
  intro: 'Santa Barbara keeps a NOAA reference gauge on its waterfront, on a stretch of coast that faces south across the Santa Barbara Channel toward the Channel Islands.',
  body: (h) => {
    const s = h.st('california/santa-barbara');
    return `
<h2>A coast that looks south</h2>
<p>Between Point Conception and Ventura, the California shore turns and runs east to west. Santa Barbara sits on that turn with the mountains behind it and the channel in front, and the islands offshore block a good share of the northwest swell that hits the rest of the state. The tide does not care about that shelter: it arrives from the open Pacific through both ends of the channel and gives the city an average day of ${h.ft(s.stats.meanRange)}. No other NOAA station lies within a dozen miles, so this one carries the tide for the whole stretch from Goleta to Carpinteria.</p>
<h2>Bluffs, harbor sand and low-water walks</h2>
<p>Much of the Santa Barbara shore is a narrow beach at the foot of eroding bluffs. On a high tide, especially in winter, the water reaches the base of the cliff in many places and the walk along the sand is cut. On a low, the same beach becomes a long, continuous strip and the rocky flats at the points come out. That is why a hiker here looks at the low before setting out, not the high: plan to finish while the water is still well down, because once it turns, a stretch that was dry can close. Inside the breakwater harbor, west of Stearns Wharf, the tide is the same but the waves stay small.</p>
<h2>Seasons of the deep lows</h2>
<p>The lowest water of the period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}, a winter afternoon. In spring and summer the deep lows move to dawn. Spring tides here span ${h.ft(s.stats.springRange)}, neap tides ${h.ft(s.stats.neapRange)}. The ${h.a('tide-range', 'tide range guide')} explains why the gap shifts through the month.</p>`;
  },
  faqs: [
    { q: "Can you walk the beach below the bluffs in Santa Barbara at high tide?", a: "Often not. Many stretches of beach under the Santa Barbara bluffs are narrow, and on higher tides, above all in winter with swell, the water reaches the foot of the cliff. Start a long beach walk on a falling tide or near the low, keep track of the time of the next rise, and turn back early if the sand ahead is already wet up to the rocks." },
  ],
});
