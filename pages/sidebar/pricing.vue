<script setup lang="ts">
import { navigateTo, useRoute } from '#imports';
import { computed, onMounted, ref, watch } from 'vue';
import { useAuth } from '~/composables/useAuth';
// ✅ FIX: Use 'import type' for interfaces to satisfy verbatimModuleSyntax
import { useOrganization } from '~/composables/useOrganization';

// Types
type PricingPlan = 'beginner' | 'standard' | 'pro';

// Composables
const { session, fetchSession } = useAuth();
const { currentOrganization, subscription, fetchOrganizations } = useOrganization();

// State
const billingPeriod = ref<'monthly' | 'yearly'>('monthly');
const loadingPlan = ref<PricingPlan | null>(null);
const upgradeError = ref<string | null>(null);

// Computed Helpers
const isAuthenticated = computed(() => !!session.value?.user);
const orgId = computed(
  () => currentOrganization.value?.id || session.value?.user?.currentOrganizationId,
);
const currentPlan = computed(() => subscription.value?.plan || 'free');

// Lifecycle
const route = useRoute();

onMounted(async () => {
  if (session.value?.user) {
    await fetchOrganizations();
  }
});

watch(session, async newVal => {
  if (newVal?.user) {
    await fetchOrganizations();
  }
});

// Methods
const upgrade = async (plan: PricingPlan) => {
  upgradeError.value = null;

  if (!isAuthenticated.value) {
    await navigateTo(`/auth/login?redirect=${route.fullPath}`);
    return;
  }

  if (!orgId.value) {
    upgradeError.value = 'Please select an organization first';
    return;
  }

  try {
    loadingPlan.value = plan;

    const response = await $fetch<{ success: boolean }>('/api/subscription/upgrade', {
      method: 'POST',
      body: { orgId: orgId.value, plan, billingPeriod: billingPeriod.value },
      headers: { 'x-organization-id': orgId.value },
      credentials: 'include',
    });

    if (response.success) {
      await fetchSession();
      await fetchOrganizations();
      alert(`Successfully upgraded to ${plan} plan 🎉`);
    }
  } catch (err: any) {
    console.error(err);
    upgradeError.value = 'Upgrade failed. Please try again.';
  } finally {
    loadingPlan.value = null;
  }
};

// Button Helpers
const isCurrentPlan = (plan: PricingPlan) => currentPlan.value === plan;

const getButtonText = (plan: PricingPlan) => {
  if (loadingPlan.value === plan) return 'Processing...';
  if (isCurrentPlan(plan)) return 'Current Plan';
  return 'Subscribe';
};

const isButtonDisabled = (plan: PricingPlan) => loadingPlan.value !== null || isCurrentPlan(plan);
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12 dark:bg-gray-950 dark:text-gray-100">
    <!-- Error Message -->
    <div v-if="upgradeError" class="mx-auto mb-6 max-w-6xl px-4">
      <div class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
        {{ upgradeError }}
        <button class="float-right font-bold" @click="upgradeError = null">&times;</button>
      </div>
    </div>

    <!-- Login Prompt -->
    <div v-if="!isAuthenticated" class="mx-auto mb-8 max-w-6xl px-4 text-center">
      <div class="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-yellow-800">
        Please
        <NuxtLink to="/auth/login" class="font-bold underline">login</NuxtLink>
        to upgrade your plan.
      </div>
    </div>

    <!-- Header -->
    <div class="mb-10 text-center">
      <h1 class="mb-2 text-5xl font-black text-gray-900">Sample Pricing</h1>
      <p class="text-xl text-gray-600">Choose the perfect plan for your needs</p>

      <div v-if="isAuthenticated && currentOrganization" class="mt-4 text-sm text-gray-500">
        Upgrading:
        <span class="font-semibold">{{ currentOrganization.name }}</span>
      </div>
    </div>

    <!-- Billing Toggle -->
    <div class="mb-12 flex justify-center gap-4">
      <button
        :class="[
          'rounded-full px-6 py-3 font-medium transition',
          billingPeriod === 'monthly'
            ? 'bg-gray-800 text-white'
            : 'border border-gray-300 bg-white text-gray-800 hover:bg-gray-50',
        ]"
        :disabled="loadingPlan !== null"
        @click="billingPeriod = 'monthly'"
      >
        Monthly
      </button>

      <button
        :class="[
          'rounded-full px-6 py-3 font-medium transition',
          billingPeriod === 'yearly'
            ? 'bg-gray-800 text-white'
            : 'border border-gray-300 bg-white text-gray-800 hover:bg-gray-50',
        ]"
        :disabled="loadingPlan !== null"
        @click="billingPeriod = 'yearly'"
      >
        Yearly
        <span class="ml-1 text-xs text-green-500">Save 20%</span>
      </button>
    </div>

    <!-- Pricing Cards -->
    <div class="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-3">
      <!-- Beginner Plan -->
      <div class="rounded-lg border bg-white p-6 shadow">
        <h2 class="text-3xl font-bold">
          {{ billingPeriod === 'monthly' ? '$19' : '$190' }}
        </h2>
        <p class="mt-2 text-gray-500">Beginner</p>
        <ul class="my-6 space-y-2 text-sm">
          <li>5 units</li>
          <li>100 minutes</li>
          <li>1 user</li>
        </ul>
        <button
          :disabled="isButtonDisabled('beginner')"
          class="w-full rounded-md border border-blue-600 px-4 py-2 text-blue-600"
          @click="upgrade('beginner')"
        >
          {{ getButtonText('beginner') }}
        </button>
      </div>

      <!-- Standard Plan -->
      <div class="rounded-lg border-2 border-blue-500 bg-white p-6 shadow-lg">
        <h2 class="text-3xl font-bold">
          {{ billingPeriod === 'monthly' ? '$29' : '$290' }}
        </h2>
        <p class="mt-2 text-gray-500">Standard</p>
        <ul class="my-6 space-y-2 text-sm">
          <li>25 units</li>
          <li>1000 minutes</li>
          <li>10 users</li>
        </ul>
        <button
          :disabled="isButtonDisabled('standard')"
          class="w-full rounded-md bg-blue-600 px-4 py-2 text-white"
          @click="upgrade('standard')"
        >
          {{ getButtonText('standard') }}
        </button>
      </div>

      <!-- Pro Plan -->
      <div class="rounded-lg border bg-white p-6 shadow">
        <h2 class="text-3xl font-bold">
          {{ billingPeriod === 'monthly' ? '$39' : '$390' }}
        </h2>
        <p class="mt-2 text-gray-500">Pro</p>
        <ul class="my-6 space-y-2 text-sm">
          <li>100 units</li>
          <li>10000 minutes</li>
          <li>Unlimited users</li>
        </ul>
        <button
          :disabled="isButtonDisabled('pro')"
          class="w-full rounded-md border border-blue-600 px-4 py-2 text-blue-600"
          @click="upgrade('pro')"
        >
          {{ getButtonText('pro') }}
        </button>
      </div>
    </div>
  </div>
</template>
