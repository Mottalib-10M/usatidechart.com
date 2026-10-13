import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'new-york/new-york-city',
  intro: 'The Battery, at the southern tip of Manhattan, holds the reference tide gauge for New York Harbor, with one of the longest water level records in the country.',
  body: (h) => {
    const s = h.st('new-york/new-york-city');
    return `
<h2>Where the harbor's tide is measured</h2>
<p>The Battery gauge has measured the harbor for about a century without interruption, and NOAA predicts dozens of points around the city from it. The tide here averages ${h.ft(s.stats.meanRange)} from low to high. Around Manhattan it does not arrive everywhere at once: Gowanus Bay in Brooklyn turns about a quarter of an hour before the Battery, Wallabout Bay at the Navy Yard half an hour after, and East 41st Street on the East River more than an hour after, with a low tide that lags 46 minutes. Weehawken across the Hudson is 13 minutes behind.</p>
<h2>The East River is a strait, not a river</h2>
<p>The East River connects New York Harbor to Long Island Sound, and the two ends have tides of different timing and size. The difference in level drives strong currents through the channel, famously at Hell Gate, and they reverse with the tide. Kayakers and small boats on the East River plan by the current tables, not only by the heights; the heights on this page tell you when the harbor end is high or low.</p>
<h2>Storm tides on the waterfront</h2>
<p>Lower Manhattan's seawalls stand a few feet above the highest predicted tides: ${h.ft(s.stats.maxHigh.h)} on ${h.date(s.stats.maxHigh.date)} is the top of this period. The danger comes when a storm surge rides on a high tide, as in 2012, when the water at the Battery rose far above any prediction. Predictions carry no weather, so in a storm watch NOAA's observed water level and the forecasts of the National Weather Service. Beaches in the city, such as those of the Rockaways, face the ocean and see a tide close to the ${h.a('st:new-york/jones-beach', 'Jones Inlet')} one.</p>`;
  },
  faqs: [
    { q: 'Is the tide the same on the East River and at the Battery in New York City?', a: 'No. NOAA predicts East 41st Street from the Battery with high water about an hour later and low water 46 minutes later, and Hunters Point on Newtown Creek more than an hour later still. The East River links two tides of different timing, which is why its current runs so hard and reverses with them.' },
  ],
});
