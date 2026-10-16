import { useMemo, useState } from "react";
import { site } from "../../data/site";
import { categories, osszesKep, photos, photoSrc, type Category, type CategoryId } from "../../data/gallery";
import { collections } from "../../data/collections";
import { ChapterHead, ImageC, LightboxC } from "./parts";

/* ------------------------------------------------------------------ */
/* 02 — Irányok: grafit fejezet, sorszámozott sorok, mellettük előnézet */
/* ------------------------------------------------------------------ */

export function DirectionsC({ onOpenCategory }: { onOpenCategory: (id: CategoryId) => void }) {
  const [hover, setHover] = useState<CategoryId>(collections[0].id);
  const kepek = collections.map((c) => photos.find((p) => p.id === c.photos[0]));

  return (
    <section id="iranyok" className="c-sec c-night" data-dark aria-labelledby="iranyok-cim">
      <ChapterHead id="iranyok" aside="Válassz, és a teljes anyag arra szűrve nyílik" />

      <div className="c-wrap c-grid c-dir">
        <ol className="c-dir-list">
          {collections.map((c, i) => {
            const kep = kepek[i];
            const db = photos.filter((p) => p.category === c.id).length;
            return (
              <li key={c.id} className="c-dir-item" data-rv>
                <button
                  type="button"
                  className="c-dir-a"
                  onMouseEnter={() => setHover(c.id)}
                  onFocus={() => setHover(c.id)}
                  onClick={() => onOpenCategory(c.id)}
                >
                  <span className="c-no c-dir-no">{String(i + 1).padStart(2, "0")}</span>
                  <span className="c-dir-body">
                    <span className="c-h2 c-dir-t">{c.title}</span>
                    <span className="c-dir-line">{c.line}</span>
                  </span>
                  <span className="c-dir-meta">
                    <span className="c-label c-muted">{db} kép</span>
                    <span className="c-arr" aria-hidden="true" />
                  </span>
                  {kep && (
                    <span className="c-dir-thumb" aria-hidden="true">
                      <img src={photoSrc(kep)} alt="" loading="lazy" decoding="async" />
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ol>

        <figure className="c-dir-fig" aria-hidden="true">
          {collections.map((c, i) => {
            const kep = kepek[i];
            return (
              kep && (
                <span key={c.id} className={`c-dir-img ${hover === c.id ? "on" : ""}`}>
                  <img src={photoSrc(kep)} alt="" loading="lazy" decoding="async" />
                </span>
              )
            );
          })}
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 03 — Rólam                                                          */
/* ------------------------------------------------------------------ */

/** A megrendelő által megerősített négy szolgáltatás — nem kitalált stílusjegy. */
const SZOLGALTATASOK = ["Portré", "Jegyes & páros", "Kreatív szabadtéri", "Karácsonyi & szezonális"];

/** HELYŐRZŐ: Lilláról nincs fotónk, ezért az egyik munkája áll itt. */
const HELYORZO_KEP = "portre-091";

export function AboutC() {
  const kep = osszesKep.find((p) => p.id === HELYORZO_KEP);

  return (
    <section id="rolam" className="c-sec c-tint" aria-labelledby="rolam-cim">
      <ChapterHead id="rolam" />

      <div className="c-wrap c-grid c-about">
        <div className="c-about-fig">
          {kep && <ImageC photo={kep} sizes="(min-width: 1000px) 40vw, 100vw" />}
          <p className="c-cap c-muted">Helyőrző — ide Lilla saját portréja kerül</p>
        </div>

        <div className="c-about-text">
          <p className="c-lead" data-rv>
            {site.photographer} fotográfus, {site.regionLong}.
          </p>

          {/* HELYŐRZŐ — a személyes bemutatkozást Lillának kell megírnia. */}
          <div className="c-todo" data-rv>
            <p className="c-label">Kitöltésre vár</p>
            <p>Ide Lilla rövid, személyes bemutatkozása kerül — hogyan dolgozik, mi számít neki egy fotózáson.</p>
          </div>

          <ul className="c-list" data-rv>
            {SZOLGALTATASOK.map((sz, i) => (
              <li key={sz}>
                <span className="c-no">{String(i + 1).padStart(2, "0")}</span>
                <span className="c-list-t">{sz}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 04 — Teljes anyag                                                   */
/* ------------------------------------------------------------------ */

const ADAG = 24;

export function ArchiveC({ filter, onFilterChange }: { filter: Category["id"]; onFilterChange: (id: Category["id"]) => void }) {
  const [limit, setLimit] = useState(ADAG);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "osszes" ? photos : photos.filter((p) => p.category === filter)),
    [filter],
  );

  // Szűrőváltáskor újra az elejéről — állapotigazítás renderelés közben.
  const [latott, setLatott] = useState(filter);
  if (latott !== filter) {
    setLatott(filter);
    setLimit(ADAG);
  }

  const shown = visible.slice(0, limit);
  const maradek = visible.length - shown.length;
  const db = (id: Category["id"]) => (id === "osszes" ? photos.length : photos.filter((p) => p.category === id).length);

  return (
    <section id="archivum" className="c-sec" aria-labelledby="archivum-cim">
      <ChapterHead id="archivum" aside={`Látható: ${shown.length} / ${visible.length} kép`}>
        <div role="tablist" aria-label="Szűrés kategória szerint" className="c-pills">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={filter === cat.id}
              className="c-pill"
              onClick={() => onFilterChange(cat.id)}
            >
              {cat.label}
              <span className="c-pill-n">{db(cat.id)}</span>
            </button>
          ))}
        </div>
      </ChapterHead>

      <div key={filter} className="c-wrap c-masonry">
        {shown.map((photo, i) => (
          <div key={photo.id} className="c-masonry-i">
            <ImageC
              photo={photo}
              onOpen={() => setOpenIndex(i)}
              sizes="(min-width: 1000px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </div>
        ))}
      </div>

      {maradek > 0 && (
        <div className="c-wrap c-more">
          <button type="button" className="c-btn c-btn-line" onClick={() => setLimit((l) => l + ADAG)}>
            Több kép <span className="c-pill-n">{maradek}</span>
          </button>
        </div>
      )}

      <LightboxC photos={visible} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 05 — Kapcsolat + lábléc: egyetlen grafit blokk                      */
/* ------------------------------------------------------------------ */

const TIPUSOK = [
  "Portréfotózás",
  "Jegyes és páros fotózás",
  "Kreatív szabadtéri fotózás",
  "Karácsonyi és szezonális fotózás",
  "Üzleti fotózás / esemény",
  "Egyéb",
];

/** A form NEM küld adatot szervernek: előre kitöltött e-mailt nyit (nincs backend, nincs adatkezelés). */
function FormC() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="c-form"
      onSubmit={(e) => {
        e.preventDefault();
        const d = new FormData(e.currentTarget);
        const g = (k: string) => String(d.get(k) ?? "");
        const subject = `Fotózás – érdeklődés (${g("tipus")})`;
        const body = [`Név: ${g("nev")}`, `E-mail: ${g("email")}`, `Fotózás típusa: ${g("tipus")}`, "", g("uzenet")].join("\n");
        window.location.href = `${site.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setSent(true);
      }}
    >
      <div className="c-form-2">
        <label className="c-field">
          <span className="c-label">Név</span>
          <input name="nev" type="text" required autoComplete="name" />
        </label>
        <label className="c-field">
          <span className="c-label">E-mail</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <label className="c-field">
        <span className="c-label">Fotózás típusa</span>
        <select name="tipus" required defaultValue="">
          <option value="" disabled>
            Válassz
          </option>
          {TIPUSOK.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
      <label className="c-field">
        <span className="c-label">Üzenet</span>
        <textarea name="uzenet" required rows={4} placeholder="Tervezett időpont, helyszín, hangulat" />
      </label>
      <div className="c-form-foot">
        <button type="submit" className="c-btn c-btn-solid">
          Üzenet küldése <span className="c-arr" aria-hidden="true" />
        </button>
        <p aria-live="polite" className="c-cap c-muted">
          {sent
            ? "Megnyitottuk a levelezőprogramod az előre kitöltött üzenettel."
            : "A gomb a levelezőprogramodban nyit meg egy előre kitöltött üzenetet."}
        </p>
      </div>
    </form>
  );
}

export function ContactC() {
  return (
    <footer id="kapcsolat" className="c-sec c-night c-foot" data-dark aria-labelledby="kapcsolat-cim">
      <ChapterHead id="kapcsolat" aside={site.regionLong} />

      <div className="c-wrap c-grid c-contact">
        <div className="c-contact-l">
          <p className="c-foot-lead" data-rv>
            Mesélj a fotózásról, amit elképzeltél.
          </p>
          <p className="c-contact-sub c-muted" data-rv>
            Időpont, helyszín, hangulat — írj e-mailt, hívj, vagy töltsd ki az űrlapot.
          </p>
          <div className="c-big-links" data-rv>
            <a href={site.emailHref} className="c-big-link c-nowrap">
              {site.email}
            </a>
            <a href={site.phoneHref} className="c-big-link c-nowrap">
              {site.phone}
            </a>
          </div>
          <dl className="c-facts" data-rv>
            <div>
              <dt className="c-label c-muted">Instagram</dt>
              <dd>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                  @vargalillaphoto
                </a>
              </dd>
            </div>
            <div>
              <dt className="c-label c-muted">Facebook</dt>
              <dd>
                <a href={site.facebook} target="_blank" rel="noopener noreferrer">
                  VL photo
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="c-contact-r" data-rv>
          <FormC />
        </div>
      </div>

      <div className="c-wrap c-legal">
        <p>
          &copy; {new Date().getFullYear()} {site.brand} — {site.photographer}
        </p>
        {/* Csak a változatok összehasonlításához — élesítés előtt törlendő. */}
        <p className="c-legal-v">
          <span className="c-muted">Változatok:</span> <a href="./index.html">A</a> <a href="./b.html">B</a>{" "}
          <span aria-current="page">C</span>
        </p>
        <button
          type="button"
          className="c-label c-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Vissza a tetejére
        </button>
      </div>
    </footer>
  );
}
