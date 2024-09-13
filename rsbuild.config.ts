import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    alias: {
      '@components': './src/components',
      '@api': './src/api',
      '@services': './src/services',
      '@pages': './src/pages',
      '@hooks': './src/hooks/*',
    },
  },
  html: {
    tags: [
      {
        tag: 'link',
        attrs: { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
      },
      {
        tag: 'link',
        attrs: {
          href: 'https://fonts.gstatic.com',
          rel: 'preconnect',
          crossorigin: true,
        },
      },
      {
        tag: 'link',
        attrs: {
          href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap',
          rel: 'stylesheet',
        },
      },
    ],
  },
});
