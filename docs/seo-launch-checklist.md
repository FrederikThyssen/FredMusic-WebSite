# Roadmap finalisation et mise en ligne Fredmusic

## Objectif

Finaliser le site Fredmusic pour remplacer proprement le site Wix actuel avec :

- un site vitrine premium ;
- des pages cohérentes et responsive ;
- un SEO propre ;
- des formulaires mockés puis connectables au backend ;
- une base admin simple ;
- une mise en ligne fiable sur l'hébergement du client.

---

## État global estimé

### Version vitrine statique

Statut estimé : 84%.

Il reste environ 16% pour obtenir une version vitrine propre, présentable au client et publiable sans backend réel.

### Version complète avec backend/admin réel

Statut estimé : 50%.

Il reste environ 50% pour obtenir une version complète avec backend réel, admin sécurisé, formulaires enregistrés en base et notifications email.

---

## 1. Pages vitrines

Statut : avancé.

- [x] Accueil.
- [x] Mariages.
- [x] Événements privés.
- [ ] Événements professionnels / publics à finaliser quand les infos client sont disponibles.
- [x] Prestations.
- [x] Location / matériel professionnel.
- [x] Galerie.
- [x] Contact.
- [x] Demande musique.
- [x] Admin mocké.

À faire :

- [ ] Relire tous les textes visibles.
- [ ] Uniformiser les titres et CTA.
- [ ] Vérifier la cohérence visuelle entre pages sombres.
- [ ] Revoir la page Événements pro avec les vraies infos client.
- [ ] Faire valider les pages principales par le client.

Priorité immédiate :

1. Responsive mobile.
2. Galerie / tri photos.
3. Page Événements pro quand les infos arrivent.

---

## 2. Galerie et médias

Statut : base avancée, tri à refaire.

- [x] Catégorie Mariages réalisés.
- [x] Catégorie Nos différents événements.
- [x] Catégorie Vidéos prévue.
- [ ] Ajouter les vidéos quand elles seront disponibles.
- [ ] Trier les photos avec le client.
- [ ] Supprimer les photos moyennes de l'affichage.
- [ ] Vérifier les titres et alt des photos retenues.
- [ ] Optimiser les images lourdes.
- [ ] Convertir certaines images en WebP si pertinent.

À noter :

- Plusieurs photos non utilisées restent volontairement hors commit.
- La galerie est fonctionnelle mais pas encore optimisée pour une mise en ligne finale.

---

## 3. Formulaires et admin mockés

Statut : mock fonctionnel.

- [x] Formulaire Contact.
- [x] Formulaire demande musique.
- [x] Admin mocké.
- [x] Demandes de devis visibles dans admin.
- [x] Demandes de musique visibles dans admin.
- [x] Statuts mockés : traité / refusé / accepté / joué.
- [x] Persistance locale via `localStorage`.

Limites actuelles :

- [ ] Pas de vraie base de données.
- [ ] Pas d'envoi email réel.
- [ ] Pas d'authentification admin.
- [ ] Les données restent locales au navigateur.

À faire plus tard :

- [ ] Brancher une vraie base.
- [ ] Ajouter une connexion admin.
- [ ] Envoyer les demandes de devis par email.
- [ ] Remplacer `localStorage` par backend réel.

---

## 4. Backend réel

Statut : planifié, pas encore développé.

- [x] Plan backend documenté dans `docs/backend-plan.md`.
- [x] Décision métier : pas de CMS lourd au départ.
- [x] Admin centré sur devis + demandes musique.
- [ ] Confirmer les contraintes de l'hébergeur client.
- [ ] Choisir backend réel : Supabase, service hébergeur, ou autre.
- [ ] Créer tables `quote_requests`.
- [ ] Créer tables `music_requests`.
- [ ] Ajouter authentification admin.
- [ ] Ajouter règles de sécurité.
- [ ] Ajouter service email.
- [ ] Migrer Contact vers backend réel.
- [ ] Migrer Demande musique vers backend réel.
- [ ] Migrer Admin vers backend réel.

Priorité :

Le backend réel vient après validation du site vitrine et clarification de l'hébergeur.

---

## 5. SEO

Statut : fondation faite.

- [x] Balises SEO principales dans `index.html`.
- [x] Open Graph.
- [x] Twitter Card.
- [x] `robots.txt`.
- [x] `sitemap.xml`.
- [x] Données SEO par page.
- [x] Application automatique des metas par route.

À faire :

- [ ] Confirmer le domaine final du client.
- [ ] Remplacer `https://www.fredmusic.fr` si le domaine réel est différent.
- [ ] Vérifier un seul H1 par page.
- [ ] Vérifier titres H2.
- [ ] Vérifier descriptions uniques.
- [ ] Ajouter redirections depuis les anciennes URLs Wix.
- [ ] Tester les aperçus de partage sociaux.

