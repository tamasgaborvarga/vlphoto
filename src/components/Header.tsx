import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "../data/site";
import { scrollToSection } from "../lib/scroll";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrollLock } from "../hooks/useScrollLock";
import { InstagramIcon } from "./SocialIcons";

const sectionIds = navLinks.map((link) => link.id);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useScrollLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
    window.setTimeout(() => scrollToSection(id), open ? 260 : 0);
  };

  const solid = scrolled || open;

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        Ugrás a tartalomhoz
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          solid
            ? "surface border-b border-line bg-bg/85 backdrop-blur-md"
            : "surface-fixed-dark border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-editorial flex h-16 items-center justify-between sm:h-20">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label={`${site.brand} — vissza az oldal tetejére`}
            tabIndex={solid ? 0 : -1}
            /* A nyitókép fölött nincs logó: a hero maga mondja ki a márkanevet,
               kétszer egy képernyőn fölösleges. Görgetéskor úszik be. */
            className={`-my-3 inline-flex min-h-11 items-center py-3 font-mono text-label-lg uppercase tracking-[0.34em] text-fg transition-opacity duration-700 ${
              solid ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            VL photo
          </button>

          <div className="flex items-center gap-8">
            <nav aria-label="Fő navigáció" className="hidden md:block">
              <ul className="flex items-center gap-9">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => go(link.id)}
                      aria-current={active === link.id ? "true" : undefined}
                      className={`font-mono text-label uppercase tracking-[0.26em] transition-colors duration-500 hover:text-fg ${
                        active === link.id ? "text-fg" : "text-muted"
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="VL photo Instagram-oldala"
              className="hidden text-fg transition-opacity duration-500 hover:opacity-60 md:block"
            >
              <InstagramIcon size={17} strokeWidth={1.1} />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobil-menu"
              aria-label={open ? "Menü bezárása" : "Menü megnyitása"}
              className="-mr-3 p-3 text-fg md:hidden"
            >
              {open ? <X size={22} strokeWidth={1.1} /> : <Menu size={22} strokeWidth={1.1} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobil-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="surface fixed inset-0 z-40 bg-bg md:hidden"
          >
            <nav
              aria-label="Mobil navigáció"
              className="container-editorial flex h-full flex-col justify-center pb-16"
            >
              <ul>
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i + 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      type="button"
                      onClick={() => go(link.id)}
                      className="w-full border-b border-line py-6 text-left font-display text-4xl tracking-tight text-fg"
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.32, duration: 0.5 }}
                className="mt-12 space-y-2 font-mono text-label uppercase tracking-[0.2em] text-muted"
              >
                <a href={site.emailHref} className="-my-2 block py-2 hover:text-fg">
                  {site.email}
                </a>
                <a href={site.phoneHref} className="-my-2 block py-2 hover:text-fg">
                  {site.phone}
                </a>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-fg"
                >
                  Instagram
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
