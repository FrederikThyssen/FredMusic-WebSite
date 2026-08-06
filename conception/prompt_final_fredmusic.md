# Fredmusic - Prompt projet final

## Objectif général

Créer le nouveau site officiel de Fredmusic, DJ et prestataire événementiel, afin de remplacer le site Wix actuel par un site moderne, premium, rapide, responsive et administrable.

Le site doit présenter clairement les prestations de Fredmusic, rassurer les futurs clients, faciliter les demandes de devis, permettre les demandes de musique via QR code, et offrir au client un espace d’administration simple pour gérer certains contenus.

---

## Positionnement

Fredmusic est un DJ / prestataire événementiel premium intervenant pour :

- mariages ;
- événements privés ;
- événements professionnels et publics ;
- prestations DJ ;
- sonorisation ;
- éclairage ;
- effets spéciaux ;
- matériel professionnel.

Le site doit rester élégant, sobre, premium et lisible.
Il ne doit pas donner l’impression d’un catalogue e-commerce ni d’une plateforme complexe.

---

## Charte graphique

Respecter la direction visuelle déjà validée :

- ambiance sombre premium ;
- noir profond ;
- doré élégant ;
- blanc cassé / ivoire ;
- photos immersives ;
- bordures fines ;
- légers arrondis modernes ;
- design sobre, professionnel, haut de gamme.

Éviter :

- couleurs trop éloignées de la maquette ;
- effets trop fantaisie ;
- design marketing trop générique ;
- grosses sections inutiles ;
- surcharge visuelle ;
- textes trop petits ou peu lisibles.

La lisibilité doit être prioritaire, surtout sur fond sombre et sur mobile.

---

## Pages déjà validées ou avancées

Les pages suivantes existent déjà et ne doivent pas être refaites entièrement :

- Accueil ;
- Mariages ;
- Événements privés ;
- Prestations ;
- Location / matériel professionnel ;
- Galerie ;
- Contact.

Ces pages peuvent être améliorées uniquement si nécessaire pour :

- cohérence globale ;
- responsive ;
- SEO ;
- accessibilité ;
- performance ;
- intégration backend ;
- correction technique.

Ne pas refaire leur design de zéro sans validation.

---

## Structure de navigation

La navbar doit contenir :

- Accueil ;
- Mariages ;
- Événements privés ;
- Événements pro ;
- Prestations ;
- Location ;
- Galerie ;
- Contact ;
- CTA : Demander un devis.

La page Événements pro peut rester en attente tant que les informations client ne sont pas complètes.

---

## Pages principales

### Accueil

Page vitrine immersive présentant Fredmusic.

Elle doit contenir :

- hero premium avec photo ;
- présentation des prestations principales ;
- mise en avant mariage ;
- QR code / demande de musique si pertinent ;
- matériel professionnel ;
- aperçu galerie ;
- témoignage ;
- CTA demande de devis.

Ne pas modifier profondément la structure validée sans demande explicite.

---

### Mariages

Page dédiée aux mariages.

Elle doit rester élégante, claire et inspirée de la maquette validée.

Mettre en avant :

- animation DJ mariage ;
- ouverture de bal ;
- ambiance personnalisée ;
- sonorisation ;
- micros pour discours ;
- lumière ;
- fumée lourde ;
- étincelles froides ;
- accompagnement sur mesure.

Ne pas refaire la page validée sauf amélioration nécessaire.

---

### Événements privés

Page dédiée aux événements privés :

- anniversaires ;
- baptêmes ;
- communions ;
- soirées privées ;
- soirées à thème ;
- départs en retraite ;
- fêtes familiales ;
- garden-party ;
- événements entre amis.

La page doit rester premium, visuelle, claire et rassurante.

---

### Événements professionnels / publics

Page à finaliser plus tard selon les informations client.

Types possibles :

- événements d’entreprise ;
- soirées d’entreprise ;
- séminaires ;
- comités d’entreprise ;
- arbres de Noël ;
- bals ;
- fêtes de village ;
- fêtes de la musique ;
- associations ;
- collectivités ;
- inaugurations ;
- événements publics.

Mettre en avant :

- fiabilité ;
- ponctualité ;
- matériel professionnel ;
- adaptation au lieu ;
- gestion micro ;
- sonorisation ;
- animation adaptée au public.

