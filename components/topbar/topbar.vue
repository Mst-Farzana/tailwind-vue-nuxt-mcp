<script setup>
import { ref } from 'vue';
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
  <div v-click-outside="closeDropdown" class="relative">
    <header
      class="sticky top-0 left-0 z-49 grid h-16 w-full grid-cols-2 items-center gap-2 border-b bg-gray-50 px-4 text-sm"
    >
      <div v-if="isOpen" class="absolute top-4 bottom-1 left-3 flex h-screen">
        <Sidebar />
        <!-- Small arrow icon attached to sidebar's right edge -->
        <div>
          <button class="mt-2 hover:text-blue-600" @click="toggleMenu">
            <svg width="40" height="28" viewBox="0 0 80 70" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 14 L14 35 L30 56 L36 50 L24 35 L36 20 Z" fill="gray" />
              <rect x="38" y="24" width="26" height="6" fill="gray" />
              <rect x="20" y="34" width="44" height="6" fill="gray" />
              <rect x="38" y="44" width="26" height="6" fill="gray" />
            </svg>
          </button>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-3">
          <button v-if="!isOpen" @click="toggleMenu"><Icon name="mdi:menu" size="25" /></button>
          <input
            type="text"
            placeholder="Search (Ctrl + K)"
            class="rounded border-2 border-gray-50 px-3 py-2 transition-all duration-300 focus:border-blue-700 focus:outline-none"
            :class="searchMargin"
          />
        </div>
      </div>
      <div class="flex w-full items-center justify-between bg-white px-4 py-2">
        <ul class="flex items-center gap-5">
          <li>
            <button class="flex h-8 w-8 items-center justify-center">
              <Icon name="mdi:menu" class="text-xl" />
            </button>
          </li>
          <li
            class="relative flex cursor-pointer items-center gap-5 text-nowrap"
            @click="toggleDropDown"
          >
            <span>Sample menu</span>
            <Icon name="mdi:chevron-down" class="text-lg" />
            <ul
              v-if="dropDownOpen"
              class="absolute top-15 right-1 w-45 divide-y divide-gray-200 rounded-lg bg-white shadow-md"
            >
              <li
                class="flex cursor-pointer items-center gap-2 px-4 py-2 hover:text-blue-700 active:bg-gray-200 active:text-black"
              >
                <Icon name="mdi:clock-outline" class="text-base" />
                <span>Item One</span>
              </li>
              <li
                class="flex cursor-pointer items-center gap-2 px-4 py-2 hover:text-blue-700 active:bg-gray-200 active:text-black"
              >
                <Icon name="mdi:cloud-outline" class="text-base" />
                <span>Item Two</span>
              </li>
              <li
                class="flex cursor-pointer items-center gap-2 px-4 py-2 hover:text-blue-700 active:bg-gray-200 active:text-black"
              >
                <Icon name="mdi:crop" class="text-base" />
                <span>Item Last</span>
              </li>
            </ul>
          </li>
          <li class="relative flex cursor-pointer items-center gap-2" @click="toggleUserDropDown">
            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
              <Icon name="mdi:account" class="text-xl text-gray-700" />
            </div>
            <span class="text-nowrap">John Doe</span>
            <Icon name="mdi:chevron-down" class="text-lg" />
            <ul
              v-if="userDropDownOpen"
              class="absolute top-15 left-5 w-45 divide-y divide-gray-200 rounded-lg bg-white shadow-md"
            >
              <li>
                <NuxtLink
                  to="/dashboard/profile"
                  class="flex items-center gap-2 px-4 py-2 hover:text-blue-700 active:bg-gray-200"
                >
                  <Icon name="heroicons:user" class="h-5 w-5" />
                  <span class="text-[15px]">My Profile</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/dashboard/settings"
                  class="flex items-center gap-2 px-4 py-2 hover:text-blue-700 active:bg-gray-200"
                >
                  <Icon name="heroicons:cog-6-tooth" class="h-5 w-5" />
                  <span class="text-[15px]">Settings</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/dashboard/messages"
                  class="flex items-center gap-2 px-4 py-2 hover:text-blue-700 active:bg-gray-200"
                >
                  <Icon name="heroicons:envelope" class="h-5 w-5" />
                  <span class="text-[15px]">Messages</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/dashboard/logout"
                  class="flex items-center gap-2 px-4 py-2 hover:text-blue-700 active:bg-gray-200"
                >
                  <Icon name="mdi:logout" class="h-5 w-5" />
                  <span class="text-[15px]">Log Out</span>
                </NuxtLink>
              </li>
            </ul>
          </li>
          <li>
            <button
              class="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-200"
              @click="toggleDarkMode"
            >
              <Icon
                :name="colorMode.value === 'dark' ? 'mdi:white-balance-sunny' : 'mdi:weather-night'"
                class="text-xl"
              />
            </button>
          </li>

          <li>
            <button class="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-200">
              <Icon name="mdi:help-circle-outline" class="text-xl" />
            </button>
          </li>
          <li>
            <button class="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-200">
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
