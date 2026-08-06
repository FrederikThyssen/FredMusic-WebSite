import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { SeoManager } from "../components/seo/SeoManager";

const AdminPage = lazy(() => import("../pages/AdminPage").then((m) => ({ default: m.AdminPage })));
const ContactPage = lazy(() => import("../pages/ContactPage").then((m) => ({ default: m.ContactPage })));
const EquipmentDetailPage = lazy(() => import("../pages/EquipmentDetailPage").then((m) => ({ default: m.EquipmentDetailPage })));
const EventsPage = lazy(() => import("../pages/EventsPage").then((m) => ({ default: m.EventsPage })));
const GalleryPage = lazy(() => import("../pages/GalleryPage").then((m) => ({ default: m.GalleryPage })));
const HomePage = lazy(() => import("../pages/HomePage").then((m) => ({ default: m.HomePage })));
const LegalPage = lazy(() => import("../pages/LegalPage").then((m) => ({ default: m.LegalPage })));
const MusicRequestPage = lazy(() => import("../pages/MusicRequestPage").then((m) => ({ default: m.MusicRequestPage })));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));
const ProfessionalEventsPage = lazy(() => import("../pages/ProfessionalEventsPage").then((m) => ({ default: m.ProfessionalEventsPage })));
const RentalPage = lazy(() => import("../pages/RentalPage").then((m) => ({ default: m.RentalPage })));
const ServiceDetailPage = lazy(() => import("../pages/ServiceDetailPage").then((m) => ({ default: m.ServiceDetailPage })));
const ServicesPage = lazy(() => import("../pages/ServicesPage").then((m) => ({ default: m.ServicesPage })));
const WeddingPage = lazy(() => import("../pages/WeddingPage").then((m) => ({ default: m.WeddingPage })));
const EventDetailPage = lazy(() => import("../pages/EventDetailPage").then((m) => ({ default: m.EventDetailPage })));

function PageLoader() {
  return (
    <div className="grid min-h-[60vh] place-items-center bg-night-950">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold-300/30 border-t-gold-300" />
    </div>
  );
}

export function AppRouter() {
  return (
    <>
      <SeoManager />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Suspense fallback={<PageLoader />}><HomePage /></Suspense>} />
          <Route path="mariages" element={<Suspense fallback={<PageLoader />}><WeddingPage /></Suspense>} />
          <Route path="evenements" element={<Suspense fallback={<PageLoader />}><EventsPage /></Suspense>} />
          <Route path="evenements-prives" element={<Suspense fallback={<PageLoader />}><EventsPage /></Suspense>} />
          <Route path="evenements-pro" element={<Suspense fallback={<PageLoader />}><ProfessionalEventsPage /></Suspense>} />
          <Route path="prestations" element={<Suspense fallback={<PageLoader />}><ServicesPage /></Suspense>} />
          <Route path="prestations/:slug" element={<Suspense fallback={<PageLoader />}><ServiceDetailPage /></Suspense>} />
          <Route path="location" element={<Suspense fallback={<PageLoader />}><RentalPage /></Suspense>} />
          <Route path="location/:slug" element={<Suspense fallback={<PageLoader />}><EquipmentDetailPage /></Suspense>} />
          <Route path="galerie" element={<Suspense fallback={<PageLoader />}><GalleryPage /></Suspense>} />
          <Route path="evenements/:slug" element={<Suspense fallback={<PageLoader />}><EventDetailPage /></Suspense>} />
          <Route path="demande-musique" element={<Suspense fallback={<PageLoader />}><MusicRequestPage /></Suspense>} />
          <Route path="contact" element={<Suspense fallback={<PageLoader />}><ContactPage /></Suspense>} />
          <Route path="mentions-legales" element={<Suspense fallback={<PageLoader />}><LegalPage title="Mentions légales" /></Suspense>} />
          <Route path="confidentialite" element={<Suspense fallback={<PageLoader />}><LegalPage title="Politique de confidentialité" /></Suspense>} />
          <Route path="conditions-utilisation" element={<Suspense fallback={<PageLoader />}><LegalPage title="Conditions d'utilisation" /></Suspense>} />
          <Route path="admin" element={<Suspense fallback={<PageLoader />}><ProtectedRoute><AdminPage /></ProtectedRoute></Suspense>} />
          <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense>} />
        </Route>
      </Routes>
    </>
  );
}
