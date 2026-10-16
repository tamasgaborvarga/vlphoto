import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { photoFull, photoSrc, type Photo } from "../../data/gallery";
import { useScrollLock } from "../../hooks/useScrollLock";
import { chapter } from "../chapters";

/**
 * Fejezetnyitó: sorszám + nagy cím, jobbra egy halk megjegyzés, alatta
 * végigfutó hajszálvonal (beúszáskor balról nyílik).
 */
export function ChapterHead({ id, aside, children }: { id: string; aside?: ReactNode; children?: ReactNode }) {
  const ch = chapter(id);
  return (
    <header className="c-wrap c-chapter" data-rv>
      <div className="c-chapter-grid">
        <p className="c-no c-chapter-no">{ch.n}</p>
        <h2 id={`${id}-cim`} className="c-h1 c-chapter-t">
          {ch.title}
        </h2>
        {aside && <p className="c-label c-muted c-chapter-aside">{aside}</p>}
      </div>
      {children}
    </header>
  );
}

/**
 * Egyetlen fotó. A doboz aránya a képé — semmi nincs levágva (az A verzió
 * alapelve). Betöltésig a passepartout-szín áll a helyén; beúszáskor a kép
 * alulról nyíló maszkkal jelenik meg.
 */
export function ImageC({
  photo,
  onOpen,
  priority = false,
  sizes,
  label,
}: {
  photo: Photo;
  onOpen?: () => void;
  priority?: boolean;
  sizes?: string;
  label?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const img = (
    <img
      src={photoSrc(photo)}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      sizes={sizes}
      ref={(el) => {
        if (el?.complete && el.naturalWidth) setLoaded(true);
      }}
      onLoad={() => setLoaded(true)}
      className={loaded ? "ok" : ""}
    />
  );

  return (
    <figure className="c-media" data-rv="img" style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
      {onOpen ? (
        <button type="button" className="c-media-btn" onClick={onOpen} aria-label={label ?? `Nagyítás: ${photo.alt}`}>
          {img}
        </button>
      ) : (
        img
      )}
    </figure>
  );
}

/**
 * Nagyító: grafit felület, tipográfiai vezérlők (Előző · Következő ·
 * Bezárás), billentyűzet és mobilon oldalra húzás.
 */
export function LightboxC({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const open = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const [loadedId, setLoadedId] = useState<string | null>(null);
  const touchX = useRef<number | null>(null);

  useScrollLock(open);

  const go = useCallback(
    (d: number) => {
      if (index === null || photos.length === 0) return;
      onNavigate((index + d + photos.length) % photos.length);
    },
    [index, photos.length, onNavigate],
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prev?.focus?.({ preventScroll: true });
    };
  }, [open, onClose, go]);

  if (!open) return null;
  const photo = photos[index];
  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Kép nagyítva"
      className="c-lb"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="c-wrap c-lb-top">
        <span className="c-no">
          {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
        </span>
        <button ref={closeRef} type="button" className="c-lb-btn c-label" onClick={onClose}>
          Bezárás
        </button>
      </div>

      <div className="c-lb-stage" onClick={onClose}>
        <img
          key={photo.id}
          src={photoFull(photo)}
          alt={photo.alt}
          onClick={(e) => e.stopPropagation()}
          onLoad={() => setLoadedId(photo.id)}
          className={loadedId === photo.id ? "ok" : ""}
        />
      </div>

      <div className="c-wrap c-lb-foot">
        {photos.length > 1 ? (
          <button type="button" className="c-lb-btn c-label" onClick={() => go(-1)}>
            Előző
          </button>
        ) : (
          <span />
        )}
        <p className="c-lb-cap">{photo.alt}</p>
        {photos.length > 1 ? (
          <button type="button" className="c-lb-btn c-label" onClick={() => go(1)}>
            Következő
          </button>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
