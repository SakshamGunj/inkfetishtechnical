const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const { data, error } = await supabase.from('author_profiles').select('*').ilike('name', '%sharmila%');
  console.log("Sharmila:", data, error);
  
  const { data: d2, error: e2 } = await supabase.from('author_profiles').select('*').ilike('name', '%nalaxy%');
  console.log("Nalaxy:", d2, e2);

  const { data: d3, error: e3 } = await supabase.from('author_profiles').select('*');
  console.log("All authors count:", d3?.length);
  // find anything similar
  if (d3) {
    const similar = d3.filter(a => JSON.stringify(a).toLowerCase().includes('sharmila') || JSON.stringify(a).toLowerCase().includes('nalax'));
    console.log("Similar matches:", similar.map(s => s.name || s.username));
  }
}
run();
