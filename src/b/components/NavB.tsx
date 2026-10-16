import { useEffect, useState } from "react";
import { site } from "../../data/site";
import { scrollToSection } from "../../lib/scroll";
import { useScrollLock } from "../../hooks/useScrollLock";
import { chapters } from "../chapters";

/**
 * Navigáció: balra a névjel, jobbra EGYETLEN hamburger-négyzet.
 *
 * A rendszerben ez az egyetlen megengedett ikon — a menüpontok a teljes
 * képernyős, fehér rétegen jelennek meg, 40 px-es sorokban. Asztali gépen
 * a névjel mellé kerül a lap egyetlen kitöltött gombja is (Kapcsolat),
 * mert az oldal üzleti célja a megkeresés.
 */
export function NavB() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useScrollLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    window.setTimeout(() => scrollToSection(id), open ? 60 : 0);
  };

  return (
    <>
      <a
        href="#munka"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-70 focus:rounded-lg focus:bg-charcoal focus:px-4 focus:py-3 focus:text-body-sm focus:text-paper"
      >
        Ugrás a tartalomhoz
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 ${
          scrolled && !open ? "border-b border-fog bg-paper" : "bg-paper"
        }`}
      >
        <div className="wrap flex h-16 items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="-my-3 flex min-h-11 items-center py-3 text-body text-ink-black"
          >
            {site.brand}
          </button>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => go("kapcsolat")}
              className="hidden min-h-11 items-center rounded-lg bg-charcoal px-4 py-3 text-body-sm text-paper sm:inline-flex"
            >
              Kapcsolat
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="b-menu"
              aria-label={open ? "Menü bezárása" : "Menü megnyitása"}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-ink-black bg-paper"
            >
              {open ? (
                <span aria-hidden="true" className="text-body text-ink-black">
                  &#215;
                </span>
              ) : (
                <span aria-hidden="true" className="flex w-4 flex-col gap-[3px]">
                  <span className="block h-px w-full bg-pure-black" />
                  <span className="block h-px w-full bg-pure-black" />
                  <span className="block h-px w-full bg-pure-black" />
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div id="b-menu" className="fixed inset-0 z-40 bg-paper pt-16">
          <nav aria-label="Fő navigáció" className="wrap flex h-full flex-col justify-center pb-16">
            <ul>
              {chapters.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => go(c.id)}
                    className="flex w-full items-center gap-4 py-4 text-left"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pure-black text-body text-paper"
                    >
                      {c.n}
                    </span>
                    <span className="text-subheading text-ink-black sm:text-heading">
                      {c.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-16 flex flex-col gap-2 text-body-sm text-graphite">
              <a href={site.emailHref} className="-my-2 flex min-h-11 items-center py-2">
                {site.email}
              </a>
              <a href={site.phoneHref} className="-my-2 flex min-h-11 items-center py-2">
                {site.phone}
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="-my-2 flex min-h-11 items-center py-2"
              >
                Instagram
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
