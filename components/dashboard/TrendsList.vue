<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { ApexOptions } from 'apexcharts';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import ApexChart from 'vue3-apexcharts';

// Wrapper to safely call refresh
const handleRefresh = async () => {
  try {
    await refresh();
  } catch (err) {
    console.error('Failed to refresh trends:', err);
  }
};
/* =======================
   TYPES
======================= */
interface TrendsResponse {
  success: boolean;
  data: {
    graph: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        borderColor: string;
      }[];
    };
    accounts: {
      name: string;
      balance: string;
      percentage: string;
      color: string;
    }[];
  };
}

/* =======================
   STATE
======================= */
const isDark = ref(false);
const autoRefreshInterval = ref<ReturnType<typeof setInterval> | null>(null);

/* =======================
   API (CLIENT ONLY)
======================= */
/* =======================
   API (CLIENT ONLY)
======================= */
const { data, pending, error, refresh } = await useAsyncData<TrendsResponse>(
  'dashboard-trends',
  () => $fetch('/api/dashboard/trends'),
  { server: false },
);

// ✅ Move handleRefresh HERE (after refresh is defined)

/* =======================
   COMPUTED
======================= */
const trends = computed(() => data.value?.data ?? null);

const chartSeries = computed(() =>
  trends.value
    ? trends.value.graph.datasets.map(ds => ({
        name: ds.label,
        data: ds.data,
        color: ds.borderColor,
      }))
    : [],
);

const chartColors = computed(() =>
  trends.value ? trends.value.graph.datasets.map(ds => ds.borderColor) : [],
);

/* =======================
   LIFECYCLE
======================= */
onMounted(() => {
  isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;

  autoRefreshInterval.value = setInterval(refresh, 30000);
});

onUnmounted(() => {
  if (autoRefreshInterval.value) {
    clearInterval(autoRefreshInterval.value);
  }
});

/* =======================
   CHART OPTIONS
======================= */
const chartOptions = computed<ApexOptions>(() => ({
  chart: {
    type: 'line',
    toolbar: { show: false },
    background: isDark.value ? '#1f2937' : '#ffffff',
  },

  colors: chartColors.value,

  xaxis: {
    categories: trends.value?.graph.labels ?? [],
  },

  stroke: {
    curve: 'smooth',
    width: 2,
  },

  grid: {
    borderColor: isDark.value ? '#374151' : '#e5e7eb',
  },

  legend: {
    labels: {
      colors: isDark.value ? '#f3f4f6' : '#111827',
    },
  },

  tooltip: {
    theme: isDark.value ? 'dark' : 'light',
  },
}));
</script>

<template>
  <ClientOnly>
    <div
      class="mb-10 rounded-xl p-6 shadow"
      :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'"
    >
      <!-- HEADER -->
      <div class="mb-6 flex items-center justify-between">
        <h2 class="flex items-center text-lg font-bold">
          <Icon icon="mdi:trending-up" class="mr-2 h-5 w-5" />
          Trends Overview
        </h2>

        <button
          class="rounded-full p-2 transition"
          :class="{
            'bg-gray-700 hover:bg-gray-600': isDark,
            'bg-gray-100 hover:bg-gray-200': !isDark,
          }"
          @click="handleRefresh"
        >
          <Icon icon="mdi:refresh" class="h-4 w-4" />
        </button>
      </div>

      <!-- LOADING -->
      <div v-if="pending" class="flex h-64 items-center justify-center text-gray-400">
        Loading trends...
      </div>

      <!-- ERROR -->
      <div v-else-if="error" class="text-red-500">Failed to load trends</div>

      <!-- CONTENT -->
      <div v-else-if="trends" class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <!-- LEFT : GRAPH -->
        <div
          class="rounded-lg p-4 lg:col-span-2"
          :class="isDark ? 'bg-gray-900' : 'bg-gray-50'"
          style="height: 300px"
        >
          <ApexChart type="line" :options="chartOptions" :series="chartSeries" height="100%" />
        </div>

        <!-- RIGHT : AMOUNTS -->
        <div class="space-y-4 rounded-lg p-4" :class="isDark ? 'bg-gray-900' : 'bg-gray-50'">
          <h3 class="text-sm font-semibold text-gray-500">Accounts</h3>

          <div
            v-for="acc in trends.accounts"
            :key="acc.name"
            class="flex items-center justify-between border-b pb-3"
            :class="isDark ? 'border-gray-700' : 'border-gray-200'"
          >
            <div>
              <div class="text-sm text-gray-500">
                {{ acc.name }}
              </div>
              <div class="text-lg font-bold">
                {{ acc.balance }}
              </div>
            </div>

            <span class="rounded-full px-2 py-1 text-xs font-medium text-white" :class="acc.color">
              {{ acc.percentage }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