---

### Prestations

Page simple organisée autour des grandes catégories :

1. Animation DJ
   Exemples : mariages, anniversaires, événements associatifs, soirées d’entreprise.

2. Sonorisation & éclairage scénique
   Exemples : spectacles, pièces de théâtre, prises de parole, séminaires, podiums.

3. Effets spéciaux & vidéo
   Exemples : étincelles froides, fumée lourde, jet CO2, confettis, poudre Holi, vidéoprojection.

La page ne doit pas faire doublon avec les pages événementielles.

---

### Location / matériel professionnel

La page présente le matériel comme preuve de qualité, pas comme un catalogue e-commerce.

Matériel à intégrer :

- Pioneer DJM A9 ;
- Pioneer CDJ 3000 ;
- Electro-Voice EKX 15 ;
- Mackie Thump 15 BST ;
- Shure SLX-D ;
- Soundcraft UI 16.

Mentionner sobrement que certains équipements peuvent être proposés à la location ou intégrés à une prestation complète.

---

### Galerie

La galerie doit contenir :

- Mariages réalisés ;
- Nos différents événements ;
- Vidéos.

Les photos doivent être triées, optimisées et validées avec le client.

La catégorie vidéo doit être prévue même si les vidéos ne sont pas encore ajoutées.

---

### Contact

La page Contact doit rester simple :

- formulaire de demande de devis ;
- informations de contact officielles.

Informations client :

- Fréderic WILKOSZ ;
- 62156 Vis-en-Artois, France ;
- djfredmusic@outlook.fr ;
- 06 48 13 55 56 ;
- SIREN : 813 426 483 ;
- CODE APE : 9329 Z.

Le formulaire actuel est mocké.
Pour la mise en ligne, il devra envoyer les demandes réellement.

---

## Fonctionnalité QR code / demandes de musique

Créer une vraie fonctionnalité de demande de musique accessible via QR code.

Page publique :

- `/demande-musique` ou `/musique`.

Formulaire invité :

- prénom ou nom, optionnel ;
- artiste ;
- titre de la musique ;
- message optionnel ;
- bouton envoyer ;
- confirmation.

Important :

- les invités proposent des titres ;
- Fredmusic reste maître de la playlist ;
- les demandes doivent être visibles dans l’admin.

---

## Backend nécessaire

Le site final doit prévoir un backend ou backend léger.

Objectifs :

- recevoir les demandes de devis ;
- recevoir les demandes de musique ;
- permettre un admin simple ;
- gérer certaines photos de galerie ;
- permettre quelques modifications de contenu.

Architecture recommandée :

- frontend : React / Vite ;
- backend/database/auth/storage : Supabase ;
- emails transactionnels : Resend ou Brevo ;
- hébergement : hébergeur actuel du client si compatible, sinon service externe adapté selon les contraintes techniques.

---

## Admin client

Créer un admin simple, agréable et limité.

Fonctions prioritaires :

- connexion admin ;
- voir les demandes de devis ;
- voir les demandes de musique ;
- supprimer/archiver une demande ;
- ajouter/supprimer des photos dans la galerie ;
- modifier quelques textes simples du site ;
- gérer certaines prestations.

Ne pas créer :

- planning complexe ;
- paiement ;
- panier ;
- e-commerce ;
- gestion complète d’événements ;
- CRM lourd.

L’admin doit rester simple et utilisable par un client non technique.

---

## Base de données envisagée

Tables possibles :

### quote_requests

- id ;
- name ;
- phone ;
- email ;
- event_type ;
- event_date ;
- location ;
- guests ;
- message ;
- status ;
- created_at.

### music_requests

- id ;
- guest_name ;
- artist ;
- title ;
- message ;
- status ;
- created_at.

### gallery_items

- id ;
- title ;
- category ;
- image_url ;
- alt ;
- sort_order ;
- is_visible ;
- created_at.

### site_content

- id ;
- key ;
- value ;
- updated_at.

### services

- id ;
- title ;
- description ;
- category ;
- is_visible ;
- sort_order.

---

## Formulaires réels

Le formulaire Contact doit :

