# AUDIT.md — FredMusic Production Delivery

Dernière mise à jour : 2026-08-18, audit pré-livraison complet après relecture docs/projet/conception et vérifications locales.

---

## Verdict pré-livraison

**Statut actuel : presque prêt techniquement, non livrable client tant que domaine/email, DSN Sentry production et QA visuelle ne sont pas finalisés.**

Le site a une base fonctionnelle solide : React/Vite, pages vitrines avancées, Supabase branché, admin protégé par Auth, SEO/accessibilité déjà travaillés, build production validé. En revanche, les vérifications pré-livraison ont trouvé des bloquants qualité/sécurité qui doivent être corrigés avant bascule client :

- `npm run build` : ✅ passe après corrections.
- `npm run lint` : ✅ passe après corrections.
- `npm test` : ✅ 8 fichiers, 19 tests passants.
- `npm audit --audit-level=moderate` : ✅ 0 vulnérabilité après correction `nanoid`.
- CI/CD : ✅ workflow GitHub Actions ajouté (`lint`, tests, build, responsive smoke, audit bloquant).
- Formulaires publics : ✅ validation serveur, honeypot et rate limit via Edge Function.
- Supabase RLS : ✅ lecture admin protégée, formulaires publics derrière Edge Function.
- Textes visibles/légaux : ✅ références obsolètes retirées.
- Galerie : ✅ catégorie vide retirée, chemins d'images référencés vérifiés.
- Monitoring : ✅ Sentry optionnel branché côté code, DSN production à configurer.
- Responsive mobile : ✅ smoke Playwright étendu, QA visuelle finale client/admin authentifié encore à faire.
- Déploiement/DNS/email domaine : ❌ non finalisés, transfert Gandi vers OVH à confirmer avant validation Resend/DNS.

---

## Contexte produit confirmé par les docs

Sources relues :

- `docs/backend-plan.md`
- `docs/seo-launch-checklist.md`
- `conception/prompt_final_fredmusic.md`
- fichiers de conception listés dans `conception/`

Décisions produit à respecter :

- Site vitrine premium, sobre, sombre/doré/ivoire, lisible mobile.
- Ne pas transformer le projet en CMS lourd.
- Admin simple et limité : demandes de devis, demandes musique, statuts, soirée QR active.
- Galerie et contenus éditables peuvent rester une évolution post-livraison, sauf corrections nécessaires.
- Sortie de Wix prévue, domaine `fredmusic.fr` en transfert Gandi vers OVH.
- Frontend statique Vite, backend léger Supabase, email transactionnel Brevo/Resend à ajouter.
- `/demande-musique` doit être prioritaire mobile car utilisée par les invités via QR code.

---

## Corrections appliquées — session en cours

- `npm audit fix` exécuté : vulnérabilités `brace-expansion`, `js-yaml`, `postcss`, `vite` corrigées via mises à jour du lock.
- `npm audit fix` réexécuté le 2026-08-18 : vulnérabilité `nanoid <3.3.18` corrigée.
- `npm audit --audit-level=moderate` validé : 0 vulnérabilité.
- React Router remis sur la dernière version npm disponible (`7.18.2`) après test d'un downgrade `7.11.0` qui aggravait le rapport d'audit.
- `npm run lint` corrigé et validé.
- `npm run build` validé après corrections.
- Suppression des clés Supabase publishable hardcodées dans les scripts E2E.
- Correction des textes publics/légaux obsolètes.
- Ajout de validations longueur/cohérence sur Contact, Demande musique et EventDetail.
- Ajout d'un honeypot simple sur les formulaires publics Contact, Demande musique et EventDetail.
- Ajout du `role="alert"` manquant sur les erreurs `Textarea`.
- Renommage des fichiers de données en noms métier (`services.ts`, `events.ts`, `equipment.ts`, `gallery.ts`, `seo.ts`, `testimonials.ts`).
- Suppression du store global persistant, des types transactionnels inutilisés et de la dépendance `zustand`.
- Suppression d'un fichier contact de démonstration non utilisé.
- Ajout de `supabase/migrations/002_hardening.sql` :
  - contraintes SQL de longueur/cohérence;
  - index unique partiel pour garantir une seule soirée active;
  - fonction RPC `activate_event()` pour activation atomique.
