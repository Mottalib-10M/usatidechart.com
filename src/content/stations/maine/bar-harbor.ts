import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'maine/bar-harbor',
  intro: 'The Bar Harbor gauge, on Frenchman Bay at the edge of Mount Desert Island, records one of the largest tides on the US East Coast outside the Bay of Fundy approaches.',
  body: (h) => {
    const s = h.st('maine/bar-harbor'), p = h.st('maine/portland');
    return `
<h2>The sand bar that gives the town its name</h2>
<p>At low water a gravel bar rises between Bar Harbor and Bar Island, and for a few hours people walk across it. The bar is only dry around the low, and with an average range of ${h.ft(s.stats.meanRange)} the water comes back fast: in the middle two hours of the rise it climbs more than two feet an hour. Cars parked on the bar and walkers who lingered on the island are a familiar story here. Look at the curve above, note the time of the low and plan to be back on the town side well before the water reaches the gravel again; the ${h.a('beach-walk-planner', 'low tide planner')} lists the daylight windows below a level you choose.</p>
<h2>Bigger than Portland, smaller than Fundy</h2>
<p>The tide grows as you go east along the Maine coast toward the Bay of Fundy, whose basin resonates with the Atlantic tide. Bar Harbor averages ${h.ft(s.stats.meanRange)} against ${h.ft(p.stats.meanRange)} in ${h.a('st:maine/portland', 'Portland')}, and its spring tides reach ${h.ft(s.stats.springRange)}. Across Frenchman Bay, Winter Harbor is predicted from Bar Harbor with almost the same time and 95 percent of the height; Southwest Harbor, on the other side of Mount Desert Island, keeps the same high-water time and a low about half an hour earlier.</p>
<h2>Tide pools and the shore of the island</h2>
<p>The granite shore of Mount Desert Island drops steeply into the sea, so the zone uncovered by the tide is a band of rockweed, barnacles and pools rather than a wide beach. The lowest lows, down to ${h.ft(s.stats.minLow.h)} on ${h.date(s.stats.minLow.date)}, open the lower pools where sea stars and urchins live. Rock is slick with weed at any tide: good shoes matter more here than the exact minute of the low.</p>`;
  },
  faqs: [
    { q: 'When can you walk to Bar Island from Bar Harbor?', a: 'Around low tide only, roughly from an hour and a half before to an hour and a half after the low, depending on the day’s range. The bar floods quickly because the tide here averages more than ten feet. Check the low time on this page for your day and start back before the turn; the National Park Service posts crossing times at the bar.' },
  ],
  extraSources: [{ name: 'National Park Service: Bar Island fast facts', url: 'https://www.nps.gov/articles/000/bar-island-fast-facts.htm' }],
});
