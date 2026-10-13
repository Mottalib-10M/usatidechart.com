import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const bi = K.st('mississippi/biloxi'), di = K.st('alabama/dauphin-island'), gi = K.st('louisiana/grand-isle');

export default defineState({
  state: 'mississippi',
  title: 'Mississippi Tides 2026: Biloxi and the Mississippi Sound',
  description: 'Mississippi tides today: the Biloxi tide chart for Mississippi Sound, with 7-day high and low tide times, coefficient, sunrise, moon and solunar periods. 2026.',
  intro: 'One reference gauge at Biloxi for a coast that faces a sheltered sound rather than the open Gulf.',
  resume: `${K.ft(bi.stats.meanRange)} is the average daily tide at Biloxi, the Mississippi station on this site, and that is slightly more than its neighbors get: ${K.ft(di.stats.meanRange)} at Dauphin Island in Alabama and ${K.ft(gi.stats.meanRange)} at Grand Isle in Louisiana. The tide is diurnal for most of the month, ${K.typeWords('mississippi/biloxi')}, with spring days near ${K.ft(bi.stats.springRange)} when the moon stands far from the equator and nearly flat days when it crosses it. The whole mainland shore looks onto Mississippi Sound, a shallow basin closed off by a line of barrier islands several miles out. The tide comes in through the passes between those islands, crosses the sound, then runs late into Biloxi Bay, the Bay of St. Louis, Pascagoula and the bayous. Wind from the south or north can shift the level as much as the moon. Pick the station in the tool above for today's curve, or open its page for seven days, extremes and a planner.`,
  featured: 'mississippi/biloxi',
  body: (h) => `
<h2>The outer islands and their passes</h2>
<p>Cat, Ship, Horn and Petit Bois islands form the seaward wall of the Mississippi coast. Between them, deep passes let the Gulf in and out twice a month in strong pulses and on the quieter days in gentle ones. Currents run hardest in those gaps, not along the mainland beach. Anglers and boaters who cross the sound to the islands work with two tides at once: the one in the passes, which turns first, and the one back at the harbor, which turns later. A boat that leaves ${h.a('st:mississippi/biloxi', 'Biloxi')} on the last of the rise can meet the ebb already running at the islands.</p>
<h2>Rivers that freshen the sound</h2>
<p>The Pearl River on the Louisiana line, the Wolf and Jourdan rivers into the Bay of St. Louis, and the Pascagoula River in the east all pour fresh water into the sound. After weeks of heavy rain inland, that flow holds the bays above their predicted level and pushes muddy water far out toward the islands. In a dry autumn the opposite happens and the sound runs clearer and saltier. The tide chart cannot see any of this; it shows only the astronomical rise and fall.</p>
<h2>A shallow basin under the weather</h2>
<p>Because the sound is shallow and wide, wind acts on it quickly. A southeast breeze held for two or three days stacks water against the mainland, while the sharp north wind behind a winter front empties the shoreline marshes and leaves boat slips sitting low. The station page lists ${bi.stats.negativeLowDays} days in the prediction window with a low below the chart datum, and most of the deepest ones fall in the cold months, when the Gulf's seasonal sea level is also at its lowest. For a falling-water walk along the sand or a trip to the flats, set your own level in the ${h.a('beach-walk-planner', 'low tide beach planner')}, then check the forecast. The ${h.a('fishing-tides', 'fishing tides guide')} explains why moving water in the passes matters more than the height itself, and the ${h.a('tide-range', 'tide range guide')} shows how small Gulf ranges compare with the rest of the country.</p>`,
  faqs: [
    { q: 'How many high tides a day does Mississippi have?', a: 'Usually one. The Mississippi coast has a diurnal tide for most of the month, with a single high and a single low each day. For a few days around each crossing of the equator by the moon, the daily tide weakens to a few inches and a second small high can appear. The average swing at Biloxi is under two feet.' },
    { q: 'Do Mississippi barrier islands change the tide at the beach?', a: 'They shape it. Cat, Ship, Horn and Petit Bois islands shelter the mainland, so the tide reaches the Biloxi and Gulfport beaches across Mississippi Sound rather than straight from the Gulf. The water turns first in the passes between the islands and later along the mainland, and the bays behind the coast turn later still.' },
    { q: 'Can wind change the water level on the Mississippi coast?', a: 'Yes, often by more than the tide. Mississippi Sound is shallow, so a steady south or southeast wind can raise the shoreline level by a foot or more above the prediction, and a strong north wind after a cold front can drain it below the lowest predicted tide. Treat the chart as the astronomical part and check the marine forecast.' },
  ],
});
