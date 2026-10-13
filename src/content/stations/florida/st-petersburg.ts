import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'florida/st-petersburg',
  intro: 'The St. Petersburg gauge stands on the downtown waterfront facing Tampa Bay, and NOAA uses it as the base for dozens of predictions along the west coast of Florida.',
  body: (h) => {
    const s = h.st('florida/st-petersburg');
    return `
<h2>Bay waterfront versus the Pinellas beaches</h2>
<p>The downtown gauge averages ${h.ft(s.stats.meanRange)} between the higher high and the lower low, but the beaches most visitors mean by St. Pete are on the other side of the peninsula, on the Gulf. Their tide arrives first. NOAA predicts Pass-a-Grille Beach from this station with high water 94 minutes earlier and heights at 87 percent, and Gulfport, on Boca Ciega Bay, 92 minutes earlier. Long Key, by the Corey Causeway, comes out 78 minutes ahead. So when the table above shows a high downtown at noon, the sand at St. Pete Beach has already been falling for more than an hour.</p>
<h2>Why so many stations lean on this one</h2>
<p>St. Petersburg has a long, well-kept record, which makes it a convenient anchor for secondary stations from Sarasota Bay down to the lower Caloosahatchee. Point Pinellas, at the southern tip of the peninsula, is computed 22 minutes ahead of it; stations on Old Tampa Bay come out later and taller. The reference sits roughly midway along that progression: the open Gulf leads, the upper bay trails.</p>
<p>The tide pattern itself is mixed and frequently unbalanced. On ${Math.round(s.stats.oneHighShare * 100)}% of days only one high shows up, the second one shrinking to a mere pause in the falling water. Fishing the seawalls and piers downtown, many anglers simply watch for the larger of the two daily movements; the ${h.a('fishing-tides', 'fishing tides guide')} explains what moving water does along structure.</p>
<h2>A city waterfront that floods from the bay</h2>
<p>The highest prediction of the period, ${h.ft(s.stats.maxHigh.h)} on ${h.date(s.stats.maxHigh.date)}, arrives in summer. Low parts of the waterfront can take water when a high tide meets a persistent onshore wind or a tropical system, and the predicted heights carry no weather at all. Treat them as the floor of what the bay might do, not the ceiling, and nothing here is for navigation.</p>`;
  },
  faqs: [
    { q: 'Is high tide at St. Pete Beach earlier than in downtown St. Petersburg?', a: 'Yes, by roughly an hour and a half. The beaches face the Gulf, and NOAA predicts Pass-a-Grille Beach from the downtown St. Petersburg station with high water 94 minutes earlier and lows 90 minutes earlier. The tide reaches the downtown waterfront only after travelling up Tampa Bay, so subtract that time from the downtown table when planning on the beach.' },
  ],
});
