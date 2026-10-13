/** Formatting shared by the islands and the pages: feet with one decimal, the unit held to its number. */
const nf1 = new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const nf0 = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
/** "6.4 ft" (no-break space). */
export const ft = (h: number) => `${nf1.format(Math.abs(h) < 0.05 ? 0 : h)} ft`;
/** "6.4" */
export const ft1 = (h: number) => nf1.format(Math.abs(h) < 0.05 ? 0 : h);
export const int = (n: number) => nf0.format(n);
/** "12 mi" */
export const miles = (m: number) => `${nf0.format(m)} mi`;
/** Time-zone label for a station zone. */
export function zoneLabel(tz: string): string {
  return ({ 'America/New_York': 'Eastern Time', 'America/Chicago': 'Central Time', 'America/Los_Angeles': 'Pacific Time', 'America/Anchorage': 'Alaska Time', 'Pacific/Honolulu': 'Hawaii Time' } as Record<string, string>)[tz] ?? tz;
}
/** Great-circle distance in miles. */
export function distMi(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const r = Math.PI / 180, R = 3958.8;
  const dLat = (b.lat - a.lat) * r, dLng = (b.lng - a.lng) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
