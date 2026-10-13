import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'texas/corpus-christi',
  intro: 'The Corpus Christi times come from Bob Hall Pier, on the Gulf beach of Padre Island southeast of the city, not from Corpus Christi Bay.',
  body: (h) => {
    const s = h.st('texas/corpus-christi');
    return `
<h2>A city name on an island beach</h2>
<p>${h.ft(s.stats.meanRange)} of average range is what the surf at Bob Hall Pier sees, and it is the figure people usually mean when they look up Corpus Christi tides for the beach. The city itself fronts Corpus Christi Bay, a broad, shallow bay that the Gulf reaches through the passes at Port Aransas and Packery Channel, and the bay's tide is muted next to the open shore. NOAA keeps a separate primary gauge at the Naval Air Station on the bay, about nine and a half miles northwest of the pier; for docks, the bayfront and the bay side of Flour Bluff, that is the one to read.</p>
<h2>Packery Channel and the Laguna Madre</h2>
<p>Just under four miles north of the pier, Packery Channel cuts between Mustang Island and Padre Island and has its own gauge. Behind Padre Island stretches the Laguna Madre, a long, very shallow lagoon with only a few openings to the Gulf. Its tide is a small fraction of the beach tide, and across much of it the wind sets the water level far more than any astronomical force. Wade fishing on the flats of the Laguna Madre runs on the wind forecast first and the tide table a distant second.</p>
<h2>Driving the beach on a falling tide</h2>
<p>Padre Island's beach is open to vehicles along much of its length, and the hard-packed sand closest to the water is widest a couple of hours either side of low tide. On ${s.stats.negativeLowDays} days of the period the water falls below the chart datum. A strong onshore wind can drive the swash up to the soft sand even on a modest tide, so check the forecast before planning a drive. The ${h.a('beach-walk-planner', 'beach walk planner')} finds the low-water windows, and ${h.a('st:texas/south-padre-island', 'South Padre Island')} covers the southern end of the same barrier chain.</p>`;
  },
  faqs: [
    { q: 'Why are Corpus Christi tide times taken from Bob Hall Pier?', a: 'Because the pier, on the Gulf beach of Padre Island, is where most people meet the tide around Corpus Christi, and it reads the open Gulf directly. The bay in front of the city has a smaller tide and its own NOAA gauge at the Naval Air Station. Use the pier for the beach and the surf, and the bay station for the city waterfront.' },
  ],
});
