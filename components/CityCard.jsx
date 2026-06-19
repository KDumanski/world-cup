import Link from 'next/link';
import { COUNTRY_META } from '@/lib/cities';
import styles from './CityCard.module.css';

export default function CityCard({ city }) {
  const meta = COUNTRY_META[city.country];
  // Show up to 5 visiting-nation flags as a quick "who you'll find here" preview.
  const nations = [];
  const seen = new Set();
  for (const s of city.spots || []) {
    if (!seen.has(s.nation)) { seen.add(s.nation); nations.push(s); }
  }
  const preview = nations.slice(0, 5);
  const extra = Math.max(0, nations.length - preview.length);

  return (
    <Link href={`/cities/${city.slug}/`} className={styles.card}>
      <div className={styles.top}>
        <span className={styles.country}>
          <span className={styles.flag} aria-hidden>{meta.flag}</span>
          {meta.label}
        </span>
        <span className={styles.cap}>{(city.venue.capacity / 1000).toFixed(0)}k seats</span>
      </div>

      <h3 className={styles.name}>{city.name}</h3>
      <p className={styles.tagline}>{city.tagline}</p>

      <div className={styles.venue}>
        <span className={styles.venueDot} aria-hidden>📍</span>
        <span>{city.venue.name}</span>
      </div>

      <div className={styles.flagsRow} aria-label="Communities you can find here">
        {preview.map((s) => (
          <span key={s.nation} className={styles.flagChip} title={s.nation}>
            {s.flag}
          </span>
        ))}
        {extra > 0 && <span className={styles.more}>+{extra}</span>}
      </div>

      <span className={styles.cta}>Explore the city →</span>
    </Link>
  );
}
