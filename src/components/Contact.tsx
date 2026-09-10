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
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-muted"
        >
          Kapcsolat
        </motion.h2>

        <div className="mt-10 grid grid-cols-12 gap-x-5 gap-y-14">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.9, ease }}
            className="col-span-12 lg:col-span-4"
          >
            <ul className="space-y-8">
              <li>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.28em] text-muted">
                  E-mail
                </p>
                <a
                  href={site.emailHref}
                  className="-my-2 mt-2 flex min-h-11 items-center break-all py-2 font-mono text-base font-light tracking-[0.02em] underline-offset-4 hover:underline sm:text-lg"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.28em] text-muted">
                  Telefon
                </p>
                <a
                  href={site.phoneHref}
                  className="-my-2 mt-2 flex min-h-11 items-center py-2 font-mono text-base font-light tracking-[0.02em] underline-offset-4 hover:underline sm:text-lg"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.28em] text-muted">
                  Helyszín
                </p>
                <p className="mt-2 font-mono text-base font-light tracking-[0.02em] sm:text-lg">{site.regionLong}</p>
              </li>
            </ul>

            <div className="mt-10 flex gap-6">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VL photo Instagram-oldala"
                className="-m-3 flex min-h-11 min-w-11 items-center justify-center text-muted transition-colors duration-500 hover:text-fg"
              >
                <InstagramIcon size={19} strokeWidth={1.1} />
              </a>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VL photo Facebook-oldala"
                className="-m-3 flex min-h-11 min-w-11 items-center justify-center text-muted transition-colors duration-500 hover:text-fg"
              >
                <FacebookIcon size={19} strokeWidth={1.1} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.9, delay: 0.12, ease }}
            className="col-span-12 lg:col-span-7 lg:col-start-6"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
