import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

export default definePage({
  id: 'solunar-tables', slug: 'solunar-tables', group: 'fishing', order: 10,
  nav: 'Solunar tables', card: 'Two weeks of major and minor periods, with sunrise and tide turns.',
  title: 'Solunar Tables 2026: Major and Minor Fishing Times Free',
  description: 'Solunar tables for 92 US coastal stations: two weeks of major and minor fishing periods, a daily rating, sunrise, sunset, moon phase and tide turns. Free, 2026.',
  h1: 'Solunar tables for the US coast',
  intro: 'Pick a station and two weeks: the moon’s feeding periods, the day’s rating and the tide turns on one table.',
  resume: `A solunar table lists, for each day and place, the four periods when the moon is said to make fish and game most active: two major periods of about two hours, centred on the moon passing overhead and underfoot, and two minor periods of about an hour, centred on moonrise and moonset. This calendar computes them for the exact latitude and longitude of each of the ${K.stations.length} stations on the site, in local time, and sets them beside sunrise, sunset and the times of high and low tide, because for saltwater fishing moving water matters at least as much as the moon. Each day also gets a rating from one to four stars, by a rule printed below and on the method page. Solunar theory is a long fishing tradition, not a proven law: use it to choose between two days, not to promise a catch.`,
  tool: 'solunar',
  body: (h) => `
<h2>Where the periods come from</h2>
<p>John Alden Knight published his first solunar tables in 1926, after collecting accounts from anglers and hunters that fish and game fed more at certain phases of the moon's daily cycle. His tables placed the main periods at the moon's transits, when it is highest in the sky or directly beneath the observer on the other side of the Earth, and the shorter ones at moonrise and moonset. The times differ from one longitude to another, which is why a table for Maine is wrong in Texas.</p>
<h2>How the rating is built</h2>
<p>Every day starts with one star. Two more are added within two days of a new or full moon, when many anglers report the best bites (and when the tide range is largest); one more within four days. One star is added when a solunar period overlaps the hour around sunrise or sunset, the low-light periods many fish favor anyway. The maximum is four. The rule is simple on purpose, so you can see why a day scores as it does.</p>
<h2>Solunar and the tide</h2>
<p>On the coast, the tide often decides more than the moon's position. Water moving over a flat, through an inlet or past a jetty carries bait, and many species feed on the first hours of the flood or the last of the ebb. The table's last column gives the tide turns; a major period that falls an hour after a low, on a dawn tide, is the combination many inshore anglers look for. The ${h.a('fishing-tides', 'fishing tides guide')} and ${h.a('best-fishing-times', 'best fishing times')} go further.</p>`,
  faqs: [
    { q: 'What is the difference between a major and a minor solunar period?', a: 'A major period lasts about two hours and is centred on the moon’s transit, overhead or underfoot. A minor period lasts about an hour around moonrise or moonset. Tradition says major periods bring the strongest activity. On this site, majors are drawn as thick green bands under the tide curve and minors as thin ones.' },
    { q: 'Do solunar tables really work?', a: 'The evidence is mixed. Many anglers swear by them and some studies find more activity near the periods, others find little effect once light, temperature and tide are accounted for. Use the table as one input among several: weather, water temperature, moving tide and dawn or dusk usually matter at least as much.' },
    { q: 'Why are solunar times different at each station?', a: 'Because the moon’s rise, set and transit depend on where you stand: they shift by about four minutes for each degree of longitude and change with latitude. A table computed for Miami is off by more than an hour for San Diego. This calendar computes the periods for each station’s own coordinates.' },
    { q: 'Why does the full moon get a higher solunar rating?', a: 'Tradition holds that feeding activity peaks around the new and full moons, and those days also bring the largest tide ranges and the strongest currents on the coast, which move bait. The rating adds two stars within two days of either phase and one within four days.' },
  ],
  related: ['best-fishing-times', 'fishing-tides', 'spring-and-neap-tides', 'tides-near-me', 'method'],
  sources: ['astronomy_engine', 'coops_api', 'tides_tutorial'],
});
