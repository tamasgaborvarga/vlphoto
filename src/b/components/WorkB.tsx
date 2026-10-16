import { useState } from "react";
import { photos } from "../../data/gallery";
import { collections } from "../../data/collections";
import { chapter } from "../chapters";
import { ChapterHeading } from "./ChapterHeading";
import { ImageB } from "./ImageB";
import { LightboxB } from "./LightboxB";

/**
 * A válogatás: mindhárom irányból két-két kép.
 *
 * Szándékosan MÁS képek, mint a 2. fejezet paneljein (ott az első kép áll) és
 * más a ritmusa is, mint a 4. fejezet kontaktlapjának: itt KÉT széles hasáb
 * van, ott három. Így a két képes fejezet nem ugyanúgy néz ki.
 */
const valogatas = collections
  .flatMap((c) => c.photos.slice(1, 3))
  .map((id) => photos.find((p) => p.id === id))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

export function WorkB() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ch = chapter("munka");

  return (
    <section className="wrap mt-24 sm:mt-32">
      <ChapterHeading id={ch.id} n={ch.n} title={ch.title} />

      <p className="mt-8 max-w-[640px] text-body text-graphite">
        Hat kép a három irányból. Bármelyik megnyitható nagyban, a teljes anyag pedig a
        negyedik fejezetben, kategóriákra szűrve várja.
      </p>

      {/* Két hasáb: a válogatásnak nagyobb képek járnak. A hasábos rend azért
          kell, mert az álló és fekvő képek így tarthatják a SAJÁT arányukat. */}
      <div className="mt-16 columns-1 gap-8 sm:columns-2">
        {valogatas.map((photo, i) => (
          <div key={photo.id} className="mb-8 break-inside-avoid">
            <ImageB
              photo={photo}
              priority={i < 2}
              onOpen={() => setOpenIndex(i)}
              sizes="(min-width: 640px) 50vw, 100vw"
            />
          </div>
        ))}
      </div>

      <LightboxB
        photos={valogatas}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  );
}
