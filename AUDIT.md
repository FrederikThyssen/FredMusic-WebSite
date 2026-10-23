# AUDIT.md — FredMusic Production Delivery

Dernière mise à jour : 2026-08-27, audit pré-production complet avec Supabase production vérifié, Vercel production déployé et routes critiques validées.

---

## Verdict pré-livraison

**Statut actuel : production Vercel déployée et vérifiée. La bascule publique du domaine `fredmusic.fr` attend le rattachement du domaine dans Vercel, les réglages DNS OVH et la finalisation email/Resend.**

Le site a une base fonctionnelle solide : React/Vite, pages vitrines avancées, Supabase branché, admin protégé par Auth, SEO/accessibilité travaillés, build production validé, et configuration Vercel ajoutée. Les derniers points bloquants sont maintenant des actions externes de production :

- `npm install` : ✅ OK, 0 vulnérabilité.
- `npm run build` : ✅ OK.
- `npm run lint` : ✅ OK.
- `npm run test` : ✅ 9 fichiers, 20 tests passants.
- `npm run test:e2e` : ✅ 32 tests responsive passants.
- `npm audit --audit-level=low` : ✅ 0 vulnérabilité au 2026-08-27.
- CI/CD : ✅ workflow GitHub Actions ajouté (`lint`, tests, build, responsive smoke, audit bloquant).
- Formulaires publics : ✅ validation serveur, honeypot et rate limit via Edge Function.
- Supabase RLS : ✅ durcissement repo ajouté, migrations 004/005 appliquées en production, admin allowlisté.
- Textes visibles/légaux : ✅ références obsolètes retirées.
- Galerie : ✅ catégorie vide retirée, chemins d'images référencés vérifiés.
- Monitoring : ✅ Sentry optionnel branché côté code, DSN production à configurer.
- Responsive mobile : ✅ smoke Playwright étendu, QA visuelle admin authentifié validée localement par l'utilisateur.
- Déploiement : ✅ projet Vercel connecté, variables détectées, production Vercel prête et routes critiques en 200.
- DNS/email domaine : ⚠️ DNS public déjà sur OVH, emails OVH à conserver, DMARC/DKIM à compléter si nécessaire.

Verdict opérationnel au 2026-08-27 : **PRODUCTION DEPLOYED ON VERCEL**. La bascule publique attend le domaine final `fredmusic.fr` dans Vercel et la configuration DNS OVH.

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
- Sortie de Wix prévue, domaine `fredmusic.fr` désormais observé sur les nameservers OVH (`dns106.ovh.net`, `ns106.ovh.net`).
- Hébergement cible recommandé : Vercel pour le frontend statique Vite.
- Frontend statique Vite, backend léger Supabase, email transactionnel Resend déjà branché.
- `/demande-musique` doit être prioritaire mobile car utilisée par les invités via QR code.

---

## Corrections appliquées — session 2026-08-27

- Domaine canonique basculé de `https://www.fredmusic.fr` vers `https://fredmusic.fr` dans `src/data/seo.ts`, `index.html`, `public/sitemap.xml`, `public/robots.txt` et les tests SEO.
- `public/sitemap.xml` et `public/robots.txt` alignés avec le domaine canonique non-www.
- `src/pages/MusicRequestPage.tsx` lit maintenant `?event=<uuid>` pour rattacher un QR code à une soirée précise avant de tomber sur la soirée active Supabase.
- Tests Playwright corrigés :
  - `/evenements-pro` remplace l'ancienne URL inexistante `/evenements-professionnels`;
  - `/location` remplace l'ancienne URL inexistante `/location-materiel`;
  - interception Supabase rendue robuste pour éviter les erreurs DNS dans les tests.
- Ajout de `supabase/migrations/004_lock_public_form_inserts.sql` :
  - supprime les anciennes policies `anon insert` sur `quote_requests` et `music_requests`;
  - force les formulaires publics à passer par l'Edge Function `submit-form`.
- Migration `004_lock_public_form_inserts.sql` exécutée dans Supabase production le 2026-08-27.
- Ajout de `supabase/migrations/005_admin_allowlist.sql` :
  - crée `admin_users`;
  - crée la fonction `is_admin()`;
  - remplace les policies `auth full` trop larges par des policies admin allowlistées;
  - durcit la RPC `activate_event()`.
