// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://galtyou.dev',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    // Sin la opción i18n: empareja por ruta literal y las rutas localizadas
    // difieren (/sobre-mi/ vs /en/about/). Los hreflang reales los emite
    // Layout.astro en cada página.
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
