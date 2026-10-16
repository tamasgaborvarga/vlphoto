/**
 * Egyfájlos build MINDHÁROM változatból.
 *
 * A vite-plugin-singlefile mindent egyetlen HTML-be ágyaz, ezért nem tud több
 * belépési pontot egyszerre kezelni — két futásra van szükség:
 *
 *   1) index.html  (A verzió — sötét, EB Garamond)
 *   2) b.html      (B verzió — papírfehér, Inter Tight, számozott fejezetek)
 *   3) c.html      (C verzió — „Monográfia”, Clash Grotesk + Satoshi)
 *
 * Az eredmény: dist-single/index.html, b.html és c.html.
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// A vite saját belépőjét hívjuk node-dal — az `npx` .cmd-je ékezetes útvonalon
// shell nélkül nem indul el ezen a gépen.
const viteBin = fileURLToPath(new URL("../node_modules/vite/bin/vite.js", import.meta.url));

const futtat = (oldal) => {
  const cimke = { a: "A verzió (index.html)", b: "B verzió (b.html)", c: "C verzió (c.html)" }[oldal];
  console.log(`\n--- ${cimke} ---`);
  const r = spawnSync(
    process.execPath,
    [viteBin, "build", "--config", "vite.single.config.ts"],
    { stdio: "inherit", env: { ...process.env, VL_OLDAL: oldal } },
  );
  if (r.status !== 0) process.exit(r.status ?? 1);
};

futtat("a");
futtat("b");
futtat("c");
