import Link from 'next/link';
import { STATS } from '@/lib/cities';
import styles from './about.module.css';

export const metadata = {
  title: 'About',
  description:
    'What the World Cup 2026 Fan Guide is, who it’s for, and how the host-city data is put together.',
};

export default function AboutPage() {
  return (
    <section className="section-tight">
      <div className={`container ${styles.wrap}`}>
        <span className="kicker">About</span>
        <h1 className={styles.title}>A taste of home, in every host city.</h1>

        <p className={styles.lead}>
          The 2026 World Cup is the biggest ever — 48 teams, 104 matches, and the first tournament
          shared across three countries. Millions of fans will travel to {STATS.cities} cities they’ve
          never been to, cheering for nations far from home. This guide exists for them.
        </p>

        <div className={styles.prose}>
          <h2>The idea</h2>
          <p>
            Every host city in the USA, Canada and Mexico is also home to communities from all over
            the world. There are Russian restaurants in Mexico City, Brazilian bakeries in New Jersey,
            Korean BBQ blocks from the stadium in Los Angeles. When you’re far from home and your team
            is playing, a familiar plate of food and a room full of your own flags means everything.
          </p>
          <p>
            So for each of the {STATS.cities} host cities, we group the best spots by nation — restaurants,
            bars, markets, cultural hubs and whole neighborhoods — so you can find your people fast.
          </p>

          <h2>How the data works</h2>
          <ul>
            <li>
              <strong>Venues</strong> — stadium names, locations, capacities and match roles are public
              record for the 2026 tournament.
            </li>
            <li>
              <strong>Fan spots</strong> — a curated editorial guide built around real, well-known
              communities and establishments in each city. It’s a starting point, expanded city by city
              over time — not a live business directory or a paid listing.
            </li>
          </ul>

          <h2>Independent &amp; unofficial</h2>
          <p>
            This is an independent fan project. It is not affiliated with, endorsed by, or sponsored by
            FIFA or any official tournament body. Always double-check opening hours and match-day plans
            before you travel.
          </p>
        </div>

        <div className={styles.cta}>
          <Link href="/cities/" className="btn btn-primary">Find your city</Link>
        </div>
      </div>
    </section>
  );
}
