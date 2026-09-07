import { useState } from "react";
import { motion } from "framer-motion";
import { photos, type CategoryId } from "../data/gallery";
import { collections } from "../data/collections";
import { EditorialImage } from "./EditorialImage";
import { Lightbox } from "./Lightbox";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = { onOpenCategory: (id: CategoryId) => void };

/**
 * A három fő irány külön blokkban. A látogató itt nem galériát böngész,
 * hanem szolgáltatást választ — ezért van mindegyik alatt egy kivezetés
 * a teljes anyaghoz.
 */
export function Collections({ onOpenCategory }: Props) {
  const [open, setOpen] = useState<{ list: typeof photos; index: number } | null>(null);

  return (
    <section className="surface bg-bg pb-24 sm:pb-32">
      {collections.map((collection, ci) => {
        const list = collection.photos
          .map((id) => photos.find((p) => p.id === id))
          .filter((p): p is NonNullable<typeof p> => Boolean(p));

        return (
          <div
            key={collection.id}
            className="container-editorial border-t border-line pt-16 sm:pt-20 lg:pt-24"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease }}
              className="lg:flex lg:items-end lg:justify-between"
            >
              <div>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-muted">
                  {String(ci + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-4 font-display text-5xl leading-none tracking-tight text-fg sm:text-6xl lg:text-7xl">
                  {collection.title}
                </h2>
                <p className="mt-5 max-w-md font-display text-lg italic text-strong sm:text-xl">
                  {collection.line}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenCategory(collection.id)}
                className="group mt-8 inline-flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-fg lg:mt-0"
              >
                <span className="border-b border-fg/30 pb-1 transition-colors duration-500 group-hover:border-fg">
                  Összes {collection.title.toLowerCase()} kép
                </span>
                <span className="transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                  →
                </span>
              </button>
            </motion.div>

            {/* Négy kép: egy nagyobb + három kísérő */}
            <div className="mt-10 grid grid-cols-12 gap-4 sm:mt-14 sm:gap-5">
              {list.map((photo, i) => (
                <div
                  key={photo.id}
                  className={
                    i === 0
                      ? "col-span-12 lg:col-span-7"
                      : i === 1
                        ? "col-span-12 sm:col-span-6 lg:col-span-5"
                        : "col-span-6 lg:col-span-6"
                  }
                >
                  <EditorialImage
                    photo={photo}
                    onOpen={() => setOpen({ list, index: i })}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <Lightbox
        photos={open?.list ?? []}
        index={open?.index ?? null}
        onClose={() => setOpen(null)}
        onNavigate={(index) => setOpen((o) => (o ? { ...o, index } : o))}
      />
    </section>
  );
}
