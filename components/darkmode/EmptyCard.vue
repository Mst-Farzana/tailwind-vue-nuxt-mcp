<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header -->
    <div class="mb-4 flex items-center justify-between">
      <h1 class="flex items-center gap-2 font-bold text-gray-900">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-yellow-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 001 1h1a1 1 0 100-2H9a1 1 0 00-1 1z"
            clip-rule="evenodd"
          />
        </svg>
        Empty variation
      </h1>
      <button
        class="rounded-md border border-gray-200 bg-white p-2 transition hover:bg-gray-100"
        aria-label="Settings"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.63-1.56-3 0a1.532 1.532 0 01-1.532 1.532c1.04 1.04 2.07 2.07 3.09 3.09 1.04 1.04 2.07 2.07 3.09 3.09a1.532 1.532 0 011.532 1.532c0 .87-.7 1.56-1.532 1.532-1.04 0-2.07-2.07-3.09-3.09a1.532 1.532 0 01-1.532-1.532c0-.87.7-1.56 1.532-1.532 1.04 0 2.07-2.07 3.09-3.09a1.532 1.532 0 011.532-1.532z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <!-- Empty State Content -->
    <div
      class="flex h-64 items-center justify-center rounded-lg border border-gray-200 bg-white p-10 shadow-sm"
    >
      <p class="text-gray-400 italic">Nothing's here...</p>
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
// No script needed — static layout
</script>