- Migration `005_admin_allowlist.sql` exécutée dans Supabase production le 2026-08-27.
- Relance de `005_admin_allowlist.sql` bloquée ensuite par une policy déjà existante (`admin full quote_requests`) : état cohérent avec une migration déjà partiellement ou totalement appliquée.
- `005_admin_allowlist.sql` rendu idempotent le 2026-08-27 en supprimant les policies admin existantes avant recréation.
- Vérification RLS anonyme après migrations 004/005 le 2026-08-27 :
  - insertion directe anonyme dans `quote_requests` bloquée;
  - insertion directe anonyme dans `music_requests` bloquée;
  - appel anonyme à `is_admin()` bloqué;
  - résultat attendu : ✅ OK.
- Vérification visuelle `pg_policies` dans Supabase le 2026-08-27 :
  - `active_events` : `admin full active_events` + `anon read active_events`;
  - `music_requests` : `admin full music_requests`;
  - `quote_requests` : `admin full quote_requests`;
  - `settings` : `admin full settings` + `anon read settings`;
  - aucune policy `anon insert` restante sur `quote_requests` ou `music_requests`;
  - résultat attendu : ✅ OK.
- Vérification `auth.users` dans Supabase le 2026-08-27 :
  - compte admin existant : `contact@fredmusic.fr`;
  - `created_at` : 2026-08-03;
  - `last_sign_in_at` : 2026-08-04;
  - compte ajouté dans `admin_users` le 2026-08-27.
- Serveur local relancé le 2026-08-27 sur `http://127.0.0.1:5173/`.
- Accès local confirmé par l'utilisateur le 2026-08-27.
- Test réel Edge Function `submit-form` le 2026-08-27 :
  - demande de devis `Audit Fredmusic` envoyée avec succès;
  - demande musique `Audit Fredmusic` envoyée avec succès;
  - lecture anonyme directe des tables après insertion : aucune donnée exposée;
  - résultat attendu : ✅ OK.
- Validation admin locale par l'utilisateur le 2026-08-27 :
  - connexion à `/admin` avec `contact@fredmusic.fr` OK;
  - demandes de test `Audit Fredmusic` visibles dans l'admin;
  - résultat attendu : ✅ OK.
- Types Supabase mis à jour dans `src/lib/database.types.ts` pour `admin_users` et `is_admin()`.
- Ajout de `docs/production-runbook.md` avec l'ordre exact Supabase, les actions DNS OVH, les options Vercel et la checklist post-bascule.
- Ajout de `vercel.json` :
  - fallback SPA vers `index.html`;
  - headers `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.
- Ajout de `.vercelignore` pour éviter d'envoyer les dossiers non nécessaires au déploiement (`dist`, rapports, docs, scripts, migrations, fichiers locaux).
- Projet Vercel connecté le 2026-08-27 :
  - scope : `fred957`;
  - projet : `fred-music-web-site`;
  - variables Vercel détectées en `Production` et `Preview` : `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SENTRY_DSN`, `VITE_APP_ENV`, `VITE_APP_VERSION`.
- Déploiement preview Vercel validé le 2026-08-27 :
  - URL : `https://fred-music-web-site-jorcgkpa5-fred957.vercel.app`;
  - inspect : `https://vercel.com/fred957/fred-music-web-site/52dJZvPrWMjEQs1FWAYgzkG4kiGH`;
  - status : `Ready`;
  - target : `preview`;
  - protection Vercel active : un accès public direct renvoie vers SSO, mais `vercel curl` avec bypass répond correctement.
- Vérifications HTTP preview via `vercel curl` le 2026-08-27 :
  - `/` : 200;
  - `/contact` : 200;
  - `/admin` : 200;
  - `/sitemap.xml` : 200 `application/xml`;
  - headers sécurité présents : `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS.
- Déploiement production Vercel effectué le 2026-08-27 :
  - URL production : `https://fred-music-web-site-9zntiipqh-fred957.vercel.app`;
  - alias production : `https://fred-music-web-site.vercel.app`;
  - alias équipe : `https://fred-music-web-site-fred957.vercel.app`;
  - inspect : `https://vercel.com/fred957/fred-music-web-site/DD2J2HN2zQL5F5T8SFQwPTuKFYxT`;
  - deployment id : `dpl_DD2J2HN2zQL5F5T8SFQwPTuKFYxT`;
  - target : `production`;
  - status : `Ready`;
  - upload : 31.1 KB.
