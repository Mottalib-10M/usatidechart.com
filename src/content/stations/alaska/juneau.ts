import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'alaska/juneau',
  intro: 'The Juneau station is on Gastineau Channel by the downtown waterfront, in the Inside Passage of Southeast Alaska.',
  body: (h) => {
    const s = h.st('alaska/juneau');
    return `
<h2>A capital on a sixteen-foot tide</h2>
<p>Gastineau Channel, between Juneau and Douglas Island, rises and falls ${h.ft(s.stats.meanRange)} on an average day and ${h.ft(s.stats.springRange)} on spring tides. Cruise ships tie up to docks built for that range, and the floats of the small boat harbors slide up and down their pilings by the height of a two-story house. The highest prediction of the period is ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}.</p>
<h2>The flats of the upper channel</h2>
<p>North of downtown, the channel shallows into wide tidal flats toward the Mendenhall wetlands, and at low tide much of the upper channel is mud and grass with a narrow stream through it. Boats cannot pass at low water there. The lowest predicted low this period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}; Southeast Alaska's deepest lows in daylight come in late spring and summer.</p>
<h2>Auke Bay and the outer coast of Douglas</h2>
<p>Auke Bay, the harbor north of town where the state ferries dock, and Fritz Cove on Douglas Island are predicted by NOAA from this gauge with times within a few minutes and heights a few tenths of a foot lower. Young Bay across the channel has its own reference station. Kayakers in the channels around Juneau watch the currents in the narrows, which run hard at mid-tide. The ${h.a('state:alaska', 'Alaska page')} compares Juneau with Cook Inlet.</p>`;
  },
  faqs: [
    { q: 'Can boats go through Gastineau Channel at low tide in Juneau?', a: 'Not through the shallow northern part. At low water the upper channel north of downtown drains to wide flats with only a narrow stream, so boats pass between Juneau and the north only around high tide, and most traffic uses the deep water south of town. Check the high time and height on this page.' },
  ],
});
