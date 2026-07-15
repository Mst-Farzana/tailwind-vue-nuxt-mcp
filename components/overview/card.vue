<!-- components/overview/Card.vue -->
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed } from 'vue';
import { useCountAnimation } from '~/composables/useCountAnimation';

const props = defineProps<{
  statusText: string;
  statusColor: 'green' | 'red' | 'yellow' | 'blue';
  title: string;
  value: string;
  icon: string;
  iconColor: string;
  index: number;
}>();

const numericValue = computed(() => {
  const num = Number(props.value.replace(/[^\d.-]/g, ''));
  return isNaN(num) ? 0 : num;
});

// ✅ Prefix & suffix extraction (more robust)
const prefix = computed(() => props.value.match(/^[^\d.-]*/)?.[0] ?? '');
const suffix = computed(() => props.value.match(/[\d.-]+(.*)$/)?.[1] ?? '');

// ✅ Use count animation - testMode অটোমেটিক ডিটেক্ট হবে
const { displayValue } = useCountAnimation(numericValue.value, 1500, props.index * 200);
</script>

<template>
  <div
    class="relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors duration-300 md:p-6 dark:border-gray-700 dark:bg-gray-800"
  >
    <!-- Top: Badge + Settings -->
    <div class="mb-3 flex items-start justify-between md:mb-4 dark:bg-gray-900 dark:text-gray-100">
      <span
        :class="[
          'rounded-full px-2.5 py-1 text-xs font-medium md:px-3',
          statusColor === 'green'
            ? 'bg-green-500 text-white'
            : statusColor === 'red'
              ? 'bg-red-500 text-white'
              : statusColor === 'yellow'
                ? 'bg-yellow-500 text-white'
                : 'bg-blue-500 text-white',
        ]"
      >
        {{ statusText }}
      </span>

      <button
        class="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-gray-100 transition hover:bg-gray-200 md:h-9 md:w-9 md:rounded-xl dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
        aria-label="Settings"
      >
        <Icon icon="mdi:cog-outline" class="text-lg text-gray-600 md:text-xl dark:text-gray-300" />
      </button>
    </div>

    <!-- Title -->
    <h3 class="mb-1 text-base font-semibold text-gray-900 md:mb-2 md:text-lg dark:text-gray-100">
      {{ title }}
    </h3>

    <!-- Value with counting animation -->
    <div
      class="mb-3 text-xl font-bold text-gray-900 md:mb-4 md:text-2xl lg:text-3xl dark:text-white"
    >
      {{ prefix }}{{ displayValue }}{{ suffix }}
    </div>

    <!-- Icon -->
    <div
      class="absolute right-4 bottom-4 md:right-5 md:bottom-5 dark:bg-gray-900 dark:text-gray-100"
    >
      <Icon
        :icon="icon"
        :class="[
          'text-2xl md:text-3xl',
          statusColor === 'green'
            ? 'text-green-500'
            : statusColor === 'red'
              ? 'text-red-500'
              : statusColor === 'yellow'
                ? 'text-yellow-500'
                : 'text-blue-500',
        ]"
      />
    </div>
  </div>
</template>
