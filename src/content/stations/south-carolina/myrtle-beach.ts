import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'south-carolina/myrtle-beach',
  intro: 'Springmaid Pier, on the open Atlantic at the south end of Myrtle Beach, is the reference tide station for the Grand Strand.',
  body: (h) => {
    const s = h.st('south-carolina/myrtle-beach');
    return `
<h2>Ocean side or waterway side: two different tides</h2>
<p>The times on this page are for the ocean. Springmaid Pier stands in the surf of the Grand Strand, so its tide is the one that decides how much hard sand you get for a morning walk or how far the swash climbs toward the dunes. Drive four miles inland to the Intracoastal Waterway and the water follows another clock: NOAA predicts its Combination Bridge station with high water 176 minutes after Charleston Harbor and heights scaled to about a third, and the Socastee Bridge, further up the canal, later still. Anyone launching at a waterway ramp in the afternoon should read a waterway station, not this one, because the high on the canal can arrive close to three hours after the high at the pier.</p>
<p>Southwest along the beach, NOAA keeps a separate station at Garden City Pier, seven miles away, and another on Main Creek behind it at the Garden City Bridge: if you fish the creeks of the Murrells Inlet marsh rather than the surf, those are the closer predictions to look up.</p>
<h2>What ${h.ft(s.stats.meanRange)} of range means on this beach</h2>
<p>The Grand Strand is a wide, gently sloping beach, so a typical day's swing moves the waterline a long way horizontally. At low water you can walk the firm, wet sand that is under the swash at high water, and around the new and full moon the lows drop below 0 ft (MLLW) on ${s.stats.negativeLowDays} days of the prediction period, the best mornings for shelling and for finding the runnels between the bars. On the highest tides of the year, ${h.date(s.stats.maxHigh.date)} among them, the water can reach the foot of the dunes at the narrow spots, and an onshore wind adds to it.</p>
<h2>Pier fishing and the turn of the tide</h2>
<p>Pier anglers on the Strand tend to watch the turn: the first hours of the incoming tide push bait over the bars toward the pilings. The solunar periods on the chart above give the moon's part; the tide table gives the water's. When a major period lands within an hour of a tide change, both are working for you, and the planner below finds the hours the water stays above a level if your spot only fishes well on a higher tide.</p>`;
  },
  faqs: [
    { q: 'Is the Myrtle Beach tide the same at the Intracoastal Waterway?', a: 'No. NOAA predicts its waterway stations near Myrtle Beach from Charleston Harbor with high water roughly three hours later than the harbor at the Combination Bridge, and a range about a third as large. The ocean tide at Springmaid Pier runs about 25 minutes ahead of Charleston, so the canal can be close to its high while the beach is already falling.' },
  ],
});
