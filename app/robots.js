export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://worldcup2026fanguide.example/sitemap.xml',
  };
}
