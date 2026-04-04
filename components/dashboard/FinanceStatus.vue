<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue';

// ✅ TypeScript Interface
interface Stat {
  label: string;
  value: string;
  icon: string;
  color: string;
}

const stats = ref<Stat[]>([]);
const loading = ref(false);

const fetchStats = async () => {
  loading.value = true;
  try {
    const res = await $fetch<{ success: boolean; data: { stats: Stat[] } }>(
      '/api/dashboard/FinanceStatus',
    );
    stats.value = res.data.stats;
  } catch (err: unknown) {
    console.error('❌ Error fetching stats:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => fetchStats());
</script>

<template>
  <div class="min-h-screen p-6">
    <!-- Header -->

    <!-- Financial Stats -->
    <div class="mb-6 grid grid-cols-1 gap-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="flex items-center justify-between rounded-lg bg-white p-4 shadow"
      >
        <div>
          <div class="text-sm text-gray-500">{{ stat.label }}</div>
          <div class="text-xl font-bold">{{ stat.value }}</div>
        </div>
        <div
          :class="`${stat.color} flex h-10 w-10 items-center justify-center rounded-full text-white`"
        >
          {{ stat.icon }}
        </div>
      </div>
    </div>

    <!-- Payout Button -->
    <div class="flex space-x-4">
      <button
        class="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-600 hover:outline-2 hover:outline-blue-300"
      >
        <Icon icon="heroicons:plus" class="h-3 w-3 rounded-full bg-white text-blue-800" />
        Payout
      </button>
      <button
        class="rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50 hover:outline-2 hover:outline-blue-300"
      >
        <Icon icon="mdi:broadcast" class="text-xl text-blue-500" />
      </button>
    </div>

    <!-- Footer -->
  </div>
</template>
