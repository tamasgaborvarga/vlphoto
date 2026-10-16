import { useState } from "react";
import { NavB } from "./components/NavB";
import { HeroB } from "./components/HeroB";
import { WorkB } from "./components/WorkB";
import { DirectionsB } from "./components/DirectionsB";
import { AboutB } from "./components/AboutB";
import { ArchiveB } from "./components/ArchiveB";
import { ContactB } from "./components/ContactB";
import { FooterB } from "./components/FooterB";
import { scrollToSection } from "../lib/scroll";
import type { Category } from "../data/gallery";

/**
 * „B" VERZIÓ — acolorbright arculat.
 *
 * Ugyanaz a tartalom és ugyanazok a fotók, mint az A verzióban (közös
 * adatfájlok), de teljesen más rendszer: papírfehér lap, egyetlen betűtípus
 * egyetlen vastagságban, nulla szín, és öt megszámozott fejezet.
 */
export default function AppB() {
  const [filter, setFilter] = useState<Category["id"]>("osszes");

  /** A 2. fejezet paneljeiről ide vezet az út: szűrő beállítása + görgetés. */
  const openCategory = (id: Category["id"]) => {
    setFilter(id);
    window.setTimeout(() => scrollToSection("archivum"), 60);
  };

  return (
    <div className="min-h-screen bg-paper">
      <NavB />
      <main>
        <HeroB />
        <WorkB />
        <DirectionsB onOpenCategory={openCategory} />
        <AboutB />
        <ArchiveB filter={filter} onFilterChange={setFilter} />
        <ContactB />
      </main>
      <FooterB />
    </div>
  );
}
