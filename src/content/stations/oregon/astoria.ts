import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'oregon/astoria',
  intro: 'Tongue Point, a headland just east of downtown Astoria, carries the NOAA reference gauge for the lower Columbia River, upstream of the bar where the river meets the Pacific.',
  body: (h) => {
    const s = h.st('oregon/astoria');
    return `
<h2>An ocean tide on a great river</h2>
<p>The Columbia is wide and deep enough near its mouth that the Pacific tide runs far up it, and at Astoria it is still at full strength: ${h.ft(s.stats.meanRange)} on an average day, ${h.ft(s.stats.springRange)} at spring tides, ${h.ft(s.stats.neapRange)} at the neaps. Those figures put the river town among the largest tides on the Oregon coast. They also come with a caveat that ocean stations do not have. The river carries a huge volume of fresh water, highest during the snowmelt of late spring and early summer and after heavy winter rain, and that flow can hold the water level above the prediction, especially at low tide. Treat the lows on this page as a best case when the river is running high.</p>
<h2>The estuary, shore by shore</h2>
<p>NOAA predicts the other stations of the estuary from Tongue Point. Downstream toward the sea, the tide turns earlier: the Astoria port docks 8 minutes earlier at high water, Youngs Bay 13 minutes earlier, and Warrenton on the Skipanon River 13 minutes earlier at high water and 19 at low. Across the river on the Washington side, Hungry Harbor keeps nearly the same high-water time. Upstream the delay grows quickly, and the lows lag more than the highs: Settlers Point and Harrington Point both reach high water about 21 to 22 minutes after Tongue Point and low water more than 50 minutes after. The Astoria-Megler Bridge to Washington crosses all of this in a few miles.</p>
<h2>Beyond the bar</h2>
<p>The river meets the ocean between long jetties at the Columbia River Bar, one of the most dangerous crossings on any coast, where an ebb tide against a westerly swell builds steep breaking seas. This page is not a bar forecast. For the beaches south of the mouth, the ${h.a('state:oregon', 'Oregon coast stations')} give ocean times.</p>`;
  },
  faqs: [
    { q: "Does the Columbia River current change the tide at Astoria?", a: "Yes. The tide prediction for Astoria assumes average conditions, but the Columbia's flow varies a great deal through the year. When the river is high, during spring snowmelt or after heavy rain, the extra water keeps levels up, and low tides at Astoria often fail to fall as far as the table says. In a dry late summer the prediction is usually closer to what you see." },
  ],
});
