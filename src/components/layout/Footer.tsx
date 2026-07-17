import { NavLink } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-night-900">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <NavLink to="/" className="inline-flex items-center" aria-label="Fredmusic - Accueil">
            <img src="/images/conception/logo-du-site.webp" alt="Fredmusic" className="h-16 w-auto object-contain" />
          </NavLink>
          <p className="mt-3 max-w-sm text-sm leading-6 text-ivory/70">
            DJ mariage et événementiel premium, sonorisation, mise en lumière et location de matériel.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase text-gold-300">Navigation</h2>
          <div className="mt-4 grid gap-2 text-sm text-ivory/70">
            <NavLink to="/prestations" className="hover:text-gold-300">Prestations</NavLink>
            <NavLink to="/location" className="hover:text-gold-300">Location</NavLink>
            <NavLink to="/galerie" className="hover:text-gold-300">Galerie</NavLink>
            <NavLink to="/contact" className="hover:text-gold-300">Contact</NavLink>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase text-gold-300">Informations</h2>
          <div className="mt-4 grid gap-2 text-sm text-ivory/70">
            <NavLink to="/mentions-legales" className="hover:text-gold-300">Mentions légales</NavLink>
            <NavLink to="/confidentialite" className="hover:text-gold-300">Confidentialité</NavLink>
            <NavLink to="/conditions-utilisation" className="hover:text-gold-300">Conditions d'utilisation</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
