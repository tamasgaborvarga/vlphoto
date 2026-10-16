import { useEffect } from "react";

/**
 * Beúsztatás görgetésre: minden `[data-rv]` elem `is-in` osztályt kap, amikor
 * a nézetbe ér. Egyetlen megfigyelő a lap egészére; a később megjelenő
 * elemeket (szűrés, „Több kép”) MutationObserver veszi fel.
 *
 * Csökkentett mozgásnál és megfigyelő nélküli böngészőben minden azonnal
 * látszik — a CSS is csak `.js` + mozgás-engedély mellett rejt el bármit.
 */
export function useReveal() {
  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const all = () => document.querySelectorAll<HTMLElement>("[data-rv]:not(.is-in)");

    if (still || !("IntersectionObserver" in window)) {
      const show = () => all().forEach((el) => el.classList.add("is-in"));
      show();
      const mo = new MutationObserver(show);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const watch = () => all().forEach((el) => io.observe(el));
    watch();
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
