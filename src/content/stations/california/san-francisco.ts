import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'california/san-francisco',
  intro: 'The San Francisco gauge stands at the Golden Gate on the Presidio shore near Fort Point, the narrow strait through which every tide of the bay enters and leaves.',
  body: (h) => {
    const s = h.st('california/san-francisco');
    return `
<h2>The oldest record on the coast</h2>
<p>This is the longest-running tide station in the Western Hemisphere, with measurements going back to 1854, and it sits where it matters most: in the throat of the Golden Gate, just inside the bridge. Everything that fills and drains San Francisco Bay, from the South Bay marshes to the Delta, passes this point twice a day. The average range here is ${h.ft(s.stats.meanRange)}; spring tides reach ${h.ft(s.stats.springRange)}, neap tides ${h.ft(s.stats.neapRange)}. Because so much water squeezes through a strait about a mile wide, the currents in the Gate run strong, and the turn of the current does not fall at the time of high or low water printed here. Boaters need NOAA's current predictions, not this table.</p>
<h2>Ocean Beach turns first, the bay later</h2>
<p>The tide reaches the outer coast before the strait. NOAA predicts Ocean Beach from this gauge with high water 49 minutes earlier and low water 35 minutes earlier, and Point Bonita, at the Marin side of the entrance, 17 minutes earlier at high water. Inside, the delay builds: Sausalito 10 minutes later at 97 percent of the highs, Pier 41 on the northern waterfront 13 minutes later, Alcatraz 14 minutes later at high water and 18 at low, the west side of Angel Island 13 minutes later. A walk on Ocean Beach and a sail from the city front run on clocks almost an hour apart.</p>
<h2>Crissy Field and the waterfront at the top of the tide</h2>
<p>The highest predicted water of the period, on ${h.date(s.stats.maxHigh.date)}, comes in the middle of winter, when storms can stack wind and pressure on top of it. The low shoreline along Crissy Field and the Embarcadero is where those days are most visible. The ${h.a('king-tides', 'king tide calendar')} lists the dates.</p>`;
  },
  faqs: [
    { q: "Why does high tide reach Ocean Beach before the Golden Gate in San Francisco?", a: "Ocean Beach faces the open Pacific, while the Golden Gate gauge sits inside the strait that leads to the bay, so the tide wave meets the outer coast first. NOAA's correction puts Ocean Beach high water about 50 minutes ahead of the gauge and low water about 35 minutes ahead. Inside the bay the delay keeps growing, by ten to twenty minutes at Sausalito and Alcatraz." },
  ],
});
