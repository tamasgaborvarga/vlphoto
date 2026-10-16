import { site } from "../../data/site";
import { osszesKep, photoSrc } from "../../data/gallery";
import { chapter } from "../chapters";
import { ChapterHeading } from "./ChapterHeading";

/** A megrendelő által megerősített négy szolgáltatás — nem kitalált stílusjegy. */
const SZOLGALTATASOK = [
  "Portré",
  "Jegyes & páros",
  "Kreatív szabadtéri",
  "Karácsonyi & szezonális",
];

/** HELYŐRZŐ: Lilláról nincs fotónk, ezért az egyik munkája áll itt. */
const HELYORZO_KEP = "portre-091";

export function AboutB() {
  const ch = chapter("rolam");
  const kep = osszesKep.find((p) => p.id === HELYORZO_KEP);

  return (
    <section className="wrap mt-24 sm:mt-32">
      <ChapterHeading id={ch.id} n={ch.n} title={ch.title} />

      <p className="mt-8 max-w-[640px] text-body text-graphite">
        {site.photographer} fotográfus, {site.regionLong}. Portré, jegyes és páros,
        szezonális, valamint kreatív szabadtéri fotózással foglalkozik.
      </p>

      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          {kep && (
            <figure
              className="overflow-hidden rounded-xl bg-mist"
              style={{ aspectRatio: `${kep.width} / ${kep.height}` }}
            >
              <img
                src={photoSrc(kep)}
                alt="Helyőrző kép — ide Varga Lilla saját portréja kerül"
                loading="lazy"
                decoding="async"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-full w-full object-cover"
              />
            </figure>
          )}
          <p className="mt-3 text-caption text-ash">
            Helyőrző — ide Lilla saját portréja kerül
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          {/* HELYŐRZŐ — a személyes bemutatkozást Lillának kell megírnia.
              Nem találjuk ki helyette. */}
          <p className="text-caption text-ash">Kitöltésre vár</p>
          <p className="mt-3 max-w-[640px] text-body text-graphite">
            Ide Lilla rövid, személyes bemutatkozása kerül — hogyan dolgozik, mi számít
            neki egy fotózáson.
          </p>

          {/* Csíkozott lista: a sorokat KIZÁRÓLAG a háttérváltás választja el,
              vonal és keret nincs. */}
          <ul className="mt-12">
            {SZOLGALTATASOK.map((sz, i) => (
              <li
                key={sz}
                className={`flex items-baseline gap-6 px-4 py-4 ${
                  i % 2 === 0 ? "bg-mist" : "bg-paper"
                }`}
              >
                <span className="text-caption text-ash">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-body-sm text-ink-black">{sz}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
