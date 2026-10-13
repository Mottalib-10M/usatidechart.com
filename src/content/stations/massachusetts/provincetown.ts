import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'massachusetts/provincetown',
  intro: 'Provincetown’s station is in the harbor at the tip of Cape Cod, on the Cape Cod Bay side, where the tide runs close to ten feet.',
  body: (h) => {
    const s = h.st('massachusetts/provincetown'), hy = h.st('massachusetts/hyannis');
    return `
<h2>The curl at the end of the Cape</h2>
<p>Provincetown Harbor is the sheltered water inside the hook of Cape Cod, and it shares the large tide of Cape Cod Bay: ${h.ft(s.stats.meanRange)} on an average day, ${h.ft(s.stats.springRange)} at spring tides. Compare that with ${h.ft(hy.stats.meanRange)} at ${h.a('st:massachusetts/hyannis', 'Hyannis')} on the south shore, and the Cape looks like two coasts with two tides.</p>
<p>At low water the harbor's west end shows wide flats, and the long stone breakwater that crosses toward Long Point stands well clear of the water. At high water the same flats are a bay of shallow sea. Those who walk the breakwater go out on a falling tide and return with time to spare: the granite blocks are uneven and the surrounding flats flood quickly once the tide comes back.</p>
<h2>Wellfleet across the bay</h2>
<p>Eleven miles to the southeast, Wellfleet Harbor is predicted by NOAA from Boston with high water 14 minutes later and heights multiplied by 1.05, so its tide is close to Provincetown's in size. Its oyster grants and flats are exposed by the same big lows. The lowest predicted low here is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}.</p>
<h2>Ocean beaches on the back side</h2>
<p>The outer beaches of the Cape, Race Point and the National Seashore, face the open Atlantic rather than the bay. Their tide is smaller and comes at a different time from the harbor's, so the times on this page are for the harbor and the bay shore. For the whole Cape at a glance, see the ${h.a('cape-cod', 'Cape Cod comparison')}.</p>`;
  },
  faqs: [
    { q: 'Can I walk the Provincetown breakwater at high tide?', a: 'The stone breakwater toward Long Point stays above water at ordinary high tides, but the flats around it flood and some blocks get wet and slippery near the top of a big tide. Most people start on a falling tide and finish well before the next high. Check the high time and height for your day on this page before setting out.' },
  ],
});
