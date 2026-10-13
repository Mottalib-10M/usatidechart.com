import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'massachusetts/gloucester',
  intro: 'Gloucester Harbor on Cape Ann has its own reference station, the tide for the fishing port and the beaches around it.',
  body: (h) => {
    const s = h.st('massachusetts/gloucester');
    return `
<h2>Cape Ann's working harbor</h2>
<p>Gloucester's inner harbor rises and falls ${h.ft(s.stats.meanRange)} on an ordinary day. For a port where boats tie up to fixed wharves, that means long ladders at low water and decks level with the pier at high water, and lines adjusted with the tide. The predictions here come from harmonic constants measured at the harbor gauge, so they describe Gloucester itself, not a neighboring port with a correction.</p>
<h2>The Annisquam and Good Harbor</h2>
<p>Cape Ann is almost an island: the Annisquam River and the Blynman Canal cut it off from the mainland, and NOAA keeps separate stations at Annisquam (Lobster Cove) and at Rockport on the other side of the cape. Water moves through the canal with each tide, and the river's sandbars at Wingaersheek and the mouth of the Annisquam appear and vanish with it. At low tide, the beaches on the Ipswich Bay side open onto wide flats; at high tide they shrink to a strip of sand.</p>
<p>East of the harbor, Good Harbor Beach has a small island reachable on foot across the sand at low water. As with any tidal crossing, the way back floods first: watch the time of the low on the curve above and be back before it turns.</p>
<h2>When the water is lowest and highest</h2>
<p>The lowest predicted low of the period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}; the highest high, ${h.ft(s.stats.maxHigh.h)}, comes on ${h.date(s.stats.maxHigh.date)}. Compare with ${h.a('st:massachusetts/boston', 'Boston')}, across Massachusetts Bay, which has a very similar tide.</p>`;
  },
  faqs: [
    { q: 'When can you walk to Salt Island from Good Harbor Beach in Gloucester?', a: 'Only around low tide, when the sand between the beach and the island is uncovered. The tide in Gloucester averages more than nine feet, so the crossing floods quickly once the water turns. Check the low time for your day on this page, go out early and come back before the turn. Low tides near the new and full moon give the longest window.' },
  ],
});
