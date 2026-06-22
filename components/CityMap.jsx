'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import useLeaflet from './useLeaflet';
import ThemeToggle from './ThemeToggle';
import { allSpots, allNations, allTypes } from '@/lib/mapData';
import styles from './CityMap.module.css';

// CARTO dark basemap — free, no token, fine for a static GitHub Pages site.
const TILE = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_ATTR =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

// Map-first single page: you START zoomed out over the whole continent. Every
// spot across all 16 host cities is clustered; zoom in and clusters break into
// individual place pins. The sidebar filters apply across the whole map.
export default function CityMap({ cities }) {
  const L = useLeaflet();
  const mapEl = useRef(null);
  const mapRef = useRef(null);
  const clusterRef = useRef(null);

  const spots = useMemo(() => allSpots(cities), [cities]);
  const nations = useMemo(() => allNations(cities), [cities]);
  const types = useMemo(() => allTypes(cities), [cities]);

  // ---- filter state (the funnel) ----
  const [nation, setNation] = useState(null);
  const [typeQuery, setTypeQuery] = useState('');
  const [pickedTypes, setPickedTypes] = useState([]);
  const [showingOnly, setShowingOnly] = useState(false);
  const [openOnly, setOpenOnly] = useState(false);
  const [selected, setSelected] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = useMemo(() => {
    return spots.filter((s) => {
      if (nation && s.nation !== nation) return false;
      if (pickedTypes.length && !pickedTypes.includes(s.type)) return false;
      if (showingOnly && !s.showingMatch) return false;
      if (openOnly && !s.openNow) return false;
      return true;
    });
  }, [spots, nation, pickedTypes, showingOnly, openOnly]);

  const suggestions = useMemo(() => {
    const q = typeQuery.trim().toLowerCase();
    return types.filter((t) => !pickedTypes.includes(t.type) &&
      (!q || t.type.toLowerCase().includes(q) ||
        (t.keywords || []).some((k) => k.includes(q))));
  }, [types, typeQuery, pickedTypes]);

  // ---- init map once Leaflet (+ cluster plugin) is ready ----
  useEffect(() => {
    if (!L || !mapEl.current || mapRef.current) return;
    const map = L.map(mapEl.current, { zoomControl: true, worldCopyJump: true })
      .setView([39.5, -98.5], 4); // start zoomed out over North America
    L.tileLayer(TILE, { attribution: TILE_ATTR, maxZoom: 19, subdomains: 'abcd' }).addTo(map);

    // Cluster group with a custom dark icon matching the theme.
    const cluster = L.markerClusterGroup({
      maxClusterRadius: 55,
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      iconCreateFunction: (c) => {
        const n = c.getChildCount();
        const size = n < 10 ? 38 : n < 50 ? 46 : 54;
        return L.divIcon({
          html: `<div class="wc-cluster"><span>${n}</span></div>`,
          className: '',
          iconSize: [size, size],
        });
      },
    });
    map.addLayer(cluster);
    clusterRef.current = cluster;
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; clusterRef.current = null; };
  }, [L]);

  // ---- repaint clustered pins whenever the filtered set changes ----
  useEffect(() => {
    const L2 = L, cluster = clusterRef.current;
    if (!L2 || !cluster) return;
    cluster.clearLayers();
    const markers = filtered.map((s) => {
      const live = !!s.showingMatch;
      const html = `<div class="wc-pin-wrap ${live ? 'wc-pin-live' : ''}">
        <div class="wc-pin" style="background:${s.color}"><span>${glyph(s.category)}</span></div>
      </div>`;
      const icon = L2.divIcon({ html, className: '', iconSize: [26, 26], iconAnchor: [13, 26] });
      const m = L2.marker([s.lat, s.lng], { icon, title: `${s.name} · ${s.cityName}` });
      m.on('click', () => setSelected(s));
      return m;
    });
    cluster.addLayers(markers);
  }, [filtered, L]);

  const addType = (t) => { setPickedTypes((p) => p.includes(t) ? p : [...p, t]); setTypeQuery(''); setMenuOpen(false); };
  const removeType = (t) => setPickedTypes((p) => p.filter((x) => x !== t));
  const resetAll = () => { setNation(null); setPickedTypes([]); setTypeQuery(''); setShowingOnly(false); setOpenOnly(false); setSelected(null); };

  return (
    <div className={styles.shell}>
      {/* ---------------- SIDEBAR: brand + filter funnel ---------------- */}
      <aside className={styles.sidebar}>
        <header className={styles.brandRow}>
          <span className={styles.brand}>
            <span aria-hidden>⚽</span>
            <span className={styles.brandText}>
              <strong>World Cup 2026</strong>
              <span className={styles.brandSub}>Fan Map · a taste of home</span>
            </span>
          </span>
          <ThemeToggle />
        </header>

        <p className={styles.intro}>
          Pan and zoom the map — spots cluster when you’re zoomed out and split into individual
          places as you zoom into a city. Filter below to narrow what shows.
        </p>

        {/* nation / team */}
        <section className={styles.panel}>
          <h4>Filter by nation / team</h4>
          <div className={styles.chips}>
            <button className={`${styles.chip} ${!nation ? styles.chipOn : ''}`} onClick={() => setNation(null)}>All</button>
            {nations.map((n) => (
              <button key={n.nation} className={`${styles.chip} ${nation === n.nation ? styles.chipOn : ''}`}
                onClick={() => setNation(nation === n.nation ? null : n.nation)}>
                {n.flag} {n.nation} <span className={styles.chipCt}>{n.count}</span>
              </button>
            ))}
          </div>
        </section>

        {/* typeahead "what kind of place?" */}
        <section className={styles.panel}>
          <h4>What kind of place?</h4>
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

        {/* toggles */}
        <section className={styles.panel}>
          <h4>Show me</h4>
          <button className={`${styles.toggle} ${showingOnly ? styles.toggleOn : ''}`} onClick={() => setShowingOnly((v) => !v)}>
            <span>📺 Showing the match live</span><span className={styles.sw} />
          </button>
          <button className={`${styles.toggle} ${openOnly ? styles.toggleOn : ''}`} onClick={() => setOpenOnly((v) => !v)}>
            <span>🕐 Open right now</span><span className={styles.sw} />
          </button>
        </section>

        <div className={styles.resultLine}>
          <span>📍 <b>{filtered.length}</b> places shown</span>
          {(nation || pickedTypes.length || showingOnly || openOnly) && (
            <button className={styles.reset} onClick={resetAll}>Reset</button>
          )}
        </div>
        <p className={styles.disclaimer}>Spots are a curated guide; locations &amp; hours are approximate. Independent fan project — not affiliated with FIFA.</p>
      </aside>

      {/* ---------------- MAP ---------------- */}
      <div className={styles.mapCol}>
        {!L && <div className={styles.loading}>Loading map…</div>}
        <div ref={mapEl} className={styles.map} />
        <div className={styles.badge}>🌎 16 host cities · {filtered.length} spots · zoom in to explore</div>

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
              <div className={styles.row}>📍 {selected.area} · {selected.cityName}</div>
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

function glyph(cat) {
  return ({ Restaurant: '🍽️', Bar: '🍺', Cafe: '☕', Market: '🛒', Cultural: '🎭', Neighborhood: '🏙️' })[cat] || '📍';
}
