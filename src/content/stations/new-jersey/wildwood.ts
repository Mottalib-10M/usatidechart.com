import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'new-jersey/wildwood',
  intro: 'The Wildwood Crest ocean pier station measures the Atlantic tide on one of the widest beaches of the Jersey Shore.',
  body: (h) => {
    const s = h.st('new-jersey/wildwood');
    return `
<h2>A beach that keeps growing</h2>
<p>The Wildwoods are known for an unusually wide beach, built up over decades by sand carried along the shore. On that much flat sand, the ${h.ft(s.stats.meanRange)} of an average tide moves the waterline a long way, and the walk from the boardwalk to the water is noticeably longer at low tide. The station is an ocean pier at Wildwood Crest, a reference station with its own harmonic constants, so the times here apply directly to the beach.</p>
<h2>The back bays run an hour behind</h2>
<p>Behind the island, the sounds and thorofares are fed through Hereford and Cold Spring inlets, and the tide comes late. NOAA predicts Sunset Lake in Wildwood Crest from Atlantic City with high water 52 minutes later, Grassy Sound at West Wildwood 57 minutes later with low water more than an hour behind, and Taylor Sound 55 minutes later. Crabbing from a bay dock, the rising water in the evening can be almost an hour later than on the beach.</p>
<h2>Highs, lows and the boardwalk season</h2>
<p>The highest predicted high of the period is ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}, and the lowest low ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}. For the southern tip of the peninsula, see ${h.a('st:new-jersey/cape-may', 'Cape May')}.</p>`;
  },
  faqs: [
    { q: 'How much later is high tide in the Wildwood back bays than on the beach?', a: 'Roughly an hour. NOAA predicts Sunset Lake from Atlantic City with high water 52 minutes later and Grassy Sound at West Wildwood 57 minutes later, while the ocean pier on this page has its own prediction close to the Atlantic City timing. Low water lags even more in Grassy Sound, about 70 minutes.' },
  ],
});
