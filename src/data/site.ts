/**
 * Egyetlen igazságforrás a megrendelő által megerősített adatokhoz.
 * ITT NE legyen kitalált információ (ár, referencia, díj, cím).
 */
export const site = {
  brand: "VL photo",
  photographer: "Varga Lilla",
  tagline: "VL photo by Varga Lilla",
  /** A hero-ban a márkanév alá kerülő sor — a H1 már kimondja a „VL photo"-t. */
  heroLine: "by Varga Lilla",
  region: "Budapest",
  regionLong: "Budapest, Magyarország",
  phone: "+36 30 278 4540",
  phoneHref: "tel:+36302784540",
  email: "vlillaphoto@gmail.com",
  emailHref: "mailto:vlillaphoto@gmail.com",
  instagram: "https://www.instagram.com/vargalillaphoto",
  facebook: "https://www.facebook.com/vargalillaphoto",
} as const;

export type NavLink = { id: string; label: string };

/** Szándékosan három pont — a rövid navigáció prémiumabb hatású. */
export const navLinks: NavLink[] = [
  { id: "work", label: "Munkáim" },
  { id: "about", label: "Rólam" },
  { id: "contact", label: "Kapcsolat" },
];
