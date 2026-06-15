-- Schema for Open Mic Registrations

CREATE TABLE IF NOT EXISTS public.open_mic_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    act_type TEXT NOT NULL,
    instagram TEXT,
    payment_order_id TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.open_mic_registrations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (since registration form is public)
CREATE POLICY "Allow public insert to open_mic_registrations"
ON public.open_mic_registrations
FOR INSERT
TO public
WITH CHECK (true);

-- Allow viewing own registration (if needed via service role, no public select needed for now)
CREATE POLICY "Allow service role full access"
ON public.open_mic_registrations
TO service_role
USING (true)
WITH CHECK (true);
