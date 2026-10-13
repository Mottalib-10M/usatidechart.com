import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'alaska/homer',
  intro: 'The Homer station is at Coal Point on the Homer Spit, on Kachemak Bay near the mouth of Cook Inlet.',
  body: (h) => {
    const s = h.st('alaska/homer');
    return `
<h2>A spit in a big-tide bay</h2>
<p>The Homer Spit reaches four and a half miles into Kachemak Bay, and its harbor sits at the end. The tide here averages ${h.ft(s.stats.meanRange)} from low to high and reaches ${h.ft(s.stats.springRange)} on spring tides, smaller than at Anchorage but still among the largest in the country. Ramps and floats at the harbor are built for that range; at a minus tide the bottom of a ramp can be far from the water.</p>
<h2>Minus tides and tidepooling</h2>
<p>The lowest tides of the year, down to ${h.ft(s.stats.minLow.h)} on ${h.date(s.stats.minLow.date)}, uncover rocky reefs and pools along the shores of the bay that are under water most of the time. Beach walkers and clam diggers watch for those days, and have to keep an eye on the clock: with this much range, the water comes back quickly, and the flats can cut off a path to shore.</p>
<h2>Across the bay</h2>
<p>Halibut Cove, Sadie Cove and Tutka Bay on the south shore are predicted by NOAA from Seldovia, with times within a few minutes and small height adjustments. Water taxis to the south shore and kayakers crossing the bay plan around the current at the end of the spit, which runs hard on big tides. For the head of Cook Inlet, see ${h.a('st:alaska/anchorage', 'Anchorage')}.</p>`;
  },
  faqs: [
    { q: 'How big are the tides in Homer, Alaska?', a: 'Very big: the average day moves around eighteen feet between low and high, and spring tides add several feet more. At a minus tide the harbor ramps reach far down, and wide beaches and reefs appear. The water returns fast, so beach walkers on Kachemak Bay start out before the low and head back early.' },
  ],
});
