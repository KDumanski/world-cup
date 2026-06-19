// ============================================================================
// WORLD CUP 2026 — HOST CITIES + "TASTE OF HOME" FAN GUIDE DATA
// ----------------------------------------------------------------------------
// The 16 host cities across the USA, Canada & Mexico, their official venues,
// and curated local spots where visiting fans can find a taste of home —
// restaurants, bars, cultural hubs and neighborhoods tied to the nations
// that travel for the tournament.
//
// Venue facts (stadium, capacity, city) are public record. The "spots" are a
// curated seed set — real, well-known establishments where possible — built to
// be expanded city-by-city over time. Treat `spots` as editorial data, not a
// live business directory.
// ============================================================================

export const COUNTRY_META = {
  USA: { flag: '🇺🇸', label: 'United States' },
  CAN: { flag: '🇨🇦', label: 'Canada' },
  MEX: { flag: '🇲🇽', label: 'Mexico' },
};

// Spot categories — mirror the stoop history color-coding pattern: each
// category has a stable color + glyph so cards read at a glance.
export const SPOT_CATEGORIES = {
  Restaurant: { color: '#e63946', glyph: 'restaurant' },
  Bar: { color: '#f4a261', glyph: 'bar' },
  Cafe: { color: '#8d6e63', glyph: 'cafe' },
  Market: { color: '#2a9d8f', glyph: 'market' },
  Cultural: { color: '#7c4dff', glyph: 'cultural' },
  Neighborhood: { color: '#4895ef', glyph: 'neighborhood' },
};

// Helper used by pages — group a city's spots by the visiting nation.
export function spotsByNation(city) {
  const map = new Map();
  for (const s of city.spots || []) {
    if (!map.has(s.nation)) map.set(s.nation, []);
    map.get(s.nation).push(s);
  }
  return [...map.entries()].map(([nation, spots]) => ({ nation, spots }));
}

