import { defineState } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const nh = K.st('connecticut/new-haven'), my = K.st('connecticut/mystic');

export default defineState({
  state: 'connecticut',
  title: 'Connecticut Tides 2026: New Haven, Mystic and the Sound',
  description: 'Connecticut tides today: tide charts for New Haven and Mystic on Long Island Sound, with 7-day high and low tide times, coefficient and solunar periods. 2026.',
  intro: 'Two stations on Long Island Sound, where the tide more than doubles from east to west.',
  resume: `Connecticut's whole coast faces Long Island Sound, and its tide grows from east to west: ${K.ft(my.stats.meanRange)} on an average day at Mystic, near the Sound's eastern entrance, and ${K.ft(nh.stats.meanRange)} at New Haven, with larger ranges still toward Bridgeport, Stamford and Greenwich. The Sound is a long basin almost closed at its western end, and the tide wave entering from the east builds as it travels. The tide is semidiurnal, two highs and two lows a day, and high water also comes later as you go west. Pick a station in the tool above for today's curve, or open its page for seven days, the extreme tides and a planner. NOAA predicts much of the central coast from Bridgeport and the eastern coast from New London, with corrections of minutes on the shore and up to an hour or more up the rivers.`,
  featured: 'connecticut/new-haven',
  body: (h) => `
<h2>A sound that amplifies the tide</h2>
<p>Long Island Sound is about a hundred miles long, open to the Atlantic at its eastern end through the Race and Fishers Island Sound, and connected to New York Harbor at its western end only through the narrow East River. The tide that enters from the east reflects and builds in this long basin. At ${h.a('st:connecticut/mystic', 'Mystic')} the range is under three feet; at ${h.a('st:connecticut/new-haven', 'New Haven')} it is over six; near the New York border it approaches eight.</p>
<h2>Rivers that run late</h2>
<p>Connecticut's tidal rivers carry the tide inland, and with it a lag. NOAA predicts Shelton, up the Housatonic, about three quarters of an hour after Bridgeport, and the Niantic River close to an hour after New London. On the Connecticut River, the tide reaches well upstream of the mouth at Old Saybrook. Paddlers and boaters on the rivers plan by the current, which reverses with the tide in the lower reaches.</p>
<h2>Beaches, marshes and storm tides</h2>
<p>The shoreline is a mix of small sandy beaches, rocky points and salt marsh. At low tide the flats in front of beaches like those near New Haven and Milford widen, and at high tide the water reaches the seawalls. On the western Sound, northeast storms can pile water into the closed end, which is why storm tides there run high; the ${h.a('king-tides', 'king tides guide')} explains why the highest astronomical tides matter on those days.</p>`,
  faqs: [
    { q: 'Why does the tide get bigger toward western Connecticut?', a: 'Long Island Sound is almost closed at its western end, so the tide wave entering from the Atlantic in the east builds up as it travels west and reflects. The average range is under three feet near Mystic, over six at New Haven and close to eight near Stamford and Greenwich.' },
    { q: 'Is high tide later in western Connecticut than in the east?', a: 'Yes. The tide wave takes time to travel along Long Island Sound, so high water arrives later going west, by an hour or more between the eastern and western ends of the Connecticut shore. Each station page gives its own times; NOAA predicts many shore points from Bridgeport or New London with small corrections.' },
    { q: 'Do Connecticut rivers have tides?', a: 'Yes, in their lower reaches. The Housatonic, the Thames and the Connecticut rivers all carry the tide inland, with later times and changing heights. NOAA predicts Shelton on the Housatonic about 46 minutes after Bridgeport. The current in the river mouths reverses with the tide.' },
  ],
});
