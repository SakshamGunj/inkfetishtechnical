-- Allow public updates to iwl_registrations (Required for UPSERT operations)
-- You already have "Allow public inserts". This adds UPDATE permission.

CREATE POLICY "Allow public updates" ON public.iwl_registrations
FOR UPDATE USING (true) WITH CHECK (true);
