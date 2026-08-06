-- ============================================================
-- Fredmusic — Durcissement pré-livraison
-- À exécuter après 001_initial.sql
-- ============================================================

-- Nettoyer tout état existant qui violerait la future contrainte "une soirée active max".
WITH ranked_active_events AS (
  SELECT
    id,
    row_number() OVER (ORDER BY created_at DESC, id DESC) AS active_rank
  FROM active_events
  WHERE is_active = true
)
UPDATE active_events
SET is_active = false
WHERE id IN (
  SELECT id
  FROM ranked_active_events
  WHERE active_rank > 1
);

-- Contraintes applicatives côté base : elles complètent la validation front.
ALTER TABLE quote_requests
  ADD CONSTRAINT quote_requests_name_length
    CHECK (char_length(trim(name)) BETWEEN 2 AND 100),
  ADD CONSTRAINT quote_requests_email_format
    CHECK (char_length(email) <= 254 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  ADD CONSTRAINT quote_requests_phone_length
    CHECK (phone IS NULL OR char_length(phone) <= 30),
  ADD CONSTRAINT quote_requests_event_type_allowed
    CHECK (event_type IN ('mariage', 'evenement-prive', 'evenement-pro', 'location', 'autre')),
  ADD CONSTRAINT quote_requests_location_length
    CHECK (location IS NULL OR char_length(location) <= 160),
  ADD CONSTRAINT quote_requests_guests_count_range
    CHECK (guests_count IS NULL OR (guests_count BETWEEN 1 AND 5000)),
  ADD CONSTRAINT quote_requests_message_length
    CHECK (message IS NULL OR char_length(message) <= 2000);

ALTER TABLE music_requests
  ADD CONSTRAINT music_requests_guest_name_length
    CHECK (guest_name IS NULL OR char_length(guest_name) <= 80),
  ADD CONSTRAINT music_requests_artist_length
    CHECK (char_length(trim(artist)) BETWEEN 1 AND 120),
  ADD CONSTRAINT music_requests_song_title_length
    CHECK (char_length(trim(song_title)) BETWEEN 1 AND 160),
  ADD CONSTRAINT music_requests_message_length
    CHECK (message IS NULL OR char_length(message) <= 500);

ALTER TABLE active_events
  ADD CONSTRAINT active_events_name_length
    CHECK (char_length(trim(name)) BETWEEN 1 AND 160);

CREATE UNIQUE INDEX IF NOT EXISTS idx_active_events_single_active
  ON active_events ((is_active))
  WHERE is_active = true;

-- Activation atomique d'une soirée QR : évite les états intermédiaires côté client.
CREATE OR REPLACE FUNCTION activate_event(p_event_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.role() <> 'authenticated' THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM active_events WHERE id = p_event_id) THEN
    RAISE EXCEPTION 'Event not found';
  END IF;

  UPDATE active_events
  SET is_active = false
  WHERE is_active = true;

  UPDATE active_events
  SET is_active = true,
      archived_at = NULL
  WHERE id = p_event_id;
END;
$$;

REVOKE ALL ON FUNCTION activate_event(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION activate_event(uuid) TO authenticated;
