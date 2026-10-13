import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const oc = K.st('maryland/ocean-city'), an = K.st('maryland/annapolis'), ba = K.st('maryland/baltimore');

export default defineState({
  state: 'maryland',
  title: 'Maryland Tides 2026: Ocean City, Annapolis and Baltimore',
  description: 'Maryland tides today: tide charts for Ocean City, Annapolis and Baltimore, with 7-day high and low tide times, coefficient, sunrise and solunar periods. 2026.',
  intro: 'One ocean station and two in the upper Chesapeake, where the tide is barely over a foot.',
  resume: `Maryland has two tidal worlds. On the Atlantic, Ocean City's inlet has a regular semidiurnal tide of ${K.ft(oc.stats.meanRange)} on an average day. In the Chesapeake Bay, the tide that entered at the Virginia capes has lost most of its height by the time it reaches the upper bay: ${K.ft(an.stats.meanRange)} at Annapolis and ${K.ft(ba.stats.meanRange)} at Baltimore, with a mixed pattern of unequal highs. Pick a station in the tool above for today's curve and times, or open its page for seven days, extremes and a planner. In the bay, wind often matters more than the tide: a sustained south wind raises the water, a northwest wind after a cold front drains it, and both can move the level by a foot or more, as much as the moon does.`,
  featured: 'maryland/ocean-city',
  body: (h) => `
<h2>The Chesapeake: a long, slow tide</h2>
<p>Chesapeake Bay is about 200 miles long and mostly shallow, and the tide takes most of a tidal cycle to travel from its mouth to its head. At any moment, one part of the bay can be at high water while another is at low. NOAA predicts Thomas Point Shoal, south of ${h.a('st:maryland/annapolis', 'Annapolis')}, almost two hours before ${h.a('st:maryland/baltimore', 'Baltimore')}. For boaters on the bay, the current, the wind and the small tide combine; for anglers, moving water still matters.</p>
<h2>The ocean coast</h2>
<p>${h.a('st:maryland/ocean-city', 'Ocean City')} and Assateague face the Atlantic. Behind them, Isle of Wight, Assawoman, Sinepuxent and Chincoteague bays receive the tide through the Ocean City Inlet, and their tide is smaller, later and lopsided. NOAA predicts some bay stations with less than half the ocean's high-water height.</p>
<h2>Water level and the shoreline</h2>
<p>The Chesapeake's low shores, islands and marshes are sensitive to small changes in water level. Smith Island and parts of the Eastern Shore see their marshes flood on high tides with south winds. The station pages give the highest predicted tides; the actual water during a storm can be well above them.</p>
<h2>Reading a small tide</h2>
<p>With a range of a foot, a mixed upper-bay tide can look odd on a chart: some days show one strong rise and fall and a second one barely visible, and a high can be lower than the previous day's low after a wind shift. The curve is still the best guide to when the water is moving, which is what matters for fishing the points, bars and bridge pilings of the bay. For launching at a shallow ramp, the ${h.a('boat-ramp-tide-planner', 'boat ramp planner')} works with any level you set.</p>`,
  faqs: [
    { q: 'Why is the tide so small in the upper Chesapeake Bay?', a: 'The tide enters the bay at the Virginia capes and loses height as it travels about 200 miles through shallow water, so by Annapolis and Baltimore the average range is only around a foot. The bay’s length also means its tide is mixed and its timing shifts by hours from one end to the other.' },
    { q: 'Is high tide earlier in Annapolis than in Baltimore?', a: 'Yes. The tide moves up the Chesapeake from south to north, so it reaches Annapolis first. Comparing the two NOAA predictions, Annapolis’s highs and lows come about one to two hours before Baltimore’s. Thomas Point Shoal Light, south of Annapolis, is predicted almost two hours before Baltimore.' },
    { q: 'Does wind change the tide in Maryland?', a: 'In the Chesapeake, often more than the moon does. A steady south wind pushes water up the bay and can raise the level by a foot or more; a strong northwest wind after a front can drain it and expose unusual flats. On the ocean at Ocean City, the tide dominates and wind adds to it during storms.' },
  ],
});
