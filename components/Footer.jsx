import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const year = 2026;
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandCol}>
          <div className={styles.brand}>
            <span aria-hidden>⚽</span> World Cup 2026 Fan Guide
          </div>
          <p className={styles.tag}>
            A taste of home in all 16 host cities across the United States, Canada & Mexico.
          </p>
        </div>

        <nav className={styles.col} aria-label="Footer">
          <span className={styles.colHead}>Explore</span>
          <Link href="/cities/">All host cities</Link>
          <Link href="/#how">How it works</Link>
          <Link href="/about/">About</Link>
        </nav>

        <div className={styles.col}>
          <span className={styles.colHead}>The tournament</span>
          <span className={styles.muted}>16 host cities</span>
          <span className={styles.muted}>3 countries</span>
          <span className={styles.muted}>June – July {year}</span>
        </div>
      </div>

      <div className={`container ${styles.legal}`}>
        <span>© {year} World Cup Fan Guide — an independent fan project.</span>
        <span className={styles.disclaimer}>
          Not affiliated with FIFA. Venue details are public record; spots are an editorial guide.
        </span>
      </div>
    </footer>
  );
}
