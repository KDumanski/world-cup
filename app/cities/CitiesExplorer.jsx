'use client';
import { useState, useMemo } from 'react';
import { CITIES, COUNTRY_META } from '@/lib/cities';
import CityCard from '@/components/CityCard';
import styles from './cities.module.css';

const FILTERS = [
  { key: 'ALL', label: 'All cities', flag: '🌎' },
  { key: 'USA', label: COUNTRY_META.USA.label, flag: COUNTRY_META.USA.flag },
  { key: 'MEX', label: COUNTRY_META.MEX.label, flag: COUNTRY_META.MEX.flag },
  { key: 'CAN', label: COUNTRY_META.CAN.label, flag: COUNTRY_META.CAN.flag },
];

export default function CitiesExplorer() {
  const [filter, setFilter] = useState('ALL');
  const [query, setQuery] = useState('');

  const cities = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CITIES.filter((c) => {
      if (filter !== 'ALL' && c.country !== filter) return false;
      if (!q) return true;
      // Match city name, venue, or any visiting nation — so "russia" or
      // "brazil" surfaces the cities that have those communities.
      if (c.name.toLowerCase().includes(q)) return true;
      if (c.venue.name.toLowerCase().includes(q)) return true;
      if ((c.spots || []).some((s) => s.nation.toLowerCase().includes(q))) return true;
      return false;
    });
  }, [filter, query]);

  return (
    <>
      <div className={styles.controls}>
        <div className={styles.filters} role="tablist" aria-label="Filter by country">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={filter === f.key}
              className={`${styles.filter} ${filter === f.key ? styles.filterActive : ''}`}
              onClick={() => setFilter(f.key)}
            >
              <span aria-hidden>{f.flag}</span> {f.label}
            </button>
          ))}
        </div>
        <label className={styles.search}>
          <span className="sr-only">Search cities or your country</span>
          <span className={styles.searchIcon} aria-hidden>🔍</span>
          <input
            type="search"
            placeholder="Search a city, stadium, or your country…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>

      <p className={styles.count}>
        {cities.length} {cities.length === 1 ? 'city' : 'cities'}
        {query ? ` matching “${query}”` : ''}
      </p>

      {cities.length > 0 ? (
        <div className="grid grid-3">
          {cities.map((c) => (
            <CityCard key={c.slug} city={c} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>No host cities match that search.</p>
          <button type="button" className="btn btn-ghost" onClick={() => { setQuery(''); setFilter('ALL'); }}>
            Reset
          </button>
        </div>
      )}
    </>
  );
}