export const CITIES = [
  // ===================== UNITED STATES =====================
  {
    slug: 'new-york-new-jersey',
    name: 'New York / New Jersey',
    country: 'USA',
    region: 'East Coast',
    lat: 40.8135,
    lng: -74.0745,
    tagline: 'The final, and the most diasporic city on earth.',
    blurb:
      'MetLife Stadium hosts the 2026 World Cup Final. No metro area on the planet packs more nations into more neighborhoods — almost every visiting fan can find their own corner here.',
    venue: {
      name: 'MetLife Stadium',
      location: 'East Rutherford, NJ',
      capacity: 82500,
      matches: 'Group stage → Final',
      note: 'Hosts the World Cup Final on July 19, 2026.',
    },
    spots: [
      { nation: 'Brazil', flag: '🇧🇷', name: 'Casa Brasil / Ironbound', category: 'Neighborhood', area: 'Newark, NJ', note: 'The Ironbound is the densest Brazilian-Portuguese enclave in the US — churrascarias, padarias and bars on every block.' },
      { nation: 'Portugal', flag: '🇵🇹', name: 'Ironbound District', category: 'Neighborhood', area: 'Newark, NJ', note: 'Ferry Street is lined with Portuguese seafood houses and pastelarias; the heart of the East Coast Portuguese community.' },
      { nation: 'Italy', flag: '🇮🇹', name: 'Arthur Avenue', category: 'Neighborhood', area: 'The Bronx', note: 'The "real Little Italy" — old-world salumerie, fresh pasta shops and trattorias far from the tourist crowds.' },
      { nation: 'Korea Republic', flag: '🇰🇷', name: 'Koreatown (32nd St)', category: 'Neighborhood', area: 'Midtown Manhattan', note: '24-hour Korean BBQ, karaoke and bakeries packed into one floodlit block.' },
      { nation: 'Mexico', flag: '🇲🇽', name: 'Jackson Heights / Corona', category: 'Neighborhood', area: 'Queens', note: 'Roosevelt Avenue taquerias and Mexican bakeries under the 7 train.' },
      { nation: 'Ghana', flag: '🇬🇭', name: 'Little Accra', category: 'Neighborhood', area: 'The Bronx', note: 'West African groceries, jollof spots and the largest Ghanaian community in the US.' },
    ],
  },
  {
    slug: 'los-angeles',
    name: 'Los Angeles',
    country: 'USA',
    region: 'West Coast',
    lat: 33.9534,
    lng: -118.3392,
    tagline: 'A different nation on every boulevard.',
    blurb:
      'SoFi Stadium anchors a city built by immigration — Koreatown, Little Tokyo, Thai Town, Tehrangeles and the largest Mexican population outside Mexico City all sit minutes apart.',
    venue: {
      name: 'SoFi Stadium',
      location: 'Inglewood, CA',
      capacity: 70000,
      matches: 'Group stage → Knockouts',
      note: 'One of the marquee US venues for 2026.',
    },
    spots: [
      { nation: 'Korea Republic', flag: '🇰🇷', name: 'Koreatown', category: 'Neighborhood', area: 'Central LA', note: 'The largest Koreatown in the US — BBQ, soju bars and 24-hour spas across dozens of blocks.' },
      { nation: 'Mexico', flag: '🇲🇽', name: 'Mariachi Plaza / Boyle Heights', category: 'Neighborhood', area: 'East LA', note: 'Live mariachi, birria and the cultural heart of Mexican LA.' },
      { nation: 'Iran', flag: '🇮🇷', name: 'Tehrangeles (Westwood)', category: 'Neighborhood', area: 'Westwood Blvd', note: 'The largest Persian community outside Iran — kebab houses, bakeries and tea rooms.' },
      { nation: 'Japan', flag: '🇯🇵', name: 'Little Tokyo', category: 'Neighborhood', area: 'Downtown LA', note: 'Historic ramen, izakaya and Japanese markets steps from the arena district.' },
      { nation: 'Thailand', flag: '🇹🇭', name: 'Thai Town', category: 'Neighborhood', area: 'East Hollywood', note: 'The only officially designated Thai Town in the US.' },
      { nation: 'Brazil', flag: '🇧🇷', name: 'Café Brasil', category: 'Restaurant', area: 'Palms', note: 'Long-running Brazilian kitchen for feijoada and a game-day crowd.' },
    ],
  },
  {
    slug: 'miami',
    name: 'Miami',
    country: 'USA',
    region: 'Southeast',
    lat: 25.958,
    lng: -80.2389,
    tagline: 'The capital of Latin America in the US.',
    blurb:
      'Hard Rock Stadium sits in a city that breathes Spanish and Portuguese. For South American fans, Miami is the closest thing to home in North America.',
    venue: {
      name: 'Hard Rock Stadium',
      location: 'Miami Gardens, FL',
      capacity: 65000,
      matches: 'Group stage → Knockouts',
      note: 'Hosts multiple knockout-round matches.',
    },
    spots: [
      { nation: 'Cuba', flag: '🇨🇺', name: 'Little Havana / Calle Ocho', category: 'Neighborhood', area: 'SW 8th Street', note: 'Cafecito windows, cigar rollers and domino park — the soul of Cuban Miami.' },
      { nation: 'Argentina', flag: '🇦🇷', name: 'Graziano\'s / Buenos Aires bakeries', category: 'Restaurant', area: 'Doral & Coral Gables', note: 'Doral is so Argentine it\'s nicknamed "Doralzuela / Little Buenos Aires" — parrillas and medialunas everywhere.' },
      { nation: 'Colombia', flag: '🇨🇴', name: 'Colombian Doral', category: 'Neighborhood', area: 'Doral', note: 'Bandeja paisa, arepas and a huge Colombian fan base.' },
      { nation: 'Brazil', flag: '🇧🇷', name: 'Brazilian Aventura / Pompano', category: 'Neighborhood', area: 'North Miami', note: 'Churrascarias and açaí bowls for one of the largest Brazilian communities in the US.' },
      { nation: 'Venezuela', flag: '🇻🇪', name: 'Doralzuela arepa spots', category: 'Restaurant', area: 'Doral', note: 'The epicenter of the Venezuelan diaspora — arepas and cachapas around the clock.' },
      { nation: 'Haiti', flag: '🇭🇹', name: 'Little Haiti', category: 'Neighborhood', area: 'NE Miami', note: 'Griot, the Caribbean Marketplace and Haitian Creole everywhere.' },
    ],
  },
  {
    slug: 'dallas',
    name: 'Dallas',
    country: 'USA',
    region: 'South Central',
    lat: 32.7473,
    lng: -97.0945,
    tagline: 'Most matches of any 2026 host city.',
    blurb:
      'AT&T Stadium in Arlington hosts more games than anywhere else in the tournament. The metroplex blends a deep Mexican heritage with fast-growing Asian and African communities.',
    venue: {
      name: 'AT&T Stadium',
      location: 'Arlington, TX',
      capacity: 80000,
      matches: 'Group stage → Semi-final',
      note: 'Scheduled to host the most matches of any 2026 venue, including a semi-final.',
    },
    spots: [
      { nation: 'Mexico', flag: '🇲🇽', name: 'Oak Cliff / Jefferson Blvd', category: 'Neighborhood', area: 'Dallas', note: 'Taquerias, panaderias and the cultural heart of Mexican Dallas.' },
      { nation: 'Korea Republic', flag: '🇰🇷', name: 'Koreatown (Royal Lane)', category: 'Neighborhood', area: 'NW Dallas', note: 'Korean BBQ and the largest H Mart in the region.' },
      { nation: 'Vietnam', flag: '🇻🇳', name: 'Asia Times Square', category: 'Market', area: 'Grand Prairie', note: 'Vietnamese food court, lunar markets and pho near the stadium.' },
      { nation: 'Nigeria', flag: '🇳🇬', name: 'African groceries / South Arlington', category: 'Neighborhood', area: 'Arlington', note: 'West African restaurants and a growing Nigerian fan community minutes from AT&T Stadium.' },
      { nation: 'India', flag: '🇮🇳', name: 'MacArthur Blvd (Irving)', category: 'Neighborhood', area: 'Irving', note: 'South Asian restaurants and grocers clustered around Las Colinas.' },
    ],
  },
  {
    slug: 'atlanta',
    name: 'Atlanta',
    country: 'USA',
    region: 'Southeast',
    lat: 33.7554,
    lng: -84.4008,
    tagline: 'Buford Highway: the most international road in the South.',
    blurb:
      'Mercedes-Benz Stadium is one of the busiest 2026 venues. A few miles north, Buford Highway is a 30-block ribbon of Korean, Vietnamese, Mexican and Ethiopian kitchens.',
    venue: {
      name: 'Mercedes-Benz Stadium',
      location: 'Atlanta, GA',
      capacity: 71000,
      matches: 'Group stage → Semi-final',
      note: 'One of the venues hosting a semi-final.',
    },
    spots: [
      { nation: 'Korea Republic', flag: '🇰🇷', name: 'Buford Highway / Duluth', category: 'Neighborhood', area: 'NE Atlanta', note: 'Metro Atlanta has one of the fastest-growing Korean communities in the US — BBQ and H Mart hubs in Duluth.' },
      { nation: 'Mexico', flag: '🇲🇽', name: 'Plaza Fiesta', category: 'Market', area: 'Buford Highway', note: 'An indoor Mexican mercado — taquerias, paleterias and soccer jerseys.' },
      { nation: 'Vietnam', flag: '🇻🇳', name: 'Pho dives on Buford Hwy', category: 'Restaurant', area: 'Buford Highway', note: 'Some of the best Vietnamese food in the South.' },
      { nation: 'Ethiopia', flag: '🇪🇹', name: 'Clarkston', category: 'Neighborhood', area: 'East of Atlanta', note: '"The most diverse square mile in America" — Ethiopian, Eritrean and East African kitchens.' },
      { nation: 'Nigeria', flag: '🇳🇬', name: 'West African Stone Mountain', category: 'Neighborhood', area: 'Stone Mountain', note: 'Jollof, suya and one of the South\'s largest Nigerian communities.' },
    ],
  },
  {
    slug: 'houston',
    name: 'Houston',
    country: 'USA',
    region: 'South Central',
    lat: 29.6847,
    lng: -95.4107,
    tagline: 'The most diverse big city in America.',
    blurb:
      'NRG Stadium sits in a metro routinely ranked the most ethnically diverse in the US — a vast Mexican community alongside the largest Nigerian, Vietnamese and Salvadoran populations in the South.',
    venue: {
      name: 'NRG Stadium',
      location: 'Houston, TX',
      capacity: 72000,
      matches: 'Group stage → Knockouts',
      note: 'Climate-controlled, retractable-roof venue.',
    },
    spots: [
      { nation: 'Mexico', flag: '🇲🇽', name: 'East End / Magnolia Park', category: 'Neighborhood', area: 'East Houston', note: 'Historic Mexican-American barrio — taquerias, paleterias and game-day cantinas.' },
      { nation: 'Vietnam', flag: '🇻🇳', name: 'Bellaire Blvd (Asiatown)', category: 'Neighborhood', area: 'SW Houston', note: 'One of the largest Vietnamese communities in the US — pho, banh mi and bubble tea for miles.' },
      { nation: 'Nigeria', flag: '🇳🇬', name: 'Southwest Houston', category: 'Neighborhood', area: 'Alief / SW', note: 'The largest Nigerian population in the US — suya joints and jollof spots.' },
      { nation: 'El Salvador', flag: '🇸🇻', name: 'Pupuserías (Long Point)', category: 'Restaurant', area: 'Spring Branch', note: 'Salvadoran pupusas and horchata in one of the biggest Central American communities in Texas.' },
      { nation: 'India', flag: '🇮🇳', name: 'Mahatma Gandhi District', category: 'Neighborhood', area: 'Hillcroft', note: 'South Asian sweets, sari shops and biryani along Hillcroft Avenue.' },
    ],
  },
  {
    slug: 'kansas-city',
    name: 'Kansas City',
    country: 'USA',
    region: 'Midwest',
    lat: 39.0489,
    lng: -94.4839,
    tagline: 'Heartland barbecue meets a global fan crossroads.',
    blurb:
      'Arrowhead Stadium brings the World Cup to America\'s heartland. KC\'s historic Mexican West Side and a growing East African community give traveling fans more home cooking than the skyline suggests.',
    venue: {
      name: 'Arrowhead Stadium',
      location: 'Kansas City, MO',
      capacity: 76000,
      matches: 'Group stage → Knockouts',
      note: 'Branded "Kansas City Stadium" for the tournament.',
    },
    spots: [
      { nation: 'Mexico', flag: '🇲🇽', name: 'Westside / Southwest Blvd', category: 'Neighborhood', area: 'KC, MO', note: 'KC\'s historic Mexican district — taquerias and panaderias along Southwest Boulevard.' },
      { nation: 'Italy', flag: '🇮🇹', name: 'Columbus Park', category: 'Neighborhood', area: 'Downtown KC', note: 'KC\'s Little Italy — old-school red-sauce houses and Italian groceries.' },
      { nation: 'Somalia', flag: '🇸🇴', name: 'East African restaurants', category: 'Restaurant', area: 'Northeast KC', note: 'Somali and East African cafes serving a fast-growing community.' },
      { nation: 'Vietnam', flag: '🇻🇳', name: 'Columbus Park pho', category: 'Restaurant', area: 'River Market', note: 'Vietnamese kitchens clustered around the City Market.' },
    ],
  },
  {
    slug: 'philadelphia',
    name: 'Philadelphia',
    country: 'USA',
    region: 'East Coast',
    lat: 39.9008,
    lng: -75.1675,
    tagline: 'Italian Market roots, a global Independence-Day stage.',
    blurb:
      'Lincoln Financial Field hosts matches around the July 4 weekend in the city where the US was founded. Philly\'s Italian Market is the oldest in the country, with Mexican and Vietnamese kitchens now woven in.',
    venue: {
      name: 'Lincoln Financial Field',
      location: 'Philadelphia, PA',
      capacity: 69000,
      matches: 'Group stage → Knockouts',
      note: 'Hosts matches over the US Independence Day weekend.',
    },
    spots: [
      { nation: 'Italy', flag: '🇮🇹', name: '9th Street Italian Market', category: 'Market', area: 'South Philly', note: 'The oldest continuously operating outdoor market in the US — cheese, cured meats and trattorias.' },
      { nation: 'Mexico', flag: '🇲🇽', name: 'El Centro de Oro / Italian Market', category: 'Neighborhood', area: 'South Philly', note: 'A thriving Mexican community now anchors the south end of the Italian Market.' },
      { nation: 'Vietnam', flag: '🇻🇳', name: 'Washington Avenue', category: 'Neighborhood', area: 'South Philly', note: 'Vietnamese plazas, pho houses and banh mi along Washington Ave.' },
      { nation: 'Ireland', flag: '🇮🇪', name: 'Irish pubs (Center City)', category: 'Bar', area: 'Center City', note: 'Classic Irish bars to watch the match with a pint.' },
    ],
  },
  {
    slug: 'san-francisco-bay-area',
    name: 'San Francisco Bay Area',
    country: 'USA',
    region: 'West Coast',
    lat: 37.403,
    lng: -121.9697,
    tagline: 'The Pacific Rim\'s American doorstep.',
    blurb:
      'Levi\'s Stadium in Santa Clara sits between the oldest Chinatown in North America and one of the largest Vietnamese, Filipino and Mexican communities on the West Coast.',
    venue: {
      name: "Levi's Stadium",
      location: 'Santa Clara, CA',
      capacity: 68500,
      matches: 'Group stage → Knockouts',
      note: 'Branded "San Francisco Bay Area Stadium" for 2026.',
    },
    spots: [
      { nation: 'Vietnam', flag: '🇻🇳', name: 'Little Saigon (San Jose)', category: 'Neighborhood', area: 'San Jose', note: 'One of the largest Vietnamese populations of any US city — pho, banh mi and Grand Century Mall.' },
      { nation: 'China PR', flag: '🇨🇳', name: 'SF Chinatown', category: 'Neighborhood', area: 'San Francisco', note: 'The oldest Chinatown in North America — dim sum and tea houses.' },
      { nation: 'Mexico', flag: '🇲🇽', name: 'Mission District', category: 'Neighborhood', area: 'San Francisco', note: 'Birthplace of the Mission burrito — taquerias and murals throughout.' },
      { nation: 'Philippines', flag: '🇵🇭', name: 'Daly City / Filipino Bay Area', category: 'Neighborhood', area: 'Daly City', note: 'Often called "the Pinoy capital of the US" — lumpia, lechon and turo-turo.' },
      { nation: 'Japan', flag: '🇯🇵', name: 'Japantown (Nihonmachi)', category: 'Neighborhood', area: 'San Francisco', note: 'One of only three historic Japantowns left in the US.' },
    ],
  },
  {
    slug: 'seattle',
    name: 'Seattle',
    country: 'USA',
    region: 'Pacific Northwest',
    lat: 47.5952,
    lng: -122.3316,
    tagline: 'Coffee, salmon and a Pacific-Rim soul.',
    blurb:
      'Lumen Field is one of the loudest stadiums in world sport. The Chinatown-International District blends Chinese, Japanese, Vietnamese and Filipino communities in a few walkable blocks.',
    venue: {
      name: 'Lumen Field',
      location: 'Seattle, WA',
      capacity: 69000,
      matches: 'Group stage → Knockouts',
      note: 'Renowned for its crowd noise; branded "Seattle Stadium" for 2026.',
    },
    spots: [
      { nation: 'Vietnam', flag: '🇻🇳', name: 'Little Saigon (CID)', category: 'Neighborhood', area: 'Chinatown-Intl District', note: 'Pho, banh mi and Vietnamese groceries in the International District.' },
      { nation: 'Japan', flag: '🇯🇵', name: 'Japantown / Maneki', category: 'Restaurant', area: 'CID', note: 'Maneki has served sushi in Seattle\'s Japantown since 1904.' },
      { nation: 'Mexico', flag: '🇲🇽', name: 'White Center / South Park', category: 'Neighborhood', area: 'South Seattle', note: 'Taquerias and Mexican markets south of downtown.' },
      { nation: 'Ethiopia', flag: '🇪🇹', name: 'Rainier Valley', category: 'Neighborhood', area: 'South Seattle', note: 'A large East African community — Ethiopian and Eritrean restaurants on MLK Way.' },
    ],
  },
  {
    slug: 'boston',
    name: 'Boston',
    country: 'USA',
    region: 'New England',
    lat: 42.0909,
    lng: -71.2643,
    tagline: 'The North End, and a deep Irish soul.',
    blurb:
      'Gillette Stadium in Foxborough serves all of New England. Boston\'s North End is one of America\'s great Italian quarters, and few cities celebrate their Irish roots harder.',
    venue: {
      name: 'Gillette Stadium',
      location: 'Foxborough, MA',
      capacity: 65000,
      matches: 'Group stage → Knockouts',
      note: 'Branded "Boston Stadium" for the tournament.',
    },
    spots: [
      { nation: 'Italy', flag: '🇮🇹', name: 'The North End', category: 'Neighborhood', area: 'Boston', note: 'Boston\'s Little Italy — cannoli rivalries, fresh pasta and feast-day processions.' },
      { nation: 'Ireland', flag: '🇮🇪', name: 'Irish pubs (Southie & Dorchester)', category: 'Bar', area: 'South Boston', note: 'One of the most Irish cities in America — proper pubs for match day.' },
      { nation: 'Portugal', flag: '🇵🇹', name: 'Portuguese Cambridge / Fall River', category: 'Neighborhood', area: 'Greater Boston', note: 'Strong Portuguese and Cape Verdean communities with bakeries and seafood houses.' },
      { nation: 'Brazil', flag: '🇧🇷', name: 'Framingham / Allston', category: 'Neighborhood', area: 'MetroWest', note: 'New England has one of the densest Brazilian populations in the US.' },
    ],
  },

  // ===================== MEXICO =====================
  {
    slug: 'mexico-city',
    name: 'Mexico City',
    country: 'MEX',
    region: 'Central Mexico',
    lat: 19.3029,
    lng: -99.1505,
    tagline: 'The opening match, in a true cathedral of football.',
    blurb:
      'The Estadio Azteca hosts the World Cup opener — the first stadium ever to stage three World Cups. A vast, cosmopolitan capital with established Lebanese, Spanish, Japanese and Korean communities to welcome visiting fans.',
    venue: {
      name: 'Estadio Azteca',
      location: 'Mexico City, MEX',
      capacity: 87000,
      matches: 'Opening match → Knockouts',
      note: 'Hosts the opening match; first venue to stage three World Cups (1970, 1986, 2026).',
    },
    spots: [
      { nation: 'Lebanon', flag: '🇱🇧', name: 'Polanco Lebanese tables', category: 'Restaurant', area: 'Polanco', note: 'Mexico City\'s Lebanese community gave the country tacos al pastor — find the original shawarma roots in Polanco.' },
      { nation: 'Spain', flag: '🇪🇸', name: 'Centro Asturiano / Spanish cantinas', category: 'Cultural', area: 'Centro & Condesa', note: 'A deep Spanish heritage — social clubs, jamón and Iberian wine bars across the city.' },
      { nation: 'Japan', flag: '🇯🇵', name: 'Little Tokyo (Zona Rosa)', category: 'Neighborhood', area: 'Zona Rosa', note: 'Ramen, izakaya and Japanese grocers cluster in the Zona Rosa.' },
      { nation: 'Korea Republic', flag: '🇰🇷', name: 'Pequeño Seúl (Zona Rosa)', category: 'Neighborhood', area: 'Zona Rosa', note: 'Mexico City\'s Koreatown — BBQ, karaoke and Korean markets blocks from Reforma.' },
      { nation: 'Argentina', flag: '🇦🇷', name: 'Condesa parrillas', category: 'Restaurant', area: 'Condesa & Roma', note: 'Argentine steakhouses and empanadas for the large Sudamericano community.' },
      { nation: 'USA', flag: '🇺🇸', name: 'Condesa & Roma cafés', category: 'Cafe', area: 'Roma Norte', note: 'A booming American expat scene — specialty coffee, craft beer and sports bars showing every match.' },
    ],
  },
  {
    slug: 'guadalajara',
    name: 'Guadalajara',
    country: 'MEX',
    region: 'Western Mexico',
    lat: 20.6816,
    lng: -103.4628,
    tagline: 'The most Mexican of cities — tequila, mariachi, fútbol.',
    blurb:
      'Estadio Akron in Zapopan is the home of Chivas, one of Mexico\'s most beloved clubs. Guadalajara is the birthplace of mariachi and tequila, with a warm, growing expat scene.',
    venue: {
      name: 'Estadio Akron',
      location: 'Zapopan, Jalisco',
      capacity: 48000,
      matches: 'Group stage → Round of 32',
      note: 'Home of C.D. Guadalajara (Chivas).',
    },
    spots: [
      { nation: 'Mexico', flag: '🇲🇽', name: 'Tlaquepaque & Centro', category: 'Cultural', area: 'Guadalajara', note: 'Mariachi plazas, birria de res and the cradle of tequila country — the home-nation heartland.' },
      { nation: 'USA', flag: '🇺🇸', name: 'Providencia & Chapultepec', category: 'Cafe', area: 'Guadalajara', note: 'A fast-growing American & Canadian expat scene with cafés and sports bars along Avenida Chapultepec.' },
      { nation: 'Japan', flag: '🇯🇵', name: 'Japanese kitchens (Providencia)', category: 'Restaurant', area: 'Providencia', note: 'Guadalajara\'s tech corridor has drawn Japanese restaurants and a small community.' },
      { nation: 'Spain', flag: '🇪🇸', name: 'Spanish tapas (Lafayette)', category: 'Restaurant', area: 'Colonia Lafayette', note: 'Iberian tapas bars in the trendy Lafayette district.' },
    ],
  },
  {
    slug: 'monterrey',
    name: 'Monterrey',
    country: 'MEX',
    region: 'Northern Mexico',
    lat: 25.6692,
    lng: -100.2444,
    tagline: 'Mountains, machaca and a US-border crossroads.',
    blurb:
      'Estadio BBVA — "El Gigante de Acero" — sits beneath the Cerro de la Silla. Monterrey is Mexico\'s industrial powerhouse, closest host city to the US, with a strong American business and Korean manufacturing presence.',
    venue: {
      name: 'Estadio BBVA',
      location: 'Guadalupe, Nuevo León',
      capacity: 53500,
      matches: 'Group stage → Round of 32',
      note: 'Home of C.F. Monterrey (Rayados); famed mountain backdrop.',
    },
    spots: [
      { nation: 'Mexico', flag: '🇲🇽', name: 'Barrio Antiguo', category: 'Cultural', area: 'Monterrey Centro', note: 'Cabrito, machaca and the regio nightlife district — the home-nation core.' },
      { nation: 'USA', flag: '🇺🇸', name: 'San Pedro Garza García', category: 'Cafe', area: 'San Pedro', note: 'Mexico\'s wealthiest district draws a large American expat and business community — steakhouses and sports bars.' },
      { nation: 'Korea Republic', flag: '🇰🇷', name: 'Korean kitchens (manufacturing belt)', category: 'Restaurant', area: 'Greater Monterrey', note: 'Kia and supplier plants brought a Korean community and authentic BBQ to the region.' },
      { nation: 'Spain', flag: '🇪🇸', name: 'Casino / Spanish clubs', category: 'Cultural', area: 'San Pedro', note: 'Long-standing Spanish social and dining clubs.' },
    ],
  },

  // ===================== CANADA =====================
  {
    slug: 'toronto',
    name: 'Toronto',
    country: 'CAN',
    region: 'Ontario',
    lat: 43.6332,
    lng: -79.4185,
    tagline: 'The most multicultural city on earth.',
    blurb:
      'BMO Field hosts Canada\'s opening matches. More than half of Torontonians were born outside the country — Little Italy, Little Portugal, Koreatown, Greektown and Little India all within reach.',
    venue: {
      name: 'BMO Field',
      location: 'Toronto, ON',
      capacity: 45000,
      matches: 'Canada opener → Group stage',
      note: 'Expanded for 2026; home of Toronto FC.',
    },
    spots: [
      { nation: 'Italy', flag: '🇮🇹', name: 'Little Italy (College St)', category: 'Neighborhood', area: 'Downtown', note: 'Espresso bars and trattorias that erupt when the Azzurri play.' },
      { nation: 'Portugal', flag: '🇵🇹', name: 'Little Portugal (Dundas W)', category: 'Neighborhood', area: 'West End', note: 'Custard tarts, churrasqueiras and one of the largest Portuguese communities in North America.' },
      { nation: 'Greece', flag: '🇬🇷', name: 'Greektown (the Danforth)', category: 'Neighborhood', area: 'East End', note: 'Souvlaki and the famous Taste of the Danforth festival.' },
      { nation: 'Korea Republic', flag: '🇰🇷', name: 'Koreatown (Bloor St)', category: 'Neighborhood', area: 'Bloor West', note: 'Korean BBQ and karaoke along Bloor Street.' },
      { nation: 'India', flag: '🇮🇳', name: 'Little India (Gerrard St)', category: 'Neighborhood', area: 'East End', note: 'South Asian sweets, sari shops and biryani along Gerrard.' },
      { nation: 'Jamaica', flag: '🇯🇲', name: 'Little Jamaica (Eglinton W)', category: 'Neighborhood', area: 'Eglinton West', note: 'Jerk chicken, patties and reggae on "Reggae Lane".' },
    ],
  },
  {
    slug: 'vancouver',
    name: 'Vancouver',
    country: 'CAN',
    region: 'British Columbia',
    lat: 49.2768,
    lng: -123.1119,
    tagline: 'Where the Pacific Rim meets the Rockies.',
    blurb:
      'BC Place hosts Canada\'s western matches. Vancouver has one of the largest Asian-Canadian populations on the continent — a historic Chinatown, plus thriving Punjabi, Filipino and Japanese communities.',
    venue: {
      name: 'BC Place',
      location: 'Vancouver, BC',
      capacity: 54000,
      matches: 'Group stage → Round of 32',
      note: 'Retractable-roof downtown stadium.',
    },
    spots: [
      { nation: 'China PR', flag: '🇨🇳', name: 'Chinatown & Richmond', category: 'Neighborhood', area: 'Vancouver / Richmond', note: 'Richmond is among the most Chinese cities outside Asia — dim sum, night markets and tea houses.' },
      { nation: 'India', flag: '🇮🇳', name: 'Punjabi Market (Little India)', category: 'Neighborhood', area: 'Main Street', note: 'Sikh sweets, samosas and one of the largest Punjabi communities in North America.' },
      { nation: 'Japan', flag: '🇯🇵', name: 'Powell Street (Japantown)', category: 'Neighborhood', area: 'Downtown Eastside', note: 'Historic Nihonmachi with izakaya and the Powell Street Festival.' },
      { nation: 'Philippines', flag: '🇵🇭', name: 'Filipino Joyce-Collingwood', category: 'Neighborhood', area: 'East Vancouver', note: 'Turo-turo eateries and Filipino markets in East Van.' },
      { nation: 'Korea Republic', flag: '🇰🇷', name: 'Robson Koreatown', category: 'Neighborhood', area: 'Downtown', note: 'Korean BBQ and cafés along Robson Street.' },
    ],
  },
];

export function getCity(slug) {
  return CITIES.find((c) => c.slug === slug) || null;
}

// Quick aggregate stats for the hero / landing strip.
export const STATS = {
  cities: CITIES.length,
  countries: 3,
  venues: CITIES.length,
  spots: CITIES.reduce((n, c) => n + (c.spots?.length || 0), 0),
};
