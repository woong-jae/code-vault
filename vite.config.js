import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import preact from '@preact/preset-vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [tsconfigPaths(), preact(), cssInjectedByJsPlugin()],
  build: {
    rollupOptions: {
      input: {
        background: 'src/chrome-extension/background/index.ts',
        programmers: 'src/chrome-extension/platforms/programmers/index.ts',
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
});
