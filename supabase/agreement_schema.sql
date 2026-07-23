-- Schema for Agreement Generator System

-- Create agreements table
CREATE TABLE IF NOT EXISTS public.agreements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    amount TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create agreement_parties table
CREATE TABLE IF NOT EXISTS public.agreement_parties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agreement_id UUID NOT NULL REFERENCES public.agreements(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    token UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    has_signed BOOLEAN NOT NULL DEFAULT false,
    signed_at TIMESTAMP WITH TIME ZONE,
    signature_data TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)

-- Enable RLS on both tables
ALTER TABLE public.agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agreement_parties ENABLE ROW LEVEL SECURITY;

-- Policies for agreements table
-- Anyone can create an agreement (public access for this feature as requested, or adjust if needed)
CREATE POLICY "Allow public insert to agreements" 
ON public.agreements FOR INSERT 
TO public
WITH CHECK (true);

-- Anyone can read an agreement (needed for the signing page and final certificate)
CREATE POLICY "Allow public select on agreements" 
ON public.agreements FOR SELECT 
TO public
USING (true);

-- Allow public update to agreements (to change status to completed)
CREATE POLICY "Allow public update to agreements" 
ON public.agreements FOR UPDATE 
TO public
USING (true);

-- Policies for agreement_parties table
-- Anyone can insert parties when creating an agreement
CREATE POLICY "Allow public insert to agreement_parties" 
ON public.agreement_parties FOR INSERT 
TO public
WITH CHECK (true);

-- Anyone can read parties (needed to show who has signed)
CREATE POLICY "Allow public select on agreement_parties" 
ON public.agreement_parties FOR SELECT 
TO public
USING (true);

-- Anyone can update a party (to sign it)
CREATE POLICY "Allow public update to agreement_parties" 
ON public.agreement_parties FOR UPDATE 
TO public
USING (true);

-- Grant access to anon role
GRANT ALL ON public.agreements TO anon, authenticated;
GRANT ALL ON public.agreement_parties TO anon, authenticated;
