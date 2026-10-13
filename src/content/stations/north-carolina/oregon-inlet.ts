import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'north-carolina/oregon-inlet',
  intro: 'The Oregon Inlet marina station is on the sound side of the inlet that separates Bodie Island from Hatteras Island.',
  body: (h) => {
    const s = h.st('north-carolina/oregon-inlet'), d = h.st('north-carolina/duck');
    return `
<h2>A sound-side station, and why its tide is small</h2>
<p>The marina at Oregon Inlet sits inside the inlet, on the Pamlico Sound side of Bodie Island, and its average daily range is only ${h.ft(s.stats.meanRange)}. On the ocean beach a few miles away at ${h.a('st:north-carolina/duck', 'Duck')}, the range averages ${h.ft(d.stats.meanRange)}. The inlet is the main gap through which the ocean tide reaches the northern sounds, and most of its height is lost squeezing through. This page is for boaters at the marina and in the channels behind the inlet, not for the ocean beach.</p>
<h2>Inside the inlet, the tide shape changes</h2>
<p>NOAA predicts several points around the inlet from this marina, and their corrections show how distorted the tide becomes. At the Oregon Inlet bridge, high water comes 17 minutes earlier with almost double the high-water height, but low water comes 55 minutes earlier. In the Roanoke Sound channel, high water comes an hour and a half later with half the height. In the ocean side of the inlet the water behaves like the sea; a mile into the sound it barely moves.</p>
<h2>Running the inlet</h2>
<p>For boats heading offshore through the inlet, the current and the shoals matter far more than the height of the tide here. The channel shifts constantly, the ebb runs hard, and an ebb against an onshore swell can make the bar dangerous. Many captains prefer to cross on the flood in daylight. The lowest predicted low at the marina this period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}. The ${h.a('outer-banks', 'Outer Banks comparison')} shows the marina beside the ocean stations.</p>`;
  },
  faqs: [
    { q: 'Why is the Oregon Inlet tide so much smaller than at the beach?', a: 'The marina station sits on the sound side of the inlet. The ocean tide has to squeeze through the narrow inlet into the huge, shallow Pamlico and Roanoke sounds, and most of its height is lost, so the marina averages about a foot while the ocean beaches average three to four feet. Use an ocean station for the beach.' },
  ],
});
