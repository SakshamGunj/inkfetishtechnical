import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_VITE_SUPABASE_ANON_KEY;

// Check if we have the required variables
const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
    console.warn('⚠️ Supabase Environment Variables are missing. Image uploads and database features will be disabled.');
}

// Only create the client if we have a valid URL to prevent "supabaseUrl is required" crash
export const supabase = isSupabaseConfigured 
    ? createClient(supabaseUrl!, supabaseAnonKey!)
    : (null as any); // Type cast as any to prevent breakages in files that import it
