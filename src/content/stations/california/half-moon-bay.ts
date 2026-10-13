import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'california/half-moon-bay',
  intro: 'Pillar Point Harbor, behind its breakwater at the north end of Half Moon Bay, holds the NOAA reference gauge for the San Mateo County coast.',
  body: (h) => {
    const s = h.st('california/half-moon-bay'), gg = h.st('california/san-francisco');
    return `
<h2>Pillar Point and the open coast</h2>
<p>Half Moon Bay is the crescent of beach that curves south from Pillar Point, the headland that shields the harbor at Princeton from the northwest swell. Outside that headland the reef runs out toward deep water, and the big-wave break of Mavericks lies offshore. Inside the breakwater the gauge records a tide of ${h.ft(s.stats.meanRange)} on an average day, ${h.ft(s.stats.springRange)} at spring tides. That is the tide of the open Pacific, a little smaller than the ${h.ft(gg.stats.meanRange)} measured at the ${h.a('st:california/san-francisco', 'Golden Gate')}, and it holds with little change along the coast from Pacifica to the beaches south of town.</p>
<h2>Over the hill, a different bay</h2>
<p>The NOAA stations closest to this one on a map are not on this coast at all. They lie on the San Francisco Bay shore of the peninsula, ten to twelve miles away over the ridge, and their water reaches them the long way, through the Golden Gate. NOAA predicts Coyote Point Marina from the Golden Gate gauge with high water 42 minutes later, low water 68 minutes later and highs at 129 percent; Point San Bruno is 38 minutes later at high water. Someone who launches on the bay in the morning and walks the Half Moon Bay beach in the afternoon is dealing with two separate schedules, and the bay side can be close to an hour behind.</p>
<h2>The reef flats north of the harbor</h2>
<p>Just north of Pillar Point, at Moss Beach, the Fitzgerald Marine Reserve protects a broad, flat reef that comes out of the water on the lower tides. On ${s.stats.negativeLowDays} days of the prediction period at least one low falls below the chart zero. The ${h.a('negative-low-tides', 'list of negative low tides')} sorts them by depth and by daylight.</p>`;
  },
  faqs: [
    { q: "Is the tide at Half Moon Bay the same as on San Francisco Bay?", a: "No. Half Moon Bay is on the open ocean, while the bay shore of the peninsula, only a few miles east over the hills, fills through the Golden Gate. NOAA predicts Coyote Point from the Golden Gate gauge about 40 minutes later at high water and about an hour later at low water, with taller highs. Use this page for the coast and a bay station for the bay." },
  ],
});