- Vérifications HTTP production via `vercel curl` le 2026-08-27 :
  - `/` : 200;
  - `/contact` : 200;
  - `/admin` : 200;
  - `/sitemap.xml` : 200 `application/xml`;
  - headers sécurité présents : `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS.
- Domaines ajoutés au projet Vercel le 2026-08-27 :
  - `fredmusic.fr` ajouté à `fred-music-web-site`;
  - `www.fredmusic.fr` ajouté à `fred-music-web-site`;
  - alias confirmés vers le déploiement production `fred-music-web-site-9zntiipqh-fred957.vercel.app`;
  - configuration DNS encore invalide tant que la zone OVH pointe vers `188.165.53.185`.
- Records DNS OVH à appliquer selon Vercel le 2026-08-27 :
  - remplacer l'ancien `A @ 188.165.53.185` par `A @ 76.76.21.21`;
  - remplacer l'ancien `A www 188.165.53.185` par `CNAME www cname.vercel-dns.com.` ou par la cible spécifique proposée par Vercel `c75d8bda4b2fb55c.vercel-dns-017.com.`;
  - conserver les records MX/SPF existants pour l'email OVH;
  - relancer `vercel domains verify fredmusic.fr` et `vercel domains verify www.fredmusic.fr` après propagation.
- Vérification DNS publique après ajout des domaines Vercel le 2026-08-27 :
  - `fredmusic.fr A` répond encore `188.165.53.185`;
  - `www.fredmusic.fr A` répond encore `188.165.53.185`;
  - aucun `CNAME www` Vercel encore propagé;
  - action OVH requise avant validation SSL/domaine Vercel.
- Vérification DNS publique après modification OVH partielle le 2026-08-27 :
  - `fredmusic.fr A` répond maintenant `76.76.21.21`;
  - `www.fredmusic.fr` répond encore avec l'ancien `A 188.165.53.185`;
  - action restante : supprimer/remplacer le record `www` ou attendre la prise en compte OVH si suppression déjà effectuée.
- Vérification directe sur le serveur autoritaire OVH `dns106.ovh.net` le 2026-08-27 :
  - `fredmusic.fr A` répond `76.76.21.21` : OK;
  - `fredmusic.fr AAAA` répond encore `2001:41d0:301::21` : à supprimer pour éviter un routage IPv6 vers OVH;
  - `www.fredmusic.fr A` ne répond plus : suppression prise en compte côté OVH;
  - `www.fredmusic.fr CNAME` ne répond pas encore : record `www` Vercel à recréer après rafraîchissement OVH, ou utiliser `A www 76.76.21.21`.
- Validation utilisateur PageSpeed Insights le 2026-08-27 sur `https://www.fredmusic.fr/` :
  - PageSpeed charge bien le site public après bascule DNS;
  - score Desktop observé : Performance 84, Accessibilité 95, Bonnes pratiques 100, SEO 100;
  - résultat attendu pour la première mise en ligne : ✅ OK.
- Optimisations PageSpeed préparées le 2026-08-27 après score Desktop 84/95/100/100 :
  - ajout de dimensions explicites `width`/`height` sur les images hero, logos, cards services, cards événements, cards matériel et galerie;
  - ajout de `decoding="async"` sur plusieurs images non critiques;
  - réduction de la priorité eager sur la galerie à la première image visible seulement;
  - `npm run lint` et `npm run build` validés après modification;
  - redéployé sur Vercel production le 2026-08-27.
- Optimisations complémentaires PageSpeed/accessibilité préparées le 2026-08-27 après audit Mobile 77 / Desktop 84 :
  - chargement direct de la home au lieu d'un lazy-loading avec spinner initial, pour réduire le CLS observé par Lighthouse;
  - ajout de dimensions explicites et de décodage async sur les images restantes de la home;
  - liens de cards rendus plus explicites via `aria-label`;
  - loader de pages secondaires balisé en `role="status"`;
  - `npm run lint` et `npm run build` validés après modification;
  - redéployé sur Vercel production le 2026-08-27.
