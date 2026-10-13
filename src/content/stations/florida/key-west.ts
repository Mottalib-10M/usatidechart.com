import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'florida/key-west',
  intro: 'The Key West gauge, at the far end of the Overseas Highway, is the reference tide station for the lower Keys, where the Atlantic and the Gulf of Mexico meet.',
  body: (h) => {
    const s = h.st('florida/key-west');
    return `
<h2>An island with two shores and two clocks</h2>
<p>${h.ft(s.stats.meanRange)} is the average daily swing at the Key West station, and the two highs of a day rarely match: the taller one beats the other by ${h.ft(s.stats.highInequality)} on average. Key West has kept a tide record for more than a century, which is why the Keys are predicted from it. The island is small, yet its shores do not turn together. On the Atlantic side, NOAA predicts the White Street Pier from the Key West station with high water 53 minutes sooner and heights about 7 percent greater, so the south-facing beaches crest first.</p>
<p>The north side behaves differently. Garrison Bight and the Sigsbee Park channel sit behind the island, and NOAA gives Sigsbee Park a high almost two hours after the reference, at roughly four fifths of its height. A morning that looks like slack water at the harbor may still be filling in the bight.</p>
<h2>Channels toward Stock Island and Boca Chica</h2>
<p>East of town, the water squeezes through the gaps between the keys. Cow Key Channel peaks 115 minutes after Key West, the Key Haven to Stock Island channel 145 minutes after, and the Boca Chica Channel Bridge 83 minutes after, each with a range cut to between a half and three quarters of the reference. Those cuts drain shallow flats on both sides, so the delay grows the farther a spot sits from open water. Anyone poling a flat or wading out from the shoreline should take the correction for the nearest channel, not the harbor figure shown at the top of this page.</p>
<p>Wind also has a say here. A steady breeze from one quarter for several days can hold water on the flats or push it off them, and the prediction does not know about it. The ${h.a('tide-range', 'tide range guide')} explains why a small ocean range shrinks again inside a maze of keys.</p>`;
  },
  faqs: [
    { q: 'Does the tide turn at the same time all around Key West?', a: 'No. NOAA predicts the White Street Pier on the Atlantic shore with high water close to an hour before the Key West reference, while Garrison Bight and the Sigsbee Park channel on the north side peak about two hours after it. The channels toward Stock Island lag even more and carry a smaller range, so the time depends on which shore you stand on.' },
  ],
});
