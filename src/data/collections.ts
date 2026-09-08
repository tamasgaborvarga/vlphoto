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
    photos: ["portre-030", "portre-245", "portre-198", "portre-242"],
  },
  {
    id: "paros",
    title: "Páros",
    line: "Képek arról, ami kettőtök között van.",
    photos: ["paros-209", "paros-179", "paros-081", "paros-211"],
  },
  {
    id: "kreativ",
    title: "Szabadtéri",
    line: "Fény. Mozgás. Természetesség.",
    photos: ["kreativ-066", "kreativ-062", "kreativ-118", "kreativ-063"],
  },
];

/**
 * A teljes anyag sorrendje: ezek a képek kerülnek előre, a többi utánuk jön.
 * Így a látogató a legerősebb munkákkal találkozik először, anélkül hogy
 * külön „válogatott" szekcióra lenne szükség.
 */
export const kiemelt: string[] = [
  "paros-108",
  "portre-245",
  "kreativ-066",
  "paros-209",
  "szezonalis-124",
  "portre-030",
  "kreativ-062",
  "portre-198",
  "paros-179",
  "portre-242",
  "kreativ-118",
  "paros-081",
];
