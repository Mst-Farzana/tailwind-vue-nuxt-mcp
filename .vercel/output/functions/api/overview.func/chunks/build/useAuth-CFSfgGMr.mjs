import { computed } from 'vue';
import { j as useState } from './server.mjs';

const useAuth = () => {
  const session = useState("auth-session", () => null);
  const loading = useState("auth-loading", () => false);
  const fetchSession = async () => {
    try {
      const data = await $fetch("/api/auth/session");
      session.value = data;
      return data;
    } catch (err) {
      console.error("Failed to fetch session:", err);
      session.value = null;
      return null;
    }
  };
  const signIn = async (email, password) => {
    loading.value = true;
    try {
      console.log("📤 Signing in user:", email);
      const data = await $fetch("/api/auth/sign-in/email", {
        method: "POST",
        body: { email, password }
      });
      console.log("✅ Signed in successfully!");
      await fetchSession();
      return { data, error: null };
    } catch (err) {
      console.error("❌ Sign in failed:", err);
      return {
        data: null,
        // ✅ Add "data:"
        error: { message: err?.data?.message || err?.message || "Sign up failed" }
      };
    } finally {
      loading.value = false;
    }
  };
  const signUp = async (payload) => {
    loading.value = true;
    try {
      console.log("📤 Signing up user:", payload.email);
      const data = await $fetch("/api/auth/sign-up/email", {
        method: "POST",
        body: {
          name: payload.name,
          email: payload.email,
          password: payload.password
        }
      });
      console.log("✅ User created, refreshing session...");
      await fetchSession();
      if (session.value?.user) {
        console.log("🏢 Creating organization via Better Auth API...");
        try {
          const org = await $fetch("/api/auth/organization/create", {
            method: "POST",
            body: {
              name: `${payload.name}'s Organization`,
              slug: payload.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
            }
          });
          console.log("✅ Organization created via Better Auth:", org);
          await fetchSession();
        } catch (orgErr) {
          console.warn(
            "⚠️ Organization creation failed:",
            orgErr?.data?.message || orgErr?.message
          );
        }
      }
      return { data, error: null };
    } catch (err) {
      console.error("❌ Signup failed:", err);
      return {
        data: null,
        error: {
          message: err?.data?.message || err?.message || "Sign up failed",
          code: err?.statusCode || err?.code
        }
      };
    } finally {
      loading.value = false;
    }
  };
  const signOut = async () => {
    try {
      await $fetch("/api/auth/sign-out", { method: "POST" });
      session.value = null;
      if (false) ;
      console.log("✅ Signed out");
    } catch (err) {
      console.error("❌ Sign out failed:", err);
    }
  };
  const hasRole = (roles) => {
    return computed(() => {
      const role = session.value?.user?.organizationRole;
      return role ? roles.includes(role) : false;
    });
  };
  const isInOrganization = (organizationId) => {
    return computed(() => {
      return session.value?.user?.currentOrganizationId === organizationId;
    });
  };
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
    signOut
  };
};

export { useAuth as u };
//# sourceMappingURL=useAuth-CFSfgGMr.mjs.map
