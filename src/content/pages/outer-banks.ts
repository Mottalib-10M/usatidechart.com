import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const du = K.st('north-carolina/duck'), oi = K.st('north-carolina/oregon-inlet'), ha = K.st('north-carolina/hatteras');

export default definePage({
  id: 'outer-banks', slug: 'outer-banks', group: 'tides', order: 31,
  nav: 'Outer Banks tides', card: 'Duck, Nags Head, Oregon Inlet and Hatteras on one chart.',
  title: 'Outer Banks Tides 2026: Duck, Nags Head, Hatteras Compared',
  description: 'Outer Banks tides: Duck, Nags Head, Oregon Inlet and Cape Hatteras on one tide chart, with high and low tide times for today and the next 30 days. Free, 2026.',
  h1: 'Outer Banks tides: ocean beaches and the inlet',
  intro: 'One chart for the Banks: three ocean stations and the marina inside Oregon Inlet, for any day of the next month.',
  resume: `On the Outer Banks the ocean tide is moderate and nearly the same from Duck to Hatteras, about three and a half feet on an average day: ${K.ft(du.stats.meanRange)} at the Duck pier and ${K.ft(ha.stats.meanRange)} at the Cape Hatteras pier. Behind the barrier islands, the sounds keep almost none of it. The Oregon Inlet marina, inside the inlet on the sound side, averages ${K.ft(oi.stats.meanRange)}, and deeper in Roanoke, Pamlico and Currituck sounds the lunar tide fades to inches while the wind moves the water. This chart draws the four stations on one scale for the day you choose, with their highs, lows and ranges side by side, so you can see at a glance which tide applies to the beach, the pier or the dock you are heading to.`,
  tool: 'compare',
  stations: ['north-carolina/duck', 'north-carolina/nags-head', 'north-carolina/oregon-inlet', 'north-carolina/hatteras'],
  body: (h) => `
<h2>One ocean tide, many sound levels</h2>
<p>The ocean side of the Banks follows a regular Atlantic tide, and the three ocean stations on this chart turn within minutes of each other. The difference that matters is between the ocean and the sounds. The sounds are vast and shallow and connect to the sea through a few inlets, Oregon, Hatteras and Ocracoke, so only a fraction of the tide gets through. A southwest wind can pile sound water against the islands and flood roads on the sound side; a northeast wind can drain the western shores. Those changes can exceed the ocean's tide.</p>
<h2>Picking the right curve</h2>
<p>For a beach walk, a surf session or pier fishing between Corolla and South Nags Head, use ${h.a('st:north-carolina/duck', 'Duck')} or ${h.a('st:north-carolina/nags-head', 'Nags Head')}. For Hatteras Island and Cape Point, the ${h.a('st:north-carolina/hatteras', 'Cape Hatteras pier')}. For boats at the Oregon Inlet marina or in the channels behind the inlet, ${h.a('st:north-carolina/oregon-inlet', 'Oregon Inlet')}, whose curve is flat and lopsided next to the others. The chart's red line marks the current time when the day shown is today.</p>
<h2>Inlets and storms</h2>
<p>The inlets move and shoal after storms, and their currents run hard. Overwash on Highway 12 comes with storms and high surf, often around high tide, not with the tide alone. Predictions include no weather; follow local warnings during nor'easters and hurricanes.</p>
<h2>Sunrise and the pier</h2>
<p>The ocean piers of the Banks face east, and the first light over the water is the time many anglers and walkers choose. Combine the chart with the sunrise time on each station page: a low tide near sunrise gives the widest beach and the firmest sand for a morning walk, while a rising tide in the hour after dawn is the classic window for the surf.</p>`,
  faqs: [
    { q: 'Are tides the same along the whole Outer Banks?', a: 'On the ocean side, nearly: Duck, Nags Head and the Cape Hatteras pier have similar ranges and turn within minutes of each other. The big difference is between the ocean and the sounds, where the tide is a fraction of the ocean’s and the wind often moves the water more than the moon.' },
    { q: 'Why is the Oregon Inlet tide so flat on the chart?', a: 'Because the station is at the marina inside the inlet, on the sound side. The ocean tide loses most of its height squeezing through the inlet into the shallow sounds, so the marina’s average range is about a foot, and its rise and fall are lopsided compared with the ocean stations.' },
    { q: 'Which Outer Banks station should I use for Corolla?', a: 'Duck, the nearest ocean station on this site, about a dozen miles south of Corolla on the same ocean beach. The ocean tide changes little over that distance. For Currituck Sound behind Corolla, no tide table helps much: the level follows the wind.' },
    { q: 'When is the best tide for surf fishing on the Outer Banks?', a: 'Many anglers fish moving water: the first hours of the incoming tide, when bait is pushed into the troughs and over the bars, and the start of the ebb at the points. At Cape Point the currents meet over the shoals. The solunar tables add the moon’s periods for planning.' },
  ],
  related: ['st:north-carolina/duck', 'st:north-carolina/hatteras', 'st:north-carolina/oregon-inlet', 'state:north-carolina', 'fishing-tides'],
  sources: ['coops_api', 'tide_vs_current', 'tides_tutorial'],
});
