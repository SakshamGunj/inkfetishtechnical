-- Table: author_profiles
CREATE TABLE IF NOT EXISTS author_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    bio TEXT,
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: author_books
CREATE TABLE IF NOT EXISTS author_books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID NOT NULL REFERENCES author_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    isbn TEXT,
    price NUMERIC NOT NULL DEFAULT 0, -- MRP
    custom_expenses JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of { name: string, amount: number }
    royalty_percentage NUMERIC NOT NULL DEFAULT 0,
    format TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: author_sales_reports
CREATE TABLE IF NOT EXISTS author_sales_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID NOT NULL REFERENCES author_profiles(id) ON DELETE CASCADE,
    book_id UUID NOT NULL REFERENCES author_books(id) ON DELETE CASCADE,
    period_start DATE NOT NULL, -- start of the sale period (or single day)
    period_end DATE NOT NULL, -- end of the sale period (or single day)
    units_sold INTEGER NOT NULL DEFAULT 0,
    revenue_generated NUMERIC NOT NULL DEFAULT 0, -- Total MRP * units
    royalty_earned NUMERIC NOT NULL DEFAULT 0, -- (Profit * Royalty %) * units
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending' or 'paid'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: author_audit_logs (For Transparency & History)
CREATE TABLE IF NOT EXISTS author_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID NOT NULL REFERENCES author_profiles(id) ON DELETE CASCADE,
    book_id UUID REFERENCES author_books(id) ON DELETE CASCADE,
    action_type TEXT NOT NULL, -- 'book_created', 'book_updated', 'sale_logged', 'book_deleted'
    description TEXT NOT NULL, -- Detailed string explaining the change
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE author_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE author_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE author_sales_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE author_audit_logs ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for the author dashboard via UUID)
CREATE POLICY "Allow public read access on author_profiles" ON author_profiles FOR SELECT USING (true);
CREATE POLICY "Allow public read access on author_books" ON author_books FOR SELECT USING (true);
CREATE POLICY "Allow public read access on author_sales_reports" ON author_sales_reports FOR SELECT USING (true);
CREATE POLICY "Allow public read access on author_audit_logs" ON author_audit_logs FOR SELECT USING (true);

-- Allow public insert/update (for the admin dashboard - assuming no strict auth for now as per user request to make it easy)
-- In a production environment, you should restrict this to authenticated admins only.
CREATE POLICY "Allow public insert on author_profiles" ON author_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on author_profiles" ON author_profiles FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on author_profiles" ON author_profiles FOR DELETE USING (true);

CREATE POLICY "Allow public insert on author_books" ON author_books FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on author_books" ON author_books FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on author_books" ON author_books FOR DELETE USING (true);

CREATE POLICY "Allow public insert on author_sales_reports" ON author_sales_reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on author_sales_reports" ON author_sales_reports FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on author_sales_reports" ON author_sales_reports FOR DELETE USING (true);

CREATE POLICY "Allow public insert on author_audit_logs" ON author_audit_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete on author_audit_logs" ON author_audit_logs FOR DELETE USING (true);

-- Functions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_author_profiles_updated_at BEFORE UPDATE ON author_profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_author_sales_reports_updated_at BEFORE UPDATE ON author_sales_reports FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
