import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "./SocialIcons";
import { site } from "../data/site";
import { SectionHeading } from "./SectionHeading";
import { ContactForm } from "./ContactForm";

const ease = [0.22, 1, 0.36, 1] as const;

export function Contact() {
  return (
    <section id="kapcsolat" className="surface-inverse scroll-mt-20 bg-bg py-24 text-fg sm:py-32">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="Kapcsolat"
          title="Elérhetőség"
        />

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Elérhetőségek */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-5"
          >
            <ul className="space-y-8">
              <li className="flex items-start gap-4">
                <Phone size={18} strokeWidth={1.1} className="mt-1 shrink-0 text-muted" />
                <div>
                  <p className="text-[0.6rem] font-light font-mono uppercase tracking-[0.28em] text-muted">
                    Telefon
                  </p>
                  <a
                    href={site.phoneHref}
                    className="mt-1.5 block text-lg font-light tracking-wide underline-offset-4 hover:underline"
                  >
                    {site.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <Mail size={18} strokeWidth={1.1} className="mt-1 shrink-0 text-muted" />
                <div>
                  <p className="text-[0.6rem] font-light font-mono uppercase tracking-[0.28em] text-muted">
                    E-mail
                  </p>
                  <a
                    href={site.emailHref}
                    className="mt-1.5 block break-all text-lg font-light tracking-wide underline-offset-4 hover:underline"
                  >
                    {site.email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <MapPin size={18} strokeWidth={1.1} className="mt-1 shrink-0 text-muted" />
                <div>
                  <p className="text-[0.6rem] font-light font-mono uppercase tracking-[0.28em] text-muted">
                    Helyszín
                  </p>
                  <p className="mt-1.5 text-lg font-light tracking-wide">{site.regionLong}</p>
                </div>
              </li>
            </ul>

            <div className="mt-12">
              <p className="text-[0.6rem] font-light font-mono uppercase tracking-[0.28em] text-muted">
                Közösségi oldalak
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 border border-line px-6 py-3.5 text-[0.65rem] font-light font-mono uppercase tracking-[0.2em] transition-colors duration-500 hover:border-fg hover:bg-fg hover:text-bg"
                >
                  <InstagramIcon size={16} strokeWidth={1.2} />
                  Instagram
                </a>
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 border border-line px-6 py-3.5 text-[0.65rem] font-light font-mono uppercase tracking-[0.2em] transition-colors duration-500 hover:border-fg hover:bg-fg hover:text-bg"
                >
                  <FacebookIcon size={16} strokeWidth={1.2} />
                  Facebook
                </a>
              </div>
            </div>
          </motion.div>

          {/* Űrlap */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.8, delay: 0.12, ease }}
            className="lg:col-span-7"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
