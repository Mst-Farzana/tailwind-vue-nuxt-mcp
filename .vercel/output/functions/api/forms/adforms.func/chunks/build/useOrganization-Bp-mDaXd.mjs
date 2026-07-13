import { ref, computed } from 'vue';
import { u as useAuth } from './useAuth-CFSfgGMr.mjs';

const useOrganization = () => {
  const { session, fetchSession } = useAuth();
  const organizations = ref([]);
  const currentOrganization = ref(null);
  const subscription = ref(null);
  const fetchOrganizations = async () => {
    try {
      const res = await $fetch("/api/org/list", {
        credentials: "include"
      });
      organizations.value = res ?? [];
      if (!organizations.value.length) {
        currentOrganization.value = null;
        subscription.value = null;
        return;
      }
      const sessionOrgId = session.value?.user?.currentOrganizationId;
      currentOrganization.value = res.find((o) => o.id === sessionOrgId) || res[0] || null;
      await fetchCurrentSubscription();
    } catch (error) {
      console.error("Failed to fetch organizations:", error);
      organizations.value = [];
      currentOrganization.value = null;
      subscription.value = null;
    }
  };
  const fetchCurrentSubscription = async () => {
    if (!currentOrganization.value) {
      subscription.value = null;
      return;
    }
    try {
      const sub = await $fetch(
        `/api/org/${currentOrganization.value.id}/subscription`,
        { credentials: "include" }
      );
      subscription.value = sub ?? null;
    } catch (error) {
      console.error("Failed to fetch subscription:", error);
      subscription.value = null;
    }
  };
  const selectOrganization = async (org) => {
    try {
      await $fetch("/api/org/select", {
        method: "POST",
        body: { organizationId: org.id },
        credentials: "include"
      });
      currentOrganization.value = org;
      await fetchSession();
      await fetchOrganizations();
    } catch (error) {
      console.error("Failed to switch organization:", error);
    }
  };
  const isOwner = computed(() => session.value?.user?.organizationRole === "owner");
  return {
    organizations,
    currentOrganization,
    subscription,
    fetchOrganizations,
    selectOrganization,
    isOwner
  };
};

export { useOrganization as u };
//# sourceMappingURL=useOrganization-Bp-mDaXd.mjs.map
