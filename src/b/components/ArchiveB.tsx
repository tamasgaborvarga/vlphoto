import { useMemo, useState } from "react";
import { categories, photos, type Category } from "../../data/gallery";
import { chapter } from "../chapters";
import { ChapterHeading } from "./ChapterHeading";
import { ImageB } from "./ImageB";
import { LightboxB } from "./LightboxB";

const ADAG = 24;

type Props = { filter: Category["id"]; onFilterChange: (id: Category["id"]) => void };

/**
 * A teljes anyag, kategóriára szűrve.
 *
 * A szűrők a rendszer két gombváltozata: az aktív a KITÖLTÖTT sötét, a többi
 * a világos, hajszálkeretes. Így nincs szükség kiemelő színre ahhoz, hogy
 * látsszon, épp mi van kiválasztva.
 */
export function ArchiveB({ filter, onFilterChange }: Props) {
  const ch = chapter("archivum");
  const [limit, setLimit] = useState(ADAG);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "osszes" ? photos : photos.filter((p) => p.category === filter)),
    [filter],
  );

  // Szűrőváltáskor újra az elejéről — állapotigazítás renderelés közben.
  const [latottSzuro, setLatottSzuro] = useState(filter);
  if (latottSzuro !== filter) {
    setLatottSzuro(filter);
    setLimit(ADAG);
  }

  const shown = visible.slice(0, limit);
  const maradek = visible.length - shown.length;

  return (
    <section className="wrap mt-24 sm:mt-32">
      <ChapterHeading id={ch.id} n={ch.n} title={ch.title} />

      <p className="mt-8 max-w-[640px] text-body text-graphite">
        A teljes anyag, kategóriára szűrve. Látható: {shown.length} / {visible.length} kép.
      </p>

      <div role="tablist" aria-label="Szűrés kategória szerint" className="mt-8 flex flex-wrap gap-4">
        {categories.map((cat) => {
          const active = filter === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onFilterChange(cat.id)}
              className={`inline-flex min-h-11 items-center rounded-lg px-4 py-3 text-body-sm ${
                active
                  ? "bg-charcoal text-paper"
                  : "border border-fog bg-paper text-ink-black"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <div key={filter} className="mt-16 columns-1 gap-8 sm:columns-2 lg:columns-3">
        {shown.map((photo, i) => (
          <div key={photo.id} className="mb-8 break-inside-avoid">
            <ImageB
              photo={photo}
              onOpen={() => setOpenIndex(i)}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </div>
        ))}
      </div>

      {maradek > 0 && (
        <div className="mt-16 flex justify-center">
          <button
            type="button"
            onClick={() => setLimit((l) => l + ADAG)}
            className="inline-flex min-h-11 items-center rounded-lg border border-fog bg-paper px-4 py-3 text-body-sm text-ink-black"
          >
            Több kép ({maradek})
          </button>
        </div>
      )}

      <LightboxB
        photos={visible}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  );
}
