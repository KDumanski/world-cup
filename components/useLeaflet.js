'use client';
import { useEffect, useState } from 'react';

// Loads Leaflet (JS + CSS) from CDN once, client-side. Returns the global L
// when ready. Kept as a hook so map components stay declarative and we don't
// bundle Leaflet into the static export — it's fetched at runtime.
let loadPromise = null;

function loadLeaflet() {
  if (typeof window === 'undefined') return Promise.resolve(null);
  if (window.L) return Promise.resolve(window.L);
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    // CSS
    if (!document.querySelector('link[data-leaflet]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      link.crossOrigin = '';
      link.setAttribute('data-leaflet', '');
      document.head.appendChild(link);
    }
    // JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.onload = () => resolve(window.L);
    script.onerror = reject;
    document.body.appendChild(script);
  });
  return loadPromise;
}

export default function useLeaflet() {
  const [L, setL] = useState(typeof window !== 'undefined' ? window.L : null);
  useEffect(() => {
    let alive = true;
    loadLeaflet().then((lib) => { if (alive) setL(lib); });
    return () => { alive = false; };
  }, []);
  return L;
}
