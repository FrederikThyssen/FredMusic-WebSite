# Plan backend Fredmusic

## Objectif

Préparer le passage du site Fredmusic d'un mock local vers un système réel capable de :

- recevoir les demandes de devis ;
- recevoir les demandes de musique via QR code ;
- afficher ces demandes dans un admin simple ;
- envoyer des notifications email au client ;
- garder une base technique évolutive sans transformer le site en CMS lourd.

Le client ne doit pas forcément pouvoir modifier tout le contenu du site. Les changements de textes, pages, design ou galerie peuvent rester une prestation de maintenance ou d'évolution.

---

## Périmètre retenu pour l'admin

### À faire

- Connexion admin sécurisée.
- Liste des demandes de devis.
- Liste des demandes de musique.
- Changement de statut des demandes.
- Consultation des messages.
- Filtrage simple par statut.

### À éviter pour l'instant

- CMS complet.
- Modification de toutes les pages.
- Gestion avancée de galerie.
- Planning complexe.
- Paiement.
- Panier.
- CRM lourd.
- Gestion complète d'événements.

---

## Architecture recommandée

Le client possède déjà son hébergeur et son domaine. Le choix final dépendra donc des contraintes de cet hébergement.

Architecture privilégiée :

- Frontend : React / Vite.
- Build statique : dossier `dist/`.
- Base de données / auth / storage : Supabase si l'hébergement ne fournit pas une solution simple.
- Email transactionnel : Brevo ou Resend.
- Admin : intégré au site via `/admin`.

Le backend réel doit remplacer progressivement le store mock Zustand actuellement utilisé.

---

## Flux demande de devis

Page concernée :

- `/contact`

Champs envoyés :

- nom / prénom ;
- email ;
- téléphone ;
- type d'événement ;
- date souhaitée ;
- lieu / ville ;
- nombre d'invités ;
- message.

Comportement attendu :

1. Le visiteur remplit le formulaire.
2. La demande est enregistrée en base.
3. Un email est envoyé à `djfredmusic@outlook.fr`.
4. Le visiteur voit une confirmation.
5. La demande apparaît dans `/admin`.

Statuts possibles :

- `pending` : nouvelle demande ;
- `accepted` : traitée ;
- `refused` : refusée.

---

## Flux demande de musique QR code

Page concernée :

- `/demande-musique`

Champs envoyés :

- prénom ou nom, optionnel ;
- artiste ;
- titre de la musique ;
- message optionnel.

Comportement attendu :

1. L'invité scanne le QR code.
2. Il propose une musique.
3. La demande est enregistrée en base.
4. Elle apparaît dans l'admin.
5. Le DJ décide de l'accepter, la refuser ou la marquer comme jouée.

Important :

- la demande est une suggestion ;
- Fredmusic garde la main sur la playlist ;
- aucun titre n'est joué automatiquement.

Statuts possibles :

- `pending` : en attente ;
- `accepted` : acceptée ;
- `played` : jouée ;
- `refused` : refusée.

---

## Tables envisagées

### quote_requests

```sql
id uuid primary key default gen_random_uuid(),
name text not null,
email text not null,
phone text,
event_type text not null,
event_date date,
location text,
guests_count integer,
message text,
status text not null default 'pending',
created_at timestamptz not null default now()
```

Contraintes :

- `status` doit être limité à `pending`, `accepted`, `refused`.
- `email` doit être obligatoire.
- `name` doit être obligatoire.

---

### music_requests

```sql
id uuid primary key default gen_random_uuid(),
event_id text,
guest_name text,
artist text not null,
song_title text not null,
message text,
status text not null default 'pending',
created_at timestamptz not null default now()
```

Contraintes :

- `status` doit être limité à `pending`, `accepted`, `played`, `refused`.
- `artist` doit être obligatoire.
- `song_title` doit être obligatoire.

---

### admin_users

Si Supabase Auth est utilisé, cette table peut être évitée au départ.

Sinon, prévoir au minimum :

```sql
id uuid primary key default gen_random_uuid(),
email text not null unique,
role text not null default 'admin',
created_at timestamptz not null default now()
```

---

## Sécurité

### Formulaires publics

Les visiteurs doivent pouvoir :

- créer une demande de devis ;
- créer une demande de musique.

Ils ne doivent pas pouvoir :

- lire les demandes existantes ;
- modifier les demandes ;
- supprimer les demandes.

### Admin

L'admin doit pouvoir :

- lire les demandes ;
- modifier les statuts ;
- éventuellement supprimer ou archiver une demande plus tard.

Accès protégé par authentification.

---

## Emails

### Email demande de devis

À envoyer à :

- `djfredmusic@outlook.fr`

Contenu :

- nom ;
- email ;
- téléphone ;
- type d'événement ;
- date ;
- lieu ;
- nombre d'invités ;
- message.

### Email demande de musique

Optionnel au départ.

Pour éviter de spammer le DJ pendant une soirée, il vaut mieux afficher les demandes dans l'admin plutôt que d'envoyer un email pour chaque musique.

---

## Migration depuis le mock actuel

État actuel :

- Zustand stocke les demandes localement.
- `localStorage` persiste les demandes mockées.
- `/contact` alimente `quoteRequests`.
- `/demande-musique` alimente `musicRequests`.
- `/admin` lit ces demandes et modifie les statuts.

Migration prévue :

1. Créer les tables réelles.
2. Ajouter les variables d'environnement.
3. Créer un client backend.
4. Remplacer `addQuoteRequest` par un insert réel.
5. Remplacer `addMusicRequest` par un insert réel.
6. Remplacer les lectures admin par des requêtes réelles.
7. Ajouter l'auth admin.
8. Ajouter l'envoi email pour les devis.

---

## Variables d'environnement possibles

```txt
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
EMAIL_PROVIDER_API_KEY=
ADMIN_NOTIFICATION_EMAIL=djfredmusic@outlook.fr
```

Les clés sensibles ne doivent jamais être commit dans Git.

---

## Déploiement

Le client dispose déjà :

- d'un hébergeur ;
- d'un nom de domaine.

À vérifier avant intégration backend :

- hébergeur exact ;
- accès FTP / SFTP / panel ;
- possibilité de configurer les redirections SPA vers `index.html` ;
- support Node.js ou non ;
- support PHP ou non ;
- disponibilité d'une base de données ;
- possibilité d'envoyer des emails ;
- certificat SSL ;
- gestion DNS.

Si l'hébergement est uniquement statique, le backend devra être externe.

---

## Prochaines étapes recommandées

1. Garder l'admin mocké simple et validé.
2. Finaliser les textes visibles des formulaires.
3. Vérifier responsive mobile de `/demande-musique`.
4. Choisir la solution backend selon l'hébergeur réel.
5. Créer les tables.
6. Brancher Contact en réel.
7. Brancher Demande musique en réel.
8. Ajouter authentification admin.
9. Tester avec le client avant mise en ligne.
