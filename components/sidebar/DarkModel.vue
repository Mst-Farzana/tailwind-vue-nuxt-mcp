<template>
  <div class="min-h-screen bg-gray-50 p-6 dark:bg-gray-900 dark:text-gray-100">
    <!-- Header -->
    <h1 class="mb-8 text-center text-xl font-medium text-gray-500">Dark mode</h1>

    <!-- Toggle Card -->
    <div
      class="mx-auto flex max-w-md justify-center rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <button
        :class="[
          'flex items-center gap-2 rounded-md px-4 py-2 font-medium transition',
          isDark ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800',
        ]"
        @click="toggleDarkMode"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.002 8.002 0 1010.586 10.586z" />
        </svg>
        Toggle light/dark
      </button>
    </div>

    <!-- Footer -->
    <div class="mt-10 flex items-center justify-between text-sm text-gray-600">
      <div>
        ©2026,
        <span class="font-medium">JustBoil.me</span>
        .
        <a href="#" class="font-medium text-blue-600 hover:underline">Buy Premium</a>
        version
      </div>
      <div class="font-serif text-gray-800 italic">JustBoil</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isDark = ref(false);

function toggleDarkMode() {
  isDark.value = !isDark.value;
  // In real app: toggle global dark mode class or use Nuxt's useTheme()
  document.documentElement.classList.toggle('dark', isDark.value);
  console.log('Dark mode:', isDark.value ? 'ON' : 'OFF');
}
</script>
