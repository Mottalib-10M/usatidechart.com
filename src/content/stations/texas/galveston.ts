import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'texas/galveston',
  intro: 'The Galveston Pleasure Pier gauge stands off the seawall on the Gulf face of Galveston Island, the open-water station for the island’s beaches.',
  body: (h) => {
    const s = h.st('texas/galveston');
    return `
<h2>Seawall beach, Gulf water</h2>
<p>${h.ft(s.stats.meanRange)} is the average daily range at the Pleasure Pier, a bit more than most of the northern Gulf gets. The pier reaches out from the seawall that Galveston raised after the 1900 hurricane, and the beach below it narrows and widens with every tide. NOAA's numbers class it as diurnal, yet the label fits loosely: only ${Math.round(s.stats.oneHighShare * 100)}% of days show a single high, and on the rest the twice-daily part of the tide makes itself felt, with a second, smaller high squeezed in. The water's rhythm here shifts week by week between those two behaviors.</p>
<h2>A crowd of gauges around the island</h2>
<p>Galveston is unusually well covered. Within seven miles NOAA operates a station on Galveston Channel, the harbor side behind the island; one at Port Bolivar across the entrance; two at the North and South Jetties that frame the entrance to Galveston Bay; and one at the railroad bridge on the causeway side. They are all primary gauges, so each has its own prediction rather than a correction. Texas City's turning basin, inside the bay, is the exception: NOAA computes it from the Galveston Channel station, 33 minutes later at high water and at the same height. A harbor or bay trip should use one of those gauges, not this pier.</p>
<h2>Northers, southeasters and the beach</h2>
<p>Few places show the wind's power over the tide as plainly. When a strong winter norther sweeps down across Galveston Bay, it drives water out toward the Gulf and can leave the level well below the table, sometimes for a day or more. Winds from the southeast do the reverse, piling water against the seawall and up the beach. The deepest predicted low of the period, ${h.ft(s.stats.minLow.h)} on ${h.date(s.stats.minLow.date)}, can be beaten in practice by a hard norther. The ${h.a('beach-walk-planner', 'beach walk planner')} works from the prediction; check the wind before trusting it, and compare with ${h.a('st:texas/port-aransas', 'Port Aransas')} down the coast.</p>`;
  },
  faqs: [
    { q: 'Which Galveston tide station should I use for the harbor and the bay?', a: 'For the beach along the seawall, use the Pleasure Pier station on this page. For the harbor behind the island, NOAA runs a separate gauge on Galveston Channel, and the jetties at the bay entrance each have their own. Texas City, inside Galveston Bay, is predicted from the Galveston Channel gauge with high water about half an hour later at the same height.' },
  ],
});
