<script setup lang="ts">
import { navigateTo, useRoute } from '#imports';
import { computed, onMounted, ref, watch } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { useOrganization } from '~/composables/useOrganization';

type PricingPlan = 'beginner' | 'standard' | 'pro';

const { session, fetchSession } = useAuth();
const { currentOrganization, subscription, fetchOrganizations } = useOrganization();

const billingPeriod = ref<'monthly' | 'yearly'>('monthly');
const loadingPlan = ref<PricingPlan | null>(null);
const upgradeError = ref<string | null>(null);

const isAuthenticated = computed(() => !!session.value?.user);
const orgId = computed(
  () => currentOrganization.value?.id || session.value?.user?.currentOrganizationId,
);
const currentPlan = computed(() => subscription.value?.plan || 'free');

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

const isCurrentPlan = (plan: PricingPlan) => currentPlan.value === plan;

const getButtonText = (plan: PricingPlan) => {
  if (loadingPlan.value === plan) return 'Processing...';
  if (isCurrentPlan(plan)) return 'Current Plan';
  return 'Subscribe';
};

const isButtonDisabled = (plan: PricingPlan) => loadingPlan.value !== null || isCurrentPlan(plan);
</script>

<template>
  <div
    class="min-h-screen bg-gray-50 py-12 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100"
  >
    <!-- Error Message -->
    <div v-if="upgradeError" class="mx-auto mb-6 max-w-6xl px-4">
      <div
        class="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400"
      >
        <span>{{ upgradeError }}</span>
        <button
          class="ml-4 font-bold hover:text-red-900 dark:hover:text-red-300"
          @click="upgradeError = null"
        >
          &times;
        </button>
      </div>
    </div>

    <!-- Login Prompt -->
    <div v-if="!isAuthenticated" class="mx-auto mb-8 max-w-6xl px-4 text-center">
      <div
        class="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-yellow-800 dark:border-yellow-900/50 dark:bg-yellow-900/20 dark:text-yellow-400"
      >
        Please
        <NuxtLink
          to="/auth/login"
          class="font-bold underline hover:text-yellow-900 dark:hover:text-yellow-300"
        >
          login
        </NuxtLink>
        to upgrade your plan.
      </div>
    </div>

    <!-- Header -->
    <div class="mb-10 px-4 text-center">
      <h1 class="mb-2 text-4xl font-black text-gray-900 md:text-5xl dark:text-white">
        Sample Pricing
      </h1>
      <p class="text-lg text-gray-600 md:text-xl dark:text-gray-400">
        Choose the perfect plan for your needs
      </p>

      <div
        v-if="isAuthenticated && currentOrganization"
        class="mt-4 text-sm text-gray-500 dark:text-gray-400"
      >
        Upgrading:
        <span class="font-semibold text-gray-900 dark:text-gray-200">
          {{ currentOrganization.name }}
        </span>
      </div>
    </div>

    <!-- Billing Toggle -->
    <div class="mb-12 flex justify-center gap-4 px-4">
      <button
        :class="[
          'rounded-full px-6 py-3 font-medium transition-all duration-200',
          billingPeriod === 'monthly'
            ? 'bg-gray-900 text-white shadow-md dark:bg-white dark:text-gray-900'
            : 'border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700',
        ]"
        :disabled="loadingPlan !== null"
        @click="billingPeriod = 'monthly'"
      >
        Monthly
      </button>

      <button
        :class="[
          'rounded-full px-6 py-3 font-medium transition-all duration-200',
          billingPeriod === 'yearly'
            ? 'bg-gray-900 text-white shadow-md dark:bg-white dark:text-gray-900'
            : 'border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700',
        ]"
        :disabled="loadingPlan !== null"
        @click="billingPeriod = 'yearly'"
      >
        Yearly
        <span class="ml-1 text-xs font-semibold text-green-600 dark:text-green-400">Save 20%</span>
      </button>
    </div>

    <!-- Pricing Cards -->
    <div class="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-3">
      <!-- Beginner Plan -->
      <div
        class="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900 dark:shadow-gray-950/50"
      >
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white">
          {{ billingPeriod === 'monthly' ? '$19' : '$190' }}
        </h2>
        <p class="mt-2 text-lg font-medium text-gray-500 dark:text-gray-400">Beginner</p>
        <ul class="my-8 flex-1 space-y-3 text-sm text-gray-600 dark:text-gray-300">
          <li class="flex items-center gap-2">
            <span class="text-blue-600 dark:text-blue-400">✓</span>
            5 units
          </li>
          <li class="flex items-center gap-2">
            <span class="text-blue-600 dark:text-blue-400">✓</span>
            100 minutes
          </li>
          <li class="flex items-center gap-2">
            <span class="text-blue-600 dark:text-blue-400">✓</span>
            1 user
          </li>
        </ul>
        <button
          :disabled="isButtonDisabled('beginner')"
          class="w-full rounded-lg border-2 border-blue-600 px-4 py-3 font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-900/20"
          @click="upgrade('beginner')"
        >
          {{ getButtonText('beginner') }}
        </button>
      </div>

      <!-- Standard Plan -->
      <div
        class="relative flex flex-col rounded-2xl border-2 border-blue-600 bg-white p-8 shadow-xl transition-colors duration-300 dark:border-blue-500 dark:bg-gray-900 dark:shadow-blue-900/20"
      >
        <div
          class="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-bold tracking-wider text-white uppercase dark:bg-blue-500"
        >
          Most Popular
        </div>
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white">
          {{ billingPeriod === 'monthly' ? '$29' : '$290' }}
        </h2>
        <p class="mt-2 text-lg font-medium text-gray-500 dark:text-gray-400">Standard</p>
        <ul class="my-8 flex-1 space-y-3 text-sm text-gray-600 dark:text-gray-300">
          <li class="flex items-center gap-2">
            <span class="text-blue-600 dark:text-blue-400">✓</span>
            25 units
          </li>
          <li class="flex items-center gap-2">
            <span class="text-blue-600 dark:text-blue-400">✓</span>
            1000 minutes
          </li>
          <li class="flex items-center gap-2">
            <span class="text-blue-600 dark:text-blue-400">✓</span>
            10 users
          </li>
        </ul>
        <button
          :disabled="isButtonDisabled('standard')"
          class="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-500"
          @click="upgrade('standard')"
        >
          {{ getButtonText('standard') }}
        </button>
      </div>

      <!-- Pro Plan -->
      <div
        class="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900 dark:shadow-gray-950/50"
      >
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white">
          {{ billingPeriod === 'monthly' ? '$39' : '$390' }}
        </h2>
        <p class="mt-2 text-lg font-medium text-gray-500 dark:text-gray-400">Pro</p>
        <ul class="my-8 flex-1 space-y-3 text-sm text-gray-600 dark:text-gray-300">
          <li class="flex items-center gap-2">
            <span class="text-blue-600 dark:text-blue-400">✓</span>
            100 units
          </li>
          <li class="flex items-center gap-2">
            <span class="text-blue-600 dark:text-blue-400">✓</span>
            10000 minutes
          </li>
          <li class="flex items-center gap-2">
            <span class="text-blue-600 dark:text-blue-400">✓</span>
            Unlimited users
          </li>
        </ul>
        <button
          :disabled="isButtonDisabled('pro')"
          class="w-full rounded-lg border-2 border-blue-600 px-4 py-3 font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-900/20"
          @click="upgrade('pro')"
        >
          {{ getButtonText('pro') }}
        </button>
      </div>
    </div>
  </div>
</template>
