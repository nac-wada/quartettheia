import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',     // すでにあるはずです
        splash: './splash.html',  // これを追加！
      },
    },
  },
});