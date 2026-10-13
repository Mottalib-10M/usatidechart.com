import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'north-carolina/wrightsville-beach',
  intro: 'The Wrightsville Beach station measures the ocean tide on the barrier island east of Wilmington.',
  body: (h) => {
    const s = h.st('north-carolina/wrightsville-beach');
    return `
<h2>Wilmington's beach</h2>
<p>Wrightsville Beach is a barrier island between Masonboro Inlet and Mason Inlet, a short drive from downtown Wilmington. Its reference station averages ${h.ft(s.stats.meanRange)} from low to high, a bigger tide than on the northern Outer Banks: the coast here curves into Onslow Bay and Long Bay, where the shelf is wider and the tide grows. Around the new and full moon the range reaches ${h.ft(s.stats.springRange)}.</p>
<h2>Banks Channel and the waterway</h2>
<p>Behind the beach, Banks Channel and the Intracoastal Waterway carry the tide between the inlets, and NOAA keeps a reference station at Shinn Point on the waterway, a mile and a half west. In the channels the current can be strong on both flood and ebb, which paddleboarders feel quickly. Upriver, Wilmington's own station on the Cape Fear has a tide that arrives much later than the beach.</p>
<h2>Surf at the low and the high</h2>
<p>Wrightsville's surf breaks change with the tide: some sandbars work at low tide, others need more water, and the area around the pier and the inlets behaves differently from the open stretch. The lowest low predicted this period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}, and the highest high ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}. The ${h.a('state:north-carolina', 'North Carolina page')} compares the state's stations.</p>`;
  },
  faqs: [
    { q: 'Is high tide in Wilmington the same time as at Wrightsville Beach?', a: 'No. Wilmington is about 25 miles up the Cape Fear River from the ocean, and the tide reaches it hours after the beach. NOAA keeps separate reference stations for the river at Wilmington and for the beach. Use this page for the ocean side and the inlets, and the Wilmington station for downtown docks.' },
  ],
});
