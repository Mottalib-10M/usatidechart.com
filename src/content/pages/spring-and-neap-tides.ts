import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'spring-and-neap-tides',
  slug: 'spring-and-neap-tides',
  group: 'tides',
  order: 16,
  nav: 'Spring and neap tides',
  card: 'The two-week pulse of the tide with the moon phases, and the daily coefficient this site uses to put a number on it.',
  title: 'Spring and Neap Tides 2026: Moon Phases and Coefficient',
  description: 'Spring and neap tides 2026: how new, full and quarter moons set the size of the tide, why Gulf tides follow the moon’s declination, and this site’s tide coefficient.',
  h1: 'Spring tides, neap tides and the tide coefficient',
  intro: 'Spring tides have nothing to do with the season: the word describes water that springs up, twice a month, when the sun and moon pull in line.',
  resume: `Spring tides are the larger tides that come twice a month, around the new and full moon, when the sun and moon pull along the same line and their tidal bulges add up; neap tides are the smaller ones around the first and last quarter, when the two pull at right angles and partly cancel. At Boston the range on spring days runs about half again as large as on neap days, and the biggest of the cycle usually arrive a day or two after the moon phase itself. Along the northern Gulf of Mexico the rhythm is different: the once-daily tide there swells and fades with the moon's distance north or south of the equator, not mainly with its phase. To compare days at a glance, this site gives each day a tide coefficient of its own design, the day's range as a percentage of the station's average range; it is not an official NOAA figure.`,
  mini: { kind: 'coef' },
  body: (h) => {
    const bo = h.st('massachusetts/boston'), an = h.st('alaska/anchorage'), bi = h.st('mississippi/biloxi'), sf = h.st('california/san-francisco'), ho = h.st('hawaii/honolulu');
    const ratio = (s: typeof bo) => h.ft1(s.stats.springRange / s.stats.neapRange);
    return `
<h2>Sun and moon in line, sun and moon at right angles</h2>
<p>The moon raises the larger tide on Earth; the sun raises one a bit under half as strong. Each produces its own pair of bulges, and what we see on a tide chart is their sum. At new moon the sun and moon sit on the same side of the Earth, at full moon on opposite sides, and in both cases their bulges point the same way. Highs climb, lows drop, and the daily range opens up: those are spring tides. About a week later, at first or last quarter, the moon stands 90 degrees from the sun in the sky. The solar bulge then fills in the lunar trough, ranges shrink and the water hardly seems to move: neap tides. The cycle repeats every 14.8 days or so, half the synodic month.</p>
<p>NOAA's ${h.src('spring_neap', 'spring tide explainer')} makes the point that the name comes from the idea of water springing up, not from the season. Spring tides happen in January as surely as in May.</p>

<h2>How big the swing is at US stations</h2>
<p>The size of the two-week pulse varies from coast to coast. At ${h.a('st:massachusetts/boston', 'Boston')} the range is about ${h.ft(bo.stats.springRange)} on the biggest days and ${h.ft(bo.stats.neapRange)} on the smallest, a ratio of ${ratio(bo)} to 1. At ${h.a('st:alaska/anchorage', 'Anchorage')} the spring days reach about ${h.ft(an.stats.springRange)} against ${h.ft(an.stats.neapRange)} at neaps, the same kind of proportion with ten times the water. On the mixed tide of ${h.a('st:california/san-francisco', 'San Francisco')} the ratio is ${ratio(sf)} to 1, at ${h.a('st:hawaii/honolulu', 'Honolulu')} ${ratio(ho)} to 1. The spring figures here are the range exceeded on roughly one day in ten over the prediction period, the neap figures the range that only about one day in ten falls below.</p>

<h2>The lag behind the moon</h2>
<p>If you watch a few cycles you will notice the largest tides rarely fall on the night of the full moon itself. At many US stations they come one or two days later. The delay, sometimes called the age of the tide, comes from the way ocean basins respond to the forcing: the tide is a wave that needs time to build. The same lag applies to neaps after the quarter moons. Planning a minus tide walk for the evening of a full moon is reasonable; planning it for the day after is often better.</p>

<h2>The Gulf of Mexico plays by different rules</h2>
<p>Along much of the northern Gulf the tide is diurnal, a single high and low on most days, and its strength is governed less by moon phase than by the moon's declination, its angle north or south of the equator. When the moon is far from the equator, the diurnal tide is strongest: these are tropic tides. When it crosses the equator, about every 13.7 days, the tide weakens, sometimes breaking into two small highs: equatorial tides. ${h.a('st:mississippi/biloxi', 'Biloxi')} shows how deep the swing can be. Its range opens to about ${h.ft(bi.stats.springRange)} on the largest days and falls to ${h.ft(bi.stats.neapRange)} on the smallest, a ratio of ${ratio(bi)} to 1, far wider than Boston's, and the big days follow the declination calendar. NOAA's ${h.src('tide_types', 'tutorial on tidal cycles')} covers both patterns.</p>
<p>Mixed tides, on the Pacific and in Hawaii, feel both influences. Their range responds to the phase and their inequality between the two daily highs and lows responds to declination, so the biggest days come when both line up.</p>

<h2>A daily number: the tide coefficient on this site</h2>
<p>Tide tables in France and the United Kingdom have long given each day a coefficient. US tables publish ranges in feet instead. To make the cycle easy to read on every station page, this site computes its own coefficient: the day's range, from its highest high to its lowest low, divided by the station's average daily range over the prediction period, times 100. It is a site calculation built on NOAA's predicted highs and lows, not a value published by NOAA, and the ${h.a('method', 'method page')} prints the rule.</p>
${h.table(['Coefficient', 'Label on this site', 'What it usually means'], [
  ['130 and above', 'very large', 'top of a spring cycle, often near perigee'],
  ['115 to 129', 'large (spring tides)', 'a few days around new or full moon'],
  ['85 to 114', 'average', 'between springs and neaps'],
  ['70 to 84', 'small (neap tides)', 'around the quarter moons'],
  ['below 70', 'very small', 'deep neaps, or equatorial days on the Gulf'],
], 'Thresholds used by the coefficient on station pages', ['l', 'l', 'l'])}
<p>Because each station is measured against its own average, the same number means the same thing anywhere. A coefficient of 120 at Boston is a day with a range about a fifth larger than an ordinary Boston day, roughly ${h.ft(bo.stats.meanRange * 1.2)}; at Biloxi it means about ${h.ft(bi.stats.meanRange * 1.2)}. The mini tool above shows today's figure and the next few days for any station, with the day of the largest range in the coming week.</p>

<h2>Using spring and neap days</h2>
<p>Spring days suit people who want extremes: tide poolers chasing the lowest water, clammers on far flats, photographers at a flooded marsh. They also bring the strongest currents, which helps fishing in creeks and complicates it in deep passes, as the ${h.a('fishing-tides', 'fishing tides guide')} explains. Neap days suit those who want a steadier water level: kayakers in narrow channels, boaters with a shallow ramp who need enough water at low tide, or anyone camping near the high-water line. When a large spring tide also falls near perigee, the highs become the ${h.a('king-tides', 'king tides')} of the year and the lows the deepest ${h.a('negative-low-tides', 'minus tides')}.</p>`;
  },
  faqs: [
    { q: 'Why are they called spring tides if they happen all year?', a: 'The name comes from the sense of water springing or welling up, an old meaning of the word that has nothing to do with the season. Spring tides occur twice every lunar month, at new and full moon, in every season of the year. The opposite word, neap, is of uncertain old English origin and describes the low, sluggish tides between them.' },
    { q: 'How many days do spring tides last?', a: 'The range grows over several days before the new or full moon, peaks a day or two after it, then shrinks again, so the noticeably large tides span roughly three to five days in each half of the month. The exact width depends on the station and on whether the moon is near perigee at the time, which strengthens and lengthens the peak.' },
    { q: 'Is the tide coefficient an official NOAA number?', a: 'No. NOAA publishes predicted heights and ranges in feet. The coefficient on this site is a calculation made from those predictions: the day’s range as a percentage of the station’s average range, so that 100 is an ordinary day. It follows the spirit of the coefficients printed in French tide tables, but the scale and thresholds are this site’s own.' },
    { q: 'Are neap tides better for kayaking?', a: 'Often, yes. Neap tides move less water, so currents in narrow channels and around inlets are weaker, and the water level changes less over a paddle. That makes route planning more forgiving. The trade-off is that the lowest water of a neap day may still leave some shallow creeks too thin to float. Check the station curve for the hours you plan to be out.' },
    { q: 'What is a perigean spring tide?', a: 'A spring tide that falls close to the moon’s perigee, its nearest point to Earth in its monthly orbit. The closer moon pulls harder, so the range of that spring tide is larger than usual, typically by a few inches on most US coasts. These are the tides often called king tides, and they bring both the year’s highest highs and some of its lowest lows.' },
  ],
  related: ['king-tides', 'negative-low-tides', 'high-tide-and-low-tide', 'tide-range', 'fishing-tides'],
  sources: ['spring_neap', 'tide_types', 'tides_tutorial', 'eclipses_2026'],
});
