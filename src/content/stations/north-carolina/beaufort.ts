import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'north-carolina/beaufort',
  intro: 'The Beaufort station, at the Duke University Marine Lab on Pivers Island, gives the tide for Beaufort, Morehead City and Beaufort Inlet.',
  body: (h) => {
    const s = h.st('north-carolina/beaufort');
    return `
<h2>Crystal Coast waters around one inlet</h2>
<p>Beaufort, Morehead City and Atlantic Beach all sit around Beaufort Inlet, the deep-water gap in the barrier islands of the southern Outer Banks. The reference station at the marine lab averages ${h.ft(s.stats.meanRange)} from low to high. Around it, NOAA predicts its secondary stations from the Cape Hatteras pier: the inlet channel range 7 minutes later, Fort Macon 17 minutes later, Morehead City 26 minutes later, Taylor Creek on Beaufort's waterfront 52 minutes later, all with low tides deeper than at Hatteras.</p>
<h2>Shackleford Banks and the low-tide flats</h2>
<p>Across Taylor Creek from Beaufort lie Carrot Island and the Rachel Carson Reserve, and beyond them Shackleford Banks. At low tide, sand flats and oyster beds appear around the creeks and the shallow sound, and the channels narrow to strips of water. Boaters heading out to the banks watch for those shoals, and walkers on the flats watch for the returning tide. The lowest predicted low of this period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}.</p>
<h2>Fort Macon and the inlet</h2>
<p>At Fort Macon, on the east tip of Bogue Banks, the inlet current sweeps past the beach. Fishing the inlet is about the moving water on either side of the turn; swimming near the inlet is unwise when the ebb runs. For planning a launch at a Bogue Sound ramp, the ${h.a('boat-ramp-tide-planner', 'boat ramp planner')} lists the hours above the level you need.</p>`;
  },
  faqs: [
    { q: 'Is the tide in Morehead City the same as in Beaufort?', a: 'Close. NOAA predicts Morehead City from the Cape Hatteras pier with high water 26 minutes later, and Taylor Creek on the Beaufort waterfront 52 minutes later, so Beaufort’s docks turn about half an hour after Morehead City’s. The marine lab station on this page sits between them on Pivers Island.' },
  ],
});
