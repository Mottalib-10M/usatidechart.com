import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const bh = K.st('maine/bar-harbor');

export default definePage({
  id: 'beach-walk-planner', slug: 'beach-walk-planner', group: 'planning', order: 10,
  nav: 'Low tide beach planner', card: 'Every daylight window with the water below the level you choose.',
  title: 'Low Tide Today 2026: Beach Walk Planner for 92 US Stations',
  description: 'Low tide today and the next 60 days: list every daylight window with the water below your level at 92 US stations, for beach walks, tide pools and bars. 2026.',
  h1: 'Low tide planner: when can I walk the beach?',
  intro: 'Set the water level that opens your walk, a bar, a cove or a stretch of sand, and see every window below it.',
  resume: `Low tide is a moment, but a walk needs a window: the hours when the water stays below the level that uncovers your sand bar, your tide pools or the passage around a headland. This planner finds those windows for any of the ${K.stations.length} stations on the site. Choose the station, enter the level in feet above Mean Lower Low Water (the default is a quarter of the station's average range), the period (3 to 60 days), whether you want daylight only, and the shortest window worth the trip. The list shows each window's start, end, length and lowest water, and the chart below draws the day's curve with your level across it. The times are solved exactly on the curve built from NOAA predictions, not read from a table.`,
  tool: 'planner-beach',
  body: (h) => `
<h2>Choosing the level</h2>
<p>The right level depends on the place, not on the tide table. A sand bar at ${h.a('st:maine/bar-harbor', 'Bar Harbor')} or a cove that only opens at low water has a height above which it is covered; on a flat beach the "level" is how much sand you want. If you do not know it, try the walk once at a known low, note the predicted height at the time you could just pass, and use that figure next time. On a coast with a range of ${h.ft(bh.stats.meanRange)} like Bar Harbor, a level one foot higher can add an hour to the window; on the Gulf, where the range is one or two feet, the window is long but the level matters more than the time.</p>
<h2>Daylight, and the lowest days</h2>
<p>With daylight only, windows are cut to sunrise and sunset at the station. The deepest lows come around the new and full moon; in Washington and Oregon the lowest of them fall around midday in late spring and summer and at night in winter, while in Southern California it is the reverse: winter afternoons, summer before dawn. The ${h.a('negative-low-tides', 'negative low tides guide')} explains it.</p>
<h2>Safety margin</h2>
<p>The end of a window is the moment the water crosses your level on a rising tide. Leave before it: water rises fastest in the middle of the flood, and a channel behind you on a bar can fill first. Waves, swell and wind push water higher than the prediction. The planner is a calculation on predicted tides, not a safety device, and not for navigation.</p>`,
  faqs: [
    { q: 'What level should I enter in the low tide planner?', a: 'The height, in feet above MLLW, below which your walk works: the level that uncovers a bar, a cove or the rocks you want to reach. If unsure, start with a quarter of the station’s average range, the default, then adjust after one visit by noting the predicted height when the way was just open.' },
    { q: 'Why does the planner show no window on some days?', a: 'Because the water never drops below your level for long enough in daylight that day, often near the quarter moons, when the range is smallest, or when the day’s lowest low falls at night. Raise the level a little, allow night windows, or look at days near the new and full moon.' },
    { q: 'How precise are the window times?', a: 'They are computed to the minute on a curve that follows NOAA’s hourly predictions within a few hundredths of a foot at reference stations. The uncertainty that matters is the weather: wind and swell can move the real water by more than a foot, so treat the end of a window as a deadline with a margin.' },
    { q: 'Can I plan tide pooling with this tool?', a: 'Yes. Set a low level, such as zero or a negative height on the Pacific coast, choose daylight only and a period of 30 to 60 days, and the list gives the best mornings or afternoons. Arrive before the low and leave as the water starts to rise.' },
  ],
  related: ['negative-low-tides', 'boat-ramp-tide-planner', 'high-tide-and-low-tide', 'st:california/la-jolla', 'st:maine/bar-harbor'],
  sources: ['coops_api', 'datums', 'rip_currents'],
});
