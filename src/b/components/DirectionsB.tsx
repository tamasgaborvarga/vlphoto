import { photos, photoSrc, type CategoryId } from "../../data/gallery";
import { collections } from "../../data/collections";
import { chapter } from "../chapters";
import { ChapterHeading } from "./ChapterHeading";

type Props = { onOpenCategory: (id: CategoryId) => void };

/**
 * Három egyenlő szélességű panel — a lap egyetlen helye, ahol a kép
 * KERETKITÖLTŐ. Itt nem galériát nézünk, hanem irányt választunk, ezért az
 * azonos 3:4 arány fontosabb, mint az egyes képek eredeti aránya. A képek
 * alatt kétsoros felirat: cím, majd egy sor leírás — doboz, keret, felület
 * nélkül, közvetlenül a fehér lapon.
 */
export function DirectionsB({ onOpenCategory }: Props) {
  const ch = chapter("iranyok");

  return (
    <section className="wrap mt-24 sm:mt-32">
      <ChapterHeading id={ch.id} n={ch.n} title={ch.title} />

      <p className="mt-8 max-w-[640px] text-body text-graphite">
        Portré, páros és szabadtéri. Válassz egy irányt, és a teljes anyag rögtön arra
        szűrve nyílik meg.
      </p>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {collections.map((c) => {
          const kep = photos.find((p) => p.id === c.photos[0]);

          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onOpenCategory(c.id)}
              className="text-left"
            >
              {kep && (
                <figure className="aspect-[3/4] overflow-hidden rounded-xl bg-mist">
                  <img
                    src={photoSrc(kep)}
                    alt={kep.alt}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="h-full w-full object-cover"
                  />
                </figure>
              )}
              <p className="mt-6 text-body-sm text-ink-black">{c.title}</p>
              <p className="mt-3 text-body-sm text-graphite">{c.line}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
