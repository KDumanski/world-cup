import { Inter, Bricolage_Grotesque } from 'next/font/google';
import './globals.css';
import ThemeScript from '@/components/ThemeScript';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body-stack',
  display: 'swap',
});
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display-stack',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://worldcup2026fanguide.example'),
  title: {
    default: 'World Cup 2026 Fan Guide — A Taste of Home in All 16 Host Cities',
    template: '%s · World Cup 2026 Fan Guide',
  },
  description:
    'Traveling for the 2026 World Cup? Find a taste of home in every host city across the USA, Canada and Mexico — restaurants, bars and neighborhoods tied to the nations on the pitch.',
  keywords: [
    'World Cup 2026', 'host cities', 'fan guide', 'where to eat World Cup',
    'Mexico City Russian restaurants', 'World Cup travel', 'USA Canada Mexico 2026',
  ],
  openGraph: {
    title: 'World Cup 2026 Fan Guide — A Taste of Home',
    description:
      'A fan guide to all 16 host cities — find your country\'s food, bars and neighborhoods near every stadium.',
    type: 'website',
    siteName: 'World Cup 2026 Fan Guide',
  },
  twitter: { card: 'summary_large_image', title: 'World Cup 2026 Fan Guide' },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0b0f0d' },
    { media: '(prefers-color-scheme: light)', color: '#f5f8f4' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
