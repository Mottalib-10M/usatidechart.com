import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'california/san-diego',
  intro: 'The San Diego tide gauge stands at the Broadway Pier on the downtown waterfront, inside San Diego Bay, and NOAA uses it as the reference for the bay and the nearby ocean shore.',
  body: (h) => {
    const s = h.st('california/san-diego'), lj = h.st('california/la-jolla');
    return `
<h2>A bay gauge for a city of ocean beaches</h2>
<p>Most people who look up San Diego tides are heading for sand that faces the Pacific: Ocean Beach, Mission Beach, Pacific Beach, Coronado or La Jolla. This station is none of those. It sits on the protected water of San Diego Bay, behind Point Loma and North Island, where the downtown piers and the Navy docks are. The good news is that the bay entrance is wide and deep, so the tide inside keeps almost the same rhythm as the open coast. NOAA predicts Point Loma from this gauge with high water 9 minutes earlier and heights at 92 percent, Imperial Beach with the same high-water time and heights at 93 percent, and Quivira Basin in Mission Bay 5 minutes later at 95 percent. For a beach plan, these few minutes rarely matter.</p>
<h2>Why the downtown range runs a little larger</h2>
<p>Water funneling into a long bay piles up slightly toward its inner reaches, so the average day here spans ${h.ft(s.stats.meanRange)}, against ${h.ft(lj.stats.meanRange)} at the Scripps Pier in ${h.a('st:california/la-jolla', 'La Jolla')}, the true ocean reference of the county. The pattern is the Pacific one: a higher high and a lower high, a deeper low and a shallower low, with the deepest lows of winter falling in the afternoon and those of late spring and summer in the dark hours before dawn. Spring tides open the range to ${h.ft(s.stats.springRange)}; at the quarter moons it closes to ${h.ft(s.stats.neapRange)}.</p>
<h2>Reading this page for the rocky shore</h2>
<p>San Diego's tide pools are on the open coast, on the rock benches of Point Loma and around La Jolla, not along the bay. They show their lower zones only when the water drops below the chart zero, and a swell can wash over a bench even at a good low. Take the time of the low from this page, arrive an hour before it, and keep the ocean in view: waves on this coast come in sets, and the quiet between them can be long. The ${h.a('negative-low-tides', 'negative low tide calendar')} lists the mornings and afternoons worth the trip.</p>`;
  },
  faqs: [
    { q: "Can I use the San Diego Bay tide for Ocean Beach or Coronado?", a: "Yes, with a small margin. NOAA predicts the open-coast stations near San Diego from the Broadway gauge with differences of only a few minutes and heights about 5 to 8 percent smaller, because the bay entrance lets the ocean tide in freely. Surf and swell change the waterline on those beaches far more than that gap, so add a cushion of half an hour around a low." },
  ],
});
