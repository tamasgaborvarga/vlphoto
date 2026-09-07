import { motion } from "framer-motion";
import { services } from "../data/services";
import { SectionHeading } from "./SectionHeading";
import { scrollToSection } from "../lib/scroll";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Csak a kategórianevek szerepelnek — leírás, ár és csomag nincs,
 * mert ilyen megerősített adat nem áll rendelkezésre.
 */
export function Services() {
  return (
    <section id="szolgaltatasok" className="surface scroll-mt-20 bg-bg py-24 sm:py-32">
      <div className="container-editorial">
        <SectionHeading eyebrow="Szolgáltatások" title="Fotózástípusok" />

        <div className="mt-14 grid gap-px border border-line bg-line sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease }}
                className="group flex min-h-56 flex-col justify-between bg-bg p-8 transition-colors duration-500 hover:bg-raise lg:p-9"
              >
                <Icon
                  size={26}
                  strokeWidth={0.9}
                  className="text-muted transition-colors duration-500 group-hover:text-fg"
                />
                <h3 className="mt-10 font-display text-2xl leading-tight tracking-tight text-fg">
                  {service.title}
                </h3>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="mt-14 flex justify-center"
        >
          <button
            type="button"
            onClick={() => scrollToSection("kapcsolat")}
            className="group relative overflow-hidden border border-fg px-10 py-4 text-[0.68rem] font-light font-mono uppercase tracking-[0.28em] text-fg"
          >
            <span className="absolute inset-0 -translate-x-full bg-fg transition-transform duration-500 ease-out group-hover:translate-x-0" />
            <span className="relative transition-colors duration-500 group-hover:text-bg">
              Időpont-egyeztetés
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
