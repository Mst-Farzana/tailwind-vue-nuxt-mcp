<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed } from 'vue';
import DashboardCard from '~/components/overview/card.vue';

interface Card {
  id: number;
  statusText: string;
  statusColor: 'green' | 'red' | 'yellow' | 'blue';
  title: string;
  value: string;
  icon: string;
  iconColor: string;
}

const {
  data: cardsData,
  pending,
  error,
  refresh,
} = await useAsyncData<Card[]>(
  'overview',
  async () => {
    try {
      const response = await $fetch<Card[]>('/api/overview', {
        credentials: 'include',
      });
      return response;
    } catch (err) {
      console.error('API Error:', err);
      return [];
    }
  },
  {
    server: false,
    default: () => [],
  },
);

const cards = computed(() => cardsData.value ?? []);
const hasError = computed(() => error.value !== null);
</script>

<template>
  <div class="w-full p-4 md:p-6 lg:p-8">
    <!-- Header - Responsive -->
    <div
      class="mb-6 flex flex-col items-start justify-between gap-4 md:mb-8 md:flex-row md:items-center"
    >
      <div class="flex items-center gap-3">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow md:h-12 md:w-12 dark:bg-gray-800 dark:shadow-gray-900"
        >
          <Icon
            icon="mdi:trending-up"
            class="text-xl text-gray-700 md:text-2xl dark:text-gray-300"
          />
        </div>
        <h1 class="text-2xl font-semibold text-gray-800 md:text-3xl dark:text-gray-100">
          Overview
        </h1>
      </div>

      <button
        class="flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm text-white shadow transition hover:bg-gray-800 md:px-5 md:text-base dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        <Icon icon="mdi:credit-card-outline" class="text-lg md:text-xl" />
        <span>Buy dashboard</span>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="py-12 text-center">
      <div
        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
      />
      <p class="mt-4 text-gray-500 dark:text-gray-400">Loading dashboard data...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="hasError" class="py-12 text-center">
      <div class="inline-block h-16 w-16 rounded-full bg-red-100 p-4 dark:bg-red-900/30">
        <Icon icon="mdi:alert-circle-outline" class="text-4xl text-red-600 dark:text-red-400" />
      </div>
      <p class="mt-4 text-lg text-gray-700 dark:text-gray-300">Failed to load dashboard data</p>
      <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Please check your connection and try again
      </p>
      <button
        class="mt-4 rounded-full bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
        @click="() => refresh()"
      >
        Retry
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="cards.length === 0" class="py-12 text-center">
      <div class="inline-block h-16 w-16 rounded-full bg-gray-100 p-4 dark:bg-gray-800">
        <Icon icon="mdi:database-off-outline" class="text-4xl text-gray-400 dark:text-gray-500" />
      </div>
      <p class="mt-4 text-lg text-gray-700 dark:text-gray-300">No data available</p>
      <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Dashboard data will appear here once available
      </p>
    </div>

    <!-- Cards Grid - Responsive: 1 col mobile, 2 cols tablet, 3-4 cols desktop -->
    <div
      v-else
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4"
    >
      <DashboardCard
        v-for="(card, index) in cards"
        :key="card.id"
        :index="index"
        :status-text="card.statusText"
        :status-color="card.statusColor"
        :title="card.title"
        :value="card.value"
        :icon="card.icon"
        :icon-color="card.iconColor"
      />
    </div>
  </div>
</template>
