import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'oregon/newport',
  intro: 'The tide station at the Coast Guard dock on Yaquina Bay, in Newport, is a NOAA subordinate of Crescent City, California, and covers the bay mouth and the town waterfront.',
  body: (h) => {
    const s = h.st('oregon/newport'), cc = h.st('california/crescent-city');
    return `
<h2>Corrected from two hundred miles south</h2>
<p>NOAA computes the Yaquina Bay tide from the gauge at ${h.a('st:california/crescent-city', 'Crescent City')}, with high water 39 minutes later, low water 35 minutes later, highs at 122 percent and lows at 111 percent. Applied to that reference, the corrections give Newport an average day of ${h.ft(s.stats.meanRange)}, against ${h.ft(cc.stats.meanRange)} at Crescent City, and spring tides of ${h.ft(s.stats.springRange)}. Two full NOAA gauges lie close by, at South Beach just across the bay and at Weiser Point a few miles up the Yaquina River, so this is a well-measured estuary despite the derived numbers.</p>
<h2>Bay front, jetties and the river above</h2>
<p>Yaquina Bay opens to the ocean between two rock jetties, and the US 101 bridge arches over the narrows just inside. The working waterfront on the north shore and the marina and marine science buildings at South Beach face each other across that water, which is why the tide here follows the ocean closely. Upstream, the river winds through mudflats and marsh toward Toledo, where NOAA predicts high water 62 minutes after Crescent City and low water 77 minutes after. The flats exposed at low water are a big part of the bay's surface, and paddlers and clam diggers on them need the upriver timing rather than the dock's. The entrance bar can be rough on an ebb against a westerly swell; the Coast Guard station by the gauge is there for a reason.</p>
<h2>Outer beaches and Yaquina Head</h2>
<p>North of the bay, Nye Beach and Agate Beach face the open Pacific, and the basalt headland of Yaquina Head, with its lighthouse, has tide pools that open on the lower tides. The deepest low of the period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}.</p>`;
  },
  faqs: [
    { q: "How much later is the tide at Toledo than in Newport, Oregon?", a: "About twenty minutes later at high water and about forty minutes later at low water, judging from NOAA's corrections: both places are predicted from Crescent City, California, with Toledo at 62 and 77 minutes and the Yaquina Bay Coast Guard station at 39 and 35 minutes. Toledo's highs also stand a little taller. Anyone working the upper river should read the Toledo times rather than the bay mouth." },
  ],
});
