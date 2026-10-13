import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const keys = K.inState('florida').map((s) => s.key);
const e = K.extremesOf(keys);
const jb = K.st('florida/jacksonville-beach'), mi = K.st('florida/miami'), tp = K.st('florida/tampa'), pb = K.st('florida/pensacola-beach');

export default defineState({
  state: 'florida',
  title: 'Florida Tides 2026: Tide Charts for 16 Beaches and Harbors',
  description: 'Florida tides today: tide charts for Miami, Key West, Tampa, Clearwater, Destin, Daytona, Jacksonville and more, with 7-day high and low tide times. 2026.',
  intro: 'Sixteen stations and all three kinds of tide: semidiurnal on the Atlantic, mixed on the southwest Gulf coast, diurnal in the Panhandle.',
  resume: `Florida is the only state with all three kinds of tide. The Atlantic coast has a semidiurnal tide, two highs and two lows of similar size, that shrinks from north to south: ${K.ft(jb.stats.meanRange)} on an average day at Jacksonville Beach, ${K.ft(mi.stats.meanRange)} in Miami. The Keys and the Gulf coast from Naples to Tampa Bay have a mixed tide with unequal highs, ${K.ft(tp.stats.meanRange)} at Old Port Tampa. The Panhandle, from Apalachicola west to Pensacola, has a mostly diurnal tide, often a single high and low a day, ${K.ft(pb.stats.meanRange)} at Pensacola Beach. Across the sixteen stations on this site, ${e.max.place} has the largest average range, ${K.ft(e.max.stats.meanRange)}, and ${e.min.place} the smallest, ${K.ft(e.min.stats.meanRange)}. Pick a station in the tool above, or open its page for seven days, the extreme tides and a planner.`,
  featured: 'florida/miami',
  body: (h) => `
<h2>Why Florida has three tides</h2>
<p>The peninsula separates two oceans of different behavior. On the Atlantic side, the twice-daily lunar tide dominates, and it is largest in the north, where ${h.a('st:florida/jacksonville-beach', 'Jacksonville Beach')} shares the amplified tide of the Georgia Bight, and smallest in the south, where the shelf is narrow and the Gulf Stream runs close to ${h.a('st:florida/miami', 'Miami')}. In the Gulf of Mexico, a basin whose shape favors the once-daily tide, the diurnal constituents take over toward the Panhandle; on the southwest coast, both kinds mix. The ${h.a('tide-range', 'tide range guide')} explains the physics.</p>
<h2>Lagoons, bays and passes</h2>
<p>Much of Florida's shoreline is a barrier island with a lagoon or bay behind it, and the tide inside is smaller and later than on the beach. The Indian River and Banana River lagoons on the Space Coast barely move; Tampa Bay, Charlotte Harbor and Biscayne Bay have their own lags of an hour or more. Passes and inlets, such as Destin's East Pass or Big Sarasota Pass at ${h.a('st:florida/siesta-key', 'Siesta Key')}, carry strong currents on small tides.</p>
<h2>King tides in South Florida</h2>
<p>From Palm Beach to Miami and in the Keys, the highest tides of the year often come in early autumn, when the astronomical tide peaks while seasonal sea level is high. Low streets in Miami Beach, Fort Lauderdale and Key West then take water through storm drains even on sunny days. The ${h.a('king-tides', 'king tides guide')} lists how to find those dates.</p>
<h2>Wind on the Gulf coast</h2>
<p>Where the tide is only one or two feet, as on the Panhandle and around ${h.a('st:florida/destin', 'Destin')}, a strong north wind behind a winter cold front can lower the water by as much as the tide does, and a south wind can raise it. Predictions carry no weather.</p>`,
  faqs: [
    { q: 'Why does Florida have different tides on each coast?', a: 'The Atlantic coast is dominated by the twice-daily lunar tide, giving two similar highs a day. The Gulf of Mexico favors the once-daily tide, so the Panhandle often has a single high and low, and the southwest coast mixes both kinds with unequal highs. Florida is the only state with all three tide types.' },
    { q: 'Where is the biggest tide in Florida?', a: 'In the northeast, near Jacksonville and St. Augustine, where the average range is over five feet, because the coast shares the amplified tide of the Georgia Bight. The tide shrinks to around two and a half feet in Miami and to under a foot at some Panhandle passes such as Destin.' },
    { q: 'When are king tides in Florida?', a: 'In South Florida the highest tides of the year usually fall in early autumn, roughly September to November, when large astronomical tides meet the seasonal high in sea level. On the Gulf coast the dates differ from station to station, so check each station page, which lists its six highest predicted tides of the period.' },
  ],
});
