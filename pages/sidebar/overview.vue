<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed, watchEffect } from 'vue';
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
} = await useAsyncData<Card[]>('overview', () => $fetch<Card[]>('/api/overview'), {
  default: () => [],
});

const cards = computed(() => cardsData.value ?? []);
const hasError = computed(() => !!error.value);

watchEffect(() => {
  console.log('cardsData:', cardsData.value);
  console.log('cards:', cards.value);
  console.log('pending:', pending.value);
  console.log('error:', error.value);
});
</script>

<template>
  <div class="w-full p-4 md:p-6 lg:p-8">
    <div
      class="mb-6 flex flex-col items-start justify-between gap-4 md:mb-8 md:flex-row md:items-center"
    >
      <div class="flex items-center gap-3">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow md:h-12 md:w-12 dark:bg-gray-800"
        >
          <Icon
            icon="mdi:trending-up"
            class="text-xl text-gray-700 md:text-2xl dark:text-gray-300"
          />
        </div>

        <h1 class="text-2xl font-semibold md:text-3xl">Overview</h1>
      </div>

      <button class="rounded-full bg-black px-4 py-2 text-white" @click="refresh()">Refresh</button>
    </div>

    <!-- DEBUG -->
    <pre class="mb-6 rounded bg-gray-100 p-3 text-xs dark:bg-gray-900"
      >{{ cards }}
    </pre>

    <div v-if="pending" class="py-10 text-center">Loading...</div>

    <div v-else-if="hasError" class="py-10 text-center text-red-500">
      {{ error }}
    </div>

    <div v-else-if="cards.length === 0" class="py-10 text-center">No data available</div>

    <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
