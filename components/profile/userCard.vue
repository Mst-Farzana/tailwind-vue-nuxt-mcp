<!-- components/profile/UserCard.vue -->
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useProfileAnimation } from '~/composables/useProfileAnimation';

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

const props = defineProps<{
  profile: Profile;
}>();

// Initialize animations for each stat
const likesCount = useProfileAnimation(props.profile.likes);
const postsCount = useProfileAnimation(props.profile.posts);
const mediaCount = useProfileAnimation(props.profile.media);
const linksCount = useProfileAnimation(props.profile.links);
const filesCount = useProfileAnimation(props.profile.files);
</script>

<template>
  <div
    class="flex items-center space-x-12 rounded-lg bg-white p-4 dark:bg-gray-900 dark:text-gray-100"
  >
    <!-- Avatar with Upload Button -->
    <div class="relative">
      <NuxtLink to="/profile/upload" class="block">
        <img
          :src="profile?.avatar || 'https://picsum.photos/seed/default/100/100'"
          alt="Avatar"
          class="h-20 w-20 cursor-pointer rounded-full transition hover:opacity-90"
        />
      </NuxtLink>
      <button
        class="absolute right-0 bottom-0 rounded-full bg-blue-500 p-2 text-white transition hover:bg-blue-600"
      >
        <Icon icon="mdi:camera" class="h-5 w-5" />
      </button>
    </div>

    <!-- Info -->
    <div>
      <!-- Name + Verified Badge -->
      <div class="mb-1 flex items-center space-x-2">
        <h2 class="text-xl font-bold">{{ profile?.name }}</h2>
        <Icon icon="mdi:check-circle" class="h-5 w-5 text-blue-500" />
      </div>

      <!-- Role, Company, City with Icons -->
      <div class="flex items-center space-x-4 text-sm text-gray-500">
        <!-- Developer -->
        <div class="flex items-center space-x-1">
          <Icon icon="mdi:account-tie" class="h-4 w-4 rounded-full bg-gray-400 p-1 text-white" />
          <span>{{ profile?.role }}</span>
        </div>

        <!-- Company -->
        <div class="flex items-center space-x-1">
          <Icon icon="mdi:domain" class="h-5 w-5" />
          <span>{{ profile?.company }}</span>
        </div>

        <!-- Location -->
        <div class="flex items-center space-x-1">
          <Icon icon="mdi:map-marker" class="h-5 w-5" />
          <span>{{ profile?.city }}</span>
        </div>
      </div>

      <!-- Stats Grid with Animation -->
      <div class="mt-5 grid grid-cols-5 gap-4">
        <div>
          <div class="text-xl font-bold">{{ likesCount.displayValue }}</div>
          <div class="text-xs text-gray-500">LIKES</div>
        </div>
        <div>
          <div class="text-xl font-bold">{{ postsCount.displayValue }}</div>
          <div class="text-xs text-gray-500">POSTS</div>
        </div>
        <div>
          <div class="text-xl font-bold">{{ mediaCount.displayValue }}</div>
          <div class="text-xs text-gray-500">MEDIA</div>
        </div>
        <div>
          <div class="text-xl font-bold">{{ linksCount.displayValue }}</div>
          <div class="text-xs text-gray-500">LINKS</div>
        </div>
        <div>
          <div class="text-xl font-bold">{{ filesCount.displayValue }}</div>
          <div class="text-xs text-gray-500">FILES</div>
        </div>
      </div>
    </div>

    <!-- Edit Button as NuxtLink -->
    <NuxtLink
      to="/profile/edit"
      class="ml-auto rounded-full bg-gray-100 p-2 transition hover:bg-gray-200"
    >
      <Icon icon="mdi:pencil" class="h-5 w-5" />
    </NuxtLink>
  </div>
</template>
