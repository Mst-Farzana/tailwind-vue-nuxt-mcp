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
    <div v-if="pending" class="text-center text-gray-500">Loading users...</div>

    <div v-else class="space-y-4">
      <ProfileUsers v-for="user in users" :key="user.id" :user="user" />
    </div>
  </ClientOnly>
</template>
