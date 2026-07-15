<script setup lang="ts">
import { Icon } from '@iconify/vue';
import TableCard from './TableCard.vue';
</script>

<template>
  <div class="min-h-screen p-6 dark:bg-gray-900 dark:text-gray-100">
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <div class="flex items-center">
        <Icon icon="mdi:trending-up" class="mr-2 h-6 w-6 rounded-full bg-gray-50 p-1" />
        <h1 class="text-2xl font-bold">Finance</h1>
      </div>
      <button class="rounded-lg bg-gray-100 px-4 py-2 text-gray-900 hover:bg-gray-200">
        <Icon icon="mdi:cog" class="h-4 w-4" />
      </button>
    </div>
    <table-card />
    <!-- Loading / Error -->
  </div>
</template>
