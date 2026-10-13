import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const du = K.st('north-carolina/duck'), oi = K.st('north-carolina/oregon-inlet'), wb = K.st('north-carolina/wrightsville-beach');

export default defineState({
  state: 'north-carolina',
  title: 'North Carolina Tides 2026: Outer Banks to Wrightsville Beach',
  description: 'North Carolina tides today: tide charts for Duck, Nags Head, Oregon Inlet, Hatteras, Beaufort and Wrightsville Beach, with 7-day high and low times. 2026.',
  intro: 'Six stations along the Outer Banks and the southern coast, where a modest ocean tide meets sounds that barely have one.',
  resume: `North Carolina's ocean beaches have a semidiurnal tide, two highs and two lows a day, of three to four and a half feet on an average day: ${K.ft(du.stats.meanRange)} at the Duck pier on the northern Outer Banks, ${K.ft(wb.stats.meanRange)} at Wrightsville Beach in the south, where the coast curves into Onslow and Long bays. Behind the barrier islands, the great sounds, Currituck, Albemarle, Pamlico and Core, receive the ocean tide only through a few inlets and keep almost none of it: the Oregon Inlet marina, inside the inlet, averages ${K.ft(oi.stats.meanRange)}, and deep in Pamlico Sound the lunar tide fades to inches while the wind takes over. Pick a station in the tool above for today's curve and times, or open its page for seven days, extremes and a planner.`,
  featured: 'north-carolina/nags-head',
  body: (h) => `
<h2>Ocean side and sound side</h2>
<p>On the Outer Banks, every visitor lives between two waters. The ocean beach at ${h.a('st:north-carolina/duck', 'Duck')} or ${h.a('st:north-carolina/nags-head', 'Nags Head')} rises and falls a few feet twice a day; the sound a few hundred yards west moves with the wind. A southwest wind can pile water against the Banks' sound shore and flood the road, while a northeast wind pushes it away, and the change can be larger than the ocean's tide. The ${h.a('outer-banks', 'Outer Banks comparison')} draws the ocean and inlet stations side by side.</p>
<h2>Inlets that shift</h2>
<p>Oregon Inlet, Hatteras Inlet and Ocracoke Inlet are the gaps through which the sounds breathe. Their channels move with every storm and their currents run hard, especially on the ebb. ${h.a('st:north-carolina/oregon-inlet', 'Oregon Inlet')}'s marina station shows how much tide is lost inside: about a quarter of the ocean's range.</p>
<h2>The southern coast</h2>
<p>South of Cape Lookout the coast faces south, toward a wider shelf, and the tide grows: ${h.a('st:north-carolina/beaufort', 'Beaufort')} near Morehead City, then Wrightsville Beach, then the Cape Fear and Brunswick beaches near South Carolina. Behind them, the Intracoastal Waterway and the Cape Fear River run late; Wilmington, up the river, turns hours after the beach.</p>
<h2>Fishing the piers and the points</h2>
<p>North Carolina's ocean piers and capes are surf-fishing landmarks, and anglers there read the tide for moving water rather than for height. The first hours of the incoming tide push bait over the outer bar toward the piers, and the points at Cape Hatteras and Cape Lookout concentrate currents where the shoals meet deeper water. The ${h.a('fishing-tides', 'fishing tides guide')} explains why the middle of a tide moves the most water, and the ${h.a('solunar-tables', 'solunar tables')} add the moon's periods.</p>`,
  faqs: [
    { q: 'Do the North Carolina sounds have tides?', a: 'Barely. Currituck, Albemarle and Pamlico sounds connect to the ocean only through a few narrow inlets, so most of the lunar tide never reaches them; near the inlets there is a small tide, and deep in the sounds it fades to inches. Wind changes the sound level far more, and can raise or lower it by a foot or more in a day.' },
    { q: 'Is the tide bigger on the southern North Carolina coast?', a: 'Yes. The northern Outer Banks average about three and a half feet between low and high, while Wrightsville Beach averages over four feet, because the southern coast faces a wider continental shelf in Onslow and Long bays that amplifies the Atlantic tide.' },
    { q: 'Which tide station should I use for the Outer Banks?', a: 'For ocean beaches from Corolla to Nags Head, Duck or Nags Head; for Hatteras Island, the Cape Hatteras pier station; for boats at Oregon Inlet, the marina station, which is inside the inlet and has a much smaller tide. The sound side follows the wind more than any station.' },
  ],
});
