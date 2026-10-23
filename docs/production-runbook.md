# Fredmusic - Runbook mise en production

Date de préparation : 2026-08-27

## 1. Avant bascule DNS

- Lancer localement :
  - `npm install`
  - `npm run lint`
  - `npm run test`
  - `npm run build`
  - `npm run test:e2e`
  - `npm audit --audit-level=low`
- Vérifier que les variables de production existent chez l'hébergeur :
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`
  - `VITE_SENTRY_DSN` si Sentry est utilisé
  - `VITE_APP_ENV=production`
  - `VITE_APP_VERSION`
- Vérifier que l'hébergeur sert une SPA React :
  - toutes les routes publiques doivent retomber sur `index.html`;
  - `/contact`, `/admin`, `/prestations/dj-animation` et `/location/pioneer-djm-a9` ne doivent pas renvoyer une 404 serveur.

## 2. Supabase

Exécuter les migrations dans cet ordre :

1. `supabase/migrations/001_initial.sql`
2. `supabase/migrations/002_hardening.sql`
3. `supabase/migrations/003_form_security.sql`
4. `supabase/migrations/004_lock_public_form_inserts.sql`
5. `supabase/migrations/005_admin_allowlist.sql`

Créer ensuite l'entrée allowlist de l'admin, en remplaçant l'adresse :

```sql
INSERT INTO admin_users (user_id, email)
SELECT id, email
FROM auth.users
WHERE lower(email) = lower('adresse-admin@exemple.fr')
ON CONFLICT (user_id) DO UPDATE SET email = excluded.email;
```

Contrôles Supabase obligatoires :

- RLS activé sur `quote_requests`, `music_requests`, `active_events`, `settings`, `form_rate_limits`, `admin_users`.
- Aucune policy `anon insert` sur `quote_requests` ou `music_requests`.
- Seule l'Edge Function `submit-form` insère les formulaires publics.
- Les signups Supabase Auth sont désactivés si aucun parcours de création admin n'est prévu.
- L'utilisateur admin attendu est bien présent dans `admin_users`.

Secrets Edge Function à configurer :

- `RESEND_API_KEY`
- `QUOTE_NOTIFICATION_EMAIL`
- `QUOTE_EMAIL_FROM`

Après validation du domaine mail, préférer :

- `QUOTE_NOTIFICATION_EMAIL=contact@fredmusic.fr` ou l'adresse finale choisie
- `QUOTE_EMAIL_FROM=Fredmusic <contact@fredmusic.fr>`

## 3. DNS OVH

État public observé le 2026-08-27 :

- NS : `dns106.ovh.net`, `ns106.ovh.net`
- `fredmusic.fr A 188.165.53.185`
- `www.fredmusic.fr A 188.165.53.185`
- MX OVH :
  - `1 mx1.mail.ovh.net.`
  - `5 mx2.mail.ovh.net.`
  - `100 mx3.mail.ovh.net.`
- SPF : `v=spf1 include:mx.ovh.com -all`
- DMARC/DKIM : non visibles avec les sélecteurs testés.

Conserver sans modification :

- tous les `MX`;
- le SPF existant, sauf ajout maîtrisé d'un service d'envoi mail;
- les éventuels `DKIM`;
- les éventuels `DMARC`;
- les enregistrements de validation mail.

Modifier uniquement les entrées web selon l'hébergeur final.

### Option A - Hébergement sur serveur OVH existant

Conserver ou ajuster :

- `fredmusic.fr A <IP_DU_SERVEUR_WEB>`
- `www.fredmusic.fr A <IP_DU_SERVEUR_WEB>` ou `www CNAME fredmusic.fr.`

À configurer côté serveur :

- certificat SSL pour `fredmusic.fr` et `www.fredmusic.fr`;
- redirection HTTP vers HTTPS;
- redirection `https://www.fredmusic.fr/*` vers `https://fredmusic.fr/*`;
- fallback SPA vers `index.html`.

### Option B - Hébergement Vercel

État Vercel au 2026-08-27 :

- projet : `fred957/fred-music-web-site`;
- production : `https://fred-music-web-site.vercel.app`;
- domaines ajoutés : `fredmusic.fr`, `www.fredmusic.fr`;
- validation DNS encore en attente chez OVH.

Ajouter/modifier dans la zone DNS OVH :

- remplacer `A @ 188.165.53.185` par `A @ 76.76.21.21`;
- remplacer `A www 188.165.53.185` par `CNAME www cname.vercel-dns.com.`;
- si Vercel affiche la cible spécifique, utiliser de préférence `CNAME www c75d8bda4b2fb55c.vercel-dns-017.com.`.

À supprimer côté web seulement :

- anciens `A` Wix/ancien hébergeur sur `@` et `www`, si remplacés par Vercel;
- ne pas laisser deux `A` concurrents pour `@` ou `www`.

À ne pas supprimer :

- aucun `MX`;
- aucun TXT mail SPF/DKIM/DMARC.

Après modification OVH :

```bash
npx vercel domains verify fredmusic.fr
npx vercel domains verify www.fredmusic.fr
```

## 4. Redirections et domaine canonique

Domaine canonique retenu : `https://fredmusic.fr`.

À valider après déploiement :

```txt
http://fredmusic.fr             -> 301/308 https://fredmusic.fr
http://www.fredmusic.fr         -> 301/308 https://fredmusic.fr
https://www.fredmusic.fr        -> 301/308 https://fredmusic.fr
https://fredmusic.fr/contact    -> 200
https://fredmusic.fr/admin      -> 200 écran login
https://fredmusic.fr/sitemap.xml -> 200
https://fredmusic.fr/robots.txt  -> 200
```

## 5. Tests après bascule

- Ouvrir `/contact`, envoyer une demande réelle de test, vérifier :
  - succès côté visiteur;
  - ligne dans `quote_requests`;
  - email reçu.
- Ouvrir `/demande-musique`, envoyer une demande réelle de test, vérifier :
  - succès côté visiteur;
  - ligne dans `music_requests`;
  - rattachement à la soirée active ou à l'ID `?event=`.
- Ouvrir `/admin`, vérifier :
  - login OK avec le compte allowlisté;
  - lecture devis/musiques OK;
  - modification de statut OK;
  - activation/archivage soirée OK;
  - un compte Supabase non allowlisté ne voit rien et ne peut rien modifier.
- Tester mobile réel :
  - Safari iPhone;
  - Chrome Android;
  - formulaire QR code en conditions réelles.

## 6. Search Console et SEO

- Ajouter une propriété domaine `fredmusic.fr` dans Google Search Console.
- Valider par TXT DNS chez OVH.
- Soumettre `https://fredmusic.fr/sitemap.xml`.
- Vérifier que `/admin` et `/demande-musique` ne sont pas indexées.
- Tester les aperçus sociaux avec l'URL canonique non-www.

## 7. Rollback

Avant bascule, conserver :

- dernier build fonctionnel;
- anciennes valeurs DNS web;
- accès OVH;
- accès Supabase;
- accès hébergeur.

Rollback DNS :

- remettre les anciens enregistrements web `A`/`CNAME`;
- ne pas toucher aux enregistrements mail.
