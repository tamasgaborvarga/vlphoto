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
 *   npm run build:single     →  tools/build-single.mjs futtatja mindhármat
 *
 * A `VL_OLDAL=b` / `VL_OLDAL=c` környezeti változó választja a B / C verziót.
 */
const oldal = process.env.VL_OLDAL ?? 'a'
const BELEPO: Record<string, string> = { a: 'index.html', b: 'b.html', c: 'c.html' }

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), viteSingleFile()],
  build: {
    outDir: 'dist-single',
    // Csak az első futás üríti a mappát, különben a másik oldal eltűnne.
    emptyOutDir: oldal === 'a',
    rollupOptions: {
      input: resolve(import.meta.dirname, BELEPO[oldal] ?? 'index.html'),
    },
  },
})
