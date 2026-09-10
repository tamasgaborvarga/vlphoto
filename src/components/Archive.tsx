import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categories, photos, type Category, type CategoryId } from "../data/gallery";
import { EditorialImage } from "./EditorialImage";
import { Lightbox } from "./Lightbox";

const ease = [0.22, 1, 0.36, 1] as const;
const ADAG = 24;

type Props = { filter: Category["id"]; onFilterChange: (id: Category["id"]) => void };

/**
 * A teljes anyag, szűrhetően. Masonry oszlopokban, hogy az álló és fekvő
 * képek természetes arányukkal keveredjenek.
 */
export function Archive({ filter, onFilterChange }: Props) {
  const [limit, setLimit] = useState(ADAG);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "osszes" ? photos : photos.filter((p) => p.category === filter)),
    [filter],
  );

  // Szűrőváltáskor újra az elejéről — állapotigazítás renderelés közben,
  // ez a React ajánlott mintája erre (nem effekt).
  const [latottSzuro, setLatottSzuro] = useState(filter);
  if (latottSzuro !== filter) {
    setLatottSzuro(filter);
    setLimit(ADAG);
  }

  const shown = visible.slice(0, limit);
  const maradek = visible.length - shown.length;

  return (
    <section id="archive" className="surface scroll-mt-20 bg-bg py-24 sm:py-32">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="flex items-baseline justify-between border-b border-line pb-6"
        >
          <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.32em] text-fg">
            Teljes anyag
          </h2>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-muted">
            {shown.length} / {visible.length}
          </span>
        </motion.div>

        <div
          role="tablist"
          aria-label="Szűrés kategória szerint"
          className="mt-8 flex flex-wrap gap-x-7 gap-y-3"
        >
          {categories.map((cat) => {
            const active = filter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onFilterChange(cat.id)}
                className={`-my-3 inline-flex min-h-11 items-center py-3 font-mono text-[0.62rem] uppercase tracking-[0.24em] transition-colors duration-500 ${
                  active ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {/* Az aláhúzás a belső spanon marad, hogy a nagyobb érintési
                    felület ne tolja el a vonalat a szövegtől. */}
                <span
                  className={`border-b pb-1 ${active ? "border-fg" : "border-transparent"}`}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 lg:gap-7"
          >
            {shown.map((photo, i) => (
              <div key={photo.id} className="mb-5 break-inside-avoid lg:mb-7">
                <EditorialImage
                  photo={photo}
                  onOpen={() => setOpenIndex(i)}
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {maradek > 0 && (
          <div className="mt-14 flex justify-center">
            <button
              type="button"
              onClick={() => setLimit((l) => l + ADAG)}
              className="group -my-3 inline-flex items-center gap-3 py-3 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-fg"
            >
              <span className="border-b border-fg/30 pb-1 transition-colors duration-500 group-hover:border-fg">
                Több kép
              </span>
              <span className="text-muted">{maradek}</span>
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

export type { CategoryId };
