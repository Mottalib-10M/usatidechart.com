import { definePage } from '../../lib/page-types';
import { full } from '../../lib/stations';
import { skyOf, dayRating, type SkyRow } from '../../lib/engine/solunar';

/** Days of the prediction file by site rating (1 to 4 stars). */
function ratings(key: string) {
  const counts = [0, 0, 0, 0, 0];
  const rows = full(key).sky as unknown as SkyRow[];
  for (const r of rows) counts[dayRating(skyOf(r)).score]++;
  return { days: rows.length, four: counts[4], one: counts[1] };
}

export default definePage({
  id: 'best-fishing-times',
  slug: 'best-fishing-times',
  group: 'fishing',
  order: 31,
  nav: 'Best fishing times',
  card: 'Low light, a tide change and the moon: how to stack the odds on a fishing day, and what solunar tables can and cannot claim.',
  title: 'Best Fishing Times 2026: Dawn, Dusk, Tides and Moon',
  description: 'Best fishing times 2026: why dawn and dusk work, how tide changes and moving water matter, what solunar periods and moon phase add, how mixed the evidence is.',
  h1: 'Best times to go fishing',
  intro: 'No clock guarantees a bite, but three things anglers can look up in advance line up with good days more often than chance would suggest.',
  resume: `The best fishing times on salt water usually come when three things overlap: low light at dawn or dusk, moving water in the hours after a tide change, and, if you follow the tradition, a solunar period around the moon's passage overhead or underfoot. Light and current have the strongest support from anglers and fisheries biology alike, since many fish feed more boldly in dim light and bait moves when water moves. Solunar tables, first published by John Alden Knight in 1926, add four daily windows tied to the moon; studies of them give mixed results, so treat them as a tiebreaker rather than a forecast. Days around new and full moon bring the largest tides and the strongest currents, which helps in creeks and on flats and can be too much in deep passes. Weather, water temperature and season still decide whether fish are there at all.`,
  mini: { kind: 'solunar' },
  body: (h) => {
    const tp = h.st('florida/tampa'), pa = h.st('texas/port-aransas'), mo = h.st('california/monterey');
    const rt = ratings(tp.key);
    const major = (h.P.solunar.majorHalfMinutes * 2) / 60, minor = h.P.solunar.minorHalfMinutes * 2;
    return `
<h2>Start with the light</h2>
<p>If you could pick only one factor, most experienced anglers would pick the edges of the day. In the hour around sunrise and the hour around sunset, predators that hunt by sight gain an advantage over bait that relies on spotting them, surface water is often cooler in summer, and boat traffic is lighter. Fisheries researchers have documented twilight peaks in feeding for many marine species, which gives this old habit a sounder footing than most fishing lore.</p>
<p>That does not make noon useless. Deep water, overcast skies and dirty water all soften the midday slump, and on cold winter flats the warmest afternoon hours can be the most active. Still, a plan that puts you on the water at first light rarely goes wrong. Each station page lists sunrise and sunset for its exact position, and the tide chart shades the night so you can see how the light lines up with the tide.</p>

<h2>Then find the moving water</h2>
<p>Current delivers food. The hours after a tide turns, when the flow builds from nothing toward its peak, are the ones many coastal anglers circle, and the ${h.a('fishing-tides', 'fishing tides guide')} explains why the third and fourth hours of a rise or fall move the most water. A low that turns just before sunrise, followed by two hours of building flood, is a strong combination; a slack high at sunrise is a weaker one.</p>
<p>How much the tide matters depends on the coast. At ${h.a('st:florida/tampa', 'Tampa')} the average day swings ${h.ft(tp.stats.meanRange)}, enough to move bait through passes and over grass flats. At ${h.a('st:texas/port-aransas', 'Port Aransas')} the average is only ${h.ft(pa.stats.meanRange)}, and a single high on most days means the water moves in one long push; wind direction can change the water level there as much as the tide does. On the open Pacific at ${h.a('st:california/monterey', 'Monterey')}, ${h.typeWords(mo.key)}, so one tide change of the day carries much more water than the other.</p>

<h2>Solunar periods: a tradition worth knowing</h2>
<p>The moon-based windows printed in fishing almanacs go back to tables John Alden Knight began selling in the 1920s. Two kinds of window fill each day in his scheme. The long ones bracket the moments when the moon crosses the local meridian, once above the horizon and once below it; the short ones bracket its rising and setting. On this site a long window spans ${major} hours and a short one ${minor} minutes, both worked out from each gauge's own coordinates, and the box above lists today's for the station you choose.</p>
<p>What does the science say? Results point in different directions. A few analyses of catch logs have reported small moon-position effects for particular fish in particular waters, while others detected nothing reliable. Few studies can separate the windows from the anglers: people who trust the tables fish harder during them. And because the same moon that defines the windows also drives the tide, a productive window that lines up with strong flow may owe its reputation to the current. Treat the periods as a way to choose between two otherwise similar hours, never as a reason to cancel a trip.</p>
<h3>Reading the star rating</h3>
<p>The stars on station pages follow a published formula, set out on the ${h.a('method', 'method page')}, built from moon phase and from overlap between a window and the hour around sunrise or sunset; no catch data goes into it. Over the prediction file for Tampa, ${rt.four} of ${rt.days} days reach the top score and ${rt.one} get the minimum, which shows how selective the top mark is. Think of four stars as "the traditional calendar likes this day", then check the tide and the wind before believing it.</p>

<h2>What the moon phase really changes</h2>
<p>Whatever one thinks of solunar windows, the moon phase has two effects nobody disputes. First, it sets the size of the tide: around new and full moon the ranges are largest and currents strongest, as the ${h.a('spring-and-neap-tides', 'spring and neap tides guide')} shows, while the quarter moons bring gentler water. Second, a full moon lights the night. Some anglers report slower dawn fishing after a bright full-moon night, reasoning that fish fed in the dark; others swear by those nights for species that hunt under moonlight. Both stories fit the same facts, which is a good reminder of how hard this is to test.</p>

<h2>After dark and in the middle of the day</h2>
<p>The edges of the day are not the only good hours. Lighted docks and bridges draw bait after sunset, and the current under them works the same at midnight as at dawn, so a night tide change near a light can be as productive as any sunrise. In the middle of a bright summer day the advice flips toward depth and shade: channel edges, the down-current side of pilings, the shadow lines under structure. A midday session timed to the strongest hour of flow often beats a sunrise one spent on slack water. The tide chart's shaded night bands make it easy to spot when the big moving hours fall in darkness.</p>

<h2>Putting it together for a real trip</h2>
<p>A practical routine takes five minutes the evening before:</p>
<ul>
<li>Open the station nearest your spot and note sunrise, sunset and the tide turns of the day.</li>
<li>Look for a turn within an hour or two of first or last light, so the building current meets the low light.</li>
<li>Check the solunar bars; if one overlaps that window, good, and if two candidate mornings tie, let the tables break the tie.</li>
<li>Read the marine forecast. A cold front, a blow from the wrong direction or a muddy river can erase every other advantage.</li>
</ul>
<p>Season and water temperature sit above all of this. Fish follow food and comfortable water through the year, and the right tide at the wrong time of year will not put them in front of you. Local regulations, which change, govern what you may keep; check them with your state agency before you go. The ${h.a('solunar-tables', 'solunar tables')} give the periods two weeks at a time for planning ahead.</p>`;
  },
  faqs: [
    { q: 'What time of day is best for saltwater fishing?', a: 'Early morning and late evening, as a rule, because many predators feed more aggressively in low light and the water is often cooler and quieter. The best of those sessions usually coincide with a tide change, so the current builds while the light is dim. On overcast days or in deep water, midday can fish nearly as well.' },
    { q: 'How long before a tide change should I start fishing?', a: 'Arriving an hour or so before the turn is a common habit. It lets you set up during the slow water, fish the first push of current as it builds, and stay into the strongest flow two to four hours later. In inlets, where slack often comes after the printed high or low, an earlier start leaves room for that lag. On single-tide Gulf coasts the build is slower, so timing matters less.' },
    { q: 'Is fishing better during a full moon?', a: 'Around the full moon, and the new moon too, tides are larger and currents stronger, which often stirs up feeding in creeks, on flats and along beaches. The bright night may also shift some feeding into darkness, and some anglers find dawn slower afterward. There is no single answer; the phase matters most through the size of the tide it brings.' },
    { q: 'Why do fish often bite better at dawn and dusk?', a: 'Dim light favors predators that ambush bait from below or from cover, because their prey sees them less clearly, and many small fish and shrimp move up in the water at twilight. Summer surface water is also cooler then, and fewer boats disturb the shallows. The pattern is not universal: some species feed at night, others at slack midday, but twilight peaks are common.' },
    { q: 'Should I plan fishing around the tide or around sunrise?', a: 'Both, if you can make them meet. Light and current each matter, and the best sessions often come when a tide change falls within an hour or two of sunrise or sunset. When you must choose, coastal anglers in channels and inlets usually favor the tide, while those on calm beaches or in deep water often favor the light.' },
    { q: 'Does barometric pressure affect fishing?', a: 'Many anglers believe falling pressure ahead of a front triggers feeding and that high, steady pressure after a front slows it. The idea is widely repeated but hard to prove, because pressure changes come with wind, clouds, temperature and water clarity that also affect fish. What is certain is that pressure moves the water level slightly, so tides run a little higher in a low.' },
  ],
  related: ['solunar-tables', 'fishing-tides', 'spring-and-neap-tides', 'tides-near-me', 'how-to-read-a-tide-chart'],
  sources: ['astronomy_engine', 'tides_tutorial', 'spring_neap', 'eclipses_2026'],
});
