import { ButtonLink } from "../components/ui/Button";

export function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[58vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold-300">404</p>
      <h1 className="mt-4 font-display text-4xl text-ivory sm:text-5xl">Page introuvable</h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-ivory/72">
        Cette page n'existe pas ou a été déplacée.
      </p>
      <ButtonLink to="/" variant="primary" size="md" showArrow className="mt-8 w-fit">
        Retour à l'accueil
      </ButtonLink>
    </section>
  );
}
