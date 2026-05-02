import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/evaluation-service': {
        target: 'https://20.207.122.201',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
