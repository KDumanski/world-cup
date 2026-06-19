// Line-art category glyphs for fan-spot cards. One per SPOT_CATEGORIES key,
// drawn in a 24x24 viewBox so they stay crisp and consistent — the same
// "category as a recognizable mark" idea the stoop history timeline uses.
const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none' };
const sw = { strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };

export default function SpotGlyph({ kind, color = 'currentColor' }) {
  const p = { ...sw, stroke: color };
  switch (kind) {
    case 'restaurant': // fork + knife
      return (
        <svg {...common}>
          <path d="M7 3v7M5 3v4a2 2 0 0 0 2 2M9 3v4a2 2 0 0 1-2 2M7 11v10" {...p} />
          <path d="M17 3c-1.6 0-2.5 2-2.5 5s.9 4 2.5 4m0-9v18" {...p} />
        </svg>
      );
    case 'bar': // cocktail glass
      return (
        <svg {...common}>
          <path d="M4 5h16l-8 8-8-8Z" {...p} />
          <path d="M12 13v6M8 21h8" {...p} />
        </svg>
      );
    case 'cafe': // coffee cup
      return (
        <svg {...common}>
          <path d="M4 9h13v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9Z" {...p} />
          <path d="M17 10h2.5a2.5 2.5 0 0 1 0 5H17" {...p} />
          <path d="M8 3v2M11 3v2" {...p} />
        </svg>
      );
    case 'market': // storefront awning
      return (
        <svg {...common}>
          <path d="M4 9V5h16v4" {...p} />
          <path d="M4 9q1.5 2 3 0 1.5 2 3 0 1.5 2 3 0 1.5 2 3 0 1.5 2 3 0" {...p} />
          <path d="M5 9v11h14V9" {...p} />
          <path d="M10 20v-6h4v6" {...p} />
        </svg>
      );
    case 'cultural': // theatre masks / building
      return (
        <svg {...common}>
          <path d="M3 9 12 4l9 5" {...p} />
          <path d="M5 9v10h14V9" {...p} />
          <path d="M9 19v-5h6v5" {...p} />
          <path d="M9 9h.01M15 9h.01" {...p} />
        </svg>
      );
    case 'neighborhood': // map pin
    default:
      return (
        <svg {...common}>
          <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" {...p} />
          <circle cx="12" cy="10" r="2.5" {...p} />
        </svg>
      );
  }
}
