import { osszesKep, type Photo } from "../data/gallery";

/**
 * A C verzió gerince: öt megszámozott fejezet. A menü, a fejezetnyitók és a
 * menü képei is innen dolgoznak, hogy a sorszám sose csússzon el.
 *
 * `kep`: a teljes képernyős menüben az adott tételhez tartozó fotó (asztalon
 * a tétel fölé húzott egérrel cserélődik).
 */
export type Chapter = { id: string; n: string; title: string; kep: string };

export const chapters: Chapter[] = [
  { id: "munka", n: "01", title: "Válogatott munkák", kep: "paros-i049" },
  { id: "iranyok", n: "02", title: "Irányok", kep: "kreativ-i128" },
  { id: "rolam", n: "03", title: "Rólam", kep: "portre-091" },
  { id: "archivum", n: "04", title: "Teljes anyag", kep: "portre-i069" },
  { id: "kapcsolat", n: "05", title: "Kapcsolat", kep: "kreativ-i131" },
];

export const chapter = (id: string): Chapter =>
  chapters.find((c) => c.id === id) ?? chapters[0];

export const kepById = (id: string): Photo | undefined => osszesKep.find((p) => p.id === id);
