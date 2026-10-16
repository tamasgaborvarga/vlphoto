import { useState, type FormEvent } from "react";
import { site } from "../../data/site";

/** A megrendelő által megerősített négy kategória, plusz az üzleti munka. */
const TIPUSOK = [
  "Portréfotózás",
  "Jegyes és páros fotózás",
  "Kreatív szabadtéri fotózás",
  "Karácsonyi és szezonális fotózás",
  "Üzleti fotózás / esemény",
  "Egyéb",
];

/**
 * A form NEM küld adatot szervernek: a levelezőprogramban nyit meg egy előre
 * kitöltött e-mailt. Így nincs backend és nincs adatkezelés sem.
 *
 * A mezők a rendszer világos, hajszálkeretes gombjának a logikáját követik:
 * 1 px #e6e6e6 keret, 8 px lekerekítés, semmi árnyék.
 */
export function ContactFormB() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nev = String(data.get("nev") ?? "");
    const email = String(data.get("email") ?? "");
    const tipus = String(data.get("tipus") ?? "");
    const uzenet = String(data.get("uzenet") ?? "");

    const subject = `Fotózás – érdeklődés (${tipus})`;
    const body = [`Név: ${nev}`, `E-mail: ${email}`, `Fotózás típusa: ${tipus}`, "", uzenet].join(
      "\n",
    );

    window.location.href = `${site.emailHref}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const mezo =
    "mt-3 w-full rounded-lg border border-fog bg-paper px-4 py-3 text-body-sm text-ink-black outline-none placeholder:text-ash focus:border-ink-black";
  const cimke = "text-caption text-ash";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="b-nev" className={cimke}>
            Név
          </label>
          <input id="b-nev" name="nev" type="text" required autoComplete="name" className={mezo} />
        </div>
        <div>
          <label htmlFor="b-email" className={cimke}>
            E-mail
          </label>
          <input
            id="b-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={mezo}
          />
        </div>
      </div>

      <div>
        <label htmlFor="b-tipus" className={cimke}>
          Fotózás típusa
        </label>
        <select id="b-tipus" name="tipus" required defaultValue="" className={mezo}>
          <option value="" disabled>
            Válassz
          </option>
          {TIPUSOK.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="b-uzenet" className={cimke}>
          Üzenet
        </label>
        <textarea
          id="b-uzenet"
          name="uzenet"
          required
          rows={5}
          placeholder="Tervezett időpont, helyszín, hangulat"
          className={`${mezo} resize-none`}
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-charcoal px-4 py-3 text-body-sm text-paper"
        >
          Üzenet küldése
        </button>

        <p aria-live="polite" className="max-w-[320px] text-caption text-ash">
          {sent
            ? "Megnyitottuk a levelezőprogramod az előre kitöltött üzenettel."
            : "A gomb a levelezőprogramodban nyit meg egy előre kitöltött üzenetet."}
        </p>
      </div>
    </form>
  );
}
