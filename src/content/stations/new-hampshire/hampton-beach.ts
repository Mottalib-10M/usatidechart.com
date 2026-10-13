import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'new-hampshire/hampton-beach',
  intro: 'Hampton Harbor, behind the inlet at the south end of Hampton Beach, is the tide station for the main beach of New Hampshire’s short coast.',
  body: (h) => {
    const s = h.st('new-hampshire/hampton-beach');
    return `
<h2>Eighteen miles of coast, one busy inlet</h2>
<p>New Hampshire has the shortest ocean shoreline of any coastal state, and Hampton Beach is its most visited stretch. The tide station is inside Hampton Harbor, the estuary that drains through the inlet between Hampton Beach and Seabrook. NOAA predicts it from Portland, Maine: high water 14 minutes later, low water 32 minutes later, heights multiplied by 0.91. The average day here runs ${h.ft(s.stats.meanRange)} from low to high.</p>
<p>The later low inside the harbor is typical of an estuary behind a narrow inlet: the water takes time to drain out through the gap, so the harbor keeps falling after the ocean has turned. On the beach itself the tide turns a little earlier than the times shown here.</p>
<h2>The inlet and the harbor flats</h2>
<p>Hampton Harbor is shallow, with wide flats and marsh channels. At low tide much of it is sand and mud, and boats moored inside sit on the bottom or in narrow channels. Through the inlet the current runs hard in the middle hours of the ebb, and an onshore swell against an outgoing tide makes the mouth rough. Boaters time their trips out and back on the rising tide; the ${h.a('boat-ramp-tide-planner', 'boat ramp planner')} lists the hours when the water stays above the depth you need.</p>
<h2>Merrimack to the south</h2>
<p>Five miles south, the Merrimack River mouth at Plum Island and Newburyport has NOAA stations of its own. Up the rivers that feed Great Bay the tide arrives later still: NOAA predicts the Squamscott River railroad bridge more than two hours after Portland, with three quarters of the height. The highest tide of the period here is ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}.</p>`;
  },
  faqs: [
    { q: 'Why is low tide later in Hampton Harbor than at Hampton Beach?', a: 'Because the harbor drains through a narrow inlet. NOAA predicts Hampton Harbor from Portland with high water 14 minutes later but low water 32 minutes later, so the estuary keeps emptying after the ocean has started to rise. On the open beach the turn comes earlier than the harbor times shown on this page.' },
  ],
});
