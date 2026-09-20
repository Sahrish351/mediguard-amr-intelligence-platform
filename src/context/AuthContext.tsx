import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Organization, Role, UserRoleSlug, getWorkspacePathForRole } from '@/types';
import { api } from '@/services/api';
import { hasPermission } from '@/lib/permissions';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  currentUser: UserProfile;
  currentOrg: Organization;
  currentRole: Role;
  organizations: Organization[];
  roles: Role[];
  users: UserProfile[];
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string; workspacePath: string }>;
  loginAsPersona: (roleSlug: UserRoleSlug) => Promise<{ success: boolean; workspacePath: string }>;
  register: (email: string, password: string, fullName: string, roleSlug?: UserRoleSlug, orgId?: string) => Promise<{ success: boolean; error?: string; workspacePath: string }>;
  logout: () => Promise<void>;
  switchOrganization: (orgId: string) => void;
  can: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mapping of role slugs to default mock users
const ROLE_TO_USER_MAP: Record<UserRoleSlug, string> = {
  'doctor': 'usr-2',           // Dr. Sarah Farooq
  'pharmacist': 'usr-3',       // Zainab Qureshi, PharmD
  'lab-scientist': 'usr-4',    // Dr. Asad Ullah, PhD
  'stewardship-lead': 'usr-5', // Ayesha Malik, MPH
  'epidemiologist': 'usr-6',   // Bilal Hassan
  'surveillance-officer': 'usr-5', // Ayesha Malik (or dedicated)
  'org-admin': 'usr-1',        // Dr. Tariq Mehmood
  'platform-admin': 'usr-1',   // Dr. Tariq Mehmood
  'read-only': 'usr-7',        // Dr. Maria Khan
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [organizations] = useState<Organization[]>(() => api.getOrganizations());
  const [roles] = useState<Role[]>(() => api.getRoles());
  const [users] = useState<UserProfile[]>(() => api.getUsers());

  const [currentOrg, setCurrentOrg] = useState<Organization>(() => organizations[0]);
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => users[1] || users[0]); // default doctor
  const [currentRole, setCurrentRole] = useState<Role>(() => roles.find(r => r.slug === 'doctor') || roles[0]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize session from localStorage or Supabase
  useEffect(() => {
    const initAuth = async () => {
      try {
        const savedSession = localStorage.getItem('mediguard_auth_session');
        if (savedSession) {
          const parsed = JSON.parse(savedSession);
          if (parsed.userId) {
            const foundUser = users.find(u => u.id === parsed.userId);
            if (foundUser) setCurrentUser(foundUser);
          }
          if (parsed.roleSlug) {
            const foundRole = roles.find(r => r.slug === parsed.roleSlug);
            if (foundRole) setCurrentRole(foundRole);
          }
          if (parsed.orgId) {
            const foundOrg = organizations.find(o => o.id === parsed.orgId);
            if (foundOrg) setCurrentOrg(foundOrg);
          }
          setIsAuthenticated(parsed.isAuthenticated !== false);
        } else {
          // Check Supabase Auth
          const { data } = await supabase.auth.getSession();
          if (data.session?.user) {
            setIsAuthenticated(true);
            const userEmail = data.session.user.email?.toLowerCase();
            const matchingUser = users.find(u => u.email.toLowerCase() === userEmail);
            if (matchingUser) {
              setCurrentUser(matchingUser);
            }
          }
        }
      } catch (err) {
        console.error('Error hydrating auth session:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Listen to real Supabase auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        localStorage.removeItem('mediguard_auth_session');
      } else if (event === 'SIGNED_IN' && session?.user) {
        setIsAuthenticated(true);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [organizations, roles, users]);

  // Persist session changes
  const saveSession = (userId: string, roleSlug: UserRoleSlug, orgId: string, isAuth: boolean) => {
    localStorage.setItem(
      'mediguard_auth_session',
      JSON.stringify({
        userId,
        roleSlug,
        orgId,
        isAuthenticated: isAuth,
        timestamp: new Date().toISOString(),
      })
    );
  };

  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    try {
      // 1. First attempt real Supabase Auth if credentials provided
      if (password) {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          if (!error && data.user) {
            // Check if profile exists for this email
            const matchedUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
            const userToSet = matchedUser || {
              id: data.user.id,
              full_name: data.user.user_metadata?.full_name || email.split('@')[0],
              email: data.user.email || email,
              status: 'active',
            };
            setCurrentUser(userToSet);
            setIsAuthenticated(true);
            const targetWorkspace = getWorkspacePathForRole(currentRole.slug);
            saveSession(userToSet.id, currentRole.slug, currentOrg.id, true);
            return { success: true, workspacePath: targetWorkspace };
          }
        } catch {
          // Fall through to seed user match
        }
      }

      // 2. Match with seed users / personas
      const matched = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (matched) {
        setCurrentUser(matched);
        setIsAuthenticated(true);

        // Derive role from email or mapping
        let assignedRoleSlug: UserRoleSlug = 'doctor';
        if (matched.id === 'usr-1') assignedRoleSlug = 'platform-admin';
        else if (matched.id === 'usr-2') assignedRoleSlug = 'doctor';
        else if (matched.id === 'usr-3') assignedRoleSlug = 'pharmacist';
        else if (matched.id === 'usr-4') assignedRoleSlug = 'lab-scientist';
        else if (matched.id === 'usr-5') assignedRoleSlug = 'stewardship-lead';
        else if (matched.id === 'usr-6') assignedRoleSlug = 'epidemiologist';
        else if (matched.id === 'usr-7') assignedRoleSlug = 'read-only';

        const roleObj = roles.find(r => r.slug === assignedRoleSlug) || roles[0];
        setCurrentRole(roleObj);
        saveSession(matched.id, assignedRoleSlug, currentOrg.id, true);

        return { success: true, workspacePath: getWorkspacePathForRole(assignedRoleSlug) };
      }

      // 3. Fallback: create ad-hoc authenticated doctor profile
      const newAdHocUser: UserProfile = {
        id: `usr-${Date.now()}`,
        full_name: email.split('@')[0],
        email: email,
        status: 'active',
      };
      setCurrentUser(newAdHocUser);
      setIsAuthenticated(true);
      saveSession(newAdHocUser.id, currentRole.slug, currentOrg.id, true);
      return { success: true, workspacePath: getWorkspacePathForRole(currentRole.slug) };
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsPersona = async (roleSlug: UserRoleSlug) => {
    setIsLoading(true);
    try {
      const targetUserId = ROLE_TO_USER_MAP[roleSlug] || 'usr-2';
      const userObj = users.find(u => u.id === targetUserId) || users[0];
      const roleObj = roles.find(r => r.slug === roleSlug) || roles[0];

      setCurrentUser(userObj);
      setCurrentRole(roleObj);
      setIsAuthenticated(true);

      saveSession(userObj.id, roleSlug, currentOrg.id, true);
      const targetPath = getWorkspacePathForRole(roleSlug);
      return { success: true, workspacePath: targetPath };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, fullName: string, roleSlug: UserRoleSlug = 'doctor', orgId?: string) => {
    setIsLoading(true);
    try {
      // Register with Supabase Auth
      try {
        await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName, role: roleSlug } }
        });
      } catch {
        // Continue with local registration
      }

      const roleObj = roles.find(r => r.slug === roleSlug) || roles[0];
      const targetOrg = orgId ? (organizations.find(o => o.id === orgId) || currentOrg) : currentOrg;

      const newUser: UserProfile = {
        id: `usr-${Date.now()}`,
        full_name: fullName,
        email: email,
        status: 'active',
      };

      setCurrentUser(newUser);
      setCurrentRole(roleObj);
      setCurrentOrg(targetOrg);
      setIsAuthenticated(true);

      saveSession(newUser.id, roleSlug, targetOrg.id, true);
      return { success: true, workspacePath: getWorkspacePathForRole(roleSlug) };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
    } catch {
      // ignore
    } finally {
      setIsAuthenticated(false);
      localStorage.removeItem('mediguard_auth_session');
      setIsLoading(false);
    }
  };

  const switchOrganization = (orgId: string) => {
    const org = organizations.find((o) => o.id === orgId);
    if (org) {
      setCurrentOrg(org);
      saveSession(currentUser.id, currentRole.slug, orgId, isAuthenticated);
    }
  };

  const can = (permission: string) => {
    return hasPermission(currentRole.slug, permission);
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
        isAuthenticated,
        isLoading,
        login,
        loginAsPersona,
        register,
        logout,
        switchOrganization,
        can,
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
