import { CITIES } from '@/lib/cities';

export const dynamic = 'force-static';

const BASE = 'https://worldcup2026fanguide.example';

export default function sitemap() {
  const staticRoutes = ['', '/cities', '/about'].map((p) => ({
    url: `${BASE}${p}`,
    changeFrequency: 'weekly',
    priority: p === '' ? 1 : 0.8,
  }));
  const cityRoutes = CITIES.map((c) => ({
    url: `${BASE}/cities/${c.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
  return [...staticRoutes, ...cityRoutes];
}
