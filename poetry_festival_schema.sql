-- ============================================================
-- Poetry Festival S2 — Payment & Submissions Schema
-- Run this entire file in your Supabase SQL Editor
-- ============================================================

-- 1. PAYMENTS TABLE — tracks every Cashfree order
CREATE TABLE IF NOT EXISTS poetry_festival_s2_payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT UNIQUE NOT NULL,       -- Cashfree order_id (e.g. pfs2_1234_abc)
  cf_order_id TEXT,                    -- Cashfree internal cf_order_id
  email TEXT NOT NULL,
  name TEXT,
  whatsapp TEXT,
  plan TEXT NOT NULL DEFAULT 'single', -- 'single' (₹299) or 'double' (₹399)
  amount NUMERIC,
  status TEXT NOT NULL DEFAULT 'PENDING', -- PENDING | PAID | FAILED | EXPIRED
  poems_submitted INTEGER DEFAULT 0,  -- 0, 1, or 2
  poem_1_id UUID REFERENCES poetry_festival_s2_submissions(id),
  poem_2_id UUID REFERENCES poetry_festival_s2_submissions(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable RLS on payments table
ALTER TABLE poetry_festival_s2_payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public inserts on payments" ON poetry_festival_s2_payments;
CREATE POLICY "Allow public inserts on payments"
ON poetry_festival_s2_payments FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public reads on payments" ON poetry_festival_s2_payments;
CREATE POLICY "Allow public reads on payments"
ON poetry_festival_s2_payments FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Allow public updates on payments" ON poetry_festival_s2_payments;
CREATE POLICY "Allow public updates on payments"
ON poetry_festival_s2_payments FOR UPDATE TO public USING (true);

-- 3. Add order_id and plan columns to submissions table (if they don't exist)
ALTER TABLE poetry_festival_s2_submissions 
  ADD COLUMN IF NOT EXISTS order_id TEXT,
  ADD COLUMN IF NOT EXISTS poem_number INTEGER DEFAULT 1;

-- 4. RLS on registrations table
ALTER TABLE poetry_festival_s2_registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public inserts on registrations" ON poetry_festival_s2_registrations;
CREATE POLICY "Allow public inserts on registrations" 
ON poetry_festival_s2_registrations FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public reads on registrations" ON poetry_festival_s2_registrations;
CREATE POLICY "Allow public reads on registrations" 
ON poetry_festival_s2_registrations FOR SELECT TO public USING (true);

-- 5. RLS on submissions table
ALTER TABLE poetry_festival_s2_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public inserts on submissions" ON poetry_festival_s2_submissions;
CREATE POLICY "Allow public inserts on submissions" 
ON poetry_festival_s2_submissions FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public reads on submissions" ON poetry_festival_s2_submissions;
CREATE POLICY "Allow public reads on submissions" 
ON poetry_festival_s2_submissions FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Allow public updates on submissions" ON poetry_festival_s2_submissions;
CREATE POLICY "Allow public updates on submissions" 
ON poetry_festival_s2_submissions FOR UPDATE TO public USING (true);
