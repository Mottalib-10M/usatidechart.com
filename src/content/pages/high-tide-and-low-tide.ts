import { definePage } from '../../lib/page-types';
import { full } from '../../lib/stations';

/** Average minutes of a rise (low to high) and of a fall (high to low), and highs per day, from NOAA's events. */
function rhythm(key: string) {
  const e = full(key).events;
  const rise: number[] = [], fall: number[] = [];
  for (let i = 1; i < e.length; i++) (e[i][2] === 1 ? rise : fall).push(e[i][0] - e[i - 1][0]);
  const avg = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
  const highs = e.filter((x) => x[2] === 1);
  const gap = (highs[highs.length - 1][0] - highs[0][0]) / (highs.length - 1);
  return { rise: avg(rise), fall: avg(fall), gap };
}
const hm = (min: number) => { const r = Math.round(min), m = r % 60; return `${Math.floor(r / 60)} hours ${m} minute${m === 1 ? '' : 's'}`; };

export default definePage({
  id: 'high-tide-and-low-tide',
  slug: 'high-tide-and-low-tide',
  group: 'tides',
  order: 11,
  nav: 'High and low tide',
  card: 'What causes high and low tide, why the times slip each day and how high the water really gets at US stations.',
  title: 'High Tide and Low Tide 2026: Times, Causes, Heights',
  description: 'High tide and low tide in 2026: what causes them, why tide times run about 50 minutes later each day, how high and low the water gets, and the next tide times.',
  h1: 'High tide and low tide',
  intro: 'Two bulges of ocean, a turning Earth and a moon that moves along its orbit explain nearly everything about the times printed on a tide page.',
  resume: `High tide is the moment the water stops rising and low tide the moment it stops falling; on most US coasts each happens twice in a lunar day of about 24 hours and 50 minutes, so consecutive highs come roughly 12 hours and 25 minutes apart and today's tide times run close to 50 minutes later than yesterday's. The moon's pull, with help from the sun, raises two bulges of water that the Earth rotates through, while the shape of each coast decides how late and how big the tide arrives. For today's high tide and low tide at a particular beach, use the tool below or open that station page: the times come from NOAA predictions for that very gauge. Heights are in feet above the average lower low, so a low can read below zero, and wind can lift or drop the real water by a foot or more.`,
  mini: { kind: 'next' },
  body: (h) => {
    const bo = h.st('massachusetts/boston'), se = h.st('washington/seattle'), an = h.st('alaska/anchorage'), hy = h.st('massachusetts/hyannis'), gi = h.st('louisiana/grand-isle');
    const rb = rhythm(bo.key), ra = rhythm(an.key), rh = rhythm(hy.key);
    return `
<h2>Two bulges and a planet turning through them</h2>
<p>The moon pulls hardest on the side of the Earth that faces it and least on the far side. That difference stretches the oceans into two bulges, one under the moon and one opposite. As the planet spins, a given harbor passes through both bulges and both troughs between them, which gives the familiar pair of highs and pair of lows. The sun does the same thing with a bit less than half the moon's strength, because it is so much farther away, and the two effects add or partly cancel depending on how the bodies line up.</p>
<p>That picture is the textbook start. Real oceans are bounded by continents, so the tide behaves more like a wave sloshing around each ocean basin than like a fixed bulge. NOAA's ${h.src('tides_tutorial', 'tides and water levels tutorial')} describes both views; for reading a tide page, the useful consequence is that every coast has its own timing and its own height.</p>

<h2>Why tomorrow's tides come later</h2>
<p>The moon travels along its orbit in the same direction the Earth turns, so the planet needs extra time each day to bring a harbor back under it: about 24 hours and 50 minutes. Two highs share that lunar day. At ${h.a('st:massachusetts/boston', 'Boston')} the average gap between one high and the next over the prediction period is ${hm(rb.gap)}, which is why a high at 7 AM on Monday drifts to around 8 AM by Tuesday morning and past 1 PM by the weekend.</p>
<p>Some places break the two-a-day habit. At ${h.a('st:louisiana/grand-isle', 'Grand Isle')} the once-daily constituents dominate, and ${h.int(gi.stats.oneHighShare * 100)}% of days bring a single high. A single tide still slips later each day, but by the full 50 minutes on one event instead of splitting it between two.</p>

<h2>High water rarely comes when the moon is overhead</h2>
<p>If the bulge sat right under the moon, high tide would match the moon's passage everywhere. It does not. Friction with the seabed and the time a tide wave needs to cross a continental shelf, enter a bay or climb a river shift the arrival by hours, and the delay is different at every gauge. Two harbors an hour's drive apart can have tides several hours out of step. That is the reason tide times are always given for a named station, and why the corrections NOAA publishes for subordinate stations are counted in minutes from a reference gauge.</p>

<h2>How high is high tide?</h2>
<p>There is no single answer, even at one place. At Boston an ordinary high reaches ${h.ft(bo.stats.meanHigh)} above Mean Lower Low Water, NOAA's Mean High Water datum, the average of every high over its 19-year epoch, stands at ${h.ft(bo.datums!.MHW!)}, and Mean Higher High Water, the average of the taller high of each day, at ${h.ft(bo.datums!.MHHW!)}. Around a new or full moon the water climbs further; the tallest prediction of this period is ${h.ft(bo.stats.maxHigh.h)} on ${h.date(bo.stats.maxHigh.date)}. Those biggest days are the subject of the ${h.a('king-tides', 'king tides guide')}.</p>
<p>The swing between high and low follows a two-week pulse as well. When the sun and moon line up, at new and full moon, Boston's range opens to about ${h.ft(bo.stats.springRange)} on the biggest days; at the quarter moons, when they pull at right angles, it closes to about ${h.ft(bo.stats.neapRange)}. So the same harbor can offer a high that floods the lowest parking lot by the seawall one week and one that stays politely below the docks the next. The ${h.a('spring-and-neap-tides', 'spring and neap tides guide')} follows that pulse with a daily coefficient, and a glance at it tells you whether today's numbers sit at the top or the bottom of the month.</p>
<p>On the Pacific side, consecutive highs are often unequal. In ${h.a('st:washington/seattle', 'Seattle')} the two highs of a day differ by ${h.ft(se.stats.highInequality)} on average, so "high tide today" may mean a modest morning peak followed by a much fuller evening one, or the reverse a week later.</p>

<h2>Low tide, the half people plan around</h2>
<p>Beachcombers, clammers and anyone launching a deep keel care more about lows than highs. Boston's ordinary low sits near ${h.ft(bo.stats.meanLow)}, close to the chart zero. Because that zero is an average, many lows dip below it: the lowest prediction there is ${h.ft(bo.stats.minLow.h)} on ${h.date(bo.stats.minLow.date)}. Seattle's lows are even more unequal than its highs, ${h.ft(se.stats.lowInequality)} apart on an average day, so one low barely uncovers the beach while the next drains it. The ${h.a('negative-low-tides', 'negative low tides guide')} explains when the deepest ones come.</p>

<h2>Rising and falling do not always take the same time</h2>
<p>In open water the climb and the drop last about the same. In shallow estuaries the tide wave deforms: its crest travels faster than its trough, so the water can rise in less time than it falls. ${h.a('st:alaska/anchorage', 'Anchorage')}, at the head of Cook Inlet, shows it clearly. Its average rise takes ${hm(ra.rise)}, its average fall ${hm(ra.fall)}. The opposite happens at ${h.a('st:massachusetts/hyannis', 'Hyannis')} on Nantucket Sound, where the rise lasts ${hm(rh.rise)} and the fall ${hm(rh.fall)}. A lopsided tide means the incoming water arrives faster than a symmetric picture would suggest, which matters on flats.</p>

<h2>Getting today's high and low tide times</h2>
<p>The quickest route is the box above: choose a station and it gives the height right now, whether the water is rising or falling and how long until the next high and the next low. Every ${h.a('tides-near-me', 'station near you')} has its own page with seven days of times, sunrise and sunset, and a planner. Three habits keep those numbers useful:</p>
<ul>
<li>Pick the gauge on the same water as you, ocean side or sound side, since inlets delay and shrink the tide.</li>
<li>Read the times in the station's zone, which the page states, especially when planning from another state.</li>
<li>Treat the heights as the astronomical prediction. Onshore wind and falling pressure pile water up; offshore wind and high pressure hold it down.</li>
</ul>
<p>These are predictions, not live measurements, and they are not for navigation. The ${h.a('how-to-read-a-tide-chart', 'tide chart guide')} shows how to read the curve between the times.</p>`;
  },
  faqs: [
    { q: 'How many high tides are there in a day?', a: 'Usually two along the Atlantic, the Pacific and in Alaska, one roughly every 12 hours and 25 minutes. Because the lunar day is a little longer than the solar day, one calendar day every two weeks or so holds only a single high, the other having slipped past midnight. Along much of the northern Gulf of Mexico a single high a day is the normal pattern.' },
    { q: 'Is high tide at the same time every day?', a: 'No. Tide times shift later by about 50 minutes a day on a twice-daily coast, because the Earth needs that extra time to bring a harbor back under the moon. Over two weeks a morning high works its way around the clock. The shift is not perfectly even: it can be shorter or longer from one day to the next as the moon speeds up and slows down along its orbit.' },
    { q: 'How long does high tide last?', a: 'High tide itself is an instant, the moment the water stops rising, but the height barely changes for a while on either side of it. On a semidiurnal coast the water stays within a few inches of its peak for roughly half an hour to an hour around the turn. That pause, often called the stand, is a convenient window for docking or for fishing a flooded marsh edge.' },
    { q: 'Does the full moon make high tide higher?', a: 'Yes, and the new moon does too. Around both, the sun and moon pull along the same line and the tidal range grows: higher highs and lower lows than average for a few days, usually peaking a day or two after the phase itself. The effect is strongest when that full or new moon also falls near the moon’s closest approach to Earth.' },
    { q: 'Is it better to go to the beach at high tide or low tide?', a: 'It depends on what you want. Low tide gives the widest sand, exposed bars and tide pools, and easier walking along narrow beaches. High tide leaves less beach and can push waves to the dunes or seawalls. Some beaches form stronger rip currents around low tide, when water drains through gaps in a sandbar, so swimmers should check local surf conditions either way.' },
    { q: 'Why did the water come in faster than I expected?', a: 'Because the rise is not steady. On a twice-daily coast the water gains only a little in the first hour after low, then much more in the third and fourth hours, so a bar or a flat can flood quickly in the middle of the tide. In shallow estuaries the incoming tide can also run shorter than the outgoing one. Plan to leave exposed ground well before the low turns.' },
  ],
  related: ['how-to-read-a-tide-chart', 'tide-table', 'spring-and-neap-tides', 'tides-near-me', 'king-tides'],
  sources: ['tides_tutorial', 'tide_types', 'predictions_page', 'datums'],
});
