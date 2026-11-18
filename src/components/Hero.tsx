import { motion } from "framer-motion";
import { site } from "../data/site";
import { heroImage, heroImageMobil, photoSrc } from "../data/gallery";
import { scrollToSection } from "../lib/scroll";

/**
 * A nyitókép rövid áttűnéssel jelenik meg. Korábban 2,8 s-os nagyítás és
 * 2,7 s-ig rejtett szöveg volt — a fő gomb (Foglalj fotózást) így majdnem
 * három másodpercig nem volt használható.
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: heroEase }}
        className="absolute inset-0 h-full w-full object-cover sm:hidden"
      />
      {/* Asztali: fekvő kép */}
      <motion.img
        src={photoSrc(heroImage)}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: heroEase }}
        className="absolute inset-0 hidden h-full w-full object-cover sm:block"
      />

      {/* Csak ott sötétítünk, ahol szöveg van: fent a menü, lent a cím.
          A teljes képet fedő 30%-os fátyol kikerült — fotós oldalon a kép
          tompítása öngól. */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/60 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: heroEase }}
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
            className="group inline-flex min-h-11 items-center gap-3 self-start border border-fg/35 px-7 py-4 font-mono text-label uppercase tracking-[0.28em] text-fg transition-colors duration-200 hover:border-fg hover:bg-fg hover:text-bg sm:self-auto"
          >
            Foglalj fotózást
            <span className="transition-transform duration-200 ease-out group-hover:translate-x-1.5">
              &rarr;
            </span>
          </button>
        </div>
      </motion.div>

    </section>
  );
}
