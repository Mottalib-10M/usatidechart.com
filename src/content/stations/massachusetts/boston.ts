import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'massachusetts/boston',
  intro: 'The Boston gauge in the Inner Harbor has one of the longest water level records in the country and is the reference for predictions all around Massachusetts Bay.',
  body: (h) => {
    const s = h.st('massachusetts/boston');
    return `
<h2>Nearly ten feet, twice a day, in a city harbor</h2>
<p>Boston Harbor rises and falls ${h.ft(s.stats.meanRange)} on an average day, enough to change the city's edge: seawalls show their weed line, the Harborwalk steps disappear and reappear, and the mud of Dorchester Bay and the Neponset flats spreads wide at low water. Around the new and full moon the range grows to ${h.ft(s.stats.springRange)}.</p>
<p>NOAA uses this gauge to predict a whole family of nearby places. Charlestown at the mouth of the Charles, Deer Island, Moon Head and the Neponset River are listed as Boston with corrections of a minute or two and the same height. Further away, even stations on Cape Cod Bay and Nantucket Sound are computed from Boston with larger corrections: Pleasant Bay in Chatham runs about two and a half hours later with a third of the range.</p>
<h2>King tides on the waterfront</h2>
<p>Boston is a city where the highest tides of the year can bring seawater onto streets and wharves, especially in the low parts of the waterfront when an onshore wind adds a surge. The highest prediction of the period is ${h.ft(s.stats.maxHigh.h)} on ${h.date(s.stats.maxHigh.date)}. The ${h.a('king-tides', 'king tides guide')} explains why those dates come with the moon's perigee, and NOAA's observations show how far the water actually went.</p>
<h2>Harbor islands and the flats</h2>
<p>For a ferry trip to the harbor islands, the tide changes the landing more than the crossing. For clamming flats, beach walks at Carson Beach or a paddle along the Neponset, the low matters: the lowest of the period is ${h.ft(s.stats.minLow.h)} on ${h.date(s.stats.minLow.date)}. Currents in the channels between the islands run hard at mid-tide.</p>`;
  },
  faqs: [
    { q: 'Do Boston tide times work for Cape Cod?', a: 'Not directly. NOAA predicts many Cape Cod stations from the Boston gauge, but with corrections that change everything: Barnstable Harbor runs about ten minutes later with the same height, while Pleasant Bay in Chatham runs around two and a half hours later with a third of Boston’s range. Use the Cape Cod station nearest to you instead.' },
  ],
});
