import { useState } from "react";
import { photoSrc, type Photo } from "../../data/gallery";

type Props = {
  photo: Photo;
  onOpen?: () => void;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * Egyetlen fotó, 12 px-es lekerekítéssel.
 *
 * A doboz aránya MEGEGYEZIK a képével, tehát semmi nem lesz levágva — ez az
 * A verzióból átvett alapelv, és itt is érvényes. Keret, árnyék, felirat
 * nincs: a fehér lap a keret.
 */
export function ImageB({ photo, onOpen, priority = false, sizes, className = "" }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure
      className={`relative overflow-hidden rounded-xl bg-mist ${
        onOpen ? "cursor-zoom-in" : ""
      } ${className}`}
      style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      onClick={onOpen}
    >
      <img
        src={photoSrc(photo)}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        sizes={sizes}
        ref={(el) => {
          // Gyorsítótárból érkező képnél az onLoad már lefuthatott.
          if (el?.complete) setLoaded(true);
        }}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </figure>
  );
}
