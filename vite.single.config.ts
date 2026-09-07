import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { defineConfig } from 'vite'

/**
 * Egyfájlos build: minden CSS és JS beágyazva egyetlen HTML-be.
 * Így a `dist-single/index.html` duplakattintással is megnyílik (file://),
 * és e-mailben is átküldhető. A fotók és a betűtípusok továbbra is
 * internetről töltődnek.
 *
 *   npm run build:single
 */
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), viteSingleFile()],
  build: { outDir: 'dist-single', emptyOutDir: true },
})
