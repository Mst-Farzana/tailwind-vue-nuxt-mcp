<script setup lang="ts">
import { computed } from 'vue';

interface User {
  id: number;
  name: string;
  email?: string | null;
  avatar?: string | null;
  amount: number;
  percentage: number;
  createdAt: string;
}

const props = defineProps<{
  user: User;
}>();

/* =====================
   Computed helpers
===================== */
const progressColor = computed(() => {
  const p = props.user.percentage;
  if (p >= 70) return 'bg-green-500';
  if (p >= 50) return 'bg-yellow-500';
  return 'bg-red-500';
});

const trendIcon = computed(() => {
  const p = props.user.percentage;
  if (p >= 70) return '↑';
  if (p >= 50) return '→';
  return '↓';
});

/* =====================
   SSR-safe date format
===================== */
const formattedDate = computed(() => {
  if (!props.user.createdAt) return '';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(props.user.createdAt));
});

/* =====================
   Username helper
===================== */
function getUsernameFromEmail(email?: string | null): string {
  if (!email) return 'user';
  const [name] = email.split('@');
  return name || 'user';
}
</script>

<template>
  <div
    class="flex items-center justify-between gap-10 rounded-lg bg-gray-50 p-4 shadow dark:bg-gray-900 dark:text-gray-100"
  >
    <!-- Left -->
    <div class="flex items-center gap-8">
      <img
        :src="user.avatar || 'https://picsum.photos/seed/user/100/100'"
        :alt="user.name"
        class="h-10 w-10 rounded-full object-cover"
      />

      <div>
        <div class="font-semibold">
          {{ user.name }}
        </div>

        <div class="text-sm text-gray-500">
          {{ formattedDate }}
          · @{{ getUsernameFromEmail(user.email) }}
        </div>
      </div>
    </div>

    <!-- Right -->
    <div
      :class="[
        'flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium text-white',
        progressColor,
      ]"
    >
      <span>{{ trendIcon }}</span>
      {{ user.percentage }}%
    </div>
  </div>
</template>
