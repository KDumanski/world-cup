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

  const addCss = (href) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.setAttribute('data-leaflet', '');
    document.head.appendChild(link);
  };
  const addScript = (src) => new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = res;
    s.onerror = rej;
    document.body.appendChild(s);
  });

  loadPromise = (async () => {
    if (!document.querySelector('link[data-leaflet]')) {
      addCss('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
      // markercluster styles (base + default cluster theme)
      addCss('https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css');
    }
    await addScript('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js');
    // clustering plugin — depends on L being loaded first
    await addScript('https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js');
    return window.L;
  })();
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
