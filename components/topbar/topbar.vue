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

const searchMargin = computed(() => (isOpen.value ? 'ml-0 md:ml-64' : 'ml-0'));
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
      class="sticky top-0 left-0 z-50 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-gray-50 px-4 text-sm transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100"
    >
      <!-- Left Side: Menu & Search -->
      <div class="flex items-center gap-3">
        <button
          class="flex h-8 w-8 items-center justify-center rounded text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          @click="toggleMenu"
        >
          <Icon name="mdi:menu" class="text-xl" />
        </button>

        <input
          type="text"
          placeholder="Search (Ctrl + K)"
          class="hidden rounded border-2 border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 transition-all duration-300 focus:border-blue-700 focus:outline-none sm:block dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
          :class="searchMargin"
        />
      </div>

      <!-- Right Side: Actions -->
      <div class="flex items-center gap-2">
        <ul class="flex items-center gap-1 sm:gap-3">
          <!-- Sample Menu -->
          <li class="relative hidden sm:block">
            <button
              class="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-nowrap text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
              @click="toggleDropDown"
            >
              <span>Sample menu</span>
              <Icon name="mdi:chevron-down" class="text-lg" />
            </button>
            <ul
              v-if="dropDownOpen"
              class="absolute top-full right-0 z-50 mt-1 w-40 divide-y divide-gray-200 rounded-lg bg-white shadow-md dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-100"
            >
              <li
                class="flex cursor-pointer items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-700 active:bg-gray-200 active:text-black dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400 dark:active:bg-gray-600"
              >
                <Icon name="mdi:clock-outline" class="text-base" />
                <span>Item One</span>
              </li>
              <li
                class="flex cursor-pointer items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-700 active:bg-gray-200 active:text-black dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400 dark:active:bg-gray-600"
              >
                <Icon name="mdi:cloud-outline" class="text-base" />
                <span>Item Two</span>
              </li>
              <li
                class="flex cursor-pointer items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-700 active:bg-gray-200 active:text-black dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400 dark:active:bg-gray-600"
              >
                <Icon name="mdi:crop" class="text-base" />
                <span>Item Last</span>
              </li>
            </ul>
          </li>

          <!-- User Dropdown -->
          <li class="relative">
            <button
              class="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-nowrap text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
              @click="toggleUserDropDown"
            >
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700"
              >
                <Icon name="mdi:account" class="text-xl text-gray-700 dark:text-gray-300" />
              </div>
              <span class="hidden md:block">John Doe</span>
              <Icon name="mdi:chevron-down" class="hidden text-lg md:block" />
            </button>
            <ul
              v-if="userDropDownOpen"
              class="absolute top-full right-0 z-50 mt-1 w-44 divide-y divide-gray-200 rounded-lg bg-white shadow-md dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-100"
            >
              <li>
                <NuxtLink
                  to="/dashboard/profile"
                  class="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-700 active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                >
                  <Icon name="heroicons:user" class="h-5 w-5" />
                  <span class="text-[15px]">My Profile</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/dashboard/settings"
                  class="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-700 active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                >
                  <Icon name="heroicons:cog-6-tooth" class="h-5 w-5" />
                  <span class="text-[15px]">Settings</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/dashboard/messages"
                  class="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-700 active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                >
                  <Icon name="heroicons:envelope" class="h-5 w-5" />
                  <span class="text-[15px]">Messages</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/dashboard/logout"
                  class="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-700 active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                >
                  <Icon name="mdi:logout" class="h-5 w-5" />
                  <span class="text-[15px]">Log Out</span>
                </NuxtLink>
              </li>
            </ul>
          </li>

          <!-- Dark Mode Toggle -->
          <li>
            <button
              class="flex h-8 w-8 items-center justify-center rounded text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
              @click="toggleDarkMode"
            >
              <Icon
                :name="colorMode.value === 'dark' ? 'mdi:white-balance-sunny' : 'mdi:weather-night'"
                class="text-xl"
              />
            </button>
          </li>

          <!-- Help -->
          <li class="hidden sm:block">
            <button
              class="flex h-8 w-8 items-center justify-center rounded text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <Icon name="mdi:help-circle-outline" class="text-xl" />
            </button>
          </li>

          <!-- Logout Icon -->
          <li class="hidden sm:block">
            <button
              class="flex h-8 w-8 items-center justify-center rounded text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <Icon name="mdi:logout" class="text-xl" />
            </button>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>

<style>
.icon-stack {
  position: relative;
  width: 32px;
  height: 32px;
}
</style>
