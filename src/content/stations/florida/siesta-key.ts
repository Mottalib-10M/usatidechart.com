import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'florida/siesta-key',
  intro: 'The Siesta Key station sits on Big Sarasota Pass, the inlet between the north tip of Siesta Key and Lido Key that links Sarasota Bay to the Gulf.',
  body: (h) => {
    const s = h.st('florida/siesta-key');
    return `
<h2>Reading a pass instead of a beach</h2>
<p>${h.ft(s.stats.meanRange)} is the typical day's spread at Big Sarasota Pass, measured where bay water and Gulf water trade places twice a day. The pass is the hinge of the local system: everything that fills the southern half of Sarasota Bay comes in here or through the smaller openings, so the gauge sees both the Gulf pulse and the bay's answer to it. The quartz-white sand of Siesta Beach lies a short way south along the Gulf shore, the nearest open beach to this gauge. The pair of highs is often lopsided, and on ${Math.round(s.stats.oneHighShare * 100)}% of days one of them fades out entirely, leaving a single high.</p>
<h2>Sarasota Bay runs ahead of St. Petersburg</h2>
<p>NOAA's secondary stations around the bay are not tied to this pass; they hang off St. Petersburg, far up Tampa Bay. That produces corrections that look odd at first. Sarasota Bay at the city waterfront is predicted 98 minutes before St. Petersburg at high water, Hayden Roberts Bay, just east of the pass, 103 minutes before, and the Longboat Key station 90 minutes before, all with heights near nine tenths of the reference. Those negative minutes mean nothing more than that St. Petersburg is a long way inside a large bay and turns late; the Gulf coast here turns first.</p>
<p>For anyone launching from the bay side of the key, the practical rule is simple: the times on this page and those of the nearby bay stations sit close together, and both run well ahead of ${h.a('st:florida/st-petersburg', 'St. Petersburg')}.</p>
<h2>Currents in the pass</h2>
<p>A pass concentrates flow. In the middle hours of a rising or falling tide the water through Big Sarasota Pass moves fast, and it is slowest near the turn. Wind against the current makes it choppy. The predictions here are heights, not currents, and they are not for navigation; a south wind or a passing front can shift both the level and the timing.</p>`;
  },
  faqs: [
    { q: 'Why are Sarasota Bay tides near Siesta Key listed as earlier than St. Petersburg?', a: 'Because NOAA computes the Sarasota Bay stations from St. Petersburg, which lies deep inside Tampa Bay and reaches high water late. The bay waterfront, Hayden Roberts Bay and Longboat Key all come out roughly an hour and a half ahead of it. The Gulf tide reaches Siesta Key first, so those early times are normal, not an error.' },
  ],
});
