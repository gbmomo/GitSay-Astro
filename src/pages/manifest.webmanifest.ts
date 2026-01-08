import siteConfig from '@config/site';
import { DEFAULT_LOCALE } from '@lib/language';

export async function GET() {
  const defaultLang = DEFAULT_LOCALE;
  const title = siteConfig.title[defaultLang] ?? siteConfig.title.en;
  const description = siteConfig.description[defaultLang] ?? siteConfig.description.en;

  const manifest = {
    name: title,
    short_name: title,
    description,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    lang: defaultLang,
    icons: [
      { src: '/favicon.png', sizes: 'any', type: 'image/png' },
    ],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
