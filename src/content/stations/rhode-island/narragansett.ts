import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'rhode-island/narragansett',
  intro: 'Narragansett Pier is a subordinate station on the open shore of Rhode Island Sound, predicted by NOAA from the Newport gauge.',
  body: (h) => {
    const s = h.st('rhode-island/narragansett');
    return `
<h2>A surf town on the West Passage</h2>
<p>Narragansett's town beach faces south and east toward the mouth of Narragansett Bay, and its tide is a slightly trimmed version of Newport's. NOAA computes it with high water 11 minutes earlier, low water 11 minutes later and heights multiplied by about 0.9, giving an average daily range of ${h.ft(s.stats.meanRange)}. That small range means the beach keeps much of its width at high tide; what changes more is how the waves break over the sandbar.</p>
<h2>Surfers and the low-tide bar</h2>
<p>On a sandy beach like this one, waves often break better on one part of the tide than another because the depth over the bar changes. Many local breaks along this coast are known as low-tide or mid-tide spots, and a big low can make a reef break shallow enough to be dangerous. The curve above shows when the water reaches the level you like; the lowest low of the period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}.</p>
<h2>Point Judith and the salt ponds</h2>
<p>Four miles southwest, the Harbor of Refuge at Point Judith has its own reference station; behind it the salt ponds connect to the sea through narrow breachways where currents run fast at mid-tide. Across the West Passage, Beavertail on Jamestown is predicted from Newport with high water five minutes earlier and almost the full height. For the Newport side of the bay, see the ${h.a('st:rhode-island/newport', 'Newport tide chart')}.</p>`;
  },
  faqs: [
    { q: 'Is Narragansett high tide earlier than Newport?', a: 'Slightly. NOAA predicts Narragansett Pier from the Newport gauge with high water 11 minutes earlier and low water 11 minutes later, and heights at about 90 percent of Newport’s. In practice the two towns see their highs within a quarter of an hour, so either chart works for a beach day; for the pier itself use this one.' },
  ],
});
