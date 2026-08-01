import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://fmnnomndxnybjsbykpbr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtbm5vbW5keG55YmpzYnlrcGJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzOTgyNzYsImV4cCI6MjA4MTk3NDI3Nn0.x2qD3UYElPEdl3g750h7m-VfYas3KXGGUMCUH_bt3qI'
);

async function testInsert() {
  const { data, error } = await supabase
    .from('shakespeare_award_v2_payments')
    .insert([
      {
        order_id: 'test_order_123',
        cf_order_id: 'test_cf_123',
        email: 'test@example.com',
        amount: 699,
        status: 'PAID'
      }
    ]);

  console.log('Insert Result:', data);
  console.log('Insert Error:', error);
}

testInsert();
