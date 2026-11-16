import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Базовый путь берётся из .env.production (GitHub Pages: /sodeystvie/).
// Для корневого домена задайте VITE_BASE=/ при сборке.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.VITE_BASE || '/',
    plugins: [react(), tailwindcss()],
  }
})
