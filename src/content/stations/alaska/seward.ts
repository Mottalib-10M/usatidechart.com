import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'alaska/seward',
  intro: 'The Seward station is on Resurrection Bay, a deep fjord on the Gulf of Alaska side of the Kenai Peninsula.',
  body: (h) => {
    const s = h.st('alaska/seward'), a = h.st('alaska/anchorage');
    return `
<h2>Same peninsula, a third of Anchorage's tide</h2>
<p>Seward and Anchorage are about 125 miles apart by road, but they face different seas. Seward's Resurrection Bay opens onto the Gulf of Alaska, and its tide averages ${h.ft(s.stats.meanRange)} from lower low to higher high, against ${h.ft(a.stats.meanRange)} at ${h.a('st:alaska/anchorage', 'Anchorage')} at the head of Cook Inlet. The bay is deep, so the tide changes depth at the docks without exposing wide flats like those of the inlet.</p>
<h2>A mixed tide in a fjord</h2>
<p>The tide here is mixed, with a marked difference between the two highs of a day: ${h.ft(s.stats.highInequality)} on average. On days near the moon's maximum declination one ebb is long and deep, the other short. The lowest low this period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}, and the highest high ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}.</p>
<h2>Boats, beaches and Lowell Point</h2>
<p>For boats leaving the small boat harbor toward Kenai Fjords, the tide matters for ramps and floats, and the weather of the Gulf matters more for the trip. On foot, the beach toward Lowell Point and beyond is passable only at lower tides in some places, so hikers on shoreline routes check the tide before setting out and keep track of time on the way back.</p>`;
  },
  faqs: [
    { q: 'Why is the tide in Seward so much smaller than in Anchorage?', a: 'Seward faces the Gulf of Alaska from a deep fjord, while Anchorage sits at the head of Cook Inlet, a long funnel that amplifies the tide as it narrows. Seward averages around ten feet, Anchorage nearly three times that. The two towns are only about 125 miles apart by road.' },
  ],
});
