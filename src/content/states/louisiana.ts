import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const gi = K.st('louisiana/grand-isle'), bi = K.st('mississippi/biloxi'), ga = K.st('texas/galveston');

export default defineState({
  state: 'louisiana',
  title: 'Louisiana Tides 2026: Grand Isle and Barataria Tide Chart',
  description: 'Louisiana tides today: the Grand Isle tide chart for Barataria Pass, with 7-day high and low tide times, coefficient, sunrise and solunar periods. 2026.',
  intro: 'A single gauge at the tip of Grand Isle stands for a coast of marsh, bayous and sinking ground that runs the width of the state.',
  resume: `${K.ft(gi.stats.meanRange)} on an average day: that is the tide at East Point, Grand Isle, the Louisiana station on this site, smaller than ${K.ft(bi.stats.meanRange)} at Biloxi to the east or ${K.ft(ga.stats.meanRange)} at Galveston to the west. On ${Math.round(gi.stats.oneHighShare * 100)}% of days it is a diurnal tide, ${K.typeWords('louisiana/grand-isle')}, and its spring days, near ${K.ft(gi.stats.springRange)}, follow the moon's swing north and south of the equator rather than the new and full moon. Grand Isle is a barrier island in front of Barataria Bay, and the tide enters that bay through Barataria and Caminada passes, then spreads into marsh and bayous where it arrives hours late and often smaller. Across the state, wind, river flow and sinking land shape the real water level as much as the moon does. Pick the station in the tool above for today's curve, or open its page for seven days, extremes and a planner.`,
  featured: 'louisiana/grand-isle',
  body: (h) => `
<h2>Marsh, bays and the long way in</h2>
<p>The Louisiana coast is less a shoreline than a fringe of barrier islands, open bays and marsh cut by thousands of channels. Barataria, Terrebonne, Timbalier, Atchafalaya and Vermilion bays each fill through their own passes, and the water reaching a camp or a launch deep in the marsh has squeezed through miles of bayou on the way. Each step inland usually delays the high and trims its height. ${h.a('st:louisiana/grand-isle', 'Grand Isle')} reads the edge of this system, where the Gulf first meets it. Lake Pontchartrain, linked to the Gulf through the Rigolets and Chef Menteur Pass, gets only a fraction of the Gulf's range.</p>
<h2>The river and its delta</h2>
<p>The Mississippi River enters the Gulf through the long birdfoot delta southeast of Grand Isle. When the river runs high in spring, its current and its fresh water shift levels in the lower river and the bays on either side, and the predicted tide becomes a smaller part of what you see. Far upstream, the river is high enough above the Gulf that the tide signal fades out. The Atchafalaya, which carries a large share of the river's flow to the central coast, does the same to its own bay.</p>
<h2>Land that sinks while the sea rises</h2>
<p>Louisiana's delta soils compact and settle, and levees keep the river's sediment from rebuilding them. The Grand Isle gauge records one of the fastest rates of relative sea-level rise of any long-term NOAA station, combining the ocean's rise with the ground's subsidence. Over decades, that has turned marsh into open water and moved the shoreline inland. High water now covers low roads and yards more often than it did a generation ago, even on calm days. NOAA's notes on ${h.src('high_tide_flooding', 'high tide flooding')} explain how a modest rise in mean sea level multiplies flood days.</p>
<h2>Fronts, south winds and empty bays</h2>
<p>The predicted range is small, so weather often decides the day. Between late fall and early spring, cold fronts bring hard north winds that drive water out of the bays, sometimes for two or three days. The deepest predicted low at Grand Isle, ${K.ft(gi.stats.minLow.h)}, falls on ${h.date(gi.stats.minLow.date)}, right in that season, and a strong front can take the level lower. In summer and fall, steady southeast wind does the reverse. The ${h.a('negative-low-tides', 'negative low tide guide')} covers the winter lows and the ${h.a('fishing-tides', 'fishing tides guide')} why moving water in the passes counts more than its height.</p>`,
  faqs: [
    { q: 'Why is the tide so small in Louisiana?', a: 'The Gulf of Mexico has small tides because it connects to the open ocean only through relatively narrow straits, and along most of the Louisiana coast the daily range is between one and two feet. In the marsh and the inland bays it can shrink further. Wind and river flow often move the water as much as the moon does.' },
    { q: 'Is the tide later inside Louisiana bays than at Grand Isle?', a: 'Yes, usually by one to several hours. The tide enters Barataria Bay through the passes beside Grand Isle and spreads slowly through open water, marsh and bayous, so high water deep in the bay comes well after East Point. The height often changes too. Use a station close to where you fish or launch when NOAA offers one.' },
    { q: 'How does land subsidence affect tides in Louisiana?', a: 'It does not change the tide itself, but it raises the water relative to the land. The ground in the delta is settling while the sea rises, so the Grand Isle gauge shows one of the fastest relative sea-level rises in the country. The same predicted high now reaches farther into low roads and yards than it did decades ago.' },
  ],
});
