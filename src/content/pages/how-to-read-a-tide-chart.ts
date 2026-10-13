import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'how-to-read-a-tide-chart',
  slug: 'how-to-read-a-tide-chart',
  group: 'tides',
  order: 10,
  nav: 'Read a tide chart',
  card: 'The axes, the labeled peaks and troughs, the slope of the curve and the shaded night, explained on real US stations.',
  title: 'Tide Chart Guide 2026: Read the Curve, Highs and Lows',
  description: 'Tide chart guide 2026: read the time and height axes, the zero line (MLLW), labeled highs and lows, the slope of the curve and the 7-day view on US tide charts.',
  h1: 'How to read a tide chart',
  intro: 'A tide chart is a graph of predicted water height against clock time at one gauge, and four details on it answer most practical questions.',
  resume: `Read a tide chart from left to right as a day of clock time at the station, and from bottom to top as water height in feet above Mean Lower Low Water, the average of the lower daily low and the zero of US nautical charts. The labeled peaks are the predicted high tides and the labeled troughs the predicted lows, each with NOAA's time and height; trust those labels over your eye on the line. The steepness of the curve between them is the speed of the water: flat near a turn, steepest halfway through a rise or fall, where a large-range harbor can gain several feet in an hour. Shaded bands mark night, so you can see at once whether a low falls in daylight. Finally, check the station name and its time zone before you plan anything, because a gauge across an inlet can turn an hour or more apart.`,
  mini: { kind: 'height' },
  body: (h) => {
    const ch = h.st('south-carolina/charleston'), se = h.st('washington/seattle'), pb = h.st('florida/pensacola-beach'), bh = h.st('maine/bar-harbor'), an = h.st('alaska/anchorage');
    return `
<h2>Two axes and a zero that is not the seabed</h2>
<p>Every curve on this site plots two quantities. Along the bottom runs local clock time at the station, midnight to midnight, in the 12-hour format with daylight saving time applied wherever the state observes it. Up the left side runs water height in feet. The line marked 0 ft is neither sea level nor the bottom: it is Mean Lower Low Water, the long-term average of the lower of each day's two lows at that gauge, computed by NOAA over its 19-year National Tidal Datum Epoch. US nautical charts measure their soundings from the same zero, which is why a chart depth and a predicted height can simply be added; the ${h.a('tide-table', 'tide table guide')} walks through that sum.</p>
<p>A reading of 4 ft therefore means the surface stands four feet above that average low, at that gauge, at that minute. It tells you nothing about how deep the water is where you happen to be standing; that depends on the ground underneath. At ${h.a('st:south-carolina/charleston', 'Charleston')} an ordinary high reaches about ${h.ft(ch.stats.meanHigh)} and an ordinary low settles near ${h.ft(ch.stats.meanLow)}, so on most days the line wanders between those two marks.</p>
<p>The vertical scale fits the station being shown. A curve that fills the whole panel at ${h.a('st:florida/pensacola-beach', 'Pensacola Beach')}, where the average day spans ${h.ft(pb.stats.meanRange)}, would be a ripple next to ${h.a('st:alaska/anchorage', 'Anchorage')}, where it spans ${h.ft(an.stats.meanRange)}. Glance at the numbers on the axis before comparing two pictures side by side.</p>

<h2>Peaks, troughs and the labels that matter</h2>
<p>The labeled points carry the real information. Each peak is a predicted high water and each trough a predicted low, both with NOAA's time to the minute and height in feet. Those values are published by the National Ocean Service and shown unchanged. The line joining them is drawn by this site: from NOAA's hourly predictions at reference stations, and from the shape of the reference curve at subordinate stations, as the ${h.a('method', 'method page')} sets out. When an exact figure matters, read the label instead of estimating from the line.</p>
<p>The rhythm of those peaks also reveals which family of tide a place belongs to, and each family is read a little differently.</p>
<h3>Matching twins</h3>
<p>Charleston shows the usual Atlantic pattern, ${h.typeWords('south-carolina/charleston')}. The morning and afternoon tides look like copies of each other, so either low will uncover roughly the same strip of mud along the harbor, and planning comes down to which one suits your schedule.</p>
<h3>Unequal pairs</h3>
<p>${h.a('st:washington/seattle', 'Seattle')} draws something lopsided. Its two highs differ by ${h.ft(se.stats.highInequality)} on an average day, and its two lows by ${h.ft(se.stats.lowInequality)}. One low barely sags while the other drains the shoreline, which is why West Coast tables name a higher high and a lower low. On a chart like this, pick the low by its label, never by its position in the day.</p>
<h3>A single slow wave</h3>
<p>Along much of the northern Gulf the picture flattens into one rise and one fall. Pensacola Beach has a single high on ${h.int(pb.stats.oneHighShare * 100)}% of days. The water creeps for many hours in the same direction, and a stiff north or south wind can move it as much as the moon does.</p>

<h2>The slope is the speed</h2>
<p>Look at how steep the line is, not only where it peaks. Near each turn the curve rounds off into a plateau; for a short while on either side of a high or low the height hardly changes, a pause often called the stand of the tide. Halfway between a low and the next high the line is at its steepest, and that is when water climbs a beach or a piling fastest.</p>
<p>For a semidiurnal tide the middle hours of a rise move roughly a quarter of the range each, the peak of the rule of twelfths covered in the ${h.a('fishing-tides', 'fishing tides guide')}. At ${h.a('st:maine/bar-harbor', 'Bar Harbor')}, with an average range of ${h.ft(bh.stats.meanRange)}, that comes to about ${h.ft(bh.stats.meanRange / 4)} in a single hour; at Charleston, about ${h.ft(ch.stats.meanRange / 4)}. A flat bar that is dry at 10 AM can be knee deep by 11. The mini tool above reads the height at any hour you choose so you can test that against your own plan.</p>

<h2>Light, darkness and the moon on the same picture</h2>
<p>The gray shading on the chart covers the hours from sunset to sunrise. It answers a question people often forget to ask: does that big low happen while you can actually see the rocks? Many of the deepest lows of a season fall in darkness at one coast and in daylight at another, a pattern explored in the ${h.a('negative-low-tides', 'negative low tides guide')}.</p>
<p>Below the time axis, green bars mark the solunar periods, two longer ones around the moon's passage overhead and underfoot and two shorter ones around moonrise and moonset. They are a fishing tradition, explained with its limits in the ${h.a('best-fishing-times', 'best fishing times guide')}, and you can ignore them entirely if you came for the beach.</p>

<h2>Reading a week instead of a day</h2>
<p>Stack seven days and two patterns appear. First, each tide arrives later than the one the day before, by roughly 50 minutes on a twice-daily coast, so a low you liked at 9 AM on Saturday drifts toward lunch by Monday. Second, the envelope of the curve breathes: highs climb and lows sink for a few days around each new and full moon, then the swing shrinks near the quarter moons. The coefficient printed for each day puts a number on that breathing, with 100 meaning an ordinary day at that station; the ${h.a('spring-and-neap-tides', 'spring and neap tides guide')} shows where it comes from, and the ${h.a('king-tides', 'king tides page')} covers the far end of it.</p>

<h2>Four ways people misread a tide chart</h2>
<p><strong>The wrong gauge.</strong> A station inside a sound and one on the ocean beach a few miles away can differ by an hour or more and by a large share of the height. Open the page of the station closest to where you will be, on the same side of the inlet.</p>
<p><strong>Zero taken for dry.</strong> A 0 ft low is simply an average lower low. Plenty of lows fall below it, and on a gently sloping flat the water at 0 ft may still be a long walk out.</p>
<p><strong>Weather left out.</strong> The curve is the astronomical tide. Onshore wind, low pressure, swell and river flow push real water above or below it, sometimes by a foot or more, and nothing on the chart warns you.</p>
<p><strong>The wrong clock.</strong> Times are those of the station, not of your phone's home zone. Someone in Denver planning a morning at a California tide pool reads Pacific Time on that page.</p>
<p>None of these charts is meant for navigation. They are a planning picture for the shore, the dock and the ramp; for anything afloat in tight water, use official charts and NOAA's observed water levels.</p>`;
  },
  faqs: [
    { q: 'Why does the line on a tide chart look smooth when real water is choppy?', a: 'Because it shows the predicted astronomical tide, the slow rise and fall caused by the moon and sun, averaged over waves that come and go every few seconds. Swell, wakes and wind chop ride on top of it. On a beach, a set of waves can wash well above the predicted line, so leave a margin when the curve says the sand should be dry.' },
    { q: 'What do the gray shaded areas on the tide chart mean?', a: 'They mark the hours between sunset and sunrise at the station. The shading lets you see at a glance whether a high or low falls in darkness, which matters for tide pooling, clamming, photography or walking out on a bar. Sunrise and sunset are computed for the station position, so a gauge at the north end of a state can differ by several minutes.' },
    { q: 'Can I read the water height at a time between two labeled tides?', a: 'Yes. Find the hour along the bottom, go up to the curve and read across to the height axis, or use the height tool on this page, which does the same thing exactly. The value between labels comes from the curve drawn through NOAA predictions, accurate to a few hundredths of a foot at most stations, still before any effect of wind or pressure.' },
    { q: 'Why is the vertical scale different from one station chart to the next?', a: 'Each chart is scaled to fit its own station, so the curve uses the full height of the panel whether the range is under a foot or close to thirty feet. That keeps small Gulf tides readable, but it means two charts that look alike can describe very different amounts of water. Compare the axis numbers, or the average range printed on each station page.' },
    { q: 'Does a tide chart show the tidal current too?', a: 'No. It shows the height of the water. Current, the horizontal flow, is related but not identical: in many inlets the flow keeps running for a while after the water has peaked, so slack current can come well after the labeled high or low. NOAA publishes separate current predictions for channels where the flow matters to boaters.' },
    { q: 'How far ahead can I trust a tide chart?', a: 'The astronomical part is predictable years in advance, so a chart for next spring is as sound as one for tomorrow, as long as NOAA does not revise the station. What cannot be predicted far ahead is weather. Check the curve early for planning, then look at the forecast for wind, surf and storm surge in the last day or two.' },
  ],
  related: ['high-tide-and-low-tide', 'tide-table', 'spring-and-neap-tides', 'negative-low-tides', 'tides-near-me'],
  sources: ['tides_tutorial', 'datums', 'predictions_page', 'tide_vs_current'],
});
