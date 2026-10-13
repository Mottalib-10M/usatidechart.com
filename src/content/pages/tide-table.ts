import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'tide-table',
  slug: 'tide-table',
  group: 'tides',
  order: 12,
  nav: 'Tide table',
  card: 'Columns, datums, minus signs and the simple sum that turns a printed depth and a tide height into water under the keel.',
  title: 'Tide Table 2026: Read Times, Heights, MLLW and Depth',
  description: 'Tide table 2026: read each column, what MLLW means, why some heights are negative, how subordinate stations are corrected and how to add chart depth and tide.',
  h1: 'Reading a tide table',
  intro: 'A tide table is a list of predicted turning points, and its heights only make sense once you know the zero they are measured from.',
  resume: `A tide table lists, for one station, the date, the time and the height of every predicted high and low, and the heights are feet above Mean Lower Low Water (MLLW), the average of the lower daily low and the same zero used for soundings on US nautical charts. That shared zero is the whole trick: the depth you can expect at a spot equals the depth printed on the chart plus the tide height for that hour, so a 3 ft sounding at a +2.5 ft tide gives about 5.5 ft, and at a −1 ft tide only 2 ft. A negative height is not a mistake but a low that falls below the average lower low, typical around new and full moon. Read the station name and its time zone first, check whether it is a subordinate station corrected from another gauge, and remember that wind and pressure are not in the table.`,
  mini: { kind: 'depth' },
  body: (h) => {
    const ny = h.st('new-york/new-york-city'), ch = h.st('south-carolina/charleston'), hb = h.st('new-hampshire/hampton-beach'), cm = h.st('new-jersey/cape-may');
    const d = ny.datums!, o = hb.offsets!;
    const pct = (x: number) => `${h.int(x * 100)} percent`;
    return `
<h2>Four columns and what each one promises</h2>
<p>Strip a tide table down and every row says the same four things: a date, a clock time, the word high or low (often just H or L), and a height. The National Ocean Service publishes these predictions for thousands of US gauges, and the seven-day lists on this site's station pages are those same figures, unchanged. A typical day on the Atlantic shows four rows, two of each kind. A Pacific day shows four rows of unequal size. A northern Gulf day often shows only two.</p>
<p>Three details sit above the rows and are easy to skip. The station name and number tell you exactly which gauge the predictions belong to; ${h.a('st:new-york/new-york-city', 'New York City')} on this site, for instance, is NOAA station ${ny.id}, ${ny.noaaName}, at the southern tip of Manhattan, not a beach on Long Island. The time basis says whether clock times include daylight saving time; every time on this site is local and already adjusted. And the datum line names the zero, which in US tables is almost always MLLW.</p>

<h2>MLLW, the zero everything hangs on</h2>
<p>Mean Lower Low Water is an average: take the lower of the two lows on each day over NOAA's 19-year National Tidal Datum Epoch and average them. It is a convenient reference because ordinary lows hover just above it and nautical charts use it for their depths. Other datums describe the rest of the tidal climate at the same gauge, and the table below lists them for The Battery, measured from MLLW.</p>
${h.table(['Datum', 'Meaning', 'Height above MLLW'], [
  ['MHHW', 'average of the higher daily high', h.ft(d.MHHW!)],
  ['MHW', 'average of all highs', h.ft(d.MHW!)],
  ['MSL', 'mean sea level', h.ft(d.MSL!)],
  ['MLW', 'average of all lows', h.ft(d.MLW!)],
  ['MLLW', 'average of the lower daily low', h.ft(0)],
], `NOAA datums at ${ny.noaaName}, epoch ${d.epoch}`, ['l', 'l', 'r'])}
<p>Reading the list from the top, a predicted high of ${h.ft(d.MHHW!)} at The Battery is a perfectly ordinary higher high, while anything well above it is a large tide. NOAA's ${h.src('datums', 'datum page')} defines each line in more detail.</p>
<p>The epoch matters too. Datums are recomputed when NOAA adopts a new 19-year epoch, and a rising sea shifts mean sea level upward against older zeros over the decades. That is one reason an old printed chart and a current table can disagree by a few tenths of a foot at the same pier, and why the epoch is printed alongside the numbers.</p>

<h2>Minus signs in the height column</h2>
<p>Because MLLW is an average, a large share of lower lows fall below it, and those print as negative numbers. A row reading −1.2 ft means the water will stand a foot and a fifth under the chart zero. Minus tides cluster around new and full moon, grow when the moon is near perigee, and on the West Coast reach their deepest when those alignments fall near the solstices. At ${h.a('st:south-carolina/charleston', 'Charleston')} ${ch.stats.negativeLowDays} of the ${ch.stats.days} days in the prediction period carry at least one, the lowest ${h.ft(ch.stats.minLow.h)} on ${h.date(ch.stats.minLow.date)}. Shore walkers love these rows; skippers of deep boats treat them as warnings. The ${h.a('negative-low-tides', 'negative low tides guide')} covers both sides.</p>

<h2>Chart depth plus tide equals expected depth</h2>
<p>Because charts and tables share the same zero, the arithmetic is a single addition. Take the sounding printed on the chart at the spot you care about, add the predicted tide for that moment, and you have the depth the astronomy alone would give you. Suppose a channel edge near Charleston is charted at 6 ft. At an ordinary high of about ${h.ft(ch.stats.meanHigh)}, expect roughly ${h.ft(6 + ch.stats.meanHigh)} of water; at the lowest low of the period, only ${h.ft(6 + ch.stats.minLow.h)}. The calculator above does that sum for any pair of numbers, and the ${h.a('boat-ramp-tide-planner', 'boat ramp planner')} turns it around to find the hours when the tide is high enough.</p>
<p>Keep a margin. Soundings age as sand moves, especially near inlets, the prediction leaves out wind and barometric pressure, and a boat squats lower when moving. The tool is a planning aid, not for navigation.</p>
<h3>Bridges use the other end of the scale</h3>
<p>Vertical clearances under bridges on US charts are given above Mean Higher High Water, not MLLW, so that the printed number is the room left on an ordinary high. A table height above MHHW eats into that clearance; one below it adds room. At The Battery, a predicted ${h.ft(d.MHHW! + 1)} high means about a foot less clearance than charted.</p>

<h2>Subordinate stations and their corrections</h2>
<p>NOAA computes full harmonic predictions only for reference stations with a long record. Many beaches and harbors are subordinate stations: their highs and lows are derived from a nearby reference gauge with a time correction and a height factor. ${h.a('st:new-hampshire/hampton-beach', 'Hampton Beach')}, for example, is predicted from ${hb.referenceName} with high water ${o.timeOffsetHighTide} minutes later and low water ${o.timeOffsetLowTide} minutes later, and heights at ${pct(o.heightOffsetHighTide!)} of Portland's. Older printed tables made readers apply those corrections by hand; NOAA's predictions for subordinate stations, and this site's pages, already include them. What they cannot include is the shape between the turns, which is why the curve at such stations is borrowed from the reference gauge.</p>

<h2>Times between the rows</h2>
<p>A table gives only the turning points. For the height at 2:30 PM between a 10 AM low and a 4 PM high, you can read the curve on the station page, or estimate with the rule of twelfths explained in the ${h.a('fishing-tides', 'fishing tides guide')}. At ${h.a('st:new-jersey/cape-may', 'Cape May')}, with an average range of ${h.ft(cm.stats.meanRange)}, three hours after low the water has typically recovered half of it, about ${h.ft(cm.stats.meanLow + cm.stats.meanRange / 2)} above the zero.</p>

<h2>Common table errors</h2>
<p>Most mistakes come from reading the right numbers for the wrong place or the wrong hour. Readers pick a gauge on the far side of an inlet, forget that a printed table may be in standard time all year, or copy yesterday's rows after the tides have slipped by close to an hour. Others read a height as a depth at the shoreline. A 5 ft high on a steep pocket beach and the same 5 ft on a broad tidal flat put the water's edge in very different places. When a decision depends on the water, cross-check the table with NOAA's live water level readings for the station, listed with its ${h.src('predictions_page', 'predictions')}.</p>`;
  },
  faqs: [
    { q: 'What does MLLW mean in a tide table?', a: 'Mean Lower Low Water, the average of the lower of the two daily low tides at a station over NOAA’s 19-year datum epoch. Every height in a US tide table is measured from it, and so is every depth on a US nautical chart. A height of 3 ft means three feet above that average low, not three feet of water at your feet.' },
    { q: 'Why are some tide table heights negative?', a: 'Because the zero is an average low, not the lowest possible water. Lows that drop under that average print with a minus sign. They gather around the new and full moon, and they go deepest when one of those phases falls near the moon’s closest approach. A negative row means more exposed beach and less water over shoals, by the amount shown.' },
    { q: 'How do I work out water depth from a tide table and a chart?', a: 'Add them. Take the depth printed on the chart, which is measured from MLLW, and add the tide height predicted for the time you will be there. A negative tide subtracts. Then leave a generous margin for shifting sand, wind, pressure and the motion of the boat, because the result is a prediction from astronomy alone and not a sounding.' },
    { q: 'Are tide tables in standard time or daylight time?', a: 'It depends on who prints them. NOAA lets users choose local standard time, local time with daylight saving, or GMT, and some printed booklets stay in standard time all year with a note to add an hour in summer. On this site every time is already in the station’s local clock, with daylight saving applied where the state uses it.' },
    { q: 'What is the difference between a reference station and a subordinate station?', a: 'A reference station has a long enough record for NOAA to compute its tides from harmonic constants, giving highs, lows and heights at any minute. A subordinate station borrows from a nearby reference: its highs and lows are the reference values shifted by a set number of minutes and scaled by a factor. Its curve between the turns is therefore an estimate.' },
  ],
  related: ['how-to-read-a-tide-chart', 'negative-low-tides', 'high-tide-and-low-tide', 'boat-ramp-tide-planner', 'tide-range'],
  sources: ['datums', 'predictions_page', 'coops_mdapi', 'tides_tutorial'],
});
