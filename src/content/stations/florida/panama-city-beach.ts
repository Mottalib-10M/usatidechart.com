import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'florida/panama-city-beach',
  intro: 'The Panama City Beach gauge reads the open Gulf along the long white-sand strand west of St. Andrew Bay, on the Florida Panhandle.',
  body: (h) => {
    const s = h.st('florida/panama-city-beach');
    return `
<h2>Strong weeks and slack weeks on the Panhandle</h2>
<p>${h.ft(s.stats.meanRange)} is the average swing at Panama City Beach, gentle by any measure, and the average hides a wide spread through the month. When the moon sits far north or south of the equator the daily tide strengthens and spreads to about ${h.ft(s.stats.springRange)}; around the equator crossings it collapses to ${h.ft(s.stats.neapRange)}, and for a day or two the beach barely notices a tide at all. So the useful thing to check is not the moon's phase but where the week falls in that cycle, which the 7-day chart above shows at a glance.</p>
<h2>St. Andrew Bay and the channel</h2>
<p>East of the beach, the entrance channel cut through the barrier leads into St. Andrew Bay and the port. NOAA predicts that channel entrance from Pensacola, with high water 99 minutes earlier than the Pensacola reference and heights about equal to it, and Alligator Bayou, off the bay, 47 minutes earlier at very nearly the same scale. Those corrections place the bay on almost the same footing as the Gulf front in height. Along this coast the tide is so small that boaters in the bay tend to watch the depth over the flats more than the clock.</p>
<h2>Wind often writes the tide here</h2>
<p>A swing of a foot or two is easily matched by weather. A steady south wind sets water up against the beach and can cover sand the table says should be dry; a winter north wind after a front can drop the bay and the surf line below the prediction. Swimmers should also know that the flag system and rip currents matter far more for safety on this beach than the height of the tide. For timing a stroll at the water's edge, the ${h.a('beach-walk-planner', 'beach walk planner')} uses the predicted heights; see ${h.a('st:florida/destin', 'Destin')} to the west for a pass with an even smaller tide.</p>`;
  },
  faqs: [
    { q: 'Is the tide in St. Andrew Bay different from Panama City Beach?', a: 'Only a little in size. NOAA does not compute the bay from the Panama City Beach gauge but from Pensacola, putting the channel entrance about an hour and a half ahead of Pensacola and Alligator Bayou about three quarters of an hour ahead, both at nearly the same height. For the port area, NOAA keeps its own station at Sulphur Point, a direct reading of the inner bay.' },
  ],
});
