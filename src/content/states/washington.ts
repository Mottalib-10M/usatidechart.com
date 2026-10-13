import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const keys = K.inState('washington').map((s) => s.key);
const e = K.extremesOf(keys);
const se = K.st('washington/seattle'), pt = K.st('washington/port-townsend'), wp = K.st('washington/westport');

export default defineState({
  state: 'washington',
  title: 'Washington Tides 2026: Seattle, Port Townsend and Westport',
  description: 'Washington tides today: tide charts for Seattle, Port Townsend and Westport, with 7-day high and low tide times, minus tides and solunar periods. 2026.',
  intro: 'Three gauges for two very different waters: the inland sea of Puget Sound and the open Pacific at Grays Harbor.',
  resume: `${K.ft(e.max.stats.meanRange)} on an average day at ${e.max.place}, against ${K.ft(wp.stats.meanRange)} at Westport on the ocean and ${K.ft(e.min.stats.meanRange)} at ${e.min.place}: in Washington the tide grows as it moves inland, away from the ocean. The Pacific tide enters the Strait of Juan de Fuca, turns south through Admiralty Inlet past Port Townsend, and swells inside Puget Sound, where spring tides at Seattle reach ${K.ft(se.stats.springRange)}. It is a mixed tide, ${K.typeWords('washington/seattle')}, and on days with two lows, Seattle's differ by ${K.ft(se.stats.lowInequality)} on average. That gap produces the deep minus tides of the Sound, which fall near midday in late spring and summer and close to midnight in winter. On the outer coast, Grays Harbor and Willapa Bay drain to wide flats on every lower low. Pick a station in the tool above for today's curve, or open its page for seven days, extremes and a planner.`,
  featured: 'washington/seattle',
  body: (h) => `
<h2>Why Puget Sound amplifies the tide</h2>
<p>Puget Sound is a set of deep, glacier-cut basins joined to the ocean through a long strait and a narrow sill at Admiralty Inlet. The tide wave reflects off the closed southern end and builds on itself, so the range keeps increasing from the entrance toward the inlets around Olympia. ${h.a('st:washington/port-townsend', 'Port Townsend')}, at the doorway, averages ${h.ft(pt.stats.meanRange)}; ${h.a('st:washington/seattle', 'Seattle')}, partway down the main basin, averages ${h.ft(se.stats.meanRange)}; the south Sound sees more still. Hood Canal, a separate fjord on the west side, has its own large tide that runs later. Across the central Sound, times and heights stay within a few minutes and a few percent of each other, which is why NOAA predicts many shores around Elliott Bay, Bainbridge and Vashon straight from Seattle.</p>
<h2>Noon lows in summer, midnight lows in winter</h2>
<p>The lower low of each day drifts around the clock through the year. In Washington, the strongest minus tides of late spring and summer arrive in the late morning or around midday, perfect for beach walks and tide pools. In winter the same deep lows come in the dark. The calendar here shows it: the lowest predicted water at Seattle, ${h.ft(se.stats.minLow.h)}, comes on ${h.when('washington/seattle', se.stats.minLow.t)}, while Port Townsend's deepest, ${h.ft(pt.stats.minLow.h)}, falls on ${h.when('washington/port-townsend', pt.stats.minLow.t)}. The ${h.a('beach-walk-planner', 'low tide beach planner')} picks the daylight hours for any level you choose, and the ${h.a('negative-low-tides', 'negative low tide guide')} covers why the lows drop below zero.</p>
<h2>Grays Harbor, Willapa Bay and the ocean beaches</h2>
<p>The Washington outer coast is a different world from the Sound: long, flat sand beaches facing the open Pacific and two big, shallow estuaries. ${h.a('st:washington/westport', 'Westport')} sits at the entrance of Grays Harbor, where a large volume of water passes the jetties on each tide and the bar can turn rough on the ebb. To the south, Willapa Bay empties to vast tideflats on the lower lows. The surf beaches between them are wide and gentle, and the lowest tides there expose the sand far out toward the breakers.</p>
<h2>Currents in the passages</h2>
<p>A big tide forced through narrow passages makes strong currents. Deception Pass, Admiralty Inlet, the Tacoma Narrows and the channels of the San Juan Islands run hard at mid-tide, and slack water there does not match high or low water on the chart. Paddlers and small boats plan around current tables as well as tide heights. The ${h.a('tide-range', 'tide range guide')} explains how basin shape builds a tide like this.</p>`,
  faqs: [
    { q: 'Why is the tide bigger in Seattle than on the Washington coast?', a: 'Puget Sound is a long, closed basin, and the tide wave entering from the Strait of Juan de Fuca reflects off its southern end and builds as it travels inland. Seattle averages a little over eleven feet between low and high, compared with under nine at Westport on the ocean and at Port Townsend near the entrance. The south Sound is larger still.' },
    { q: 'When are the best low tides for tide pools in Washington?', a: 'From about April to August, when the deepest lows of the month in Puget Sound and on the outer coast fall in the late morning or around midday. Winter lows can be just as deep, but they come at night. On the strongest summer days the water at Seattle drops more than three feet below the chart datum, exposing wide beaches and reefs.' },
    { q: 'Does slack water match high tide in Washington passages?', a: 'Often not. In places like Deception Pass, the Tacoma Narrows or Admiralty Inlet, the current can keep running for a while after high or low water and turn only later. Tide tables give the height of the water; current predictions give the time of slack and the strength of the flow. Use both before taking a small boat or kayak through.' },
  ],
});
