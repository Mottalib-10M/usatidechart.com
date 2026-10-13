import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'texas/port-aransas',
  intro: 'Port Aransas sits at the north tip of Mustang Island on Aransas Pass, the inlet that carries the Corpus Christi ship channel to the Gulf, and its NOAA gauge lies on the channel side of town.',
  body: (h) => {
    const s = h.st('texas/port-aransas');
    return `
<h2>A small tide in a busy pass</h2>
<p>${h.ft(s.stats.meanRange)} on an average day is a small tide even by Texas standards. The gauge reads the channel inside the jetties rather than the surf, so it tracks the water that boats in the harbor actually float on. On ${Math.round(s.stats.oneHighShare * 100)}% of days a single high stands out; on the others a second, weaker bump appears, often too small to notice from a dock. Near its strongest the daily swing grows to about ${h.ft(s.stats.springRange)}, and at its weakest it nearly stalls.</p>
<h2>Three gauges, three settings</h2>
<p>NOAA keeps a second station at the H. Caldwell Pier, a mile and a half southeast on the Gulf beach of Mustang Island, which is the better reference for anyone fishing or walking the surf. Another sits on the pass itself, about two miles east, and a third farther in at Conn Brown Harbor, the town of Aransas Pass's harbor on the mainland side of Redfish Bay. All are primary stations with their own predictions. If you are on the beach, open the pier station; on the channel, this one; in the bays toward Ingleside, the inner gauges.</p>
<h2>Water that obeys the wind</h2>
<p>On a tide this small, the forecast often matters more than the moon. Persistent southeast winds through spring and summer lift the level in the bays behind Mustang Island; a winter cold front with strong north winds pushes water out through the pass, sometimes enough to expose flats that are normally covered. The highest prediction of the period here, ${h.ft(s.stats.maxHigh.h)} on ${h.date(s.stats.maxHigh.date)}, is easily topped by a tropical system or a long onshore blow. Current in the pass can be strong whatever the tide height. None of these tables is for navigation, and the ${h.a('fishing-tides', 'fishing tides guide')} discusses how anglers read moving water; ${h.a('st:texas/corpus-christi', 'Bob Hall Pier')} gives the open-beach tide farther south.</p>`;
  },
  faqs: [
    { q: 'Is the Port Aransas tide the same on the beach and in the channel?', a: 'Not quite: they are two different gauges. The Port Aransas station on this page reads the channel side of town, while NOAA keeps a separate station at the H. Caldwell Pier on the Gulf beach of Mustang Island. The channel gauge averages only about a foot of daily range, and on this part of Texas a front or a long southeast breeze can shift the level by as much as the tide.' },
  ],
});
