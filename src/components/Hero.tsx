import { motion } from "framer-motion";
import { site } from "../data/site";
import { heroImage, heroImageMobil, photoSrc } from "../data/gallery";
import { scrollToSection } from "../lib/scroll";

/**
 * A nyitóblokk szövegéhez lágyabb görbe és hosszabb idő tartozik, mint az
 * oldal többi mozgásához. A [0.22, 1, 0.36, 1] nagyon gyorsan indul —
 * ez apró elemeken jó, egy teljes képernyős nyitóképen viszont rántásnak
 * hat. A [0.16, 0.84, 0.24, 1] egyenletesebben gyorsul és lassul.
 */
const heroEase = [0.16, 0.84, 0.24, 1] as const;

/**
 * Teljes képernyős nyitókép, ráúsztatott szöveggel.
 *
 * Két külön képfájl: asztalon fekvő, mobilon ÁLLÓ. Így mindkét arányban
 * megmarad a teljes képernyős hatás anélkül, hogy a kitöltés komoly részt
 * vágna le a kompozícióból.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="surface-fixed-dark relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-bg"
    >
      {/* Mobil: álló kép */}
      <motion.img
        src={photoSrc(heroImageMobil)}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.8, ease: heroEase }}
        className="absolute inset-0 h-full w-full object-cover sm:hidden"
      />
      {/* Asztali: fekvő kép */}
      <motion.img
        src={photoSrc(heroImage)}
        alt=""
        aria-hidden="true"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.8, ease: heroEase }}
        className="absolute inset-0 hidden h-full w-full object-cover sm:block"
      />

      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/70 to-transparent" />
      <div className="absolute inset-0 bg-ink/30" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/60 to-transparent" />

      {/* A teljes szövegblokk EGYETLEN animációval jelenik meg — nincs
          lépcsőzés, minden egyszerre úszik be. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 2, ease: heroEase }}
        className="container-editorial relative z-10 pb-16 sm:pb-20 lg:pb-24"
      >
        <h1
          className="font-display text-[3.25rem] leading-[0.9] tracking-[-0.01em] text-fg sm:text-8xl lg:text-[8.5rem]"
        >
          VL photo
        </h1>

        <p
          className="mt-4 font-display text-xl text-strong sm:text-2xl lg:text-3xl"
        >
          {site.heroLine}
        </p>

        <div
          className="mt-10 flex flex-col gap-8 border-t border-fg/15 pt-7 sm:mt-14 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="font-mono text-label uppercase tracking-[0.18em] text-fg sm:tracking-[0.3em]">
            Portré <span className="text-muted">&middot;</span> Páros{" "}
            <span className="text-muted">&middot;</span> Szabadtéri
          </p>

          {/* A megkeresés az oldal fő üzleti célja, ezért a gomb kap keretet és
              felületet — így súlyosabb, mint a mellette lévő felsorolás.
              Nem harsány: vékony keret, kitöltés csak hoverre. */}
          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="group inline-flex min-h-11 items-center gap-3 self-start border border-fg/35 px-7 py-4 font-mono text-label uppercase tracking-[0.28em] text-fg transition-colors duration-500 hover:border-fg hover:bg-fg hover:text-bg sm:self-auto"
          >
            Foglalj fotózást
            <span className="transition-transform duration-500 ease-out group-hover:translate-x-1.5">
              &rarr;
            </span>
          </button>
        </div>
      </motion.div>

      {/* Görgetésjelző. Teljes képernyős nyitóképnél kell egy halk jelzés,
          hogy van lejjebb — enélkül a látogatók egy része nem görget. */}
      <motion.button
        type="button"
        onClick={() => scrollToSection("work")}
        aria-label="Görgetés a munkákhoz"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1.2, ease: heroEase }}
        className="absolute bottom-7 left-1/2 z-10 hidden h-12 w-px -translate-x-1/2 overflow-hidden bg-fg/20 sm:block"
      >
        <motion.span
          animate={{ y: ["-110%", "220%"] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-x-0 top-0 block h-1/2 bg-fg/80"
        />
      </motion.button>
    </section>
  );
}
