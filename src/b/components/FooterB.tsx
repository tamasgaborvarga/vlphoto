import { site } from "../../data/site";

/**
 * A lábléc NEM fordított, sötét blokk — ugyanazon a fehér lapon marad, mint
 * az egész oldal. Ez a rendszer egyik szabálya.
 */
export function FooterB() {
  return (
    <footer className="wrap mt-24 pb-16 sm:mt-32">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <p className="text-body text-ink-black">{site.brand}</p>
          <p className="mt-3 text-body-sm text-graphite">{site.regionLong}</p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-2 text-body-sm text-graphite">
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="-my-3 inline-flex min-h-11 items-center py-3"
          >
            Instagram
          </a>
          <a
            href={site.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="-my-3 inline-flex min-h-11 items-center py-3"
          >
            Facebook
          </a>
          <a href={site.emailHref} className="-my-3 inline-flex min-h-11 items-center py-3">
            E-mail
          </a>
        </div>
      </div>

      <p className="mt-16 text-body-sm text-graphite">
        &copy; {new Date().getFullYear()} {site.brand} &mdash; {site.photographer}
      </p>

      {/* Csak a két változat összehasonlításához — élesítés előtt törlendő. */}
      <p className="mt-4 text-caption text-ash">
        <a href="./index.html" className="underline underline-offset-4">
          Vissza az A verzióra
        </a>
      </p>
    </footer>
  );
}
