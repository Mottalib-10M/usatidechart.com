import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'florida/fort-lauderdale',
  intro: 'The Fort Lauderdale station is on the Intracoastal Waterway at South Port Everglades, near the inlet between the city and Hollywood.',
  body: (h) => {
    const s = h.st('florida/fort-lauderdale');
    return `
<h2>A canal city on a small, even tide</h2>
<p>Fort Lauderdale averages ${h.ft(s.stats.meanRange)} between low and high, with two highs and two lows of almost the same height every day. That evenness is typical of the Southeast Florida coast. For the city's hundreds of miles of canals, lined with docks and seawalls, the tide sets the clearance under bridges and the depth at the docks twice a day.</p>
<h2>Every canal has its own lag</h2>
<p>NOAA predicts dozens of points around Port Everglades from Miami's Government Cut. The turning basin runs 29 minutes ahead of Government Cut, Whiskey Creek's north end 23 minutes ahead. Bahia Mar Yacht Club, on the Intracoastal near Las Olas, is close in high-water time but has low water 33 minutes later. Mayan Lake, a mile and a half north, turns 20 minutes after Government Cut at high water and an hour after at low water, and Hollywood's West Lake more than an hour after. The deeper into the canals, the later and more lopsided the tide.</p>
<h2>King tides on Las Olas</h2>
<p>Fort Lauderdale's low streets, especially near the Las Olas Isles, flood during the autumn king tides, when the highest predicted tides of the year meet a seasonally high sea level. The highest prediction this period is ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}. The ${h.a('king-tides', 'king tides guide')} explains the season; the ${h.a('st:florida/miami', 'Miami page')} gives the Government Cut reference.</p>`;
  },
  faqs: [
    { q: 'Why do Fort Lauderdale streets flood in October?', a: 'Because the year’s highest astronomical tides in South Florida often fall in early autumn, when sea level along the coast is also seasonally high. Low streets near canals and the Intracoastal, like parts of the Las Olas Isles, take water from storm drains and over seawalls. Wind and rain make it worse.' },
  ],
});
