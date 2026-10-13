import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'hawaii/kahului',
  intro: 'The Kahului station is in Kahului Harbor on the north shore of Maui, the island’s main commercial port.',
  body: (h) => {
    const s = h.st('hawaii/kahului');
    return `
<h2>Maui's harbor tide</h2>
<p>Kahului Harbor averages ${h.ft(s.stats.meanRange)} between lower low and higher high, a little more than Honolulu. The tide is mixed and at times almost diurnal: on ${Math.round(s.stats.oneHighShare * 100)} percent of days there is only one clear high. For the harbor and the north shore beaches, the tide is a small effect next to the trade-wind swell and the wind itself, which kitesurfers and windsurfers along this coast follow far more closely than the moon. Still, on the reef-fringed beaches a low tide changes where it is easy to get in and out of the water./p>
<h2>The south side runs two hours later</h2>
<p>Across the isthmus, Kihei on Maalaea Bay is predicted by NOAA from Kahului with high water 112 minutes later and low water 79 minutes later, with lows only about half as deep. The south shore beaches from Kihei to Wailea therefore see their tide hours after the harbor. Snorkelers heading to the reefs off south Maui should keep that lag in mind when reading a Kahului table.</p>
<h2>Reef flats, fishponds and the lowest lows</h2>
<p>Along the shore, shallow reef flats and the old Hawaiian fishponds are most exposed on the lowest tides, down to ${h.ft(s.stats.minLow.h)} on ${h.date(s.stats.minLow.date)}. Walking on live reef damages it and the flats are slippery; viewing from the edge is the better choice. The highest prediction this period is ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}. Compare with ${h.a('st:hawaii/honolulu', 'Honolulu')}.</p>`;
  },
  faqs: [
    { q: 'Is the tide in Kihei the same as in Kahului?', a: 'No. NOAA predicts Kihei, on Maalaea Bay, from the Kahului harbor gauge with high water almost two hours later and low water about 80 minutes later, and with shallower lows. If you are snorkeling or launching on the south shore of Maui, add that lag to the Kahului times shown here.' },
  ],
});
