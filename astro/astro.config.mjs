// @ts-check
import { defineConfig } from 'astro/config';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://maisallerquoi.netlify.app',
  base: '/',
  output: 'hybrid',
  adapter: netlify(),
});