<script setup lang="ts">
import { Icon } from '@iconify/vue';

interface User {
  id: number;
  name: string;
  date: string;
  email?: string;
  percent: number;
  color: 'green' | 'yellow' | 'red'; // match trendMeta
  icon: string;
  icon_bg: string; // for icon background
  avatar?: string;
}

defineProps<{ user: User }>();
</script>

<template>
  <div
    class="flex items-center justify-between rounded bg-white p-4 transition hover:shadow-lg dark:bg-gray-900 dark:text-gray-100"
  >
    <!-- LEFT: Avatar + Info -->
    <div class="flex items-center gap-3">
      <!-- Avatar -->
      <img
        :src="user.avatar || '/default-avatar.png'"
        alt="avatar"
        class="h-10 w-10 rounded-full border object-cover"
      />

      <!-- Info -->
      <div>
        <p class="font-semibold">{{ user.name }}</p>
        <p class="text-sm text-gray-500">
          {{ user.date }}
          <span v-if="user.email">@ {{ user.email.split('@')[0] }}</span>
        </p>
      </div>
    </div>

    <!-- RIGHT: Trend -->
    <div class="flex items-center space-x-2">
      <!-- Percent Badge with dynamic color -->
      <div
        class="flex items-center rounded px-3 py-1 font-semibold text-white"
        :class="
          user.color === 'green'
            ? 'bg-green-500'
            : user.color === 'yellow'
              ? 'bg-yellow-500'
              : 'bg-red-500'
        "
      >
        <Icon :icon="user.icon" class="me-1 h-5 w-5" />
        {{ user.percent }}%
      </div>
    </div>
  </div>
</template>
