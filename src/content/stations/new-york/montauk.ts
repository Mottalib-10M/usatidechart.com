import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'new-york/montauk',
  intro: 'The Montauk station is in Fort Pond Bay, on the Block Island Sound side of the eastern tip of Long Island.',
  body: (h) => {
    const s = h.st('new-york/montauk');
    return `
<h2>A small tide at the end of Long Island</h2>
<p>Montauk's Fort Pond Bay rises and falls just ${h.ft(s.stats.meanRange)} on an average day. The tip of Long Island sits at the entrance to Long Island Sound and Block Island Sound, near where the Atlantic tide wave splits, and the range here is small compared with ${h.a('st:new-york/new-york-city', 'New York Harbor')} or the western Sound. What Montauk lacks in height it makes up in current: the water running between the Atlantic and the sounds sweeps around Montauk Point and through the rips off the lighthouse.</p>
<h2>Lake Montauk and the harbor entrance</h2>
<p>Lake Montauk, the harbor of the fishing fleet, has its own NOAA station two miles to the northeast. Its entrance is predicted by NOAA from New London with high water 24 minutes earlier and three quarters of New London's height. Inside the jetties the tide is gentle, but the inlet channel carries all the water in and out of the lake.</p>
<h2>Surf, rips and the fishing at the Point</h2>
<p>On the ocean beaches east of the village the swell matters more than the tide's small height. Surfcasters at the Point watch both: the rips and the bait moving around the point depend on the tidal current, strongest in the middle hours of each tide. The lowest predicted low of the period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}; the ${h.a('solunar-tables', 'solunar tables')} add the moon's periods for a planned trip.</p>`;
  },
  faqs: [
    { q: 'Why is the tide range at Montauk so small?', a: 'Montauk sits at the entrance of Long Island Sound and Block Island Sound, near the area where the incoming Atlantic tide wave divides, so the water level swings little, about two to three feet a day. The currents around Montauk Point are strong, though, because large volumes of water move between the ocean and the sounds every six hours.' },
  ],
});
