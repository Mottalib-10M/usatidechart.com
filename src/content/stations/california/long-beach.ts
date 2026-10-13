import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'california/long-beach',
  intro: 'The Terminal Island gauge sits in the port complex shared by Long Beach and Los Angeles, inside the long breakwater that shelters San Pedro Bay.',
  body: (h) => {
    const s = h.st('california/long-beach');
    return `
<h2>Tide inside a breakwater</h2>
<p>San Pedro Bay is closed off from the open sea by a federal breakwater several miles long, and the container terminals, channels and basins of two of the busiest ports in the country lie behind it. Terminal Island is the man-made ground in the middle. A breakwater stops swell but not the tide, which enters through its gaps freely: the average range at this gauge is ${h.ft(s.stats.meanRange)}, and spring tides reach ${h.ft(s.stats.springRange)}. A second NOAA gauge, at the Long Beach fire boat pier less than a mile southeast, records almost the same water.</p>
<h2>How the port's corners compare</h2>
<p>The other stations nearby are predicted from the Los Angeles Outer Harbor gauge, three miles southwest of this one. NOAA gives Cabrillo Beach, at the San Pedro end of the harbor, exactly the times and heights of the Outer Harbor, and the Long Beach Inner Harbor high water 4 minutes later at 96 percent. The channels keep pace with the open bay. Things slow down where water must push through a culvert or a narrow creek: at the Los Patos highway bridge, ten miles east, high water comes 60 minutes after the Outer Harbor and the lows are much shallower. King Harbor in Santa Monica Bay, twelve miles northwest, runs 8 minutes behind.</p>
<h2>For the shore east of the port</h2>
<p>Long Beach's own city beach faces south, behind the same breakwater, so it gets little surf and a waterline that moves mostly with the tide. Low tides below 0 ft come on ${s.stats.negativeLowDays} days of the prediction period. The ${h.a('boat-ramp-tide-planner', 'boat ramp planner')} works from this gauge for launches in the harbor basins.</p>`;
  },
  faqs: [
    { q: "Why does the Long Beach beach have so little surf at high tide?", a: "The long federal breakwater offshore blocks most of the ocean swell before it reaches the city shore, while letting the tide pass through its gaps. So the water still rises and falls by several feet each day, but the waves stay small. That makes the tide, not the surf, the main reason the sand gets wider or narrower here, unlike the open beaches farther south." },
  ],
});
