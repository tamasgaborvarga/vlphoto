import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scrollToSection } from "../lib/scroll";

/**
 * Mobilon lebegő kivezetés a kapcsolathoz. Csak akkor jelenik meg, ha a
 * látogató elhagyta a nyitóképet, és eltűnik, mire a kapcsolat szekcióhoz ér.
 */
export function StickyContact() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById("contact");
      const contactTop = contact
        ? contact.getBoundingClientRect().top + window.scrollY
        : Number.POSITIVE_INFINITY;
      const y = window.scrollY;
      setShow(y > window.innerHeight * 0.9 && y < contactTop - window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, y: 12, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }}
          onClick={() => scrollToSection("contact")}
          className="surface-fixed-dark fixed bottom-5 left-1/2 z-40 -translate-x-1/2 min-h-11 whitespace-nowrap border border-fg/40 bg-ink px-7 py-3.5 font-mono text-label uppercase tracking-[0.26em] text-fg active:scale-[0.97] md:hidden"
        >
          Foglalj fotózást
        </motion.button>
      )}
    </AnimatePresence>
  );
}
