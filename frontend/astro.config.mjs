import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import UnoCSS from 'unocss/astro';
import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
  experimental: {
    assets: true
  },
  // used to generate images
  site: `http://${process.env.BASEURL}/`,
  trailingSlash: 'ignore',
  integrations: [
    sitemap(),
    UnoCSS({
      injectReset: true
    }),
    sanity({
      projectId: "TODO",
      dataset: "next",
      useCdn: true,
    }),
  ],
  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js']
    }
  }
});