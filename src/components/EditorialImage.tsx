import { useState } from "react";
import { photoSrc, type Photo } from "../data/gallery";

type Props = {
  photo: Photo;
  onOpen?: () => void;
  /** Nagy, kiemelt képnél azonnali betöltés. */
  priority?: boolean;
  className?: string;
  sizes?: string;
  /**
   * Fix MAGASSÁGÚ megjelenítés (pl. egy vonalban álló képsorhoz).
   * A szélesség a kép saját arányából adódik — így SEMMI nem lesz levágva.
   * Pl. "h-[30vh]".
   */
  heightClass?: string;
};

/**
 * Egyetlen kép.
 *
 * ALAPELV: a kép sosem lesz levágva. A kompozíció az eredeti képarányra van
 * belőve, ezért a méretet mindig arányosan korlátozzuk — vagy a kép saját
 * arányával kitöltött dobozzal, vagy fix magassággal és automatikus
 * szélességgel.
 *
 * Nincs görgetésre induló animáció sem: 77 képnél az zavaróvá vált.
 */
export function EditorialImage({
  photo,
  onOpen,
  priority = false,
  className = "",
  sizes,
  heightClass,
}: Props) {
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
        // Gyorsítótárból érkező kép esetén az onLoad már lefuthatott,
        // mire a React csatlakozik — így nem maradhat láthatatlanul.
        if (el?.complete) setLoaded(true);
      }}
      onLoad={() => setLoaded(true)}
      className={`${
        heightClass ? "h-full w-auto max-w-full" : "h-full w-full"
      } object-contain transition-[opacity,transform] duration-500 ease-out group-hover:scale-[1.02] ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );

  // Fix magasságú változat: a szélesség a képarányból jön.
  if (heightClass) {
    return (
      <figure
        className={`group relative overflow-hidden ${heightClass} ${
          onOpen ? "cursor-zoom-in" : ""
        } ${className}`}
        onClick={onOpen}
      >
        {img}
      </figure>
    );
  }

  // Alapértelmezett: a doboz aránya MEGEGYEZIK a képével, tehát nincs vágás.
  return (
    <figure
      className={`group relative overflow-hidden bg-raise ${onOpen ? "cursor-zoom-in" : ""} ${className}`}
      style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      onClick={onOpen}
    >
      {img}
    </figure>
  );
}
