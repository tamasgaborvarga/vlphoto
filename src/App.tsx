import { useState } from "react";
import { MotionConfig } from "framer-motion";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { SelectedWork } from "./components/SelectedWork";
import { Collections } from "./components/Collections";
import { About } from "./components/About";
import { Archive } from "./components/Archive";
import { Cta } from "./components/Cta";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { StickyContact } from "./components/StickyContact";
import { scrollToSection } from "./lib/scroll";
import type { Category } from "./data/gallery";

export default function App() {
  const [filter, setFilter] = useState<Category["id"]>("osszes");

  /** A kategóriablokkokból ide vezet a „View …" — beállítja a szűrőt és odagörget. */
  const openCategory = (id: Category["id"]) => {
    setFilter(id);
    window.setTimeout(() => scrollToSection("archive"), 60);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <SelectedWork />
          <Collections onOpenCategory={openCategory} />
          <About />
          <Archive filter={filter} onFilterChange={setFilter} />
          <Cta />
          <Contact />
        </main>
        <Footer />
        <StickyContact />
      </div>
    </MotionConfig>
  );
}
