import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Organization, Role, UserRoleSlug } from '@/types';
import { api } from '@/services/api';
import { ROLE_PERMISSIONS, hasPermission } from '@/lib/permissions';

interface AuthContextType {
  currentUser: UserProfile;
  currentOrg: Organization;
  currentRole: Role;
  organizations: Organization[];
  roles: Role[];
  users: UserProfile[];
  switchOrganization: (orgId: string) => void;
  switchRole: (roleSlug: UserRoleSlug) => void;
  switchUser: (userId: string) => void;
  can: (permission: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [organizations] = useState<Organization[]>(() => api.getOrganizations());
  const [roles] = useState<Role[]>(() => api.getRoles());
  const [users] = useState<UserProfile[]>(() => api.getUsers());

  const [currentOrg, setCurrentOrg] = useState<Organization>(() => organizations[0]);
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => users[0]);
  const [currentRole, setCurrentRole] = useState<Role>(() => roles[0]);

  // Load persisted session if available
  useEffect(() => {
    try {
      const savedOrgId = localStorage.getItem('mediguard_active_org');
      const savedRoleSlug = localStorage.getItem('mediguard_active_role');
      const savedUserId = localStorage.getItem('mediguard_active_user');

      if (savedOrgId) {
        const found = organizations.find((o) => o.id === savedOrgId);
        if (found) setCurrentOrg(found);
      }
      if (savedRoleSlug) {
        const found = roles.find((r) => r.slug === savedRoleSlug);
        if (found) setCurrentRole(found);
      }
      if (savedUserId) {
        const found = users.find((u) => u.id === savedUserId);
        if (found) setCurrentUser(found);
      }
    } catch {
      // ignore
    }
  }, [organizations, roles, users]);

  const switchOrganization = (orgId: string) => {
    const org = organizations.find((o) => o.id === orgId);
    if (org) {
      setCurrentOrg(org);
      localStorage.setItem('mediguard_active_org', orgId);
    }
  };

  const switchRole = (roleSlug: UserRoleSlug) => {
    const role = roles.find((r) => r.slug === roleSlug);
    if (role) {
      setCurrentRole(role);
      localStorage.setItem('mediguard_active_role', roleSlug);
    }
  };

  const switchUser = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('mediguard_active_user', userId);
    }
  };

  const can = (permission: string) => {
    return hasPermission(currentRole.slug, permission);
  };

  const logout = () => {
    // Reset to defaults
    setCurrentOrg(organizations[0]);
    setCurrentRole(roles[0]);
    setCurrentUser(users[0]);
    localStorage.removeItem('mediguard_active_org');
    localStorage.removeItem('mediguard_active_role');
    localStorage.removeItem('mediguard_active_user');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentOrg,
        currentRole,
        organizations,
        roles,
        users,
        switchOrganization,
        switchRole,
        switchUser,
        can,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

