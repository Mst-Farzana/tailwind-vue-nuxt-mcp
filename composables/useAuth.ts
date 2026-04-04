// 📁 composables/useAuth.ts
import { useState } from '#app';
import { computed } from 'vue';

// ==================== INTERFACES ====================

export interface Subscription {
  id: string;
  plan: 'free' | 'beginner' | 'standard' | 'pro' | 'enterprise';
  status: 'active' | 'inactive' | 'cancelled' | 'past_due' | 'trialing';
  currentPeriodEnd?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  emailVerified?: boolean;
  currentOrganizationId?: string;
  organizationRole?: 'owner' | 'admin' | 'member' | 'viewer';
  subscription?: Subscription | null;
}

export interface AuthSession {
  user?: User;
  session?: {
    id: string;
    userId: string;
    organizationId?: string;
    token: string;
    expiresAt: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface AuthResult<T = any> {
  data: T | null;
  error: { message: string; code?: string; statusCode?: number } | null;
}

// ==================== USE AUTH COMPOSABLE ====================

export const useAuth = () => {
  const session = useState<AuthSession | null>('auth-session', () => null);
  const loading = useState<boolean>('auth-loading', () => false);

  // 🔹 Fetch current session
  const fetchSession = async (): Promise<AuthSession | null> => {
    try {
      const data = await $fetch<AuthSession>('/api/auth/session');
      session.value = data;
      return data;
    } catch (err) {
      console.error('Failed to fetch session:', err);
      session.value = null;
      return null;
    }
  };

  // 🔹 Sign In (Email + Password)
  const signIn = async (email: string, password: string): Promise<AuthResult<AuthSession>> => {
    loading.value = true;
    try {
      console.log('📤 Signing in user:', email);

      const data = await $fetch<AuthSession>('/api/auth/sign-in/email', {
        method: 'POST',
        body: { email, password },
      });

      console.log('✅ Signed in successfully!');
      await fetchSession(); // Session refresh

      return { data, error: null };
    } catch (err: any) {
      console.error('❌ Sign in failed:', err);
      return {
        data: null, // ✅ Add "data:"
        error: { message: err?.data?.message || err?.message || 'Sign up failed' },
      };
    } finally {
      loading.value = false;
    }
  };

  // 🔹 Sign Up (Email + Password + Auto Organization)
  const signUp = async (payload: {
    name: string;
    email: string;
    password: string;
  }): Promise<AuthResult<AuthSession>> => {
    loading.value = true;
    try {
      console.log('📤 Signing up user:', payload.email);

      // 1️⃣ Create user ONLY
      const data = await $fetch<AuthSession>('/api/auth/sign-up/email', {
        method: 'POST',
        body: {
          name: payload.name,
          email: payload.email,
          password: payload.password,
        },
      });

      console.log('✅ User created, refreshing session...');
      await fetchSession();

      // 2️⃣ Create organization using Better Auth's built-in endpoint
      if (session.value?.user) {
        console.log('🏢 Creating organization via Better Auth API...');

        try {
          const org = await $fetch('/api/auth/organization/create', {
            method: 'POST',
            body: {
              name: `${payload.name}'s Organization`,
              slug: payload.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            },
          });

          console.log('✅ Organization created via Better Auth:', org);

          // 3️⃣ Refresh session to get updated org data
          await fetchSession();
        } catch (orgErr: any) {
          console.warn(
            '⚠️ Organization creation failed:',
            orgErr?.data?.message || orgErr?.message,
          );
        }
      }

      return { data, error: null };
    } catch (err: any) {
      console.error('❌ Signup failed:', err);
      return {
        data: null,
        error: {
          message: err?.data?.message || err?.message || 'Sign up failed',
          code: err?.statusCode || err?.code,
        },
      };
    } finally {
      loading.value = false;
    }
  };

  // 🔹 Sign Out
  const signOut = async (): Promise<void> => {
    try {
      await $fetch('/api/auth/sign-out', { method: 'POST' });
      session.value = null;

      // Optional cleanup
      if (import.meta.client) {
        localStorage.removeItem('currentOrganizationId');
      }

      console.log('✅ Signed out');
    } catch (err) {
      console.error('❌ Sign out failed:', err);
    }
  };

  // 🔹 Role-based access helper
  const hasRole = (roles: string[]) => {
    return computed(() => {
      const role = session.value?.user?.organizationRole;
      return role ? roles.includes(role) : false;
    });
  };

  // 🔹 Check if user has specific organization
  const isInOrganization = (organizationId: string) => {
    return computed(() => {
      return session.value?.user?.currentOrganizationId === organizationId;
    });
  };

  // ==================== RETURN ====================
  return {
    // State
    session,
    loading,

    // Computed
    user: computed(() => session.value?.user),
    isAuthenticated: computed(() => !!session.value?.user),

    // Helpers
    hasRole,
    isInOrganization,

    // Actions
    fetchSession,
    signIn,
    signUp,
    signOut,
  };
};
