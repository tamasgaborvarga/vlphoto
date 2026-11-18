import { motion } from "framer-motion";
import { site } from "../data/site";
import { ContactForm } from "./ContactForm";
import { FacebookIcon, InstagramIcon } from "./SocialIcons";

const ease = [0.22, 1, 0.36, 1] as const;

export function Contact() {
  return (
    <section
      id="contact"
      className="surface-inverse scroll-mt-20 bg-bg py-24 text-fg sm:py-32 lg:py-40"
    >
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
        >
          <p className="font-mono text-label-sm uppercase tracking-[0.32em] text-muted">
            Kapcsolat
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-5xl leading-none tracking-tight sm:text-6xl lg:text-7xl">
            Foglalj fotózást
          </h2>
          <p className="mt-6 max-w-lg text-pretty font-display text-xl text-strong sm:text-2xl">
            Mesélj a fotózásról, amit elképzeltél.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-12 gap-x-5 gap-y-14 lg:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.5, ease }}
            className="col-span-12 lg:col-span-4"
          >
            <ul className="space-y-8">
              <li>
                <p className="font-mono text-label-sm uppercase tracking-[0.28em] text-muted">
                  E-mail
                </p>
                <a
                  href={site.emailHref}
                  className="-my-2 mt-2 flex min-h-11 items-center py-2 font-display text-xl underline-offset-4 hover:underline sm:text-2xl"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <p className="font-mono text-label-sm uppercase tracking-[0.28em] text-muted">
                  Telefon
                </p>
                <a
                  href={site.phoneHref}
                  className="-my-2 mt-2 flex min-h-11 items-center whitespace-nowrap py-2 font-display text-xl tabular-nums underline-offset-4 hover:underline sm:text-2xl"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <p className="font-mono text-label-sm uppercase tracking-[0.28em] text-muted">
                  Helyszín
                </p>
                <p className="mt-2 font-display text-xl sm:text-2xl">{site.regionLong}</p>
              </li>
            </ul>

            <div className="mt-10 flex gap-6">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VL photo Instagram-oldala"
                className="-m-3 flex min-h-11 min-w-11 items-center justify-center text-muted transition-colors duration-200 hover:text-fg"
              >
                <InstagramIcon size={19} strokeWidth={1.1} />
              </a>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VL photo Facebook-oldala"
                className="-m-3 flex min-h-11 min-w-11 items-center justify-center text-muted transition-colors duration-200 hover:text-fg"
              >
                <FacebookIcon size={19} strokeWidth={1.1} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.5, delay: 0.06, ease }}
            className="col-span-12 lg:col-span-7 lg:col-start-6"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
