import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { photoSrc, type Photo } from "../data/gallery";

type Props = { photo: Photo; index: number; onOpen: () => void };

export function GalleryItem({ photo, index, onOpen }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${photo.alt} — nagyítás`}
      className="group relative mb-4 block w-full cursor-zoom-in overflow-hidden bg-raise sm:mb-5"
      style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
    >
      <img
        src={photoSrc(photo)}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={index < 4 ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-all duration-[900ms] ease-out will-change-transform group-hover:scale-[1.04] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Hover fátyol + ikon */}
      <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/35" />
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <Maximize2 size={22} strokeWidth={1} className="text-fg" />
      </span>
      <span className="pointer-events-none absolute inset-0 border border-fg/0 transition-colors duration-500 group-hover:border-fg/25" />
    </button>
  );
}
