import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'florida/cocoa-beach',
  intro: 'The station for Cocoa Beach is Trident Pier at Port Canaveral, on the ocean side just north of the city.',
  body: (h) => {
    const s = h.st('florida/cocoa-beach');
    return `
<h2>The Space Coast tide</h2>
<p>Cocoa Beach faces the Atlantic between Port Canaveral and Patrick Space Force Base. The closest reference station is Trident Pier at the port, which averages ${h.ft(s.stats.meanRange)} from low to high. NOAA also keeps a Cocoa Beach reference station three miles south and predicts Cape Canaveral from Miami's Government Cut with high water about an hour earlier and heights half again as large: the Space Coast's tide is bigger than Miami's but smaller than northeast Florida's.</p>
<h2>Surfing the small Florida tide</h2>
<p>Cocoa Beach is Florida's best-known surf town, and on its sandbars the tide changes the waves: a low tide can make a break steep and fast, a high tide can make the same swell soft and slow. Surfers check the height and the time of the turn as much as the swell report. The pier in the middle of town is a reference point for both surfers and anglers.</p>
<h2>The river lagoons have almost no tide</h2>
<p>West of the beach, the Banana River and the Indian River are lagoons with only a few small inlets far away. Their water levels change little with the moon and more with the wind and rain. For launches into the lagoons, the tide on this page does not apply; for the port and the ocean, it does. The lowest low this period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}, and the highest high ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}.</p>`;
  },
  faqs: [
    { q: 'Do the Banana River and Indian River have tides near Cocoa Beach?', a: 'Very small ones. Both are long lagoons connected to the ocean only through distant inlets such as Sebastian and Ponce, so the lunar tide is damped to a few inches near Cocoa Beach, and wind and rain change the level more. The tide on this page applies to the ocean beach and Port Canaveral.' },
  ],
});
