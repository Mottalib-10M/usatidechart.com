import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

export default definePage({
  id: 'tides-near-me', slug: 'tides-near-me', group: 'tides', order: 10,
  nav: 'Tides near me', card: 'The closest stations to where you stand, with their next high and low.',
  title: 'Tides Near Me 2026: Next High and Low Tide Nearby, Free',
  description: 'Tides near me: find the nearest of 92 US tide stations from your location or state and see the next high and low tide with a countdown. Free, 2026 data.',
  h1: 'Tides near me',
  intro: 'Share your location (it stays on your device) or choose a state: the closest stations and their next high and low appear at once.',
  resume: `The nearest tide station is the one to trust, because the tide can change by an hour and several feet between a beach and the bay behind it. This tool sorts the ${K.stations.length} stations of the site by distance from you, using the position your browser gives it, and shows each one's next high and next low tide with the time left. Nothing is sent anywhere: the comparison happens in the page. Without location, pick a state to list its stations. The times are NOAA's predictions for each named station, in that station's own time zone, so a visitor from Denver reading a Florida page sees Florida clock times. For a full day's curve, seven days of times and the planner, open the station page from the list.`,
  tool: 'near',
  body: (h) => `
<h2>What "near" means for a tide</h2>
<p>Distance is a good first filter, not the whole answer. Two stations a few miles apart can sit on different waters: ${h.a('st:north-carolina/nags-head', 'Nags Head')} on the ocean and ${h.a('st:north-carolina/oregon-inlet', 'the Oregon Inlet marina')} inside the inlet differ by about two and a half feet of range, and Hyannis and Barnstable Harbor on Cape Cod by six feet. When the list offers two stations at similar distances, choose the one on the same body of water as you: the open beach, the harbor, the bay or the river. Each station page names its NOAA station and says where it sits.</p>
<h2>How the list is built</h2>
<p>When you press "Use my location", your browser asks for permission and returns a latitude and longitude. The page computes the great-circle distance to each station and keeps the eight closest. The next high and low come from the predictions included in the page for the days after its last update; if you open it much later, the page downloads the station files it needs from this site. Without a position, the state list shows every station of that state on the site.</p>
<h2>Limits</h2>
<p>The site covers ${K.stations.length} stations chosen for the places people search most, not every NOAA station. In long sounds, rivers and lagoons far from any of them, the nearest station can be miles away on different water; NOAA's own map lists thousands of secondary stations. Predictions are astronomical: wind and storms move the real water, and none of this is for navigation. The ${h.a('method', 'method page')} explains the calculations.</p>`,
  faqs: [
    { q: 'Does this tide finder send my location anywhere?', a: 'No. Your browser gives the position to the page, the page compares it with the list of stations it already contains, and nothing is transmitted to this site or to anyone else. If you refuse location access, choose a state instead and the list shows that state’s stations with their next tides.' },
    { q: 'Why is the nearest station not always the right one?', a: 'Because the tide depends on the water, not only on distance. A harbor behind an inlet, a bay behind a barrier island or a river can have a smaller and later tide than an ocean beach only a mile away. Pick the station on the same water as you, and read the description on its page.' },
    { q: 'What time zone are the tide times in?', a: 'In the station’s local time, daylight saving time included where it applies. A Hawaii station shows Hawaii time and an Alaska station Alaska time, whatever the clock of your device. The countdown to the next tide uses your device’s clock, converted to the station’s zone.' },
    { q: 'How many tide stations does the site cover?', a: 'Ninety-two NOAA stations in twenty-three coastal states, from Maine to Texas on the Atlantic and Gulf coasts and from California to Washington, Alaska and Hawaii on the Pacific. They were chosen for the beaches, harbors and fishing towns people search for most.' },
  ],
  related: ['how-to-read-a-tide-chart', 'high-tide-and-low-tide', 'beach-walk-planner', 'state:florida', 'state:california'],
  sources: ['predictions_page', 'coops_api', 'coops_mdapi'],
});
