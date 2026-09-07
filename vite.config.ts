import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// base: './' — relatív hivatkozások a buildben, így a dist/index.html
// duplakattintással (file://) és bármilyen alkönyvtárból is működik.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
