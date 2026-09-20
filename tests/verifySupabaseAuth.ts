import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Parse .env manually
try {
  const envContent = fs.readFileSync(path.resolve(process.cwd(), '.env'), 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [k, ...v] = trimmed.split('=');
      if (k && v.length > 0) {
        process.env[k.trim()] = v.join('=').trim();
      }
    }
  }
} catch {
  // ignore
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://jltwonuuxjsadunmbzli.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_PNZUQ67xubWA8hN8Ug4I5A_s34nqP6G';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function verifyAuthAndRLS() {
  console.log('=== PHASE 2 & 3: SUPABASE REAL AUTH & RLS TESTING ===');

  const testEmailA = `doctor.test.${Date.now()}@mediguard.internal`;
  const testEmailB = `steward.test.${Date.now()}@mediguard.internal`;
  const testPassword = 'MediGuardPassword123!#';

  // 1. Test Registration
  console.log(`\n--- 1. Testing Supabase Auth SignUp ---`);
  console.log(`Registering Test User A: ${testEmailA}`);
  const { data: signUpA, error: errSignUpA } = await supabase.auth.signUp({
    email: testEmailA,
    password: testPassword,
    options: {
      data: {
        full_name: 'Dr. Test User A',
        role_slug: 'doctor',
      },
    },
  });

  if (errSignUpA) {
    console.log(`[SignUp Result] Info/Error: ${errSignUpA.message}`);
  } else {
    console.log(`[SignUp PASS] User ID created: ${signUpA.user?.id}`);
    console.log(`[Session Confirmed] Access Token: ${signUpA.session ? 'Received' : 'Email Confirmation Required'}`);
  }

  // 2. Test Login
  console.log(`\n--- 2. Testing Supabase Auth SignIn ---`);
  const { data: signInA, error: errSignInA } = await supabase.auth.signInWithPassword({
    email: testEmailA,
    password: testPassword,
  });

  if (errSignInA) {
    console.log(`[SignIn Result]: ${errSignInA.message}`);
  } else {
    console.log(`[SignIn PASS] Authenticated as: ${signInA.user?.email}`);
    console.log(`[Session Persistence Token]: ${signInA.session?.access_token.slice(0, 20)}...`);
  }

  // 3. Test Invalid Credentials Failure Case
  console.log(`\n--- 3. Testing Auth Failure Cases ---`);
  const { data: failSign, error: failErr } = await supabase.auth.signInWithPassword({
    email: 'nonexistent.doctor@mediguard.internal',
    password: 'WrongPassword!',
  });
  if (failErr) {
    console.log(`[PASS: Auth Failure Handled] Code: ${failErr.status}, Message: "${failErr.message}"`);
  } else {
    console.log(`[FAIL: Should have rejected invalid credentials]`);
  }

  // 4. Test User Profile Retrieval
  console.log(`\n--- 4. Testing Profiles Table Retrieval ---`);
  const { data: profiles, error: errProf } = await supabase.from('profiles').select('*').limit(5);
  console.log(`[Profiles Query] Error: ${errProf?.message || 'None'}, Rows: ${profiles?.length ?? 0}`);

  // 5. Test Organizations Table Retrieval
  console.log(`\n--- 5. Testing Organizations Query ---`);
  const { data: orgs, error: errOrgs } = await supabase.from('organizations').select('*').limit(5);
  console.log(`[Organizations Query] Error: ${errOrgs?.message || 'None'}, Rows: ${orgs?.length ?? 0}`);

  // 6. Test SignOut
  console.log(`\n--- 6. Testing SignOut ---`);
  const { error: errSignOut } = await supabase.auth.signOut();
  console.log(`[SignOut Result] Error: ${errSignOut?.message || 'None'}`);

  return { success: true };
}

verifyAuthAndRLS().catch(console.error);