- enregistrer la demande en base ;
- envoyer un email à `djfredmusic@outlook.fr` ;
- afficher une confirmation au visiteur ;
- être protégé contre les abus simples.

Le formulaire demande de musique doit :

- enregistrer la demande en base ;
- afficher une confirmation ;
- être visible dans l’admin ;
- ne pas envoyer automatiquement la musique en playlist.

---

## Mise en ligne / remplacement Wix

Le site final doit être préparé pour remplacer le site Wix actuel du client.

Le client dispose déjà :

- d’un hébergeur ;
- d’un nom de domaine.

Il ne faut donc pas partir du principe que le site sera forcément hébergé sur Vercel, Netlify ou GitHub Pages.

Avant la mise en ligne, il faudra identifier précisément :

- l’hébergeur actuel ;
- le type d’hébergement disponible ;
- l’accès FTP / SFTP ou panel d’administration ;
- la version de Node.js disponible si nécessaire ;
- la gestion du nom de domaine ;
- la gestion des DNS ;
- la présence ou non d’un certificat SSL ;
- les contraintes techniques de l’hébergement.

Comme le site est construit avec React / Vite, il peut être déployé sous forme de fichiers statiques générés par :

```bash
npm run build
```

Le dossier à mettre en ligne est :

```txt
dist/
```

Si l’hébergement accepte uniquement du statique classique, le site devra être configuré pour fonctionner correctement avec le routing React.

Il faudra prévoir :

- configuration des redirections vers `index.html` pour les routes React ;
- test des pages directes comme `/mariages`, `/contact`, `/galerie` ;
- certificat SSL actif ;
- redirections depuis les anciennes URLs Wix ;
- conservation ou mise à jour des emails liés au domaine si nécessaire ;
- sauvegarde de l’ancien site Wix avant bascule ;
- mise en ligne sur une URL de test si possible ;
- validation client avant remplacement définitif.

Le backend éventuel devra être choisi en fonction des possibilités de l’hébergement existant.

Si l’hébergement client ne permet pas facilement :

- base de données ;
- authentification ;
- stockage fichiers ;
- fonctions serveur ;
- envoi email fiable ;

alors il faudra utiliser un service externe adapté, par exemple :

- Supabase pour la base, l’auth et le stockage ;
- Resend ou Brevo pour l’envoi d’emails ;
- API externe ou serverless si nécessaire.

L’objectif est de respecter l’infrastructure existante du client tout en gardant un site fiable, maintenable et simple à administrer.

---

## SEO

Prévoir :

- title unique par page ;
- meta description unique ;
- Open Graph ;
- sitemap.xml ;
- robots.txt ;
- données locales ;
- mots-clés naturels autour de :
  - DJ mariage ;
  - DJ événementiel ;
  - DJ Pas-de-Calais ;
  - DJ Arras ;
  - DJ Hauts-de-France ;
  - sonorisation mariage ;
  - animation soirée privée.

Ne pas surcharger les textes de mots-clés.

---

## Performance

Avant mise en ligne :

- compresser les images ;
- convertir les images lourdes en WebP si pertinent ;
- lazy-load des images galerie ;
- vérifier le poids des pages ;
- vérifier Lighthouse ;
- optimiser le rendu mobile.

---

## Accessibilité

Respecter :

- textes lisibles ;
- contrastes suffisants ;
- labels de formulaire ;
- alt pertinents ;
- navigation clavier ;
- structure H1/H2 cohérente ;
- boutons compréhensibles.

---

## Workflow de développement

Travailler proprement :

- une branche par fonctionnalité ;
- commits réguliers ;
- pas de gros changements non validés ;
- validation visuelle avant commit important ;
- ne pas modifier les pages déjà validées sans raison ;
- ne pas supprimer les assets sans accord ;
- toujours vérifier avec `npm run lint` et `npm run build`.

---

## Priorité restante

1. Finaliser et valider Contact.
2. Préparer le vrai formulaire backend.
3. Créer / finaliser demande de musique QR code.
4. Créer admin simple.
5. Optimiser galerie/photos.
6. Finaliser page Événements pro quand les infos client sont disponibles.
7. SEO / mentions légales / redirections Wix.
8. Déploiement sur l’hébergement existant du client et bascule du domaine.
