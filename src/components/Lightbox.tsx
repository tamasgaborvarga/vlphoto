import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { photoFull, type Photo } from "../data/gallery";
import { useScrollLock } from "../hooks/useScrollLock";

type Props = {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function Lightbox({ photos, index, onClose, onNavigate }: Props) {
  const open = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  // Melyik kép töltődött már be — így nincs szükség effektre az index váltásakor.
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

  const photo = index !== null ? photos[index] : null;

  return (
    <AnimatePresence>
      {open && photo && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Kép nagyítva"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="surface-fixed-dark fixed inset-0 z-[60] flex flex-col bg-bg/95 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Fejléc: számláló + bezárás */}
          <div className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-6">
            <span className="text-[0.65rem] font-light font-mono uppercase tracking-[0.3em] text-muted">
              {index + 1} / {photos.length}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Bezárás"
              className="-mr-2 p-2 text-strong transition-colors hover:text-fg"
            >
              <X size={24} strokeWidth={1} />
            </button>
          </div>

          {/* Kép */}
          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={photo.id}
                src={photoFull(photo)}
                alt={photo.alt}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: loadedId === photo.id ? 1 : 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onLoad={() => setLoadedId(photo.id)}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.14}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) go(1);
                  if (info.offset.x > 70) go(-1);
                }}
                className="max-h-full max-w-full cursor-grab object-contain active:cursor-grabbing"
              />
            </AnimatePresence>

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Előző kép"
                  className="absolute left-0 top-1/2 -translate-y-1/2 p-3 text-muted transition-colors hover:text-fg sm:left-4"
                >
                  <ChevronLeft size={34} strokeWidth={1} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Következő kép"
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-3 text-muted transition-colors hover:text-fg sm:right-4"
                >
                  <ChevronRight size={34} strokeWidth={1} />
                </button>
              </>
            )}
          </div>

          {/* Képaláírás */}
          <div className="px-5 py-6 text-center sm:px-8 sm:py-8">
            <p className="mx-auto max-w-xl text-xs font-light leading-relaxed text-muted sm:text-sm">
              {photo.alt}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
