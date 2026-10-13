import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'fishing-tides',
  slug: 'fishing-tides',
  group: 'fishing',
  order: 30,
  nav: 'Fishing tides',
  card: 'Moving water, flood and ebb, slack, the rule of twelfths for current strength, and how inlets and flats fish differently.',
  title: 'Fishing Tides 2026: Moving Water, Slack and Inlets',
  description: 'Fishing tides 2026: why moving water fishes best, incoming vs outgoing tide, slack water, the rule of twelfths for current, and how inlets differ from flats.',
  h1: 'Fishing the tide',
  intro: 'Anglers who read tides are really reading current, and the strength of that current follows a pattern you can sketch on a napkin.',
  resume: `For most saltwater fishing, the tide that matters is moving water: the hours when current sweeps bait past structure, out of creeks and over bars, which on a twice-daily coast means the middle of each rise and fall. By the rule of twelfths, the water moves one twelfth of its range in the first hour after a turn, two in the second, three in each of the third and fourth, then two and one, so the flow is strongest roughly two to four hours after a high or low and weakest near slack. Incoming water floods flats and marsh edges with fresh ocean water; outgoing water drains bait toward channel mouths and inlets. Bigger tides around new and full moon mean stronger currents. In inlets, slack current often lags the printed high or low, so time your drift by the current, not by the table alone.`,
  mini: { kind: 'twelfths' },
  body: (h) => {
    const hh = h.st('south-carolina/hilton-head'), oi = h.st('north-carolina/oregon-inlet'), nh = h.st('north-carolina/nags-head'), kw = h.st('florida/key-west'), ho = h.st('alaska/homer'), ff = h.st('south-carolina/folly-beach');
    const tw = (r: number, k: number) => h.ft((r * k) / 12);
    return `
<h2>Current, not height, is what fish notice</h2>
<p>A tide chart plots how high the water stands. Fish respond to something it only implies: the water's horizontal motion. When the tide flows, it carries shrimp, crabs and baitfish along edges, drop-offs and the mouths of creeks, and predators set up where that conveyor belt passes within reach. When it stops, food stops arriving, and many fish drift off or simply wait. That is the core of nearly every piece of tide advice anglers trade, and it explains why two hours of steady flow often produce more than a whole morning of still water.</p>
<p>The link between height and flow is close but not exact. NOAA's ${h.src('tide_vs_current', 'note on tides and currents')} explains the difference: the rise and fall is vertical, the current is horizontal, and in narrow passages the two can drift out of step by an hour or more.</p>

<h2>The rule of twelfths as a current meter</h2>
<p>On a semidiurnal coast the rise from low to high takes about six hours, and it is far from even. A handy approximation splits the range into twelve parts: one twelfth in the first hour, two in the second, three in the third, three in the fourth, two in the fifth and one in the last. Since height changes fastest when the most water is moving, the same numbers rank the hours by current strength.</p>
<p>Take ${h.a('st:south-carolina/hilton-head', 'Hilton Head')}, where the average day spans ${h.ft(hh.stats.meanRange)}. On such a day the first hour after low lifts the water only about ${tw(hh.stats.meanRange, 1)}, but the third and fourth hours each add about ${tw(hh.stats.meanRange, 3)}. Those two middle hours carry half the whole tide; the creeks behind the island run hardest then. The box above lets you enter any low and high and see where the water stands each hour. It assumes a six-hour rise; real tides run a bit shorter or longer, and the mixed tides of the Pacific coast are lopsided.</p>
<h3>Spring and neap change the volume</h3>
<p>The same pattern scales with the size of the day's tide. Hilton Head opens to about ${h.ft(hh.stats.springRange)} on the biggest days around new and full moon and closes to about ${h.ft(hh.stats.neapRange)} at the quarter moons, so peak-hour flow varies by a similar ratio over two weeks. Strong spring currents can mean great feeding in a creek mouth and an unfishable rip in a deep inlet; on neaps the reverse often holds. The ${h.a('spring-and-neap-tides', 'spring and neap tides guide')} tracks that cycle with a daily coefficient.</p>

<h2>Incoming or outgoing?</h2>
<p>Neither is better everywhere, and local anglers argue about it endlessly. What can be said with confidence is what each direction does to the water.</p>
<p><strong>The flood</strong> pushes clean ocean water into bays, over flats and up into marsh grass. Fish that spent the low in channels follow the rising edge to feed in shallow water they could not reach an hour earlier. On a hot summer flat the incoming water is often cooler; on a winter one it can be warmer than water that sat in the sun-starved shallows.</p>
<p><strong>The ebb</strong> drains all of that back out. Bait that hid in the grass is flushed down creek channels toward their mouths and on toward the inlet, which is why the junction of a creek and a larger channel on a falling tide is a classic spot. The ebb also carries warmer, murkier, sometimes fresher water from the back bays, and visibility at the beach can drop.</p>

<h2>Slack water and the lag in inlets</h2>
<p>Slack is the short pause when the current reverses. In open water it falls close to high or low tide. In an inlet that feeds a large bay, it can come long after, because the bay keeps filling while the ocean outside has already started to drop. ${h.a('st:north-carolina/oregon-inlet', 'Oregon Inlet')} is a striking example of how much an inlet filters the sea: the marina gauge inside averages ${h.ft(oi.stats.meanRange)} of range, while ${h.a('st:north-carolina/nags-head', 'Nags Head')} on the ocean side averages ${h.ft(nh.stats.meanRange)}. All that ocean tide squeezing through one gap is what makes the current there fierce while the sound behind barely rises.</p>
<p>For drifting or bottom fishing in a pass, current predictions, which NOAA publishes for many channels separately from tide predictions, are the better guide. Without them, expect the hardest flow in the middle hours of the tide and slack somewhat after the printed turn.</p>

<h2>Inlets, flats and open beaches fish differently</h2>
<h3>Inlets and passes</h3>
<p>Here current is concentrated and strong. Many anglers favor the hour or two either side of slack, when the flow is fishable and baits stay near the bottom without huge weights. An outgoing tide meeting incoming swell can stand up short, steep waves on the bar; small boats should treat a strong ebb at an inlet mouth with real caution.</p>
<h3>Flats and marshes</h3>
<p>Depth is the limiting factor. A flat that holds a few inches at low is only fishable for part of the flood and part of the ebb, so the tide decides when you can get there at all. In small-range waters like ${h.a('st:florida/key-west', 'Key West')}, averaging ${h.ft(kw.stats.meanRange)}, a few inches of tide and a steady wind together decide whether a flat floods.</p>
<h3>Ocean beaches and piers</h3>
<p>Surf fishing depends on the bar and the trough behind it. Around ${h.a('st:south-carolina/folly-beach', 'Folly Beach')}, with an average range of ${h.ft(ff.stats.meanRange)}, a sloughs-and-bars beach looks completely different at low than at high, and the first half of the incoming often fills troughs that were unreachable. Walk it at low to learn the structure, then fish it as water returns.</p>

<h2>Big-tide country</h2>
<p>Where the range is huge, current becomes the main hazard as well as the main attraction. At ${h.a('st:alaska/homer', 'Homer')}, on Kachemak Bay, the average day spans ${h.ft(ho.stats.meanRange)}, so the middle hours of a rise move about ${tw(ho.stats.meanRange, 3)} each. Fishing windows there are often planned around slack because anchoring or holding bottom in mid-tide flow can be impractical. Wading anglers on big-range flats should mark the time of low and be heading back while the water is still slow.</p>
<p>For when to go on a given day, the ${h.a('best-fishing-times', 'best fishing times guide')} combines tide changes with light and moon, and the ${h.a('solunar-tables', 'solunar tables')} list the periods for two weeks. Nothing here replaces local knowledge, posted rules or a weather check.</p>`;
  },
  faqs: [
    { q: 'Is fishing better on an incoming or an outgoing tide?', a: 'It depends on the spot. Rising water lets fish move onto flats, marsh edges and shallow structure to feed, so the flood often fishes well in shallow back country. Falling water flushes bait out of creeks toward channels and inlets, so creek mouths and points tend to fish best on the ebb. The common thread is current, so the slowest hours near the turn are usually the quietest.' },
    { q: 'What is slack tide and is it bad for fishing?', a: 'Slack is the short period when tidal current stops and reverses, around high or low water or a while after them in inlets. Feeding often slows because bait stops moving, but slack can be the only fishable window in a deep, fast pass, where weights hold bottom only when the flow eases. Many anglers fish the last hour of one tide and the first hour of the next.' },
    { q: 'How many hours after low tide is the current strongest?', a: 'On a coast with two tides a day, roughly two to four hours after low, and likewise after high. The rule of twelfths puts three twelfths of the range in each of the third and fourth hours, against one twelfth in the first. In inlets connected to large bays the peak can shift later, and on single-tide Gulf coasts the flow builds over a much longer rise.' },
    { q: 'Do bigger tides mean better fishing?', a: 'Often, but not always. Larger ranges around new and full moon move more water and stir more bait, which many anglers like on flats and in creeks. The same days can make deep inlets and passes too fast to fish comfortably and muddy the water near river mouths. Moderate tides between spring and neap are a good compromise in many places.' },
    { q: 'Does the tide matter for freshwater or river fishing?', a: 'Only where the river is tidal. Many coastal rivers rise and fall well upstream of the ocean, and current can even reverse near their mouths, so the same rules about moving water apply there with a delay. Farther upstream, river flow overwhelms the tide. A NOAA station on the river itself, if one exists, gives the timing better than the coast.' },
    { q: 'Why does the current still run after the predicted high tide?', a: 'Because the height and the flow are not locked together. A bay behind a narrow inlet keeps filling as long as the ocean outside stands higher than the water inside, and that can continue after the ocean has started to fall. The result is current that runs in past the printed high, with slack coming later. Current predictions for the channel show the real timing.' },
  ],
  related: ['best-fishing-times', 'solunar-tables', 'spring-and-neap-tides', 'how-to-read-a-tide-chart', 'tide-range'],
  sources: ['tide_vs_current', 'tides_tutorial', 'spring_neap', 'predictions_page'],
});
