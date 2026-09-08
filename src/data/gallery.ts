/**
 * GALÉRIA
 * -------------------------------------------------------------------------
 * A képlistát a `npm run galeria` parancs generálja a `public/galeria/`
 * mappa tartalmából (lásd: tools/scan-gallery.mjs). Ez a fájl csak a
 * típusokat, a kategóriákat és a kiemelt képeket tartja.
 *
 * Jelenlegi állapot: a képek a VL photo Facebook-oldal NYILVÁNOS fotói
 * (https://www.facebook.com/vargalillaphoto), 2026-09-07. Mind Varga Lilla
 * munkája, de a Facebook által újratömörített, max. 2048 px-es változatok —
 * élesítés előtt érdemes az eredeti fájlokra cserélni őket.
 * -------------------------------------------------------------------------
 */
import { generatedPhotos } from "./photos.generated";

export type CategoryId = "portre" | "paros" | "szezonalis" | "kreativ";

export type Photo = {
  id: string;
  category: CategoryId;
  alt: string;
  /** Rácsban megjelenő, kis változat (max 900 px). */
  src: string;
  /** Nagyításhoz használt változat (max 1600 px). */
  full: string;
  width: number;
  height: number;
};

export type Category = { id: "osszes" | CategoryId; label: string };

const CATEGORY_LABELS: Record<CategoryId, string> = {
  portre: "Portré",
  paros: "Páros & Jegyes",
  szezonalis: "Szezonális",
  kreativ: "Kreatív szabadtéri",
};

/** A kategóriák megjelenítési sorrendje. */
const CATEGORY_ORDER: CategoryId[] = ["portre", "paros", "szezonalis", "kreativ"];

export const photos: Photo[] = generatedPhotos;

/**
 * Csak azok a szűrők jelennek meg, amelyekhez ténylegesen van kép — így
 * soha nem lesz üres kategória. Új képek betöltése után magától bővül.
 */
export const categories: Category[] = [
  { id: "osszes", label: "Összes" },
  ...CATEGORY_ORDER.filter((id) => photos.some((p) => p.category === id)).map((id) => ({
    id,
    label: CATEGORY_LABELS[id],
  })),
];

/** A hero teljes szélességű háttérképe. */
export const heroImage = {
  src: "galeria/nagy/paros-016.webp",
  alt: "",
  width: 1600,
  height: 1066,
};

/**
 * Kép URL feloldása. A `BASE_URL` miatt a hivatkozás fejlesztés közben `/`-ról,
 * buildben `./`-ról indul — így az egyfájlos (file://) változatban is betöltődik.
 */
export function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path}`;
}

export function photoSrc(photo: { src: string }) {
  return assetUrl(photo.src);
}

/** A nagyított változat URL-je — a lightboxhoz. */
export function photoFull(photo: { full?: string; src: string }) {
  return assetUrl(photo.full ?? photo.src);
}
