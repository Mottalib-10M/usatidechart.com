import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'florida/pensacola-beach',
  intro: 'The Pensacola Beach Pier gauge stands on the Gulf side of Santa Rosa Island, a few miles across the sound and bay from the historic Pensacola reference station.',
  body: (h) => {
    const s = h.st('florida/pensacola-beach');
    return `
<h2>The pier, the sound and the city gauge</h2>
<p>Around ${h.ft(s.stats.meanRange)} separates a typical low from the high at the end of the Pensacola Beach Pier, the open-Gulf reading for Santa Rosa Island. Three NOAA gauges sit within seven miles of each other here, and they answer different questions. This one faces the surf. Fishing Bend, less than a mile north, reads Santa Rosa Sound, the narrow water between the island and Gulf Breeze. The Pensacola station itself, up in the bay near downtown, is the long-running reference that NOAA uses to predict much of the Panhandle, Destin included.</p>
<h2>Out toward the pass and Fort Pickens</h2>
<p>Pensacola Pass opens between the western end of Santa Rosa Island, where Fort Pickens stands, and Perdido Key. On the Perdido Key side NOAA lists the Fort McRee breakwater, computed from Pensacola with high water 83 minutes earlier and heights at 80 percent. South of Warrington, inside the bay near the Naval Air Station, the correction is 27 minutes earlier at full height. The reference, in other words, lags the pass by more than an hour because the tide must wind through the pass and up the bay to reach it.</p>
<h2>A season for low water</h2>
<p>The daily tide here waxes and wanes over roughly two weeks, and the year adds a pattern of its own. The deepest predicted low of the period is ${h.ft(s.stats.minLow.h)} on ${h.date(s.stats.minLow.date)}, in the heart of winter, when cold fronts also tend to drive water off the beach with north winds. That combination exposes the most sand along the sound and the most sandbar near the pier. In summer the reverse is more common: southerly winds can hold the water higher than the bare prediction. Anyone planning around a few inches of depth on the sound flats should weigh the wind first. The ${h.a('st:alabama/gulf-shores', 'Gulf Shores')} page covers the Alabama shore to the west.</p>`;
  },
  faqs: [
    { q: 'Should I use the Pensacola or the Pensacola Beach tide table for Santa Rosa Island?', a: 'For the Gulf beach of Santa Rosa Island, use the Pensacola Beach Pier station, which measures the surf directly. The Pensacola reference is inside the bay near downtown and turns later, since the tide has to travel through the pass first. For the sound side near Gulf Breeze, NOAA keeps a separate gauge at Fishing Bend, under a mile north of the pier.' },
  ],
});
