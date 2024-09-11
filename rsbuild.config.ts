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
      "@hooks": "./src/hooks/*"
    },
  },
});
