-- Enable RLS on the table (if not already enabled)
ALTER TABLE public.anthology_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public read access (SELECT) to anthology_submissions
DROP POLICY IF EXISTS "Public Read Access" ON public.anthology_submissions;
CREATE POLICY "Public Read Access" ON public.anthology_submissions FOR SELECT USING (true);

-- Allow public insert access (if needed for the form to work without auth)
-- Existing form likely works because of anon key, but policy is needed if RLS is on.
DROP POLICY IF EXISTS "Public Insert Access" ON public.anthology_submissions;
CREATE POLICY "Public Insert Access" ON public.anthology_submissions FOR INSERT WITH CHECK (true);
