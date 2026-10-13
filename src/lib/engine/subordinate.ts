/**
 * Curve of a subordinate station. NOAA predicts its highs and lows by correcting those of a
 * reference station (time and height offsets) and publishes nothing in between. Rather than a
 * plain cosine, the site borrows the shape of the reference station's real curve: each rise or
 * fall at the subordinate station is the matching rise or fall of the reference, stretched in time
 * and rescaled in height so that it starts and ends exactly on NOAA's subordinate high and low.
 * tests/tide.test.ts checks the method on a pair of reference stations (La Jolla rebuilt from San
 * Diego) against NOAA's 6-minute predictions.
 */
import { model, heightAt, type Ev, type Hourly } from './tide.ts';

/** For each subordinate event, the reference event of the same kind closest in time (±8 h), or null. */
function match(sub: Ev[], ref: Ev[]): Array<Ev | null> {
  let j = 0;
  return sub.map((e) => {
    while (j < ref.length - 1 && ref[j + 1][0] <= e[0]) j++;
    let best: Ev | null = null, bd = Infinity;
    for (let k = Math.max(0, j - 3); k < Math.min(ref.length, j + 4); k++) {
      const r = ref[k];
      if (r[2] !== e[2]) continue;
      const d = Math.abs(r[0] - e[0]);
      if (d < bd && d <= 480) { bd = d; best = r; }
    }
    return best;
  });
}

/** Hourly heights (hundredths of a foot) for a subordinate station, shaped on its reference. */
export function shapedHourly(sub: Ev[], ref: Ev[], refHourly: Hourly): Hourly {
  const R = model(ref, refHourly);
  const pair = match(sub, ref);
  const t0 = Math.ceil(sub[0][0] / 60) * 60, tEnd = sub[sub.length - 1][0];
  const v: number[] = [];
  let i = 0;
  for (let t = t0; t <= tEnd; t += 60) {
    while (i < sub.length - 2 && sub[i + 1][0] <= t) i++;
    const a = sub[i], b = sub[i + 1], ra = pair[i], rb = pair[i + 1];
    let h: number | null = null;
    if (ra && rb && rb[0] > ra[0] && ra[1] !== rb[1]) {
      const u = (t - a[0]) / (b[0] - a[0]);
      const hr = heightAt(R, ra[0] + u * (rb[0] - ra[0]));
      if (hr !== null) h = a[1] + (b[1] - a[1]) * ((hr - ra[1]) / (rb[1] - ra[1]));
    }
    if (h === null) h = (a[1] + b[1]) / 2 + ((a[1] - b[1]) / 2) * Math.cos(Math.PI * ((t - a[0]) / (b[0] - a[0])));
    v.push(Math.round(h * 100));
  }
  return { t0, v };
}
