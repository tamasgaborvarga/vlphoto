import { motion } from "framer-motion";
import { scrollToSection } from "../lib/scroll";

const ease = [0.22, 1, 0.36, 1] as const;

/** Egyetlen, hangsúlyos kivezetés a kapcsolathoz. */
export function Cta() {
  return (
    <section className="surface bg-bg py-28 sm:py-36 lg:py-44">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease }}
        className="container-editorial text-center"
      >
        <h2 className="mx-auto max-w-4xl font-display text-4xl leading-[1.05] tracking-tight text-fg sm:text-6xl lg:text-7xl">
          Alkossunk együtt valami szépet.
        </h2>

        <p className="mx-auto mt-7 max-w-lg font-mono text-sm font-light tracking-[0.04em] text-strong sm:text-base">
          Mesélj a fotózásról, amit elképzeltél.
        </p>

        <button
          type="button"
          onClick={() => scrollToSection("contact")}
          className="group mt-12 inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-fg"
        >
          <span className="border-b border-fg/40 pb-1.5 transition-colors duration-500 group-hover:border-fg">
            Kapcsolat
          </span>
          <span className="transition-transform duration-500 ease-out group-hover:translate-x-2">
            →
          </span>
        </button>
      </motion.div>
    </section>
  );
}