- Ajout de `supabase/migrations/003_form_security.sql` :
  - table privée `form_rate_limits`;
  - RLS activée sans policy publique.
- Ajout de `supabase/functions/submit-form` :
  - validation serveur des demandes de devis et musique;
  - rate limit par IP;
  - honeypot serveur;
  - insertion avec clé secrète Supabase côté serveur uniquement.
- Ajout de `supabase/config.toml` avec `verify_jwt = false` pour permettre l'appel public contrôlé de `submit-form`.
- Les formulaires publics passent maintenant par l'Edge Function au lieu d'insérer directement dans Supabase depuis le navigateur.
- `submit-form` redéployée après configuration `verify_jwt = false`.
- Test curl demande musique : ✅ HTTP 200, insertion confirmée en base.
- Test curl demande devis : ✅ HTTP 200, insertion confirmée en base.
- Test rate limit musique : ✅ réponses 429 après dépassement.
- Données de test nettoyées dans `music_requests` et `quote_requests`.
- Envoi email devis ajouté via Resend dans `submit-form`.
- Secret `RESEND_API_KEY` configuré dans Supabase Functions.
- Test email Resend : ✅ HTTP 200 et email reçu sur l'adresse autorisée Resend.
- Limite actuelle Resend : en mode test, l'envoi vers `djfredmusic@outlook.fr` est refusé tant que le domaine `fredmusic.fr` n'est pas validé.
- Tests Vitest + React Testing Library ajoutés :
  - formulaires Contact et Demande musique;
  - `ErrorBoundary` et remontée monitoring;
  - accès admin `ProtectedRoute`;
  - actions admin critiques;
  - filtres de statut admin;
  - helpers `slugify`, `formatDate`, SEO.
- `npm test` validé : 8 fichiers, 19 tests passants.
- Monitoring Sentry optionnel ajouté :
  - initialisation via `VITE_SENTRY_DSN`;
  - environnement via `VITE_APP_ENV`;
  - release via `VITE_APP_VERSION`;
  - `ErrorBoundary` branché à `reportError`;
  - source maps publiques toujours désactivées en build production.
- Smoke responsive Playwright étendu à `/admin` non connecté.
- Nettoyage galerie :
  - retrait de la catégorie vidéo vide;
  - fusion de la catégorie mariage dans la section unique "Nos différents événements réalisés";
  - ajout de "Mariage" dans la liste des types d'événements réalisés;
  - renommage des 65 photos affichées en `galerie-evenement-001` à `galerie-evenement-065`;
  - vérification automatique : toutes les images référencées dans `src` existent dans `public`.
- `activateEvent()` utilise maintenant la RPC au lieu de deux updates client.
- L'admin affiche désormais une erreur si une action Supabase échoue.
- Recherche qualité effectuée : aucune occurrence restante de termes de démonstration ou d'ancien stockage navigateur dans le code applicatif et la documentation. Les seules occurrences `vi.mock` restantes sont dans les tests automatisés.

État sécurité dépendances :

- `npm audit --audit-level=moderate` : ✅ 0 vulnérabilité au 2026-08-18.
- CI lance désormais `npm audit --audit-level=moderate` en contrôle bloquant.

---

## Plan de correction avant livraison

### P0 — Bloquants sécurité/qualité

1. **Corriger les vulnérabilités dépendances**
   - ✅ `npm audit fix` exécuté.
   - ✅ Vulnérabilité `nanoid <3.3.18` corrigée le 2026-08-18.
   - ✅ `npm audit --audit-level=moderate` : 0 vulnérabilité.
   - ✅ `npm run build` revalidé.

