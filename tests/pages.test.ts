/**
 * Content files: lengths, questions, links, words that betray a generated text, and the generated
 * titles and descriptions of every station page. Run one file with
 *   PAGE_FILES=stations/maine/portland npx vitest run tests/pages.test.ts
 * (path under src/content without .ts, comma-separated), or every file without PAGE_FILES.
 */
import { describe, it, expect } from 'vitest';
import { PAGES, STATE_PAGES, STATION_TEXTS, PUBLISHED } from '../src/lib/pages';
import { helpers } from '../src/lib/helpers';
import { STATIONS, station } from '../src/lib/stations';
import { stationTitle, stationDescription, stationResume, stationFaqs } from '../src/lib/station-text';
import { HOME } from '../src/content/home';

const only = (process.env.PAGE_FILES ?? '').split(',').filter(Boolean);
const want = (path: string) => !only.length || only.includes(path);
const h = helpers();
const text = (html: string) => html.replace(/<table[\s\S]*?<\/table>/g, ' ').replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ');
const words = (s: string) => text(s).split(/\s+/).filter(Boolean).length;
const BANNED = [new RegExp('\\u2014'), new RegExp('&' + 'mdash;'), /it'?s important to note/i, /\bdive into\b/i, /\bdelve\b/i, /whether you'?re/i, /in today'?s world/i, /\bmoreover\b/i, /\bfurthermore\b/i, /\bin conclusion\b/i, /\bnestled\b/i, /\bboasts?\b/i, /\bhidden gem\b/i, /\bparadise\b/i, /\bbreathtaking\b/i, /\btapestry\b/i];
const clean = (label: string, s: string) => { for (const b of BANNED) expect(s, `${label}: banned pattern ${b}`).not.toMatch(b); };
const faqOk = (label: string, f: { q: string; a: string }) => {
  const n = f.a.split(/\s+/).filter(Boolean).length;
  expect(n, `${label}: "${f.q}" has ${n} words`).toBeGreaterThanOrEqual(42);
  expect(n, `${label}: "${f.q}" has ${n} words`).toBeLessThanOrEqual(88);
  expect(f.q.trim().endsWith('?'), `${label}: question mark`).toBe(true);
  clean(label, f.q + ' ' + f.a);
};
const len = (label: string, t: string, d: string) => {
  expect(t.length, `${label} title "${t}"`).toBeGreaterThanOrEqual(50); expect(t.length, `${label} title "${t}"`).toBeLessThanOrEqual(60);
  expect(d.length, `${label} description "${d}"`).toBeGreaterThanOrEqual(150); expect(d.length, `${label} description "${d}"`).toBeLessThanOrEqual(160);
  expect(t, `${label} title year`).toMatch(/2026/); expect(d, `${label} description year`).toMatch(/2026/);
  expect(t, `${label}: title must not open with How/What/Why/Tool words`).not.toMatch(/^(how|what|why|when|where|is|are|calculator|tool|guide|about|faq)\b/i);
};

const allQuestions: Array<[string, string]> = [];

describe('station texts', () => {
  for (const s of STATIONS.filter((x) => STATION_TEXTS[x.key])) {
    const path = `stations/${s.key}`;
    const def = STATION_TEXTS[s.key];
    const gen = stationFaqs(s);
    for (const f of [...gen, ...(def.faqs ?? [])]) allQuestions.push([path, f.q]);
    if (!want(path)) continue;
    it(path, () => {
      const body = def.body(h);
      const n = words(body);
      expect(n, `${path}: hand-written body has ${n} words (210 to 450)`).toBeGreaterThanOrEqual(210);
      expect(n, `${path}: hand-written body has ${n} words (210 to 450)`).toBeLessThanOrEqual(450);
      const h2 = (body.match(/<h2>/g) ?? []).length;
      expect(h2, `${path}: 2 or 3 <h2>`).toBeGreaterThanOrEqual(2); expect(h2).toBeLessThanOrEqual(3);
      expect(body, `${path}: no <h1>`).not.toMatch(/<h1/);
      clean(path, body + ' ' + def.intro);
      expect(def.intro.split(/\s+/).length, `${path}: intro is one sentence`).toBeLessThanOrEqual(40);
      expect((def.faqs ?? []).length, `${path}: 1 or 2 own questions`).toBeGreaterThanOrEqual(1);
      expect((def.faqs ?? []).length).toBeLessThanOrEqual(2);
      for (const f of [...gen, ...(def.faqs ?? [])]) faqOk(path, f);
      len(path, def.title ?? stationTitle(s), def.description ?? stationDescription(s));
      expect(words(stationResume(s))).toBeGreaterThanOrEqual(120);
    });
  }
});

describe('state pages', () => {
  for (const d of STATE_PAGES) {
    const path = `states/${d.state}`;
    for (const f of d.faqs) allQuestions.push([path, f.q]);
    if (!want(path)) continue;
    it(path, () => {
      len(path, d.title, d.description);
      const r = d.resume.split(/\s+/).length;
      expect(r, `${path}: resume ${r} words`).toBeGreaterThanOrEqual(125);
      const n = words(d.body(h));
      expect(n, `${path}: body ${n} words (230 to 700)`).toBeGreaterThanOrEqual(230);
      expect(n).toBeLessThanOrEqual(700);
      expect(d.faqs.length).toBeGreaterThanOrEqual(3); expect(d.faqs.length).toBeLessThanOrEqual(5);
      for (const f of d.faqs) faqOk(path, f);
      clean(path, d.body(h) + d.resume + d.intro);
      station(d.featured);
      expect(d.featured.startsWith(`${d.state}/`)).toBe(true);
    });
  }
});

describe('guides and tools', () => {
  for (const p of PAGES) {
    const path = `pages/${p.id}`;
    for (const f of p.faqs) allQuestions.push([path, f.q]);
    if (!want(path)) continue;
    it(path, () => {
      len(path, p.title, p.description);
      expect(p.slug).toBe(p.id);
      const r = p.resume.split(/\s+/).length;
      expect(r, `${path}: resume ${r} words`).toBeGreaterThanOrEqual(125);
      const n = words(p.body(h));
      const floor = p.tool ? 250 : 700;
      expect(n, `${path}: body ${n} words (>= ${floor})`).toBeGreaterThanOrEqual(floor);
      expect(!!p.tool !== !!p.mini, `${path}: a tool OR a mini`).toBe(true);
      const lo = 4, hi = n >= 1000 ? 8 : 5;
      expect(p.faqs.length, `${path}: ${p.faqs.length} questions`).toBeGreaterThanOrEqual(lo); expect(p.faqs.length).toBeLessThanOrEqual(hi);
      for (const f of p.faqs) faqOk(path, f);
      expect(p.related.length).toBeGreaterThanOrEqual(3);
      expect(p.sources.length).toBeGreaterThanOrEqual(2);
      for (const k of p.sources) expect(h.P.sources, `${path}: source ${k}`).toHaveProperty(k);
      clean(path, p.body(h) + p.resume + p.intro);
      if (p.stations) for (const k of p.stations) station(k);
    });
  }
});

describe('site-wide', () => {
  it('home', () => {
    len('home', HOME.title, HOME.description);
    for (const f of HOME.faqs) { faqOk('home', f); allQuestions.push(['home', f.q]); }
    expect(HOME.faqs.length).toBeGreaterThanOrEqual(6);
  });
  it('no question asked twice on the site', () => {
    const seen = new Map<string, string>();
    for (const [p, q] of allQuestions) {
      const k = q.toLowerCase().replace(/[^a-z0-9 ]/g, '');
      expect(seen.has(k) ? `${q} (${seen.get(k)} and ${p})` : '').toBe('');
      seen.set(k, p);
    }
  });
  it('every station of the registry is published', () => {
    if (only.length) return;
    expect(PUBLISHED.length).toBe(STATIONS.length);
  });
});

describe('generated snippets for every station of the registry', () => {
  it('fit 50-60 and 150-160 with the year, and FAQ lengths', () => {
    for (const s of STATIONS) {
      const def = STATION_TEXTS[s.key];
      len(s.key, def?.title ?? stationTitle(s), def?.description ?? stationDescription(s));
      for (const f of stationFaqs(s)) faqOk(s.key, f);
      expect(words(stationResume(s))).toBeGreaterThanOrEqual(120);
    }
  });
});
