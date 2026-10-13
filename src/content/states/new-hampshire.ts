import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const hb = K.st('new-hampshire/hampton-beach');

export default defineState({
  state: 'new-hampshire',
  title: 'New Hampshire Tides 2026: Hampton Beach and the Seacoast',
  description: 'New Hampshire tides today: Hampton Beach tide chart with 7-day high and low tide times, tide coefficient, sunrise and solunar periods for the Seacoast. 2026.',
  intro: 'One station for a short coastline: Hampton Harbor, predicted from Portland, Maine.',
  resume: `New Hampshire has only about eighteen miles of ocean coast, from Seabrook to Portsmouth, and its tide is the big semidiurnal tide of the Gulf of Maine: two highs and two lows a day, with an average range of ${K.ft(hb.stats.meanRange)} at Hampton Harbor, the station on this site. NOAA predicts Hampton Harbor from the Portland gauge in Maine, with high water a quarter of an hour later and low water half an hour later, because the harbor drains through a narrow inlet. The tool above gives today's curve and times, and the Hampton Beach page adds the seven-day table, the king tides and a planner. Up the Piscataqua River and into Great Bay, the tide turns later and the currents in the river are among the strongest on the East Coast.`,
  featured: 'new-hampshire/hampton-beach',
  body: (h) => `
<h2>A short coast with a big tide</h2>
<p>New Hampshire's beaches, Hampton, North Hampton, Rye and Wallis Sands, face the open Gulf of Maine. Their tide is nearly the same as southern Maine's, a little smaller: NOAA multiplies the Portland heights by about nine tenths for Hampton Harbor. On the flat sand of Hampton Beach, nine feet of range moves the waterline a long way, and the hard sand at low tide is the time for long walks.</p>
<h2>The Piscataqua and Great Bay</h2>
<p>At the north end of the coast, Portsmouth sits on the Piscataqua River, which drains Great Bay, a large tidal estuary several miles inland. A big volume of water passes through the river's narrow, deep channel on every tide, and its currents are famously strong around the bridges between Portsmouth and Kittery. Inside Great Bay the tide arrives late: NOAA predicts the Squamscott River railroad bridge, at the head of the estuary, more than two hours after Portland and with three quarters of its height. Paddlers on the bay plan around the current more than the height.</p>
<h2>Isles of Shoals</h2>
<p>Offshore, Gosport Harbor in the Isles of Shoals is predicted from Portland within two minutes and with 93 percent of the height: the open-water tide of the gulf. For the beaches, the ${h.a('st:new-hampshire/hampton-beach', 'Hampton Beach tide chart')} is the one to use; for the coast to the north, see ${h.a('state:maine', 'Maine tides')}.</p>`,
  faqs: [
    { q: 'How big is the tide in New Hampshire?', a: 'Large: Hampton Harbor averages close to nine feet between low and high, with more around the new and full moon, because New Hampshire’s coast shares the amplified tide of the Gulf of Maine. NOAA predicts it from Portland, Maine, at about nine tenths of the height.' },
    { q: 'Why is the current so strong in the Piscataqua River at Portsmouth?', a: 'Because Great Bay, a large tidal estuary behind Portsmouth, fills and empties through the Piscataqua’s narrow, deep channel on every tide. A large volume of water must pass through a small cross-section in about six hours, so the current runs hard, especially in the middle of the ebb and the flood.' },
    { q: 'Are New Hampshire beach tides the same as Portland, Maine?', a: 'Close. NOAA predicts Hampton Harbor from Portland with high water 14 minutes later, low water 32 minutes later and heights at 91 percent. On the open beaches the turn comes a little earlier than in the harbor, so the Hampton Beach page is a good guide for the whole Seacoast.' },
  ],
});