2. **Corriger le lint**
   - ✅ `npm run lint` vert.

3. **Retirer les clés Supabase hardcodées des scripts**
   - ✅ Scripts E2E passés sur variables d'environnement.
   - Ne jamais ajouter de `service_role` côté front ou scripts commités.

4. **Durcir les formulaires publics**
   - ✅ Validation longueur/cohérence ajoutée côté client et migration DB ajoutée.
   - ✅ Supabase Edge Function avec rate limit ajoutée.
   - ✅ Champ honeypot discret ajouté.
   - Refuser les messages trop longs et valeurs incohérentes.
   - Prévoir journalisation minimale des erreurs sans exposer les détails au visiteur.

5. **Durcir Supabase/RLS**
   - ✅ Contraintes SQL ajoutées dans `002_hardening.sql`.
   - ✅ Index unique partiel ajouté pour une seule soirée active.
   - ✅ `activateEvent()` remplacé par RPC transactionnelle.
   - ✅ Edge Function ajoutée pour éviter les inserts publics directs depuis le navigateur.
   - ✅ `002_hardening.sql` exécuté dans Supabase.
   - ✅ `003_form_security.sql` exécuté dans Supabase.
   - ✅ `supabase/functions/submit-form` déployée.
   - ✅ La fonction lit `SUPABASE_SECRET_KEYS` fourni automatiquement par Supabase.

### P1 — Fonctionnel client et conformité

6. **Corriger les textes visibles obsolètes**
   - ✅ `ContactPage` : message de confirmation aligné sur l'admin réel.
   - ✅ `LegalPage` : politique de confidentialité alignée sur l'admin réel.
   - ✅ `docs/seo-launch-checklist.md` remis à jour.

7. **Améliorer l'admin**
   - ✅ Afficher les erreurs Supabase lors de création/activation/archivage/statut.
   - ✅ Ajouter états loading par action pour éviter doubles clics.
   - ✅ Ajouter confirmation avant archivage soirée.
   - ✅ Ajouter filtre statut si conforme au plan backend.
   - ✅ Ne pas afficher une action comme réussie si Supabase a échoué.

8. **Ajouter notifications email devis**
   - ✅ Provider Resend branché dans `submit-form`.
   - ✅ Secret `RESEND_API_KEY` configuré dans Supabase.
   - ✅ `submit-form` redéployée après ajout Resend.
   - ✅ Demande de devis testée et email reçu sur l'adresse autorisée Resend.
   - À faire : remplacer l'expéditeur temporaire par `contact@fredmusic.fr` après validation DNS du domaine.

9. **Nettoyer le store global**
   - ✅ Home/Wedding utilisent maintenant des imports de données statiques directs.
   - ✅ Store persistant supprimé.
   - ✅ Dépendance `zustand` supprimée.
   - ✅ Chunk `state` retiré de `vite.config.ts`.

### P2 — Tests, CI, monitoring

10. **Ajouter tests automatisés**
    - ✅ Vitest + React Testing Library installés.
    - ✅ Script `npm test` ajouté.
    - ✅ Tests validation formulaire Contact.
    - ✅ Tests validation Demande musique.
    - ✅ Tests `ProtectedRoute` non connecté/connecté, erreur de login et login réussi.
    - ✅ Tests admin confirmation archivage et anti double-clic création soirée.
    - ✅ Tests filtres de statut admin devis/musiques.
    - ✅ Tests helpers SEO/date/slug.
    - ✅ Smoke tests routes publiques principales et écran `/admin` non connecté via Playwright.

