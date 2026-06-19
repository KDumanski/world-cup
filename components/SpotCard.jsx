import { SPOT_CATEGORIES } from '@/lib/cities';
import SpotGlyph from './SpotGlyph';
import styles from './SpotCard.module.css';

// A single fan spot, rendered as a category-coded card — the color rail and
// glyph come from SPOT_CATEGORIES, the same "category as a colored mark" idea
// the stoop building-history timeline uses to make rows scannable at a glance.
export default function SpotCard({ spot }) {
  const cat = SPOT_CATEGORIES[spot.category] || SPOT_CATEGORIES.Neighborhood;
  return (
    <article className={styles.card} style={{ '--cat': cat.color }}>
      <div className={styles.rail} aria-hidden />
      <div className={styles.icon} aria-hidden>
        <SpotGlyph kind={cat.glyph} color={cat.color} />
      </div>
      <div className={styles.body}>
        <div className={styles.head}>
          <h4 className={styles.name}>{spot.name}</h4>
          <span className={styles.cat} style={{ color: cat.color }}>{spot.category}</span>
        </div>
        <span className={styles.area}>📍 {spot.area}</span>
        <p className={styles.note}>{spot.note}</p>
      </div>
    </article>
  );
}
