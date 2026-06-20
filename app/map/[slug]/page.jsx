import { CITIES, getCity } from '@/lib/cities';
import CityMap from '@/components/CityMap';

export function generateStaticParams() {
  return CITIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const city = getCity(params.slug);
  if (!city) return {};
  return {
    title: `${city.name} — Live Map`,
    description: `Interactive map of ${city.name} for World Cup 2026 fans — filter by country, nation and type of place to find a taste of home near the stadium.`,
  };
}

export default function CityMapPage({ params }) {
  const city = getCity(params.slug);
  if (!city) return null;
  // Pass a lightweight city list for the switcher (slug + name only).
  const allCities = CITIES.map((c) => ({ slug: c.slug, name: c.name }));
  return <CityMap city={city} allCities={allCities} />;
}
