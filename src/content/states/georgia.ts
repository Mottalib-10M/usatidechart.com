import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const ty = K.st('georgia/tybee-island'), ss = K.st('georgia/st-simons-island');

export default defineState({
  state: 'georgia',
  title: 'Georgia Tides 2026: Tybee Island and St. Simons Tide Charts',
  description: 'Georgia tides today: tide charts for Tybee Island and St. Simons Island, with 7-day high and low tide times, coefficient, sunrise and solunar periods. 2026.',
  intro: 'Two stations on the shortest stretch of the Southeast coast, and the one with the largest tide.',
  resume: `Georgia has only about a hundred miles of Atlantic coastline, but its tide is the largest between New England and Alaska's Pacific coast: ${K.ft(ty.stats.meanRange)} on an average day at Tybee Island and ${K.ft(ss.stats.meanRange)} at St. Simons Island, with spring tides near ${K.ft(ty.stats.springRange)}. The coast sits at the back of the Georgia Bight, a curve of the shoreline from Cape Hatteras to Cape Canaveral where the continental shelf is wide and shallow, and the Atlantic tide grows as it crosses it. The tide is semidiurnal, two highs and two lows a day of similar size. Behind the barrier islands lie some of the largest salt marshes on the East Coast, flooded and drained by that tide twice a day. Pick a station in the tool above for today's curve, or open its page for seven days, extremes and a planner.`,
  featured: 'georgia/tybee-island',
  body: (h) => `
<h2>The Georgia Bight</h2>
<p>From the Carolinas to north Florida, the coast bends inward and the continental shelf widens to more than seventy miles in places. The tide wave slows and grows over the shallow shelf, so the range peaks in the middle of the bight, on the Georgia coast. ${h.a('st:georgia/tybee-island', 'Tybee Island')} and ${h.a('st:georgia/st-simons-island', 'St. Simons')} have more than double the range of Miami or the northern Outer Banks.</p>
<h2>Marshes of Glynn and the sea islands</h2>
<p>Behind the sea islands, Cumberland, Jekyll, St. Simons, Sapelo, St. Catherines, Ossabaw, Wassaw, Tybee, lie wide marshes laced with creeks. At low tide the creeks drain to mud banks and oyster reefs; at high tide the grass is under water. NOAA predicts dozens of creek and river stations from Fort Pulaski at the mouth of the Savannah, with high water up to an hour later inland.</p>
<h2>Big tides, strong currents</h2>
<p>A seven-foot tide moving through narrow sounds makes strong currents. The channels between the islands run hard in the middle of the tide, and swimmers near the sound beaches, such as the north end of Tybee or the south tip of St. Simons, should stay away from the channel edges. The ${h.a('beach-walk-planner', 'low tide planner')} helps for walks on the wide beaches.</p>
<h2>Savannah and the river</h2>
<p>The Savannah River carries the tide well inland past the city, and the port's ship channel is maintained deep enough for large container ships to come and go on most stages of the tide. For small boats on the river and in the creeks off it, the current matters more than the height, and it runs strongly on both the flood and the ebb.</p>`,
  faqs: [
    { q: 'Why does Georgia have such big tides?', a: 'The Georgia coast lies at the back of the Georgia Bight, where the continental shelf is wide and shallow. The Atlantic tide wave slows and grows as it crosses it, so Tybee and St. Simons average around seven feet between low and high, more than double Miami or the northern Outer Banks.' },
    { q: 'Is the tide later in the Georgia marshes than on the beach?', a: 'Yes. The water has to travel up the sounds and creeks, so high water comes later inland: NOAA predicts many Georgia creek and river stations from Fort Pulaski with high water up to about an hour later. Use a station near where you launch or fish.' },
    { q: 'Is it safe to swim at the Georgia sound beaches?', a: 'With care. The big Georgia tide drives strong currents in the sounds and channels between the islands, especially at mid-tide. Beaches facing a sound or an inlet, such as the north end of Tybee, are riskier than the open ocean front. Stay out of channels and follow local warnings.' },
  ],
});
