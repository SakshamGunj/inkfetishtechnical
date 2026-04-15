-- 1. ADD MISSING COLUMNS
ALTER TABLE public.iwl_registrations ADD COLUMN IF NOT EXISTS order_id TEXT;
ALTER TABLE public.iwl_registrations ADD COLUMN IF NOT EXISTS payment_session_id TEXT;
ALTER TABLE public.iwl_registrations ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';

-- 2. MAKE CATEGORY OPTIONAL
ALTER TABLE public.iwl_registrations ALTER COLUMN category DROP NOT NULL;
ALTER TABLE public.iwl_registrations DROP CONSTRAINT IF EXISTS iwl_registrations_category_check;
ALTER TABLE public.iwl_registrations ADD CONSTRAINT iwl_registrations_category_check 
    CHECK (category IN ('poetry', 'short_story', 'novel') OR category IS NULL);

-- 3. ENABLE RLS
ALTER TABLE public.iwl_registrations ENABLE ROW LEVEL SECURITY;

-- 4. POLICIES (CRITICAL: ALLOW READING DATA)
DROP POLICY IF EXISTS "Allow public inserts" ON public.iwl_registrations;
CREATE POLICY "Allow public inserts" ON public.iwl_registrations FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public updates" ON public.iwl_registrations;
CREATE POLICY "Allow public updates" ON public.iwl_registrations FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public select" ON public.iwl_registrations;
CREATE POLICY "Allow public select" ON public.iwl_registrations FOR SELECT USING (true);
