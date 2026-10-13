import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'florida/jacksonville-beach',
  intro: 'The Jacksonville Beach station measures the Atlantic tide at the beaches east of Jacksonville.',
  body: (h) => {
    const s = h.st('florida/jacksonville-beach');
    return `
<h2>Northeast Florida's large tide</h2>
<p>Jacksonville Beach averages ${h.ft(s.stats.meanRange)} from low to high, a much bigger tide than in South Florida. The northeast corner of the state shares the amplified tide of the Georgia Bight, while Miami averages well under three feet. Around the new and full moon the range here grows to ${h.ft(s.stats.springRange)}, and the beach's firm sand at low tide is wide enough for long walks and bike rides.</p>
<h2>Atlantic Beach, Mayport and the St. Johns</h2>
<p>Three and a half miles north, NOAA predicts Atlantic Beach from Fernandina Beach with high water 41 minutes earlier. Further north, at Mayport and the mouth of the St. Johns River, several reference stations follow the river's tide, which runs far inland to Jacksonville and beyond. Behind the beaches, the Intracoastal Waterway lags: NOAA predicts the Pablo Creek bridge from Mayport with high water more than an hour later, and Oak Landing more than two hours after Fernandina.</p>
<h2>Fishing the pier and the surf</h2>
<p>Surf anglers on these beaches watch the troughs between the bars, which fill on the rising tide. The lowest predicted low this period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}; the highest high, ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}. For the coast to the south, see ${h.a('st:florida/st-augustine', 'St. Augustine')}.</p>`;
  },
  faqs: [
    { q: 'Why is the tide bigger in Jacksonville Beach than in Miami?', a: 'Northeast Florida sits at the southern end of the Georgia Bight, where a wide, shallow continental shelf amplifies the Atlantic tide to over five feet on an average day. South Florida has a narrow shelf and the Gulf Stream close to shore, and Miami’s tide averages under three feet.' },
  ],
});
