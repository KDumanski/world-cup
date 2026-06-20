'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import styles from './Nav.module.css';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
          <span className={styles.ball} aria-hidden>⚽</span>
          <span className={styles.brandText}>
            <strong>World&nbsp;Cup&nbsp;2026</strong>
            <span className={styles.brandSub}>Fan Guide</span>
          </span>
        </Link>

        <nav className={`${styles.links} ${open ? styles.linksOpen : ''}`} aria-label="Primary">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/map/" onClick={() => setOpen(false)}>Live Map</Link>
          <Link href="/cities/" onClick={() => setOpen(false)}>Host Cities</Link>
          <Link href="/about/" onClick={() => setOpen(false)}>About</Link>
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <button
            type="button"
            className={styles.burger}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
