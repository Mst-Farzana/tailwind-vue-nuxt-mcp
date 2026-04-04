<script setup>
import { ref } from 'vue';
import Topbar from '~/components/topbar/topbar.vue';

const isSidebarOpen = ref(false);
</script>

<template>
  <div class="h-screen overflow-hidden">
    <Topbar class="fixed top-0 right-0 left-0 z-50" @toggle="isSidebarOpen = $event" />

    <main
      class="h-[calc(100vh-4rem)] overflow-y-auto bg-gray-100 pt-5 transition-all duration-300"
      :class="isSidebarOpen ? 'ml-20' : 'ml-0'"
    >
      <slot />
    </main>
  </div>
</template>
