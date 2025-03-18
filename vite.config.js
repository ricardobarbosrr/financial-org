const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');

module.exports = defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5000,
    strictPort: true,
  },
  css: {
    postcss: './postcss.config.js',
  },
});
