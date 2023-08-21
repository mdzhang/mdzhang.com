import { defineConfig, presetIcons, presetWind, presetTypography } from 'unocss';

export default defineConfig({
  presets: [
    presetWind(),
    presetIcons({
      collections: {
        logos: () => import('@iconify-json/logos/icons.json').then((i) => i.default),
        uil: () => import('@iconify-json/uil/icons.json').then((l) => l.default),
        brands: () => import('@iconify-json/fa-brands/icons.json').then((l) => l.default),
      },
    }),
    presetTypography(),
  ],
});
