import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'washington/westport',
  intro: 'The Westport station is at Point Chehalis, at the south side of the entrance to Grays Harbor on the Washington coast.',
  body: (h) => {
    const s = h.st('washington/westport');
    return `
<h2>Grays Harbor's open-ocean entrance</h2>
<p>Westport sits on the spit at the mouth of Grays Harbor, where the bay meets the Pacific. The station at Point Chehalis averages ${h.ft(s.stats.meanRange)} from lower low to higher high, with spring tides of ${h.ft(s.stats.springRange)}. That is a large range for the open coast, and it drives powerful currents through the harbor entrance, where the ebb meets the Pacific swell over the bar.</p>
<h2>The bar, the marina and the charters</h2>
<p>Westport's marina is home to a sport and commercial fleet that crosses the Grays Harbor bar to reach the ocean. Bar conditions depend on the swell and on the tide: an outgoing tide against a big westerly swell steepens the waves, while the flood usually calms them. The Coast Guard posts bar restrictions when conditions are dangerous; the times on this page show when the flood and ebb are running. The lowest low this period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}.</p>
<h2>Willapa Bay to the south</h2>
<p>South of Westport, Point Brown, Bay City on South Bay and Markham are predicted by NOAA from Toke Point on Willapa Bay, with high water within ten minutes and low water 15 to 26 minutes earlier. Willapa's oyster beds and the razor clam beaches of the coast depend on the low tides; clam openings are set by the state, so check them before going. The ${h.a('state:washington', 'Washington page')} compares Westport with Seattle and Port Townsend.</p>`;
  },
  faqs: [
    { q: 'When is the Grays Harbor bar at Westport roughest?', a: 'Usually on a strong ebb meeting a large westerly swell, when the outgoing current steepens the waves over the bar. The flood tide tends to lay them down. The Coast Guard can restrict crossings in dangerous conditions, so check the bar report as well as the tide times on this page before heading out.' },
  ],
});
