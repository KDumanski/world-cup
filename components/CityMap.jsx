'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import useLeaflet from './useLeaflet';
import { citySpots, cityTypes, cityNations } from '@/lib/mapData';
import { COUNTRY_META } from '@/lib/cities';
import styles from './CityMap.module.css';

// CARTO dark basemap — free, no token, fine for a static GitHub Pages site.
const TILE = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_ATTR =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

export default function CityMap({ city, allCities }) {
  const L = useLeaflet();
  const mapEl = useRef(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);

  const allSpots = useMemo(() => citySpots(city), [city]);
  const types = useMemo(() => cityTypes(city), [city]);
  const nations = useMemo(() => cityNations(city), [city]);

  // ---- filter state (the funnel) ----
  const [nation, setNation] = useState(null);        // null = all nations
  const [typeQuery, setTypeQuery] = useState('');
  const [pickedTypes, setPickedTypes] = useState([]); // [] = all types
  const [showingOnly, setShowingOnly] = useState(false);
  const [openOnly, setOpenOnly] = useState(false);
  const [selected, setSelected] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // ---- apply filters ----
  const filtered = useMemo(() => {
    return allSpots.filter((s) => {
      if (nation && s.nation !== nation) return false;
      if (pickedTypes.length && !pickedTypes.includes(s.type)) return false;
      if (showingOnly && !s.showingMatch) return false;
      if (openOnly && !s.openNow) return false;
      return true;
    });
  }, [allSpots, nation, pickedTypes, showingOnly, openOnly]);

  // typeahead suggestions
  const suggestions = useMemo(() => {
    const q = typeQuery.trim().toLowerCase();
    return types.filter((t) => !pickedTypes.includes(t.type) &&
      (!q || t.type.toLowerCase().includes(q) ||
        allSpots.some((s) => s.type === t.type && s.keywords.some((k) => k.includes(q)))));
  }, [types, typeQuery, pickedTypes, allSpots]);

  // ---- init map once Leaflet is ready ----
  useEffect(() => {
    if (!L || !mapEl.current || mapRef.current) return;
    const map = L.map(mapEl.current, { zoomControl: true, attributionControl: true })
      .setView([city.lat, city.lng], 12);
    L.tileLayer(TILE, { attribution: TILE_ATTR, maxZoom: 19, subdomains: 'abcd' }).addTo(map);
    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, [L, city.lat, city.lng]);

  // ---- repaint pins whenever the filtered set changes ----
  useEffect(() => {
    const L2 = L, map = mapRef.current, layer = layerRef.current;
    if (!L2 || !map || !layer) return;
    layer.clearLayers();

    filtered.forEach((s) => {
      const live = !!s.showingMatch;
      // Global (non-module) class names — Leaflet injects this HTML raw, so the
      // classes must match the :global() rules in CityMap.module.css.
      const html = `<div class="wc-pin-wrap ${live ? 'wc-pin-live' : ''}">
        <div class="wc-pin" style="background:${s.color}"><span>${glyph(s.category)}</span></div>
      </div>`;
      const icon = L2.divIcon({ html, className: '', iconSize: [26, 26], iconAnchor: [13, 26] });
      const m = L2.marker([s.lat, s.lng], { icon, title: s.name });
      m.on('click', () => setSelected(s));
      layer.addLayer(m);
    });

    // fit to pins (only when there are some)
    if (filtered.length) {
      const b = L2.latLngBounds(filtered.map((s) => [s.lat, s.lng]));
      map.fitBounds(b.pad(0.25), { animate: true, maxZoom: 14 });
    }
  }, [filtered, L]);

  const meta = COUNTRY_META[city.country];
  const addType = (t) => { setPickedTypes((p) => p.includes(t) ? p : [...p, t]); setTypeQuery(''); setMenuOpen(false); };
  const removeType = (t) => setPickedTypes((p) => p.filter((x) => x !== t));

  return (
    <div className={styles.shell}>
      {/* ---------------- SIDEBAR: the filter funnel ---------------- */}
      <aside className={styles.sidebar}>
        <Link href="/map/" className={styles.back}>← All host cities</Link>

        {/* STEP 1 — country + city */}
        <section className={styles.panel}>
          <h4><span className={styles.stepN}>1</span> Country</h4>
          <div className={styles.segmented}>
            {['USA', 'CAN', 'MEX'].map((code) => (
              <span key={code} className={`${styles.seg} ${city.country === code ? styles.segOn : ''}`}>
                {COUNTRY_META[code].flag} {code}
              </span>
            ))}
          </div>
          <div className={styles.cityPick}>
            <span className={styles.faint}>City:</span> <b>{city.name}</b>
            <CitySwitcher allCities={allCities} current={city.slug} />
          </div>
        </section>

        {/* STEP 2 — nation / team */}
        <section className={styles.panel}>
          <h4><span className={styles.stepN}>2</span> Filter by nation / team</h4>
          <div className={styles.chips}>
            <button className={`${styles.chip} ${!nation ? styles.chipOn : ''}`} onClick={() => setNation(null)}>All</button>
            {nations.map((n) => (
              <button key={n.nation} className={`${styles.chip} ${nation === n.nation ? styles.chipOn : ''}`}
                onClick={() => setNation(nation === n.nation ? null : n.nation)}>
                {n.flag} {n.nation}
              </button>
            ))}
          </div>
        </section>

        {/* STEP 3 — typeahead "what kind of place?" */}
        <section className={styles.panel}>
          <h4><span className={styles.stepN}>3</span> What kind of place?</h4>
          <div className={styles.ta}>
            <div className={styles.taBox}>
              <span aria-hidden>⌨️</span>
              <input
                type="text"
                value={typeQuery}
                placeholder="Type: restaurant, bar, social club…"
                onChange={(e) => { setTypeQuery(e.target.value); setMenuOpen(true); }}
                onFocus={() => setMenuOpen(true)}
                onKeyDown={(e) => { if (e.key === 'Enter' && suggestions[0]) addType(suggestions[0].type); }}
              />
            </div>
            {menuOpen && suggestions.length > 0 && (
              <div className={styles.taMenu}>
                {suggestions.map((t) => (
                  <button key={t.type} className={styles.taOpt} onClick={() => addType(t.type)}>
                    <i style={{ background: t.color }} /> {t.type}
                    <span className={styles.ct}>{t.count}</span>
                  </button>
                ))}
              </div>
            )}
            {pickedTypes.length > 0 && (
              <div className={styles.taTags}>
                {pickedTypes.map((t) => (
                  <button key={t} className={styles.taTag} onClick={() => removeType(t)}>{t} <span>✕</span></button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* STEP 4 — toggles */}
        <section className={styles.panel}>
          <h4><span className={styles.stepN}>4</span> Show me</h4>
          <button className={`${styles.toggle} ${showingOnly ? styles.toggleOn : ''}`} onClick={() => setShowingOnly((v) => !v)}>
            <span>📺 Showing the match live</span><span className={styles.sw} />
          </button>
          <button className={`${styles.toggle} ${openOnly ? styles.toggleOn : ''}`} onClick={() => setOpenOnly((v) => !v)}>
            <span>🕐 Open right now</span><span className={styles.sw} />
          </button>
        </section>

        <div className={styles.resultLine}>↓ <b>{filtered.length}</b> places on the map →</div>
      </aside>

      {/* ---------------- MAP ---------------- */}
      <div className={styles.mapCol}>
        {!L && <div className={styles.loading}>Loading map…</div>}
        <div ref={mapEl} className={styles.map} />
        <div className={styles.badge}>📍 {city.name} · showing {filtered.length} spots</div>

        {selected && (
          <div className={styles.detail}>
            <button className={styles.detailX} onClick={() => setSelected(null)}>×</button>
            <div className={styles.detailHd} style={{ borderColor: selected.color }}>
              <span className={styles.detailFlag}>{selected.flag}</span>
            </div>
            <div className={styles.detailBd}>
              <div className={styles.detailTop}>
                <b>{selected.name}</b>
                <span className={styles.detailNation}>{selected.flag} {selected.nation}</span>
              </div>
              <div className={styles.row} style={{ color: selected.color }}>● {selected.type}</div>
              <div className={styles.row}>📍 {selected.area}</div>
              {selected.showingMatch && (
                <div className={`${styles.row} ${styles.live}`}>📺 Showing {selected.showingMatch.label} · {selected.showingMatch.time}</div>
              )}
              <div className={styles.row}>🕐 {selected.openNow ? 'Open now' : 'Closed now'} · {selected.hours}</div>
              <p className={styles.detailNote}>{selected.note}</p>
              <div className={styles.detailBtns}>
                <a className={styles.btnGo}
                  href={`https://www.google.com/maps/search/?api=1&query=${selected.lat},${selected.lng}`}
                  target="_blank" rel="noopener noreferrer">Directions</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// inline city dropdown
function CitySwitcher({ allCities, current }) {
  return (
    <select className={styles.citySelect} defaultValue={current}
      onChange={(e) => { window.location.href = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/map/${e.target.value}/`; }}>
      {allCities.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
    </select>
  );
}

function glyph(cat) {
  return ({ Restaurant: '🍽️', Bar: '🍺', Cafe: '☕', Market: '🛒', Cultural: '🎭', Neighborhood: '🏙️' })[cat] || '📍';
}
