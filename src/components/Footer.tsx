import { FacebookIcon, InstagramIcon } from "./SocialIcons";
import { navLinks, site } from "../data/site";
import { scrollToSection } from "../lib/scroll";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="surface border-t border-line bg-bg py-14 sm:py-16">
      <div className="container-editorial">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Logo onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
            <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-muted">
              {site.tagline} — {site.region}
            </p>
          </div>

          <nav aria-label="Lábléc navigáció">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 sm:flex sm:gap-10">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="text-[0.68rem] font-light font-mono uppercase tracking-[0.22em] text-muted transition-colors duration-300 hover:text-fg"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3">
            <a
              href={site.phoneHref}
              className="block text-sm font-light text-strong transition-colors hover:text-fg"
            >
              {site.phone}
            </a>
            <a
              href={site.emailHref}
              className="block text-sm font-light text-strong transition-colors hover:text-fg"
            >
              {site.email}
            </a>
            <div className="flex gap-4 pt-1">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VL photo Instagram-oldala"
                className="text-muted transition-colors duration-300 hover:text-fg"
              >
                <InstagramIcon size={19} strokeWidth={1.2} />
              </a>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VL photo Facebook-oldala"
                className="text-muted transition-colors duration-300 hover:text-fg"
              >
                <FacebookIcon size={19} strokeWidth={1.2} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-7">
          <p className="text-[0.68rem] font-light tracking-wide text-muted">
            © {year} VL photo — Varga Lilla
          </p>
        </div>
      </div>
    </footer>
  );
}
