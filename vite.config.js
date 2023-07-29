import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [tsconfigPaths(), preact()],
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
