import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'texas/south-padre-island',
  intro: 'The South Padre Island station is at the Coast Guard station near the island’s southern tip, on the bay side close to Brazos Santiago Pass, a few miles north of the Mexican border.',
  body: (h) => {
    const s = h.st('texas/south-padre-island');
    return `
<h2>The southernmost tide on the Texas coast</h2>
<p>${h.ft(s.stats.meanRange)} is the average daily swing measured at the Coast Guard station, a gauge that sits a short way inside Brazos Santiago Pass, the opening between South Padre Island and Brazos Island. The water here is the Laguna Madre's southern end meeting the Gulf. Three primary gauges cluster within a mile: this one, the Padre Island south-end station toward the pass, and one on Brazos Santiago Pass itself. Port Isabel, on the mainland three miles west, has its own as well.</p>
<h2>Across the Queen Isabella Causeway</h2>
<p>The causeway carries the only road onto the island from Port Isabel, and NOAA predicts both of its ends. Neither is computed from this Coast Guard gauge: the reference is the Padre Island south-end station. The east end, by the island, comes out 24 minutes later at high water than that reference, at 87 percent of the high-water height and 75 percent at low water. The west end, near Port Isabel, trails it by 52 minutes. South Bay entrance, the opening to the shallow bay south of Port Isabel, runs 14 minutes behind. The farther the water travels into the lagoon, the later and flatter the tide becomes.</p>
<h2>Winds off the Gulf and fronts from the north</h2>
<p>Steady southeast winds blow across this coast for much of the year, and they hold water against the island and in the lagoon. When a winter front arrives with strong north winds, the Laguna Madre can drain noticeably, leaving flats and channel edges shallower than the table shows. In any season the weather can shift the level by as much as the tide itself. The deepest predicted low of the period, ${h.ft(s.stats.minLow.h)} on ${h.date(s.stats.minLow.date)}, is a baseline, not a limit. Before launching from a bay-side ramp, compare this page with the wind forecast; the ${h.a('boat-ramp-tide-planner', 'boat ramp planner')} handles the tide part, and none of it is for navigation.</p>`;
  },
  faqs: [
    { q: 'Is the tide later on the Port Isabel end of the South Padre Island causeway?', a: 'Yes. NOAA predicts both ends of the Queen Isabella Causeway from its Padre Island south-end station: the island end about 24 minutes later at high water, and the Port Isabel end about 52 minutes later, with a smaller range. The tide loses height and time as it spreads into the shallow Laguna Madre, so the mainland side turns last.' },
  ],
});
