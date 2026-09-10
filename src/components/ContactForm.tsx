import { useState, type FormEvent } from "react";
import { site } from "../data/site";

/** A megrendelő által megerősített négy kategória + egy nyitott válasz. */
const TIPUSOK = [
  "Portréfotózás",
  "Jegyes és páros fotózás",
  "Kreatív szabadtéri fotózás",
  "Karácsonyi és szezonális fotózás",
  "Egyéb / még nem tudom",
];

/**
 * A form NEM küld adatot szervernek: a levelezőprogramban nyit meg egy
 * előre kitöltött e-mailt. Így nincs backend és nincs adatkezelés sem.
 */
export function ContactForm() {
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

  const field =
    "w-full border-b border-line bg-transparent py-3 text-base text-fg outline-none transition-colors duration-500 placeholder:text-muted focus:border-fg";
  const label = "font-mono text-[0.55rem] uppercase tracking-[0.28em] text-muted";

  return (
    <form onSubmit={handleSubmit} className="space-y-9">
      <div className="grid gap-9 sm:grid-cols-2">
        <div>
          <label htmlFor="nev" className={label}>
            Név
          </label>
          <input
            id="nev"
            name="nev"
            type="text"
            required
            autoComplete="name"
            className={`${field} mt-2`}
          />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`${field} mt-2`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="tipus" className={label}>
          Fotózás típusa
        </label>
        <select id="tipus" name="tipus" required defaultValue="" className={`${field} mt-2`}>
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
        <label htmlFor="uzenet" className={label}>
          Üzenet
        </label>
        <textarea
          id="uzenet"
          name="uzenet"
          required
          rows={4}
          placeholder="Tervezett időpont, helyszín, hangulat"
          className={`${field} mt-2 resize-none`}
        />
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="group -my-3 inline-flex items-center gap-3 self-start py-3 font-mono text-[0.68rem] uppercase tracking-[0.28em] text-fg"
        >
          <span className="border-b border-fg/40 pb-1 transition-colors duration-500 group-hover:border-fg">
            Üzenet küldése
          </span>
          <span className="transition-transform duration-500 ease-out group-hover:translate-x-1.5">
            &rarr;
          </span>
        </button>

        <p aria-live="polite" className="max-w-xs text-xs leading-relaxed text-muted">
          {sent
            ? "Megnyitottuk a levelezőprogramod az előre kitöltött üzenettel."
            : "A gomb a levelezőprogramodban nyit meg egy előre kitöltött üzenetet."}
        </p>
      </div>
    </form>
  );
}
