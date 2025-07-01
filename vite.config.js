import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import string from 'vite-plugin-string'
// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react(),string({
      include: ['**/*.xml'], // 👈 Enables raw XML imports
    })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    theme: {
  extend: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
  },
},
 },
})
