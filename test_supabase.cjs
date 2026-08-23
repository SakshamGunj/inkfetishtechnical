const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const { data, error } = await supabase.from('author_profiles').select('*');
  if (error) console.error(error);
  else {
    console.log(`Supabase authors: ${data.length}`);
    console.log(data);
  }
}
run();
