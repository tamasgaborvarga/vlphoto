# Tartalom-audit — VL photo

Mi ellenőrzött tény az oldalon, és mi hiányzik még. Cél: **ne kerüljön ki valótlan állítás.**

Utolsó ellenőrzés: 2026-09-07.

---

## ✅ Megerősített adat

| Adat | Érték | Forrás |
|---|---|---|
| Márkanév | VL photo | megrendelő + Facebook-oldal |
| Fotós | Varga Lilla | megrendelő |
| Kategória | Fényképész | Facebook-oldal („Oldal · Fényképész") |
| Régió | Tiszafüred és környéke | megrendelő |
| Telefon | +36 30 278 4540 | megrendelő |
| E-mail | vlillaphoto@gmail.com | megrendelő + Facebook-oldal |
| Instagram | instagram.com/vargalillaphoto | megrendelő + Facebook-oldal |
| Facebook | facebook.com/vargalillaphoto | megrendelő |
| Szolgáltatások | Portré · Jegyes és páros · Karácsonyi és szezonális · Kreatív szabadtéri | megrendelő |

### A galéria képei

**151 kép, mind Varga Lilla valódi munkája.** 74 a Facebook-oldalról
(2026-09-07) és 77 az Instagramról (2026-09-10), mindkettő bejelentkezett
munkamenetből letöltve.

**Nincs ismétlődő fotó az oldalon.** Perceptuális hasonlóság-vizsgálattal
(dHash) öt olyan képet találtunk, ami mindkét forrásban megvolt — ezekből
csak egy maradt. A hero háttérképe és a Rólam szekció képe sem szerepel a
teljes anyagban, és a kiemelt képek is mások, mint a kategóriablokkokéi. Nincs helyőrző, nincs
stockfotó az oldalon.

A három kategóriablokk képei az INSTAGRAM-anyagból valók: frissebb, és
színvilágban egységesebb. A blokkok egymáshoz is válogatva vannak —
Portré: vászon háttér, krém-szürke; Páros: meleg kő és borostyán;
Szabadtéri: aranyóra.

**A 251 letöltött képből 77 került ki válogatással.** A jelmezes / szürreális
sorozat (169–174) a megrendelő kérésére kimaradt: nem illett a többi kép
vizuális nyelvéhez. Szempontok: egy sorozatból
legfeljebb 2-3 kép, kollázsok (több fotó egy fájlban) kihagyva, változatos
helyszín és fényviszony, minden kategória képviselve. A válogatás listája a
`tools/import-fotok.py` `KIVALASZTOTT` halmazában van, sorszám szerint —
ott bármikor bővíthető vagy szűkíthető. `KIVALASZTOTT = None` esetén mind a
251 kép bekerül.

Hat elem kimaradt, mert nem fotó: a VL photo logója (3 változat) és három
reklámgrafika (köztük egy tiszafüredi karácsonyi hirdetés).

⚠️ A képek a Facebook által **újratömörített** változatok, webre optimalizálva.
Minden képből két méret készül: a rácsba max 900 px (WebP q80), a nagyításhoz
max 1600 px (WebP q86). Együtt 22 MB. Élesítés előtt érdemes az eredeti fájlokat bekérni Lillától.
A nyers, letöltött fájlok: `fotok-nyers/` (257 db, 75 MB).

Az `alt` szövegek **képenként megírtak** — mind a 151 kép saját, leíró
magyar szöveget kapott (pl. „Menyasszony a kastély folyosóján, korlátnál").
A `npm run galeria` újrafuttatása megőrzi őket.

A „Rólam" szekcióban jelenleg nincs kép: Lilláról nincs fotónk, idegen ember
képét pedig nem tesszük oda.

---

## ⚠️ Hiányzik még

| Mi | Miért | Teendő |
|---|---|---|
| **~485 további fotó** | A Facebook-albumban 494 kép van, de kijelentkezve csak 10 érhető el; a többihez belépés kell | Lásd a README „Több kép hozzáadása" fejezetét |
| **Lilla bemutatkozása** | Nincs nyilvános bemutatkozó szöveg sehol | A „Rólam" szekcióban jelölt hely vár rá — **ezt nem találjuk ki helyette** |
| **Lilla saját portréja** | Nincs nyilvános fotó róla | Ha ad, a logó helyére kerül |
| **Szezonális és kreatív képek** | Ilyen kép nincs a 10 elérhető között | Amíg nincs, ez a két galéria-szűrő nem is jelenik meg |
| **Eredeti (tömörítetlen) fájlok** | A Facebook rontja a képminőséget | Kérd be Lillától |

---

## 🚫 Szándékosan NINCS az oldalon

- **Ár, csomag, időtartam** — nem kaptunk ilyen adatot
- **Vélemények, ajánlások** — a Facebook-oldalon 3 vélemény van, de **értékelés nélkül**
  („Még nem értékelt"), ezért semmilyen értékelést nem jelenítünk meg
- **Díjak, elismerések, publikációk**
- **Referenciák, ügyfélszám, „X éve a szakmában"**
- **Követőszám** (a Facebookon 841) — nem tettük ki, mert napról napra változik
- **Postai cím, stúdiócím, nyitvatartás**
- **Kitalált stílusleírás** — az első változatban volt egy „természetes fénnyel
  dolgozom, nyugodt tempó…" típusú szöveg. **Eltávolítottuk**, mert nem
  ellenőrizhető forrásból származott. A szolgáltatás-kártyákon szintén csak a
  kategórianevek szerepelnek, leírás nélkül.
- **Adatkezelési tájékoztató / cookie-sáv** — jelenleg nincs sütikezelés és nincs
  szerveroldali adattárolás (az űrlap `mailto:`-t nyit). Ha analitika vagy
  szerveres űrlap kerül az oldalra, **ez megváltozik.**

---

## Jogi megjegyzés a képekhez

A galéria képei a nyilvános Facebook-oldalról származnak, és Varga Lilla saját
munkái. Az oldal az ő bemutatkozó felülete, tehát a felhasználás rendben van —
de érdemes ezt vele **kifejezetten egyeztetni**, és tőle bekérni az eredeti
fájlokat, mielőtt az oldal élesbe megy.

---

## Élesítés előtti ellenőrzőlista

- [ ] Több kép feltöltve (`public/galeria/` + `npm run galeria`)
- [ ] Az új képekhez `alt` szöveg megírva
- [ ] Eredeti minőségű fájlok bekérve Lillától
- [ ] Lilla bemutatkozó szövege megírva, a „Kitöltésre vár" blokk kicserélve
- [ ] Lilla saját portréja a Rólam szekcióba (vagy marad a logó)
- [ ] Képhasználat egyeztetve Lillával
- [ ] Domain + hosting kiválasztva
- [ ] `og:image` és megosztási előnézet beállítva (jelenleg nincs)

---

## Design-audit (2026-09-10)

A `design-for-ai` skill CHECKER módja szerint. Javítva:

- **Kontraszt:** a világos szekciók halvány szürkéje fehéren 3,45:1 volt
  (WCAG AA minimum 4,5:1). Érintette a Rólam „Kitöltésre vár" blokkját és a
  Kapcsolat összes címkéjét. Új érték: #6f6f6f → 5,02:1.
- **Érintési felületek:** mobilon minden szöveges gomb 17-21 px magas volt,
  a minimum 44. Most méréssel ellenőrizve: nulla 44 px alatti célpont.
- **Címsor-hierarchia:** a Kapcsolat szekció címe `<p>` volt, most `<h2>`.

Nyitva maradt (tudatosan):

Az audit MINDEN pontja lezárva. Ami a te oldaladon maradt:

- Az `og:image` címe a `.env` fájl `VITE_SITE_URL` sorából jön — éles
  domain után ezt kell átírni, majd `npm run deploy`.
