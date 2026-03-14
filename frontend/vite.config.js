import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite' // Add this

export default defineConfig({
  server: {
    host: '0.0.0.0', // This exposes the project on your local network
    port: 5173      // Optional: specify a port
  },
  plugins: [
    vue(),
    tailwindcss(), // Add this here
  ],
})