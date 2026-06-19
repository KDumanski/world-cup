import CitiesExplorer from './CitiesExplorer';
import styles from './cities.module.css';

export const metadata = {
  title: 'All 16 Host Cities',
  description:
    'Every World Cup 2026 host city across the USA, Canada and Mexico. Filter by country or search for your nation to find a taste of home near each stadium.',
};

export default function CitiesPage() {
  return (
    <section className="section-tight">
      <div className="container">
        <header className={styles.header}>
          <span className="kicker">The host cities</span>
          <h1 className={styles.title}>All 16 host cities</h1>
          <p className="lead">
            Filter by country, or search your nation — type “Brazil”, “Korea” or “Mexico” to see
            which cities have a community waiting for you.
          </p>
        </header>
        <CitiesExplorer />
      </div>
    </section>
  );
}
