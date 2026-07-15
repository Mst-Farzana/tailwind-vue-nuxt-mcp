<script setup>
import { navigateTo } from '#app';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

// Parent থেকে সাইডবার ওপেন/ক্লোজ স্টেট আসবে
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update:isOpen']);

const openSubPanel = ref(false);
const activeSubItem = ref(null);

const menuItems = [
  { icon: 'mdi:monitor', label: 'Dashboard', path: '/sidebar/dashboard' },
  { icon: 'mdi:table', label: 'Tables & Lists', path: '/sidebar/tables' },
  { icon: 'mdi:format-list-bulleted', label: 'Forms Base', path: '/forms/base' },
  { icon: 'mdi:form-select', label: 'Forms Advanced', path: '/forms/advanced' },
  { icon: 'mdi:view-dashboard', label: 'UI Base', path: '/sidebar/ui/base' },
  { icon: 'mdi:view-dashboard-outline', label: 'UI Advanced', path: '/sidebar/ui/advanced' },
  { icon: 'mdi:palette', label: 'Styles', path: '/sidebar/styles' },
  { icon: 'mdi:credit-card-outline', label: 'Pricing layout', path: '/sidebar/pricing' },
  { icon: 'mdi:account-circle', label: 'Profile', path: '/dashboard/profile' },
  { icon: 'mdi:lock', label: 'Login', path: '/sidebar/auth' },
  { icon: 'mdi:menu-left', label: 'Sub', sub: true },
  { icon: 'mdi:information-outline', label: 'About', path: '/sidebar/about' },
];

const subItems = ref([
  { icon: 'mdi:image', label: 'Sample Page', path: '/sample' },
  { icon: 'mdi:link', label: 'External Link', path: 'https://google.com', external: true },
  {
    icon: 'mdi:table',
    label: 'Dropdown',
    children: [
      { label: 'Child 1', path: '/child1' },
      { label: 'Child 2', path: '/child2' },
      { label: 'Child 3', path: '/child3' },
    ],
    open: false,
  },
]);

function selectItem(item) {
  if (item.sub) {
    openSubPanel.value = true;
    activeSubItem.value = subItems.value[0].label;
  } else {
    openSubPanel.value = false;
    if (item.path) navigateTo(item.path);
  }
}

function goSub(sub) {
  activeSubItem.value = sub.label;
  if (sub.external) {
    window.open(sub.path, '_blank');
  } else if (sub.path) {
    navigateTo(sub.path);
  }
}

function toggleSidebar() {
  emit('update:isOpen', !props.isOpen);
}
</script>

<template>
  <div class="flex h-full text-sm">
    <!-- Sidebar -->
    <aside
      :class="[
        'flex h-full flex-col overflow-hidden rounded-r-2xl bg-gray-900 text-gray-300 transition-all duration-300 dark:bg-gray-950',
        isOpen ? 'w-64' : 'w-20',
      ]"
    >
      <!-- Logo -->
      <div class="flex h-16 items-center justify-center border-b border-gray-800">
        <h1
          class="text-xl font-bold text-white transition-all duration-300"
          :class="isOpen ? 'opacity-100' : 'w-0 overflow-hidden opacity-0'"
        >
          One
        </h1>
      </div>

      <!-- Main Menu Items -->
      <nav class="custom-scroll flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.label"
          :to="item.path || '#'"
          class="flex cursor-pointer items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-gray-800 hover:text-white"
          :class="{ 'bg-blue-600 text-white': activeSubItem === item.label }"
          @click.prevent="selectItem(item)"
        >
          <Icon :icon="item.icon" class="h-5 w-5 shrink-0 text-center" />
          <span
            v-show="isOpen"
            class="text-sm font-medium whitespace-nowrap transition-opacity duration-300"
          >
            {{ item.label }}
          </span>
        </NuxtLink>
      </nav>

      <!-- Collapse / Expand Button -->
      <button
        class="flex h-14 items-center justify-center gap-2 border-t border-gray-800 bg-gray-900 text-white transition-all duration-300 hover:bg-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800"
        @click="toggleSidebar"
      >
        <Icon :icon="isOpen ? 'mdi:chevron-left' : 'mdi:chevron-right'" class="h-5 w-5" />
        <span v-show="isOpen" class="text-sm font-medium">Collapse</span>
      </button>
    </aside>

    <!-- SubPanel -->
    <transition name="slide">
      <div
        v-if="openSubPanel && isOpen"
        class="mx-2 flex w-56 flex-col rounded-2xl border border-gray-700 bg-gray-900 p-4 text-gray-300 shadow-xl dark:border-gray-800 dark:bg-gray-950"
      >
        <!-- Sub Header -->
        <div class="mb-4 flex items-center justify-between border-b border-gray-800 pb-2">
          <div class="flex items-center gap-2">
            <Icon icon="mdi:menu-left" class="text-xl text-blue-500" />
            <h2 class="text-lg font-semibold text-white">Sub Menu</h2>
          </div>
          <Icon
            icon="mdi:close"
            class="cursor-pointer text-xl hover:text-white"
            @click="openSubPanel = false"
          />
        </div>

        <!-- Sub Items -->
        <div class="flex flex-col space-y-2">
          <div v-for="(sub, i) in subItems" :key="i" class="flex flex-col">
            <!-- Main Sub Item -->
            <div
              class="flex cursor-pointer items-center justify-between gap-2 rounded-lg p-2 transition-colors hover:bg-gray-800"
              :class="activeSubItem === sub.label ? 'bg-gray-800 text-white' : ''"
            >
              <div class="flex items-center gap-2" @click="goSub(sub)">
                <Icon :icon="sub.icon" class="h-5 w-5 shrink-0 text-center" />
                <span class="text-sm whitespace-nowrap">{{ sub.label }}</span>
              </div>

              <!-- Dropdown toggle -->
              <button
                v-if="sub.children"
                class="text-gray-400 hover:text-white"
                @click.stop="sub.open = !sub.open"
              >
                <Icon :icon="sub.open ? 'mdi:minus' : 'mdi:plus'" class="h-4 w-4" />
              </button>
            </div>

            <!-- Dropdown children -->
            <div
              v-if="sub.children && sub.open"
              class="mt-1 ml-6 flex flex-col space-y-1 border-l-2 border-gray-700 pl-2"
            >
              <NuxtLink
                v-for="(child, j) in sub.children"
                :key="j"
                :to="child.path"
                class="cursor-pointer rounded p-1.5 text-sm text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                @click="activeSubItem = child.label"
              >
                {{ child.label }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.custom-scroll {
  overflow-y: auto;
}
.custom-scroll::-webkit-scrollbar {
  width: 4px;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 10px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: transparent;
}

/* SubPanel slide animation */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.slide-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
