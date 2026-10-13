import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'california/la-jolla',
  intro: 'The gauge on the Scripps Institution of Oceanography pier, at the north end of La Jolla Shores, measures the open Pacific tide for the San Diego coast.',
  body: (h) => {
    const s = h.st('california/la-jolla'), sd = h.st('california/san-diego');
    return `
<h2>A research pier on open water</h2>
<p>The Scripps pier reaches straight out from a sandy beach into the Pacific, with nothing between the instrument and the ocean swell. That makes it the cleanest tide record in San Diego County for anyone who spends time on the outer coast: the waterline at La Jolla Shores, the reefs below the bluffs and the cove all follow it closely. The average daily swing is ${h.ft(s.stats.meanRange)}, a touch smaller than the ${h.ft(sd.stats.meanRange)} measured in ${h.a('st:california/san-diego', 'San Diego Bay')}. Mission Bay, five miles south, has its own NOAA gauge at Campland, and NOAA predicts its Quivira Basin from the downtown San Diego station with high water 5 minutes later and heights at 95 percent.</p>
<h2>The cove, the reefs and the sand shelf</h2>
<p>South of the pier the beach narrows and gives way to sandstone ledges and rocky points toward La Jolla Cove. At a high tide with swell, much of that shore is under moving water; at a low it turns into ledges, pools and channels. Kayakers and snorkelers leaving from the Shores feel the tide less than the surf, yet a low tide makes the launch longer and the shallow reef patches easier to scrape. Anyone walking north under the cliffs toward Black's Beach should know when the water comes back up, since the sand at the foot of the bluffs is narrow in places.</p>
<h2>When the lowest water comes</h2>
<p>The extreme lows here follow the seasonal habit of the Pacific coast. In winter they arrive in the afternoon, the lowest of this prediction period reaching ${h.ft(s.stats.minLow.h)} on ${h.date(s.stats.minLow.date)}. From late spring into summer they move to the early morning hours. The ${h.a('beach-walk-planner', 'beach walk planner')} filters the daylight hours below the level you pick.</p>`;
  },
  faqs: [
    { q: "Is the La Jolla tide different from the tide in Mission Bay?", a: "Only slightly. Mission Bay fills through a channel from the ocean, so its tide lags the open coast by a few minutes and its range is a little smaller. NOAA predicts Quivira Basin, near the bay mouth, from the San Diego Bay gauge about 5 minutes later and at 95 percent of the heights. Deeper inside Mission Bay the delay grows, which matters for launching rather than for walking the beach." },
  ],
});
