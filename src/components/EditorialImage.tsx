import { useState } from "react";
import { motion } from "framer-motion";
import { photoSrc, type Photo } from "../data/gallery";

type Props = {
  photo: Photo;
  onOpen?: () => void;
  /** Nagy, kiemelt képnél lassabb, hosszabb reveal. */
  priority?: boolean;
  className?: string;
  sizes?: string;
};

/**
 * Egyetlen kép, visszafogott megjelenéssel: lassú felúszás, finom
 * elhalványulás betöltéskor, alig érezhető hover-zoom. Semmi több.
 */
export function EditorialImage({ photo, onOpen, priority = false, className = "", sizes }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden bg-raise ${onOpen ? "cursor-zoom-in" : ""} ${className}`}
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
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-[opacity,transform] duration-[1200ms] ease-out group-hover:scale-[1.02] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </motion.figure>
  );
}
