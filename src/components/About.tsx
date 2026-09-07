import { motion } from "framer-motion";
import { site } from "../data/site";
import { services } from "../data/services";
import { scrollToSection } from "../lib/scroll";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * A szekció szándékosan csak ellenőrzött tényeket állít: a név, a tevékenység,
 * a város és a szolgáltatások listája. Bemutatkozó szöveget NEM találunk ki.
 *
 * Kép jelenleg nincs a szekcióban: Lilláról nincs fotónk. Ha ad egyet,
 * ide kerül — lásd a README-t.
 */
export function About() {
  return (
    <section id="rolam" className="surface-inverse scroll-mt-20 bg-bg py-24 text-fg sm:py-32">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="max-w-3xl"
        >
          <p className="font-mono text-[0.6rem] font-light uppercase tracking-[0.38em] text-muted">
            Rólam
          </p>

          <h2 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {site.photographer}
          </h2>

          <p className="mt-8 text-lg font-light leading-relaxed text-strong sm:text-xl">
            Fotográfus, {site.brand} néven dolgozom {site.region}en. Portré, jegyes
            és páros, karácsonyi és szezonális, valamint kreatív szabadtéri
            fotózást vállalok.
          </p>

          <ul className="mt-10 flex flex-wrap gap-2">
            {services.map((service) => (
              <li
                key={service.id}
                className="rounded-full border border-line px-4 py-2 font-mono text-[0.62rem] font-light uppercase tracking-[0.16em] text-strong"
              >
                {service.title}
              </li>
            ))}
          </ul>

          {/* HELYŐRZŐ — élesítés előtt Lilla saját szövegével kell kitölteni.
              Szándékosan látható, hogy ne maradjon benne észrevétlenül. */}
          <div className="mt-12 border-l-2 border-line py-1 pl-5">
            <p className="font-mono text-[0.6rem] font-light uppercase tracking-[0.28em] text-muted">
              Kitöltésre vár
            </p>
            <p className="mt-2 text-sm font-light leading-relaxed text-muted">
              Ide Lilla saját bemutatkozása kerül — hogyan dolgozik, mi számít neki
              egy fotózáson. Ezt a szöveget nem találjuk ki helyette. Ha ad magáról
              fotót, az is ebbe a szekcióba kerül.
            </p>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection("kapcsolat")}
            className="group mt-12 inline-flex items-center gap-3 border-b border-fg pb-1 font-mono text-[0.68rem] font-light uppercase tracking-[0.28em] text-fg"
          >
            Írj nekem
            <span className="transition-transform duration-500 ease-out group-hover:translate-x-1.5">
              →
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
