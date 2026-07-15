<script setup>
import { ref } from 'vue';
import Topbar from '~/components/topbar/topbar.vue';

const isSidebarOpen = ref(false);
</script>

<template>
  <div
    class="min-h-screen max-w-full bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100"
  >
    <!-- Topbar -->
    <Topbar
      class="fixed top-0 right-0 left-0 z-50 dark:bg-gray-950 dark:text-gray-100"
      @toggle="isSidebarOpen = $event"
    />

    <!-- Main Content Area -->
    <!-- Note: ml-20 for mobile sidebar, md:ml-64 for desktop sidebar to match standard widths -->
    <main
      class="min-h-[calc(100vh-4rem)] w-full bg-gray-50 transition-all duration-300 dark:bg-gray-950"
      :class="isSidebarOpen ? 'ml-20 md:ml-64' : 'ml-0'"
    >
      <!-- flex-col and min-h-full ensures the footer pushes to the bottom -->
      <div class="flex min-h-full flex-col p-4 md:p-6 lg:p-8">
        <!-- Page Content -->
        <slot />

        <!-- Beautiful Footer -->
        <footer class="mt-auto border-t border-gray-200 pt-6 dark:border-gray-800">
          <div class="mx-auto max-w-7xl">
            <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
              <!-- Left: Brand & Copyright -->
              <div class="flex flex-col items-center gap-1 text-center md:items-start md:text-left">
                <span class="text-lg font-bold text-gray-900 dark:text-white">YourBrand</span>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  © {{ new Date().getFullYear() }} All rights reserved.
                </span>
              </div>

              <!-- Right: Links -->
              <div
                class="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                <a href="#" class="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                  Privacy Policy
                </a>
                <a href="#" class="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                  Terms of Service
                </a>
                <a href="#" class="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                  Support
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>

    <!-- Mobile Overlay for Sidebar -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-30 bg-black/50 md:hidden"
      @click="isSidebarOpen = false"
    ></div>
  </div>
</template>
