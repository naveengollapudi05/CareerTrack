
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Vite configuration for CareerTrack
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
