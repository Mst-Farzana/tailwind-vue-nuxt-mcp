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
} = await useAsyncData<Card[]>('overview', () => $fetch<Card[]>('/api/overview'), {
  default: () => [],
});

const cards = computed(() => cardsData.value ?? []);
const hasError = computed(() => !!error.value);
</script>

<template>
  <div class="w-full p-4 md:p-6 lg:p-8">
    <!-- Header: Responsive Flex -->
    <div
      class="mb-6 flex flex-col items-start justify-between gap-4 md:mb-8 md:flex-row md:items-center"
    >
      <div class="flex items-center gap-3">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow md:h-12 md:w-12 dark:bg-gray-800 dark:shadow-gray-900/50"
        >
          <Icon
            icon="mdi:trending-up"
            class="text-xl text-gray-700 md:text-2xl dark:text-gray-300"
          />
        </div>
        <!-- ✅ পরিবর্তন ১: হেডিংয়ে ডার্ক মোড টেক্সট কালার যোগ করা হয়েছে -->
        <h1 class="text-2xl font-semibold text-gray-900 md:text-3xl dark:text-gray-100">
          Overview
        </h1>
      </div>

      <!-- ✅ পরিবর্তন ২: বাটনের ডার্ক মোড কনট্রাস্ট উন্নত করা হয়েছে -->
      <button
        class="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-gray-800 md:px-5 md:text-base dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
        @click="refresh()"
      >
        Refresh Data
      </button>
    </div>

    <!-- DEBUG: টেক্সট কালার যোগ করা হয়েছে যাতে ডার্ক মোডে পড়া যায় -->
    <pre
      class="mb-6 rounded bg-gray-100 p-3 text-xs text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      >{{ cards }}
    </pre>

    <!-- Loading State -->
    <div v-if="pending" class="py-12 text-center text-gray-500 dark:text-gray-400">
      <div
        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
      ></div>
      <p class="mt-2">Loading dashboard data...</p>
    </div>

    <!-- Error State -->
    <!-- ✅ পরিবর্তন ৩: এরর মেসেজে ডার্ক মোড কালার যোগ করা হয়েছে -->
    <div v-else-if="hasError" class="py-12 text-center text-red-500 dark:text-red-400">
      <Icon icon="mdi:alert-circle-outline" class="mx-auto mb-2 text-4xl" />
      <p>Failed to load data. Please try again.</p>
      <button
        class="mt-4 rounded-full bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        @click="refresh()"
      >
        Retry
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="cards.length === 0" class="py-12 text-center text-gray-500 dark:text-gray-400">
      <Icon icon="mdi:database-off-outline" class="mx-auto mb-2 text-4xl" />
      <p>No data available</p>
    </div>

    <!-- ✅ পরিবর্তন ৪: গ্রিড লেআউট অপ্টিমাইজ করা হয়েছে (৪টি কার্ডের জন্য পারফেক্ট) -->
    <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
