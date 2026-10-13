import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'maryland/annapolis',
  intro: 'The Annapolis station is at the US Naval Academy on the Severn River, near the middle of Chesapeake Bay.',
  body: (h) => {
    const s = h.st('maryland/annapolis'), b = h.st('maryland/baltimore');
    return `
<h2>A one-foot tide in a sailing capital</h2>
<p>Annapolis sees only ${h.ft(s.stats.meanRange)} between low and high on an average day. Chesapeake Bay is long and shallow, and the tide that enters at the Virginia capes loses much of its height on the way up: near the mouth the range is two to three feet, here barely more than one. For sailors on the Severn, that small rise matters less than the wind, which can raise or lower the bay by a foot or more over a day or two.</p>
<h2>The tide climbs the bay in hours</h2>
<p>The tide wave takes most of a tidal cycle to travel up the Chesapeake, so places a few miles apart turn at different times. NOAA predicts Thomas Point Shoal Light, south of Annapolis, from Baltimore with high water nearly two hours earlier, and the South River at Edgewater about the same; the Magothy River at Mountain Point turns within minutes of Baltimore. Comparing the two reference stations directly, the highs and lows at Annapolis come one to two hours ahead of ${h.a('st:maryland/baltimore', 'Baltimore')}, whose average range is ${h.ft(b.stats.meanRange)}.</p>
<h2>Mixed tide, lopsided days</h2>
<p>The upper bay has a mixed tide: the two highs of a day can differ noticeably, and on some days one of them hardly shows. The lowest predicted low of this period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}; a winter northwest wind on top of it can expose unusual stretches of the creek bottoms. For the ${h.a('state:maryland', 'Maryland coast')}, Ocean City has a true Atlantic tide.</p>`;
  },
  faqs: [
    { q: 'Why does wind matter more than tide in Annapolis?', a: 'Because the tide is small, about a foot on an average day, while sustained wind over the long, shallow Chesapeake can pile water up or push it out by a foot or more. A steady south wind raises the upper bay; a strong northwest wind after a front drains it. The prediction on this page is the astronomical tide only.' },
  ],
});
