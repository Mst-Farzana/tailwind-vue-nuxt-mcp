<!-- pages/profile/index.vue -->
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue';
import UserCard from '~/components/profile/userCard.vue';
import GitHubBanner from './GitHubBanner.vue';

interface Profile {
  id: number;
  name: string;
  role: string;
  company: string;
  city: string;
  avatar: string;
  likes: number;
  posts: number;
  media: number;
  links: number;
  files: number;
}

const profile = ref<Profile | null>(null);
const loading = ref(false);

const fetchProfile = async () => {
  loading.value = true;
  try {
    const res = await $fetch<{ success: boolean; data: Profile }>('/api/profile/profile');
    profile.value = res.data;
  } catch (err: unknown) {
    console.error('❌ Error fetching profile:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => fetchProfile());
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6 dark:bg-gray-900 dark:text-gray-100">
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <div class="flex items-center space-x-5">
        <Icon icon="mdi:account-tie" class="h-4 w-4" />
        <h1 class="text-2xl font-bold">Profile</h1>
      </div>
      <NuxtLink
        to="/profile/add"
        class="rounded-lg bg-gray-800 px-4 py-2 text-white transition hover:bg-gray-700"
      >
        <Icon icon="mdi:plus" class="h-5 w-5" />
      </NuxtLink>
    </div>

    <!-- Profile Card -->
    <UserCard v-if="profile" :profile="profile" />

    <!-- Loading state -->
    <div v-else class="py-12 text-center">
      <div
        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
      />
      <p class="mt-4 text-gray-500">Loading profile...</p>
    </div>
    <GitHubBanner />
  </div>
</template>