11. **Ajouter CI GitHub Actions**
    - ✅ Workflow `.github/workflows/quality.yml` ajouté sur PR vers `main` et push `main`.
    - ✅ Contrôles bloquants :
      - `npm ci`;
      - `npm run lint`;
      - `npm test`;
      - `npm run build`;
      - `npm run test:e2e`;
    - ✅ Audit dépendances bloquant :
      - `npm audit --audit-level=moderate`.
    - Bloquer livraison si lint, tests, build ou audit dépendances sont rouges.

12. **Ajouter monitoring**
    - ✅ Sentry ajouté via `@sentry/react`.
    - ✅ Initialisation optionnelle via `VITE_SENTRY_DSN`.
    - ✅ `ErrorBoundary` branché à `captureException` via `reportError`.
    - ✅ Source maps désactivées en prod pour le public (`build.sourcemap: false`).
    - À faire déploiement : créer le projet Sentry et configurer `VITE_SENTRY_DSN`, `VITE_APP_ENV`, `VITE_APP_VERSION` dans l'hébergeur.

### P3 — Livraison, SEO, déploiement

13. **Valider responsive/accessibilité visuellement**
    - ✅ Smoke responsive automatisé ajouté avec Playwright :
      - mobile 360 px;
      - mobile 390 px;
      - tablette 768 px;
      - desktop 1440 px.
    - ✅ Routes critiques couvertes : `/`, `/contact`, `/demande-musique`, `/galerie`, `/evenements-prives`, `/evenements-professionnels`, `/location-materiel`, `/admin` non connecté.
    - ✅ Vérifications automatisées : pas de débordement horizontal, pas d'erreur console, screenshots attachés au rapport Playwright.
    - ✅ Validation locale 2026-08-18 : `npm run test:e2e`, 32 tests passants.
    - À faire manuellement : validation visuelle authentifiée de `/admin`, clavier, focus et parcours admin réels.

14. **Optimiser médias et galerie**
    - ✅ Catégorie vidéo vide retirée de `GalleryPage`.
    - ✅ Catégorie mariage fusionnée dans "Nos différents événements réalisés".
    - ✅ Photos de galerie renommées proprement en ordre croissant.
    - ✅ Chemins d'images galerie corrigés.
    - ✅ Vérification locale : aucune image référencée manquante.
    - `public/images` pèse environ 104M et nécessite un tri final avec le client avant suppression.
    - Trier les photos avec le client.
    - Supprimer du build les assets non utilisés.
    - Vérifier WebP/lazy loading/Lighthouse.
    - Ajouter une section vidéo uniquement quand les fichiers vidéo sont validés.

15. **Finaliser SEO/migration Wix**
    - Récupérer URL Wix actuelle.
    - Lister anciennes pages indexées.
    - Préparer redirections.
    - Tester partage social.
    - Valider sitemap/robots/canonicals après domaine final.

16. **Finaliser OVH/Vercel/DNS/email**
    - Confirmer hébergement final : Vercel ou hébergeur client compatible statique React.
    - Configurer redirection SPA vers `index.html`.
    - Configurer SSL.
    - Attendre le code de transfert Gandi puis finaliser le transfert vers OVH.
    - Créer/configurer `contact@fredmusic.fr`.
    - Valider le domaine `fredmusic.fr` dans Resend.
    - Mettre à jour les secrets Supabase Functions :
      - `QUOTE_NOTIFICATION_EMAIL=contact@fredmusic.fr` ou adresse finale choisie;
      - `QUOTE_EMAIL_FROM=FredMusic <contact@fredmusic.fr>`.
    - Configurer MX/SPF/DKIM/DMARC.
    - Ajouter variables d'environnement de production.
    - Faire déploiement de préproduction puis validation client.

---

## Phases de livraison

