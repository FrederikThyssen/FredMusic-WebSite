import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Accueil", to: "/" },
  { label: "Mariages", to: "/mariages" },
  { label: "Événements privés", to: "/evenements-prives" },
  { label: "Événements pro", to: "/evenements-pro" },
  { label: "Prestations", to: "/prestations" },
  { label: "Location", to: "/location" },
  { label: "Galerie", to: "/galerie" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night-950/92 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8" aria-label="Navigation principale">
        <NavLink to="/" className="text-xl font-light uppercase text-ivory" onClick={() => setIsOpen(false)}>
          FREDMUSIC
        </NavLink>

        <div className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `border-b py-2 text-xs font-semibold uppercase transition hover:border-gold-300 hover:text-gold-300 ${
                  isActive ? "border-gold-300 text-gold-300" : "border-transparent text-ivory/82"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            className="border border-gold-400 px-5 py-3 text-xs font-semibold uppercase text-gold-200 transition hover:border-gold-300 hover:bg-gold-300 hover:text-night-950"
          >
            Demander un devis
          </NavLink>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-white/15 text-ivory lg:hidden"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>

      {isOpen ? (
        <div id="mobile-menu" className="border-t border-white/10 bg-night-900 px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `border border-transparent px-3 py-3 text-sm font-semibold uppercase ${
                    isActive ? "border-gold-400 bg-white/5 text-gold-300" : "text-ivory/85"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
