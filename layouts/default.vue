<script setup>
import { useColorMode } from '#imports';
import { ref } from 'vue';
import Topbar from '~/components/topbar/topbar.vue';

const isSidebarOpen = ref(false);
const colorMode = useColorMode();
</script>

<template>
  <!-- ডার্ক মোড ক্লাস যোগ করা হয়েছে -->
  <div class="h-screen overflow-hidden bg-white dark:bg-gray-950">
    <Topbar class="fixed top-0 right-0 left-0 z-50" @toggle="isSidebarOpen = $event" />

    <main
      class="h-[calc(100vh-4rem)] overflow-y-auto bg-gray-100 pt-5 transition-all duration-300 dark:bg-gray-900"
      :class="isSidebarOpen ? 'ml-20' : 'ml-0'"
    >
      <slot />
    </main>
  </div>
</template>
