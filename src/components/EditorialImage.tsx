import { useState } from "react";
import { photoSrc, type Photo } from "../data/gallery";

type Props = {
  photo: Photo;
  onOpen?: () => void;
  /** Nagy, kiemelt képnél azonnali betöltés. */
  priority?: boolean;
  className?: string;
  sizes?: string;
  /** Fix magasságú, kitöltő kép (teljes szélességű sávokhoz). Ilyenkor
   *  nem a kép saját aránya adja a magasságot. */
  cover?: boolean;
};

/**
 * Egyetlen kép.
 *
 * SZÁNDÉKOSAN NINCS görgetésre induló animáció: 77 képnél a folyamatos
 * beúszás zavaró lett. Csak annyi történik, hogy a kép betöltéskor
 * halkan megjelenik — ez a lusta betöltés miatt amúgy is kell.
 */
export function EditorialImage({
  photo,
  onOpen,
  priority = false,
  className = "",
  sizes,
  cover = false,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure
      className={`group relative overflow-hidden bg-raise ${onOpen ? "cursor-zoom-in" : ""} ${className}`}
      style={cover ? undefined : { aspectRatio: `${photo.width} / ${photo.height}` }}
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
          // Gyorsítótárból érkező kép esetén az onLoad már lefuthatott,
          // mire a React csatlakozik — így nem maradhat láthatatlanul.
          if (el?.complete) setLoaded(true);
        }}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-[opacity,transform] duration-500 ease-out group-hover:scale-[1.02] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </figure>
  );
}
