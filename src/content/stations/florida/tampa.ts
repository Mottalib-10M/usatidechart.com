import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'florida/tampa',
  intro: 'Old Port Tampa, on the Interbay peninsula at the edge of Old Tampa Bay, is the reference gauge for the upper arms of Tampa Bay.',
  body: (h) => {
    const s = h.st('florida/tampa');
    return `
<h2>The tide grows on its way up the bay</h2>
<p>At Old Port Tampa the water rises and falls ${h.ft(s.stats.meanRange)} on an average day, more than at ${h.a('st:florida/st-petersburg', 'St. Petersburg')} closer to the mouth. That is the opposite of what many people expect. Tampa Bay is long and funnel-shaped, and as the tide wave travels north into Old Tampa Bay and Hillsborough Bay it is squeezed and builds a little height. NOAA's corrections show it: the Gandy Bridge, just north of this station, is predicted from St. Petersburg with high water 59 minutes later and heights multiplied by 1.12, and Davis Island in Hillsborough Bay gets a factor of 1.16.</p>
<p>Gadsden Point, at the southern tip of the peninsula, is computed from Old Port Tampa itself, turning 39 minutes earlier at high water. Points a few miles apart on this bay can keep noticeably different hours, so pick the station closest to your shoreline.</p>
<h2>Summer highs in a bay city</h2>
<p>The tallest prediction here for the period, ${h.ft(s.stats.maxHigh.h)}, falls on ${h.date(s.stats.maxHigh.date)}, in the middle of summer, while the lowest water arrives in winter. On the bay's low shorelines the difference matters: summer high tides wet the edges of seawalls and mangrove fringes, and winter lows expose broad mud and seagrass flats along the Interbay shore.</p>
<h2>A shallow bay under the wind</h2>
<p>Away from its dredged shipping channels Tampa Bay is shallow, so the wind moves it readily. A long southwest blow piles water into the upper bay; a strong north wind after a cold front sends it out, and boat ramps on the flats can sit lower than any table predicts. Tropical storms are the extreme case, which is why the region watches surge forecasts closely. Use these tides as the baseline, and adjust for the forecast before launching or wading.</p>`;
  },
  faqs: [
    { q: 'Why is the tide range bigger in Tampa than at the mouth of Tampa Bay?', a: 'Tampa Bay narrows and shoals toward its northern arms, and the tide wave piles up as it travels into that funnel. NOAA reflects this by scaling stations such as the Gandy Bridge and Davis Island above the St. Petersburg reference, by more than a tenth. Old Port Tampa, on Old Tampa Bay, therefore swings a little more than the stations nearer the Gulf.' },
  ],
});
