/** Sima görgetés egy szekcióhoz, a fix fejléc magasságát figyelembe véve. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = el.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
}
