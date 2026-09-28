const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fmnnomndxnybjsbykpbr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtbm5vbW5keG55YmpzYnlrcGJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzOTgyNzYsImV4cCI6MjA4MTk3NDI3Nn0.x2qD3UYElPEdl3g750h7m-VfYas3KXGGUMCUH_bt3qI';
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase
    .from('iwl_registrations')
    .select('*');
  
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Fetched:', data.length);
    console.log(data.slice(0, 2));
  }
}
main();
