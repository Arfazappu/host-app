import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  federation({
    name: 'hostApp',
    remotes: {
      // loginApp: 'http://localhost:4173/assets/remoteEntry.js',
      // taskApp: 'http://localhost:4174/assets/remoteEntry.js',
      loginApp: 'https://login-remote-app.vercel.app/assets/remoteEntry.js',
      taskApp: 'https://task-remote-app.vercel.app/assets/remoteEntry.js',
    },
    shared: ['react', 'react-dom', 'react-router-dom'],
  })
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
