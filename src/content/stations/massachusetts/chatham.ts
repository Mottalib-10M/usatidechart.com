import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'massachusetts/chatham',
  intro: 'Stage Harbor, on the Nantucket Sound side of Chatham at the elbow of Cape Cod, is the reference tide station for the town.',
  body: (h) => {
    const s = h.st('massachusetts/chatham');
    return `
<h2>One town, three different tides</h2>
<p>Chatham sits where Cape Cod turns north, and its waters belong to three systems. Stage Harbor, the station on this page, opens south onto Nantucket Sound and averages ${h.ft(s.stats.meanRange)} from low to high. Chatham Harbor, behind the barrier beaches on the ocean side, has its own NOAA station at Aunt Lydia's Cove under two miles away. And Pleasant Bay to the north is predicted by NOAA from Boston with high water about two and a half hours later and a third of Boston's range, because the tide has to work its way in through the breaks in the outer beach.</p>
<p>So a boater leaving Stage Harbor, a kayaker in Pleasant Bay and someone fishing at the fish pier in Chatham Harbor can see high water hours apart on the same afternoon. Pick the station that matches where you will be.</p>
<h2>Sound side flats and the harbor entrance</h2>
<p>Along the Nantucket Sound shore, from Harding's Beach toward Monomoy, the tide uncovers sandy flats, and the channel into Stage Harbor shoals at low water. To the west, Wychmere Harbor and Dennis Port are predicted from Boston with high water roughly an hour later and well under half of Boston's range. The lowest low predicted at Stage Harbor this period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}.</p>
<h2>Shifting sands</h2>
<p>Chatham's outer beaches move: inlets open in storms and close again over years, and the shoals off Monomoy change shape constantly. Tide predictions describe the water level, not where the sand is this season. The ${h.a('cape-cod', 'Cape Cod tide comparison')} shows Chatham next to Provincetown, Plymouth, Hyannis and Nantucket.</p>`;
  },
  faqs: [
    { q: 'Which Chatham tide station should I use for Pleasant Bay?', a: 'Not Stage Harbor. NOAA predicts Pleasant Bay from the Boston gauge with high water about 148 minutes later and heights at 34 percent of Boston’s, so it rises later and much less than the Sound side. Stage Harbor, on this page, fits the south shore of Chatham and the approach to Monomoy.' },
  ],
});
