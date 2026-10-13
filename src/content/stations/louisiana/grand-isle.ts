import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'louisiana/grand-isle',
  intro: 'East Point, at the tip of Grand Isle beside Barataria Pass, is the reference gauge for the barrier coast south of New Orleans.',
  body: (h) => {
    const s = h.st('louisiana/grand-isle');
    return `
<h2>One tide a day, most days of the year</h2>
<p>${Math.round(s.stats.oneHighShare * 100)}% of days at East Point bring a single high, and the range on an average day is a modest ${h.ft(s.stats.meanRange)}. Grand Isle is a narrow barrier island with the Gulf on its south face and the marsh and open water of Barataria Bay behind it. Barataria Pass, at the island's east end next to the gauge, and Caminada Pass, at its west end, are the doors through which that huge estuary breathes. The tide is small, but the volume of water moving through those passes is large, which is part of why the passes draw so much interest from anglers.</p>
<h2>Barataria Bay lags by hours</h2>
<p>NOAA predicts the surrounding stations from East Point itself, so the corrections read directly against this page. Barataria Pass turns 60 minutes after East Point at high water but 10 minutes before it at low water, with heights 13 percent greater. Bayou Rigaud, on the bay side of the island where the harbor lies, reaches high 92 minutes later. Independence Island, a few miles into the bay, waits 149 minutes, and Quatre Bayous Pass 138 minutes. Up in Hackberry Bay and the inner marsh the delay grows further, so a trip that starts at the island and ends deep in the bay crosses several tide clocks.</p>
<h2>A coast where wind and land both move</h2>
<p>The figures here are astronomy only. On the Louisiana coast, a few days of south or southeast wind can raise the water by more than the tide itself, and a sharp winter front can blow the bays out until docks sit high and dry. ${s.stats.negativeLowDays} days of the period have a predicted low below the chart datum, and on a strong norther the real level can fall lower still. The land is also sinking slowly while the sea rises, so the old marks around the island do not line up with the water the way they once did. For context on how far the water can drop, see the ${h.a('negative-low-tides', 'negative low tide guide')}; none of this is for navigation.</p>`;
  },
  faqs: [
    { q: 'How much later is high tide in Bayou Rigaud than at East Point, Grand Isle?', a: 'About an hour and a half. NOAA predicts Bayou Rigaud, on the bay side of Grand Isle, from the East Point gauge with high water 92 minutes later and low water 46 minutes later, at heights a few percent lower. Stations deeper in Barataria Bay, such as Independence Island, lag more than two hours. Add those minutes when the plan starts from the harbor side.' },
  ],
});
