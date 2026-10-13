import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'georgia/tybee-island',
  intro: 'NOAA predicts Tybee Light, at the north end of Tybee Island, from Fort Pulaski with high water ten minutes earlier and the same height.',
  body: (h) => {
    const s = h.st('georgia/tybee-island');
    return `
<h2>Savannah's beach at the river mouth</h2>
<p>Tybee Island sits where the Savannah River meets the Atlantic, and its tide is one of the largest on the East Coast south of New England: ${h.ft(s.stats.meanRange)} on an average day, ${h.ft(s.stats.springRange)} on spring tides. The Tybee Light station, near the lighthouse at the island's north end, is computed from the Fort Pulaski gauge, three miles west on Cockspur Island: high water 10 minutes earlier, low water 12 minutes earlier, heights at 99 percent.</p>
<h2>Back River, the creeks and Little Tybee</h2>
<p>At the south end of the island, the Tybee Creek entrance is predicted from Fort Pulaski with high water 9 minutes earlier and low water 5 minutes later. Across the creek lies Little Tybee, a roadless island of marsh and beach reached by boat or kayak. Crossing the creek mouth on a falling tide against wind can be hard work; paddlers often go out on the last of the ebb and come back on the flood.</p>
<h2>The ships and the high tide</h2>
<p>Large container ships pass close to the north beach on their way to the port of Savannah, and their wakes can surge up the beach without warning, especially near high tide. The highest prediction of the period is ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}; the lowest low ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}. For the island across the sound, see ${h.a('st:south-carolina/hilton-head', 'Hilton Head')}.</p>`;
  },
  faqs: [
    { q: 'How big is the tide at Tybee Island?', a: 'Large for the Southeast: over seven feet between low and high on an average day, and more around the new and full moon, because the Georgia Bight’s wide shelf amplifies the Atlantic tide. That range shifts the waterline far across the flat beach and drives strong currents in the Savannah River entrance and the creeks behind the island.' },
  ],
});
