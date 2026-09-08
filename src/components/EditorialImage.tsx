import { useState } from "react";
import { motion } from "framer-motion";
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

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Egyetlen kép. A felfedés maszkos: a keret alulról nyílik ki, a kép pedig
 * közben alig érezhetően visszaáll 1-es méretre. Ez adja azt a lassú,
 * „drága" hatást, amit egy sima elhalványulás nem.
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
    <motion.figure
      initial={{ clipPath: "inset(22% 0% 0% 0%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 1.4, ease }}
      className={`group relative overflow-hidden bg-raise ${onOpen ? "cursor-zoom-in" : ""} ${className}`}
      style={cover ? undefined : { aspectRatio: ` / ` }}
      onClick={onOpen}
    >
      <motion.img
        src={photoSrc(photo)}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        initial={{ scale: 1.07 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 1.6, ease }}
        className={`h-full w-full object-cover transition-[opacity,transform] duration-[1200ms] ease-out group-hover:scale-[1.02] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </motion.figure>
  );
}
