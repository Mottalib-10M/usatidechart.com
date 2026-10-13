import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'virginia/chincoteague',
  intro: 'The station for Chincoteague is at the south end of Chincoteague Channel, between the island and Assateague.',
  body: (h) => {
    const s = h.st('virginia/chincoteague');
    return `
<h2>An island between two tides</h2>
<p>Chincoteague lies behind Assateague Island, and its waters are a web of channels, bays and marsh. The station at the south end of Chincoteague Channel averages ${h.ft(s.stats.meanRange)} from low to high. On the ocean beach of Assateague, at Toms Cove, NOAA predicts a larger and earlier tide: from the Ocean City fishing pier, with high water 35 minutes later and heights 8 to 25 percent larger. The beach visitors drive out to is on a different tide from the town's docks.</p>
<h2>The back of the island runs hours late</h2>
<p>On the north and west sides of the island the tide arrives late and small. NOAA predicts Lewis Creek from the Ocean City pier with high water 77 minutes later, Oyster Bay 104 minutes later and Blake Cove almost two hours later, with high-water heights between a quarter and a half of the pier's. A kayak trip in the marsh can find the water still rising long after the beach has turned.</p>
<h2>Clamming and crabbing on the flats</h2>
<p>The shallow bays around Chincoteague are clam and crab country, and the low tide sets the day: the lowest predicted low of this period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}. Marsh channels can drain to mud at low water, so plan the return of a paddle on a rising tide. The ${h.a('negative-low-tides', 'negative low tides guide')} explains which days uncover the most.</p>`;
  },
  faqs: [
    { q: 'Is the tide on Assateague beach the same as in Chincoteague?', a: 'No. The ocean beach at Toms Cove on Assateague is predicted by NOAA from the Ocean City fishing pier with high water 35 minutes later and a larger range, while the channels and coves of Chincoteague run later and smaller; Oyster Bay, for example, is predicted 104 minutes after the pier with less than half its height.' },
  ],
});
