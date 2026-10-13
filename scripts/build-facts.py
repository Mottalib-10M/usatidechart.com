#!/usr/bin/env python3
"""Fact pack for the writers of the station pages (research/facts/<state>/<slug>.json).

For each station of the site: its statistics (src/data/stations.json) and the other NOAA tide
prediction stations within 12 miles, with distance, bearing and, for subordinate stations,
NOAA's published time and height corrections. Nothing here is published as is: it is the
verified material the hand-written texts may draw on.
"""
import json, math, os, sys, time, urllib.request
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROOT, '.cache-raw')
LIST = {x['id']: x for x in json.load(open(os.path.join(CACHE, 'stations-tidepredictions.json')))['stations']}
REG = json.load(open(os.path.join(ROOT, 'src/data/stations.json')))['stations']

def get(url, name):
    p = os.path.join(CACHE, name)
    if os.path.exists(p): return json.load(open(p))
    for i in range(4):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'}), timeout=60) as r:
                d = json.loads(r.read()); json.dump(d, open(p, 'w')); time.sleep(0.2); return d
        except Exception as e:
            time.sleep(2 + i * 2)
    return None

def dist(a, b):
    r = math.pi / 180
    h = math.sin((b[0]-a[0])*r/2)**2 + math.cos(a[0]*r)*math.cos(b[0]*r)*math.sin((b[1]-a[1])*r/2)**2
    return 2 * 3958.8 * math.asin(math.sqrt(h))
def bearing(a, b):
    r = math.pi / 180
    y = math.sin((b[1]-a[1])*r) * math.cos(b[0]*r)
    x = math.cos(a[0]*r)*math.sin(b[0]*r) - math.sin(a[0]*r)*math.cos(b[0]*r)*math.cos((b[1]-a[1])*r)
    return ['N','NE','E','SE','S','SW','W','NW'][round(((math.degrees(math.atan2(y, x)) + 360) % 360) / 45) % 8]

for s in REG:
    here = (s['lat'], s['lng'])
    near = []
    for x in LIST.values():
        if x['id'] == s['id'] or x.get('lat') is None: continue
        d = dist(here, (x['lat'], x['lng']))
        if d <= 12:
            item = {'id': x['id'], 'name': x['name'], 'type': x['type'], 'miles': round(d, 1), 'direction': bearing(here, (x['lat'], x['lng']))}
            if x['type'] == 'S':
                o = get(f"https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/{x['id']}/tidepredoffsets.json", f"{x['id']}-offsets.json")
                if o: item['offsets'] = {k: o.get(k) for k in ('refStationId', 'timeOffsetHighTide', 'timeOffsetLowTide', 'heightOffsetHighTide', 'heightOffsetLowTide', 'heightAdjustedType')}
            near.append(item)
    near.sort(key=lambda i: i['miles'])
    out = {k: s[k] for k in ('key', 'place', 'id', 'noaaName', 'type', 'referenceId', 'referenceName', 'lat', 'lng', 'tz', 'offsets', 'datums', 'stats')}
    out['nearbyNoaaStations'] = near[:25]
    os.makedirs(os.path.join(ROOT, 'research/facts', s['state']), exist_ok=True)
    json.dump(out, open(os.path.join(ROOT, 'research/facts', f"{s['key']}.json"), 'w'), indent=1)
    sys.stdout.write('.'); sys.stdout.flush()
print()
