import { definePage } from '../../lib/page-types';

const KEYS = ['washington/seattle', 'california/san-francisco', 'california/san-diego', 'hawaii/honolulu', 'maine/bar-harbor', 'massachusetts/boston', 'virginia/norfolk', 'south-carolina/charleston', 'florida/miami', 'texas/galveston'];

export default definePage({
  id: 'king-tides',
  slug: 'king-tides',
  group: 'tides',
  order: 15,
  nav: 'King tides',
  card: 'The highest predicted tides of the year, why they come when they do, and how they turn into high tide flooding on low streets.',
  title: 'King Tides 2026: Dates, Causes and High Tide Flooding',
  description: 'King tides 2026: the highest predicted tides at US stations, why perigee, new and full moon and the season stack up, and how they cause high tide flooding.',
  h1: 'King tides',
  intro: 'King tide is a popular name, not a scientific one, for the handful of days each year when the predicted high water peaks.',
  resume: `King tides are the highest predicted high tides of the year at a given place, usually perigean spring tides: a new or full moon that falls close to perigee, the moon's nearest point to Earth, so the two strongest boosts to the tide arrive together. Around early January the Earth is also at its closest to the sun, which helps explain why many West Coast stations peak in winter, while on the Atlantic and Gulf the seasonal swell of sea level in early fall pushes the year's top tides into September through November. A king tide by itself is predictable to the minute, years ahead. What makes it dangerous is what rides on top: onshore wind, low pressure, river flow and decades of sea level rise, which together turn king tides into high tide flooding of streets, parking lots and marsh roads in many coastal US towns.`,
  mini: { kind: 'kings' },
  body: (h) => {
    const rows = KEYS.map((k) => {
      const s = h.st(k);
      return [h.a(`st:${k}`, s.place), h.ft(s.datums!.MHHW!), h.ft(s.stats.maxHigh.h), h.ft(s.stats.maxHigh.h - s.datums!.MHHW!), h.date(s.stats.maxHigh.date)];
    });
    const se = h.st('washington/seattle'), nf = h.st('virginia/norfolk'), mi = h.st('florida/miami'), bh = h.st('maine/bar-harbor'), sd = h.st('california/san-diego');
    return `
<h2>A popular name for an astronomical peak</h2>
<p>Nobody at NOAA forecasts a "king tide"; the National Ocean Service uses the phrase in public outreach and explains it as a non-scientific term for an especially high tide. The physics behind it is ordinary tide physics turned up to the maximum. Every two weeks, the sun and moon line up at new and full moon and produce spring tides, with higher highs and lower lows than average. Once a month, the moon passes perigee, its closest approach, and its pull on the oceans grows. When a spring tide falls within a day or so of perigee, the two effects stack, and the result is a perigean spring tide. Those are the days that make the local news when water creeps over a seawall on a sunny afternoon.</p>
<p>A third boost comes from the sun. The Earth reaches perihelion, its nearest point to the sun, in early January, which slightly strengthens the solar tide in midwinter. A fourth is seasonal: along much of the Atlantic and Gulf coasts, mean sea level itself runs a few inches higher in late summer and fall, partly from warm water expanding and from shifts in winds and currents. NOAA's predictions include that seasonal cycle, which is why fall dominates the eastern list.</p>

<h2>When the highest tides arrive at US stations</h2>
<p>The table lists, for ten contrasting gauges, the average higher high (NOAA's MHHW datum), the highest high tide predicted between ${h.date(h.DATA.begin)} and ${h.date(h.DATA.end)}, how far that peak rises above an ordinary higher high, and its date. The mini tool above shows the top five for any station.</p>
${h.table(['Station', 'Average higher high', 'Highest predicted', 'Above average', 'Date'], rows, 'Heights in feet above MLLW, NOAA predictions; wind and surge not included', ['l', 'r', 'r', 'r', 'l'])}
<p>Two patterns stand out. On the Pacific, ${h.a('st:washington/seattle', 'Seattle')} peaks at ${h.ft(se.stats.maxHigh.h)} on ${h.date(se.stats.maxHigh.date)} and ${h.a('st:california/san-diego', 'San Diego')} at ${h.ft(sd.stats.maxHigh.h)} on ${h.date(sd.stats.maxHigh.date)}: winter, when perigee, a full or new moon and a sun far south of the equator combine on a mixed tide. On the southern Atlantic, ${h.a('st:florida/miami', 'Miami')} tops out on ${h.date(mi.stats.maxHigh.date)} and ${h.a('st:virginia/norfolk', 'Norfolk')} on ${h.date(nf.stats.maxHigh.date)}, in the fall season that South Florida residents know well. The Gulf of Maine follows its own calendar: ${h.a('st:maine/bar-harbor', 'Bar Harbor')} reaches ${h.ft(bh.stats.maxHigh.h)} on ${h.date(bh.stats.maxHigh.date)}.</p>
<p>The "above average" column matters more than the raw height. A king tide that exceeds the ordinary higher high by a foot is a big event on a coast where a foot is a large share of the range, and a modest one in a harbor that moves ten feet a day.</p>

<h2>From king tide to high tide flooding</h2>
<p>High tide flooding, sometimes called nuisance or sunny-day flooding, happens when the water reaches levels at which local streets, storm drains and low yards start to take on water, without any storm offshore. NOAA's ${h.src('high_tide_flooding', 'high tide flooding page')} explains that it now happens much more often than a few decades ago in many US coastal communities, because relative sea level has risen and in places the land is sinking. The astronomical peak alone may be harmless; add a foot from a stalled northeaster or an onshore breeze and storm drains begin to run backward.</p>
<p>Three facts follow for anyone living near the water:</p>
<ul>
<li>The calendar of risk is known years ahead. The dates in the table and on every station page are the days to watch.</li>
<li>Weather decides the outcome. On the predicted peak, check the marine forecast; strong onshore wind or a nearby low-pressure system can add more than the tide itself.</li>
<li>Saltwater flooding is corrosive and often hides depth. Driving through it damages vehicles and can be dangerous where the road edge is invisible.</li>
</ul>

<h2>Getting ready for a peak week</h2>
<p>For people who keep a boat, a car or a house near the water, a king tide week is a short checklist rather than a crisis. Floating docks ride up on their pilings, so check that the pile caps still stand well above the predicted peak plus a margin for wind; fixed docks and launch ramps can go awash, and parking lots at ramps are often the first pavement to take water. Dock lines tied at an ordinary high may come up tight. Cars parked on low streets near tidal creeks are worth moving the night before the highest tide of the cluster, because the water can arrive through storm drains well before it tops a seawall.</p>
<p>Homeowners on low lots can look at the predicted peak on the station page, then watch where the water actually reaches on a calm day. That observation, repeated over a few king tides, tells you more about your own street than any map, and it gives you a baseline for the stormy day when the wind adds its share. Many coastal towns also post their own flood alerts for those dates.</p>

<h2>Why the extreme low tides come with them</h2>
<p>The same alignments that lift the highs also pull the lows down, so king tide days are often the best minus tide days of the season. On the Pacific, which of the two lows of the day gets the extreme depends on time of day and season, a pattern the ${h.a('negative-low-tides', 'negative low tides guide')} lays out. Photographers and beach walkers sometimes visit the same shoreline at the morning low and the afternoon high of a king tide day to see the full spread.</p>

<h2>How sure are the dates?</h2>
<p>Very sure for the astronomy. The predicted heights come from harmonic analysis of long tide records and are published by NOAA well in advance; the gap between prediction and observation on a calm day is usually a matter of inches. The uncertainty lies in the atmosphere and the rivers. A dry offshore wind can keep the water below a predicted record, while a storm on an ordinary spring tide can do far worse than any king tide. Treat the predicted peaks as a calendar of when the sea is primed, not as a flood forecast. The ${h.src('king_tides', 'NOAA king tide explainer')} has more on the naming and the causes, and the ${h.a('spring-and-neap-tides', 'spring and neap tides guide')} covers the two-week rhythm underneath.</p>`;
  },
  faqs: [
    { q: 'How often do king tides happen?', a: 'Several times a year at most US stations, in clusters of a few days around a new or full moon that falls near the moon’s closest approach to Earth. The biggest cluster of the year depends on the coast: winter on much of the Pacific, early fall on the southern Atlantic and the Gulf. Each station page lists its own highest predicted tides for the coming months.' },
    { q: 'Is a king tide the same as a storm surge?', a: 'No. A king tide is a purely astronomical high, predictable years ahead. A storm surge is extra water pushed ashore by wind and low pressure, which forecasters can only predict days in advance. They add together: a modest surge on a king tide day can flood places that a big surge at a neap tide would spare, which is why both are watched on the peak dates.' },
    { q: 'Are king tides getting higher?', a: 'The astronomical part is not changing in any meaningful way, but the sea level it sits on is rising along most of the US coast, and in some places the land is sinking too. So the same king tide reaches higher ground than it did decades ago, and high tide flooding at a given street happens on more days each year in many communities.' },
    { q: 'Does a supermoon cause a king tide?', a: 'A supermoon, a full or new moon near perigee, is exactly the alignment behind most king tides, so the two often come together. The extra rise from perigee is usually a few inches compared with an ordinary spring tide. Whether that becomes noticeable depends on the coast, the season and the weather, and the peak can trail the moon phase by a day or two.' },
    { q: 'What time of day does a king tide peak?', a: 'At the time of that day’s highest predicted high at your station, which can be any hour. On twice-daily coasts the two highs of a king tide day are both elevated, with one usually higher. On the Pacific the higher high tends to fall at a similar time of day across each season. The station page gives the time to the minute in local clock time.' },
    { q: 'Where can I see king tide flooding safely?', a: 'From high, dry ground such as a pier, a bridge sidewalk, an elevated boardwalk or a park on a bluff, looking toward low streets, marsh edges or seawalls. Arrive before the predicted peak, stay out of standing saltwater and never drive into a flooded road. Keep children and pets back from seawalls when waves are running on top of the tide.' },
  ],
  related: ['spring-and-neap-tides', 'negative-low-tides', 'high-tide-and-low-tide', 'tide-range', 'how-to-read-a-tide-chart'],
  sources: ['king_tides', 'high_tide_flooding', 'spring_neap', 'datums'],
});
