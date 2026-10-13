import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const ny = K.st('new-york/new-york-city'), jb = K.st('new-york/jones-beach'), mt = K.st('new-york/montauk');

export default defineState({
  state: 'new-york',
  title: 'New York Tides 2026: NYC, Jones Beach and Montauk Charts',
  description: 'New York tides today: tide charts for New York City, Jones Beach and Montauk, with 7-day high and low tide times, tide coefficient and solunar periods. 2026.',
  intro: 'Three stations from the Battery to the tip of Long Island, on three different waters.',
  resume: `New York's coast meets three tidal systems: New York Harbor, the Atlantic beaches of Long Island's south shore, and Long Island Sound to the north. The tide is semidiurnal everywhere, two highs and two lows a day, but its size changes: ${K.ft(ny.stats.meanRange)} on an average day at the Battery in Manhattan, ${K.ft(jb.stats.meanRange)} at Jones Inlet on the south shore, and only ${K.ft(mt.stats.meanRange)} at Montauk, at the eastern tip, near where the tide wave divides between the ocean and the sounds. Pick a station in the tool above for today's curve and times, or open its page for seven days, the extreme tides and a planner. Behind the barrier beaches of the south shore, in the bays of Hempstead, Great South Bay and Shinnecock, the tide is smaller and later than on the ocean, because it enters through a handful of inlets.`,
  featured: 'new-york/new-york-city',
  body: (h) => `
<h2>The harbor and its two entrances</h2>
<p>New York Harbor receives the Atlantic tide through the Narrows and the Long Island Sound tide through the East River, and the two do not match in timing or height. That mismatch drives the strong, reversing currents of the East River and Hell Gate. NOAA predicts dozens of harbor points from the ${h.a('st:new-york/new-york-city', 'Battery')}: Brooklyn's Gowanus Bay a quarter of an hour ahead, East 41st Street about an hour behind.</p>
<h2>South shore: ocean beaches and quiet bays</h2>
<p>The south shore of Long Island is a chain of barrier beaches, Long Beach, ${h.a('st:new-york/jones-beach', 'Jones Beach')}, Fire Island, Westhampton, broken by inlets. On the ocean side the tide is a full Atlantic tide of four to five feet. Inside, in Hempstead Bay and Great South Bay, it shrinks and lags: NOAA predicts some back-bay points from Sandy Hook with half the height and an hour of delay. Clammers, crabbers and kayakers on the bays should read those stations rather than the beach.</p>
<h2>Montauk and the East End</h2>
<p>At ${h.a('st:new-york/montauk', 'Montauk')}, the tide is small but the currents around the Point are strong, which is part of what makes the surfcasting famous. Gardiners Bay and Peconic Bay, between the North and South forks, have their own small, late tides.</p>
<h2>Storm tides</h2>
<p>New York learned in 2012 that a storm surge on top of a high tide can flood subways and streets. Predictions carry no weather; during storms, NOAA's observed water levels and the National Weather Service forecasts are the reference.</p>`,
  faqs: [
    { q: 'Is the tide the same at Jones Beach and in Great South Bay?', a: 'No. The ocean beaches have a full Atlantic tide of four to five feet, while the bays behind the barrier islands receive water only through a few inlets, so their tide is smaller and later. NOAA predicts some Hempstead Bay points with half the ocean’s height and about an hour of delay.' },
    { q: 'Why are the currents so strong in the East River in New York?', a: 'Because the East River connects two tides that do not match: New York Harbor and Long Island Sound reach high water at different times and heights. The difference in level between the two ends pushes water hard through the channel, especially at Hell Gate, and the current reverses with the tide.' },
    { q: 'Which New York station has the biggest tide?', a: 'Among the three on this site, the Battery in Manhattan, close to five feet on an average day, followed by Jones Inlet on the south shore. Montauk has the smallest, under two and a half feet. In western Long Island Sound, on the north shore, ranges approach seven to eight feet.' },
  ],
});
