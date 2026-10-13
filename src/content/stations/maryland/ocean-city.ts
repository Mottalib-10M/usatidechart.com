import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'maryland/ocean-city',
  intro: 'The station for Ocean City, Maryland, is at the Ocean City Inlet, the channel between the resort town and Assateague Island.',
  body: (h) => {
    const s = h.st('maryland/ocean-city');
    return `
<h2>The inlet a storm made</h2>
<p>Ocean City Inlet was cut by the hurricane of 1933 and kept open with jetties; it separates the resort's island from Assateague to the south. The station is in the inlet, where the average day runs ${h.ft(s.stats.meanRange)} from low to high. Half a mile east, the Ocean City fishing pier is a reference station of its own, and NOAA uses it to predict points as far away as Rehoboth Beach in Delaware and Chincoteague in Virginia.</p>
<h2>The bays: smaller, later, and lopsided</h2>
<p>Behind the island, Isle of Wight Bay and Sinepuxent Bay receive the tide through the inlet. NOAA predicts the Isle of Wight Bay station near the inlet from the fishing pier with high water 25 minutes later and high-water heights at two thirds; at Keydash, a mile into the bay, high water comes almost an hour early but low water almost an hour late, with less than half the high-water height. Further north, Little Assawoman Bay has its own station. In practice the bays rise only a foot or two, and wind moves them easily.</p>
<h2>The inlet on the ebb</h2>
<p>The inlet is the drain for those bays. On a falling tide the current runs out strongly between the jetties, and when the ebb meets a swell from the east the mouth gets steep and rough. Boaters heading offshore often prefer to cross on the flood. Anglers on the inlet walls fish the change of tide. The lowest predicted low this period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}; the ${h.a('boat-ramp-tide-planner', 'boat ramp planner')} works for the bay ramps too.</p>`;
  },
  faqs: [
    { q: 'Is the tide in the Ocean City, MD, bays the same as at the beach?', a: 'No. The bays fill through the inlet and their tide is smaller and later. NOAA predicts Isle of Wight Bay near the inlet with high water 25 minutes after the fishing pier and two thirds of its high-water height, and Keydash with less than half. Wind can move the bay level as much as the tide.' },
  ],
});
