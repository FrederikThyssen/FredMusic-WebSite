import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, Package, User, Wrench } from "lucide-react";
import { equipment } from "../data/equipment";
import { Badge } from "../components/ui/Badge";
import { ButtonLink } from "../components/ui/Button";
import { CTASection } from "../components/sections/CTASection";
import { NotFoundPage } from "./NotFoundPage";

const categoryLabels: Record<string, string> = {
  dj: "Régie DJ",
  sound: "Sonorisation",
  microphone: "Micros",
  lighting: "Lumière",
  effects: "Effets",
  mixing: "Mixage",
};

export function EquipmentDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const item = equipment.find((e) => e.slug === slug);

  if (!item) return <NotFoundPage />;

  const complementary = item.complementaryEquipmentSlugs
    .map((s) => equipment.find((e) => e.slug === s))
    .filter(Boolean);

  return (
    <div className="bg-night-950 text-ivory">
      <section className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(214,177,73,0.1),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl">
          <Link
            to="/location"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-ivory/48 hover:text-gold-300"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Tout le matériel
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_480px] lg:items-start lg:gap-16">
            <div>
              <Badge variant="gold">{item.brand}</Badge>
              <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-ivory/48">
                {categoryLabels[item.category] ?? item.category}
              </p>
              <h1 className="mt-3 font-display text-4xl leading-tight text-ivory sm:text-5xl xl:text-6xl">
                {item.name}
              </h1>
              <p className="mt-6 text-lg leading-8 text-ivory/72">{item.longDescription}</p>

              {item.capacity ? (
                <p className="mt-4 text-sm text-gold-300">{item.capacity}</p>
              ) : null}

              {item.keyFeatures.length > 0 ? (
                <ul className="mt-8 grid gap-3" aria-label="Caractéristiques clés">
                  {item.keyFeatures.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-ivory/82">
                      <Check className="mt-0.5 h-5 w-5 flex-none text-gold-300" aria-hidden="true" />
                      {feat}
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3">
                {item.availableForRental ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-gold-300/30 bg-gold-300/[0.08] px-3 py-1.5 text-xs font-semibold text-gold-200">
                    <Package className="h-3.5 w-3.5" aria-hidden="true" />
                    Location disponible
                  </span>
                ) : null}
                {item.availableWithTechnician ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-ivory/72">
                    <User className="h-3.5 w-3.5" aria-hidden="true" />
                    Avec technicien
                  </span>
                ) : null}
                {item.installationAvailable ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-ivory/72">
                    <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
                    Installation incluse
                  </span>
                ) : null}
              </div>

              {item.recommendedFor.length > 0 ? (
                <div className="mt-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-ivory/48">Recommandé pour</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {item.recommendedFor.map((r) => (
                      <li
                        key={r}
                        className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-sm text-ivory/72"
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-10 flex flex-wrap gap-4">
                <ButtonLink to="/contact" variant="primary" size="lg" showArrow>
                  Demander un devis
                </ButtonLink>
                <ButtonLink to="/location" variant="secondary" size="lg">
                  Voir tout le matériel
                </ButtonLink>
              </div>
            </div>

            <div className="overflow-hidden rounded-md">
              <img
                src={item.marketingImage}
                alt={`${item.brand} ${item.name}`}
                className="w-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {complementary.length > 0 ? (
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-300">À combiner avec</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {complementary.map((c) =>
                c ? (
                  <Link
                    key={c.slug}
                    to={`/location/${c.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-ivory/72 transition hover:border-gold-300/40 hover:text-ivory"
                  >
                    {c.brand} {c.name}
                  </Link>
                ) : null
              )}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection
        title="Un projet ? Parlons-en."
        description="Fredmusic vous conseille sur le matériel adapté à votre événement et vous propose un devis sur mesure."
        primaryLabel="Demander un devis"
        primaryTo="/contact"
        secondaryLabel="Voir tout le matériel"
        secondaryTo="/location"
      />
    </div>
  );
}
