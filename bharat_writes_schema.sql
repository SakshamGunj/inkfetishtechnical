-- Schema for Bharat Writes National Independence Poetry Contest

-- Registrations Table
CREATE TABLE bharat_writes_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    authorName TEXT NOT NULL,
    whatsappNumber TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE bharat_writes_registrations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (since users are not authenticated via Supabase Auth)
CREATE POLICY "Allow public insert to registrations" 
ON bharat_writes_registrations FOR INSERT TO public 
WITH CHECK (true);

-- Submissions Table
CREATE TABLE bharat_writes_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    authorName TEXT NOT NULL,
    title TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsappNumber TEXT NOT NULL,
    poetryHtml TEXT NOT NULL,
    wordCount INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    order_id TEXT,
    poem_number INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE bharat_writes_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Allow public insert to submissions" 
ON bharat_writes_submissions FOR INSERT TO public 
WITH CHECK (true);
