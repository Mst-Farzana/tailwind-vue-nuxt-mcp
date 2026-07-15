<template>
  <div class="rounded-xl bg-white p-5 shadow dark:bg-gray-800 dark:shadow-gray-900/50">
    <p class="text-sm text-gray-500">{{ title }}</p>
    <h3 class="mt-2 text-2xl font-bold">{{ value }}</h3>
    <p class="mt-1 text-sm" :class="positive ? 'text-green-500' : 'text-red-500'">{{ delta }}</p>
  </div>
</template>
<script setup lang="ts">
interface Props {
  title?: string;
  value?: string;
  delta?: string;
  positive?: boolean;
}

withDefaults(defineProps<Props>(), {
  title: '',
  value: '',
  delta: '',
  positive: true,
});
</script>
