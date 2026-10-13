#!/usr/bin/env python3
"""Rebuild the tide data of the site from NOAA CO-OPS (public domain, US government work).

Usage: python3 scripts/build-tides.py [--from 2026-10-01] [--to 2027-12-31]

Reads scripts/data/stations.tsv (one curated station per line) and writes:
  - .cache-raw/<id>-*.json            raw API answers (not committed)
  - scripts/data/noaa-stations.json   station metadata, offsets and datums as published
  - public/data/<state>/<slug>.json   high and low tide predictions, GMT, feet above MLLW, and for
                                      reference (harmonic) stations the hourly heights, in hundredths of a foot

Then run `node scripts/build-sky.mjs`, which adds sunrise, sunset, moonrise, moonset and
moon transits to every file and writes src/data/stations.json.

API: https://api.tidesandcurrents.noaa.gov/api/prod/  (product=predictions, interval=hilo,
datum=MLLW, units=english, time_zone=gmt). Metadata: https://api.tidesandcurrents.noaa.gov/mdapi/prod/
The `application` parameter names this site, as CO-OPS asks of every client.
"""
import json, os, sys, time, urllib.request, datetime as dt

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROOT, '.cache-raw'); os.makedirs(CACHE, exist_ok=True)
APP = 'tide_day_static_site'
args = sys.argv[1:]
BEGIN = args[args.index('--from') + 1] if '--from' in args else '2026-10-01'
END = args[args.index('--to') + 1] if '--to' in args else '2027-12-31'


def get(url, cache_name, retries=4):
    path = os.path.join(CACHE, cache_name)
    if os.path.exists(path) and '--refresh' not in args:
        return json.load(open(path))
    for i in range(retries):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (static site build; contact via site)'})
            with urllib.request.urlopen(req, timeout=60) as r:
                data = json.loads(r.read().decode('utf-8'))
            json.dump(data, open(path, 'w'))
            time.sleep(0.3)
            return data
        except Exception as e:  # noqa: BLE001
            print('  retry', i + 1, url, e)
            time.sleep(2 + i * 3)
    raise SystemExit(f'failed: {url}')


rows = [l.rstrip('\n').split('\t') for l in open(os.path.join(ROOT, 'scripts/data/stations.tsv')) if l.strip() and not l.startswith('#')]
meta_out = {}
LIST = {x['id']: x for x in get('https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredictions', 'stations-tidepredictions.json')['stations']}
for slug, state, place, sid in rows:
    print(state, slug, sid)
    st = LIST[sid]
    offsets = None
    if st.get('type') == 'S':
        offsets = get(f'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/{sid}/tidepredoffsets.json', f'{sid}-offsets.json')
    datums = None
    if st.get('type') == 'R':
        d = get(f'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/{sid}/datums.json', f'{sid}-datums.json')
        if d.get('datums'):
            vals = {x['name']: x['value'] for x in d['datums'] if x.get('value') is not None}
            if 'MLLW' in vals:
                base = vals['MLLW']
                datums = {k: round(vals[k] - base, 2) for k in ('MHHW', 'MHW', 'MSL', 'MTL', 'MLW', 'MLLW') if k in vals}
                for k in ('GT', 'MN'):
                    if k in vals: datums[k] = vals[k]
                datums['epoch'] = d.get('epoch')
    b, e = BEGIN.replace('-', ''), END.replace('-', '')
    pred = get(f'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&application={APP}'
               f'&begin_date={b}&end_date={e}&datum=MLLW&station={sid}&time_zone=gmt&units=english&interval=hilo&format=json',
               f'{sid}-hilo-{b}-{e}.json')
    if 'predictions' not in pred:
        raise SystemExit(f'{sid}: {pred}')
    events = []
    for p in pred['predictions']:
        t = dt.datetime.strptime(p['t'], '%Y-%m-%d %H:%M').replace(tzinfo=dt.timezone.utc)
        events.append([int(t.timestamp() // 60), round(float(p['v']), 2), 1 if p['type'] == 'H' else 0])
    hourly = None
    if st.get('type') == 'R':
        hp = get(f'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&application={APP}'
                 f'&begin_date={b}&end_date={e}&datum=MLLW&station={sid}&time_zone=gmt&units=english&interval=h&format=json',
                 f'{sid}-hourly-{b}-{e}.json')
        ps = hp.get('predictions') or []
        if ps:
            t0 = int(dt.datetime.strptime(ps[0]['t'], '%Y-%m-%d %H:%M').replace(tzinfo=dt.timezone.utc).timestamp() // 60)
            tl = int(dt.datetime.strptime(ps[-1]['t'], '%Y-%m-%d %H:%M').replace(tzinfo=dt.timezone.utc).timestamp() // 60)
            if (tl - t0) // 60 + 1 != len(ps):
                raise SystemExit(f'{sid}: hourly series has gaps')
            hourly = {'t0': t0, 'v': [round(float(x['v']) * 100) for x in ps]}
    os.makedirs(os.path.join(ROOT, 'public/data', state), exist_ok=True)
    out = {'id': sid, 'from': BEGIN, 'to': END, 'events': events, 'hourly': hourly}
    json.dump(out, open(os.path.join(ROOT, 'public/data', state, f'{slug}.json'), 'w'), separators=(',', ':'))
    meta_out[f'{state}/{slug}'] = {
        'slug': slug, 'state': state, 'place': place, 'id': sid, 'noaaName': st['name'], 'type': st['type'],
        'referenceId': st.get('reference_id') or None, 'lat': st['lat'], 'lng': st['lng'], 'tzcorr': st.get('timezonecorr'),
        'offsets': ({k: offsets.get(k) for k in ('refStationId', 'heightOffsetHighTide', 'heightOffsetLowTide', 'timeOffsetHighTide', 'timeOffsetLowTide', 'heightAdjustedType')} if offsets else None),
        'datums': datums,
    }
refs = sorted({m['referenceId'] for m in meta_out.values() if m['referenceId']})
names = {}
for r in refs:
    names[r] = LIST[r]['name'] if r in LIST else None
for m in meta_out.values():
    if m['referenceId']: m['referenceName'] = names.get(m['referenceId'])
# Reference stations of the subordinate ones: highs, lows and hourly heights, used by
# build-sky.mjs to give each subordinate curve the shape of its reference (engine/subordinate.ts).
os.makedirs(os.path.join(CACHE, 'ref'), exist_ok=True)
for r in refs:
    b, e = BEGIN.replace('-', ''), END.replace('-', '')
    base = f'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&application={APP}&begin_date={b}&end_date={e}&datum=MLLW&station={r}&time_zone=gmt&units=english&format=json'
    hl = get(base + '&interval=hilo', f'{r}-hilo-{b}-{e}.json')['predictions']
    hp = get(base + '&interval=h', f'{r}-hourly-{b}-{e}.json')['predictions']
    ts = lambda x: int(dt.datetime.strptime(x, '%Y-%m-%d %H:%M').replace(tzinfo=dt.timezone.utc).timestamp() // 60)
    json.dump({'events': [[ts(p['t']), round(float(p['v']), 2), 1 if p['type'] == 'H' else 0] for p in hl],
               'hourly': {'t0': ts(hp[0]['t']), 'v': [round(float(x['v']) * 100) for x in hp]}},
              open(os.path.join(CACHE, 'ref', f'{r}.json'), 'w'))
json.dump({'retrieved_at': dt.date.today().isoformat(), 'begin': BEGIN, 'end': END, 'stations': meta_out},
          open(os.path.join(ROOT, 'scripts/data/noaa-stations.json'), 'w'), indent=1)
print(len(meta_out), 'stations written')
