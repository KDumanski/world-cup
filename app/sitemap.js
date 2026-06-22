export const dynamic = 'force-static';

const BASE = 'https://worldcup2026fanguide.example';

// Single-page app — the map is the whole site.
export default function sitemap() {
  return [{ url: BASE, changeFrequency: 'weekly', priority: 1 }];
}
