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
 * hanem szolgáltatást választ.
 *
 * MOBIL és ASZTALI elrendezés szándékosan KÜLÖNBÖZIK:
 *  - mobilon minden kép teljes szélességű, egymás alatt, a saját arányával;
 *  - asztali gépen szabálytalan, 12 oszlopos rács, blokkonként más mintával
 *    (a minta a collections.ts `layout` mezőjében van).
 * Egyik esetben sincs vágás: minden kép a saját arányát tartja.
 */
export function Collections({ onOpenCategory }: Props) {
  const [open, setOpen] = useState<{ list: typeof photos; index: number } | null>(null);

  return (
    <section id="work" className="surface scroll-mt-20 bg-bg pb-24 pt-24 sm:pb-32 sm:pt-32">
      {collections.map((collection, ci) => {
        const list = collection.photos
          .map((id) => photos.find((p) => p.id === id))
          .filter((p): p is NonNullable<typeof p> => Boolean(p));

        return (
          <div key={collection.id} className={ci > 0 ? "mt-28 sm:mt-36 lg:mt-48" : ""}>
            <div className="container-editorial">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease }}
                className="border-t border-line pt-14 lg:flex lg:items-end lg:justify-between"
              >
                <div>
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-muted">
                    {String(ci + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-4 font-display text-5xl leading-none tracking-tight text-fg sm:text-6xl lg:text-7xl">
                    {collection.title}
                  </h2>
                  <p className="mt-5 max-w-md font-display text-lg text-strong sm:text-xl">
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
                    &rarr;
                  </span>
                </button>
              </motion.div>
            </div>

            {/* MOBIL: teljes szélességű képek egymás alatt */}
            <div className="container-editorial mt-10 space-y-4 sm:hidden">
              {list.map((photo, i) => (
                <EditorialImage
                  key={photo.id}
                  photo={photo}
                  priority={ci === 0 && i === 0}
                  onOpen={() => setOpen({ list, index: i })}
                  sizes="100vw"
                />
              ))}
            </div>

            {/* ASZTALI: szabálytalan rács, blokkonként más mintával */}
            <div className="container-editorial hidden sm:block">
              <div className="mt-14 grid grid-cols-12 gap-5 lg:gap-7">
                {list.map((photo, i) => (
                  <div key={photo.id} className={collection.layout[i] ?? "col-span-6"}>
                    <EditorialImage
                      photo={photo}
                      priority={ci === 0 && i === 0}
                      onOpen={() => setOpen({ list, index: i })}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>
                ))}
              </div>
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
