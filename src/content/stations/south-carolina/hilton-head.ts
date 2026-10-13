import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'south-carolina/hilton-head',
  intro: 'NOAA predicts Port Royal Plantation, on the ocean side of Hilton Head Island, from the Fort Pulaski gauge at the mouth of the Savannah River.',
  body: (h) => {
    const s = h.st('south-carolina/hilton-head');
    return `
<h2>A big tide on a wide beach</h2>
<p>Hilton Head's beaches face the Atlantic at the bottom of the Georgia Bight, where the tide is among the largest on the southeastern coast: ${h.ft(s.stats.meanRange)} on an average day, ${h.ft(s.stats.springRange)} on spring tides. The station at Port Royal Plantation, near the island's north end, is computed from Fort Pulaski: high water one minute later, low water 11 minutes earlier, high-water heights at 88 percent. On a beach this flat, low tide exposes a broad expanse of hard-packed sand, which is why the island is known for cycling on the beach.</p>
<h2>Broad Creek, Skull Creek and Calibogue Sound</h2>
<p>Inside the island, the tide arrives later. NOAA predicts Broad Creek, which cuts deep into the island, from Fort Pulaski with high water 33 minutes later and heights 8 percent larger, and the south entrance of Skull Creek 34 minutes later. Pinckney Island on Mackay Creek runs 36 minutes later. The marinas and creek ramps follow those times rather than the beach's. Skull Creek's north entrance has its own reference station.</p>
<h2>Dolphins and the falling tide</h2>
<p>In the creeks around the island, falling tides concentrate fish in the channels, and the bottlenose dolphins of the Lowcountry take advantage of it. Shell hunters prefer the hour around low water on the beach, especially on the lowest days: ${h.ft(s.stats.minLow.h)} is predicted for ${h.date(s.stats.minLow.date)}. See ${h.a('st:georgia/tybee-island', 'Tybee Island')} across Calibogue Sound and the Savannah River.</p>`;
  },
  faqs: [
    { q: 'Why is the beach at Hilton Head so wide at low tide?', a: 'Because the beach is very flat and the tide is large, more than six feet on an average day. As the water drops, it uncovers a broad strip of firm, wet sand, wide enough for walking and cycling. The widest beach comes in the hour around low tide on days near the new and full moon, when the range is biggest.' },
  ],
});
