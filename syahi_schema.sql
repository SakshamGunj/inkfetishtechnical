-- Create table for Syahi Volume 1 orders
CREATE TABLE IF NOT EXISTS public.syahi_orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    order_id TEXT UNIQUE NOT NULL,
    cf_order_id TEXT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    amount DECIMAL NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'PAID', 'failed'
    bought_certificate BOOLEAN DEFAULT FALSE,
    bought_portfolio BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security
ALTER TABLE public.syahi_orders ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for the checkout form)
CREATE POLICY "Allow public inserts" ON public.syahi_orders 
    FOR INSERT 
    WITH CHECK (true);

-- Allow service role to select and update (for verification)
CREATE POLICY "Allow service role management" ON public.syahi_orders
    USING (true);
