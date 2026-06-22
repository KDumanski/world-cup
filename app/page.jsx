import { CITIES } from '@/lib/cities';
import CityMap from '@/components/CityMap';

// The whole site is one page: the interactive map. Pass the full city list
// (each with its spots) so the map can switch cities in-place via the sidebar
// dropdown. We add a flat `venueName` for the sidebar header.
export default function Home() {
  const cities = CITIES.map((c) => ({ ...c, venueName: c.venue.name }));
  return <CityMap cities={cities} />;
}
