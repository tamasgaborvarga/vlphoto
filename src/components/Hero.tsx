import { motion } from "framer-motion";
import { site } from "../data/site";
import { heroImage, photoSrc } from "../data/gallery";
import { scrollToSection } from "../lib/scroll";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Teljes képernyős nyitókép. A fotó adja el a fotóst, a szöveg csak keretezi:
 * márkanév, egy sor, három irány, egyetlen halk gomb.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="surface-fixed-dark relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-bg"
    >
      <motion.img
        src={photoSrc(heroImage)}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Fátylak: fent a fejléchez, lent a szöveghez */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/70 to-transparent" />
      <div className="absolute inset-0 bg-ink/30" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/60 to-transparent" />

      <div className="container-editorial relative z-10 pb-16 sm:pb-20 lg:pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.1, ease }}
          className="font-display text-[3.25rem] leading-[0.9] tracking-[-0.01em] text-fg sm:text-8xl lg:text-[8.5rem]"
        >
          VL photo
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.9, ease }}
          className="mt-4 font-display text-xl text-strong sm:text-2xl lg:text-3xl"
        >
          {site.heroLine}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95, duration: 1, ease }}
          className="mt-10 flex flex-col gap-8 border-t border-fg/15 pt-7 sm:mt-14 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="space-y-2">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-fg">
              Portré <span className="text-muted">&middot;</span> Páros{" "}
              <span className="text-muted">&middot;</span> Szabadtéri
            </p>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-muted">
              {site.regionLong}
            </p>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="group inline-flex items-center gap-3 self-start font-mono text-[0.68rem] uppercase tracking-[0.28em] text-fg sm:self-auto"
          >
            <span className="border-b border-fg/40 pb-1 transition-colors duration-500 group-hover:border-fg">
              Foglalj fotózást
            </span>
            <span className="transition-transform duration-500 ease-out group-hover:translate-x-1.5">
              →
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
