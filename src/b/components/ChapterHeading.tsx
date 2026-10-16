type Props = {
  /** A fejezet sorszáma — ez a rendszer gerince. */
  n: number;
  title: string;
  /** Horgony a navigációnak. */
  id?: string;
};

/**
 * SZÁMOZOTT FEJEZETCÍM — a B arculat névjegye.
 *
 * 32 px-es, TELI fekete kör (a rendszer egyetlen tiszta feketéje), benne
 * fehér sorszám, mellette ugyanabban a betűtípusban, ugyanabban a 400-as
 * vastagságban a cím. Keret nincs, felület nincs, árnyék nincs.
 */
export function ChapterHeading({ n, title, id }: Props) {
  return (
    <div id={id} className="flex scroll-mt-24 items-center gap-4">
      <span
        aria-hidden="true"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pure-black text-body text-paper"
      >
        {n}
      </span>
      <h2 className="text-subheading text-ink-black sm:text-heading">{title}</h2>
    </div>
  );
}
