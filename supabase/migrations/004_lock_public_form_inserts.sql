-- ============================================================
-- Fredmusic — Verrouillage des insertions publiques directes
-- À exécuter après 003_form_security.sql
-- ============================================================

-- Les formulaires publics écrivent via l'Edge Function submit-form, qui valide
-- les données, applique un rate limit et utilise la service role côté serveur.
-- Ces policies historiques permettraient sinon de contourner cette fonction
-- avec la clé publishable du front.
DROP POLICY IF EXISTS "anon insert quote_requests" ON quote_requests;
DROP POLICY IF EXISTS "anon insert music_requests" ON music_requests;
