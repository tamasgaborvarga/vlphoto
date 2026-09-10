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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => scrollToSection("contact")}
          className="surface-fixed-dark fixed bottom-5 left-1/2 z-40 -translate-x-1/2 rounded-full border border-fg/25 bg-ink/80 px-7 py-3.5 font-mono text-label-sm uppercase tracking-[0.26em] text-fg backdrop-blur-md md:hidden"
        >
          Foglalj fotózást
        </motion.button>
      )}
    </AnimatePresence>
  );
}
