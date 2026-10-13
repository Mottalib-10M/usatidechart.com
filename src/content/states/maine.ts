import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const pt = K.st('maine/portland'), bh = K.st('maine/bar-harbor'), oo = K.st('maine/old-orchard-beach');

export default defineState({
  state: 'maine',
  title: 'Maine Tides 2026: Portland, Bar Harbor, Old Orchard Beach',
  description: 'Maine tides today: tide charts for Portland, Bar Harbor and Old Orchard Beach, with 7-day high and low tide times, tide coefficient and solunar periods. 2026.',
  intro: 'Three stations on a coast where the tide grows from about nine feet in the south to over eleven toward Mount Desert Island.',
  resume: `Maine has a big, regular semidiurnal tide, two highs and two lows a day of nearly the same size, and it grows as you travel east: ${oo.place} averages ${K.ft(oo.stats.meanRange)} from low to high, ${pt.place} ${K.ft(pt.stats.meanRange)} and ${bh.place} ${K.ft(bh.stats.meanRange)}. The reason lies beyond the state line, in the Gulf of Maine and the Bay of Fundy, a basin whose shape resonates with the Atlantic tide and builds the largest ranges on Earth at its head. Pick a station in the tool above for today's curve and the next high or low, or open its page for seven days of times, the year's king tides and the lowest lows. In the long, narrow bays and rivers of the coast, the tide arrives later; Portland's gauge is the reference NOAA uses for much of southern Maine.`,
  featured: 'maine/bar-harbor',
  body: (h) => `
<h2>A coast that rises toward Fundy</h2>
<p>The Gulf of Maine and the Bay of Fundy together form a basin whose natural period of oscillation is close to the 12 hours 25 minutes of the lunar tide. The tide entering from the Atlantic is reinforced on each cycle, a little like a child pushed on a swing at the right moment. The effect is strongest at the head of the Bay of Fundy, in Canada, and it is already visible along Maine: ${h.a('st:maine/bar-harbor', 'Bar Harbor')} has over a foot more range than ${h.a('st:maine/portland', 'Portland')}, and Eastport, near the Canadian border, more still.</p>
<h2>Ledges, coves and fast-rising water</h2>
<p>Much of Maine's shore is granite ledge cut by long coves and tidal rivers. In such places the tide changes the shape of the landscape more than the width of a beach: ledges appear and vanish, coves drain to mud, and gravel bars connect islands to the shore for a few hours. With nine to eleven feet of range, the water in the middle of a rising tide climbs more than two feet an hour, so a bar or a ledge that was dry can be cut off quickly. The ${h.a('beach-walk-planner', 'low tide planner')} gives the windows below a level you choose.</p>
<h2>Sand beaches in the south</h2>
<p>Southern Maine has the state's long sand beaches, ${h.a('st:maine/old-orchard-beach', 'Old Orchard Beach')} the best known. They are flat, so the big tide moves the waterline a long way across the sand. NOAA predicts many of them from Portland with small corrections, as it does for the islands of Casco Bay.</p>
<h2>Winter king tides</h2>
<p>The highest tides of the period on all three stations fall in winter, the season of nor'easters. When a storm surge rides a perigean spring tide, waterfronts such as Portland's flood. The ${h.a('king-tides', 'king tides guide')} explains those dates.</p>`,
  faqs: [
    { q: 'Where are the biggest tides in Maine?', a: 'Downeast, toward the Canadian border, because the tide grows into the Bay of Fundy. Among the stations on this site, Bar Harbor has the largest average range, over eleven feet, against under ten in Portland and Old Orchard Beach. Eastport, at the eastern end of the state, has a larger tide still.' },
    { q: 'Why does the tide rise so fast on the Maine coast?', a: 'With nine to eleven feet between low and high, the water has to climb a lot in about six hours, and it climbs fastest in the middle two hours of the rise, more than two feet an hour. Gravel bars, ledges and flats that are dry at low water can be cut off in minutes.' },
    { q: 'Do Maine tide times change much along the coast?', a: 'Only by minutes on the open coast: NOAA predicts many southern Maine places from the Portland gauge with corrections of a few minutes. Up the long tidal rivers the lag grows, and some upriver stations turn more than two hours after Portland. Use the station nearest to where you will be.' },
  ],
});
