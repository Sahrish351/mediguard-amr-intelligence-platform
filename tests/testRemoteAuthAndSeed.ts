// tests/testRemoteAuthAndSeed.ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jltwonuuxjsadunmbzli.supabase.co';
const SUPABASE_KEY = 'sb_publishable_PNZUQ67xubWA8hN8Ug4I5A_s34nqP6G';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testAuthAndTables() {
  console.log('Testing Supabase Auth & Authenticated Queries...\n');

  // Let's test sign up with valid domain
  const email = `doctor.${Date.now()}@mediguard.org`;
  const password = 'MediGuardPassword123!#';

  const { data: signData, error: signErr } = await supabase.auth.signUp({
    email,
    password,
  });

  console.log('SignUp Result:', {
    user: signData?.user?.id,
    hasSession: !!signData?.session,
    error: signErr?.message,
  });

  // Test authenticated query
  if (signData?.session) {
    const authedClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
      global: {
        headers: {
          Authorization: `Bearer ${signData.session.access_token}`
        }
      }
    });

    const { data: orgs, error: orgErr } = await authedClient.from('organizations').select('*');
    console.log('Authenticated Organizations Query:', { count: orgs?.length, error: orgErr?.message });

    const { data: meds, error: medErr } = await authedClient.from('medicines').select('*');
    console.log('Authenticated Medicines Query:', { count: meds?.length, error: medErr?.message });

    const { data: organisms, error: orgsErr } = await authedClient.from('organisms').select('*');
    console.log('Authenticated Organisms Query:', { count: organisms?.length, error: orgsErr?.message });
  } else {
    // If sign up requires email confirmation, test sign in with one of the seed accounts if any
    console.log('Sign up requires confirmation or no session returned immediately.');
  }

  // Also query roles, permissions, organisms without auth
  const { data: roles, error: rolesErr } = await supabase.from('roles').select('*');
  console.log('Anon Roles Query:', { data: roles, error: rolesErr?.message });

  const { data: perms, error: permsErr } = await supabase.from('permissions').select('*');
  console.log('Anon Permissions Query:', { count: perms?.length, error: permsErr?.message });
}

testAuthAndTables();

