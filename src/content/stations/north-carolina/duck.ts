import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'north-carolina/duck',
  intro: 'The Duck pier, a long research pier on the ocean side of the northern Outer Banks, is the reference tide station for this stretch of coast.',
  body: (h) => {
    const s = h.st('north-carolina/duck');
    return `
<h2>A research pier as the coast's reference</h2>
<p>The pier at Duck reaches far out across the surf zone and has been used for decades to study waves and the beach. Its tide gauge is the reference NOAA uses for much of the northern Outer Banks and as far as the Virginia Beach oceanfront. The average day here runs ${h.ft(s.stats.meanRange)} from low to high. Kitty Hawk's ocean beach, six miles south, is predicted from Duck with the same times and a slightly lower low.</p>
<h2>Ocean and sound: one town, two waters</h2>
<p>Duck is a thin strip between the Atlantic and Currituck Sound, and the two sides could hardly be more different. The ocean rises and falls by several feet twice a day; the sound, closed off from the sea by the barrier island and fed by distant inlets, has almost no lunar tide at all and moves mostly with the wind. Sunset watchers on the sound-side boardwalk see the water level change with a southwest or northeast breeze, not with the moon. For the ocean beach, the times on this page are the ones to use.</p>
<h2>Surf, sand and the low-tide trough</h2>
<p>On this coast a sandbar usually runs parallel to the beach with a trough inside it. At low tide the bar is shallow and waves break on it; at high tide they roll over it and break on the beach. The trough can carry a current along the shore and out through gaps in the bar. The lowest predicted low this period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}. The ${h.a('outer-banks', 'Outer Banks comparison')} puts Duck next to Nags Head, Oregon Inlet and Hatteras.</p>`;
  },
  faqs: [
    { q: 'Is there a tide on Currituck Sound at Duck?', a: 'Hardly. Currituck Sound is separated from the ocean by the barrier island and connects to the sea only through distant inlets, so its lunar tide is tiny. Its level changes mostly with the wind: a strong southwest wind piles water to one end and a northeast wind to the other. The tide times on this page are for the ocean side.' },
  ],
});
