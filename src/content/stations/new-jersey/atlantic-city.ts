import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'new-jersey/atlantic-city',
  intro: 'The Atlantic City ocean station, on Absecon Island, is the reference NOAA uses for much of the southern New Jersey coast.',
  body: (h) => {
    const s = h.st('new-jersey/atlantic-city');
    return `
<h2>The ocean reference for the southern shore</h2>
<p>NOAA's ocean station at Atlantic City has a long record and serves as the reference for dozens of secondary stations, from Brigantine to Cape May. On an ordinary day the ocean here moves ${h.ft(s.stats.meanRange)} between low and high, and ${h.ft(s.stats.springRange)} around the new and full moon. Ventnor's ocean pier, three and a half miles down the beach, has its own reference station with a very similar tide.</p>
<h2>Absecon Inlet and the thorofares</h2>
<p>Behind the casinos and the boardwalk, the island is ringed by channels and marsh, and the tide inside lags the ocean. NOAA predicts the Absecon Channel at the Route 87 bridge 38 minutes later, Brigantine Channel at Hoffman Thorofare almost an hour later, Dock Thorofare on Risley Channel 55 minutes later, and Absecon Creek at the Route 30 bridge about an hour and a half later. On the bay side of town, the high you see from a dock can be an hour behind the beach.</p>
<h2>Flooding on the bay side</h2>
<p>Low streets on the bay side of Absecon Island take water on the highest tides, more so when a northeast wind holds the water in. The top prediction for this period is ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}; the ${h.a('king-tides', 'king tides guide')} explains why those dates gather around the new and full moons near perigee. The lowest low is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}.</p>`;
  },
  faqs: [
    { q: 'How late is high tide on the bay side of Atlantic City?', a: 'Between about 40 minutes and an hour and a half after the ocean, depending on the channel. NOAA predicts the Absecon Channel at the Route 87 bridge 38 minutes after the ocean station, Dock Thorofare 55 minutes after, and Absecon Creek at the Route 30 bridge 88 minutes after. Use the station nearest your dock.' },
  ],
});
