<!-- components/GitHubBanner.vue -->
<template>
  <div
    class="relative mt-10 overflow-hidden rounded-2xl p-8 text-center dark:bg-gray-900 dark:text-gray-100"
  >
    <!-- Gradient Background -->
    <div class="absolute inset-0 bg-linear-to-br from-purple-500 via-blue-500 to-cyan-500" />

    <!-- Content -->
    <div class="relative z-10">
      <!-- Text -->
      <h2 class="mb-6 text-2xl font-bold text-white md:text-3xl">
        Like the project? Please star on
        <span class="font-extrabold">GitHub</span>
        ;-)
      </h2>

      <!-- GitHub Button -->
      <a
        href="https://github.com/Mst-Farzana"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-gray-900 shadow-lg transition-all duration-300 hover:bg-gray-100 hover:shadow-xl"
      >
        <Icon icon="mdi:github" class="h-5 w-5" />
        GitHub
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>
