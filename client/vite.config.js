// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Add this server configuration
  server: {
    proxy: {
      // Proxy API requests to your backend server
      '/api': {
        target: 'http://localhost:3000', // Your backend server URL
        changeOrigin: true, // Recommended for virtual hosted sites
        secure: false,      // Recommended for local development
      },
    },
  },
})
