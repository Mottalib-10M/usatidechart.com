import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'hawaii/kailua-kona',
  intro: 'NOAA predicts Kailua-Kona, on the leeward west coast of the Island of Hawaii, from the Hilo gauge with high water 38 minutes later.',
  body: (h) => {
    const s = h.st('hawaii/kailua-kona');
    return `
<h2>A subordinate station on the Kona coast</h2>
<p>Kailua-Kona has no reference gauge of its own; NOAA takes the Hilo prediction, adds 38 minutes to high water and 37 to low water, and scales the heights to 80 percent at high water and 67 percent at low water. The average day here moves ${h.ft(s.stats.meanRange)} from lower low to higher high. Between those predicted highs and lows, the curve on this page follows the shape of Hilo's hourly curve.</p>
<h2>Calm water, small tide</h2>
<p>The Kona side is sheltered from the trade winds by the island's volcanoes, and its water is often calm in the morning. The small tide matters most where the lava shelf meets the sea: entries and exits at rocky snorkel spots are easier with a bit more water over the ledges, and some shoreline pools are only reachable at lower tides. The lowest low of the period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}.</p>
<h2>Swell beats tide</h2>
<p>A south or west swell can make the Kona coast dangerous at any tide, washing over the lava benches where people stand to fish or watch the sunset. Watch several sets before getting close to the water. The highest predicted tide this period is ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}. The ${h.a('st:hawaii/hilo', 'Hilo page')} gives the reference station.</p>`;
  },
  faqs: [
    { q: 'When is the best tide for snorkeling at Kailua-Kona?', a: 'Many snorkelers prefer a mid to high tide on the Kona coast, when there is more water over the lava ledges at entries and exits and over the shallow coral. The range is small, under two feet on average, so calm water and low swell matter more. Mornings are often the calmest time on this leeward coast.' },
  ],
});
