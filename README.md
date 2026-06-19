# World Cup 2026 Fan Guide ⚽

A standalone Next.js site — **"a taste of home in all 16 host cities"** across the USA, Canada and Mexico. For each host city it shows the venue and groups the best local spots (restaurants, bars, markets, neighborhoods) **by visiting nation**, so fans traveling for the 2026 World Cup can find their people fast.

> e.g. *Russian restaurants in Mexico City · Brazilian bakeries in New Jersey · Korean BBQ near the stadium in LA.*

## Stack

- **Next.js 15** (App Router) with `output: 'export'` — a fully static site, no server needed.
- Plain CSS Modules + design tokens in `app/globals.css` (dark mode by default, light toggle).
- Deploys to **GitHub Pages** via `.github/workflows/deploy.yml` (mirrors the other clone repos).

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export → ./out
npm run serve        # preview the built ./out
```

## Structure

| Path | What it is |
|------|-----------|
| `lib/cities.js` | The dataset — 16 host cities, venues, and curated fan spots by nation. **Edit here to add spots.** |
| `app/page.jsx` | Home / landing page (hero, how-it-works, cities by country). |
| `app/cities/` | All-cities index with country filter + nation search. |
| `app/cities/[slug]/` | City detail — venue panel + nation-grouped, category-coded spot cards. |
| `app/about/` | About + data methodology. |
| `components/` | Nav, Footer, theme toggle, `CityCard`, `SpotCard`, `SpotGlyph`. |

## Adding more spots

Open `lib/cities.js`, find the city, and add to its `spots` array:

```js
{ nation: 'Russia', flag: '🇷🇺', name: 'Kolobok', category: 'Restaurant', area: 'Roma Norte', note: 'Pelmeni and borscht in central CDMX.' }
```

`category` must be one of: `Restaurant`, `Bar`, `Cafe`, `Market`, `Cultural`, `Neighborhood` (these drive the color + glyph).

## Deploy

Push to `main` → the GitHub Action builds the static export and publishes to Pages. The repo base path is handled automatically by `next.config.mjs` + the workflow.

---

*Independent fan project. Not affiliated with FIFA. Venue details are public record; spots are an editorial guide.*
