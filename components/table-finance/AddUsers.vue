<script setup lang="ts">
import { ref } from 'vue';

interface UserResponse {
  success: boolean;
  data?: {
    id: number;
    name: string;
    date: string;
    email: string;
    avatar: string;
    percent: number;
    trend: string;
    trend_icon: string;
    trend_color: string;
  };
  error?: string;
}

const result = ref<UserResponse | null>(null);

const addUser = async () => {
  result.value = await $fetch<UserResponse>('/api/users', {
    method: 'POST',
    body: {
      name: 'Sunia',
      date: '2025-12-01',
      email: 'sumi@example.com',
      avatar: 'https://i.pravatar.cc/150?img=4',
      percent: 50,
    },
  });
};
</script>

<template>
  <div>
    <button
      class="rounded bg-amber-400 px-3 py-1 dark:bg-gray-900 dark:text-gray-100"
      @click="addUser"
    >
      Add User
    </button>
    <pre>{{ result }}</pre>
  </div>
</template>
