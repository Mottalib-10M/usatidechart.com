import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'maine/old-orchard-beach',
  intro: 'NOAA predicts Old Orchard Beach from the Portland harbor gauge, with the same high-water time and 97 percent of the height.',
  body: (h) => {
    const s = h.st('maine/old-orchard-beach');
    return `
<h2>Seven miles of flat sand and a big tide</h2>
<p>Old Orchard Beach is a long, nearly flat strand on Saco Bay, and that shape turns the vertical tide into a very wide horizontal one. With ${h.ft(s.stats.meanRange)} between high and low on a typical day, the waterline travels a long way across the sand in six hours: towels spread close to the water at low tide are in the swash by mid-afternoon of a rising tide. The best time for a long walk on hard, wet sand is the two hours either side of the low.</p>
<p>This is a subordinate station. NOAA does not run a gauge here; it takes the Portland prediction, keeps the high-water time, moves the low six minutes earlier and multiplies the heights by 0.97. Between those highs and lows, the curve on this page follows the shape of Portland's hourly prediction.</p>
<h2>Saco River and Scarborough marsh</h2>
<p>The beach sits between two tidal rivers. To the south, Camp Ellis at the mouth of the Saco River and Biddeford upriver have their own NOAA stations, and so does Pine Point on the Scarborough River to the north. Inside those rivers the water turns later than on the open beach and the current at the mouth can be strong in the middle of the ebb, which matters more to paddlers and anglers than the exact height.</p>
<h2>Cold water, wide flats</h2>
<p>On the lowest tides of the year, ${h.ft(s.stats.minLow.h)} predicted for ${h.date(s.stats.minLow.date)}, the beach is at its widest. Sand bars uncovered at low tide are cut by runnels that fill first when the tide turns: cross them early on a rising tide, not late. The ${h.a('st:maine/portland', 'Portland page')} gives the harbor tide this one is built from.</p>`;
  },
  faqs: [
    { q: 'Is the Old Orchard Beach tide the same as Portland?', a: 'Nearly. NOAA predicts Old Orchard Beach from the Portland gauge: high water at the same minute, low water six minutes earlier, heights at 97 percent. On an average day that is a few inches less range than Portland. Wind from the east can still push the real water higher than either prediction during a storm.' },
  ],
});
