import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { AdminPage } from "../pages/AdminPage";
import { ContactPage } from "../pages/ContactPage";
import { EquipmentDetailPage } from "../pages/EquipmentDetailPage";
import { EventDetailPage } from "../pages/EventDetailPage";
import { EventsPage } from "../pages/EventsPage";
import { GalleryPage } from "../pages/GalleryPage";
import { HomePage } from "../pages/HomePage";
import { LegalPage } from "../pages/LegalPage";
import { MusicRequestPage } from "../pages/MusicRequestPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { RentalPage } from "../pages/RentalPage";
import { ServiceDetailPage } from "../pages/ServiceDetailPage";
import { ServicesPage } from "../pages/ServicesPage";
import { WeddingPage } from "../pages/WeddingPage";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="mariages" element={<WeddingPage />} />
        <Route path="evenements" element={<EventsPage />} />
        <Route path="evenements/:slug" element={<EventDetailPage />} />
        <Route path="prestations" element={<ServicesPage />} />
        <Route path="prestations/:slug" element={<ServiceDetailPage />} />
        <Route path="location" element={<RentalPage />} />
        <Route path="location/:slug" element={<EquipmentDetailPage />} />
        <Route path="galerie" element={<GalleryPage />} />
        <Route path="demande-musique" element={<MusicRequestPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="mentions-legales" element={<LegalPage title="Mentions légales" />} />
        <Route path="confidentialite" element={<LegalPage title="Politique de confidentialité" />} />
        <Route path="conditions-utilisation" element={<LegalPage title="Conditions d'utilisation" />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
