// ============================================================================
// MAP DATA — turns the editorial spots in cities.js into map-ready points.
// ----------------------------------------------------------------------------
// Each spot gets:
//   • coords    — an APPROXIMATE lat/lng placed near the city center. These are
//                 deterministic (seeded from the spot name) so pins are stable
//                 across reloads, but they are NOT surveyed street addresses —
//                 they're for visualizing clusters, to be replaced with real
//                 geocoded coordinates as the dataset is built out.
//   • type      — a human "kind of place" used by the typeahead filter
//                 (Restaurant, Bar / Pub, Social Club, Café, Market, …)
//   • hours     — display string + an `openNow` flag (seeded, illustrative)
//   • showingMatch — null, or { label, time } when the venue is showing a game
//                 (illustrative until tied to the official fixture list)
// ============================================================================

import { CITIES, SPOT_CATEGORIES } from './cities.js';

// Stable string hash → used to seed deterministic jitter & flags.
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0);
}
// 0..1 pseudo-random from a seed.
function rand(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Map a category to the searchable "type" labels the funnel offers.
// A spot can match more than one type word (e.g. a Bar is also a "watch spot").
const TYPE_FOR_CATEGORY = {
  Restaurant: { type: 'Restaurant', keywords: ['restaurant', 'food', 'eat', 'dining'] },
  Bar: { type: 'Bar / Pub', keywords: ['bar', 'pub', 'watch', 'drink', 'sports bar'] },
  Cafe: { type: 'Café / Bakery', keywords: ['cafe', 'café', 'coffee', 'bakery'] },
  Market: { type: 'Market / Grocer', keywords: ['market', 'grocer', 'grocery', 'shop'] },
  Cultural: { type: 'Cultural / Social Club', keywords: ['cultural', 'social club', 'club', 'community', 'center'] },
  Neighborhood: { type: 'Neighborhood', keywords: ['neighborhood', 'district', 'area'] },
};

// Illustrative hours sets, chosen deterministically per spot.
const HOURS = [
  { display: '11 AM – 11 PM', open: true },
  { display: '8 AM – 10 PM', open: true },
  { display: '12 PM – 12 AM', open: true },
  { display: '5 PM – 2 AM', open: false },
  { display: '7 AM – 6 PM', open: false },
  { display: 'Open 24 hours', open: true },
];

// A few illustrative fixtures used to flag "showing the match" venues. In the
// real app this comes from the official schedule joined to each venue.
const FIXTURES = [
  { label: 'BRA vs SRB', time: 'Today 2:00 PM' },
  { label: 'KOR vs GHA', time: 'Today 5:00 PM' },
  { label: 'MEX vs POL', time: 'Today 8:00 PM' },
  { label: 'ITA vs URU', time: 'Tomorrow 12:00 PM' },
  { label: 'POR vs GHA', time: 'Today 11:00 AM' },
];

// Build the flat list of map-ready spots for one city.
export function citySpots(city) {
  const out = [];
  (city.spots || []).forEach((s, i) => {
    const seed = hash(city.slug + '|' + s.nation + '|' + s.name + '|' + i);
    const catInfo = TYPE_FOR_CATEGORY[s.category] || TYPE_FOR_CATEGORY.Neighborhood;
    // Jitter within roughly a ~6km box around the city center. Neighborhoods
    // spread a little wider than single venues so they read as areas.
    const spread = s.category === 'Neighborhood' ? 0.075 : 0.05;
    const dLat = (rand(seed) - 0.5) * spread;
    const dLng = (rand(seed * 1.7 + 3) - 0.5) * spread * 1.3;
    const hours = HOURS[seed % HOURS.length];
    // ~40% of bars and ~20% of others are "showing a match" in this demo.
    const showChance = s.category === 'Bar' ? 0.6 : s.category === 'Restaurant' ? 0.35 : 0.15;
    const showing = rand(seed * 2.3 + 1) < showChance ? FIXTURES[seed % FIXTURES.length] : null;

    out.push({
      id: city.slug + '-' + i,
      name: s.name,
      nation: s.nation,
      flag: s.flag,
      category: s.category,
      color: (SPOT_CATEGORIES[s.category] || {}).color || '#888',
      type: catInfo.type,
      keywords: catInfo.keywords,
      area: s.area,
      note: s.note,
      lat: +(city.lat + dLat).toFixed(5),
      lng: +(city.lng + dLng).toFixed(5),
      hours: hours.display,
      openNow: hours.open,
      showingMatch: showing, // null | { label, time }
    });
  });
  return out;
}

// Distinct "types" present in a city, with counts — feeds the typeahead.
export function cityTypes(city) {
  const map = new Map();
  for (const s of citySpots(city)) {
    if (!map.has(s.type)) map.set(s.type, { type: s.type, color: s.color, count: 0 });
    map.get(s.type).count++;
  }
  return [...map.values()].sort((a, b) => b.count - a.count);
}

// Distinct nations present in a city, with flag + count — feeds the chips.
export function cityNations(city) {
  const map = new Map();
  for (const s of city.spots || []) {
    if (!map.has(s.nation)) map.set(s.nation, { nation: s.nation, flag: s.flag, count: 0 });
    map.get(s.nation).count++;
  }
  return [...map.values()].sort((a, b) => b.count - a.count);
}
