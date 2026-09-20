import { createClient } from '@supabase/supabase-js';

const getEnvVar = (key: string, defaultVal: string): string => {
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env[key]) {
      return (import.meta as any).env[key];
    }
  } catch {
    // ignore
  }
  try {
    const proc = (globalThis as any).process;
    if (proc && proc.env && proc.env[key]) {
      return proc.env[key];
    }
  } catch {
    // ignore
  }
  return defaultVal;
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL', 'https://jltwonuuxjsadunmbzli.supabase.co');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY', 'sb_publishable_PNZUQ67xubWA8hN8Ug4I5A_s34nqP6G');

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});
