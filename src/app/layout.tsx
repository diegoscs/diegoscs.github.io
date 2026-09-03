import type { Metadata } from 'next';
import { profile } from '@/content/profile';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { ThemeProvider, themeInitScript } from '@/i18n/ThemeProvider';
import { siteUrl } from '@/lib/site';
import './globals.css';

const description =
  'Engenheiro de dados júnior em São Paulo. Pipelines em GCP, BigQuery, dbt, Python e Spark. Junior data engineer building data pipelines.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — Engenheiro de Dados`,
    template: `%s — ${profile.shortName}`,
  },
  description,
  keywords: [
    'engenharia de dados',
    'data engineer',
    'dbt',
    'BigQuery',
    'GCP',
    'Python',
    'PySpark',
    'São Paulo',
  ],
  authors: [{ name: profile.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: profile.name,
    title: `${profile.name} — Engenheiro de Dados`,
    description,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: profile.name }],
    locale: 'pt_BR',
    alternateLocale: ['en_US'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — Engenheiro de Dados`,
    description,
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Aplica o tema antes da primeira pintura, evitando flash */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
