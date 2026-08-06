import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

(async function run() {
  const payload = {
    artist: 'TestArtist E2E',
    song_title: 'TestSong E2E',
    guest_name: 'Automated Test',
    message: 'Submission test via assistant',
    event_id: null,
  };

  const { data, error } = await supabase.from('music_requests').insert([payload]).select();
  console.log('ERROR:', error);
  console.log('DATA:', JSON.stringify(data, null, 2));
})();
