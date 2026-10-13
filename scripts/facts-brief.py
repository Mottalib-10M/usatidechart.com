#!/usr/bin/env python3
"""Résumé lisible des fiches de faits (research/facts) pour les rédacteurs : python3 scripts/facts-brief.py maine massachusetts"""
import json, glob, os, sys
LIST = {x['id']: x['name'] for x in json.load(open('.cache-raw/stations-tidepredictions.json'))['stations']}
for st in sys.argv[1:]:
    for f in sorted(glob.glob(f'research/facts/{st}/*.json')):
        d = json.load(open(f)); s = d['stats']
        print(f"## {d['key']} | {d['noaaName']} ({d['id']} {d['type']}{' ref '+str(d['referenceName']) if d['referenceName'] else ''}) | {s['tideType']} mean {s['meanRange']} spring {s['springRange']} neap {s['neapRange']} ineqH {s['highInequality']} 1H {s['oneHighShare']} | max {s['maxHigh']['h']} {s['maxHigh']['date']} | min {s['minLow']['h']} {s['minLow']['date']} | negDays {s['negativeLowDays']}/{s['days']}")
        if d.get('offsets'): print('   own offsets:', d['offsets'])
        for n in d['nearbyNoaaStations'][:7]:
            o = n.get('offsets')
            os_ = f" ref {LIST.get(o['refStationId'], o['refStationId'])}: HW {o['timeOffsetHighTide']:+} min LW {o['timeOffsetLowTide']:+} min, h x{o['heightOffsetHighTide']}/{o['heightOffsetLowTide']} ({o['heightAdjustedType']})" if o else ''
            print(f"   - {n['name']} {n['type']} {n['miles']} mi {n['direction']}{os_}")
