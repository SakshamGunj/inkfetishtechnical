-- 1. FORCE NOT NULL on internal columns if they are causing issues (optional, but good safety)
-- ALTER TABLE public.anthology_submissions ALTER COLUMN created_at SET DEFAULT now();

-- 2. RESET RLS (The Big Hammer)
ALTER TABLE public.anthology_submissions DISABLE ROW LEVEL SECURITY;
-- note: Disabling RLS makes it public by default if no other network restrictions apply. 
-- However, we usually want it ENABLED with policies. 
-- Let's Re-ENABLE and add a "Select All" policy.

ALTER TABLE public.anthology_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow Public Read" ON public.anthology_submissions;
CREATE POLICY "Allow Public Read" ON public.anthology_submissions
FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Allow Public Insert" ON public.anthology_submissions;
CREATE POLICY "Allow Public Insert" ON public.anthology_submissions
FOR INSERT
WITH CHECK (true);

-- 3. INSERT TEST DATA (To verify if the table is just empty)
INSERT INTO public.anthology_submissions (
    real_name, 
    book_name, 
    is_pen_name, 
    whatsapp, 
    poem1_title, 
    poem1_theme, 
    poem1_content,
    love_token
) 
VALUES (
    'Test Author', 
    'Test Pen Name', 
    true, 
    '1234567890', 
    'The Winter Test', 
    'Testing', 
    'This is a test poem.\nTo verify the database connection.\nIf you see this, it works.',
    'TEST-1234'
);
