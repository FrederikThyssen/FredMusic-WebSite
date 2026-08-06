-- ============================================================
-- Fredmusic — Migration initiale
-- À exécuter dans : Supabase Dashboard → SQL Editor
-- ============================================================

-- ── Tables ──────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS quote_requests (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text NOT NULL,
  email        text NOT NULL,
  phone        text,
  event_type   text NOT NULL,
  event_date   date,
  location     text,
  guests_count integer,
  message      text,
  status       text NOT NULL DEFAULT 'pending'
               CHECK (status IN ('pending', 'accepted', 'refused')),
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS music_requests (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id   uuid,
  guest_name text,
  artist     text NOT NULL,
  song_title text NOT NULL,
  message    text,
  status     text NOT NULL DEFAULT 'pending'
             CHECK (status IN ('pending', 'accepted', 'played', 'refused')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS active_events (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  is_active   boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now(),
  archived_at timestamptz
);

-- Clé étrangère optionnelle (active après création des deux tables)
ALTER TABLE music_requests
  ADD CONSTRAINT fk_music_event
  FOREIGN KEY (event_id) REFERENCES active_events(id)
  ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS settings (
  key        text PRIMARY KEY,
  value      text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Valeurs par défaut des paramètres
INSERT INTO settings (key, value) VALUES
  ('gallery_cloud_url', NULL),
  ('google_place_id',   'ChIJiwj_iiFL3UcR67d2OOiMcAk')
ON CONFLICT (key) DO NOTHING;

-- ── Row Level Security ───────────────────────────────────────

ALTER TABLE quote_requests  ENABLE ROW LEVEL SECURITY;
ALTER TABLE music_requests  ENABLE ROW LEVEL SECURITY;
ALTER TABLE active_events   ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings        ENABLE ROW LEVEL SECURITY;

-- quote_requests : visiteurs peuvent créer, admins peuvent tout faire
CREATE POLICY "anon insert quote_requests" ON quote_requests
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "auth full quote_requests" ON quote_requests
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- music_requests : visiteurs peuvent créer, admins peuvent tout faire
CREATE POLICY "anon insert music_requests" ON music_requests
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "auth full music_requests" ON music_requests
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- active_events : lecture publique (soirée active), admins tout
CREATE POLICY "anon read active_events" ON active_events
  FOR SELECT TO anon USING (is_active = true);

CREATE POLICY "auth full active_events" ON active_events
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- settings : lecture publique, écriture admins
CREATE POLICY "anon read settings" ON settings
  FOR SELECT TO anon USING (true);

CREATE POLICY "auth full settings" ON settings
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ── Indexes ──────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_quote_requests_status     ON quote_requests (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_music_requests_event_id   ON music_requests (event_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_music_requests_status     ON music_requests (status);
CREATE INDEX IF NOT EXISTS idx_active_events_is_active   ON active_events (is_active);
