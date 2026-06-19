// Prefix an internal href with the GitHub Pages base path when present.
// Next's <Link> already prefixes basePath for navigation, but raw anchors,
// background-image URLs and og: tags need it manually.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';
export function withBase(path = '') {
  if (!path) return BASE || '/';
  if (path.startsWith('http')) return path;
  return `${BASE}${path}`;
}
