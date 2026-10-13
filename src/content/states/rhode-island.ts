import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const np = K.st('rhode-island/newport'), na = K.st('rhode-island/narragansett');

export default defineState({
  state: 'rhode-island',
  title: 'Rhode Island Tides 2026: Newport and Narragansett Bay',
  description: 'Rhode Island tides today: tide charts for Newport and Narragansett with 7-day high and low tide times, coefficient, sunrise and solunar periods. 2026.',
  intro: 'Two stations at the mouth of Narragansett Bay, where a moderate tide drives strong currents through the passages.',
  resume: `Rhode Island's tide is moderate and regular: two highs and two lows a day, ${K.ft(np.stats.meanRange)} on an average day at Newport and ${K.ft(na.stats.meanRange)} at Narragansett Pier. The coast lies between the large tides of the Gulf of Maine and the small ones near Nantucket, and Narragansett Bay, which cuts deep into the state, slightly amplifies the tide as it travels north toward Providence. NOAA uses the Newport gauge as the reference for most of the bay, with corrections of a few minutes. Pick a station in the tool above for today's curve and times, or open its page for the seven-day table, the year's highest and lowest tides and a planner. On the south coast, the salt ponds behind the beaches connect to the sea through narrow breachways, where the tide comes late and the current runs fast.`,
  featured: 'rhode-island/newport',
  body: (h) => `
<h2>Narragansett Bay, a drowned river valley</h2>
<p>Narragansett Bay is a large estuary of islands and passages, Aquidneck, Conanicut and Prudence among them. The tide enters through the East and West passages on either side of Conanicut Island and grows a little toward the head of the bay. NOAA predicts Prudence Island and Conanicut Point from ${h.a('st:rhode-island/newport', 'Newport')} with heights 7 to 14 percent larger and high water a few minutes later. Sailors in the bay feel the tide mostly as current, strongest in the narrow places such as the passages under the bridges.</p>
<h2>The south coast and the salt ponds</h2>
<p>West of the bay, from ${h.a('st:rhode-island/narragansett', 'Narragansett')} and Point Judith to Watch Hill, the shore is a line of sand beaches with salt ponds behind them. The ponds exchange water with the ocean through narrow breachways, and the tide inside them is smaller and later than on the beach. At the breachways, the current on the ebb can be strong enough to be dangerous for swimmers and small boats.</p>
<h2>Block Island</h2>
<p>Block Island, out in Block Island Sound, has several NOAA reference stations, at Old Harbor and the Southwest Point among others, with tides in the same range as the mainland coast. For surf, swell and wind usually matter more than the tide on the south-facing beaches; for clamming in the ponds and the bay, the lowest lows of the year decide. The ${h.a('negative-low-tides', 'negative low tides guide')} lists how to find them.</p>`,
  faqs: [
    { q: 'Is the tide bigger in Providence than in Newport?', a: 'Somewhat. Narragansett Bay narrows toward Providence, and the tide grows as it moves up the bay. NOAA predicts points inside the bay, such as Prudence Island, with heights up to about 14 percent larger than Newport’s. The timing changes only by minutes, because the bay is short compared with the tide wave.' },
    { q: 'What is the tide range in Rhode Island?', a: 'Moderate: about three and a half feet between low and high on an average day at Newport and a little less at Narragansett Pier, with up to about five feet around the new and full moon. The tide is regular, two highs and two lows of similar height each day.' },
    { q: 'Do the Rhode Island salt ponds have tides?', a: 'Yes, but smaller and later than the ocean beaches. The ponds behind the south coast beaches connect to the sea only through narrow breachways, which limit how much water gets in and out each tide. The current in a breachway runs strongly, especially on the ebb.' },
  ],
});
