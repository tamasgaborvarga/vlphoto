import type { CategoryId } from "./gallery";

export type Collection = {
  id: CategoryId;
  /** A blokk címe. */
  title: string;
  /** Rövid alcím. Hangulati szöveg, nem tényállítás. */
  line: string;
  /** A blokkban megjelenő képek, kézzel válogatva (arányra is figyelve). */
  photos: string[];
};

/**
 * A három fő irány. A negyedik kategória (szezonális) nem kap saját blokkot,
 * de a teljes galériában szűrhető marad.
 */
export const collections: Collection[] = [
  {
    id: "portre",
    title: "Portré",
    line: "Önmagad egy másik nézőpontból.",
    photos: ["portre-012", "portre-004", "portre-018", "portre-009"],
  },
  {
    id: "paros",
    title: "Páros",
    line: "Képek arról, ami kettőtök között van.",
    photos: ["paros-024", "paros-013", "paros-002", "paros-016"],
  },
  {
    id: "kreativ",
    title: "Szabadtéri",
    line: "Fény. Mozgás. Természetesség.",
    photos: ["kreativ-002", "kreativ-005", "kreativ-011", "kreativ-004"],
  },
];

/**
 * A nyitó, editorial elrendezésű válogatás. A `span` a rácsban elfoglalt
 * helyet adja meg — ettől lesz változó képméretű, magazinszerű a szekció.
 */
export type WorkItem = { id: string; span: "full" | "wide" | "half" | "narrow" };

export const selectedWork: WorkItem[] = [
  { id: "paros-024", span: "narrow" },
  { id: "paros-012", span: "wide" },
  { id: "portre-016", span: "half" },
  { id: "kreativ-005", span: "half" },
  { id: "paros-022", span: "full" },
  { id: "portre-012", span: "narrow" },
  { id: "szezonalis-004", span: "wide" },
  { id: "kreativ-011", span: "half" },
  { id: "portre-004", span: "half" },
];
