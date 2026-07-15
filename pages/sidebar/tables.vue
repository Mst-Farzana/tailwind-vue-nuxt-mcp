<script setup lang="ts">
import ProfileUsers from '~/components/profile/profileUsers.vue';

interface User {
  id: number;
  name: string;
  email?: string;
  avatar?: string;
  amount: number;
  percentage: number;
  createdAt: string;
}

const { data, pending } = await useAsyncData<User[]>('users', async () => {
  const res = await $fetch<{ success: boolean; data: User[] }>('/api/profile/usersProfile');
  return res.success ? res.data : [];
});

const users = computed(() => data.value ?? []);
</script>

<template>
  <ClientOnly>
    <div class="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <div v-if="pending" class="text-center text-gray-500 dark:text-gray-400">
        Loading users...
      </div>

      <div v-else class="space-y-4">
        <ProfileUsers v-for="user in users" :key="user.id" :user="user" />
      </div>
    </div>
  </ClientOnly>
</template>
