-- Create a table for Writer's Vault registrations
CREATE TABLE IF NOT EXISTS public.writers_vault_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    is_international BOOLEAN DEFAULT FALSE,
    access_granted BOOLEAN DEFAULT TRUE
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.writers_vault_users ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (so the form works for everyone)
CREATE POLICY "Allow public inserts" ON public.writers_vault_users FOR INSERT WITH CHECK (true);
