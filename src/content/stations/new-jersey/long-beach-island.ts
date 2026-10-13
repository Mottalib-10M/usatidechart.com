import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'new-jersey/long-beach-island',
  intro: 'The station for Long Beach Island is the Coast Guard station at Barnegat Inlet, at the island’s northern tip.',
  body: (h) => {
    const s = h.st('new-jersey/long-beach-island');
    return `
<h2>The inlet station, and why the bay barely moves</h2>
<p>Barnegat Inlet averages ${h.ft(s.stats.meanRange)} from low to high, already less than the ocean beaches further south. Inside, Barnegat Bay is a long, shallow lagoon connected to the sea mostly through this one narrow inlet, and the tide almost vanishes: NOAA predicts Loveladies Harbor, three miles down the island, from Sandy Hook with high water three hours later and heights at a tenth of Sandy Hook's. Waretown and Forked River on the mainland side get about 7 percent of the range, a few inches.</p>
<p>So on the bay side of Long Beach Island, wind decides the water level more than the moon does. A few days of northeast wind can push water into the bay and flood low streets with no help from the tide; a strong west wind can drain the edges.</p>
<h2>Ocean beach and the inlet current</h2>
<p>On the ocean side, the tide is a normal Atlantic tide, and the inlet jetty at Barnegat Light is a classic place to fish the moving water. Because so much bay drains through so narrow a gap, the current in the inlet is strong in the middle hours of each tide. The lowest low at the inlet this period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}.</p>
<h2>Planning on the bay</h2>
<p>For a launch or a paddle on Barnegat Bay, use the bay stations' small ranges and late times, and watch the wind forecast. The ${h.a('tide-range', 'tide range guide')} explains why inlets and lagoons shrink the tide so much.</p>`;
  },
  faqs: [
    { q: 'Why is there almost no tide in Barnegat Bay behind Long Beach Island?', a: 'The bay is long and shallow and exchanges water with the ocean mainly through narrow Barnegat Inlet, which chokes the tide. NOAA predicts Loveladies Harbor at about a tenth of Sandy Hook’s range, three hours later, and Waretown at 7 percent. Wind often moves the bay level more than the tide does.' },
  ],
});
