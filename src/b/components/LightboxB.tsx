import { useCallback, useEffect, useRef, useState } from "react";
import { photoFull, type Photo } from "../../data/gallery";
import { useScrollLock } from "../../hooks/useScrollLock";

type Props = {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/**
 * Nagyított kép.
 *
 * A rendszer két felületet ismer: papírfehér és majdnem-fekete. A nagyításnál
 * a MAJDNEM-FEKETE (#1a1a1a) jár, mert fehér lapon a fotók egymást és a
 * környezetüket is tompítanák. Ikon itt sincs: a vezérlők tipográfiai jelek
 * (×, ←, →), ugyanabban a betűtípusban.
 */
export function LightboxB({ photos, index, onClose, onNavigate }: Props) {
  const open = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const [loadedId, setLoadedId] = useState<string | null>(null);

  useScrollLock(open);

  const go = useCallback(
    (delta: number) => {
      if (index === null || photos.length === 0) return;
      onNavigate((index + delta + photos.length) % photos.length);
    },
    [index, photos.length, onNavigate],
  );

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, go]);

  if (!open) return null;
  const photo = photos[index];
  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Kép nagyítva"
      className="fixed inset-0 z-60 flex flex-col bg-ink-black"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 py-4 sm:px-8">
        <span className="text-caption text-ash">
          {index + 1} / {photos.length}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Bezárás"
          className="-mr-2 flex h-11 w-11 items-center justify-center text-body text-paper"
        >
          &#215;
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-20"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={photo.id}
          src={photoFull(photo)}
          alt={photo.alt}
          onLoad={() => setLoadedId(photo.id)}
          className={`max-h-full max-w-full rounded-xl object-contain transition-opacity duration-300 ${
            loadedId === photo.id ? "opacity-100" : "opacity-0"
          }`}
        />

        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Előző kép"
              className="absolute left-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-body text-paper sm:left-4"
            >
              &#8592;
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Következő kép"
              className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-body text-paper sm:right-4"
            >
              &#8594;
            </button>
          </>
        )}
      </div>

      <div className="px-4 py-6 text-center sm:px-8">
        <p className="mx-auto max-w-2xl text-caption text-ash">{photo.alt}</p>
      </div>
    </div>
  );
}
