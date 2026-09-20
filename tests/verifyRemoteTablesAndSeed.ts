// tests/verifyRemoteTablesAndSeed.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jltwonuuxjsadunmbzli.supabase.co';
const supabaseKey = 'sb_publishable_PNZUQ67xubWA8hN8Ug4I5A_s34nqP6G';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkRemoteDb() {
  console.log('=== VERIFYING REMOTE SUPABASE TABLES & SEED DATA ===\n');

  // Check roles table
  const { data: roles, error: rolesError } = await supabase.from('roles').select('*');
  console.log('Roles Query:', { count: roles?.length, error: rolesError?.message });
  if (roles && roles.length > 0) {
    console.log('Sample Roles:', roles.map((r: any) => `${r.name} (${r.slug})`));
  }

  // Check permissions table
  const { data: perms, error: permsError } = await supabase.from('permissions').select('*');
  console.log('Permissions Query:', { count: perms?.length, error: permsError?.message });

  // Check organisms table
  const { data: organisms, error: orgsError } = await supabase.from('organisms').select('*');
  console.log('Organisms Query:', { count: organisms?.length, error: orgsError?.message });
  if (organisms && organisms.length > 0) {
    console.log('Sample Organisms:', organisms.slice(0, 3).map((o: any) => `${o.name} (${o.code})`));
  }

  // Check medicines table
  const { data: medicines, error: medsError } = await supabase.from('medicines').select('*');
  console.log('Medicines Query:', { count: medicines?.length, error: medsError?.message });
  if (medicines && medicines.length > 0) {
    console.log('Sample Medicines:', medicines.slice(0, 3).map((m: any) => `${m.generic_name} (${m.aware_category})`));
  }

  // Check organizations table (requires auth under RLS)
  const { data: orgs, error: orgError } = await supabase.from('organizations').select('*');
  console.log('Organizations (Anon Query under RLS):', { count: orgs?.length, error: orgError?.message });
}

checkRemoteDb();