- Redéploiement production Vercel après corrections CLS/accessibilité le 2026-08-27 :
  - URL production : `https://fred-music-web-site-mgx2zqtzz-fred957.vercel.app`;
  - inspect : `https://vercel.com/fred957/fred-music-web-site/72Fv1aTZudhKmJVN3p4CTWBfP7uS`;
  - deployment id : `dpl_72Fv1aTZudhKmJVN3p4CTWBfP7uS`;
  - target : `production`;
  - status : `Ready`;
  - alias confirmés : `https://fredmusic.fr`, `https://www.fredmusic.fr`, `https://fred-music-web-site.vercel.app`, `https://fred-music-web-site-fred957.vercel.app`;
  - vérifications HTTP via `vercel curl` : `/`, `/contact`, `/admin` répondent `200` sur `https://fredmusic.fr`;
  - prochaine mesure recommandée : relancer PageSpeed Mobile et Desktop pour vérifier CLS et navigation agentique.
- Validation PageSpeed utilisateur après redéploiement CLS le 2026-08-27 :
  - Desktop : Performance 99, Accessibilité 95, Bonnes pratiques 100, SEO 100;
  - Navigation agentique : 1/2;
  - CLS Desktop affiché en vert;
  - Mobile observé : Performance 77, Accessibilité 96, Bonnes pratiques 100, SEO 100;
  - problème restant visible : `Des éléments utilisent des attributs ARIA interdits`.
- Correctif accessibilité préparé le 2026-08-27 :
  - suppression d'un `aria-label` sur `div` générique dans `TestimonialCard`;
  - remplacement par un texte `sr-only` lisible par lecteur d'écran;
  - `npm run lint` et `npm run build` validés après modification;
  - redéployé sur Vercel production le 2026-08-27.
- Redéploiement production Vercel après correctif ARIA le 2026-08-27 :
  - URL production : `https://fred-music-web-site-f22l10jea-fred957.vercel.app`;
  - inspect : `https://vercel.com/fred957/fred-music-web-site/3Mfn59Am4WkDLpbHaPHNWnSc9Q1P`;
  - deployment id : `dpl_3Mfn59Am4WkDLpbHaPHNWnSc9Q1P`;
  - target : `production`;
  - status : `Ready`;
  - alias confirmés : `https://fredmusic.fr`, `https://www.fredmusic.fr`, `https://fred-music-web-site.vercel.app`, `https://fred-music-web-site-fred957.vercel.app`;
  - vérifications HTTP via `vercel curl` : `/`, `/contact`, `/admin` répondent `200` sur `https://fredmusic.fr`;
  - prochaine mesure recommandée : relancer PageSpeed pour confirmer la disparition de l'audit ARIA interdit.
- Validation PageSpeed finale utilisateur le 2026-08-27 après correctif ARIA :
  - Mobile : Performance 91, Accessibilité 100, Bonnes pratiques 100, SEO 100;
  - Desktop : Performance 99, Accessibilité 100, Bonnes pratiques 100, SEO 100;
  - Navigation agentique : 2/2;
  - CLS Mobile : 0;
  - CLS Desktop : 0;
  - FCP Mobile : 2.7 s;
  - LCP Mobile : 2.8 s;
  - FCP Desktop : 0.7 s;
  - LCP Desktop : 0.7 s;
  - résultat attendu : ✅ OK pour production.
- Redéploiement production Vercel après optimisations PageSpeed le 2026-08-27 :
  - URL production : `https://fred-music-web-site-ntq4xxd2n-fred957.vercel.app`;
  - inspect : `https://vercel.com/fred957/fred-music-web-site/EQepDziq4B45F4NdzpTDB6QRk8sT`;
  - deployment id : `dpl_EQepDziq4B45F4NdzpTDB6QRk8sT`;
  - target : `production`;
  - status : `Ready`;
  - alias confirmés : `https://fredmusic.fr`, `https://www.fredmusic.fr`, `https://fred-music-web-site.vercel.app`, `https://fred-music-web-site-fred957.vercel.app`;
  - vérifications HTTP via `vercel curl` : `/`, `/contact`, `/admin` répondent `200` sur `https://fredmusic.fr`;
  - headers sécurité présents : `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS.
- Footer mis à jour le 2026-08-27 :
  - ajout de la mention `Site réalisé par ThyssenDigital`;
  - lien externe vers `https://www.thyssendigital.fr`;
  - `npm run lint` et `npm run build` validés après modification.
