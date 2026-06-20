'use client';
import { useEffect, useState } from 'react';
import styles from './Countdown.module.css';

// Live countdown to the 2026 World Cup opening match at Estadio Azteca,
// Mexico City — June 11, 2026. Renders nothing until mounted to avoid an
// SSR/hydration mismatch (the value depends on "now").
const KICKOFF = new Date('2026-06-11T19:00:00-05:00').getTime();

function parts(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  };
}

export default function Countdown() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  if (now === null) return <div className={styles.wrap} aria-hidden style={{ opacity: 0 }} />;
  const left = KICKOFF - now;
  const live = left <= 0;
  const p = parts(left);

  if (live) {
    return (
      <div className={`${styles.wrap} ${styles.live}`}>
        <span className={styles.dot} /> The tournament is live
      </div>
    );
  }

  return (
    <div className={styles.wrap} aria-label="Countdown to the opening match">
      <span className={styles.label}>Kickoff in</span>
      <Unit n={p.days} l="days" />
      <span className={styles.colon}>:</span>
      <Unit n={p.hours} l="hrs" />
      <span className={styles.colon}>:</span>
      <Unit n={p.mins} l="min" />
      <span className={styles.colon}>:</span>
      <Unit n={p.secs} l="sec" />
    </div>
  );
}

function Unit({ n, l }) {
  return (
    <span className={styles.unit}>
      <b className={styles.num}>{String(n).padStart(2, '0')}</b>
      <span className={styles.ul}>{l}</span>
    </span>
  );
}
