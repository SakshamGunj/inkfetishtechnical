-- Create the table for Vault Claims (Day 1, 2, 3 etc.)
create table if not exists vault_claims (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text,
  email text,
  whatsapp text,
  instagram text,
  day_unlocked integer,
  metadata jsonb default '{}'::jsonb
);

-- Enable Row Level Security (RLS)
alter table vault_claims enable row level security;

-- Create policy to allow public inserts
create policy "Allow public vault claims"
on vault_claims for insert
with check (true);

-- Create policy for read access (Service Role only usually, or public if needed)
create policy "Enable read access for service role only" on vault_claims
  for select
  to service_role
  using (true);
