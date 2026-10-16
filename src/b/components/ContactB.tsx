import { site } from "../../data/site";
import { chapter } from "../chapters";
import { ChapterHeading } from "./ChapterHeading";
import { ContactFormB } from "./ContactFormB";

/** Az elérhetőségek csíkozott listaként — ez a rendszer ismétlődő sor-mintája. */
const SOROK: { cimke: string; ertek: string; href?: string; kulso?: boolean }[] = [
  { cimke: "E-mail", ertek: site.email, href: site.emailHref },
  { cimke: "Telefon", ertek: site.phone, href: site.phoneHref },
  { cimke: "Helyszín", ertek: site.regionLong },
  { cimke: "Instagram", ertek: "@vargalillaphoto", href: site.instagram, kulso: true },
  { cimke: "Facebook", ertek: "VL photo", href: site.facebook, kulso: true },
];

export function ContactB() {
  const ch = chapter("kapcsolat");

  return (
    <section className="wrap mt-24 sm:mt-32">
      <ChapterHeading id={ch.id} n={ch.n} title={ch.title} />

      <p className="mt-8 max-w-[640px] text-body text-graphite">
        Mesélj a fotózásról, amit elképzeltél — időpont, helyszín, hangulat. Írj e-mailt,
        hívj, vagy töltsd ki az űrlapot.
      </p>

      <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
        <ul className="lg:col-span-5">
          {SOROK.map((sor, i) => (
            <li
              key={sor.cimke}
              className={`flex flex-wrap items-baseline gap-x-6 gap-y-1 px-4 py-4 ${
                i % 2 === 0 ? "bg-mist" : "bg-paper"
              }`}
            >
              <span className="w-24 shrink-0 text-caption text-ash">{sor.cimke}</span>
              {sor.href ? (
                <a
                  href={sor.href}
                  {...(sor.kulso ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="break-all text-body-sm text-ink-black underline-offset-4 hover:underline"
                >
                  {sor.ertek}
                </a>
              ) : (
                <span className="text-body-sm text-ink-black">{sor.ertek}</span>
              )}
            </li>
          ))}
        </ul>

        <div className="lg:col-span-6 lg:col-start-7">
          <ContactFormB />
        </div>
      </div>
    </section>
  );
}
