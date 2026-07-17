# Checklist SEO et mise en ligne Fredmusic

## Objectif

Préparer le site Fredmusic pour remplacer proprement le site Wix actuel, avec une base SEO fiable, des pages indexables, un partage social propre et une mise en ligne sans perte de visibilité.

---

## 1. SEO technique de base

Statut : en cours.

- [x] Ajouter les balises SEO principales dans `index.html`.
- [x] Ajouter Open Graph pour les partages Facebook, WhatsApp, Messenger, LinkedIn.
- [x] Ajouter Twitter Card.
- [x] Ajouter `robots.txt`.
- [x] Ajouter `sitemap.xml`.
- [x] Préparer les données SEO par page dans `src/data/seo.mock.ts`.
- [ ] Confirmer le domaine final du client.
- [ ] Remplacer `https://www.fredmusic.fr` si le domaine réel est différent.

---

## 2. SEO page par page

Statut : fait.

Objectif : chaque route doit avoir son propre title, sa description, son canonical et son image de partage.

Pages à brancher :

- [x] Accueil : `/`
- [x] Mariages : `/mariages`
- [x] Événements privés : `/evenements-prives`
- [x] Événements pro : `/evenements-pro`
- [x] Prestations : `/prestations`
- [x] Location : `/location`
- [x] Galerie : `/galerie`
- [x] Contact : `/contact`
- [x] Demande musique : `/demande-musique`
- [x] Mentions légales : `/mentions-legales`
- [x] Confidentialité : `/confidentialite`

À vérifier :

- [ ] un seul H1 par page ;
- [ ] titres H2 cohérents ;
- [ ] descriptions uniques ;
- [ ] pas de texte SEO artificiel ;
- [ ] vocabulaire local naturel : DJ mariage, Pas-de-Calais, Arras, Hauts-de-France, Vis-en-Artois.

---

## 3. Ancien site Wix

Statut : à faire quand les accès / URLs sont disponibles.

- [ ] Récupérer l'URL du site Wix actuel.
- [ ] Lister les anciennes pages importantes.
- [ ] Identifier les pages déjà indexées sur Google si possible.
- [ ] Préparer les redirections vers les nouvelles pages.
- [ ] Sauvegarder les contenus utiles avant bascule.

Exemples de mapping :

- ancienne page accueil -> `/`
- ancienne page mariage -> `/mariages`
- ancienne page contact -> `/contact`
- ancienne page galerie -> `/galerie`

---

## 4. Mentions légales et confidentialité

Statut : à compléter.

Informations déjà connues :

- Fréderic WILKOSZ
- 62156 Vis-en-Artois, France
- `djfredmusic@outlook.fr`
- 06 48 13 55 56
- SIREN : 813 426 483
- CODE APE : 9329 Z

À faire :

- [ ] Compléter les mentions légales.
- [ ] Compléter la politique de confidentialité.
- [ ] Décrire l'usage du formulaire de contact.
- [ ] Décrire l'usage des demandes de musique.
- [ ] Préciser la durée de conservation des données.
- [ ] Vérifier si analytics/cookies seront utilisés.

---

## 5. Performance images

Statut : à faire avant mise en ligne.

- [ ] Lister les images réellement utilisées.
- [ ] Supprimer ou ignorer les images non utilisées dans le build final.
- [ ] Compresser les images lourdes.
- [ ] Convertir en WebP si pertinent.
- [ ] Garder les images hero en qualité suffisante.
- [ ] Vérifier la galerie sur mobile.
- [ ] Vérifier le poids des pages principales.

---

## 6. Responsive et accessibilité

Statut : à faire en passe finale.

Pages à vérifier :

- [ ] Accueil
- [ ] Mariages
- [ ] Événements privés
- [ ] Événements pro
- [ ] Prestations
- [ ] Location
- [ ] Galerie
- [ ] Contact
- [ ] Demande musique
- [ ] Admin

Points à vérifier :

- [ ] lisibilité mobile ;
- [ ] pas de texte coupé ;
- [ ] pas de débordement horizontal ;
- [ ] contrastes suffisants ;
- [ ] labels de formulaire ;
- [ ] textes alternatifs des images ;
- [ ] navigation clavier correcte.

---

## 7. Déploiement sur l'hébergement client

Statut : à faire quand les informations d'hébergement sont connues.

À récupérer :

- [ ] hébergeur ;
- [ ] accès FTP / SFTP / panel ;
- [ ] domaine exact ;
- [ ] gestion DNS ;
- [ ] certificat SSL ;
- [ ] possibilité de redirection SPA vers `index.html` ;
- [ ] possibilité backend ou non.

Build :

```bash
npm run build
```

Dossier à mettre en ligne :

```txt
dist/
```

---

## 8. Avant mise en ligne définitive

- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] test des routes directes : `/mariages`, `/contact`, `/galerie`
- [ ] test formulaire contact
- [ ] test demande musique
- [ ] test admin
- [ ] test mobile
- [ ] test partage WhatsApp / Facebook si possible
- [ ] validation client
- [ ] sauvegarde ancien Wix
- [ ] bascule domaine / DNS
