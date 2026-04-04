<script setup>
import { ref } from 'vue';

const snackbarText = ref('Hello! This is demo message...');
const lifetime = ref(3000);
const selectedColor = ref('Danger'); // default as shown

const colors = [
  { name: 'Contrast', label: 'Contrast' },
  { name: 'Info', label: 'Info' },
  { name: 'Success', label: 'Success' },
  { name: 'Warning', label: 'Warning' },
  { name: 'Danger', label: 'Danger' },
];

function pushSnackbar() {
  console.log({
    message: snackbarText.value,
    lifetime: parseInt(lifetime.value),
    color: selectedColor.value,
  });
  // In real app: trigger actual snackbar toast here
  alert(
    `Snackbar pushed:\nMessage: ${snackbarText.value}\nLifetime: ${lifetime.value}ms\nColor: ${selectedColor.value}`,
  );
}
</script>
<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header -->
    <h1 class="mb-8 text-center text-xl font-medium text-gray-500">SnackBar Toasts</h1>

    <!-- Form Card -->
    <div class="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <!-- Message Text -->
      <div class="mb-6">
        <label class="mb-2 block font-bold text-gray-900">SnackBar text</label>
        <input
          v-model="snackbarText"
          type="text"
          class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Hello! This is demo message..."
        />
        <p class="mt-1 text-xs text-gray-500">Message text</p>
      </div>

      <!-- Lifetime -->
      <div class="mb-6">
        <label class="mb-2 block font-bold text-gray-900">SnackBar lifetime (ms)</label>
        <input
          v-model="lifetime"
          type="number"
          class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="3000"
        />
        <p class="mt-1 text-xs text-gray-500">
          Lifetime value in milliseconds. Use '0' for infinite.
        </p>
      </div>

      <!-- Color Selection -->
      <div class="mb-6">
        <label class="mb-3 block font-bold text-gray-900">SnackBar color</label>
        <div class="space-y-3">
          <div v-for="(color, index) in colors" :key="color.name" class="flex items-center gap-2">
            <input
              :id="'color-' + index"
              v-model="selectedColor"
              :value="color.name"
              type="radio"
              class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <label :for="'color-' + index" class="text-gray-700">{{ color.label }}</label>
          </div>
        </div>
      </div>

      <!-- Push Button -->
      <button
        :class="[
          'flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 font-medium transition',
          selectedColor === 'Danger'
            ? 'bg-red-600 text-white hover:bg-red-700'
            : selectedColor === 'Success'
              ? 'bg-green-600 text-white hover:bg-green-700'
              : selectedColor === 'Warning'
                ? 'bg-yellow-600 text-black hover:bg-yellow-700'
                : selectedColor === 'Info'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-800 text-white hover:bg-gray-900',
        ]"
        @click="pushSnackbar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm4 2a1 1 0 011-1h4a1 1 0 011 1v6H8V6zm4 8a1 1 0 110-2h-4a1 1 0 110 2h4z"
            clip-rule="evenodd"
          />
        </svg>
        Push
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
