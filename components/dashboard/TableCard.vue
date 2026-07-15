<!-- components/TableCard.vue -->
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue';

interface Transaction {
  id: number;
  amount: string;
  date: string;
  via: string;
  account: string;
  action: string;
  icon: string;
}

const transactions = ref<Transaction[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const fetchTransactions = async () => {
  loading.value = true;
  error.value = null;
  try {
    const res = await $fetch<{ success: boolean; data: Transaction[] }>(
      '/api/dashboard/FinancTable',
    );
    transactions.value = res.data;
  } catch (err) {
    error.value = 'Failed to load data';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => fetchTransactions());
</script>

<template>
  <!-- Loading / Error / Empty / List -->
  <div v-if="loading" class="py-8 text-center">Loading...</div>
  <div v-else-if="error" class="py-8 text-center text-red-400">{{ error }}</div>
  <div v-else-if="transactions.length === 0" class="py-8 text-center text-gray-500">No data</div>
  <div v-else class="space-y-4">
    <div
      v-for="trans in transactions"
      :key="trans.id"
      class="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-900 dark:text-gray-100"
    >
      <div class="flex items-center space-x-4 dark:bg-gray-900 dark:text-gray-100">
        <Icon
          :icon="trans.icon"
          class="text-2xl"
          :class="{
            'text-green-400': trans.action === 'Deposit',
            'text-blue-400': trans.action === 'Payment',
            'text-yellow-400': trans.action === 'Invoice',
            'text-red-400': trans.action === 'Withdrawal',
          }"
        />
        <div>
          <div class="text-lg font-bold">{{ trans.amount }}</div>
          <div class="text-sm text-gray-400">{{ trans.date }} via {{ trans.via }}</div>
        </div>
      </div>
      <div class="space-x-4">
        <div class="mb-2 text-sm text-gray-400">{{ trans.account }}</div>
        <span
          class="float-end mr-3 rounded-full px-3 py-1 text-xs"
          :class="{
            'bg-green-900 text-green-300': trans.action === 'Deposit',
            'bg-blue-900 text-blue-300': trans.action === 'Payment',
            'bg-yellow-900 text-yellow-300': trans.action === 'Invoice',
            'bg-red-900 text-red-300': trans.action === 'Withdrawal',
          }"
        >
          {{ trans.action }}
        </span>
      </div>
    </div>
  </div>
</template>
