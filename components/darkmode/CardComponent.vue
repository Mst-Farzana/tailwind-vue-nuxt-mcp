<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header -->
    <h1 class="mb-8 text-center text-xl font-medium text-gray-500">Cards</h1>

    <!-- Card Grid -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <!-- Card 1: With Title & Icon -->
      <div class="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div class="mb-3 flex items-start justify-between">
          <div>
            <h3 class="text-lg font-bold text-gray-900">With title & icon</h3>
            <p class="mt-1 text-gray-600">Card with title, icon & footer</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.46 9.25 6.253 8 7.253s-1.25 1.793-1.25 3.253v6c0 1.46.75 2.253 1.25 3.253s1.5 1.793 3 2.503c1.5.71 3.5.71 5 0 .75-.35 1.25-.7 1.75-1.25.5-.55.75-1.1.75-1.75v-6c0-1.46-.75-2.253-1.25-3.253s-1.5-1.793-3-2.503z"
            />
          </svg>
        </div>

        <!-- Footer Buttons -->
        <div class="flex gap-3 border-t border-gray-200 pt-4">
          <button
            class="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Confirm
          </button>
          <button
            class="rounded-md border border-blue-600 px-4 py-2 font-medium text-blue-600 transition hover:bg-blue-50"
          >
            Cancel
          </button>
        </div>
      </div>

      <!-- Card 2: Just Body & Footer -->
      <div class="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div class="mb-3">
          <h3 class="font-medium text-gray-900">Just body & footer</h3>
        </div>

        <!-- Footer Buttons -->
        <div class="flex gap-3 border-t border-gray-200 pt-4">
          <button
            class="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Confirm
          </button>
          <button
            class="rounded-md border border-blue-600 px-4 py-2 font-medium text-blue-600 transition hover:bg-blue-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No script needed for static layout — fully declarative
</script>
