import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { site } from "../data/site";
import { services } from "../data/services";

const OTHER = "Egyéb / még nem tudom";

/**
 * A form NEM küld adatot szervernek: a levelezőprogramban nyit meg egy
 * előre kitöltött e-mailt. Így nincs backend, és nincs adattárolás sem.
 * Szerveres küldéshez (pl. Formspree) lásd a README-t.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const name = String(data.get("nev") ?? "");
    const email = String(data.get("email") ?? "");
    const type = String(data.get("tipus") ?? "");
    const message = String(data.get("uzenet") ?? "");

    const subject = `Fotózás – érdeklődés (${type})`;
    const body = [
      `Név: ${name}`,
      `E-mail: ${email}`,
      `Fotózás típusa: ${type}`,
      "",
      message,
    ].join("\n");

    window.location.href = `${site.emailHref}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  };

  const field =
    "w-full border-b border-line bg-transparent py-3 text-base font-light text-fg outline-none transition-colors duration-300 placeholder:text-muted focus:border-fg";
  const label = "text-[0.6rem] font-light font-mono uppercase tracking-[0.28em] text-muted";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
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
            placeholder="Teljes neved"
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
            placeholder="pelda@email.hu"
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
            Válassz…
          </option>
          {services.map((service) => (
            <option key={service.id} value={service.title}>
              {service.title}
            </option>
          ))}
          <option value={OTHER}>{OTHER}</option>
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
          placeholder="Írd le röviden, mire gondoltál — tervezett időpont, helyszín, hangulat."
          className={`${field} mt-2 resize-none`}
        />
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="group relative inline-flex items-center justify-center gap-3 overflow-hidden border border-fg px-9 py-4 text-[0.68rem] font-light font-mono uppercase tracking-[0.28em] text-fg"
        >
          <span className="absolute inset-0 -translate-x-full bg-fg transition-transform duration-500 ease-out group-hover:translate-x-0" />
          <span className="relative flex items-center gap-3 transition-colors duration-500 group-hover:text-bg">
            Üzenet küldése
            <Send size={15} strokeWidth={1.25} />
          </span>
        </button>

        <p aria-live="polite" className="text-xs font-light leading-relaxed text-muted">
          {sent
            ? "Megnyitottuk a levelezőprogramod az előre kitöltött üzenettel. Ha nem nyílt meg, írj közvetlenül a lenti e-mail-címre."
            : "A gomb a levelezőprogramodban nyit meg egy előre kitöltött üzenetet."}
        </p>
      </div>
    </form>
  );
}
