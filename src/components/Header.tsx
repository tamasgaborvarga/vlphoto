import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "../data/site";
import { scrollToSection } from "../lib/scroll";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrollLock } from "../hooks/useScrollLock";
import { Logo } from "./Logo";

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

  const toTop = () => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // A hero fölött mindig világos szöveg kell (fotó van alatta), lejjebb a téma dönt.
  const solid = scrolled || open;

  return (
    <>
      <a
        href="#galeria"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        Ugrás a tartalomhoz
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? "surface border-b border-line bg-bg/90 backdrop-blur-md"
            : "surface-fixed-dark border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-editorial flex h-16 items-center justify-between sm:h-20">
          <Logo onClick={toTop} />

          <div className="flex items-center gap-8">
            <nav aria-label="Fő navigáció" className="hidden md:block">
              <ul className="flex items-center gap-10">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => go(link.id)}
                      aria-current={active === link.id ? "true" : undefined}
                      className="group relative py-2 font-mono text-[0.7rem] font-light uppercase tracking-[0.24em] text-strong transition-colors duration-300 hover:text-fg"
                    >
                      {link.label}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-px bg-fg transition-all duration-500 ease-out group-hover:w-full ${
                          active === link.id ? "w-full" : "w-0"
                        }`}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center text-fg">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobil-menu"
                aria-label={open ? "Menü bezárása" : "Menü megnyitása"}
                className="-mr-2 p-2 md:hidden"
              >
                {open ? <X size={22} strokeWidth={1.25} /> : <Menu size={22} strokeWidth={1.25} />}
              </button>
            </div>
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
            transition={{ duration: 0.25 }}
            className="surface fixed inset-0 z-40 bg-bg md:hidden"
          >
            <nav
              aria-label="Mobil navigáció"
              className="container-editorial flex h-full flex-col justify-center pb-16"
            >
              <ul className="space-y-2">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i + 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      type="button"
                      onClick={() => go(link.id)}
                      className="w-full border-b border-line py-5 text-left font-display text-3xl tracking-tight text-fg"
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.36, duration: 0.4 }}
                className="mt-12 space-y-1 text-sm font-light text-strong"
              >
                <a href={site.phoneHref} className="block hover:text-fg">
                  {site.phone}
                </a>
                <a href={site.emailHref} className="block hover:text-fg">
                  {site.email}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
