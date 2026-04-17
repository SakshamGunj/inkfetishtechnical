-- Create table for IWL Anthology Poetry
CREATE TABLE IF NOT EXISTS public.iwl_anthology_poetry (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT,
    content TEXT NOT NULL,
    author_name TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.iwl_anthology_poetry ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read an anthology item if they have the ID
CREATE POLICY "Allow public read access" ON public.iwl_anthology_poetry
    FOR SELECT USING (true);

-- Policy: Anyone can insert (for the generator page)
-- Note: In a production environment, you might want to restrict this to authenticated admins.
CREATE POLICY "Allow public insert" ON public.iwl_anthology_poetry
    FOR INSERT WITH CHECK (true);
