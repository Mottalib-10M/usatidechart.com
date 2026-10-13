import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'maryland/baltimore',
  intro: 'The Baltimore station is at Fort McHenry on the Patapsco River, the reference for the harbor and the upper Chesapeake.',
  body: (h) => {
    const s = h.st('maryland/baltimore');
    return `
<h2>The harbor gauge at Fort McHenry</h2>
<p>Baltimore's tide gauge stands at Fort McHenry, at the mouth of the Inner Harbor, and it is the reference NOAA uses for much of the upper Chesapeake. The tide is small: ${h.ft(s.stats.meanRange)} on an average day. Around the harbor the corrections are minor, Hawkins Point at the Key Bridge site within minutes, Stony Creek and North Point a few minutes either way with heights within ten percent, so this page serves the whole port and the creeks of the lower Patapsco.</p>
<h2>Far from the ocean, late tide</h2>
<p>Baltimore is about 150 miles from the Atlantic by water, and the tide reaching it has crossed the length of the bay. It arrives one to two hours after ${h.a('st:maryland/annapolis', 'Annapolis')}, and many hours after the capes. The tide here is mixed, with unequal highs, and on days when the inequality is large one high almost disappears.</p>
<h2>Water level in the Inner Harbor</h2>
<p>The Inner Harbor's promenade sits above the ordinary tides, but storm tides from hurricanes and strong southeast winds have flooded Fells Point and the waterfront in the past. The highest prediction this period, ${h.ft(s.stats.maxHigh.h)} on ${h.date(s.stats.maxHigh.date)}, is modest; weather is what turns a tide into a flood here. The lowest predicted low is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}.</p>`;
  },
  faqs: [
    { q: 'How big is the tide in Baltimore Harbor?', a: 'Small: well under two feet between low and high on an average day, because the tide loses height crossing the long Chesapeake Bay. The highs of a day are often unequal. Wind and rain often move the harbor level more than the tide, which is why storm surges, not predicted tides, cause the floods in Fells Point.' },
  ],
});
