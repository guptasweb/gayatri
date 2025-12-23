import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  base: '/', // Change to '/gayatri/' if your repo name is 'gayatri' and you're not using a custom domain
})

