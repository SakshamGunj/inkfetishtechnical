import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://fmnnomndxnybjsbykpbr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtbm5vbW5keG55YmpzYnlrcGJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzOTgyNzYsImV4cCI6MjA4MTk3NDI3Nn0.x2qD3UYElPEdl3g750h7m-VfYas3KXGGUMCUH_bt3qI'
);

async function check() {
  const { data: pfp, error: err1 } = await supabase.from('poetry_festival_s2_payments').select('*').limit(5);
  console.log('poetry_festival_s2_payments:', pfp?.length, err1?.message);

  const { data: spa, error: err2 } = await supabase.from('shakespeare_award_v2_payments').select('*').limit(5);
  console.log('shakespeare_award_v2_payments:', spa?.length, err2?.message);
}

check();
