<script setup lang="ts">
import { ref } from 'vue';

const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle('dark', isDarkMode.value);
};
</script>

<template>
  <div
    class="mx-auto flex h-48 max-w-sm items-center justify-center rounded-lg bg-white p-6 shadow dark:bg-gray-800"
  >
    <button
      :class="{ 'bg-gray-900 text-white': !isDarkMode, 'bg-blue-600 text-white': isDarkMode }"
      class="font-sm rounded-lg px-4 py-2 text-sm outline-1 outline-orange-600"
      @click="toggleDarkMode"
    >
      {{ isDarkMode ? 'Light mode' : 'Toggle' }}
    </button>
  </div>
</template>
