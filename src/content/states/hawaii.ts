import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const keys = K.inState('hawaii').map((s) => s.key);
const e = K.extremesOf(keys);
const ho = K.st('hawaii/honolulu');

export default defineState({
  state: 'hawaii',
  title: 'Hawaii Tides 2026: Honolulu, Maui, Hilo and Kona Charts',
  description: 'Hawaii tides today: tide charts for Honolulu, Kahului, Hilo and Kailua-Kona, with 7-day high and low tide times, tide coefficient and solunar periods. 2026.',
  intro: 'Four stations on three islands, with a small mixed tide that still decides how much reef shows.',
  resume: `Hawaii's tide is small and mixed: two highs and two lows most days, of unequal size, with an average daily range between ${K.ft(e.min.stats.meanRange)} at ${e.min.place} and ${K.ft(e.max.stats.meanRange)} at ${e.max.place}. The islands sit in the open Pacific, far from the continental shelves and long bays that amplify the tide elsewhere, so the water rises and falls only a foot or two. The highs of a day often differ by about a foot at ${ho.place}, and on some days one of them almost disappears. Hawaii also keeps standard time all year, so the times do not jump in March and November. Pick a station in the tool above for today's curve, or open its page for seven days, the extremes and a planner. On reef-fringed shores, those few feet decide whether a reef flat is covered or awash.`,
  featured: 'hawaii/honolulu',
  body: (h) => `
<h2>Why the tide is so small in the islands</h2>
<p>Large tides need help from the coast: a wide shelf, a funnel-shaped bay or a basin that resonates. Hawaii has none of these. The islands rise steeply from deep water, and the tide passing them is the open-ocean tide of the central Pacific, about two feet. That is why ${h.a('st:hawaii/honolulu', 'Honolulu')} moves less in a day than many East Coast harbors move in an hour of a spring tide. The ${h.a('tide-range', 'tide range guide')} explains what makes the big ones.</p>
<h2>Reef, swell and the tide</h2>
<p>On a coast of shallow reef, a foot of water changes what you can do. At a low tide, the reef flats of the south shore come within inches of the surface, and paddling or walking over them gets awkward and damages coral; at a high tide, there is room to swim. Snorkel entries over lava ledges, as on the Kona coast, are easier with a little more water. But the swell decides safety: a south swell in summer or a north swell in winter can wash over benches and reefs at any stage of the tide.</p>
<h2>Island by island</h2>
<p>NOAA uses ${h.a('st:hawaii/hilo', 'Hilo')} as the reference for the Island of Hawaii, predicting ${h.a('st:hawaii/kailua-kona', 'Kailua-Kona')} from it with a correction of under forty minutes. On Maui, ${h.a('st:hawaii/kahului', 'Kahului')} predicts the south shore at Kihei with high water almost two hours later. On Oahu, Honolulu serves the south shore and Hanauma Bay, with its own small corrections.</p>`,
  faqs: [
    { q: 'How big are the tides in Hawaii?', a: 'Small: on an average day the water moves between about two and two and a half feet from the lower low to the higher high, depending on the island. The tide is mixed, with one high noticeably bigger than the other. Swell and wind change the shoreline far more than the tide on most days.' },
    { q: 'Do Hawaii tide times change with daylight saving time?', a: 'No. Hawaii stays on Hawaii-Aleutian Standard Time all year, so the station pages show the same clock offset in every season. Tides still come about fifty minutes later each day, as everywhere, because they follow the moon. Visitors arriving from the mainland in summer should simply read the times as printed, in local Hawaii time.' },
    { q: 'Is low tide a good time to explore the reef in Hawaii?', a: 'It exposes more of the reef flat, but walking on live coral damages it and the flats are slippery and sharp. Low tide is good for viewing tide pools from the edge; for snorkeling, many people prefer a mid or high tide, with more water over the coral. Check the swell before going in.' },
  ],
});
