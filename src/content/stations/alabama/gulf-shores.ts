import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'alabama/gulf-shores',
  intro: 'The Gulf Shores station is on the Intracoastal Waterway that cuts across the town behind the beach, not on the surf itself, a detail worth knowing before you use its times.',
  body: (h) => {
    const s = h.st('alabama/gulf-shores');
    return `
<h2>A canal gauge for a beach town</h2>
<p>${h.ft(s.stats.meanRange)} is the average daily movement at the Gulf Shores waterway gauge, and on ${Math.round(s.stats.oneHighShare * 100)}% of days it comes as one long rise and one long fall. The station sits on the Intracoastal Waterway, the dredged channel that runs east and west a short way inland from the beach and links Mobile Bay with Perdido Bay. Boaters launching into the canal or the bays get a direct reading. Beachgoers get a close approximation: NOAA keeps a separate station at the Gulf State Park Pier, two and a half miles southeast, which is the one that actually faces the open Gulf.</p>
<h2>Bon Secour, Wolf Bay and the passes</h2>
<p>West of town, the Bon Secour River runs into the bay of the same name. NOAA builds its prediction from Mobile State Dock, the reference far up Mobile Bay, giving the river high water 73 minutes earlier than Mobile and heights 7 percent larger. That early timing shows how long the tide takes to work its way up the main bay to the city. To the east, Wolf Bay and Alabama Point, where Perdido Pass opens to the Gulf, have their own gauges.</p>
<h2>When water rises without the moon</h2>
<p>A canal and a set of shallow bays respond quickly to weather. Several days of southerly wind push the Gulf in and lift the waterway well above the table, which is why the highest prediction here, ${h.ft(s.stats.maxHigh.h)} on ${h.date(s.stats.maxHigh.date)}, is a modest figure next to what storms bring. The opposite comes with winter northers that can leave docks high and ramps shallow. Treat the chart above as the astronomical part of the story, then look at the wind; the ${h.a('boat-ramp-tide-planner', 'boat ramp planner')} helps with the first half, and ${h.a('st:alabama/dauphin-island', 'Dauphin Island')} shows the tide at the mouth of Mobile Bay.</p>`;
  },
  faqs: [
    { q: 'Is the Gulf Shores tide station on the beach?', a: 'No. The Gulf Shores station measures the Intracoastal Waterway, the channel that crosses the town behind the beach. NOAA keeps a separate gauge at the Gulf State Park Pier, a little over two miles southeast, for the open Gulf. Both show a small tide, usually one rise and one fall a day, and the wind often changes the level as much as the tide does.' },
  ],
});
