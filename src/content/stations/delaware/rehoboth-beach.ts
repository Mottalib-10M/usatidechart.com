import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'delaware/rehoboth-beach',
  intro: 'NOAA predicts Rehoboth Beach from the Ocean City, Maryland, fishing pier, with high water 15 minutes later and somewhat larger heights.',
  body: (h) => {
    const s = h.st('delaware/rehoboth-beach');
    return `
<h2>An ocean town predicted from Maryland</h2>
<p>Rehoboth Beach has no reference gauge of its own. NOAA takes the Ocean City fishing pier, about 27 miles down the coast, adds 15 minutes to high water and 8 to low water, and multiplies the heights by 1.13 at high water and 1.33 at low water. The result, an average day of ${h.ft(s.stats.meanRange)} from low to high, is the tide of the open ocean beach in front of the boardwalk. Between those highs and lows, the curve here follows the shape of the Ocean City reference.</p>
<h2>Lakes and inlets around town</h2>
<p>Silver Lake and Lake Gerar inside town are not tidal; the tide of the region enters the land through Indian River Inlet, seven and a half miles south, and through the mouth of Delaware Bay to the north. ${h.a('st:delaware/lewes', 'Lewes')}, on the bay, turns roughly 45 minutes to an hour later than Rehoboth. Indian River Inlet has its own reference station, and its current is notoriously strong, a place for experienced boaters.</p>
<h2>Low tide on the boardwalk beach</h2>
<p>The beach in front of the boardwalk is narrow in places, and a high tide on an onshore wind can push the swash close to the dune fence. The lowest predicted low of the period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}, and the highest high ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}. Rip currents can form at any tide; the ${h.src('rip_currents', 'National Weather Service rip current page')} explains the signs.</p>`;
  },
  faqs: [
    { q: 'Where does the Rehoboth Beach tide prediction come from?', a: 'NOAA computes it from the Ocean City, Maryland, fishing pier, adding 15 minutes to high water and 8 minutes to low water and scaling heights by 1.13 at high water and 1.33 at low water. The curve on this page follows the shape of the Ocean City reference between those predicted highs and lows.' },
  ],
});
