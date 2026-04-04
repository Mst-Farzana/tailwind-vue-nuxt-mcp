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

// ✅ Extract numeric value (NaN হ্যান্ডেল করুন)
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
  <div class="relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <!-- Top: Badge + Settings -->
    <div class="mb-4 flex items-start justify-between">
      <span
        :class="[
          'rounded-full px-3 py-1 text-xs font-medium',
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
        class="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-gray-100 transition hover:bg-gray-200"
        aria-label="Settings"
      >
        <Icon icon="mdi:cog-outline" class="text-xl text-gray-600" />
      </button>
    </div>

    <!-- Title -->
    <h3 class="mb-2 text-lg font-semibold text-gray-900">{{ title }}</h3>

    <!-- Value with counting animation -->
    <div class="mb-4 text-2xl font-bold text-gray-900">
      {{ prefix }}{{ displayValue }}{{ suffix }}
    </div>

    <!-- Icon -->
    <div class="absolute right-5 bottom-5">
      <Icon
        :icon="icon"
        :class="[
          'text-3xl',
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
