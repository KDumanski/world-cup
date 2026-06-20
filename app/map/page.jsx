import { CITIES } from '@/lib/cities';
import CountryMap from '@/components/CountryMap';

export const metadata = {
  title: 'Live Map — All 16 Host Cities',
  description: 'Interactive map of all 16 World Cup 2026 host cities across the USA, Canada and Mexico. Click a city to explore where visiting fans find a taste of home.',
};

export default function MapPage() {
  const cities = CITIES.map((c) => ({ slug: c.slug, name: c.name, country: c.country, lat: c.lat, lng: c.lng }));
  return <CountryMap cities={cities} />;
}
