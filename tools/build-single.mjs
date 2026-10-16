/**
 * Egyfájlos build MINDKÉT változatból.
 *
 * A vite-plugin-singlefile mindent egyetlen HTML-be ágyaz, ezért nem tud több
 * belépési pontot egyszerre kezelni — két futásra van szükség:
 *
 *   1) index.html  (A verzió — sötét, EB Garamond)
 *   2) b.html      (B verzió — papírfehér, Inter Tight, számozott fejezetek)
 *
 * Az eredmény: dist-single/index.html és dist-single/b.html.
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// A vite saját belépőjét hívjuk node-dal — az `npx` .cmd-je ékezetes útvonalon
// shell nélkül nem indul el ezen a gépen.
const viteBin = fileURLToPath(new URL("../node_modules/vite/bin/vite.js", import.meta.url));

const futtat = (oldal) => {
  const cimke = oldal === "b" ? "B verzió (b.html)" : "A verzió (index.html)";
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
