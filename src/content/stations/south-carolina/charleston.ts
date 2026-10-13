import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'south-carolina/charleston',
  intro: 'The Customhouse Wharf station on the Cooper River is Charleston Harbor’s reference gauge and the base for predictions along much of the South Carolina coast.',
  body: (h) => {
    const s = h.st('south-carolina/charleston');
    return `
<h2>The harbor where rivers meet the sea</h2>
<p>Charleston Harbor is the meeting point of the Ashley and Cooper rivers, and its gauge on the Cooper River waterfront has a long record. The average day here moves ${h.ft(s.stats.meanRange)} between low and high. Around the harbor the tide is nearly uniform: NOAA predicts Fort Sumter two minutes later, Shem Creek in Mount Pleasant two minutes earlier, the South Ashley bridge four minutes later, Hobcaw Point 19 minutes later and Wappoo Creek 22 minutes later, all within a few percent of the height.</p>
<h2>Sunny-day flooding downtown</h2>
<p>Charleston is one of the US cities where the highest tides of the year push water into streets: low parts of the peninsula, built on filled marsh, drain into the harbor through outfalls that back up when the tide is high. On king tide days the water rises from the storm drains even without rain. The highest prediction this period is ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}; add an onshore wind or a downpour and the flooding grows. The ${h.a('king-tides', 'king tides guide')} explains those dates.</p>
<h2>Marsh, creeks and the low tide</h2>
<p>At low tide the marsh creeks around the harbor drain to mud banks and oyster beds, and the pluff mud smell of the Lowcountry is strongest. The lowest predicted low of the period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}. Kayakers on the creeks ride the flood in and the ebb out. For the beach, see ${h.a('st:south-carolina/folly-beach', 'Folly Beach')}.</p>`;
  },
  faqs: [
    { q: 'Why does Charleston flood at high tide on sunny days?', a: 'Low parts of the peninsula sit on old filled marsh, and their storm drains empty into the harbor. When a king tide raises the harbor high enough, water comes back up through the drains into the streets, with no rain at all. Higher sea level makes these days more frequent, and wind or rain on a high tide makes them worse.' },
  ],
});
