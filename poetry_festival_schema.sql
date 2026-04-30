-- 1. Enable RLS on the registrations table
ALTER TABLE poetry_festival_s2_registrations ENABLE ROW LEVEL SECURITY;

-- 2. Create a policy that allows anyone (public) to insert their registration details
DROP POLICY IF EXISTS "Allow public inserts on registrations" ON poetry_festival_s2_registrations;
CREATE POLICY "Allow public inserts on registrations" 
ON poetry_festival_s2_registrations
FOR INSERT 
TO public
WITH CHECK (true);

-- 3. Create a policy that allows anyone to read (for the admin dashboard)
DROP POLICY IF EXISTS "Allow public reads on registrations" ON poetry_festival_s2_registrations;
CREATE POLICY "Allow public reads on registrations" 
ON poetry_festival_s2_registrations
FOR SELECT 
TO public
USING (true);

-- 4. Do the exact same for the main submissions table to prevent errors later!
ALTER TABLE poetry_festival_s2_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public inserts on submissions" ON poetry_festival_s2_submissions;
CREATE POLICY "Allow public inserts on submissions" 
ON poetry_festival_s2_submissions
FOR INSERT 
TO public
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public reads on submissions" ON poetry_festival_s2_submissions;
CREATE POLICY "Allow public reads on submissions" 
ON poetry_festival_s2_submissions
FOR SELECT 
TO public
USING (true);
