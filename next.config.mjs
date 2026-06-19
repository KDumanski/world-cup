const isProd = process.env.NODE_ENV === 'production';

// GitHub Pages serves a project repo under /<repo>. Override with the BASE_PATH
// env var: set BASE_PATH=none (or "/") for a custom domain / user.github.io root,
// or BASE_PATH=/some-repo to match a different repo name. The deploy workflow
// passes the repo's base path automatically (see .github/workflows/deploy.yml).
const rawBase = process.env.BASE_PATH ?? '/world-cup';
const repo = rawBase === 'none' || rawBase === '/' || rawBase === '' ? '' : rawBase;
const basePath = isProd ? repo : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // fully static HTML/CSS/JS for GitHub Pages — no Node server
  images: { unoptimized: true }, // no image optimizer on Pages; required for export
  basePath, // without this, _next assets 404 under username.github.io/<repo>
  assetPrefix: basePath || undefined,
  trailingSlash: true, // clean static routing (/cities/ -> /cities/index.html)
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
