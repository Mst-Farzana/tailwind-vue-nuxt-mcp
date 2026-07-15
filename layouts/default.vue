<script setup>
import { useColorMode } from '#imports';
import { ref } from 'vue';
import Topbar from '~/components/topbar/topbar.vue';

const isSidebarOpen = ref(false);
const colorMode = useColorMode();
</script>

<template>
  <div
    class="min-h-screen w-full bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100"
  >
    <Topbar class="fixed top-0 right-0 left-0 z-50" @toggle="isSidebarOpen = $event" />

    <main
      class="min-h-[calc(100vh-4rem)] w-full overflow-y-auto bg-gray-50 transition-all duration-300 dark:bg-gray-950"
      :class="isSidebarOpen ? 'ml-14' : 'ml-0'"
    >
      <div class="p-4 md:p-6 lg:p-8">
        <slot />
      </div>
    </main>
  </div>
</template>
