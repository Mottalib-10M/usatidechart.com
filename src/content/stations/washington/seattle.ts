import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'washington/seattle',
  intro: 'The Seattle station is on Elliott Bay at the foot of Madison Street, the reference gauge for central Puget Sound.',
  body: (h) => {
    const s = h.st('washington/seattle');
    return `
<h2>Eleven feet in a deep fjord</h2>
<p>Puget Sound is a network of deep, glacier-carved channels, and its tide grows as it travels south from the Strait of Juan de Fuca. On Seattle's waterfront the average day moves ${h.ft(s.stats.meanRange)} from the lower low to the higher high, and spring tides reach ${h.ft(s.stats.springRange)}. The tide is mixed: one low of the day is often much lower than the other, and on the strongest days the lower low falls well below zero, as low as ${h.ft(s.stats.minLow.h)} on ${h.date(s.stats.minLow.date)}.</p>
<p>Across the central Sound the timing is remarkably uniform. NOAA predicts Harbor Island, Shilshole Bay, Eagle Harbor on Bainbridge, Port Blakely and Point Vashon all from this gauge within five minutes and a couple of percent of the height. The Duwamish Waterway at Eighth Avenue South runs ten minutes later.</p>
<h2>Low-tide beach walks</h2>
<p>The big minus tides of the Sound are the season of beach walks: rocky shores and sand flats at places like Lincoln Park, Alki and the beaches of Bainbridge show sea stars, anemones and moon snails that stay hidden most of the year. In the Pacific Northwest the deepest lows come in daylight from late spring to summer, and in darkness in winter. The ${h.a('negative-low-tides', 'negative low tides guide')} explains why, and the ${h.a('beach-walk-planner', 'low tide planner')} finds the daylight windows.</p>
<h2>Ferries, locks and the high tide</h2>
<p>Ferry docks are built for the full range, and the Ballard Locks keep Lake Union and Lake Washington above the tide. The highest predicted tide this period is ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}; winter king tides with a low-pressure storm can push water onto low parts of the waterfront.</p>`;
  },
  faqs: [
    { q: 'When are the best low tides for beach walks in Seattle?', a: 'From late spring through summer, when the lowest lows of the day fall around midday and drop below zero on many days. In winter the deep lows come at night. Look for days with a low of minus two feet or lower in daylight, and arrive an hour before the low to follow the water out.' },
  ],
});
