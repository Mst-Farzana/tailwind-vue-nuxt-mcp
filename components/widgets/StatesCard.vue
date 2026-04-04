<template>
  <div class="rounded-xl bg-white p-5 shadow dark:bg-gray-800">
    <h3 class="text-sm text-gray-500 dark:text-gray-400">{{ title }}</h3>
    <p class="text-2xl font-bold">{{ value }}</p>
    <p class="mt-1 text-xs text-green-500">{{ delta }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: String,
  delta: String,
});
</script>
