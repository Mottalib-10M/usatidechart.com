import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'massachusetts/hyannis',
  intro: 'The Hyannis Port station, on Nantucket Sound, gives the tide for the island ferries’ home port and the south shore of mid-Cape.',
  body: (h) => {
    const s = h.st('massachusetts/hyannis'), pl = h.st('massachusetts/plymouth');
    return `
<h2>A small tide on the Sound</h2>
<p>Hyannis averages only ${h.ft(s.stats.meanRange)} between low and high, against ${h.ft(pl.stats.meanRange)} in ${h.a('st:massachusetts/plymouth', 'Plymouth')} on Cape Cod Bay. The reason lies offshore: Nantucket Sound is close to a point where the Atlantic's twice-daily tide wave nearly cancels itself, so the water level hardly swings while the currents in the sound stay strong. For swimmers at Kalmus or Craigville Beach, the beach width changes far less over a day than on the bay side.</p>
<h2>Barnstable Harbor, six miles and a world away</h2>
<p>Barnstable Harbor, straight north across the Cape, is predicted by NOAA from Boston with high water 11 minutes later and the full Boston range, close to ten feet. Its marshes and Sandy Neck flats drain spectacularly, while Hyannis barely moves. To the east and west along the south shore, the rivers lag: the Bass River in South Yarmouth runs nearly two hours behind Boston at 29 percent of its height, and Cotuit and Poponesset are similar.</p>
<h2>Ferries and moorings</h2>
<p>Ferry schedules to Nantucket and Martha's Vineyard do not wait for the tide, and the harbor is dredged for them. For small boats in the inner harbor and in Lewis Bay, though, a negative low such as ${h.ft(s.stats.minLow.h)} on ${h.date(s.stats.minLow.date)} exposes the shallows. The ${h.a('st:massachusetts/nantucket', 'Nantucket page')} shows the tide at the other end of the crossing.</p>`;
  },
  faqs: [
    { q: 'Why is the tide so small in Hyannis compared with the Cape Cod Bay side?', a: 'Hyannis faces Nantucket Sound, where the main Atlantic tide wave nearly cancels out, so its average range is a third of the bay side’s. Barnstable Harbor, six miles north on Cape Cod Bay, is predicted by NOAA with Boston’s full range of about ten feet. Same town, two very different tides.' },
  ],
});
