import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const keys = K.inState('massachusetts').map((s) => s.key);
const e = K.extremesOf(keys);
const bo = K.st('massachusetts/boston'), hy = K.st('massachusetts/hyannis');

export default defineState({
  state: 'massachusetts',
  title: 'Massachusetts Tides 2026: Boston, Cape Cod and Nantucket',
  description: 'Massachusetts tides today: tide charts for Boston, Cape Cod, Plymouth, Gloucester and Nantucket, with 7-day high and low tide times and solunar periods. 2026.',
  intro: 'Seven stations on a coast with two tides: about ten feet north of the Cape, about three and a half feet south of it.',
  resume: `Massachusetts has two very different tides. North of Cape Cod, in Massachusetts Bay and Cape Cod Bay, the Gulf of Maine's large semidiurnal tide runs close to ten feet on an average day: ${K.ft(bo.stats.meanRange)} in Boston, ${K.ft(e.max.stats.meanRange)} in ${e.max.place}. South of the Cape, on Nantucket Sound and the islands, the tide is small, ${K.ft(hy.stats.meanRange)} in Hyannis and ${K.ft(e.min.stats.meanRange)} in ${e.min.place}, because the Atlantic tide wave nearly cancels itself near Nantucket. Both sides have two highs and two lows a day, but they do not turn at the same time. Pick a station in the tool above for today's curve, or open its page for seven days, king tides and a planner; the Cape Cod comparison puts five Cape stations on one chart.`,
  featured: 'massachusetts/boston',
  body: (h) => `
<h2>One cape, two oceans of tide</h2>
<p>Cape Cod is a hook of glacial sand between two bodies of water that behave very differently. Cape Cod Bay is part of the Gulf of Maine and shares its large tide; Nantucket Sound lies close to an amphidromic point, a place around which the tide wave rotates and where its height nearly vanishes. The result is visible on a single drive: ${h.a('st:massachusetts/plymouth', 'Plymouth')} and ${h.a('st:massachusetts/provincetown', 'Provincetown')} swing about ten feet, ${h.a('st:massachusetts/hyannis', 'Hyannis')} and ${h.a('st:massachusetts/nantucket', 'Nantucket')} about three and a half. The ${h.a('cape-cod', 'Cape Cod tide comparison')} draws them side by side.</p>
<h2>Boston as the reference</h2>
<p>NOAA predicts much of the state from the long-running ${h.a('st:massachusetts/boston', 'Boston')} gauge, including places on the Cape: Barnstable Harbor runs about ten minutes after Boston with the full height, while Pleasant Bay in Chatham runs two and a half hours late with a third of it. The corrections tell the story of each harbor: how narrow its inlet is, how far the tide must travel, how much height it loses on the way.</p>
<h2>North Shore marshes and South Shore harbors</h2>
<p>North of Boston, ${h.a('st:massachusetts/gloucester', 'Gloucester')} and the marshes of Essex, Ipswich and Plum Island drain to wide flats at low tide, prime ground for clamming. South of Boston, harbors like Plymouth and Duxbury sit behind barrier beaches and empty to channels at low water. In both, the water returns fast in the middle of the rise.</p>
<h2>Islands and the sounds</h2>
<p>Around Martha's Vineyard and Nantucket, the small tide comes with strong currents through Muskeget Channel and Woods Hole, where the sounds meet. Boaters there read current tables as much as tide tables. ${h.a('st:massachusetts/chatham', 'Chatham')}, at the elbow of the Cape, sits between both systems.</p>`,
  faqs: [
    { q: 'Why is the tide so different on the two sides of Cape Cod?', a: 'Cape Cod Bay belongs to the Gulf of Maine, where the tide is large, about ten feet on an average day. Nantucket Sound lies near an amphidromic point, where the Atlantic tide wave nearly cancels out, so its range is around three to four feet. The Cape separates two tidal systems only a few miles apart.' },
    { q: 'Which Massachusetts station has the biggest tide?', a: 'Among the stations on this site, Plymouth, Boston and Provincetown, all on Massachusetts Bay or Cape Cod Bay, have the largest average ranges, close to ten feet. Gloucester is just behind. Nantucket and Hyannis, on the sound, have the smallest, around three and a half feet.' },
    { q: 'Are Boston tide times good for the whole Massachusetts coast?', a: 'Only for the shores of Massachusetts Bay and Cape Cod Bay, where NOAA’s corrections from Boston are a few minutes. On Nantucket Sound and in the Cape’s south-shore rivers, times shift by up to two hours and heights shrink to a quarter or a third of Boston’s. Use the nearest station page.' },
  ],
});
