import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'new-jersey/cape-may',
  intro: 'The Cape May ferry terminal station sits on the Cape May Canal at the mouth of Delaware Bay, at the southern tip of New Jersey.',
  body: (h) => {
    const s = h.st('new-jersey/cape-may');
    return `
<h2>Two waters meet at the cape</h2>
<p>Cape May faces the Atlantic on one side and Delaware Bay on the other, and NOAA predicts its secondary stations from both sides. Sunset Beach at Cape May Point and North Highlands Beach on the bay shore are computed from Lewes, Delaware, across the bay mouth, with heights 16 to 26 percent larger. Cape May Harbor, the Atlantic beachfront and Cape Island Creek are computed from Atlantic City, with high water about 35 to 40 minutes later and heights around 10 percent larger. The ferry terminal station on this page averages ${h.ft(s.stats.meanRange)} from low to high.</p>
<h2>Sunset Beach and the bay side</h2>
<p>On the bay side the beaches slope gently and the tide uncovers more sand at low water; the stones known as Cape May diamonds wash up at Sunset Beach, where the old concrete ship lies just offshore. At low tide more of the hull shows. The lowest predicted low this period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}.</p>
<h2>The rips at the mouth of the bay</h2>
<p>Water moving in and out of Delaware Bay crosses the shoals off the cape, where the tidal current meets ocean swell. Boaters crossing to Lewes and anglers fishing the rips plan on the current more than the height. For the Atlantic beaches of the island, the ${h.a('st:new-jersey/wildwood', 'Wildwood')} station is close in timing, and the ${h.a('st:delaware/lewes', 'Lewes')} page shows the other side of the bay.</p>`;
  },
  faqs: [
    { q: 'Which tide station should I use for Cape May Point and Sunset Beach?', a: 'Sunset Beach is a NOAA secondary station predicted from Lewes, Delaware, with high water five minutes earlier and heights 16 percent larger. The ferry terminal station on this page is close by on the canal and gives very similar times; for the Atlantic beaches of Cape May, NOAA uses Atlantic City with high water about 34 minutes later.' },
  ],
});
