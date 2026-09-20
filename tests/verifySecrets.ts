import fs from 'fs';
import path from 'path';

function auditSecrets() {
  console.log('--- EXECUTING SECRET & BUNDLE AUDIT ---');
  const distDir = path.resolve(process.cwd(), 'dist/assets');
  if (!fs.existsSync(distDir)) {
    console.error('FAIL: dist/assets not found. Run npm run build first.');
    process.exit(1);
  }

  const files = fs.readdirSync(distDir);
  const jsFiles = files.filter(f => f.endsWith('.js'));
  console.log(`Found ${jsFiles.length} JS bundle files in dist/assets`);

  let secretLeaked = false;
  const dangerousPatterns = [
    /AIzaSy[A-Za-z0-9_-]{33}/g, // Google API key pattern
    /GEMINI_API_KEY/g,
    /service_role/g,
    /SUPABASE_SERVICE_KEY/g,
    /SUPABASE_SERVICE_ROLE/g,
  ];

  for (const file of jsFiles) {
    const content = fs.readFileSync(path.join(distDir, file), 'utf8');
    for (const pattern of dangerousPatterns) {
      const match = content.match(pattern);
      if (match) {
        console.error(`CRITICAL LEAK DETECTED in ${file}: Matched pattern ${pattern}`);
        secretLeaked = true;
      }
    }
  }

  if (!secretLeaked) {
    console.log('PASS: Zero secret keys, service role tokens, or private Gemini environment variables detected in public JS bundles!');
  }

  // Check git status of .env
  console.log('\nChecking git status of environment files:');
}

auditSecrets();

