import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'north-carolina/nags-head',
  intro: 'NOAA predicts the Nags Head ocean beach at Jennette’s Pier from the Duck pier, 15 miles north, with almost the same times.',
  body: (h) => {
    const s = h.st('north-carolina/nags-head');
    return `
<h2>Jennette's Pier and the ocean beach</h2>
<p>Nags Head's tide station is Jennette's Pier, on the open Atlantic. NOAA computes it from Duck: high water five minutes earlier, low water a minute later, high-water heights 4 percent larger and lows deeper, for an average day of ${h.ft(s.stats.meanRange)}. Between those highs and lows, the curve here follows the shape of Duck's hourly prediction. On the beaches from Kill Devil Hills to South Nags Head, the timing is the same within a few minutes.</p>
<h2>Roanoke Sound runs on another clock</h2>
<p>West of the beach road lies Roanoke Sound, and beyond it Roanoke Island and Croatan Sound. Their water comes in through Oregon Inlet, eight miles south, and arrives late and small: NOAA predicts the Roanoke Sound channel from the Oregon Inlet marina with high water about an hour and a half later and a fraction of the marina's already small range. Kayakers and kiteboarders on the sound watch the wind far more than the tide.</p>
<h2>Shifting sand at the south end</h2>
<p>Nags Head is a famously eroding beach, and at high tide on a big swell the water can reach the dune line in the narrow stretches. The highest prediction this period is ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}; storms, not the tide alone, cause the overwash. The lowest low is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}. See ${h.a('st:north-carolina/duck', 'Duck')} for the reference station and the ${h.a('outer-banks', 'Outer Banks comparison')} for the whole chain.</p>`;
  },
  faqs: [
    { q: 'Do Nags Head beach tides apply to Roanoke Sound?', a: 'No. The beach follows the Atlantic tide, predicted from the Duck pier. Roanoke Sound is fed through Oregon Inlet, and NOAA predicts its channel with high water about an hour and a half after the inlet marina and a much smaller range. On the sound, wind usually changes the water level more than the tide does.' },
  ],
});
