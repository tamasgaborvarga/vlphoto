import { motion } from "framer-motion";
import { site } from "../data/site";
import { osszesKep, photoSrc } from "../data/gallery";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * A szekció csak ellenőrzött tényeket állít. A négy pont a megrendelő által
 * megadott szolgáltatás — nem kitalált stílusjegy. A személyes bemutatkozás
 * helye jelölve van, azt Lillának kell megírnia.
 */
const PONTOK = [
  "Portré",
  "Jegyes & páros",
  "Kreatív szabadtéri",
  "Karácsonyi & szezonális",
];

/** HELYŐRZŐ: Lilláról nincs fotónk, ezért az egyik munkája áll itt. */
const HELYORZO_KEP = "portre-091";

export function About() {
  const kep = osszesKep.find((p) => p.id === HELYORZO_KEP);

  return (
    <section id="about" className="surface-inverse scroll-mt-20 bg-bg py-24 text-fg sm:py-32 lg:py-40">
      <div className="container-editorial">
        <div className="grid grid-cols-12 gap-x-5 gap-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease }}
            className="col-span-12 lg:col-span-5"
          >
            {kep && (
              <figure className="bg-raise" style={{ aspectRatio: `${kep.width} / ${kep.height}` }}>
                <img
                  src={photoSrc(kep)}
                  alt="Helyőrző kép — ide Varga Lilla saját portréja kerül"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
              </figure>
            )}
            <p className="mt-3 font-mono text-[0.55rem] uppercase tracking-[0.24em] text-muted">
              Helyőrző — ide Lilla saját portréja kerül
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.12, ease }}
            className="col-span-12 lg:col-span-6 lg:col-start-7"
          >
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-muted">Rólam</p>

            <h2 className="mt-5 font-display text-5xl leading-none tracking-tight sm:text-6xl lg:text-7xl">
              {site.photographer}
            </h2>

            <p className="mt-6 font-mono text-base font-light tracking-[0.04em] text-strong sm:text-lg">
              Fotográfus, {site.region}en.
            </p>

            {/* HELYŐRZŐ — Lilla saját szavaival kell kitölteni. */}
            <div className="mt-10 border-l border-line pl-6">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.28em] text-muted">
                Kitöltésre vár
              </p>
              <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
                Ide Lilla rövid, személyes bemutatkozása kerül — hogyan dolgozik,
                mi számít neki egy fotózáson. Ezt a szöveget nem találjuk ki
                helyette.
              </p>
            </div>

            <ul className="mt-12 divide-y divide-line border-y border-line">
              {PONTOK.map((pont, i) => (
                <li key={pont} className="flex items-baseline gap-6 py-4">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg sm:text-xl">{pont}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
