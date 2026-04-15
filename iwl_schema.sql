-- Create table for Indian Writers League registrations
CREATE TABLE public.iwl_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    category TEXT CHECK (category IN ('poetry', 'short_story', 'novel')),
    plan_amount INTEGER NOT NULL CHECK (plan_amount IN (299, 499)),
    submission_count INTEGER NOT NULL CHECK (submission_count IN (1, 2)),
    submission_1_title TEXT,
    submission_1_content TEXT,
    submission_2_title TEXT,
    submission_2_content TEXT,
    payment_status TEXT DEFAULT 'pending', -- 'pending', 'paid'
    order_id TEXT,
    payment_session_id TEXT,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable Row Level Security
ALTER TABLE public.iwl_registrations ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for the registration form)
CREATE POLICY "Allow public inserts" ON public.iwl_registrations 
    FOR INSERT 
    WITH CHECK (true);

-- Allow public updates (for submissions)
CREATE POLICY "Allow public updates" ON public.iwl_registrations
    FOR UPDATE
    USING (true);

-- Allow read access only to service role (admin) or maybe public if needed, 
-- but usually for backend/admin dashboard. For now, we'll keep it secure.
-- Only allows reading own data if we had auth, but since it's anonymous submission:
-- We might want a policy for reading one's own submission via some token later, 
-- but for now, just insert is critical.
