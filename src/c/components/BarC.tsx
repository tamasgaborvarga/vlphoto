import { useEffect, useRef, useState } from "react";
import { site } from "../../data/site";
import { photoSrc } from "../../data/gallery";
import { scrollToSection } from "../../lib/scroll";
import { useScrollLock } from "../../hooks/useScrollLock";
import { chapters, kepById } from "../chapters";

/**
 * Fix sáv: Menü · VL photo · Foglalás — mindig látható (a Kertvéllesy B-n a
 * görgetésre elbújó sáv idegesítő volt, ide sem tesszük be).
 *
 * Színe a ALATTA lévő fejezettől függ: sötét fejezet / borító fölött világos
 * (a lap tetején átlátszó), papír fölött tinta. A sötét fejezetek
 * `data-dark` attribútumot kapnak.
 */
export function BarC() {
  const [open, setOpen] = useState(false);
  const [onDark, setOnDark] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [hover, setHover] = useState(chapters[0].id);
  const btnRef = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useScrollLock(open);

  useEffect(() => {
    let ticking = false;
    const paint = () => {
      ticking = false;
      const probe = 36;
      const under = document
        .elementsFromPoint(Math.round(window.innerWidth / 2), probe)
        .find((el) => !el.closest(".c-bar, .c-menu"));
      setOnDark(Boolean(under?.closest("[data-dark]")));
      setAtTop(window.scrollY < 8);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(paint);
      }
    };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (!open) return;
    firstLink.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // a menü záró animációja alatt már indulhat a görgetés
    window.setTimeout(() => scrollToSection(id), 40);
  };

  const cls = ["c-bar", onDark ? "on-dark" : "", atTop ? "at-top" : ""].join(" ");

  return (
    <>
      <header className={cls}>
        <div className="c-wrap c-bar-row">
          <button
            ref={btnRef}
            type="button"
            className="c-menu-btn"
            aria-expanded={open}
            aria-controls="c-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="c-burger" aria-hidden="true" />
            <span className="c-label c-menu-l">{open ? "Bezárás" : "Menü"}</span>
            <span className="c-vh">{open ? "Menü bezárása" : "Menü megnyitása"}</span>
          </button>

          <a
            href="#top"
            className="c-brand"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {site.brand}
          </a>

          <a
            href="#kapcsolat"
            className="c-bar-cta c-label"
            onClick={(e) => {
              e.preventDefault();
              go("kapcsolat");
            }}
          >
            Foglalás
          </a>
        </div>
      </header>

      <div id="c-menu" className={`c-menu ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="c-wrap c-menu-in">
          <nav className="c-menu-nav" aria-label="Fejezetek">
            <ul className="c-menu-list">
              {chapters.map((c, i) => (
                <li key={c.id} className="c-menu-item">
                  <a
                    ref={i === 0 ? firstLink : undefined}
                    href={`#${c.id}`}
                    tabIndex={open ? 0 : -1}
                    className="c-menu-a"
                    onMouseEnter={() => setHover(c.id)}
                    onFocus={() => setHover(c.id)}
                    onClick={(e) => {
                      e.preventDefault();
                      go(c.id);
                    }}
                  >
                    <span className="c-no">{c.n}</span>
                    <span className="c-h2">{c.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <figure className="c-menu-fig" aria-hidden="true">
            {chapters.map((c) => {
              const kep = kepById(c.kep);
              return (
                kep && (
                  <span key={c.id} className={`c-menu-img ${hover === c.id ? "on" : ""}`}>
                    <img src={photoSrc(kep)} alt="" loading="lazy" decoding="async" />
                  </span>
                )
              );
            })}
          </figure>

          <div className="c-menu-contact">
            <p className="c-label c-muted">{site.regionLong}</p>
            <a href={site.emailHref} tabIndex={open ? 0 : -1} className="c-nowrap">
              {site.email}
            </a>
            <a href={site.phoneHref} tabIndex={open ? 0 : -1} className="c-nowrap">
              {site.phone}
            </a>
            <p className="c-menu-social">
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>
                Instagram
              </a>
              <a href={site.facebook} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>
                Facebook
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
