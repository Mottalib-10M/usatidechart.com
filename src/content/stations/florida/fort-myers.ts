import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'florida/fort-myers',
  intro: 'The Fort Myers station measures the tide on the Caloosahatchee River at the downtown waterfront, miles upstream from the Gulf beaches that share the city name.',
  body: (h) => {
    const s = h.st('florida/fort-myers');
    return `
<h2>A river gauge, not a beach gauge</h2>
<p>Only ${h.ft(s.stats.meanRange)} of tide reaches downtown Fort Myers on an average day, less than half of what the open Gulf shore to the south gets at ${h.a('st:florida/naples', 'Naples')}. The reason is the trip the water makes. A tide entering from the Gulf has to cross the shallow waters around Pine Island and Sanibel, then climb the Caloosahatchee estuary, losing height at each bend. By the time it touches the seawalls along the city's riverfront, it is a modest rise and fall, with the two daily highs unequal by ${h.ft(s.stats.highInequality)} on average.</p>
<p>Fort Myers Beach, on Estero Island, faces the Gulf directly and has a larger, earlier tide than this station. If your plans are on that sand, the river figures here will understate the swing and run late.</p>
<h2>Downstream toward Cape Coral and Iona</h2>
<p>Between this gauge and the mouth, NOAA keeps a station at the Cape Coral Bridge, seven miles southwest. Farther down, near Iona Shores, the prediction is built from St. Petersburg, with high water 68 minutes after that reference and heights at 43 percent of its values. That small multiplier says a lot about how sheltered the lower river is.</p>
<h2>When the river, not the moon, sets the level</h2>
<p>On a tide this small, other forces matter. Fresh water coming down the Caloosahatchee after heavy rain raises the river and can mute the falling tide for days. Wind pushes the shallow estuary around too: a strong blow from the west stacks water up the river, while an east wind after a front drains it. The predicted extremes on this page, from ${h.ft(s.stats.minLow.h)} to ${h.ft(s.stats.maxHigh.h)}, describe the astronomical tide only, so check river and wind conditions before a launch on a shallow ramp; the ${h.a('boat-ramp-tide-planner', 'boat ramp planner')} works from the prediction.</p>`;
  },
  faqs: [
    { q: 'Can I use the Fort Myers tide times for Fort Myers Beach?', a: 'Not reliably. This station sits on the Caloosahatchee River downtown, where the tide arrives late and reduced after crossing the estuary. Fort Myers Beach is on Estero Island facing the open Gulf, so its highs and lows come earlier and swing wider. Use the river times for docks and ramps along the Caloosahatchee, and a Gulf station for the beach.' },
  ],
});
