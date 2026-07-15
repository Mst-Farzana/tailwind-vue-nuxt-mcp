<script setup>
import { ref } from 'vue';
import Sidebar from '~/components/sidebar/sidebar.vue';
import Topbar from '~/components/topbar/topbar.vue';

const isSidebarOpen = ref(true);
const isSidebarCollapsed = ref(false); // সাইডবার ছোট নাকি বড়

const handleSidebarToggle = event => {
  isSidebarOpen.value = event;
};

const handleSidebarCollapse = event => {
  isSidebarCollapsed.value = event;
};
</script>

<template>
  <div
    class="min-h-screen w-full bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100"
  >
    <Topbar
      class="fixed top-0 right-0 left-0 z-50"
      @toggle="handleSidebarToggle"
      @collapse="handleSidebarCollapse"
    />

    <!-- Sidebar -->
    <aside
      v-if="isSidebarOpen"
      class="fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] transition-all duration-300"
    >
      <Sidebar :is-open="!isSidebarCollapsed" @update:is-open="handleSidebarCollapse" />
    </aside>

    <!-- 
      ✅ স্পেসিং ক্যালকুলেশন:
      - isSidebarOpen = false হলে: ml-0 (0px)
      - isSidebarCollapsed = true হলে: ml-20 (80px / 20 স্পেস ইউনিট)
      - isSidebarCollapsed = false হলে: ml-64 (256px / 64 স্পেস ইউনিট)
    -->
    <main
      class="min-h-[calc(100vh-4rem)] w-full overflow-y-auto bg-gray-50 pt-20 transition-all duration-300 dark:bg-gray-950"
      :class="{
        'ml-0': !isSidebarOpen,
        'ml-20': isSidebarOpen && isSidebarCollapsed,
        'ml-64': isSidebarOpen && !isSidebarCollapsed,
      }"
    >
      <div class="p-4 md:p-6 lg:p-8">
        <slot />
      </div>
    </main>

    <!-- Mobile Overlay -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-30 bg-black/50 md:hidden"
      @click="isSidebarOpen = false"
    ></div>
  </div>
</template>
