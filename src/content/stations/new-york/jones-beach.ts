import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'new-york/jones-beach',
  intro: 'The station for Jones Beach is the Point Lookout marina, just inside Jones Inlet on the south shore of Long Island.',
  body: (h) => {
    const s = h.st('new-york/jones-beach');
    return `
<h2>Ocean beach, inlet station</h2>
<p>Jones Beach is an ocean barrier beach; NOAA's nearest reference station is across the inlet at Point Lookout, in a marina just inside the mouth. It averages ${h.ft(s.stats.meanRange)} from low to high. On the ocean beach itself the water turns a little earlier: NOAA predicts its Jones Inlet (Point Lookout) secondary station from Sandy Hook with high water 20 minutes earlier and about three quarters of Sandy Hook's height.</p>
<h2>Behind the barrier, a slower and smaller tide</h2>
<p>Behind Jones Beach lies a maze of marsh islands and channels, Hempstead Bay and the bays around Freeport and Baldwin. The tide that squeezes through Jones Inlet spreads out there, arrives later and loses height. NOAA predicts Freeport's Baldwin Bay from Sandy Hook with high water 37 minutes later and two thirds of the height, Neds Creek about 50 minutes later, and Cuba Island more than an hour later with half of Sandy Hook's range. Clammers and boaters in the back bays should use those times, not the inlet's.</p>
<h2>Jones Inlet itself</h2>
<p>The inlet is where the water from all those bays drains to the sea, so the current runs hard in the middle of the ebb, and an onshore swell meeting that ebb makes the mouth rough. Fishing the jetty or the inlet beaches, many anglers prefer the last of the incoming tide and the start of the outgoing. The lowest low predicted at Point Lookout this period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}. The ${h.a('fishing-tides', 'fishing tides guide')} explains how moving water changes the bite.</p>`;
  },
  faqs: [
    { q: 'Is high tide later in the bays behind Jones Beach?', a: 'Yes, and often by a lot. NOAA predicts Freeport’s Baldwin Bay from Sandy Hook with high water 37 minutes later and two thirds of the height, and Cuba Island more than an hour later with half of it. The water has to pass Jones Inlet and spread through the marsh, so the back bays rise later and less than the ocean beach.' },
  ],
});
