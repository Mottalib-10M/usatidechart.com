import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'hawaii/hilo',
  intro: 'The Hilo station is in Hilo Bay on the windward east side of the Island of Hawaii, the reference for the Big Island.',
  body: (h) => {
    const s = h.st('hawaii/hilo');
    return `
<h2>The Big Island's reference gauge</h2>
<p>Hilo Bay averages ${h.ft(s.stats.meanRange)} from lower low to higher high, the largest of the four Hawaii stations on this site, with spring tides near ${h.ft(s.stats.springRange)}. NOAA uses the Hilo gauge to predict the rest of the island, including Kailua-Kona on the west coast. The bay is sheltered by a long breakwater, and its tide is mixed, with unequal highs.</p>
<h2>A bay shaped by tsunamis</h2>
<p>Hilo's waterfront is known for the tsunamis of 1946 and 1960, after which the low-lying bayfront was turned into parks. Those waves had nothing to do with the daily tide; they came from earthquakes far away. The tide gauge in the bay recorded them, and it remains part of the warning network. The tide on this page is the ordinary, predictable rise and fall.</p>
<h2>Tide pools on a volcanic shore</h2>
<p>Along the lava coast near Hilo and south toward Puna, warm and cold pools in the rock fill and drain with the tide. At a low tide, down to ${h.ft(s.stats.minLow.h)} on ${h.date(s.stats.minLow.date)}, the pools are calmer and more enclosed; at high tide with a swell, waves wash over them. Surf on the windward coast can be rough at any tide. For the leeward side, see ${h.a('st:hawaii/kailua-kona', 'Kailua-Kona')}.</p>`;
  },
  faqs: [
    { q: 'Are Hilo tide times good for Kona?', a: 'Not as they are. NOAA predicts Kailua-Kona from the Hilo gauge with high water about 38 minutes later and heights at 80 percent at high water and two thirds at low water. Use the Kailua-Kona page for the west side of the island; this page is for Hilo Bay and the windward coast nearby.' },
  ],
});