| Phase | Statut | Description |
|-------|--------|-------------|
| **Phase 1** | ✅ Terminé | Bugs critiques (ErrorBoundary, robots.txt, isSubmitting guards) |
| **Phase 2** | ✅ Terminé | Sécurité (ProtectedRoute, validation formulaires, role="alert") |
| **Phase 3** | ✅ Terminé | Pages manquantes (ServiceDetail, EquipmentDetail, EventDetail, skip-link, scroll-lock) |
| **Phase 4** | ✅ Terminé | Performance (React.lazy, vite.config manualChunks, font preconnect, @/ alias) |
| **Phase 5** | ✅ Terminé | Nettoyage code (formatDate utils, Modal supprimé, Card variant, NotFoundPage, Button 44px) |
| **Phase 6** | ✅ Terminé | Backend Supabase (client, types, migrations SQL, API, ContactPage, MusicRequestPage, EventDetailPage, AdminPage, ProtectedRoute → Auth, déconnexion admin) |
| **Phase 7** | ✅ Terminé | SEO (JSON-LD Organization/LocalBusiness/Event/Service/Product, sitemap complet, Open Graph dynamique, règles noindex) |
| **Phase 8** | ✅ Terminé | Accessibilité (contraste texte/bouton corrigé, alt textes descriptifs, état actif exposé, fermeture clavier menu mobile) |
| **Phase 9** | ⚠️ Partiel | Tests ajoutés et passants ; Sentry branché côté code, DSN production/GA4 à configurer |
| **Phase 10** | ✅ Terminé | CI/CD GitHub Actions build + lint + test + responsive smoke |
| **Phase 11** | ❌ À faire | Déploiement & DNS (Vercel + Gandi, migration depuis Wix) |

---

## Phase 6 — Supabase Backend (TERMINÉ)

### Fichiers créés
- `src/lib/supabase.ts` — Client singleton, lit `VITE_SUPABASE_URL` et `VITE_SUPABASE_PUBLISHABLE_KEY`
- `src/lib/database.types.ts` — Types TypeScript pour toutes les tables (avec `Relationships: []` pour compatibilité supabase-js v2)
- `src/lib/api.ts` — Toutes les fonctions Supabase centralisées
- `supabase/migrations/001_initial.sql` — Migration SQL à exécuter manuellement
- `.env.local` — Variables d'environnement réelles (gitignored)
- `.env.example` — Template pour l'équipe

### Fichiers migrés
- `src/pages/ContactPage.tsx` → Supabase (`insertQuoteRequest`)
- `src/pages/MusicRequestPage.tsx` → Supabase (`fetchActiveEvent`, `insertMusicRequest`), suppression section "Dernières demandes" (vie privée)
- `src/pages/EventDetailPage.tsx` → Supabase (`insertMusicRequest`, `fetchActiveEvent`, gestion erreur serveur)
- `src/pages/AdminPage.tsx` → Full Supabase (lectures temps réel, gestion statuts, gestion soirées QR)
- `src/components/ProtectedRoute.tsx` → Supabase Auth (`signInWithPassword`, `getSession`)
- `src/pages/AdminPage.tsx` → Déconnexion Supabase (`signOut`)

### Actions client terminées

- Migration SQL exécutée dans Supabase Dashboard
- Compte admin créé dans Supabase Authentication
- Les formulaires peuvent maintenant être testés sur la base réelle

---

## Tables Supabase

| Table | Rôle | RLS |
|-------|------|-----|
| `quote_requests` | Demandes de devis reçues depuis ContactPage | anon INSERT, auth SELECT/UPDATE |
| `music_requests` | Demandes playlist des invités | anon INSERT, auth SELECT/UPDATE |
| `active_events` | Soirées QR code, une seule active garantie par index unique partiel | anon SELECT si is_active=true, auth full |
| `settings` | Config globale (gallery_cloud_url, google_place_id) | public read, auth write |

---

## Phase 7 — SEO (TERMINÉ)

