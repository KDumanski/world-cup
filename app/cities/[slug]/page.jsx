import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CITIES, COUNTRY_META, SPOT_CATEGORIES, getCity, spotsByNation } from '@/lib/cities';
import SpotCard from '@/components/SpotCard';
import SectionReveal from '@/components/SectionReveal';
import styles from './city.module.css';

// Static export needs every dynamic path enumerated at build time.
export function generateStaticParams() {
  return CITIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const city = getCity(params.slug);
  if (!city) return {};
  return {
    title: `${city.name} — Host City Guide`,
    description: `${city.name} World Cup 2026 fan guide: ${city.venue.name}, plus where visiting fans can find a taste of home. ${city.blurb}`,
  };
}

export default function CityPage({ params }) {
  const city = getCity(params.slug);
  if (!city) notFound();

  const meta = COUNTRY_META[city.country];
  const groups = spotsByNation(city);
  const categories = Object.keys(SPOT_CATEGORIES);

  // Sibling cities in the same country for the footer nav.
  const siblings = CITIES.filter((c) => c.country === city.country && c.slug !== city.slug);

  return (
    <>
      {/* ============================ HERO ============================ */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden />
        <div className={`container ${styles.heroInner}`}>
          <Link href="/cities/" className={styles.back}>← All host cities</Link>
          <span className="kicker">
            {meta.flag} {meta.label} · {city.region}
          </span>
          <h1 className={styles.title}>{city.name}</h1>
          <p className={styles.tagline}>{city.tagline}</p>
          <p className={`lead ${styles.blurb}`}>{city.blurb}</p>
          <div className={styles.heroCtas}>
            <Link href={`/map/${city.slug}/`} className="btn btn-primary">🗺️ View {city.name} on the map</Link>
          </div>
        </div>
      </section>

      {/* ============================ VENUE PANEL ============================ */}
      <section className="container">
        <SectionReveal className={styles.venue}>
          <div className={styles.venueMain}>
            <span className={styles.venueKicker}>The venue</span>
            <h2 className={styles.venueName}>{city.venue.name}</h2>
            <span className={styles.venueLoc}>📍 {city.venue.location}</span>
          </div>
          <div className={styles.venueStats}>
            <div className={styles.vStat}>
              <span className={styles.vStatN}>{city.venue.capacity.toLocaleString()}</span>
              <span className={styles.vStatL}>Capacity</span>
            </div>
            <div className={styles.vStat}>
              <span className={styles.vStatN}>{city.venue.matches}</span>
              <span className={styles.vStatL}>Matches</span>
            </div>
          </div>
          {city.venue.note && <p className={styles.venueNote}>{city.venue.note}</p>}
        </SectionReveal>
      </section>

      {/* ============================ TASTE OF HOME ============================ */}
      <section className="section-tight">
        <div className="container">
          <SectionReveal>
            <span className="kicker">A taste of home</span>
            <h2 className={styles.sectionTitle}>Find your people in {city.name}</h2>
            <p className="lead">
              {groups.length} communities you can find here. Jump to your flag for the restaurants,
              bars, markets and neighborhoods where fans gather.
            </p>
          </SectionReveal>

          {/* Category legend — mirrors the stoop history color-coding */}
          <div className={styles.legend}>
            {categories.map((key) => (
              <span key={key} className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: SPOT_CATEGORIES[key].color }} />
                {key}
              </span>
            ))}
          </div>

          {/* Nation jump-chips */}
          <div className={styles.nationNav}>
            {groups.map((g) => (
              <a key={g.nation} href={`#n-${slugifyNation(g.nation)}`} className={styles.nationChip}>
                <span aria-hidden>{g.spots[0].flag}</span> {g.nation}
              </a>
            ))}
          </div>

          {/* Nation-grouped spot cards */}
          <div className={styles.nationList}>
            {groups.map((g) => (
              <SectionReveal as="div" key={g.nation} id={`n-${slugifyNation(g.nation)}`} className={styles.nationBlock}>
                <div className={styles.nationHead}>
                  <span className={styles.nationFlag} aria-hidden>{g.spots[0].flag}</span>
                  <h3 className={styles.nationName}>{g.nation}</h3>
                  <span className={styles.nationCount}>{g.spots.length} {g.spots.length === 1 ? 'spot' : 'spots'}</span>
                </div>
                <div className={styles.spotGrid}>
                  {g.spots.map((s, i) => (
                    <SpotCard key={`${s.name}-${i}`} spot={s} />
                  ))}
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ SIBLING CITIES ============================ */}
      {siblings.length > 0 && (
        <section className="container">
          <div className={styles.siblings}>
            <span className={styles.siblingsHead}>More {meta.label} host cities</span>
            <div className={styles.siblingsRow}>
              {siblings.map((c) => (
                <Link key={c.slug} href={`/cities/${c.slug}/`} className={styles.siblingLink}>
                  {c.name} →
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function slugifyNation(n) {
  return n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
