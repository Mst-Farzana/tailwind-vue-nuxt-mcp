<script setup lang="ts">
const props = defineProps<{
  message?: string;
  title?: string;
}>();

// Default values if not passed
const title = props.title || 'Unhandled exception';
const message = props.message || 'An Error Occurred';

const done = () => {
  // চাইলে আপনি navigateTo('/') করতে পারেন
  window.history.back(); // আগের পেজে ফেরত
};
</script>

<template>
  <!-- ✅ Full-screen gradient background + center content -->
  <div
    class="flex min-h-screen items-center justify-center bg-linear-to-br from-red-500 via-orange-500 to-yellow-500 p-4"
  >
    <div class="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <!-- Title -->
      <h2 class="mb-1 text-2xl font-bold text-gray-800">{{ title }}</h2>

      <!-- Message -->
      <p class="mb-6 text-lg text-gray-600">{{ message }}</p>

      <!-- Done Button -->
      <button
        class="rounded-lg bg-red-600 px-6 py-2 text-white transition hover:bg-red-700 disabled:opacity-50"
        @click="done"
      >
        Done
      </button>
    </div>
  </div>
</template>
