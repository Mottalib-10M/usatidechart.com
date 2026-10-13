import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'delaware/lewes',
  intro: 'The Lewes station is in the Breakwater Harbor at Cape Henlopen, where Delaware Bay opens to the Atlantic.',
  body: (h) => {
    const s = h.st('delaware/lewes');
    return `
<h2>At the mouth of Delaware Bay</h2>
<p>Lewes sits inside Cape Henlopen, sheltered by two stone breakwaters, and its gauge measures the tide entering Delaware Bay: ${h.ft(s.stats.meanRange)} on an average day. The bay is a long funnel, and the tide grows and slows as it travels up toward Philadelphia, taking several hours to get there. Lewes is the starting point of that journey, which is why NOAA uses it as a reference for points on both sides of the bay mouth, including Cape May Point in New Jersey.</p>
<h2>Bay beaches versus ocean beaches</h2>
<p>The bay beaches at Lewes are calm and gently sloped, and at low tide they open onto broad sandy shallows. Around the point, the ocean beaches of Cape Henlopen and ${h.a('st:delaware/rehoboth-beach', 'Rehoboth Beach')} feel the open Atlantic, and their tide comes earlier: on the days compared for this site, Rehoboth's predicted highs and lows ran roughly 45 minutes to an hour ahead of Lewes. Both are worth checking if you split a day between the bay and the ocean.</p>
<h2>The ferry and the shoals</h2>
<p>The ferry to Cape May crosses the bay mouth over shoals where tidal currents run strongly. For small boats, the current in the canal and around the breakwaters matters as much as the height. The lowest low of the period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}; the highest high ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}.</p>`;
  },
  faqs: [
    { q: 'Is the tide later in Lewes than in Rehoboth Beach?', a: 'Yes. Rehoboth faces the open Atlantic, while Lewes is inside Cape Henlopen at the mouth of Delaware Bay. Comparing the two NOAA predictions over the first days of this period, the highs and lows at Lewes come roughly 45 minutes to an hour after Rehoboth’s. Use the station on the side of the cape where you will be.' },
  ],
});
