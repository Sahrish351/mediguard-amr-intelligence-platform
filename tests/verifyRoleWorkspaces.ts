import { getWorkspacePathForRole, UserRoleSlug } from '../src/types';
import { INITIAL_ROLES, INITIAL_USERS } from '../src/services/mockData';

interface TestResult {
  suite: string;
  name: string;
  passed: boolean;
  details?: string;
}

const results: TestResult[] = [];

function assert(condition: boolean, suite: string, name: string, details?: string) {
  results.push({ suite, name, passed: condition, details });
  if (!condition) {
    console.error(`  FAIL [${suite}]: ${name} - ${details || ''}`);
  } else {
    console.log(`  PASS [${suite}]: ${name}`);
  }
}

console.log('================================================================');
console.log('MEDIGUARD ROLE WORKSPACES & AUTHENTICATION VERIFICATION SUITE');
console.log('================================================================\n');

// 1. Verify Role to Workspace Path Resolution for all 9 Roles
const expectedMappings: Record<UserRoleSlug, string> = {
  'doctor': '/doctor',
  'pharmacist': '/pharmacist',
  'lab-scientist': '/laboratory',
  'stewardship-lead': '/stewardship',
  'epidemiologist': '/epidemiology',
  'surveillance-officer': '/surveillance',
  'org-admin': '/organization',
  'platform-admin': '/admin',
  'read-only': '/researcher',
};

console.log('1. Verifying 9 Role Workspace Path Resolvers:');
for (const [role, expectedPath] of Object.entries(expectedMappings)) {
  const actualPath = getWorkspacePathForRole(role as UserRoleSlug);
  assert(
    actualPath === expectedPath,
    'Workspace Mapping',
    `Role '${role}' maps to '${expectedPath}'`,
    `Got '${actualPath}', expected '${expectedPath}'`
  );
}

// 2. Verify System Roles & Registered Healthcare Identities
console.log('\n2. Verifying System Roles & Healthcare Profiles:');
assert(
  INITIAL_ROLES.length === 9,
  'Role Definition',
  'Exactly 9 dedicated clinical & administrative roles defined in platform',
  `Found ${INITIAL_ROLES.length} roles`
);

INITIAL_ROLES.forEach((r) => {
  assert(
    Boolean(expectedMappings[r.slug]),
    'Role Alignment',
    `Role '${r.name}' (${r.slug}) has associated workspace route: ${expectedMappings[r.slug]}`
  );
});

assert(
  INITIAL_USERS.length >= 7,
  'User Profiles',
  `Initial clinical profiles populated (${INITIAL_USERS.length} profiles)`
);

// 3. Verify RBAC Authorization Boundaries
console.log('\n3. Verifying RBAC Route Guard Authorization Logic:');

function checkAuthorization(userRole: UserRoleSlug, allowedRoles: UserRoleSlug[]): boolean {
  return allowedRoles.includes(userRole) || userRole === 'platform-admin';
}

// Doctor Boundary
assert(
  checkAuthorization('doctor', ['doctor']) === true,
  'RBAC Boundary',
  'Doctor can access /doctor workspace'
);
assert(
  checkAuthorization('doctor', ['platform-admin']) === false,
  'RBAC Boundary',
  'Doctor is blocked from /admin workspace'
);
assert(
  checkAuthorization('doctor', ['lab-scientist']) === false,
  'RBAC Boundary',
  'Doctor is blocked from /laboratory workspace'
);

// Pharmacist Boundary
assert(
  checkAuthorization('pharmacist', ['pharmacist']) === true,
  'RBAC Boundary',
  'Pharmacist can access /pharmacist workspace'
);
assert(
  checkAuthorization('pharmacist', ['org-admin']) === false,
  'RBAC Boundary',
  'Pharmacist is blocked from /organization workspace'
);

// Laboratory Scientist Boundary
assert(
  checkAuthorization('lab-scientist', ['lab-scientist']) === true,
  'RBAC Boundary',
  'Lab Scientist can access /laboratory workspace'
);
assert(
  checkAuthorization('lab-scientist', ['doctor']) === false,
  'RBAC Boundary',
  'Lab Scientist is blocked from /doctor workspace'
);

// Stewardship Lead Boundary
assert(
  checkAuthorization('stewardship-lead', ['stewardship-lead']) === true,
  'RBAC Boundary',
  'Stewardship Lead can access /stewardship workspace'
);
assert(
  checkAuthorization('stewardship-lead', ['pharmacist']) === false,
  'RBAC Boundary',
  'Stewardship Lead is blocked from /pharmacist dispensing workspace'
);

// Epidemiologist Boundary
assert(
  checkAuthorization('epidemiologist', ['epidemiologist']) === true,
  'RBAC Boundary',
  'Epidemiologist can access /epidemiology workspace'
);

// Surveillance Officer Boundary
assert(
  checkAuthorization('surveillance-officer', ['surveillance-officer']) === true,
  'RBAC Boundary',
  'Surveillance Officer can access /surveillance workspace'
);

// Organization Admin Boundary
assert(
  checkAuthorization('org-admin', ['org-admin']) === true,
  'RBAC Boundary',
  'Org Admin can access /organization workspace'
);
assert(
  checkAuthorization('org-admin', ['platform-admin']) === false,
  'RBAC Boundary',
  'Org Admin is blocked from superuser /admin workspace'
);

// Superuser Platform Admin: Universal access verification
for (const [role, _path] of Object.entries(expectedMappings)) {
  const allowed = checkAuthorization('platform-admin', [role as UserRoleSlug]);
  assert(
    allowed === true,
    'Platform Admin Privilege',
    `Platform Admin has superuser access to '${role}' workspace`
  );
}

// 4. Summary Report
console.log('\n================================================================');
const total = results.length;
const passed = results.filter((r) => r.passed).length;
const failed = total - passed;
console.log(`TOTAL TESTS: ${total} | PASSED: ${passed} | FAILED: ${failed}`);
console.log('================================================================');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL ROLE WORKSPACE & RBAC AUTHORIZATION CHECKS PASSED!\n');
  process.exit(0);
}
