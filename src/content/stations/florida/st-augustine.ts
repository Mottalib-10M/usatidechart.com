import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'florida/st-augustine',
  intro: 'The St. Augustine Beach station is on the ocean side of Anastasia Island, across the Matanzas River from the old city.',
  body: (h) => {
    const s = h.st('florida/st-augustine');
    return `
<h2>Ocean beach and the old city's waterfront</h2>
<p>St. Augustine Beach averages ${h.ft(s.stats.meanRange)} from low to high, ${h.ft(s.stats.springRange)} on spring tides. The historic city itself faces the Matanzas River and the inlet, not the ocean: NOAA predicts the city dock from Fernandina Beach with high water 20 minutes earlier and three quarters of the height. The seawall along the bayfront and the Bridge of Lions see a smaller swing than the beach.</p>
<h2>Two inlets, one river</h2>
<p>The Matanzas River runs behind Anastasia Island between two inlets, St. Augustine Inlet to the north and Matanzas Inlet to the south, and NOAA keeps several reference stations along it, at State Road 312, Crescent Beach and the Matanzas Inlet bridge, plus Vilano Beach on the Tolomato to the north. Fort Matanzas, near the southern inlet, is predicted from Fernandina with high water 3 minutes later but low water 49 minutes later, a sign of how slowly the river drains. Boaters on the waterway meet the strongest current near the inlets.</p>
<h2>Low tide on the beach</h2>
<p>At low tide the coquina-tinted sand of the beach widens, and at the north end the inlet's shoals appear. Driving is permitted on some St. Johns County beaches, and drivers have to respect the tide line; check the county's rules before driving onto the sand. The lowest low predicted this period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}. For the coast to the south, see ${h.a('st:florida/daytona-beach', 'Daytona Beach')}.</p>`;
  },
  faqs: [
    { q: 'Is the tide at the St. Augustine city dock the same as at the beach?', a: 'No. The city faces the Matanzas River. NOAA predicts the city dock from Fernandina Beach with high water 20 minutes earlier and about three quarters of the height, while St. Augustine Beach, on the ocean side of Anastasia Island, is a reference station with a larger range. Use the station on the water you are on.' },
  ],
});
