import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'florida/naples',
  intro: 'The Naples outer coast station reads the tide on the open Gulf shore of the city, the long sand beach that runs north from Gordon Pass.',
  body: (h) => {
    const s = h.st('florida/naples');
    return `
<h2>A Gulf beach with an uneven pair of tides</h2>
<p>${h.ft(s.stats.meanRange)} separates an ordinary low from the following high on the Naples beachfront, enough to change a lot of sand on a beach this flat. Most days bring two highs of different size, and the gap between the pair averages ${h.ft(s.stats.highInequality)}. Walkers notice it as one generous low in the day and a second, shallower one that leaves the sandbar covered. Around the new and full moon the spread opens to ${h.ft(s.stats.springRange)}, and those weeks give the widest strip of wet sand for shelling; the ${h.a('beach-walk-planner', 'beach walk planner')} finds the hours.</p>
<h2>Naples Bay and the passes to the north</h2>
<p>Behind the beach, Naples Bay connects to the Gulf through Gordon Pass, and NOAA keeps a separate station at its north end, about a mile inland from this one. Boaters leaving a dock in the bay should open that station rather than the beach figure. Farther up the coast, Wiggins Pass on the Cocohatchee River is predicted from the Naples outer coast with high water 44 minutes later and heights trimmed to about three quarters; at the U.S. 41 bridge upriver the high comes 70 minutes after the beach. South of town, the inside of Keewaydin Island has its own gauge, a reminder that the mangrove side of a barrier island keeps different hours from its Gulf side.</p>
<h2>Winter fronts and summer onshore breezes</h2>
<p>On a coast with a few feet of tide, weather is a real rival to the moon. After a winter cold front, a hard north or east wind can blow water off the shallow shelf and leave the beach lower than the table says, while a long onshore blow does the reverse. The lowest predicted water of the period at this station, ${h.ft(s.stats.minLow.h)} on ${h.date(s.stats.minLow.date)}, falls in that winter season. Treat the prediction as the astronomical baseline and look at the wind before counting on a bar being dry.</p>`;
  },
  faqs: [
    { q: 'How much later is high tide at Wiggins Pass than on the Naples beach?', a: 'About three quarters of an hour. NOAA derives Wiggins Pass from the Naples outer coast station, adding 44 minutes to high water and 59 to low water, with heights near three quarters of the beach values. Upriver at the U.S. 41 bridge on the Cocohatchee the lag passes an hour. Add those minutes to the times on this page when fishing or launching up there.' },
  ],
});
