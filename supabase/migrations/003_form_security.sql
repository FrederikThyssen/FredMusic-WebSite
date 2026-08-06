-- ============================================================
-- Fredmusic — Sécurité formulaires publics
-- À exécuter après 002_hardening.sql
-- ============================================================

CREATE TABLE IF NOT EXISTS form_rate_limits (
  key text PRIMARY KEY,
  window_start timestamptz NOT NULL DEFAULT now(),
  request_count integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE form_rate_limits ENABLE ROW LEVEL SECURITY;

-- Aucune policy publique : seule l'Edge Function avec service role doit accéder à cette table.
