import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'alabama/dauphin-island',
  intro: 'Dauphin Island, the barrier island guarding the west side of the mouth of Mobile Bay, has a primary NOAA gauge at its eastern end.',
  body: (h) => {
    const s = h.st('alabama/dauphin-island');
    return `
<h2>At the gate of Mobile Bay</h2>
<p>${h.ft(s.stats.meanRange)} on an average day, with a lone high and a lone low on ${Math.round(s.stats.oneHighShare * 100)}% of them: the Dauphin Island tide is the tide of the northern Gulf in its plainest form. The gauge watches the main entrance to Mobile Bay, the channel between the island's east end and Mobile Point, where Fort Gaines and Fort Morgan face each other across the water. Everything that fills the bay passes this way. NOAA predicts Mobile Point from the Mobile State Dock reference, upriver at the city, with high water 106 minutes earlier and heights at 80 percent, which gives an idea of how long the tide needs to travel the length of the bay.</p>
<h2>Mississippi Sound on the north shore</h2>
<p>Dauphin Island is long and thin. Its south shore faces the Gulf; its north shore looks onto Mississippi Sound and the mouth of Fowl River on the mainland. NOAA keeps a gauge at the Highway 188 bridge on West Fowl River, about ten miles northwest, for anyone launching on that side. The sound is shallow, and its tide is shaped as much by the wind as by the moon.</p>
<h2>A winter of long lows</h2>
<p>On ${s.stats.negativeLowDays} days of the prediction period the water at this station drops below the chart datum at least once, and the deepest of those lows, ${h.ft(s.stats.minLow.h)}, comes on ${h.date(s.stats.minLow.date)}. On this coast those winter lows often stack up with a north wind that blows the sound and the bay out, baring flats and oyster reefs along the island's back side. A strong south wind does the opposite, holding the beach covered at hours when the table says it should be exposed. For timing a morning on the flats, check both the chart above and the wind; the ${h.a('negative-low-tides', 'negative low tide guide')} describes what to expect when the water falls that far.</p>`;
  },
  faqs: [
    { q: 'How much later is high tide in Mobile than at Dauphin Island?', a: 'Well over an hour. NOAA predicts Mobile Point, across the bay entrance from Dauphin Island, with high water about an hour and three quarters before the Mobile State Dock reference upriver. The tide needs that long to travel up the shallow bay to the city. Dauphin Island itself sits at the entrance, so its tide turns early compared with the docks and ramps of Mobile.' },
  ],
});
