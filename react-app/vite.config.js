import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    // Raise warning limit slightly — our chunks are intentionally split
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Split vendor libs into separate cached chunks
        manualChunks: {
          // React core — changes rarely, cached long-term
          "vendor-react": ["react", "react-dom"],
          // Router
          "vendor-router": ["react-router-dom"],
          // Redux
          "vendor-redux": ["@reduxjs/toolkit", "react-redux"],
          // Toast
          "vendor-toast": ["react-hot-toast"],
        },
      },
    },

    // Faster minification with esbuild (default, but explicit)
    minify: "esbuild",

    // Generate source maps only in dev
    sourcemap: false,

    // Target modern browsers — smaller output, no legacy polyfills
    target: "es2020",
  },

  // Pre-bundle deps for faster dev server cold start
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@reduxjs/toolkit",
      "react-redux",
      "react-hot-toast",
    ],
  },
})
