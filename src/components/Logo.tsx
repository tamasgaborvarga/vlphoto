import { site } from "../data/site";

type Props = { onClick?: () => void; className?: string };

/** Szöveges védjegy — a „VL" hangsúlyos, a „photo" ritkított kísérőszöveg. */
export function Logo({ onClick, className = "" }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${site.brand} — vissza az oldal tetejére`}
      className={`group flex items-baseline gap-2 ${className}`}
    >
      <span className="font-display text-2xl leading-none tracking-tight sm:text-[1.75rem]">
        VL
      </span>
      <span className="text-[0.6rem] font-light font-mono uppercase tracking-[0.42em] text-strong transition-colors duration-300 group-hover:text-fg">
        photo
      </span>
    </button>
  );
}
