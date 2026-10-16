import { useState } from "react";
import { BarC } from "./components/BarC";
import { CoverC, IntroC } from "./components/CoverC";
import { WorkC } from "./components/WorkC";
import { AboutC, ArchiveC, ContactC, DirectionsC } from "./components/SectionsC";
import { useReveal } from "./useReveal";
import { scrollToSection } from "../lib/scroll";
import type { Category } from "../data/gallery";

/**
 * „C" VERZIÓ — „Monográfia” (a Kertvéllesy B változat rendszeréből).
 *
 * Ugyanaz a tartalom és ugyanazok a fotók, mint A-ban és B-ben (közös
 * src/data), de: mészkő + grafit felületek, Clash Grotesk (címek, számok) +
 * Satoshi (szöveg, ritkított címkék), fix sáv teljes képernyős menüvel,
 * 100svh borító a címmel a képen, vízszintes válogatás, grafit fejezetek.
 * Dőlt betű sehol, szó közbeni sortörés sehol.
 */
export default function AppC() {
  const [filter, setFilter] = useState<Category["id"]>("osszes");
  useReveal();

  const openCategory = (id: Category["id"]) => {
    setFilter(id);
    window.setTimeout(() => scrollToSection("archivum"), 60);
  };

  return (
    <>
      <a href="#munka" className="c-skip">
        Ugrás a tartalomra
      </a>
      <BarC />
      <main>
        <CoverC />
        <IntroC />
        <WorkC />
        <DirectionsC onOpenCategory={openCategory} />
        <AboutC />
        <ArchiveC filter={filter} onFilterChange={setFilter} />
      </main>
      <ContactC />
    </>
  );
}
