import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const pv = K.st('massachusetts/provincetown'), pl = K.st('massachusetts/plymouth'), ch = K.st('massachusetts/chatham'), hy = K.st('massachusetts/hyannis'), na = K.st('massachusetts/nantucket');

export default definePage({
  id: 'cape-cod', slug: 'cape-cod', group: 'tides', order: 30,
  nav: 'Cape Cod tides', card: 'Five Cape stations on one chart: the bay side against the sound side.',
  title: 'Cape Cod Tide Chart 2026: Bay Side vs Sound Side Compared',
  description: 'Cape Cod tide chart: Provincetown, Plymouth, Chatham, Hyannis and Nantucket on one chart, with high and low tide times for today and 30 days ahead. 2026.',
  h1: 'Cape Cod tide chart: five stations, two tides',
  intro: 'Choose a day: the curves of the bay side and the sound side are drawn together, with their times side by side.',
  resume: `Cape Cod has two tides, and this chart shows them on the same scale. On the Cape Cod Bay side, the tide of the Gulf of Maine averages ${K.ft(pv.stats.meanRange)} at Provincetown and ${K.ft(pl.stats.meanRange)} at Plymouth. On the Nantucket Sound side it shrinks to ${K.ft(hy.stats.meanRange)} at Hyannis and ${K.ft(na.stats.meanRange)} at Nantucket, because the Atlantic tide wave nearly cancels itself near Nantucket. Chatham's Stage Harbor, at the elbow, averages ${K.ft(ch.stats.meanRange)}. The two sides do not turn at the same time either: compare the curves for any day in the next month. Each station name opens its page, with seven days of times, the year's king tides, the lowest lows and a planner for walks on the flats or a launch at a harbor ramp, so the comparison here leads straight to the details of the place you chose.`,
  tool: 'compare',
  stations: ['massachusetts/provincetown', 'massachusetts/plymouth', 'massachusetts/chatham', 'massachusetts/hyannis', 'massachusetts/nantucket'],
  body: (h) => `
<h2>Why the sound side barely moves</h2>
<p>The tide is a wave that travels around ocean basins. In some places, called amphidromic points, the wave's crests and troughs rotate around a center where the height nearly vanishes. One lies close to Nantucket. The farther a shore is from that point, the bigger its tide: Cape Cod Bay, part of the Gulf of Maine and far from the point, gets the full regional range; Nantucket Sound, near it, gets a fraction. The currents in the sound stay strong even though the water level hardly changes, which surprises boaters used to the bay.</p>
<h2>Same town, different water</h2>
<p>Several Cape towns touch both sides. Barnstable has its harbor on the bay, predicted by NOAA from Boston with the full height, and Hyannis on the sound with a third of it. In ${h.a('st:massachusetts/chatham', 'Chatham')}, Pleasant Bay on the ocean side lags Boston by about two and a half hours. Before a walk on the flats, a clamming trip or a launch, pick the station on the water where you will be.</p>
<h2>Using the chart</h2>
<p>The chart draws each station's predicted curve for the chosen day on a common vertical scale in feet above MLLW, with a red line at the current time when the day is today. The table gives each station's highs, lows and range. Curves come from NOAA's hourly predictions for these five reference stations. For the islands, ${h.a('st:massachusetts/nantucket', 'Nantucket')} is on the chart; Martha's Vineyard has a similar small tide.</p>`,
  faqs: [
    { q: 'Is high tide at the same time all over Cape Cod?', a: 'No. The bay side and the sound side belong to different tidal systems, and inside harbors and bays the lag grows: Pleasant Bay in Chatham runs about two and a half hours behind Boston. Compare the five curves on this chart for your day, then use the station on your side of the Cape.' },
    { q: 'Where is the biggest tide on Cape Cod?', a: 'On the Cape Cod Bay side, from Plymouth to Provincetown, where the average range is close to ten feet and the flats at Brewster and Wellfleet uncover for a long way at low tide. The Nantucket Sound side averages about three and a half feet.' },
    { q: 'When are the Brewster flats exposed?', a: 'Around low tide on the Cape Cod Bay side, for a few hours either side of the low, longest on the days near the new and full moon. Brewster lies on the same bay as Provincetown and Plymouth, so use their curves for the time of the low, and head back as soon as the tide turns: the flats flood quickly.' },
    { q: 'Which station should I use for Martha’s Vineyard?', a: 'Nantucket, on this chart, has the closest kind of tide: small, around three and a half feet or less, with strong currents in the sounds. NOAA keeps separate reference stations at Vineyard Haven and Edgartown; for the island harbors, look up those two.' },
  ],
  related: ['st:massachusetts/provincetown', 'st:massachusetts/chatham', 'st:massachusetts/hyannis', 'state:massachusetts', 'tide-range'],
  sources: ['tides_tutorial', 'tide_types', 'coops_api'],
});
