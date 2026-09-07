/**
 * Galéria-generátor.
 *
 *   1. Másold a fotókat a `public/galeria/` mappába.
 *   2. A FÁJLNÉV ELEJE adja a kategóriát:
 *        portre-*.jpg       → Portré
 *        paros-*.jpg        → Páros & Jegyes
 *        szezonalis-*.jpg   → Szezonális
 *        kreativ-*.jpg      → Kreatív szabadtéri
 *   3. Futtasd:  npm run galeria
 *
 * A meglévő `alt` szövegeket megtartja (fájlnév alapján), az újakat üresen
 * hagyja és a végén kiírja, melyikhez kell még leírás.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { imageSize } from "./image-size.mjs";

const DIR = "public/galeria";
const OUT = "src/data/photos.generated.ts";
const PREFIXES = { portre: "portre", paros: "paros", szezonalis: "szezonalis", kreativ: "kreativ" };

if (!existsSync(DIR)) {
  console.error(`Nincs meg a mappa: ${DIR}`);
  process.exit(1);
}

// meglévő alt szövegek megőrzése
const previous = new Map();
if (existsSync(OUT)) {
  const src = readFileSync(OUT, "utf8");
  for (const m of src.matchAll(/id:\s*"([^"]+)"[\s\S]*?alt:\s*"([^"]*)"/g)) previous.set(m[1], m[2]);
}

const files = readdirSync(DIR)
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  .sort();

const photos = [];
const unknown = [];
const missingAlt = [];

for (const file of files) {
  const id = file.replace(/\.[^.]+$/, "");
  const prefix = id.split("-")[0];
  const category = PREFIXES[prefix];
  if (!category) { unknown.push(file); continue; }

  const { width, height } = imageSize(join(DIR, file));
  const alt = previous.get(id) ?? "";
  if (!alt) missingAlt.push(file);
  photos.push({
    id,
    category,
    src: `galeria/${file}`,
    full: `galeria/nagy/${file}`,
    alt,
    width,
    height,
  });
}

const body = photos
  .map(
    (p) => `  {
    id: ${JSON.stringify(p.id)},
    category: ${JSON.stringify(p.category)},
    src: ${JSON.stringify(p.src)},
    full: ${JSON.stringify(p.full)},
    alt: ${JSON.stringify(p.alt)},
    width: ${p.width},
    height: ${p.height},
  },`,
  )
  .join("\n");

writeFileSync(
  OUT,
  `// GENERÁLT FÁJL — ne szerkeszd kézzel, kivéve az \`alt\` szövegeket.
// Újragenerálás: npm run galeria
import type { Photo } from "./gallery";

export const generatedPhotos: Photo[] = [
${body}
];
`,
);

console.log(`${photos.length} kép beírva ide: ${OUT}`);
for (const [cat] of Object.entries(PREFIXES)) {
  const n = photos.filter((p) => p.category === cat).length;
  if (n) console.log(`  ${cat}: ${n}`);
}
if (unknown.length) {
  console.log(`\nISMERETLEN ELŐTAG, kimaradt (${unknown.length}):`);
  unknown.forEach((f) => console.log(`  ${f}  → nevezd át pl. portre-...`));
}
if (missingAlt.length) {
  console.log(`\nHIÁNYZÓ ALT SZÖVEG (${missingAlt.length}) — írd be a ${OUT} fájlban:`);
  missingAlt.forEach((f) => console.log(`  ${f}`));
}
