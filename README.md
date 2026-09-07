# VL photo — Varga Lilla Fotográfia

Fotós portfólió weboldal. Szigorúan fekete-fehér arculat, a fókusz a képeken van.

**Stack:** React 19 + TypeScript · Vite 8 · Tailwind CSS v4 · Framer Motion · Lucide Icons

```bash
npm run dev      # fejlesztői szerver
npm run build    # éles build a dist/ mappába
npm run preview  # a kész build helyi kipróbálása
npm run build:single  # EGYFÁJLOS build: dist-single/index.html (duplakattintható)
```

> **A `dist/index.html` duplakattintással üres fehér oldal — ez nem hiba.**
> Ez React-alkalmazás: a böngésző `file://` protokollon biztonsági okból nem tölt be
> ES-modulokat, ezért a JS el sem indul. Mindig szerverrel nézd: `npm run dev`
> vagy `npm run preview`. Élesben (Cloudflare Pages, Netlify, sima webtárhely) a
> `dist/` mappa tartalmát kell kitenni, és ott jól működik.
>
> **Ha csak meg akarod nézni vagy át akarod küldeni:** `npm run build:single` →
> a `dist-single/index.html` duplakattintással megnyílik (a CSS és a JS bele van
> ágyazva). A fotók a mellette lévő `galeria/` mappából jönnek, ezért
> **átküldeni a teljes `dist-single` mappát kell** (pl. zip-elve). A betűtípusok
> internetről töltődnek.

---

## Szerkezet

```
src/
  data/
    site.ts        # elérhetőségek, navigáció  ← EGYETLEN igazságforrás
    services.ts    # a 4 szolgáltatási kategória
    gallery.ts     # galéria képlista + kategóriák
  components/
    Header.tsx     # sticky navigáció + mobil drawer
    Hero.tsx       # teljes képernyős nyitókép
    Gallery.tsx    # szűrhető masonry rács
    GalleryItem.tsx
    Lightbox.tsx   # teljes képernyős képnézegető
    About.tsx      # „Rólam"
    Services.tsx   # szolgáltatás-kártyák
    Contact.tsx    # elérhetőségek + űrlap
    ContactForm.tsx
    Footer.tsx
    SectionHeading.tsx, Logo.tsx, SocialIcons.tsx
  hooks/           # useScrollLock, useActiveSection
  lib/scroll.ts
```

---

## Több kép hozzáadása

A galériában **79 válogatott kép** van (a letöltött 251-ből), a VL photo
Facebook-oldaláról. A válogatás a `tools/import-fotok.py` `KIVALASZTOTT`
halmazában szerkeszthető.
A nyers, letöltött fájlok a `fotok-nyers/` mappában vannak (257 db).

Az importálás és a webre méretezés:

```bash
py tools/import-fotok.py   # fotok-nyers/ → public/galeria/ (rács 900px + nagy/ 1600px)
npm run galeria            # a képlista újragenerálása
```

A kategóriákat a `tools/import-fotok.py` fájl elején lévő listák adják
(sorszám szerint) — ott lehet átsorolni képeket.

**Új képek betöltése három lépés:**

1. Másold a fájlokat a `public/galeria/` mappába.
2. A **fájlnév eleje adja a kategóriát**:
   ```
   portre-01.jpg       → Portré
   paros-01.jpg        → Páros & Jegyes
   szezonalis-01.jpg   → Szezonális
   kreativ-01.jpg      → Kreatív szabadtéri
   ```
3. Futtasd: `npm run galeria`

A parancs kiolvassa a valódi képméreteket (ebből számol a rács arányt, így nem
ugrál a layout), megőrzi a már megírt `alt` szövegeket, és a végén kiírja,
melyik képhez hiányzik még leírás. Az `alt` szövegeket a
`src/data/photos.generated.ts` fájlban kell megírni.

A galéria-szűrők **maguktól igazodnak**: csak az a kategória jelenik meg, amelyhez
van is kép — üres szűrő soha nem lesz.

### Honnan szerezz több képet

- **A legjobb:** kérd be Lillától az eredeti fájlokat. A Facebook újratömöríti a
  képeket, a mostani 9 is csak max. 2048 px.
- **Facebookról:** oldaladminként a Meta Business Suite / „Az adataid letöltése"
  funkcióval exportálható a teljes album.
- A hero képét a `heroImage`, a Rólam szekció képét az `aboutImage` állítja a
  `src/data/gallery.ts` fájlban.

---

## Kapcsolati űrlap

Az űrlap **nem küld adatot szervernek**: a látogató levelezőprogramjában nyit meg egy
előre kitöltött üzenetet (`mailto:`). Így nincs backend és nincs adatkezelés sem.

Szerveres küldéshez (pl. Formspree) a `src/components/ContactForm.tsx`
`handleSubmit` függvényét kell kicserélni egy `fetch`-re — a mezőnevek
(`nev`, `email`, `tipus`, `uzenet`) változatlanul használhatók.

---

## Arculat

| | |
|---|---|
| Fekete | `#000000` (`bg-ink`) |
| Fehér | `#FFFFFF` (`bg-paper`) |
| Szürkék | `ash-50 … ash-900`, kizárólag keretekhez és finom hover állapotokhoz |
| Címsorok és kenyérszöveg | EB Garamond |
| Feliratok, navigáció, gombok | DM Mono |

A tokenek a `src/index.css` `@theme` blokkjában vannak (Tailwind v4 — nincs
`tailwind.config.js`).

**A fotók színesek** — a fekete-fehér arculat csak a felületre (tipográfia,
keretek, gombok) vonatkozik, a képekre nem.

Szekciók váltakozó háttere: hero/galéria fekete → Rólam fehér → Szolgáltatások
fekete → Kapcsolat fehér → lábléc fekete.

---

## Akadálymentesség

- Billentyűzet: a lightbox `Esc` / `←` / `→` billentyűkkel kezelhető, mobilon húzással is lapozható.
- „Ugrás a tartalomhoz" link a fejléc elején.
- Minden képnek van magyar `alt` szövege; a dekoratív hero-kép `alt=""`.
- `MotionConfig reducedMotion="user"`: rendszerszintű „csökkentett mozgás" beállítás
  esetén az animációk kimaradnak.

---

## Még hiányzik / megrendelői döntésre vár

Lásd: [`TARTALOM.md`](./TARTALOM.md)
