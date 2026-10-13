import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'massachusetts/plymouth',
  intro: 'The Plymouth station is in Plymouth Harbor, at the western corner of Cape Cod Bay, where the bay’s full ten-foot tide reaches the shore.',
  body: (h) => {
    const s = h.st('massachusetts/plymouth');
    return `
<h2>A harbor behind a long beach</h2>
<p>Plymouth Harbor is enclosed by Plymouth Beach, a barrier spit that runs out from the south shore, and by Duxbury Beach to the north. Inside, the harbor and Duxbury Bay are shallow and drain to wide flats and channels at low water. The average day moves ${h.ft(s.stats.meanRange)} here, among the biggest ranges in Massachusetts, because Cape Cod Bay as a whole carries a much larger tide than Nantucket Sound south of the Cape.</p>
<p>For anyone mooring or launching in the harbor, that range is the whole story: a channel that floats a boat at mid-tide can be a ribbon of water between sand at the low. Duxbury Harbor, five miles north, has its own reference station and a very similar tide.</p>
<h2>Shellfish flats and the long walk</h2>
<p>At low tide the flats inside Plymouth Beach and toward Duxbury Bay open wide. They draw clammers and walkers, and they fill quickly once the tide turns because so much ground sits within a foot or two of the low-water line. Sand that looks dry can be cut off by a channel that fills behind you. The lowest predicted low of the period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}.</p>
<h2>Same bay, other side</h2>
<p>Provincetown, at the far end of Cape Cod Bay, has a tide almost identical in size; Hyannis on the south side of the Cape has about a third of it. The ${h.a('cape-cod', 'Cape Cod tide comparison')} puts these stations on one chart. The highest prediction here is ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}.</p>`;
  },
  faqs: [
    { q: 'Why does Plymouth have a much bigger tide than Hyannis?', a: 'Because they face different waters. Plymouth is on Cape Cod Bay, an arm of the Gulf of Maine, where the tide averages around ten feet. Hyannis faces Nantucket Sound, which lies near a point where the Atlantic tide nearly cancels out, so its range is about a third as large. The two are less than twenty miles apart.' },
  ],
});
