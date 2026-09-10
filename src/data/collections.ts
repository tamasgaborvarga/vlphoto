import type { CategoryId } from "./gallery";

export type Collection = {
  id: CategoryId;
  /** A blokk címe. */
  title: string;
  /** Rövid alcím. Hangulati szöveg, nem tényállítás. */
  line: string;
  /** A blokkban megjelenő képek, kézzel válogatva. */
  photos: string[];
  /**
   * ASZTALI elrendezés: képenként egy 12 oszlopos rács-osztály.
   * A `col-start` és a `mt` értékek adják a szabálytalan ritmust —
   * blokkonként szándékosan MÁS a minta, hogy ne tűnjön sablonnak.
   * Mobilon ez nem érvényes: ott minden kép teljes szélességű.
   */
  layout: string[];
};

/**
 * A három fő irány.
 *
 * A képek az Instagram-anyagból valók, és SZÍNBEN egymáshoz vannak válogatva:
 *  - Portré: vászon háttér, krém-szürke tónus, fekete-fehér ruha
 *  - Páros: egyetlen esküvő — meleg kő, borostyán, fehér ruha
 *  - Szabadtéri: aranyóra, zöld-arany, ellenfény
 */
export const collections: Collection[] = [
  {
    id: "portre",
    title: "Portré",
    line: "Önmagad egy másik nézőpontból.",
    photos: [
      "portre-i063",
      "portre-i005",
      "portre-i098",
      "portre-i035",
      "portre-i012",
      "portre-i143",
    ],
    layout: [
      "col-span-6",
      "col-start-8 col-span-5 mt-16",
      "col-start-2 col-span-4 mt-12",
      "col-start-7 col-span-5 mt-20",
      "col-start-1 col-span-5 mt-16",
      "col-start-7 col-span-4 mt-10",
    ],
  },
  {
    id: "paros",
    title: "Páros",
    line: "Képek arról, ami kettőtök között van.",
    photos: [
      "paros-i042",
      "paros-i086",
      "paros-i054",
      "paros-i107",
      "paros-i118",
      "paros-i139",
    ],
    layout: [
      "col-start-2 col-span-6",
      "col-start-9 col-span-3 mt-20",
      "col-start-1 col-span-5 mt-14",
      "col-start-7 col-span-6 mt-6",
      "col-start-3 col-span-4 mt-16",
      "col-start-8 col-span-4 mt-24",
    ],
  },
  {
    id: "kreativ",
    title: "Szabadtéri",
    line: "Fény. Mozgás. Természetesség.",
    photos: [
      "kreativ-i128",
      "kreativ-i134",
      "kreativ-i130",
      "kreativ-i135",
      "kreativ-i002",
      "kreativ-i122",
    ],
    layout: [
      "col-span-8",
      "col-start-10 col-span-3 mt-24",
      "col-start-2 col-span-6 mt-12",
      "col-start-9 col-span-4 mt-20",
      "col-start-1 col-span-4 mt-14",
      "col-start-6 col-span-6 mt-8",
    ],
  },
];

/**
 * A teljes anyag sorrendje: ezek a képek kerülnek előre.
 * Az Instagram-anyag megy elöl — frissebb és egységesebb tónusú.
 */
export const kiemelt: string[] = [
  // Szándékosan MÁS képek, mint a fenti blokkokban — így egy fotó sem
  // szerepel kétszer az oldalon.
  "paros-i049",
  "portre-i069",
  "kreativ-i131",
  "paros-i105",
  "portre-i095",
  "kreativ-i124",
  "paros-i085",
  "portre-i011",
  "szezonalis-i027",
  "paros-i141",
  "portre-i064",
  "kreativ-i129",
];
