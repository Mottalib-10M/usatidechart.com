import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'hawaii/honolulu',
  intro: 'The Honolulu station is in Honolulu Harbor on the south shore of Oahu, the reference for predictions around the island.',
  body: (h) => {
    const s = h.st('hawaii/honolulu');
    return `
<h2>Under two feet, and still worth watching</h2>
<p>Honolulu's tide is small: ${h.ft(s.stats.meanRange)} from the lower low to the higher high on an average day. It is also mixed, with one high noticeably bigger than the other, by ${h.ft(s.stats.highInequality)} on average. On a coast ringed by shallow reef, those few feet change a lot. At a low tide the reef flats off Waikiki and Ala Moana come within inches of the surface, and paddling or walking over them gets awkward; at a high tide, swimmers clear the coral comfortably.</p>
<h2>Hanauma Bay and the east side</h2>
<p>NOAA predicts Hanauma Bay from Honolulu with high water about an hour earlier and the same height; Waimanalo, on the windward coast, is predicted from the station at Moku o Loe in Kaneohe Bay. Snorkelers at Hanauma find the inner reef shallow on a low tide, and the outer reef's channels run stronger when the tide is changing. Pearl Harbor, to the west, has several reference stations of its own.</p>
<h2>King tides on the south shore</h2>
<p>Honolulu's highest tides come in summer and winter, and in recent years they have flooded low parts of Waikiki and the Mapunapuna area when they arrived on top of high sea levels and south swells. The highest prediction of this period is ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}, and the lowest low ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}. Surf and swell, more than the tide, decide most days on the water here; see the ${h.a('state:hawaii', 'Hawaii page')} for the other islands.</p>`;
  },
  faqs: [
    { q: 'Does the tide matter for snorkeling in Honolulu?', a: 'It can. The tide range is small, under two feet on an average day, but the reefs are shallow, so a low tide brings the coral close to the surface over the flats and makes entries and exits harder. A rising or high tide gives more clearance. Swell and currents matter more for safety; check both before getting in.' },
  ],
});
