import { motion } from "framer-motion";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

/**
 * Egységes szekciócím. A színeket a befoglaló felület (.surface /
 * .surface-inverse) adja, ezért itt nincs világos/sötét változat.
 */
export function SectionHeading({ eyebrow, title, description, align = "left" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
    >
      <p className="font-mono text-[0.6rem] font-light uppercase tracking-[0.38em] text-muted">
        {eyebrow}
      </p>
      <h2 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-base font-light leading-relaxed text-strong">{description}</p>
      )}
    </motion.div>
  );
}
