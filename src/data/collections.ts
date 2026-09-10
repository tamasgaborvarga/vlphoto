import type { CategoryId } from "./gallery";

export type Collection = {
  id: CategoryId;
  /** A blokk címe. */
  title: string;
  /** Rövid alcím. Hangulati szöveg, nem tényállítás. */
  line: string;
  /** A blokkban megjelenő képek, kézzel válogatva. */
  photos: string[];
};

/**
 * A három fő irány.
 *
 * A képek az Instagram-anyagból valók (frissebb és egységesebb), és
 * SZÍNBEN is egymáshoz vannak válogatva:
 *  - Portré: vászon háttér, krém-szürke tónus, fekete-fehér ruha
 *  - Páros: meleg kő és borostyán, fehér ruha
 *  - Szabadtéri: aranyóra, zöld-arany
 * Így a három blokk együtt is egy irányba mutat, nem üt el egymástól.
 */
export const collections: Collection[] = [
  {
    id: "portre",
    title: "Portré",
    line: "Önmagad egy másik nézőpontból.",
    photos: ["portre-i063", "portre-i069", "portre-i005", "portre-i098"],
  },
  {
    id: "paros",
    title: "Páros",
    line: "Képek arról, ami kettőtök között van.",
    photos: ["paros-i042", "paros-i043", "paros-i049", "paros-i041"],
  },
  {
    id: "kreativ",
    title: "Szabadtéri",
    line: "Fény. Mozgás. Természetesség.",
    photos: ["kreativ-i128", "kreativ-i134", "kreativ-i131", "kreativ-i122"],
  },
];

/**
 * A teljes anyag sorrendje: ezek a képek kerülnek előre.
 * Az Instagram-anyag megy elöl — frissebb és egységesebb tónusú.
 */
export const kiemelt: string[] = [
  "paros-i042",
  "portre-i063",
  "kreativ-i128",
  "paros-i049",
  "portre-i069",
  "kreativ-i134",
  "paros-i105",
  "portre-i005",
  "szezonalis-i027",
  "paros-i107",
  "portre-i098",
  "kreativ-i131",
];
