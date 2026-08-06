# Roadmap finalisation et mise en ligne Fredmusic

## Objectif

Finaliser le site Fredmusic pour remplacer proprement le site Wix actuel avec :

- un site vitrine premium ;
- des pages cohérentes et responsive ;
- un SEO propre ;
- des formulaires connectés à Supabase ;
- une base admin simple connectée au backend ;
- une mise en ligne fiable sur l'hébergement du client.

---

## État global estimé

### Version vitrine statique

Statut estimé : 86%.

Il reste environ 14% pour obtenir une version vitrine propre, présentable au client et publiable sans backend réel.

### Version complète avec backend/admin réel

Statut estimé : 75%.

Le backend Supabase, l'auth admin et l'enregistrement des formulaires sont en place. Il reste principalement le durcissement anti-spam/rate limit, les notifications email, la CI, le monitoring et la validation de déploiement.

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
- [x] Admin connecté à Supabase.

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

- [x] Section unique Nos différents événements réalisés.
- [x] Photos mariage fusionnées dans cette section.
- [x] Mention Mariage ajoutée à la liste des types d'événements.
- [x] Catégorie vidéo vide retirée pour éviter une promesse non tenue.
- [ ] Ajouter une catégorie vidéo uniquement quand les fichiers seront disponibles et validés.
- [ ] Trier les photos avec le client.
- [ ] Supprimer les photos moyennes de l'affichage.
- [ ] Vérifier les titres et alt des photos retenues.
- [ ] Optimiser les images lourdes.
- [ ] Convertir certaines images en WebP si pertinent.

À noter :

- Plusieurs photos non utilisées restent volontairement hors commit.
- La galerie est fonctionnelle mais pas encore optimisée pour une mise en ligne finale.

---

## 3. Formulaires et admin

Statut : backend Supabase fonctionnel, durcissement serveur déployé.

- [x] Formulaire Contact.
- [x] Formulaire demande musique.
- [x] Admin protégé par Supabase Auth.
- [x] Demandes de devis visibles dans admin.
- [x] Demandes de musique visibles dans admin.
- [x] Statuts réels : traité / refusé / accepté / joué.
- [x] Persistance Supabase.

Limites actuelles :

- [x] Base Supabase réelle.
- [x] Envoi email réel ajouté via Resend pour les devis.
- [x] Envoi email Resend validé sur l'adresse autorisée du compte.
- [x] Authentification admin Supabase.
- [x] Edge Function de validation/rate limit ajoutée.
- [x] Edge Function déployée sur Supabase.
- [x] Tests curl Contact/Demande musique validés.
- [x] Rate limit validé.

Prochaines étapes :

- [x] Brancher une vraie base.
- [x] Ajouter une connexion admin.
- [x] Envoyer les demandes de devis par email.
- [x] Utiliser Supabase pour les données transactionnelles.

---

## 4. Backend réel

Statut : Supabase implémenté, durcissement et notifications à terminer.

- [x] Plan backend documenté dans `docs/backend-plan.md`.
- [x] Décision métier : pas de CMS lourd au départ.
- [x] Admin centré sur devis + demandes musique.
- [x] Décision : sortir de Wix pour le nouveau site.
- [x] Décision : domaine conservé chez Gandi.
- [x] Choix recommandé : Supabase pour base/auth/admin.
- [x] Créer le projet Supabase.
- [x] Créer tables `quote_requests`.
- [x] Créer tables `music_requests`.
- [x] Créer table ou réglage `active_event`.
- [x] Ajouter authentification admin.
- [x] Ajouter règles de sécurité RLS de base.
- [x] Exécuter la migration de durcissement `002_hardening.sql`.
- [x] Exécuter la migration formulaire `003_form_security.sql`.
- [x] Déployer l'Edge Function `submit-form`.
- [x] Ajouter service email Resend pour les devis.
- [ ] Remplacer l'expéditeur temporaire par `contact@fredmusic.fr` après validation DNS du domaine.
- [x] Migrer Contact vers backend réel.
- [x] Migrer Demande musique vers backend réel.
- [x] Migrer Admin vers backend réel.

Décision QR code :

- URL permanente : `/demande-musique`.
- QR code unique réutilisable pour plusieurs soirées.
- L'admin devra permettre de définir une soirée active et d'archiver/vider les demandes.

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

- [x] Domaine final confirmé : `fredmusic.fr`.
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

Statut : passe technique globale avancée.

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
- [x] Ajustements CTA globaux et boutons pleine largeur sur mobile.
- [x] Ajustement page Mariages pour petits écrans sans changer la maquette.
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

Statut : stratégie de sortie Wix confirmée.

- [x] Site actuel hébergé sur Wix.
- [x] Décision : sortir de Wix et conserver le domaine.
- [ ] Récupérer l'URL exacte du Wix actuel.
- [ ] Lister les pages existantes.
- [ ] Identifier les pages importantes Google.
- [ ] Préparer redirections.
- [ ] Sauvegarder textes / photos utiles.
- [ ] Planifier la bascule.

---

## 10. Hébergement et domaine

Statut : domaine clarifié, hébergement cible à choisir.

Informations confirmées :

- site actuel hébergé sur Wix ;
- domaine chez Gandi ;
- domaine à conserver : `fredmusic.fr` ;
- email souhaité : `contact@fredmusic.fr`.

À récupérer :

- [x] domaine exact ;
- [x] registrar du domaine : Gandi.
- [ ] accès Gandi ;
- [ ] choisir nouvel hébergement frontend ;
- [ ] SSL ;
- [ ] support redirection SPA ;
- [ ] configurer email `contact@fredmusic.fr`.
- [ ] configurer MX / SPF / DKIM / DMARC.
- [ ] connecter le domaine au nouvel hébergement.

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
4. Valider l'envoi email Resend en production.
5. Choisir le nouvel hébergement frontend.
6. Préparer la bascule Gandi / Wix.
