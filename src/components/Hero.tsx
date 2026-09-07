import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { site } from "../data/site";
import { heroImage, photoSrc } from "../data/gallery";
import { scrollToSection } from "../lib/scroll";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      id="hero"
      className="surface-fixed-dark relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-bg"
    >
      {/* Háttérfotó – helyőrző, lásd src/data/gallery.ts */}
      <motion.img
        src={photoSrc(heroImage)}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Felső, lágyan elhaló fátyol a fejléc olvashatóságáért */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink/75 via-ink/30 to-transparent" />

      {/* Finom sötét fátyol a szöveg olvashatóságáért */}
      <div className="absolute inset-0 bg-ink/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/70" />

      <div className="container-editorial relative z-10 flex flex-col items-center pt-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease }}
          className="text-[0.6rem] font-light font-mono uppercase tracking-[0.42em] text-strong sm:text-[0.7rem]"
        >
          {site.region}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.66, duration: 1, ease }}
          className="mt-6 font-display text-[3.5rem] leading-[0.92] tracking-tight sm:text-8xl lg:text-[9rem]"
        >
          VL photo
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.05, duration: 0.9, ease }}
          className="mt-8 h-px w-24 origin-center bg-muted"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.9, ease }}
          className="mt-8 text-sm font-light font-mono uppercase tracking-[0.3em] text-strong sm:text-base"
        >
          {site.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.9, ease }}
          className="mt-12"
        >
          <button
            type="button"
            onClick={() => scrollToSection("galeria")}
            className="group relative overflow-hidden border border-strong/70 px-9 py-4 text-[0.68rem] font-light font-mono uppercase tracking-[0.28em] text-fg transition-colors duration-500 hover:border-fg"
          >
            <span className="absolute inset-0 -translate-y-full bg-fg transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <span className="relative transition-colors duration-500 group-hover:text-bg">
              Portfólió megtekintése
            </span>
          </button>
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={() => scrollToSection("galeria")}
        aria-label="Görgetés a galériához"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-strong transition-colors hover:text-fg sm:flex"
      >
        <span className="text-[0.55rem] font-light font-mono uppercase tracking-[0.32em]">Görgess</span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} strokeWidth={1} />
        </motion.span>
      </motion.button>
    </section>
  );
}
