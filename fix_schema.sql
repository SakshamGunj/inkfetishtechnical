-- Force add columns that might be missing if the table already existed
ALTER TABLE anthology_applications ADD COLUMN IF NOT EXISTS age text;
ALTER TABLE anthology_applications ADD COLUMN IF NOT EXISTS pen_name text;
ALTER TABLE anthology_applications ADD COLUMN IF NOT EXISTS whatsapp text;
ALTER TABLE anthology_applications ADD COLUMN IF NOT EXISTS instagram text;
ALTER TABLE anthology_applications ADD COLUMN IF NOT EXISTS agreed_to_terms boolean DEFAULT false;

-- Force schema cache reload
NOTIFY pgrst, 'reload config';
