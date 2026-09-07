import { motion } from "framer-motion";
import { photos } from "../data/gallery";
import { selectedWork } from "../data/collections";
import { EditorialImage } from "./EditorialImage";
import { Lightbox } from "./Lightbox";
import { useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** A span-értékek rácsbeli megfelelője (12 oszlopos rács). */
const SPAN: Record<string, string> = {
  full: "col-span-12",
  wide: "col-span-12 lg:col-span-8 lg:col-start-5",
  half: "col-span-12 sm:col-span-6",
  narrow: "col-span-12 sm:col-span-8 lg:col-span-5",
};

export function SelectedWork() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = selectedWork
    .map((w) => ({ ...w, photo: photos.find((p) => p.id === w.id) }))
    .filter((w): w is typeof w & { photo: NonNullable<typeof w.photo> } => Boolean(w.photo));

  return (
    <section id="work" className="surface scroll-mt-20 bg-bg py-24 sm:py-32 lg:py-40">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="flex items-baseline justify-between border-b border-line pb-6"
        >
          <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.32em] text-fg">
            Selected work
          </h2>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-muted">
            {String(items.length).padStart(2, "0")}
          </span>
        </motion.div>

        {/* Változó képméretek, sok levegő — magazin-elrendezés */}
        <div className="mt-12 grid grid-cols-12 gap-x-5 gap-y-16 sm:mt-16 sm:gap-y-24 lg:gap-y-32">
          {items.map((item, i) => (
            <div key={item.id} className={SPAN[item.span]}>
              <EditorialImage
                photo={item.photo}
                priority={i < 2}
                onOpen={() => setOpenIndex(i)}
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        photos={items.map((i) => i.photo)}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  );
}
