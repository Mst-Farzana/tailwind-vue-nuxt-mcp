<script setup>
import { useColorMode } from '#imports';
import { computed, ref, watch } from 'vue';

const isOpen = ref(false);
const dropDownOpen = ref(false);
const userDropDownOpen = ref(false);

const closeDropdown = () => {
  dropDownOpen.value = false;
  userDropDownOpen.value = false;
};

const toggleUserDropDown = () => {
  userDropDownOpen.value = !userDropDownOpen.value;
  dropDownOpen.value = false;
};

const toggleDropDown = () => {
  dropDownOpen.value = !dropDownOpen.value;
  userDropDownOpen.value = false;
};

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const searchMargin = computed(() => (isOpen.value ? 'md:ml-64' : 'ml-0'));
const colorMode = useColorMode();

const toggleDarkMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

const emit = defineEmits(['toggle']);
watch(isOpen, v => emit('toggle', v));
</script>

<template>
  <div v-click-outside="closeDropdown" class="relative">
    <header
      class="sticky top-0 left-0 z-50 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4 transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900"
    >
      <!-- Left Side: Menu Toggle & Search -->
      <div class="flex items-center gap-4">
        <button
          class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          @click="toggleMenu"
        >
          <Icon name="mdi:menu" class="text-xl" />
        </button>

        <div class="relative hidden md:block">
          <Icon
            name="mdi:magnify"
            class="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 dark:text-gray-500"
          />
          <input
            type="text"
            placeholder="Search (Ctrl + K)"
            class="w-64 rounded-lg border border-gray-200 bg-gray-50 py-2 pr-4 pl-10 text-sm text-gray-900 placeholder-gray-500 transition-all duration-300 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:bg-gray-900"
            :class="searchMargin"
          />
        </div>
      </div>

      <!-- Right Side: Actions -->
      <div class="flex items-center gap-2">
        <!-- Dark Mode Toggle -->
        <button
          class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          :title="colorMode.value === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          @click="toggleDarkMode"
        >
          <Icon
            :name="colorMode.value === 'dark' ? 'mdi:white-balance-sunny' : 'mdi:weather-night'"
            class="text-xl"
          />
        </button>

        <!-- Help -->
        <button
          class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        >
          <Icon name="mdi:help-circle-outline" class="text-xl" />
        </button>

        <!-- User Dropdown -->
        <div class="relative">
          <button
            class="flex items-center gap-2 rounded-lg p-1.5 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            @click="toggleUserDropDown"
          >
            <div
              class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
            >
              <Icon name="mdi:account" class="text-lg" />
            </div>
            <span class="hidden text-sm font-medium md:block">John Doe</span>
            <Icon name="mdi:chevron-down" class="hidden text-sm md:block" />
          </button>

          <!-- User Dropdown Menu -->
          <div
            v-if="userDropDownOpen"
            class="absolute top-12 right-0 z-50 w-48 divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white shadow-lg dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800"
          >
            <div class="px-4 py-3">
              <p class="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
              <p class="truncate text-xs text-gray-500 dark:text-gray-400">john@example.com</p>
            </div>
            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <NuxtLink
                  to="/dashboard/profile"
                  class="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                >
                  <Icon name="heroicons:user" class="h-4 w-4" />
                  <span>My Profile</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/dashboard/settings"
                  class="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                >
                  <Icon name="heroicons:cog-6-tooth" class="h-4 w-4" />
                  <span>Settings</span>
                </NuxtLink>
              </li>
            </ul>
            <div class="py-1">
              <NuxtLink
                to="/dashboard/logout"
                class="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                <Icon name="mdi:logout" class="h-4 w-4" />
                <span>Log Out</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
