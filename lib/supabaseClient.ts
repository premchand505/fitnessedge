import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    'Supabase URL or Anon Key is missing. Visit counter will not work.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);