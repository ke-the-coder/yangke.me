import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    // outDir is resolved against `root`, so this keeps the bundle in ./dist
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    port: 9000,
    open: true,
  },
});
