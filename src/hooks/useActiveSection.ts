import { useEffect, useState } from "react";

/** Megmondja, melyik szekció van éppen a nézetben – a navigáció aktív állapotához. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Az épp a sávban lévő szekciók halmaza. Ha egyik sincs benne (pl.
    // visszagörgettünk a nyitóképre), az aktív jelölés is törlődik —
    // korábban a legutóbbi érték ott ragadt.
    const inView = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inView.add(entry.target.id);
          else inView.delete(entry.target.id);
        }
        setActive(ids.find((id) => inView.has(id)) ?? null);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
