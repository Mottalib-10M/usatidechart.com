import { defineStation } from '../../../lib/page-types';

export default defineStation({
  key: 'connecticut/mystic',
  intro: 'The West Mystic station is on the Mystic River a short way up from Fishers Island Sound, in eastern Connecticut.',
  body: (h) => {
    const s = h.st('connecticut/mystic'), nh = h.st('connecticut/new-haven');
    return `
<h2>A small river tide at the east end of the Sound</h2>
<p>The Mystic River rises and falls only ${h.ft(s.stats.meanRange)} on an average day, against ${h.ft(nh.stats.meanRange)} at ${h.a('st:connecticut/new-haven', 'New Haven')}. Eastern Connecticut is close to where the Atlantic tide enters Long Island Sound through the Race and Fishers Island Sound, and the range is smallest there before it grows westward. For the river's marinas and the seaport's wharves, the change between low and high is a couple of feet, with the strongest currents in the narrows.</p>
<h2>Neighbors on the same water</h2>
<p>NOAA's New London State Pier station, under seven miles west, is the reference for several places nearby: the Pawcatuck River at Westerly runs about 20 minutes ahead of New London, and the Niantic River close to an hour behind it. Watch Hill Point, on the Rhode Island side, is predicted from Newport with high water 41 minutes later and about three quarters of Newport's height. Silver Eel Pond on Fishers Island, across the sound, has its own reference station.</p>
<h2>Paddling and the drawbridge reach</h2>
<p>For a kayak or small boat on the river, the tide matters less for depth than for the current under the bridges and in the narrow reaches, which runs with the flood and the ebb. Going up the river on the flood and returning on the ebb is the easy way. The lowest low of the period is ${h.ft(s.stats.minLow.h)}, on ${h.date(s.stats.minLow.date)}; the highest high ${h.ft(s.stats.maxHigh.h)}, on ${h.date(s.stats.maxHigh.date)}.</p>`;
  },
  faqs: [
    { q: 'Is the Mystic tide the same as New London?', a: 'Close but not identical. West Mystic and New London State Pier are both NOAA reference stations, under seven miles apart near the eastern end of Long Island Sound, and both have a small range of roughly two to three feet. For the Mystic River itself use this page; for the Thames River and New London harbor use the New London station.' },
  ],
});
