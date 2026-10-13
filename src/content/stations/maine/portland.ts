import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'maine/portland',
  intro: 'The Portland station sits in the harbor of Casco Bay and is the reference NOAA uses to predict much of the southern Maine coast.',
  body: (h) => {
    const s = h.st('maine/portland');
    return `
<h2>A ten-foot harbor that sets the clock for southern Maine</h2>
<p>Casco Bay fills and empties by ${h.ft(s.stats.meanRange)} on an ordinary day, and ${h.ft(s.stats.springRange)} on the strongest tides around the new and full moon. That is a lot of water for a working waterfront: floats at the Old Port ride up and down the pilings by the height of a house storey twice a day, and a dinghy tied short at high water ends up hanging from its painter six hours later.</p>
<p>Because the harbor gauge has a long record, NOAA predicts many nearby points from it. Back Cove, the Fore River, Peaks Island and Great Diamond Island are all listed as Portland with a correction of a few minutes and a height factor close to one, so the times on this page hold for most of the inner bay. Old Orchard Beach, Hampton Harbor in New Hampshire and Cape Porpoise are predicted from Portland too, with the same method.</p>
<h2>Islands, ferries and the mud of the upper bay</h2>
<p>On the island side, the tide decides how far you walk on rockweed and how steep the gangway is at the ferry landing. In the coves of the upper bay, a low of ${h.ft(s.stats.minLow.h)} like the one predicted for ${h.date(s.stats.minLow.date)} leaves wide flats of mud and eelgrass where the water was knee-deep at mid-tide. Kayakers who cross to the islands plan on the slack around the turn; the current between the ledges is strongest in the middle hours of the rise and fall.</p>
<h2>Winter storms on top of the tide</h2>
<p>The highest prediction of the period, ${h.ft(s.stats.maxHigh.h)} on ${h.date(s.stats.maxHigh.date)}, falls in winter, the season of nor'easters. When a storm surge rides a spring tide, Commercial Street can take water; the ${h.a('king-tides', 'king tides guide')} explains how to read those dates, and the Maine coast ${h.a('state:maine', 'state page')} compares Portland with Bar Harbor further east.</p>`;
  },
  faqs: [
    { q: 'Can I use the Portland tide times for the Casco Bay islands?', a: 'For most of them, yes. NOAA predicts Peaks Island, Great Diamond Island and Cushing Island from the Portland gauge with corrections of under ten minutes and heights within a few percent. Further out, toward Harpswell and the outer ledges, check the nearest secondary station, and remember that wind can hold water in the bay or push it out.' },
  ],
});
