<script setup lang="ts">
const emit = defineEmits(['close']);
const close = () => emit('close');
</script>

<template>
  <div class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
    <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      <div class="mb-4 flex items-center justify-between">
        <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400" @click="close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <p class="mb-6 text-gray-700 dark:text-gray-300">Click to see in action</p>
      <div class="flex space-x-4">
        <button class="rounded-lg bg-blue-500 px-4 py-2 text-white" @click="close">Confirm</button>
        <button class="rounded-lg border border-blue-500 px-4 py-2 text-blue-500" @click="close">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
