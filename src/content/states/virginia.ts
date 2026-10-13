import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const vb = K.st('virginia/virginia-beach'), nf = K.st('virginia/norfolk'), ch = K.st('virginia/chincoteague');

export default defineState({
  state: 'virginia',
  title: 'Virginia Tides 2026: Virginia Beach, Norfolk, Chincoteague',
  description: 'Virginia tides today: tide charts for Virginia Beach, Norfolk and Chincoteague, with 7-day high and low tide times, coefficient and solunar periods. 2026.',
  intro: 'The oceanfront, Hampton Roads and the Eastern Shore: three tides of different size around the mouth of the Chesapeake.',
  resume: `Virginia's tide changes as you move from the open ocean into the Chesapeake. The Virginia Beach oceanfront averages ${K.ft(vb.stats.meanRange)} from low to high, predicted by NOAA from the Duck pier in North Carolina. Inside the bay mouth, Hampton Roads at Sewells Point averages ${K.ft(nf.stats.meanRange)}, and the tide keeps shrinking as it travels up the bay. On the Eastern Shore, Chincoteague's channel station averages ${K.ft(ch.stats.meanRange)}, with a larger tide on the Assateague ocean beach and smaller, later tides in the marsh behind. All three have a semidiurnal tide, two highs and two lows a day. Pick a station in the tool above for today's curve and times, or open its page for seven days, extremes and a planner. Hampton Roads is also one of the places on the East Coast where high tides now flood streets most often.`,
  featured: 'virginia/virginia-beach',
  body: (h) => `
<h2>The bay mouth and Hampton Roads</h2>
<p>The Chesapeake opens to the Atlantic between Cape Henry and Cape Charles, crossed by the Chesapeake Bay Bridge-Tunnel. Inside, Hampton Roads is the junction of the James, Elizabeth and Nansemond rivers, one of the great natural harbors of the world. NOAA predicts its points from ${h.a('st:virginia/norfolk', 'Sewells Point')} with corrections of a few minutes to three quarters of an hour; on the Lynnhaven side of Virginia Beach, it uses the Bridge-Tunnel station, with high water about two hours after the ocean.</p>
<h2>Flooding in Norfolk and Hampton Roads</h2>
<p>Land around Hampton Roads is subsiding while sea level rises, and the combined change is among the fastest on the East Coast. Low neighborhoods now flood on the highest astronomical tides even in fair weather. The ${h.a('king-tides', 'king tides guide')} and NOAA's ${h.src('high_tide_flooding', 'high tide flooding page')} explain the trend.</p>
<h2>The Eastern Shore</h2>
<p>On the Delmarva side, barrier islands and marsh stretch from ${h.a('st:virginia/chincoteague', 'Chincoteague')} down to Cape Charles. Behind them, lagoons and creeks fill late through narrow inlets: NOAA predicts some Chincoteague coves almost two hours after the Ocean City pier. It is clam and oyster country, and the low tide sets the working day.</p>
<h2>Currents at the capes</h2>
<p>All the water that fills and drains the Chesapeake passes between the capes, so the tidal currents there and around the Bridge-Tunnel islands run strongly, reversing roughly every six hours. Anglers fishing the tunnel islands and the bay mouth time their trips on the moving water, and small boats crossing the mouth avoid wind against a strong ebb. On the oceanfront itself, the ${h.a('st:virginia/virginia-beach', 'Virginia Beach tide chart')} gives the heights for walks, surf and launches at Rudee Inlet.</p>`,
  faqs: [
    { q: 'Is the tide bigger at Virginia Beach than in Norfolk?', a: 'Yes. The oceanfront averages close to four feet, while Hampton Roads at Sewells Point averages about two and a half. The tide loses height as it enters the Chesapeake through the bay mouth and keeps shrinking up the bay, while the open ocean keeps the full Atlantic range.' },
    { q: 'Why does Norfolk flood so often at high tide?', a: 'Because the land around Hampton Roads is sinking while the sea rises, so the highest astronomical tides reach low streets more often than a few decades ago. On king tide days, water can enter neighborhoods near the rivers without a storm; northeast winds and rain make it worse.' },
    { q: 'Which station should I use for Chincoteague and Assateague in Virginia?', a: 'For the town’s channel and docks, the Chincoteague Channel station on this site. For the ocean beach at Toms Cove on Assateague, NOAA uses the Ocean City fishing pier with a 35-minute correction and a larger range. The coves north of town run up to two hours late.' },
  ],
});
