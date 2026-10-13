import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'connecticut/new-haven',
  intro: 'The New Haven Reach station is inside New Haven Harbor on the north shore of Long Island Sound.',
  body: (h) => {
    const s = h.st('connecticut/new-haven'), m = h.st('connecticut/mystic');
    return `
<h2>Long Island Sound grows toward the west</h2>
<p>New Haven Harbor averages ${h.ft(s.stats.meanRange)} from low to high, more than twice the ${h.ft(m.stats.meanRange)} of ${h.a('st:connecticut/mystic', 'Mystic')} near the eastern end of the Sound. Long Island Sound is a long basin closed at its western end by the narrow East River, and the tide entering from the east grows as it travels west, reaching its largest range toward Stamford and Greenwich. New Haven sits partway along that slope.</p>
<p>Around the harbor, NOAA predicts its secondary stations from Bridgeport rather than from this gauge: Lighthouse Point at the harbor mouth runs four minutes ahead of Bridgeport at 91 percent of its high-water height, Branford five minutes ahead, Milford Harbor and Gulf Beach a few minutes ahead with similar heights. Up the Housatonic, Shelton lags Bridgeport by about three quarters of an hour.</p>
<h2>Beaches and marsh</h2>
<p>At Lighthouse Point Park and along the shore toward West Haven, the tide uncovers rocky ledges and a muddy, shelly beach at low water, the time to look for crabs and shells. The lowest low of the period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}. Shoreline roads in the area flood on the highest tides when a storm pushes water west into the Sound; the highest prediction here is ${h.ft(s.stats.maxHigh.h)} on ${h.date(s.stats.maxHigh.date)}.</p>`;
  },
  faqs: [
    { q: 'Why is the tide bigger in New Haven than in eastern Connecticut?', a: 'Because the tide wave entering Long Island Sound from the east grows as it moves west into a basin that is almost closed at the New York end. New Haven averages over six feet, while Mystic near the eastern entrance averages under three. The largest ranges in the Sound are near Stamford and Greenwich.' },
  ],
});
