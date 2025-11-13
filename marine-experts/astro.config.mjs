// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

const SITE = process.env.SITE || 'https://marineexpertsuae.com';

export default defineConfig({
  site: SITE,
  output: 'server',
  adapter: vercel(),
  // Allow access from other devices on your LAN during `astro dev`
  server: {
    host: true, // binds to 0.0.0.0
    // port: 4321, // uncomment to force a specific port (default is 4321)
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
  image: {
    service: {
      // Use Astro's built-in assets service with Sharp for Astro v5
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  vite: {
    ssr: {
      external: [],
    },
  },
});