### Implémenté
- `SeoManager` résout maintenant le SEO des routes dynamiques : prestations, matériel, événements publics
- JSON-LD injecté côté client pour `Organization`, `LocalBusiness`, `WebSite`, `Service`, `Product`, `Event`, `BreadcrumbList`
- Canonicals dynamiques alignés sur les vraies URLs publiques
- Open Graph et Twitter cards cohérents sur toutes les pages utiles
- `noindex, nofollow` ajouté sur `/admin`, `/demande-musique` et la page 404
- `/evenements` conservée pour compatibilité mais canonicalisée vers `/evenements-prives`
- `public/sitemap.xml` complété avec les pages statiques et les routes dynamiques indexables

### Points de contrôle
- Build validé après migration SEO
- Les pages métier non destinées au référencement ne sont plus dans le sitemap

---

## Phase 8 — Accessibilité (TERMINÉ)

### Problèmes trouvés et corrigés
- **Contraste texte insuffisant (WCAG 1.4.3)** : les libellés "eyebrow" (`text-gold-400`/`text-gold-300`) sur fond clair (thème mariage, `bg-warm-50/100`, blanc) ne passaient pas 4.5:1 (~2:1 mesuré). Ajout de `gold-700` (`#8A5A00`, contraste ≥5.4:1) dans `tailwind.config.ts` et remplacement dans `HeroSection`, `SectionHeader`, `CTASection`, `PageShell`, `WeddingPage`, `HomePage`
- **Bouton primaire illisible au survol** : `Button` variant `primary` (hover) et `weddingPrimary` affichaient du texte blanc sur fond `gold-500` (contraste ~2.8:1, échec AA). Texte repassé en `text-night-950`
- **Alt texte non descriptif (WCAG 1.1.1)** : `EquipmentCard`, `EventCard`, `ServiceCard` utilisaient `alt=""` sur des photos porteuses de sens (matériel, événement, prestation). Remplacé par un alt descriptif basé sur les données (nom, titre)
- **État actif non exposé aux lecteurs d'écran** : les boutons de filtre catégories dans `GalleryPage` n'avaient pas d'`aria-pressed`. Ajouté
- **Menu mobile non fermable au clavier** : `Navbar` n'écoutait pas la touche Échap. Ajout d'un `useEffect` qui ferme le menu sur `Escape`

### Points déjà conformes (vérifiés, non modifiés)
- Skip link, focus visible global (`:focus-visible`), `role="alert"` sur erreurs de formulaire, labels de formulaire correctement associés, hiérarchie de titres (un seul `h1` par page), icônes décoratives en `aria-hidden`, note de notation témoignages avec `aria-label`

### Points de contrôle
- Build validé après les correctifs d'accessibilité

---

## Problèmes connus / à surveiller

- **GalleryPage** : utilise ses propres tableaux de données statiques. La galerie est nettoyée côté affichage, mais le tri/suppression physique des assets doit être validé avec le client avant retrait de fichiers.
- **Email notifications** : Resend fonctionne, mais l'adresse de production `contact@fredmusic.fr` attend le transfert OVH puis validation DNS Resend.
- **Google Reviews** : Google Place ID `ChIJiwj_iiFL3UcR67d2OOiMcAk` en base, sync automatique via Edge Function à planifier
- **Store global** : supprimé. Les contenus vitrine sont importés directement depuis `src/data`, les données transactionnelles passent par Supabase

---

## Stack technique

| Outil | Version | Usage |
|-------|---------|-------|
| React | 19 | UI |
| Vite | 6 | Build |
| TypeScript | 5 strict | Types |
| Tailwind CSS | 3.4 | Style |
| React Router | 7 | Routing SPA |
| @supabase/supabase-js | 2.x | Backend |

## Environnement

- **Supabase URL** : `https://awcdoolsmoipylvfpcuq.supabase.co`
- **Google Place ID** : `ChIJiwj_iiFL3UcR67d2OOiMcAk`
- **Domain cible** : `fredmusic.fr` (transfert Gandi vers OVH à confirmer)
- **Contact** : `contact@fredmusic.fr` (à créer après transfert/validation DNS)
- **Hébergement cible** : Vercel
