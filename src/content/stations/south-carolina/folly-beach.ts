import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'south-carolina/folly-beach',
  intro: 'NOAA predicts the Folly River bridge, on the marsh side of Folly Island, from Charleston Harbor with high water 21 minutes later.',
  body: (h) => {
    const s = h.st('south-carolina/folly-beach');
    return `
<h2>The island, the river and the beach</h2>
<p>Folly Beach is a barrier island south of Charleston, reached across the marsh by the bridge over the Folly River. The station on this page is at that bridge, computed by NOAA from the Charleston gauge: high water 21 minutes later, low water 3 minutes earlier, an average day of ${h.ft(s.stats.meanRange)}. On the ocean side of the island, NOAA's Folly Island (outer coast) station runs about 8 minutes ahead of Charleston, so the beach turns roughly half an hour before the bridge.</p>
<h2>Washout, the pier and the Morris Island lighthouse</h2>
<p>The ocean beach at Folly has a gentle slope, and the tide changes its width a great deal. At the northeast end, the old Morris Island lighthouse stands offshore in the water, more exposed at low tide; from the end of the island you look across the inlet at it. Surfers know the Washout and the area around the pier, where waves behave differently with the stage of the tide. The lowest low predicted this period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}.</p>
<h2>Creeks for paddlers</h2>
<p>Folly Creek and the Folly River behind the island are predicted from Charleston with high water about 25 minutes later and the same height. Paddling the marsh is easiest with the current: out on the ebb toward the inlets, back on the flood. Mud banks appear quickly in the last two hours of the falling tide. The ${h.a('st:south-carolina/charleston', 'Charleston page')} gives the harbor reference.</p>`;
  },
  faqs: [
    { q: 'Is the Folly Beach ocean tide earlier than at the Folly River bridge?', a: 'Yes, by roughly half an hour. NOAA predicts its Folly Island outer coast station about 8 minutes before Charleston Harbor and the Folly River bridge 21 minutes after it. The water reaches the beach first and fills the river and marsh behind the island afterwards.' },
  ],
});
