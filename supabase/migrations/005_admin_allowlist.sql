-- ============================================================
-- Fredmusic — Accès admin par allowlist
-- À exécuter après 004_lock_public_form_inserts.sql
-- ============================================================

CREATE TABLE IF NOT EXISTS admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM admin_users
    WHERE user_id = auth.uid()
      AND lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

REVOKE ALL ON FUNCTION is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;

DROP POLICY IF EXISTS "auth full quote_requests" ON quote_requests;
DROP POLICY IF EXISTS "admin full quote_requests" ON quote_requests;
CREATE POLICY "admin full quote_requests" ON quote_requests
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "auth full music_requests" ON music_requests;
DROP POLICY IF EXISTS "admin full music_requests" ON music_requests;
CREATE POLICY "admin full music_requests" ON music_requests
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "auth full active_events" ON active_events;
DROP POLICY IF EXISTS "admin full active_events" ON active_events;
CREATE POLICY "admin full active_events" ON active_events
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "auth full settings" ON settings;
DROP POLICY IF EXISTS "admin full settings" ON settings;
CREATE POLICY "admin full settings" ON settings
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

CREATE OR REPLACE FUNCTION activate_event(p_event_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT is_admin() THEN
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

-- Bootstrap à exécuter une seule fois après création du compte admin Supabase :
-- INSERT INTO admin_users (user_id, email)
-- SELECT id, email
-- FROM auth.users
-- WHERE lower(email) = lower('adresse-admin@exemple.fr')
-- ON CONFLICT (user_id) DO UPDATE SET email = excluded.email;
