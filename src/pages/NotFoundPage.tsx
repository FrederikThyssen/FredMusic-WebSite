import { NavLink } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[58vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold-300">404</p>
      <h1 className="mt-4 font-display text-4xl text-ivory sm:text-5xl">Page introuvable</h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-ivory/72">
        Cette page n'existe pas encore dans le POC Fredmusic.
      </p>
      <NavLink
        to="/"
        className="mt-8 inline-flex w-fit rounded-full bg-gold-400 px-5 py-3 font-semibold text-night-950 hover:bg-gold-300"
      >
        Retour à l'accueil
      </NavLink>
    </section>
  );
}
