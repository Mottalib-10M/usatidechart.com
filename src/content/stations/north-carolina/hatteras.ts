import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'north-carolina/hatteras',
  intro: 'The Cape Hatteras fishing pier station, at Frisco on the ocean side of Hatteras Island, gives the tide for the cape and its beaches.',
  body: (h) => {
    const s = h.st('north-carolina/hatteras');
    return `
<h2>The ocean tide at the elbow of the Outer Banks</h2>
<p>Hatteras Island bends sharply at Cape Point, where the coast turns from facing east to facing south. The station at the Frisco pier site, on the south-facing beach, averages ${h.ft(s.stats.meanRange)} from low to high. NOAA predicts Cape Hatteras itself from this station with the same time, and keeps a second reference station, Hatteras (ocean), four miles west near the village.</p>
<h2>Cape Point and Diamond Shoals</h2>
<p>Off Cape Point the Diamond Shoals reach out into the Atlantic, where the cold water from the north meets the Gulf Stream. The tidal current and the longshore currents meet over the shoals, and the Point is one of the best-known surf fishing spots on the coast. The tide here is a modest one; what anglers read is the moving water around the turn and the shape of the sloughs on the point, which changes after every storm.</p>
<h2>Hatteras Inlet and the sound</h2>
<p>At the island's southern end, Hatteras Inlet is predicted from this station with high water 8 minutes later and two thirds of the height. Inside, in Pamlico Sound, the tide fades to almost nothing and the wind takes over. The lowest predicted low on the ocean beach this period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}; the highest high, ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}. Highway 12 overwash comes with storms rather than with the tide alone. See the ${h.a('outer-banks', 'Outer Banks comparison')}.</p>`;
  },
  faqs: [
    { q: 'What tide station should I use for Cape Point at Hatteras?', a: 'The Cape Hatteras fishing pier station on this page. NOAA predicts Cape Hatteras itself from it with high water one minute later and the same height, so the times hold for the Point. For Hatteras Inlet, NOAA adds 8 minutes and uses two thirds of the height; inside Pamlico Sound the tide is tiny and wind matters more.' },
  ],
});
