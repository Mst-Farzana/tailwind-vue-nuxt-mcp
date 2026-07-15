<script setup>
import { navigateTo } from '#app';
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue';

// Parent থেকে স্টেট নেওয়া এবং পরিবর্তন হলে Parent কে জানানো
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update:isOpen']);

// Sub-panel open/close
const openSubPanel = ref(false);
const activeSubItem = ref(null);

// ✅ FIXED: Removed .vue extension
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

function selectSubItem(sub) {
  activeSubItem.value = sub.label;
}

// ✅ স্পেসিং ফিক্স: Parent কে Sidebar এর নতুন স্টেট জানানো
function toggleSidebar() {
  const newState = !props.isOpen;
  emit('update:isOpen', newState);
}

onMounted(() => {
  navigateTo('/sidebar/dashboard'); // ✅ No .vue extension
});
</script>

<template>
  <div class="flex text-sm">
    <!-- 
      ✅ স্পেসিং ফিক্স: 
      - Collapsed (শুধু আইকন): w-20 (5rem = 80px, যা Tailwind এ 20 স্পেস ইউনিট)
      - Expanded (টেক্সট সহ): w-64 (16rem = 256px, যা Tailwind এ 64 স্পেস ইউনিট)
    -->
    <aside
      :class="[
        'flex h-screen flex-col overflow-hidden rounded-2xl bg-[#0d1729] text-sm text-white transition-all duration-300',
        isOpen ? 'w-64' : 'w-20',
      ]"
    >
      <!-- Logo -->
      <div class="flex items-center justify-center rounded py-3">
        <h1
          class="font-bold text-white transition-all duration-300"
          :class="isOpen ? 'text-xl opacity-100' : 'w-0 overflow-hidden text-sm opacity-0'"
        >
          One
        </h1>
      </div>

      <!-- Main Menu Items -->
      <nav class="custom-scroll mt-2 flex-1 space-y-1 overflow-y-auto bg-gray-700 px-2">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.label"
          :to="item.path || '#'"
          class="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-[#1f2a40]"
          @click.prevent="selectItem(item)"
        >
          <Icon :icon="item.icon" class="w-6 shrink-0 text-center text-base" />
          <span v-show="isOpen" class="text-sm whitespace-nowrap">{{ item.label }}</span>
        </NuxtLink>
      </nav>

      <!-- Collapse / Expand Button -->
      <button
        class="flex h-10 items-center justify-center gap-2 rounded-b-xl bg-blue-600 transition-all duration-300 hover:bg-blue-700"
        @click="toggleSidebar"
      >
        <Icon
          :icon="isOpen ? 'mdi:chevron-left' : 'mdi:chevron-right'"
          class="text-base text-white"
        />
        <span v-show="isOpen" class="text-sm font-medium text-white">Collapse</span>
      </button>
    </aside>

    <!-- SubPanel -->
    <transition name="slide">
      <div
        v-if="openSubPanel"
        class="mx-2 flex w-56 flex-col rounded-2xl border-l border-gray-700 bg-[#0d1729] p-4 text-white"
      >
        <!-- Sub Header -->
        <div class="mb-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Icon icon="mdi:menu-left" class="text-xl" />
            <h2 class="text-lg font-semibold">Sub</h2>
          </div>
          <Icon icon="mdi:close" class="cursor-pointer text-xl" @click="openSubPanel = false" />
        </div>

        <!-- Sub Items -->
        <div class="flex flex-col space-y-2">
          <div v-for="(sub, i) in subItems" :key="i" class="flex flex-col">
            <!-- Main Sub Item -->
            <div
              class="flex cursor-pointer items-center justify-between gap-2 rounded p-2 hover:bg-[#1f2a40]"
              :class="activeSubItem === sub.label ? 'bg-[#1f2a40]' : ''"
            >
              <div class="flex items-center gap-2" @click="goSub(sub)">
                <Icon :icon="sub.icon" class="w-6 shrink-0 text-center text-base" />
                <span class="whitespace-nowrap">{{ sub.label }}</span>
              </div>

              <!-- Dropdown toggle -->
              <button v-if="sub.children" class="text-white" @click.stop="sub.open = !sub.open">
                <Icon :icon="sub.open ? 'mdi:minus' : 'mdi:plus'" />
              </button>
            </div>

            <!-- Dropdown children -->
            <div v-if="sub.children && sub.open" class="mt-1 ml-8 flex flex-col space-y-1">
              <NuxtLink
                v-for="(child, j) in sub.children"
                :key="j"
                :to="child.path"
                class="cursor-pointer rounded p-1 text-sm hover:bg-[#1f2a40]"
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
  width: 6px;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: #3a4556;
  border-radius: 10px;
}

/* SubPanel slide animation */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-enter-to {
  transform: translateX(0);
}
.slide-leave-from {
  transform: translateX(0);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
