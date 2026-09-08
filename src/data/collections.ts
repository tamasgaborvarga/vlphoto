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
 * de a teljes anyagban szűrhető marad.
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
    photos: ["paros-024", "paros-013", "paros-002", "paros-022"],
  },
  {
    id: "kreativ",
    title: "Szabadtéri",
    line: "Fény. Mozgás. Természetesség.",
    photos: ["kreativ-002", "kreativ-005", "kreativ-011", "kreativ-004"],
  },
];

/**
 * A teljes anyag sorrendje: ezek a képek kerülnek előre, a többi utánuk jön.
 * Így a látogató a legerősebb munkákkal találkozik először, anélkül hogy
 * külön „válogatott" szekcióra lenne szükség.
 */
export const kiemelt: string[] = [
  "paros-012",
  "portre-021",
  "kreativ-005",
  "paros-024",
  "szezonalis-004",
  "portre-012",
  "kreativ-011",
  "portre-004",
  "paros-013",
  "portre-018",
  "kreativ-002",
  "paros-002",
];
