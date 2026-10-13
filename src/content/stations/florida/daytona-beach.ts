import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'florida/daytona-beach',
  intro: 'NOAA predicts Daytona Beach Shores, at the Sunglow Pier, from Fernandina Beach with high water 56 minutes earlier.',
  body: (h) => {
    const s = h.st('florida/daytona-beach');
    return `
<h2>A beach where the tide decides where you park</h2>
<p>Daytona's hard-packed sand is famous for driving, and on the beach the tide is a practical matter: the drivable strip shrinks at high tide, and beach driving areas are closed when the water comes up. The station at the Sunglow Pier in Daytona Beach Shores is computed from Fernandina Beach with high water 56 minutes earlier, low water 42 minutes earlier, high-water heights at 65 percent. The result is an average day of ${h.ft(s.stats.meanRange)}. Volusia County posts the beach driving rules and closures; this page gives the water.</p>
<h2>The Halifax River runs hours behind</h2>
<p>Behind the beach, the Halifax River is a lagoon with a small, late tide. NOAA predicts the Halifax River at Ormond Beach from Fernandina with high water more than three hours later and a tenth of the height at high water: on the river the tide barely matters. At Ponce Inlet, nine miles south of town, the Halifax meets the ocean and the tide is stronger, with its own reference station at Ponce de Leon Inlet.</p>
<h2>Highs, lows and the surf</h2>
<p>The lowest predicted low here this period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}, when the beach is widest; the highest high is ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}. Rip currents form along this coast whatever the tide. The ${h.a('beach-walk-planner', 'low tide beach planner')} lists the daylight hours with the water below the level you choose.</p>`;
  },
  faqs: [
    { q: 'Can you drive on Daytona Beach at high tide?', a: 'Beach driving depends on the tide and on county rules. At high tide the drivable sand narrows and some areas close until the water recedes. Volusia County announces closures and the hours of beach driving; check them before going. This page shows when the water is high and low at Daytona Beach Shores.' },
  ],
});
