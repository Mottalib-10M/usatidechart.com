import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

export default definePage({
  id: 'boat-ramp-tide-planner', slug: 'boat-ramp-tide-planner', group: 'planning', order: 20,
  nav: 'Boat ramp tide planner', card: 'The hours when the water stays deep enough at your ramp.',
  title: 'Boat Ramp Tides 2026: When to Launch and Retrieve a Boat',
  description: 'Boat ramp tide planner: every window with the water above the depth your ramp needs, at 92 US stations, plus the lowest tide that still floats your boat. 2026.',
  h1: 'Boat ramp planner: when can I launch and get back?',
  intro: 'Enter the tide height your ramp needs and see every window above it, so the launch and the return both work.',
  resume: `At a tidal ramp the question is not when high tide is, but how long the water stays deep enough to float the boat off the trailer, and whether it will still be there when you come back. This planner lists, for any of the ${K.stations.length} stations on the site, every window when the predicted water stays above the height you set, over 3 to 60 days, in daylight or not, and draws the day's curve with that level across it. The calculator in the text below helps you find the height: your boat's draft on the trailer, plus a safety margin, minus the depth already at the end of the ramp at 0 ft. Heights are in feet above Mean Lower Low Water, the zero of NOAA charts and tide tables.`,
  tool: 'planner-boat',
  body: (h) => `
<h2>Finding the height your ramp needs</h2>
<p>Most ramps have a usable depth that depends on their slope and on how much sand or mud has built up at the end. The simplest way to learn it is once, at a known tide: note the predicted height when you launched comfortably, or when the trailer wheels went off the end of the concrete. The calculator below turns a draft and a depth into a minimum tide height.</p>
${h.mini('ramp')}
<h2>Plan the return, not just the launch</h2>
<p>A morning launch on a falling tide can leave the ramp too shallow by the time you return. Read the end of the window, not the start, and plan to be back with time to spare. On coasts with big ranges, such as ${h.a('st:georgia/tybee-island', 'Tybee Island')} or ${h.a('st:maine/portland', 'Portland')}, the water drops more than a foot an hour in the middle of the ebb; on the Gulf the change is slow but the wind can hold water out for a day after a cold front.</p>
<h2>Reading the window list</h2>
<p>Each line of the list is one stretch of time with the water above your level: its date, start, end, length and the highest water inside it. On a semidiurnal coast you usually get two windows a day, one around each high; on a diurnal Gulf coast often one long one. If the list is empty, the level is too high for the period: lower it, accept night windows, or look further ahead to the days around the new and full moon, when the highs are highest. Click a line to draw that day's curve under the list.</p>
<h2>Inlets and current</h2>
<p>Depth at the ramp is one question; the current in the channel or inlet beyond it is another. Ebb against an onshore swell makes inlets rough, and many boaters prefer to run them on the flood. The planner gives heights, not currents, and nothing here is for navigation: local knowledge, charts and marine forecasts come first.</p>`,
  faqs: [
    { q: 'What tide height do I need to launch my boat?', a: 'Roughly your boat’s draft on the trailer plus a margin of six inches to two feet, minus the depth that already sits at the end of the ramp when the tide is at zero. Ramps differ a lot, so the most reliable figure comes from one launch at a known predicted height.' },
    { q: 'Is it better to launch on a rising or falling tide?', a: 'A rising tide is the safer choice at a shallow ramp: the water deepens while you are out, so the return is easier. On a falling tide, plan to be back well before the water drops below your ramp’s height, and check the end of the window in the planner.' },
    { q: 'Does the boat ramp planner include wind and current?', a: 'No. It uses predicted astronomical tides only. Wind can raise or lower the water, especially in shallow bays and on the Gulf coast, and currents in inlets depend on the tide and the weather. Use the planner for timing, then check marine forecasts and local conditions.' },
    { q: 'Which station should I pick for my boat ramp?', a: 'The one on the same water as the ramp: a bay or river ramp follows a later, often smaller tide than the ocean beach nearby. Each station page lists the NOAA secondary stations around it, with their time and height corrections, to help you judge.' },
  ],
  related: ['beach-walk-planner', 'tide-table', 'fishing-tides', 'st:florida/st-petersburg', 'st:virginia/norfolk'],
  sources: ['coops_api', 'datums', 'tide_vs_current'],
});