---

## 6. Mentions légales et confidentialité

Statut : première version intégrée.

Informations connues :

- Fréderic WILKOSZ.
- 62156 Vis-en-Artois, France.
- `djfredmusic@outlook.fr`.
- 06 48 13 55 56.
- SIREN : 813 426 483.
- CODE APE : 9329 Z.

Fait :

- [x] Compléter mentions légales.
- [x] Compléter politique de confidentialité.
- [x] Décrire formulaire contact.
- [x] Décrire demande musique.
- [x] Décrire durée de conservation des données.

À faire :

- [ ] Ajouter le nom exact de l'hébergeur.
- [ ] Ajouter les informations légales complètes de l'hébergeur.
- [ ] Vérifier cookies / analytics.

---

## 7. Responsive et accessibilité

Statut : deuxième passe technique en cours.

Pages à vérifier :

- [ ] Accueil.
- [ ] Mariages.
- [ ] Événements privés.
- [ ] Événements pro.
- [ ] Prestations.
- [ ] Location.
- [ ] Galerie.
- [ ] Contact.
- [ ] Demande musique.
- [ ] Admin.

Points à vérifier :

- [x] Première correction globale navbar / hero / boutons.
- [x] Première correction mobile Contact / Demande musique / Admin / Galerie.
- [x] Deuxième correction mobile Location / Événements privés / Événements pro.
- [x] Protection des textes longs sur Contact et Demande musique.
- [ ] Mobile 360 px à valider visuellement.
- [ ] Mobile 390 px à valider visuellement.
- [ ] Tablette.
- [ ] Desktop.
- [ ] Pas de débordement horizontal.
- [ ] Pas de texte coupé.
- [ ] Formulaires utilisables au doigt.
- [ ] Boutons assez grands.
- [ ] Contrastes suffisants.
- [ ] Labels formulaires.
- [ ] Alt images importantes.
- [ ] Navigation clavier basique.

Priorité haute :

- `/demande-musique`, car les invités l'utiliseront surtout sur smartphone.
- `/contact`.
- `/galerie`.

---

## 8. Performance

Statut : première optimisation images faite.

- [x] Lister les images utilisées réellement.
- [x] Identifier les images lourdes.
- [x] Compresser les images hero principales.
- [x] Créer des versions WebP pour les plus grosses images utilisées.
- [x] Première compression galerie.
- [x] Convertir en WebP si utile.
- [ ] Vérifier lazy loading.
- [ ] Vérifier poids du build.
- [ ] Vérifier Lighthouse.
- [ ] Supprimer les imports inutiles.

Priorité :

La performance images sera importante avant publication, surtout mobile.

---

## 9. Ancien site Wix

Statut : à faire quand les informations sont disponibles.

- [ ] Récupérer l'URL du Wix actuel.
- [ ] Lister les pages existantes.
- [ ] Identifier les pages importantes Google.
- [ ] Préparer redirections.
- [ ] Sauvegarder textes / photos utiles.
- [ ] Planifier la bascule.

---

## 10. Hébergement et domaine

Statut : à clarifier.

Le client possède déjà :

- un hébergeur ;
- un domaine.

À récupérer :

- [ ] nom de l'hébergeur ;
- [ ] accès FTP / SFTP / panel ;
- [ ] domaine exact ;
- [ ] accès DNS ;
- [ ] SSL ;
- [ ] support redirection SPA ;
- [ ] support backend ou non ;
- [ ] email lié au domaine ou non.

Build :

```bash
npm run build
```

Dossier à mettre en ligne :

```txt
dist/
```

---

## 11. Tests finaux avant mise en ligne

- [ ] `npm run lint`.
- [ ] `npm run build`.
- [ ] Test route directe `/`.
- [ ] Test route directe `/mariages`.
- [ ] Test route directe `/contact`.
- [ ] Test route directe `/galerie`.
- [ ] Test route directe `/demande-musique`.
- [ ] Test formulaire contact.
- [ ] Test demande musique.
- [ ] Test admin.
- [ ] Test mobile.
- [ ] Test partage social.
- [ ] Validation client.
- [ ] Sauvegarde Wix.
- [ ] Bascule domaine.

---

## Priorités immédiates

1. Faire la passe responsive mobile globale.
2. Trier et optimiser la galerie.
3. Compléter la page Événements pro quand les infos client arrivent.
4. Clarifier hébergement et domaine.
5. Clarifier hébergement et domaine.
6. Décider backend réel après validation vitrine.
