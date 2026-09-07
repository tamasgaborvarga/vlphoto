import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categories, photos, type Category } from "../data/gallery";
import { SectionHeading } from "./SectionHeading";
import { GalleryItem } from "./GalleryItem";
import { Lightbox } from "./Lightbox";

const ease = [0.22, 1, 0.36, 1] as const;

/** Egyszerre ennyi kép kerül a rácsba; a többi a „Több kép" gombra töltődik. */
const ADAG = 30;

export function Gallery() {
  const [filter, setFilter] = useState<Category["id"]>("osszes");
  const [limit, setLimit] = useState(ADAG);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "osszes" ? photos : photos.filter((p) => p.category === filter)),
    [filter],
  );

  const shown = visible.slice(0, limit);
  const maradek = visible.length - shown.length;

  return (
    <section id="galeria" className="surface scroll-mt-20 bg-bg py-24 sm:py-32">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="Galéria"
          title="Válogatás a munkákból"
          description="Kattints bármelyik képre a teljes méretű nézethez."
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          role="tablist"
          aria-label="Galéria szűrése kategória szerint"
          className="mt-12 flex flex-wrap gap-2 sm:mt-14 sm:gap-3"
        >
          {categories.map((cat) => {
            const active = filter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setFilter(cat.id);
                  setLimit(ADAG); // szűrőváltáskor újra az elejéről
                }}
                className={`rounded-full border px-5 py-2.5 font-mono text-[0.65rem] font-light uppercase tracking-[0.2em] transition-all duration-300 ${
                  active
                    ? "border-fg bg-fg text-bg"
                    : "border-muted text-strong hover:border-strong hover:text-fg"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        <p className="mt-6 font-mono text-[0.7rem] font-light tracking-wide text-muted">
          {shown.length} / {visible.length} kép
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3"
          >
            {shown.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: Math.min(i % ADAG, 6) * 0.05, ease }}
                className="break-inside-avoid"
              >
                <GalleryItem photo={photo} index={i} onOpen={() => setOpenIndex(i)} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {maradek > 0 && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setLimit((l) => l + ADAG)}
              className="group relative overflow-hidden border border-muted px-10 py-4 font-mono text-[0.68rem] font-light uppercase tracking-[0.28em] text-fg transition-colors duration-500 hover:border-fg"
            >
              <span className="absolute inset-0 -translate-y-full bg-fg transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative transition-colors duration-500 group-hover:text-bg">
                Több kép ({maradek})
              </span>
            </button>
          </div>
        )}
      </div>

      <Lightbox
        photos={visible}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  );
}
