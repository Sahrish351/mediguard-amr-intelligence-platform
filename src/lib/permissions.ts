import { UserRoleSlug } from '@/types';

export const ROLE_PERMISSIONS: Record<UserRoleSlug, string[]> = {
  'platform-admin': [
    'platform.manage',
    'org.manage',
    'users.manage',
    'medicines.manage',
    'batches.manage',
    'prescriptions.create',
    'prescriptions.view',
    'dispensing.create',
    'dispensing.view',
    'laboratory.create',
    'laboratory.view',
    'analytics.view',
    'alerts.view',
    'alerts.investigate',
    'reports.generate',
    'ai.use',
    'audit.view',
    'quality.manage',
  ],
  'org-admin': [
    'org.manage',
    'users.manage',
    'medicines.manage',
    'batches.manage',
    'prescriptions.view',
    'dispensing.view',
    'laboratory.view',
    'analytics.view',
    'alerts.view',
    'alerts.investigate',
    'reports.generate',
    'ai.use',
    'audit.view',
    'quality.manage',
  ],
  'surveillance-officer': [
    'analytics.view',
    'alerts.view',
    'alerts.investigate',
    'prescriptions.view',
    'dispensing.view',
    'laboratory.view',
    'reports.generate',
    'ai.use',
    'audit.view',
    'quality.manage',
  ],
  'doctor': [
    'prescriptions.create',
    'prescriptions.view',
    'dispensing.view',
    'laboratory.view',
    'analytics.view',
    'alerts.view',
    'ai.use',
  ],
  'pharmacist': [
    'dispensing.create',
    'dispensing.view',
    'batches.manage',
    'prescriptions.view',
    'analytics.view',
    'alerts.view',
    'quality.manage',
    'ai.use',
  ],
  'lab-scientist': [
    'laboratory.create',
    'laboratory.view',
    'analytics.view',
    'alerts.view',
    'quality.manage',
    'ai.use',
  ],
  'stewardship-lead': [
    'analytics.view',
    'alerts.view',
    'alerts.investigate',
    'prescriptions.view',
    'dispensing.view',
    'laboratory.view',
    'reports.generate',
    'ai.use',
    'audit.view',
    'quality.manage',
  ],
  'epidemiologist': [
    'analytics.view',
    'alerts.view',
    'laboratory.view',
    'dispensing.view',
    'reports.generate',
    'ai.use',
  ],
  'read-only': [
    'analytics.view',
    'alerts.view',
    'reports.view',
    'laboratory.view',
    'dispensing.view',
  ],
};

export function hasPermission(roleSlug: UserRoleSlug, permission: string): boolean {
  const permissions = ROLE_PERMISSIONS[roleSlug] || [];
  return permissions.includes(permission);
}

export function canPerform(roleSlug: UserRoleSlug, action: 'create_prescription' | 'dispense' | 'enter_lab' | 'investigate_alert' | 'verify_batch' | 'generate_report' | 'use_ai'): boolean {
  switch (action) {
    case 'create_prescription':
      return hasPermission(roleSlug, 'prescriptions.create');
    case 'dispense':
      return hasPermission(roleSlug, 'dispensing.create');
    case 'enter_lab':
      return hasPermission(roleSlug, 'laboratory.create');
    case 'investigate_alert':
      return hasPermission(roleSlug, 'alerts.investigate');
    case 'verify_batch':
      return hasPermission(roleSlug, 'batches.manage');
    case 'generate_report':
      return hasPermission(roleSlug, 'reports.generate');
    case 'use_ai':
      return hasPermission(roleSlug, 'ai.use');
    default:
      return false;
  }
}

