import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const keys = K.inState('alaska').map((s) => s.key);
const e = K.extremesOf(keys);
const an = K.st('alaska/anchorage'), ho = K.st('alaska/homer'), ju = K.st('alaska/juneau'), sw = K.st('alaska/seward');

export default defineState({
  state: 'alaska',
  title: 'Alaska Tides 2026: Anchorage, Homer, Seward and Juneau',
  description: 'Alaska tides today: tide charts for Anchorage, Homer, Seward and Juneau, with 7-day high and low tide times, minus tides, moon and solunar periods. 2026.',
  intro: 'Four gauges from the head of Cook Inlet to the Inside Passage, with the largest tides in the United States.',
  resume: `${K.ft(e.max.stats.meanRange)} on an average day at ${e.max.place}, and ${K.ft(e.min.stats.meanRange)} at ${e.min.place}: even the smallest tide among the Alaska stations on this site outranks almost every lower 48 gauge listed here. Anchorage, at the head of Cook Inlet, reaches ${K.ft(an.stats.springRange)} on spring tides. Homer, near the mouth of the same inlet, averages ${K.ft(ho.stats.meanRange)}, and Juneau, deep in the Inside Passage, ${K.ft(ju.stats.meanRange)}. Seward faces the Gulf of Alaska from Resurrection Bay and gets the open-ocean figure. The tide is semidiurnal at most of these gauges and mixed at ${K.listOf(keys.map(K.st).filter((s) => s.stats.tideType === 'mixed').map((s) => s.place))}: two highs and two lows a day, one pair clearly stronger than the other. Inside the inlet the water rises and falls several feet an hour on big days, and the mudflats left at low water are deadly. Pick a station in the tool above for today's curve, or open its page for seven days, extremes and a planner.`,
  featured: 'alaska/anchorage',
  body: (h) => `
<h2>Cook Inlet, a funnel for the Pacific tide</h2>
<p>Cook Inlet runs nearly two hundred miles northeast from the Gulf of Alaska and narrows and shoals toward its head. The tide wave entering it is squeezed into less and less space and close to resonance with the inlet's length, so it climbs from ${h.ft(ho.stats.meanRange)} at ${h.a('st:alaska/homer', 'Homer')} to ${h.ft(an.stats.meanRange)} at ${h.a('st:alaska/anchorage', 'Anchorage')}. Only the Bay of Fundy in Canada has a larger tide in North America. The highest predicted high of the period at Anchorage is ${h.ft(an.stats.maxHigh.h)}, on ${h.date(an.stats.maxHigh.date)}, and the deepest low ${h.ft(an.stats.minLow.h)}, on ${h.date(an.stats.minLow.date)}. Ice in winter, glacial silt year round and currents of several knots make upper inlet waters some of the hardest on the coast.</p>
<h2>Flats that trap, and a wave that runs</h2>
<p>Knik Arm and Turnagain Arm empty to grey silt at low tide. That silt can turn to quicksand under a boot and grip a leg until the flood returns, which here comes faster than a person can wade. Never walk out on Cook Inlet flats. On the largest tides around new and full moon, the incoming water also forms a bore in Turnagain Arm, a low wave front that travels up the arm after low water. Watch it from the road, not from the mud.</p>
<h2>Kachemak Bay and the summer minus tides</h2>
<p>At the lower end of the inlet the tide is smaller but still large, and its deep lows draw people to the shore. The lowest predicted water at Homer, ${h.ft(ho.stats.minLow.h)}, comes on ${h.when('alaska/homer', ho.stats.minLow.t)}, a summer morning with long daylight ahead. Rocky shores across Kachemak Bay and the beaches of the Homer Spit expose wide intertidal zones then. The ${h.a('negative-low-tides', 'negative low tide guide')} has the deepest days for every station.</p>
<h2>The Inside Passage and the Gulf coast</h2>
<p>In Southeast Alaska, the tide moves through a maze of deep fjords, straits and channels between hundreds of islands. ${h.a('st:alaska/juneau', 'Juneau')}, on Gastineau Channel, averages ${h.ft(ju.stats.meanRange)} and reaches ${h.ft(ju.stats.springRange)} on spring tides, enough to turn harbor ramps and the gangways down to the floats steep at low water. ${h.a('st:alaska/seward', 'Seward')}, on the open Gulf side of the Kenai Peninsula, sees ${h.ft(sw.stats.meanRange)}. North and west, the picture changes again: Bristol Bay has big tides, while the Arctic coast has very small ones. For launch timing, the ${h.a('boat-ramp-tide-planner', 'boat ramp planner')} works at any of these stations.</p>`,
  faqs: [
    { q: 'How big are the tides in Anchorage, Alaska?', a: 'Very big. Anchorage averages about twenty-eight feet between low and high on a typical day, and spring tides go past thirty feet. Only the Bay of Fundy in Canada has a larger tide in North America. On big days the water can rise several feet in an hour, and the mudflats exposed at low tide are dangerous to walk on.' },
    { q: 'Why are the Cook Inlet mudflats in Alaska dangerous?', a: 'The glacial silt that covers the flats of Knik Arm and Turnagain Arm can liquefy under weight and hold a foot or leg firmly. The incoming tide in Cook Inlet is fast and large, so anyone stuck can be overtaken by water within minutes. People have died this way. Stay off the flats entirely, whatever the time of the tide.' },
    { q: 'Are tides smaller in Southeast Alaska than in Cook Inlet?', a: 'Yes, though still large. Juneau, in the Inside Passage, averages around sixteen feet between low and high and passes twenty on spring tides, against about twenty-eight feet at Anchorage. Seward, facing the Gulf of Alaska, averages around ten and a half. The narrowing shape of Cook Inlet is what pushes its tide so far above the rest.' },
  ],
});
