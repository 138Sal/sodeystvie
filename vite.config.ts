import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Обычная сборка живёт в корне домена, публикация через Nios Apps — в подкаталоге.
export default defineConfig(({ mode }) => ({
  base: mode === 'tunnel' ? '/apps/sodeystvie/' : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
}))
