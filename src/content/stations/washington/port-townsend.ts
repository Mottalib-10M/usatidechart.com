import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'washington/port-townsend',
  intro: 'The Port Townsend station sits at the northeast tip of the Olympic Peninsula, where Admiralty Inlet opens into Puget Sound.',
  body: (h) => {
    const s = h.st('washington/port-townsend'), se = h.st('washington/seattle');
    return `
<h2>The doorway of Puget Sound</h2>
<p>Every tide that fills Puget Sound passes Port Townsend through Admiralty Inlet. The town's gauge averages ${h.ft(s.stats.meanRange)} from lower low to higher high, less than the ${h.ft(se.stats.meanRange)} of ${h.a('st:washington/seattle', 'Seattle')} further south: the Sound amplifies the tide as it travels inland. The currents in the inlet are among the strongest in the region, and sailors on the wooden boats the town is known for plan their passages around them.</p>
<h2>Discovery Bay, Marrowstone and Whidbey</h2>
<p>NOAA predicts many nearby points from this gauge. Gardiner, at the head of Discovery Bay, has high water 47 minutes earlier with 94 percent of the height. Mystery Bay on Marrowstone Island has high water 15 minutes later and low water almost an hour later. Across the inlet, Point Partridge on Whidbey Island turns about ten minutes earlier, while Coupeville in Penn Cove is predicted from Seattle instead, 15 minutes later.</p>
<h2>Mixed tides and the long low</h2>
<p>Port Townsend's tide is strongly mixed: some days show one big ebb and a small one, and the lower low can drop far below zero, down to ${h.ft(s.stats.minLow.h)} on ${h.date(s.stats.minLow.date)}. Those big summer lows uncover the beaches below Fort Worden and the spits around the bay. The highest prediction is ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}.</p>`;
  },
  faqs: [
    { q: 'Why is the tide smaller in Port Townsend than in Seattle?', a: 'Port Townsend sits at the entrance of Puget Sound, and the tide grows as it moves south into the Sound’s long, narrowing channels. The average daily range is under nine feet at Port Townsend and over eleven in Seattle, and larger still in the southern inlets toward Olympia.' },
  ],
});