- Vérification DNS publique le 2026-08-27 :
  - `fredmusic.fr A 188.165.53.185`;
  - `www.fredmusic.fr A 188.165.53.185`;
  - MX OVH présents;
  - SPF OVH présent;
  - DMARC/DKIM non visibles avec les sélecteurs testés.
- Contrôles relancés et validés :
  - `npm install`;
  - `npm run lint`;
  - `npm run test`;
  - `npm run build`;
  - `npm run test:e2e`;
  - `npm audit --audit-level=low`.

## Corrections appliquées — sessions précédentes

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
- Test automatisé ajouté pour vérifier que chaque référence `/images/...` dans `src` pointe vers un asset existant dans `public`.
- `npm test` validé : 9 fichiers, 20 tests passants.
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
   - ✅ `004_lock_public_form_inserts.sql` ajouté pour supprimer les insertions anonymes directes.
   - ✅ `005_admin_allowlist.sql` ajouté pour limiter l'admin aux comptes allowlistés.
   - ✅ `002_hardening.sql` exécuté dans Supabase lors de la précédente session.
   - ✅ `003_form_security.sql` exécuté dans Supabase lors de la précédente session.
   - ✅ `004_lock_public_form_inserts.sql` exécutée dans Supabase production le 2026-08-27.
   - ✅ `005_admin_allowlist.sql` exécutée dans Supabase production le 2026-08-27.
   - ✅ Utilisateur admin réel `contact@fredmusic.fr` ajouté dans `admin_users` le 2026-08-27.
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
    - ✅ Test de cohérence des références images publiques.
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
    - ✅ Routes critiques couvertes : `/`, `/contact`, `/demande-musique`, `/galerie`, `/evenements-prives`, `/evenements-pro`, `/location`, `/admin` non connecté.
    - ✅ Vérifications automatisées : pas de débordement horizontal, pas d'erreur console, screenshots attachés au rapport Playwright.
    - ✅ Validation locale 2026-08-27 : `npm run test:e2e`, 32 tests passants.
    - À faire manuellement : validation visuelle authentifiée de `/admin`, clavier, focus et parcours admin réels.

14. **Optimiser médias et galerie**
    - ✅ Catégorie vidéo vide retirée de `GalleryPage`.
    - ✅ Catégorie mariage fusionnée dans "Nos différents événements réalisés".
    - ✅ Photos de galerie renommées proprement en ordre croissant.
    - ✅ Chemins d'images galerie corrigés.
    - ✅ Vérification automatisée en CI : aucune image référencée manquante.
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
    - Hébergement recommandé : Vercel.
    - ✅ Ajouter `vercel.json` pour fallback SPA vers `index.html`.
    - ✅ Créer le projet Vercel et connecter le repo : `fred957/fred-music-web-site`.
    - ✅ Configurer les variables d'environnement Vercel : présentes en Production et Preview.
    - ✅ Déployer une préproduction Vercel et vérifier les routes critiques.
    - ✅ Lancer le déploiement production Vercel.
    - ✅ Ajouter `fredmusic.fr` et `www.fredmusic.fr` au projet Vercel.
    - À faire : modifier les records DNS OVH pour pointer vers Vercel.
    - À faire : attendre la validation DNS et le SSL automatique Vercel pour `fredmusic.fr` et `www.fredmusic.fr`.
    - Domaine observé sur OVH le 2026-08-27 : NS `dns106.ovh.net` et `ns106.ovh.net`.
    - Créer/configurer `contact@fredmusic.fr`.
    - Valider le domaine `fredmusic.fr` dans Resend.
    - Mettre à jour les secrets Supabase Functions :
      - `QUOTE_NOTIFICATION_EMAIL=contact@fredmusic.fr` ou adresse finale choisie;
      - `QUOTE_EMAIL_FROM=FredMusic <contact@fredmusic.fr>`.
    - Configurer MX/SPF/DKIM/DMARC.
    - ✅ Ajouter variables d'environnement de production.
    - ✅ Faire déploiement de préproduction puis validation technique.

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
| **Phase 11** | ⚠️ En cours | Déploiement & DNS (production Vercel prête, domaines ajoutés, records DNS OVH à appliquer) |

