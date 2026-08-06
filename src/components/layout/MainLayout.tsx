import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function MainLayout() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-night-950 text-ivory">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:border focus:border-gold-300 focus:bg-night-950 focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:uppercase focus:text-gold-300"
      >
        Aller au contenu principal
      </a>
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
