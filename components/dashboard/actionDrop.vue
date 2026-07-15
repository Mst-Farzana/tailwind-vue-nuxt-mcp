<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { onMounted, onUnmounted, ref } from 'vue';

interface Option {
  label: string;
  icon: string;
  isLast?: boolean;
}

const props = defineProps<{
  options: Option[];
  onAction: (index: number) => void;
}>();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const close = () => {
  isOpen.value = false;
};

const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    close();
  }
};

const handleSelect = (index: number) => {
  props.onAction(index);
  close();
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div ref="dropdownRef" class="relative dark:bg-gray-900 dark:text-gray-100">
    <button class="rounded-md p-2 hover:bg-gray-100" @click.stop="toggle">
      <Icon icon="mdi:dots-vertical" class="h-5 w-5 text-gray-600" />
    </button>

    <div v-if="isOpen" class="absolute right-0 z-20 mt-2 w-44 rounded-lg border bg-white shadow">
      <button
        v-for="(opt, i) in options"
        :key="i"
        class="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
        :class="opt.isLast ? 'text-red-600 hover:bg-red-50' : ''"
        @click="handleSelect(i)"
      >
        <Icon :icon="opt.icon" class="h-4 w-4" />
        {{ opt.label }}
      </button>
    </div>
  </div>
</template>
