<script setup>
import { computed, ref, watch } from 'vue';

const isOpen = ref(false);
const dropDownOpen = ref(false);
const userDropDownOpen = ref(false);

const closeDropdown = () => {
  dropDownOpen.value = false;
  userDropDownOpen.value = false;
};

function toggleUserDropDown() {
  userDropDownOpen.value = !userDropDownOpen.value;
}

function toggleDropDown() {
  dropDownOpen.value = !dropDownOpen.value;
}

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

const searchMargin = computed(() => (isOpen.value ? 'ml-30' : 'ml-0'));
const colorMode = useColorMode();

const toggleDarkMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

const emit = defineEmits(['toggle']);
watch(isOpen, v => emit('toggle', v));
</script>

<template>
  <div v-click-outside="closeDropdown">
    <header
      class="fixed inset-x-0 top-0 z-50 grid h-16 w-full grid-cols-2 items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 text-sm transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100"
    >
      <div v-if="isOpen" class="absolute top-4 bottom-1 left-3 flex h-screen">
        <Sidebar />
        <!-- Small arrow icon attached to sidebar's right edge -->
        <div>
          <button
            class="mt-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            @click="toggleMenu"
          >
            <svg width="40" height="28" viewBox="0 0 80 70" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 14 L14 35 L30 56 L36 50 L24 35 L36 20 Z" fill="currentColor" />
              <rect x="38" y="24" width="26" height="6" fill="currentColor" />
              <rect x="20" y="34" width="44" height="6" fill="currentColor" />
              <rect x="38" y="44" width="26" height="6" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="flex items-center gap-3">
          <button v-if="!isOpen" class="text-gray-700 dark:text-gray-300" @click="toggleMenu">
            <Icon name="mdi:menu" size="25" />
          </button>
          <input
            type="text"
            placeholder="Search (Ctrl + K)"
            class="rounded border-2 border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 transition-all duration-300 focus:border-blue-700 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
            :class="searchMargin"
          />
        </div>
      </div>

      <div class="flex w-full items-center justify-between bg-transparent px-4 py-2">
        <ul class="flex items-center gap-5">
          <li>
            <button
              class="flex h-8 w-8 items-center justify-center rounded text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <Icon name="mdi:menu" class="text-xl" />
            </button>
          </li>

          <li
            class="relative flex cursor-pointer items-center gap-5 text-nowrap text-gray-700 dark:text-gray-300"
            @click="toggleDropDown"
          >
            <span>Sample menu</span>
            <Icon name="mdi:chevron-down" class="text-lg" />
            <ul
              v-if="dropDownOpen"
              class="absolute top-15 right-1 w-45 divide-y divide-gray-200 rounded-lg bg-white shadow-md dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-100"
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

          <li
            class="relative flex cursor-pointer items-center gap-2 text-gray-700 dark:text-gray-300"
            @click="toggleUserDropDown"
          >
            <div
              class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700"
            >
              <Icon name="mdi:account" class="text-xl text-gray-700 dark:text-gray-300" />
            </div>
            <span class="text-nowrap">John Doe</span>
            <Icon name="mdi:chevron-down" class="text-lg" />
            <ul
              v-if="userDropDownOpen"
              class="absolute top-10 left-5 w-45 divide-y divide-gray-200 rounded-lg bg-white shadow-md dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-100"
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

          <li>
            <button
              class="flex h-8 w-8 items-center justify-center rounded text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <Icon name="mdi:help-circle-outline" class="text-xl" />
            </button>
          </li>
          <li>
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
