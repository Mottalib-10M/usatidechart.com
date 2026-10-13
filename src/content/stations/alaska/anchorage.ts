import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'alaska/anchorage',
  intro: 'The Anchorage station is on Knik Arm at the port, near the head of Cook Inlet, where the tide is the largest in the United States.',
  body: (h) => {
    const s = h.st('alaska/anchorage');
    return `
<h2>Twenty-eight feet, twice a day</h2>
<p>Cook Inlet is a long, narrowing funnel, and the tide that enters it from the Gulf of Alaska grows all the way to its head. At Anchorage the average day moves ${h.ft(s.stats.meanRange)} from low to high, and spring tides reach ${h.ft(s.stats.springRange)}. In the middle hours of a big rise the water climbs several feet in an hour. The highest predicted tide this period is ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}.</p>
<h2>The mudflats are not a beach</h2>
<p>At low tide, Knik Arm and Turnagain Arm drain to vast flats of glacial silt. They look firm and they are not: the silt can liquefy under a footstep and hold a leg like cement, and the rising tide arrives faster than a person can walk. People have been trapped and drowned on these flats. Stay off them, whatever the tide table says. Watch the inlet from the Coastal Trail or the shore instead.</p>
<h2>The bore of Turnagain Arm</h2>
<p>On the biggest tides a tidal bore, a wave of incoming water, runs up Turnagain Arm south of the city, best seen from viewpoints along the Seward Highway some time after low tide at Anchorage. Surfers ride it. The bore is strongest around the new and full moon, when the range is largest; the lowest low of this period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}. Port MacKenzie across Knik Arm has its own reference station. See ${h.a('st:alaska/homer', 'Homer')} for the lower inlet and the ${h.a('tide-range', 'tide range guide')} for why funnels amplify the tide.</p>`;
  },
  faqs: [
    { q: 'When can you see the bore tide near Anchorage?', a: 'On days with the largest ranges, around the new and full moon, the bore runs up Turnagain Arm a while after low tide at Anchorage, arriving later the further east you watch along the Seward Highway. Use this page to find the big-range days and the low time, then arrive early at a pullout and stay off the mudflats.' },
  ],
});
