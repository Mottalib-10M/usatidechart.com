import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const keys = K.inState('south-carolina').map((s) => s.key);
const e = K.extremesOf(keys);

export default defineState({
  state: 'south-carolina',
  title: 'South Carolina Tides 2026: Myrtle Beach to Hilton Head',
  description: `South Carolina tides today: tide charts for Myrtle Beach, Charleston, Folly Beach and Hilton Head, with 7-day high and low times and solunar periods. 2026.`,
  intro: 'Four stations from the Grand Strand to Hilton Head Island, on a coast where the tide grows as you go south.',
  resume: `South Carolina has a semidiurnal tide on its whole coast, two highs and two lows a day, and a range that grows from north to south as the continental shelf widens toward the Georgia Bight: ${e.min.place} averages ${K.ft(e.min.stats.meanRange)} between the day's high and low, ${e.max.place} ${K.ft(e.max.stats.meanRange)}. The four stations on this page are the ones most people look up: Springmaid Pier for the Grand Strand, the Customhouse Wharf in Charleston Harbor, the Folly River bridge for Folly Beach and Port Royal Plantation on the ocean side of Hilton Head Island. Pick one in the tool above for today's curve and times, or open its page for the seven-day table, the solunar periods, the year's king tides and a beach and boat-ramp planner. Behind the barrier islands, in creeks, rivers and the Intracoastal Waterway, the tide comes later and is often smaller; the station pages say how much.`,
  featured: 'south-carolina/charleston',
  body: (h) => `
<h2>Why the Lowcountry tide is bigger than the Grand Strand's</h2>
<p>The tide that reaches South Carolina is the same Atlantic wave all along the coast, but the shape of the sea floor changes its height. Off Myrtle Beach the shelf is narrower; south of Charleston it widens into the curve of the Georgia Bight, and the wave piles up as it crosses the shallows. That is why ${h.a('st:south-carolina/hilton-head', 'Hilton Head')} sees about a foot more on an average day than ${h.a('st:south-carolina/myrtle-beach', 'Myrtle Beach')}, and why the Lowcountry's salt marshes drain and flood so visibly twice a day.</p>
<h2>Creeks, rivers and the waterway</h2>
<p>NOAA maintains dozens of secondary stations up the Ashley, Cooper, Stono and Broad rivers and along the Intracoastal Waterway. Most of them are predicted from Charleston Harbor with a time correction of one to five hours and a height factor below one. A kayak trip in the marsh behind ${h.a('st:south-carolina/folly-beach', 'Folly Beach')} or a launch at a river landing follows those later times, not the beach's. The station pages list the nearest corrections NOAA publishes.</p>
<h2>King tides in Charleston</h2>
<p>Charleston is one of the US cities where high-tide flooding reaches streets on the highest tides of the year, when a spring tide meets the moon's closest approach. The ${h.a('st:south-carolina/charleston', 'Charleston page')} lists the six highest predicted tides of the period; ${h.src('high_tide_flooding', 'NOAA explains high tide flooding')} and why it is becoming more frequent with sea level rise.</p>
<h2>Marsh tides and the Lowcountry day</h2>
<p>Much of the coast south of Georgetown is salt marsh cut by tidal creeks, and the tide shapes everything there: shrimpers and crabbers work the creeks on the falling water, oyster rakes appear at low tide along the banks, and paddlers plan to ride the current rather than fight it. With five to six feet of range, a creek that floats a kayak at mid-tide can become a mud channel at the low, so trips start on a rising tide or near the high.</p>`,
  faqs: [
    { q: 'Which South Carolina beach has the biggest tide?', a: `Of the four stations on this site, ${e.max.place} has the largest average daily range, ${K.ft(e.max.stats.meanRange)}, and ${e.min.place} the smallest, ${K.ft(e.min.stats.meanRange)}. The range grows from north to south because the continental shelf widens toward Georgia, which amplifies the Atlantic tide as it comes ashore. Creeks behind the islands usually see a smaller, later tide than the ocean beaches.` },
    { q: 'Are South Carolina tide times the same as Charleston Harbor?', a: `Close on the ocean beaches, different inland. NOAA predicts most South Carolina secondary stations from Charleston Harbor with a time correction: the ocean pier at Myrtle Beach runs about 25 minutes ahead of Charleston, while waterway and river stations can lag by two to five hours. Always read the station nearest to where you will be.` },
    { q: 'When are the lowest tides of the year in South Carolina?', a: `Around the new and full moons, and lowest when one of them coincides with the moon's perigee. Each station page lists its six lowest predicted lows between ${K.date(K.DATA.begin)} and ${K.date(K.DATA.end)}, in feet below Mean Lower Low Water, the best days for walking sand bars and finding shells.` },
  ],
});
