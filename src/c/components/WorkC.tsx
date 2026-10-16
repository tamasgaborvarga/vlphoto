import { useEffect, useRef, useState } from "react";
import { categories, photos, photoSrc } from "../../data/gallery";
import { collections } from "../../data/collections";
import { ChapterHead, LightboxC } from "./parts";

/**
 * 01 — Válogatott munkák: VÍZSZINTES sor natív görgetéssel (Kertvéllesy B
 * referenciasora). Minden kép azonos MAGASSÁGÚ, a szélességet a saját aránya
 * adja — álló és fekvő kép vágás nélkül áll egymás mellett.
 *
 * Irányonként három kép (a gyűjtemények 2–4. képe; az első a 02-es fejezet
 * előnézete), így a két fejezet nem ugyanazokat mutatja.
 */
const valogatas = collections
  .flatMap((c) => c.photos.slice(1, 4))
  .map((id) => photos.find((p) => p.id === id))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

const cimke = (id: string) => categories.find((c) => c.id === id)?.label ?? "";

export function WorkC() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const row = useRef<HTMLUListElement>(null);
  const [pos, setPos] = useState({ start: true, end: false, p: 0 });

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const on = () => {
      const max = el.scrollWidth - el.clientWidth;
      setPos({ start: el.scrollLeft < 4, end: el.scrollLeft > max - 4, p: max > 0 ? el.scrollLeft / max : 0 });
    };
    on();
    el.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      el.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  const lep = (d: number) => {
    const el = row.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: d * el.clientWidth * 0.7, behavior: still ? "auto" : "smooth" });
  };

  return (
    <section id="munka" className="c-sec" aria-labelledby="munka-cim">
      <ChapterHead id="munka" aside={`${valogatas.length} kép · három irányból`} />

      <ul ref={row} className="c-row" aria-label="Válogatott képek, oldalra görgethető" tabIndex={0}>
        {valogatas.map((photo, i) => (
          <li key={photo.id} className="c-row-item" data-rv>
            <button
              type="button"
              className="c-row-btn"
              onClick={() => setOpenIndex(i)}
              aria-label={`Nagyítás: ${photo.alt}`}
            >
              <span className="c-row-media" style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
                <img
                  src={photoSrc(photo)}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading={i < 3 ? "eager" : "lazy"}
                  decoding="async"
                />
              </span>
            </button>
            <p className="c-row-cap">
              <span className="c-no">{String(i + 1).padStart(2, "0")}</span>
              <span>{cimke(photo.category)}</span>
            </p>
          </li>
        ))}
      </ul>

      <div className="c-wrap c-row-ctl">
        <span className="c-row-track" aria-hidden="true">
          <span style={{ transform: `scaleX(${Math.max(0.06, pos.p)})` }} />
        </span>
        <div className="c-row-btns">
          <button type="button" className="c-arrow" onClick={() => lep(-1)} disabled={pos.start} aria-label="Vissza">
            <span aria-hidden="true" className="c-arr c-arr-l" />
          </button>
          <button type="button" className="c-arrow" onClick={() => lep(1)} disabled={pos.end} aria-label="Tovább">
            <span aria-hidden="true" className="c-arr" />
          </button>
        </div>
      </div>

      <LightboxC photos={valogatas} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
    </section>
  );
}