---

## Phase 6 — Supabase Backend (TERMINÉ)

### Fichiers créés
- `src/lib/supabase.ts` — Client singleton, lit `VITE_SUPABASE_URL` et `VITE_SUPABASE_PUBLISHABLE_KEY`
- `src/lib/database.types.ts` — Types TypeScript pour toutes les tables (avec `Relationships: []` pour compatibilité supabase-js v2)
- `src/lib/api.ts` — Toutes les fonctions Supabase centralisées
- `supabase/migrations/001_initial.sql` — Migration SQL à exécuter manuellement
- `supabase/migrations/002_hardening.sql` — Contraintes SQL et RPC d'activation
- `supabase/migrations/003_form_security.sql` — Table privée de rate limit
- `supabase/migrations/004_lock_public_form_inserts.sql` — Suppression des inserts anonymes directs
- `supabase/migrations/005_admin_allowlist.sql` — Allowlist admin par `admin_users`
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

- Migrations `001`, `002` et `003` exécutées dans Supabase Dashboard lors de la précédente session.
- Migrations `004` et `005` ajoutées au repo puis exécutées en production le 2026-08-27.
- Entrée `admin_users` créée pour `contact@fredmusic.fr` le 2026-08-27.
- Compte admin créé dans Supabase Authentication.
- Formulaires réels testés via Edge Function et visibles dans l'admin.

---

## Tables Supabase

| Table | Rôle | RLS |
|-------|------|-----|
| `quote_requests` | Demandes de devis reçues depuis ContactPage | insert via Edge Function service role, admin allowlist SELECT/UPDATE |
| `music_requests` | Demandes playlist des invités | insert via Edge Function service role, admin allowlist SELECT/UPDATE |
| `active_events` | Soirées QR code, une seule active garantie par index unique partiel | anon SELECT si `is_active=true`, admin allowlist full |
| `settings` | Config globale (gallery_cloud_url, google_place_id) | public read, admin allowlist write |
| `form_rate_limits` | Rate limit formulaires publics | aucune policy publique, service role uniquement |
| `admin_users` | Comptes autorisés à gérer l'admin | utilisée par `is_admin()`, à alimenter manuellement |

---

## Phase 7 — SEO (TERMINÉ)

### Implémenté
- `SeoManager` résout maintenant le SEO des routes dynamiques : prestations, matériel, événements publics
- JSON-LD injecté côté client pour `Organization`, `LocalBusiness`, `WebSite`, `Service`, `Product`, `Event`, `BreadcrumbList`
- Canonicals dynamiques alignés sur les vraies URLs publiques en `https://fredmusic.fr`
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
- **Email notifications** : Resend fonctionne, mais l'adresse de production `contact@fredmusic.fr` attend la validation DNS Resend et la configuration mail finale.
- **Vercel** : production prête sur l'alias Vercel. `fredmusic.fr` et `www.fredmusic.fr` sont rattachés, mais attendent les records DNS OVH.
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
- **Domain cible** : `fredmusic.fr`
- **DNS observé** : OVH actif (`dns106.ovh.net`, `ns106.ovh.net`), A actuel `188.165.53.185`
- **DNS cible Vercel** : `A @ 76.76.21.21`; `CNAME www cname.vercel-dns.com.` ou cible spécifique Vercel `c75d8bda4b2fb55c.vercel-dns-017.com.`
- **Contact / admin Supabase** : `contact@fredmusic.fr` existe déjà dans Supabase Auth, à valider côté DNS/Resend pour l'envoi mail domaine.
- **Hébergement cible** : Vercel, projet `fred957/fred-music-web-site`
- **Preview Vercel validé** : `https://fred-music-web-site-jorcgkpa5-fred957.vercel.app`
- **Production Vercel validée** : `https://fredmusic.fr`
