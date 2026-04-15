-- Create the table for anthology applications
create table if not exists anthology_applications (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text,
  pen_name text,
  age text,
  email text,
  whatsapp text,
  instagram text,
  agreed_to_terms boolean default false,
  city text,
  writing_experience text,
  motivation text,
  writing_sample text,
  theme_interpretation text,
  portfolio_link text,
  dedication_hours text,
  queue_number integer,
  language_preference text
);

-- Enable Row Level Security (RLS)
alter table anthology_applications enable row level security;

-- Create policy to allow inserting data (public access for submission)
create policy "Allow public definitions to insert applications"
on anthology_applications for insert
with check (true);

-- Create policy to allow reading own data (optional, for admin use mainly)
-- For now, we restrict read access to service role only or authenticated users if needed later.
-- This ensures privacy of applicants.
