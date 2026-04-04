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

const { data: cardsData, pending } = await useAsyncData<Card[]>(
  'overview',
  () => $fetch<Card[]>('/api/overview', { credentials: 'include' }),
  { server: true, default: () => [] },
);

const cards = computed(() => cardsData.value ?? []);
</script>

<template>
  <div class="w-full">
    <!-- Header -->
    <div class="mb-8 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow">
          <Icon icon="mdi:trending-up" class="text-xl text-gray-700" />
        </div>
        <h1 class="text-3xl font-semibold text-gray-800">Overview</h1>
      </div>

      <button
        class="flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2 text-white shadow transition hover:bg-gray-800"
      >
        <Icon icon="mdi:credit-card-outline" class="text-xl" />
        Buy dashboard
      </button>
    </div>

    <!-- Cards Grid -->
    <div v-if="pending" class="py-12 text-center">
      <div
        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
      />
      <p class="mt-4 text-gray-500">Loading dashboard data...</p>
    </div>

    <div v-else class="grid grid-cols-2 gap-6">
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
