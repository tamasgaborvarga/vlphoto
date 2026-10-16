import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'

/**
 * Egyfájlos build: minden CSS és JS beágyazva egyetlen HTML-be.
 * Így a `dist-single/index.html` duplakattintással is megnyílik (file://),
 * és e-mailben is átküldhető. A fotók és a betűtípusok továbbra is
 * internetről töltődnek.
 *
 * A beágyazás miatt EGYSZERRE CSAK EGY oldal épülhet (a kódszeletelés ki van
 * kapcsolva), ezért a két változat két külön futásban készül el:
 *
 *   npm run build:single     →  tools/build-single.mjs futtatja mindkettőt
 *
 * A `VL_OLDAL=b` környezeti változó választja a B verziót.
 */
const bVerzio = process.env.VL_OLDAL === 'b'

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), viteSingleFile()],
  build: {
    outDir: 'dist-single',
    // Csak az első futás üríti a mappát, különben a másik oldal eltűnne.
    emptyOutDir: !bVerzio,
    rollupOptions: {
      input: resolve(import.meta.dirname, bVerzio ? 'b.html' : 'index.html'),
    },
  },
})
