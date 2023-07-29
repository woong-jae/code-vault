import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
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
