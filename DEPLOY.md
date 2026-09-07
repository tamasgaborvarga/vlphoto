# Feltöltés Cloudflare-re

## Gyors megnyitás Windowson

A projekt gyökerében két duplakattintható fájl van:

| Fájl | Mit csinál |
|---|---|
| `MEGNYITAS.cmd` | Megnyitja a kész oldalt a `deploy/` mappából. Gyors ránézés, szerver nélkül. |
| `ELLENORZES.cmd` | Helyi szervert indít a `deploy/` mappára és megnyitja a böngészőt. **Pontosan azt mutatja, ami a Cloudflare-re felkerül.** |

A `deploy/index.html` duplakattintással is megnyílik — a JS és a CSS bele van ágyazva.

---

## 1. A mappa elkészítése

```bash
npm run deploy
```

Ez lefuttatja a buildet, és elkészíti a **`deploy/`** mappát. Ezt kell feltölteni.
A mappa tartalma: `index.html` (a CSS és a JS bele van ágyazva), `galeria/` (251 fotó),
`favicon.svg`, `_headers`, `_redirects`.

---

> **A `deploy/index.html` duplakattintással is megnyílik.** A CSS és a JS bele
> van ágyazva az index.html-be, ezért nem kell hozzá szerver. Ugyanez a mappa
> megy fel változtatás nélkül a Cloudflare-re.
>
> Szerverrel is megnézheted (ez a hitelesebb próba):
>
> ```bash
> npm run deploy:check   # → http://127.0.0.1:4300
> ```

---

## 2/a. Drag & drop — Cloudflare Pages

> **Ha a mappát húzod be, a `galeria/` alkönyvtár gyakran kimarad.** A böngészők
> eltérően kezelik a mappák bejárását, és ilyenkor csak az `index.html` megy fel.
>
> **Húzd be helyette a `vl-photo-deploy.zip` fájlt** — ez a `npm run deploy`
> mellékterméke, a Cloudflare kicsomagolja. Egyetlen fájl, nincs mit elrontani.

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Upload assets**
2. Projekt neve: `vl-photo`
3. Húzd be a **`deploy`** mappát (az egész mappát, nem a benne lévő fájlokat)
4. **Deploy site**

Kapsz egy `vl-photo.pages.dev` címet. Saját domain: a projekt → **Custom domains**.

Frissítéskor: `npm run deploy`, majd a projektben **Create new deployment** és
újra behúzni a mappát.

---

## 2/b. Parancssorból — EZ AZ AJÁNLOTT

A böngészős drag & drop 255 fájlnál lassú és gyakran megakad. Parancssorból
párhuzamosan tölt fel, kihagyja a már feltöltött fájlokat, és megszakadás után
folytatható:

```bash
npm run deploy:cf
```

Vagy duplakattintás: **`FELTOLTES.cmd`**

Első alkalommal megnyílik a böngésző a Cloudflare-bejelentkezéshez.

Workers-re (nem Pages): `npm run deploy && npx wrangler deploy` — a `wrangler.toml`
már a `./deploy` mappára mutat.

---

## Amit a `_headers` és a `_redirects` intéz

- `assets/*` — egy évig cache-elhető (a fájlnevekben hash van, ezért biztonságos)
- `galeria/*` — egy hétig cache-elhető
- `index.html` — soha nincs cache-elve, így a frissítés azonnal látszik
- minden ismeretlen útvonal az `index.html`-re megy (egyoldalas alkalmazás)

---

## Ellenőrzés feltöltés előtt

```bash
npm run preview
```

Ez a kész buildet szolgálja ki helyben — ugyanazt látod, mint ami felkerül.
