import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import UnoCSS from 'unocss/astro';
import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  experimental: {
    assets: true,
  },
  // used to generate images
  site: `http://${process.env.BASEURL}/`,
  trailingSlash: 'ignore',
  integrations: [
    sitemap(),
    UnoCSS({
      injectReset: true,
    }),
    sanity({
      projectId: 'n3ww3z3p',
      dataset: 'production',
      apiVersion: '2023-02-08',
      useCdn: true,
    }),
  ],
  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
  },
});
