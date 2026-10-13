import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'florida/clearwater-beach',
  intro: 'Clearwater Beach has its own primary gauge on the Gulf side of the barrier island, the station NOAA uses for the harbor and the sounds north of it.',
  body: (h) => {
    const s = h.st('florida/clearwater-beach');
    return `
<h2>Gulf sand in front, Clearwater Harbor behind</h2>
<p>${h.ft(s.stats.meanRange)} of daily range on the Gulf face of Clearwater Beach is generous for Florida's west coast, and the beach is wide and gently sloped, so an ordinary falling tide uncovers a long band of firm sand. Behind the island, across the Memorial Causeway, Clearwater Harbor lags. NOAA predicts the Clearwater waterfront from this beach station with high water 28 minutes later and low water 50 minutes later, low-water heights scaled to three quarters. The harbor's shallow edges drain less completely than the open shore.</p>
<h2>St. Joseph Sound and Honeymoon Island</h2>
<p>To the north the barrier chain continues to Caladesi and Honeymoon islands, with St. Joseph Sound between them and the mainland. The sound behaves almost like the beach in height but trails in time. Dunedin is computed 26 minutes behind Clearwater Beach at high water, Honeymoon Island 28 minutes behind with heights 8 percent greater, and Ozona, farther up the sound, only 8 minutes behind. Kayakers crossing to the islands from Dunedin can read this page and add about half an hour.</p>
<h2>South to Indian Rocks: inside or outside</h2>
<p>NOAA lists two stations at Indian Rocks Beach, and they make a useful lesson. The coastal one, on the Gulf, turns 17 minutes ahead of Clearwater Beach. The inside one, on the Narrows behind the island, turns 79 minutes after it, with a smaller fall at low water. Same town, more than an hour and a half apart. If a ramp or dock sits on the intracoastal side, it belongs to the inside station.</p>
<p>The winter months bring the deepest predicted low of the period, ${h.ft(s.stats.minLow.h)} on ${h.date(s.stats.minLow.date)}, and a north wind behind a front can drain the flats further. The ${h.a('negative-low-tides', 'negative low tide guide')} covers what that exposes.</p>`;
  },
  faqs: [
    { q: 'How far behind Clearwater Beach is the tide in Clearwater Harbor?', a: 'Around half an hour at high water and close to an hour at low water. NOAA predicts the Clearwater waterfront from the Clearwater Beach gauge with high tide 28 minutes later and low tide 50 minutes later, and the low does not drop as far as on the Gulf side. Dunedin and Honeymoon Island, on St. Joseph Sound, trail the beach by a similar half hour.' },
  ],
});
