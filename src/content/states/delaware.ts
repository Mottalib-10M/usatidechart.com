import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const le = K.st('delaware/lewes'), re = K.st('delaware/rehoboth-beach');

export default defineState({
  state: 'delaware',
  title: 'Delaware Tides 2026: Rehoboth Beach and Lewes Tide Charts',
  description: 'Delaware tides today: tide charts for Rehoboth Beach and Lewes, with 7-day high and low tide times, tide coefficient, sunrise and solunar fishing periods. 2026.',
  intro: 'Two stations around Cape Henlopen: the bay at Lewes, the ocean at Rehoboth Beach.',
  resume: `Delaware's beaches sit on two waters that meet at Cape Henlopen: Delaware Bay to the north and west, the Atlantic to the east. Both have a semidiurnal tide, two highs and two lows a day of similar size, ${K.ft(le.stats.meanRange)} on an average day at Lewes and ${K.ft(re.stats.meanRange)} at Rehoboth Beach, but the ocean turns first: Rehoboth's highs and lows come roughly 45 minutes to an hour before Lewes's. NOAA predicts Rehoboth from the Ocean City, Maryland, fishing pier, while Lewes is a reference station in its own right at the mouth of the bay. Pick a station in the tool above for today's curve and times, or open its page for seven days, extremes and a planner. Behind the beaches, Rehoboth Bay and Indian River Bay connect to the ocean through Indian River Inlet, where the current is notoriously strong.`,
  featured: 'delaware/rehoboth-beach',
  body: (h) => `
<h2>Delaware Bay, a tidal funnel</h2>
<p>Delaware Bay narrows from its mouth between Cape May and Cape Henlopen up to the Delaware River, and the tide travels up it for hours, reaching Philadelphia and Trenton long after it passes ${h.a('st:delaware/lewes', 'Lewes')}. On the bay beaches of southern Delaware the water is calmer than on the ocean, and the low tide uncovers broad, gently sloping flats.</p>
<h2>Ocean beaches</h2>
<p>From ${h.a('st:delaware/rehoboth-beach', 'Rehoboth Beach')} south through Dewey and Bethany to Fenwick Island, the beaches face the Atlantic. Their tide follows Ocean City's, with NOAA's corrections of a quarter of an hour. Rip currents can form on these beaches at any tide; the ${h.src('rip_currents', 'National Weather Service')} explains how to recognize them.</p>
<h2>The inland bays</h2>
<p>Rehoboth Bay, Indian River Bay and Little Assawoman Bay sit behind the barrier beaches. They are shallow, with a small tide, and fill and drain through Indian River Inlet, which NOAA monitors with a reference station. Clamming and crabbing in the bays depend on the low tide, and the wind can hold water in or push it out for a day or more.</p>
<h2>Planning a day on both sides of the cape</h2>
<p>A day that starts on the ocean at Rehoboth and ends on the bay at Lewes crosses two tide clocks. If you want a wide beach for a morning walk, the low on the ocean side comes first; by the time you reach the bay beaches, their low is still to come. For a ferry crossing to Cape May the tide hardly matters, but for a kayak trip in the canal or around the breakwaters at Lewes, the current that runs with each tide does. The station pages list the highest and lowest tides of the period, and the ${h.a('beach-walk-planner', 'low tide planner')} finds the daylight hours below a level you choose.</p>`,
  faqs: [
    { q: 'Is the tide at Rehoboth Beach the same as in Lewes?', a: 'Similar in size, different in timing. Both average a little over four feet, but Rehoboth faces the ocean and Lewes the mouth of Delaware Bay, so Lewes’s highs and lows come roughly 45 minutes to an hour after Rehoboth’s. Use the station on the side of Cape Henlopen where you will be.' },
    { q: 'Why is Indian River Inlet in Delaware so dangerous?', a: 'Because Rehoboth Bay and Indian River Bay fill and empty through this one inlet, so a large volume of water passes through a narrow channel on every tide. The current runs very fast in the middle of the ebb and the flood, and swimming in the inlet is unsafe. Boaters time their passage near slack water.' },
    { q: 'How far up Delaware Bay does the tide go?', a: 'All the way up the Delaware River to Trenton, New Jersey, more than a hundred miles from the bay mouth, arriving hours after it passes Lewes. The bay and river act as a long funnel, and the range changes along the way as the channel narrows.' },
  ],
});
