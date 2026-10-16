import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'

// base: './' — relatív hivatkozások a buildben, így a dist/index.html
// duplakattintással (file://) és bármilyen alkönyvtárból is működik.
//
// KÉT OLDAL épül:
//   index.html — az „A" verzió (sötét, EB Garamond)
//   b.html     — a „B" verzió (papírfehér, Inter Tight, számozott fejezetek)
// A kettő közös adatfájlokon (src/data) osztozik, minden más külön van.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        b: resolve(import.meta.dirname, 'b.html'),
      },
    },
  },
})
