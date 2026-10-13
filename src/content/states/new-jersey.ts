import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const keys = K.inState('new-jersey').map((s) => s.key);
const e = K.extremesOf(keys);

export default defineState({
  state: 'new-jersey',
  title: 'New Jersey Tides 2026: Cape May to Long Beach Island Charts',
  description: 'New Jersey tides today: tide charts for Cape May, Wildwood, Ocean City, Atlantic City and Long Beach Island, with 7-day high and low tide times. 2026.',
  intro: 'Five stations on the Jersey Shore, where barrier islands put an ocean tide in front and a smaller, later bay tide behind.',
  resume: `The Jersey Shore is a chain of barrier islands, and every town on it has two tides: the Atlantic in front, the bay behind. On the ocean the tide is semidiurnal and regular, two highs and two lows a day, with an average range of ${K.ft(e.max.stats.meanRange)} at ${e.max.place}, the largest of the five stations on this site; at ${e.min.place} the inlet station averages ${K.ft(e.min.stats.meanRange)}, and Barnegat Bay behind it hardly moves at all. In the back bays and thorofares, high water usually comes thirty minutes to an hour and a half after the ocean, with heights close to or smaller than the ocean's. Pick a station in the tool above for today's curve and times, or open its page for seven days, king tides and a planner. NOAA predicts most of the southern shore from its Atlantic City ocean station.`,
  featured: 'new-jersey/cape-may',
  body: (h) => `
<h2>Inlets decide the bay tide</h2>
<p>Water reaches the bays behind the islands only through inlets, and their size sets how much tide gets in. Behind ${h.a('st:new-jersey/atlantic-city', 'Atlantic City')}, the thorofares turn 40 to 90 minutes after the ocean with nearly the full height. Behind ${h.a('st:new-jersey/long-beach-island', 'Long Beach Island')}, Barnegat Bay is a long lagoon fed mainly by one narrow inlet, and NOAA predicts its shore at a tenth of the ocean's range, three hours late: there, the wind moves the water more than the moon.</p>
<h2>Cape May: two waters</h2>
<p>At the southern tip, ${h.a('st:new-jersey/cape-may', 'Cape May')} sits between the Atlantic and Delaware Bay. NOAA predicts the bay-side beaches from Lewes, Delaware, and the ocean side from Atlantic City, and the timing differs by more than half an hour. The rips off the point mark where the bay's tidal current meets the ocean.</p>
<h2>Flooding on the bay side</h2>
<p>Bayside streets in many shore towns take water on the highest tides of the year, especially with a northeast wind that holds water in the bays for several tides in a row. The station pages list the six highest predicted tides of the period; the ${h.a('king-tides', 'king tides guide')} explains why they cluster around the new and full moons near perigee.</p>
<h2>Beaches that change with the tide</h2>
<p>Jersey Shore beaches are mostly flat, sandy and fronted by bars, and the tide changes how they work. At low tide the bars come close to the surface and waves break further out; at high tide they roll in and break on the beach. Anglers in the surf fish the troughs on the rising tide, and the jetties at the inlets fish best when the water is moving. Lifeguarded beaches move their flags as the water rises.</p>`,
  faqs: [
    { q: 'How much later is high tide in the New Jersey back bays?', a: 'Typically 30 minutes to an hour and a half after the ocean, depending on the inlet and the distance. NOAA predicts the Atlantic City thorofares 38 to 88 minutes after the ocean, the Wildwood back bays about an hour after. Barnegat Bay is an exception, with a tiny tide three hours late.' },
    { q: 'Why does Barnegat Bay have almost no tide?', a: 'Because the bay is long, shallow and connected to the ocean mainly through narrow Barnegat Inlet, which lets in only a fraction of the ocean tide. NOAA predicts its shore stations at about a tenth of the ocean range or less. Wind, especially a sustained northeast or west wind, moves the bay level more than the tide.' },
    { q: 'Which New Jersey beach has the biggest tide?', a: 'Among the five stations on this site, Cape May has the largest average range, a little over five feet, followed by Wildwood and Atlantic City. Barnegat Inlet at Long Beach Island has the smallest, about two and a half feet, and the bay behind it far less.' },
  ],
});
