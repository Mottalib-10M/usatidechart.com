import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'massachusetts/nantucket',
  intro: 'The Nantucket station is in the island’s harbor on the north shore, opening onto Nantucket Sound.',
  body: (h) => {
    const s = h.st('massachusetts/nantucket');
    return `
<h2>An island with a modest tide</h2>
<p>Nantucket Harbor rises and falls ${h.ft(s.stats.meanRange)} on an average day and ${h.ft(s.stats.springRange)} on spring tides, a gentle tide by New England standards. Around the island, NOAA predicts its secondary stations from the distant Boston gauge with heavy height corrections: Great Point at the northern tip at 32 percent of Boston's range, Eel Point on the west end at 24 percent, Muskeget Island at 21 percent. The water level hardly moves there, but the currents over the shoals are strong.</p>
<h2>Jetties, harbor flats and Coatue</h2>
<p>Two stone jetties guard the harbor entrance, and inside, the harbor stretches east toward Wauwinet behind the long sand arm of Coatue. At low tide the shallow edges of the harbor and the flats off the beaches near town are exposed, the time for shell hunting and for wading the shallows. The lowest low predicted this period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}.</p>
<h2>South shore surf</h2>
<p>The beaches of the south shore face the open Atlantic swell, not the sound, and there the waves matter far more than the tide for a swim. The harbor times on this page are the useful ones for boats, ferries landing in town and the north-shore beaches. For the mainland end of the ferry crossing, see ${h.a('st:massachusetts/hyannis', 'Hyannis')}.</p>`;
  },
  faqs: [
    { q: 'Is the tide the same all around Nantucket island?', a: 'No. NOAA predicts the island’s secondary stations from Boston with different corrections: Great Point at 32 percent of Boston’s range and about 43 minutes later, Eel Point at 24 percent. The harbor, on this page, is the reference for town and the north shore. On the south shore, surf and swell matter more than the small tide.' },
  ],
});
