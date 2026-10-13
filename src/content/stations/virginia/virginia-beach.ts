import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'virginia/virginia-beach',
  intro: 'NOAA predicts the Virginia Beach oceanfront from the Duck pier in North Carolina, with high water 15 minutes later and heights 7 percent larger.',
  body: (h) => {
    const s = h.st('virginia/virginia-beach'), n = h.st('virginia/norfolk');
    return `
<h2>Oceanfront tide, borrowed from the Outer Banks</h2>
<p>The resort strip of Virginia Beach faces the open Atlantic just south of the mouth of Chesapeake Bay. Its tide is predicted from the research pier at ${h.a('st:north-carolina/duck', 'Duck')}, about 50 miles south: high water 15 minutes later, low water 16 minutes later, heights multiplied by 1.07. That gives the oceanfront an average day of ${h.ft(s.stats.meanRange)}, noticeably more than the ${h.ft(n.stats.meanRange)} of ${h.a('st:virginia/norfolk', 'Hampton Roads')} inside the bay.</p>
<h2>Rudee Inlet and the lakes behind it</h2>
<p>At the south end of the boardwalk, Rudee Inlet connects the ocean to Lake Rudee and Lake Wesley. NOAA keeps a reference station in the interior channel and predicts the inlet entrance from Duck with nearly the same times. Inside, the lakes run 16 to 20 minutes behind Duck with similar heights. The inlet is the launch point for many offshore and inshore trips, and the bar at its mouth can break on a big swell at low water.</p>
<h2>Cape Henry and the bay side</h2>
<p>Six miles north, Cape Henry at the mouth of the Chesapeake is predicted from Duck 31 minutes later. Turn the corner into the bay, and the tide changes character: Lynnhaven and Broad Bay are predicted from the Chesapeake Bay Bridge-Tunnel with high water about two hours later and roughly half to two thirds of the height. The lowest predicted low on the oceanfront this period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}.</p>`;
  },
  faqs: [
    { q: 'Is the tide at Virginia Beach different on the Chesapeake Bay side?', a: 'Yes. The oceanfront follows the Atlantic, predicted from Duck with a 15-minute correction. On the bay side, Broad Bay and Brown Cove near Lynnhaven are predicted from the Chesapeake Bay Bridge-Tunnel with high water about two hours later and much smaller heights. Use the station on the water you are actually on.' },
  ],
});
