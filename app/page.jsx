import Link from 'next/link';
import { CITIES, COUNTRY_META, STATS } from '@/lib/cities';
import CityCard from '@/components/CityCard';
import SectionReveal from '@/components/SectionReveal';
import Countdown from '@/components/Countdown';
import FlagMarquee from '@/components/FlagMarquee';
import CountUp from '@/components/CountUp';
import styles from './page.module.css';

const COUNTRY_ORDER = ['USA', 'MEX', 'CAN'];

function byCountry(code) {
  return CITIES.filter((c) => c.country === code);
}

export default function Home() {
  return (
    <>
      {/* ============================ HERO ============================ */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden />
        <div className={styles.pitch} aria-hidden>
          <span className={styles.ball}>⚽</span>
        </div>
        <div className={`container ${styles.heroInner}`}>
          <span className="kicker">USA · Canada · Mexico — Summer 2026</span>
          <h1 className={styles.heroTitle}>
            Wherever you’re from,<br />
            <span className={styles.heroAccent}>find a taste of home.</span>
          </h1>
          <p className={`lead ${styles.heroLead}`}>
            48 nations. 16 host cities. One continent. The fan’s guide to eating, drinking and
            feeling at home in every World Cup city — Russian restaurants in Mexico City, Brazilian
            bakeries in New Jersey, Korean BBQ blocks from the stadium. Pick your city, find your people.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/map/" className="btn btn-primary">🗺️ Open the live map</Link>
            <Link href="/cities/" className="btn btn-ghost">Browse 16 cities</Link>
          </div>
          <div className={styles.countdownRow}>
            <Countdown />
            <span className={styles.kickoffNote}>Opening match · Estadio Azteca, Mexico City</span>
          </div>
        </div>

        <div className={styles.flagBand}>
          <FlagMarquee />
        </div>
      </section>

      {/* ============================ STAT STRIP ============================ */}
      <section className={styles.statSection}>
        <div className="container">
          <div className={styles.statStrip}>
            <StatCount end={STATS.cities} label="Host cities" />
            <StatCount end={STATS.countries} label="Countries" />
            <StatCount end={48} label="Nations on the pitch" />
            <StatCount end={STATS.spots} suffix="+" label="Curated fan spots" />
          </div>
        </div>
      </section>

      {/* ============================ HOW IT WORKS ============================ */}
      <section id="how" className="section">
        <div className="container">
          <SectionReveal className="text-center">
            <span className="kicker mx-auto">How it works</span>
            <h2 className={styles.h2}>Three steps to your home away from home</h2>
          </SectionReveal>

          <div className={`grid grid-3 ${styles.steps}`}>
            <SectionReveal as="div" className={styles.step}>
              <span className={styles.stepNum}>01</span>
              <h3>Pick your host city</h3>
              <p>Choose from the 16 cities staging matches across the USA, Canada and Mexico — each with its stadium, dates and the communities that live there.</p>
            </SectionReveal>
            <SectionReveal as="div" className={styles.step}>
              <span className={styles.stepNum}>02</span>
              <h3>Find your flag</h3>
              <p>We group every city’s best spots by nation. Traveling from Brazil, Korea, Morocco or Mexico? Jump straight to the neighborhoods that feel like home.</p>
            </SectionReveal>
            <SectionReveal as="div" className={styles.step}>
              <span className={styles.stepNum}>03</span>
              <h3>Eat, drink, belong</h3>
              <p>Restaurants, bars, markets and cultural hubs — the real places where fans gather, watch the match and get a plate of something familiar.</p>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ============================ MAP SHOWCASE ============================ */}
      <section className="section">
        <div className="container">
          <SectionReveal className={styles.mapShowcase}>
            <div className={styles.mapShowcaseText}>
              <span className="kicker">The live map</span>
              <h2 className={styles.h2}>Every spot, on one interactive map.</h2>
              <p className="lead">
                Open the map, pick a country, filter by your nation and the kind of place — restaurant,
                bar, social club — and the pins drop right where the fans gather. Tap a pin for hours,
                which match it’s showing, and directions.
              </p>
              <ul className={styles.mapFeatures}>
                <li>🌎 16 cities · 3 countries on one map</li>
                <li>⌨️ Type-to-filter by place: “bar”, “social club”…</li>
                <li>📺 See who’s showing the match, live</li>
              </ul>
              <Link href="/map/" className="btn btn-primary">🗺️ Launch the live map</Link>
            </div>
            <Link href="/map/" className={styles.mapShowcaseVisual} aria-label="Open the live map">
              <div className={styles.mapGrid} aria-hidden />
              <span className={`${styles.mp} ${styles.mp1}`}><b>🍽️</b></span>
              <span className={`${styles.mp} ${styles.mp2}`}><b>🍺</b></span>
              <span className={`${styles.mp} ${styles.mp3}`}><b>🎭</b></span>
              <span className={`${styles.mp} ${styles.mp4}`}><b>🛒</b></span>
              <span className={styles.mapShine} aria-hidden />
              <span className={styles.mapOpen}>Open map →</span>
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ============================ CITIES BY COUNTRY ============================ */}
      <section id="cities" className="section-tight">
        <div className="container">
          <SectionReveal>
            <span className="kicker">The host cities</span>
            <h2 className={styles.h2}>16 cities. 3 countries. One tournament.</h2>
            <p className="lead">
              The 2026 World Cup is the first to span three nations. Here’s every host city, grouped by country.
            </p>
          </SectionReveal>

          {COUNTRY_ORDER.map((code) => {
            const cities = byCountry(code);
            const meta = COUNTRY_META[code];
            return (
              <div key={code} className={styles.countryBlock}>
                <SectionReveal className={styles.countryHead}>
                  <span className={styles.countryFlag} aria-hidden>{meta.flag}</span>
                  <h3 className={styles.countryName}>{meta.label}</h3>
                  <span className={styles.countryCount}>{cities.length} {cities.length === 1 ? 'city' : 'cities'}</span>
                </SectionReveal>
                <div className="grid grid-3">
                  {cities.map((city) => (
                    <CityCard key={city.slug} city={city} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================ CLOSING CTA ============================ */}
      <section className="section">
        <div className="container">
          <SectionReveal className={styles.cta}>
            <h2 className={styles.ctaTitle}>The whole world is coming.<br />Make it feel like home.</h2>
            <p className={styles.ctaLead}>
              Browse the full guide and find your country in every city.
            </p>
            <Link href="/cities/" className="btn btn-primary">Browse all host cities</Link>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}

function StatCount({ end, suffix = '', label }) {
  return (
    <div className={styles.stat}>
      <CountUp end={end} suffix={suffix} className={styles.statN} />
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}
