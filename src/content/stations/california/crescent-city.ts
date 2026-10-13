import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'california/crescent-city',
  intro: 'Crescent City harbor, a few miles below the Oregon line, holds the NOAA gauge from which much of the Oregon coast is predicted.',
  body: (h) => {
    const s = h.st('california/crescent-city'), sf = h.st('california/san-francisco');
    return `
<h2>Where the Pacific tide starts to grow</h2>
<p>Coming north from San Francisco, the tide gets taller. The average day at Crescent City spans ${h.ft(s.stats.meanRange)}, against ${h.ft(sf.stats.meanRange)} at the Golden Gate, and the strongest spring tides open to ${h.ft(s.stats.springRange)}. That growth continues up the Oregon coast, which is why NOAA uses this harbor as the reference for several Oregon bays: Yaquina Bay at ${h.a('st:oregon/newport', 'Newport')} is predicted from here with high water 39 minutes later and highs at 122 percent. A table for a northern Oregon estuary often has Crescent City behind it.</p>
<h2>A harbor that knows tsunamis</h2>
<p>The town is known among oceanographers for another kind of wave. The shape of the seafloor offshore focuses tsunami energy toward this stretch of coast, and the harbor was badly damaged in 1964, after the great Alaska earthquake, and again in 2011, after the earthquake off Japan. A tsunami is not a tide, and nothing on this page predicts one. Still, a surge that arrives near high water reaches farther inland, and the evacuation signs posted in town are worth reading before a visit.</p>
<h2>Walking out to Battery Point</h2>
<p>Battery Point Lighthouse stands on a small islet joined to the mainland only at lower tides. The crossing is short, but the gap fills on the rising water and the rocks are slippery. Go on a falling tide, check the low time and height on this page for your day, and leave the islet well before the turn. Around the new and full moon the lows here drop below the chart zero, the deepest at ${h.ft(s.stats.minLow.h)} on ${h.date(s.stats.minLow.date)}.</p>`;
  },
  faqs: [
    { q: "Why is Crescent City used to predict tides in Oregon?", a: "Crescent City has a long tide record on the open coast just south of the state line, so NOAA uses it as the reference for many Oregon stations. Each of them gets a time and height correction from it: Yaquina Bay near Newport, for example, comes about 40 minutes later at high water with highs about a fifth taller. The Oregon pages on this site show those corrections station by station." },
  ],
});
