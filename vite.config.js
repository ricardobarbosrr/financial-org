const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');

module.exports = defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 3000,
    strictPort: true,
  },
  css: {
    postcss: './postcss.config.cjs',
  },
});
