import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, ChevronRight } from "lucide-react";
import { services } from "../data/services";
import { Badge } from "../components/ui/Badge";
import { ButtonLink } from "../components/ui/Button";
import { CTASection } from "../components/sections/CTASection";
import { NotFoundPage } from "./NotFoundPage";

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);

  if (!service) return <NotFoundPage />;

  return (
    <div className="bg-night-950 text-ivory">
      <section className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(199,161,91,0.1),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl">
          <Link
            to="/prestations"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-ivory/48 hover:text-gold-300"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Toutes les prestations
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_420px] lg:items-start lg:gap-16">
            <div>
              <Badge>{service.category}</Badge>
              <h1 className="mt-5 font-display text-4xl leading-tight text-ivory sm:text-5xl xl:text-6xl">
                {service.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-ivory/72">{service.longDescription}</p>

              {service.benefits.length > 0 ? (
                <ul className="mt-10 grid gap-3" aria-label="Points forts">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-ivory/82">
                      <Check className="mt-0.5 h-5 w-5 flex-none text-gold-300" aria-hidden="true" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              ) : null}

              {service.recommendedFor.length > 0 ? (
                <div className="mt-10">
                  <p className="text-xs font-semibold uppercase tracking-widest text-ivory/48">Recommandé pour</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {service.recommendedFor.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-sm text-ivory/72"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-10 flex flex-wrap gap-4">
                <ButtonLink to="/contact" variant="primary" size="lg" showArrow>
                  Demander un devis
                </ButtonLink>
                <ButtonLink to="/prestations" variant="secondary" size="lg">
                  Voir toutes les prestations
                </ButtonLink>
              </div>
            </div>

            <div className="overflow-hidden rounded-md">
              <img
                src={service.image}
                alt={service.title}
                className="w-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-300">Combiner avec</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {services
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <Link
                  key={s.slug}
                  to={`/prestations/${s.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-ivory/72 transition hover:border-gold-300/40 hover:text-ivory"
                >
                  {s.title}
                  <ChevronRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Prêt à créer votre événement ?"
        description="Contactez Fredmusic pour un devis personnalisé adapté à votre projet."
        primaryLabel="Demander un devis"
        primaryTo="/contact"
        secondaryLabel="Voir toutes les prestations"
        secondaryTo="/prestations"
      />
    </div>
  );
}
