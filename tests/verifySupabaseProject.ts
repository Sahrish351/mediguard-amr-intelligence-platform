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

const TABLES_TO_CHECK = [
  'organizations',
  'facilities',
  'profiles',
  'roles',
  'permissions',
  'role_permissions',
  'organization_members',
  'medicines',
  'medicine_batches',
  'prescriptions',
  'prescription_items',
  'dispensing_records',
  'specimens',
  'organisms',
  'susceptibility_results',
  'alerts',
  'alert_evidence',
  'investigations',
  'investigation_notes',
  'reports',
  'notifications',
  'audit_logs',
  'data_quality_issues',
  'ai_conversations',
  'ai_messages',
];

async function verifySupabaseProject() {
  console.log('=== PHASE 1: SUPABASE PROJECT VERIFICATION ===');
  console.log(`Endpoint: ${SUPABASE_URL}`);
  console.log(`Key Prefix: ${SUPABASE_KEY.slice(0, 15)}...`);

  // 1. Test basic connectivity
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });
    console.log(`[HTTP Connection] Status: ${res.status} ${res.statusText}`);
  } catch (err: any) {
    console.error(`[Connection Error]: ${err.message}`);
  }

  // 2. Query each table
  console.log('\n--- Checking Table Existence via PostgREST ---');
  const tableStatus: Record<string, { exists: boolean; count?: number; error?: string }> = {};

  for (const table of TABLES_TO_CHECK) {
    try {
      const selectCol = table === 'role_permissions' ? 'role_id' : 'id';
      const { data, error, count } = await supabase
        .from(table)
        .select(selectCol)
        .limit(1);

      if (error) {
        tableStatus[table] = {
          exists: false,
          error: `${error.code}: ${error.message}`,
        };
      } else {
        tableStatus[table] = {
          exists: true,
          count: count ?? 0,
        };
      }
    } catch (err: any) {
      tableStatus[table] = {
        exists: false,
        error: err.message,
      };
    }
  }

  let existingCount = 0;
  let missingCount = 0;

  for (const [table, info] of Object.entries(tableStatus)) {
    if (info.exists) {
      existingCount++;
      console.log(`[TABLE FOUND] ${table} — rows: ${info.count}`);
    } else {
      missingCount++;
      console.log(`[TABLE MISSING] ${table} — error: ${info.error}`);
    }
  }

  console.log('\n========================================');
  console.log(`SUMMARY: ${existingCount} Found, ${missingCount} Missing`);
  console.log('========================================');

  return { existingCount, missingCount, tableStatus };
}

verifySupabaseProject().catch(console.error);
