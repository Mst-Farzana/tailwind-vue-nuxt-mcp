import { computed, onMounted, ref } from 'vue';
import type { Subscription } from './useAuth';
import { useAuth } from './useAuth';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Member {
  id: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const useOrganization = () => {
  const { session, fetchSession } = useAuth();

  const organizations = ref<Organization[]>([]);
  const currentOrganization = ref<Organization | null>(null);
  const subscription = ref<Subscription | null>(null);

  // -----------------------------
  // Fetch organizations
  // -----------------------------
  const fetchOrganizations = async () => {
    try {
      const res = await $fetch<Organization[]>('/api/org/list', {
        credentials: 'include',
      });

      organizations.value = res ?? [];

      if (!organizations.value.length) {
        currentOrganization.value = null;
        subscription.value = null;
        return;
      }

      const sessionOrgId = session.value?.user?.currentOrganizationId;
      currentOrganization.value = res.find(o => o.id === sessionOrgId) || res[0] || null;

      await fetchCurrentSubscription();
    } catch (error) {
      console.error('Failed to fetch organizations:', error);
      organizations.value = [];
      currentOrganization.value = null;
      subscription.value = null;
    }
  };

  // -----------------------------
  // Fetch subscription
  // -----------------------------
  const fetchCurrentSubscription = async () => {
    if (!currentOrganization.value) {
      subscription.value = null;
      return;
    }

    try {
      const sub = await $fetch<Subscription>(
        `/api/org/${currentOrganization.value.id}/subscription`,
        { credentials: 'include' },
      );

      subscription.value = sub ?? null;
    } catch (error) {
      console.error('Failed to fetch subscription:', error);
      subscription.value = null;
    }
  };

  // -----------------------------
  // Switch organization
  // -----------------------------
  const selectOrganization = async (org: Organization) => {
    try {
      await $fetch('/api/org/select', {
        method: 'POST',
        body: { organizationId: org.id },
        credentials: 'include',
      });

      currentOrganization.value = org;

      await fetchSession();
      await fetchOrganizations();
    } catch (error) {
      console.error('Failed to switch organization:', error);
    }
  };

  // -----------------------------
  // Check owner
  // -----------------------------
  const isOwner = computed(() => session.value?.user?.organizationRole === 'owner');

  // -----------------------------
  // Load on start
  // -----------------------------
  onMounted(async () => {
    await fetchSession();
    await fetchOrganizations();
  });

  return {
    organizations,
    currentOrganization,
    subscription,
    fetchOrganizations,
    selectOrganization,
    isOwner,
  };
};
