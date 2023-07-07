import { defineConfig } from 'vite';
import { basename, dirname } from 'path';
import react from '@vitejs/plugin-react';
// eslint-disable-next-line import/extensions
import pkg from './package.json';


export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['esm'],
      fileName: basename(pkg.module, '.esm.js'),
    },
    outDir: dirname(pkg.module),
    sourcemap: true,
  },
  resolve: {
    mainFields: ['module', 'browser', 'main'],
  },
  test: {
    environment: 'jsdom',
  },
});
