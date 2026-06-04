import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Pin the CSS minification target so esbuild emits the standard
    // `backdrop-filter` property regardless of the build host's Node version.
    // Without this, Vercel's toolchain dropped the unprefixed property and
    // kept only `-webkit-backdrop-filter`, breaking the glass blur in
    // browsers that don't honor the prefixed form.
    cssTarget: ['chrome90', 'firefox90', 'safari15', 'edge90'],
  },
})
