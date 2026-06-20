'use client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import useLeaflet from './useLeaflet';
import { COUNTRY_META } from '@/lib/cities';
import styles from './CountryMap.module.css';

const TILE = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_ATTR =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';
const COUNTRY_COLOR = { USA: '#2fd07f', MEX: '#e63946', CAN: '#4895ef' };

export default function CountryMap({ cities }) {
  const L = useLeaflet();
  const el = useRef(null);
  const mapRef = useRef(null);
  const router = useRouter();
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';

  useEffect(() => {
    if (!L || !el.current || mapRef.current) return;
    const map = L.map(el.current, { zoomControl: true, scrollWheelZoom: true })
      .setView([39.5, -98.5], 4);
    L.tileLayer(TILE, { attribution: TILE_ATTR, maxZoom: 19, subdomains: 'abcd' }).addTo(map);

    cities.forEach((c) => {
      const color = COUNTRY_COLOR[c.country] || '#2fd07f';
      const html = `<div class="wc-city-pin" style="background:${color}"></div>`;
      const icon = L.divIcon({ html, className: '', iconSize: [18, 18], iconAnchor: [9, 18] });
      const m = L.marker([c.lat, c.lng], { icon, title: c.name }).addTo(map);
      m.bindTooltip(`${COUNTRY_META[c.country].flag} ${c.name}`, { direction: 'top', offset: [0, -16] });
      m.on('click', () => router.push(`/map/${c.slug}/`));
    });

    const b = L.latLngBounds(cities.map((c) => [c.lat, c.lng]));
    map.fitBounds(b.pad(0.1));
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, [L, cities, router, base]);

  return (
    <div className={styles.wrap}>
      {!L && <div className={styles.loading}>Loading map…</div>}
      <div ref={el} className={styles.map} />
      <div className={styles.legend}>
        <span><i style={{ background: COUNTRY_COLOR.USA }} /> USA</span>
        <span><i style={{ background: COUNTRY_COLOR.MEX }} /> Mexico</span>
        <span><i style={{ background: COUNTRY_COLOR.CAN }} /> Canada</span>
        <span className={styles.hint}>Click a city →</span>
      </div>
    </div>
  );
}
