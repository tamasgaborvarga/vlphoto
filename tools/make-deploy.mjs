/**
 * Feltöltésre kész mappát készít a `dist-single/` tartalmából.
 *
 * A JS és a CSS bele van ágyazva az index.html-be, ezért a `deploy/index.html`
 * duplakattintással (file://) IS megnyílik — nem csak szerverről.
 *
 *   npm run deploy
 *
 * Az eredmény a `deploy/` mappa — ezt kell behúzni a Cloudflare Pages
 * felületére (Create project → Upload assets), vagy wrangler-rel feltölteni.
 */
import {
  existsSync,
  mkdirSync,
  rmSync,
  writeFileSync,
  readdirSync,
  statSync,
  copyFileSync,
} from "node:fs";
import { join } from "node:path";

const SRC = "dist-single";
const OUT = "deploy";

if (!existsSync(SRC)) {
  console.error(`Nincs meg a ${SRC}/ mappa. Futtasd előbb: npm run build:single`);
  process.exit(1);
}

/** Rekurzív másolás — a Node cpSync ezen a gépen (ékezetes útvonal) EIO-val elszáll. */
function copyDir(from, to) {
  mkdirSync(to, { recursive: true });
  for (const entry of readdirSync(from)) {
    const src = join(from, entry);
    const dst = join(to, entry);
    if (statSync(src).isDirectory()) copyDir(src, dst);
    else copyFileSync(src, dst);
  }
}

rmSync(OUT, { recursive: true, force: true });
copyDir(SRC, OUT);

// Cache-szabályok: a hasított assetek örökre, a HTML soha.
writeFileSync(
  join(OUT, "_headers"),
  `/galeria/*
  Cache-Control: public, max-age=604800

/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN

/index.html
  Cache-Control: public, max-age=0, must-revalidate
`,
);

// Egyoldalas alkalmazás: minden ismeretlen útvonal az index.html-re megy.
writeFileSync(join(OUT, "_redirects"), "/*  /index.html  200\n");

function sizeOf(dir) {
  let bytes = 0;
  let files = 0;
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) {
      const r = sizeOf(p);
      bytes += r.bytes;
      files += r.files;
    } else {
      bytes += s.size;
      files++;
    }
  }
  return { bytes, files };
}

const { bytes, files } = sizeOf(OUT);
console.log(`Kész: ${OUT}/  —  ${files} fájl, ${(bytes / 1024 / 1024).toFixed(1)} MB`);
console.log("");
console.log("Húzd be ezt a mappát: Cloudflare Pages → Create project → Upload assets");
console.log("");
console.log("A deploy/index.html duplakattintással is megnyílik — a JS és a CSS bele van ágyazva.");
console.log("Szerverrel:  npm run deploy:check   →  http://127.0.0.1:4300");

// ZIP is készül: a böngészős behúzás gyakran nem járja be az alkönyvtárakat
// (a galeria/ mappa kimarad), ezért ZIP-et biztonságosabb feltölteni.
// Saját ZIP-készítő, mert a Windows Compress-Archive visszaperjelet ír.
const ZIP = "vl-photo-deploy.zip";
try {
  const { makeZip } = await import("./make-zip.mjs");
  rmSync(ZIP, { force: true });
  const n = makeZip(OUT, ZIP);
  const zipMb = (statSync(ZIP).size / 1024 / 1024).toFixed(1);
  console.log("");
  console.log(`ZIP is kész: ${ZIP}  —  ${n} fájl, ${zipMb} MB`);
  console.log("Ha a mappa behúzása hiányos, ezt a ZIP-et húzd be helyette.");
} catch (err) {
  console.log("");
  console.log("(A ZIP nem készült el: " + err.message + " — a mappát tudod feltölteni.)");
}
