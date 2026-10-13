import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'california/santa-monica',
  intro: 'The Santa Monica Municipal Pier reaches into the middle of Santa Monica Bay, and its NOAA gauge gives the open-water tide for the beaches between Malibu and the South Bay.',
  body: (h) => {
    const s = h.st('california/santa-monica');
    return `
<h2>One curve for a long crescent of sand</h2>
<p>Santa Monica Bay is a broad bight of the Pacific, open to the southwest, with Malibu on its northern arm and the Palos Verdes hills closing it to the south. A tide this wide reaches the whole bay within minutes: NOAA predicts El Segundo, eight miles down the shore, from the Los Angeles Outer Harbor gauge with high water 13 minutes later and heights at 96 percent, and King Harbor in Redondo Beach 8 minutes later. The pier itself carries a full reference gauge, so its numbers are measured, not derived. The average day spans ${h.ft(s.stats.meanRange)}, a value that grows to ${h.ft(s.stats.springRange)} at the strongest spring tides.</p>
<h2>A wide beach and a short slope</h2>
<p>The sand in front of the city is a broad, dry plain above the reach of ordinary tides; the part that changes is the band of wet beach at the bottom, where the swash runs up and back. Low water widens that firm band, which is the easier surface for a run or a long walk toward Venice, and a high tide with swell pushes the wash up the slope. The South Bay beaches past Marina del Rey and Ballona Creek follow nearly the same times.</p>
<h2>A summer peak worth noting</h2>
<p>Unusually for this coast, the highest prediction of the period at the pier falls in summer, ${h.ft(s.stats.maxHigh.h)} on ${h.date(s.stats.maxHigh.date)}, while most California gauges peak in December. The December highs come close behind, and a south swell in summer or a storm in winter adds more water at the shore than the prediction shows. For dates when both high tide and big surf are forecast, check the ${h.a('king-tides', 'king tide calendar')}.</p>`;
  },
  faqs: [
    { q: "Does the Santa Monica tide also work for Malibu and Venice?", a: "Yes, for planning a beach day. Santa Monica Bay is open and broad, so the tide reaches its shores almost together: NOAA shifts El Segundo by only 13 minutes and King Harbor by 8 minutes from the Los Angeles Outer Harbor gauge. Venice is just south of the pier and Malibu a few miles west. Points and coves with rocky benches react more to swell, so the local sea state matters more than those minutes." },
  ],
});
