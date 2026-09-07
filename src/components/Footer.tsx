import { site } from "../data/site";

export function Footer() {
  return (
    <footer className="surface border-t border-line bg-bg py-14">
      <div className="container-editorial flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.34em] text-fg">VL photo</p>
          <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">
            {site.region} &middot; Magyarország
          </p>
        </div>

        <div className="flex gap-7 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-500 hover:text-fg"
          >
            Instagram
          </a>
          <a href={site.emailHref} className="transition-colors duration-500 hover:text-fg">
            E-mail
          </a>
        </div>
      </div>

      <div className="container-editorial mt-12 border-t border-line pt-6">
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.24em] text-muted">
          &copy; {new Date().getFullYear()} VL photo &mdash; Varga Lilla
        </p>
      </div>
    </footer>
  );
}
