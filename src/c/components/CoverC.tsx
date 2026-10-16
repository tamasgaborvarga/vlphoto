import { useEffect, useRef, useState } from "react";
import { site } from "../../data/site";
import { categories, heroImage, heroImageMobil, photos, photoSrc } from "../../data/gallery";
import { scrollToSection } from "../../lib/scroll";

/**
 * 100svh borító, a cím a képen (Kertvéllesy B „Monográfia”). Álló kijelzőn az
 * álló nyitókép jön, fekvőn a fekvő — `<picture>`, így csak az egyik töltődik.
 * A kép csak betöltve jelenik meg (`is-ready`), és egy lassú, finom
 * kicsinyítéssel ül a helyére.
 */
export function CoverC() {
  const [ready, setReady] = useState(false);

  return (
    <section id="top" className="c-cover" data-dark>
      <picture className={`c-cover-media ${ready ? "is-ready" : ""}`}>
        <source media="(orientation: portrait)" srcSet={photoSrc(heroImageMobil)} />
        <img
          src={photoSrc(heroImage)}
          alt=""
          fetchPriority="high"
          decoding="async"
          ref={(el) => {
            if (el?.complete && el.naturalWidth) setReady(true);
          }}
          onLoad={() => setReady(true)}
          onError={() => setReady(true)}
        />
      </picture>

      <div className="c-wrap c-cover-in">
        <p className="c-label c-cover-k">Fotográfus · {site.region}</p>
        <h1 className="c-cover-t">
          <span className="c-cover-l1">{site.brand}</span>
          <span className="c-cover-l2">{site.heroLine}</span>
        </h1>
        <div className="c-cover-foot">
          <p className="c-cover-what">
            Portré, jegyes és páros, szezonális, valamint kreatív szabadtéri fotózás.
          </p>
          <button type="button" className="c-cover-down c-label" onClick={() => scrollToSection("bevezeto")}>
            <span>Tovább</span>
            <span className="c-cover-line" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

/** Felpörgő szám: a nézetbe éréskor 0-ról számol fel; csökkentett mozgásnál nem. */
function Spin({ to, pad = 2 }: { to: number; pad?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    setN(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1400;
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          setN(Math.round(to * (1 - Math.pow(1 - p, 4))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref} aria-label={String(to)}>
      <span aria-hidden="true">{String(n).padStart(pad, "0")}</span>
    </span>
  );
}

/**
 * Tézis + számsáv. Minden szám a meglévő adatokból számolódik (irányok és a
 * megjelenített képek száma) — nincs kitalált „ügyfélszám” vagy „év”.
 */
export function IntroC() {
  const iranyok = categories.length - 1;

  return (
    <section id="bevezeto" className="c-intro">
      <div className="c-wrap c-grid">
        <p className="c-label c-muted c-intro-k" data-rv>
          {site.tagline}
        </p>
        <p className="c-lead c-intro-t" data-rv>
          {site.photographer} fotográfus {site.region}en. Portré, jegyes és páros, szezonális,
          valamint kreatív szabadtéri fotózás.
        </p>
      </div>

      <div className="c-wrap">
        <dl className="c-stats">
          <div className="c-stat" data-rv>
            <dt className="c-label c-muted">Fotózási irány</dt>
            <dd className="c-stat-n">
              <Spin to={iranyok} />
            </dd>
          </div>
          <div className="c-stat" data-rv>
            <dt className="c-label c-muted">Kép a teljes anyagban</dt>
            <dd className="c-stat-n">
              <Spin to={photos.length} />
            </dd>
          </div>
          <div className="c-stat" data-rv>
            <dt className="c-label c-muted">Helyszín</dt>
            <dd className="c-stat-n c-stat-word">{site.region}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
