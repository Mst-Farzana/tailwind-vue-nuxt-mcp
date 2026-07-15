<script setup lang="ts">
import { Icon } from '@iconify/vue';
interface Transaction {
  id: number;
  amount: number;
  type: string;
  label: string;
  time: string;
  via: string;
  account: string;
  icon: string;
  icon_bg: string;
}

defineProps<{ transaction: Transaction }>();
</script>

<template>
  <div class="rounded p-4 transition hover:shadow-lg dark:bg-gray-900 dark:text-gray-100">
    <div class="flex items-center justify-between text-sm">
      <div class="flex items-center justify-center gap-8">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 p-1">
          <Icon
            :icon="transaction.icon"
            class="h-4 w-4"
            :class="transaction.icon_bg.replace('bg-', 'text-')"
          />
        </div>

        <div>
          <p class="text-xl font-bold">${{ transaction.amount.toFixed(2) }}</p>
          <p class="text-gray-500">{{ transaction.time }} via {{ transaction.via }}</p>
        </div>
      </div>
      <div class="text-center">
        <p class="text-sm text-gray-400">{{ transaction.label }} - {{ transaction.account }}</p>
        <button
          :class="['float-end mt-2 rounded-2xl px-3 text-sm text-white', transaction.icon_bg]"
        >
          {{ transaction.type }}
        </button>
      </div>
    </div>
  </div>
</template>
