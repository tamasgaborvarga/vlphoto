import { site } from "../../data/site";
import { heroImage, heroImageMobil, photoSrc } from "../../data/gallery";

/**
 * Nyitóblokk: NINCS teljes képernyős kép és nincs gomb — a lap tetején egy
 * túlméretezett bekezdés áll, alatta-fölötte fehér mező. Ez a rendszer
 * tézismondata: 40 px, 400-as vastagság, balra zárva, 720 px széles hasáb.
 *
 * A fotó csak utána jön, lekerekített keretben — a fehér lap első színes
 * megszakításaként.
 */
export function HeroB() {
  return (
    <section className="pt-28 sm:pt-48 lg:pt-64">
      <div className="wrap">
        <p className="max-w-[720px] text-subheading text-ink-black sm:text-heading">
          {site.brand} — {site.photographer} fotográfus {site.region}en. Portré, jegyes és páros,
          szezonális, valamint kreatív szabadtéri fotózás.
        </p>
      </div>

      <div className="wrap mt-16">
        {/* Mobilon ÁLLÓ, asztali gépen FEKVŐ nyitókép — mindkettő a saját
            arányával, vágás nélkül. */}
        <figure
          className="overflow-hidden rounded-xl bg-mist sm:hidden"
          style={{ aspectRatio: `${heroImageMobil.width} / ${heroImageMobil.height}` }}
        >
          <img
            src={photoSrc(heroImageMobil)}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
        </figure>

        <figure
          className="hidden overflow-hidden rounded-xl bg-mist sm:block"
          style={{ aspectRatio: `${heroImage.width} / ${heroImage.height}` }}
        >
          <img
            src={photoSrc(heroImage)}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
        </figure>
      </div>
    </section>
  );
}
