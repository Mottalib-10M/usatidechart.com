import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'florida/miami',
  intro: 'Government Cut, the ship channel between Miami Beach and Fisher Island, is the reference tide station NOAA uses for much of Southeast Florida.',
  body: (h) => {
    const s = h.st('florida/miami');
    return `
<h2>The cut that sets South Florida's clock</h2>
<p>Government Cut was dug more than a century ago to give Miami's port a straight channel to the sea, and its gauge has become the base for tide predictions from Palm Beach to the upper Keys. The tide here is small and regular: ${h.ft(s.stats.meanRange)} on an average day, two highs of nearly equal height. South Beach's ocean shore, just north, follows almost the same times.</p>
<h2>Biscayne Bay turns later</h2>
<p>West of the cut, Biscayne Bay fills slowly through the cut and the channels between the keys. NOAA predicts Fishermans Channel at Dodge Island 34 minutes later, San Marino Island in the Venetian Causeway islands 37 minutes later, the Key Biscayne Yacht Club 44 minutes later and Dinner Key Marina in Coconut Grove 54 minutes later at high water; low water lags even more, up to 108 minutes at Dinner Key. Paddlers and boaters in the bay should use those times.</p>
<h2>Miami Beach and the king tides</h2>
<p>Miami Beach is one of the most watched places in the country for high-tide flooding: in autumn, when the highest tides meet the seasonal rise of sea level, water comes up through the storm drains of low streets on the bay side. The city has raised roads and installed pumps. The highest prediction this period is ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}; the lowest low ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}. See ${h.a('st:florida/fort-lauderdale', 'Fort Lauderdale')} to the north.</p>`;
  },
  faqs: [
    { q: 'Is high tide later in Biscayne Bay than at Miami Beach?', a: 'Yes. The bay fills through Government Cut and the channels, so NOAA predicts Dodge Island 34 minutes after Government Cut at high water, the Key Biscayne Yacht Club 44 minutes after and Dinner Key 54 minutes after, with low water lagging up to almost two hours. Ocean beaches near the cut follow it closely.' },
  ],
});
