import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'california/newport-beach',
  intro: 'Balboa Pier stands on the ocean side of the Balboa Peninsula in Newport Beach, a subordinate tide station that NOAA derives from the Los Angeles Outer Harbor gauge.',
  body: (h) => {
    const s = h.st('california/newport-beach');
    return `
<h2>From the Los Angeles breakwater to the Balboa surf</h2>
<p>There is no full-time gauge on Balboa Pier. NOAA predicts its tide from Los Angeles Outer Harbor, about 25 miles up the coast, with high water 9 minutes earlier, low water at the same time and heights at 96 percent. Those small corrections say something about this coast: the long, straight beaches of Orange County see the tide nearly all at once. The result here is an average daily range of ${h.ft(s.stats.meanRange)}, opening to ${h.ft(s.stats.springRange)} around the new and full moon. NOAA also keeps a station at the Newport Bay entrance off Corona del Mar, a mile east of the pier, for the water that runs between the jetties.</p>
<h2>Peninsula, harbor and the back bay</h2>
<p>The Balboa Peninsula is a strip of sand between the open Pacific and Newport Harbor. Walk a few blocks from the pier across the peninsula and you leave the surf for calm moorings, but the tide inside the harbor does not drift far from the ocean schedule because the entrance is short. The picture changes in places where water has to squeeze through a narrow mouth. At the Santa Ana River entrance, four miles northwest, NOAA predicts high water 23 minutes after Los Angeles Outer Harbor and low water 107 minutes after, with highs at 54 percent and lows at 20 percent. Upper Newport Bay, with its marsh and mudflats, behaves more like that than like the pier.</p>
<h2>Low water along the jetty and the rocky points</h2>
<p>East of the harbor mouth, the shore of Corona del Mar turns to rocky points and coves. Those benches are worth visiting near a low that dips below 0 ft, which happens on ${s.stats.negativeLowDays} days of the prediction period. See ${h.a('st:california/long-beach', 'Long Beach')} for the port side of the same tide.</p>`;
  },
  faqs: [
    { q: "Does the tide in Newport Harbor follow Balboa Pier?", a: "Near the harbor entrance, yes, within a few minutes, because the jetties open straight onto the ocean and NOAA keeps its own station at the entrance off Corona del Mar. Farther in, toward the shallow upper bay and its marsh, the water takes longer to fill and drain, so lows arrive later and stay higher than at the pier. Use the entrance station for the main channel and allow extra time upstream." },
  ],
});
