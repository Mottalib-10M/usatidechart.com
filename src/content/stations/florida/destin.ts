import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'florida/destin',
  intro: 'The Destin times come from East Pass, the inlet between Destin and Okaloosa Island where Choctawhatchee Bay meets the Gulf, predicted by NOAA from Pensacola.',
  body: (h) => {
    const s = h.st('florida/destin');
    return `
<h2>Inches, not feet, at East Pass</h2>
<p>${h.ft(s.stats.meanRange)} is all the tide East Pass musters on an average day, among the smallest ranges on this site. NOAA does not run a full prediction here: it takes Pensacola, moves high water 33 minutes earlier and low water 34 minutes earlier, then scales the high heights by about half and the lows by a third. On the livelier days of the month the swing still reaches only about ${h.ft(s.stats.springRange)}. A swimmer at the jetties would struggle to see the difference between a high and a low without a fixed mark on a piling.</p>
<h2>Choctawhatchee Bay keeps its own slow time</h2>
<p>Behind the pass, Choctawhatchee Bay is large, and East Pass is its main opening to the Gulf. The tide that squeezes through spreads out across that wide basin and arrives very late at the far shores. NOAA predicts Shalimar, on Garnier Bayou at the bay's northwest corner, from Pensacola with high water 213 minutes later and heights at about a third. NOAA keeps further stations in the bay at Rocky Bayou, Valparaiso and Driftwood Point for anyone working those shores. In practice a captain leaving a bayou dock can see the pass already falling while the bay is still creeping up.</p>
<h2>What really changes the water level</h2>
<p>With a tide this weak, wind and pressure regularly overrule the moon. A few days of southerly wind push Gulf water through the pass and raise the bay; a strong northerly after a winter front blows it out, and shoals near the inlet can show more than the prediction implies. Rain swelling the rivers that feed the bay adds to the level too. The predicted figures here are a gentle baseline; for the current through the pass, which can run hard in the narrows, rely on official current predictions and local conditions, since none of this is for navigation. The ${h.a('st:florida/pensacola-beach', 'Pensacola Beach')} page shows the reference tide at full size.</p>`;
  },
  faqs: [
    { q: 'Does Destin have a noticeable tide?', a: 'Barely. East Pass at Destin averages well under a foot between low and high, and even its strongest days bring only about a foot. NOAA derives it from Pensacola with half the high-water height and a third of the low. On many days the wind changes the level of the harbor and Choctawhatchee Bay more than the tide does.' },
  ],
});
