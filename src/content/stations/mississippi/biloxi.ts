import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'mississippi/biloxi',
  intro: 'Biloxi sits on a peninsula between Mississippi Sound and the Back Bay of Biloxi, and its NOAA station is the reference for this middle stretch of the Mississippi coast.',
  body: (h) => {
    const s = h.st('mississippi/biloxi');
    return `
<h2>A sound, not an ocean</h2>
<p>${h.ft(s.stats.meanRange)} of average daily range makes Biloxi one of the livelier tides on the Mississippi coast, yet the water in front of the beach is not the open Gulf. Mississippi Sound lies between the mainland and a chain of barrier islands several miles offshore, with Deer Island just off the Biloxi waterfront. The long man-made beach along the highway faces that sheltered sound, which is why the surf is usually small and the water often turbid. Tides reach it through the gaps between the outer islands and then spread across a broad, shallow basin.</p>
<h2>Highest and lowest in the same December week</h2>
<p>Here the calendar does something unusual. The tallest predicted high of the whole period, ${h.ft(s.stats.maxHigh.h)}, and the deepest low, ${h.ft(s.stats.minLow.h)}, both fall on ${h.date(s.stats.maxHigh.date)}. That is the signature of a tide driven by the moon's distance from the equator: when the daily tide is at full strength, it lifts the high and drops the low together, and the range for that day is the largest of the year. Around the same days the solar part of the tide reinforces it, so early winter at Biloxi is a time of big swings.</p>
<h2>Back Bay and the bayous run hours behind</h2>
<p>Behind the peninsula, the Back Bay of Biloxi and its bayous fill slowly. NOAA does not predict them from the Biloxi gauge but from South Pass, at the mouth of the Mississippi River in Louisiana. Cadet Point on Biloxi Bay comes out 124 minutes later than South Pass at high water, with heights multiplied by 1.38; Davis Bayou near Ocean Springs 144 minutes later; and Turkey Creek on Bernard Bayou 203 minutes later. A dock up a bayou may keep rising well after the beach has turned.</p>
<p>Wind can override all of this. A southeast blow pushes water into the sound and the bays; a winter north wind pulls it out. The ${h.a('king-tides', 'king tides guide')} explains why big astronomical tides and onshore wind together cause most nuisance flooding.</p>`;
  },
  faqs: [
    { q: 'Why is the tide in the Back Bay of Biloxi later than on the beach?', a: 'The Back Bay connects to Mississippi Sound through a narrow opening, so it fills and drains slowly. NOAA predicts its stations from South Pass in Louisiana, placing Cadet Point about two hours after that reference and Bernard Bayou more than three hours after. The beach along the sound turns earlier, so use a bay station for docks and launches behind the peninsula.' },
  ],
});
