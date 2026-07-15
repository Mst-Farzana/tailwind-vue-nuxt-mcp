<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed, onMounted, ref } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { useOrganization } from '~/composables/useOrganization';
import ProfileUsers from '../profile/profileUsers.vue';

/* =========================
   AUTH & ORGANIZATION
========================= */
const { session, fetchSession } = useAuth();
const { currentOrganization } = useOrganization();

/* =========================
   LOADING STATES
========================= */
const ready = ref(false);

const profileLoading = ref(false);
const usersLoading = ref(false);

/* =========================
   PROFILE SECTION
========================= */
interface Profile {
  id: string;
  avatar: string;
  name: string;
  email: string;
  notificationsEnabled: boolean;
  lastLoginAt: string | null;
  lastLoginIp: string | null;
  isVerified: boolean;
}

const profile = ref<Profile | null>(null);

/* Form state for editing/toggles */
const form = ref({
  avatar: '',
  name: '',
  email: '',
  notificationsEnabled: false,
});

/* Default avatar fallback */
const DEFAULT_AVATAR = 'https://picsum.photos/seed/default/200/200';
const getAvatarUrl = (avatar?: string) => avatar?.trim() || DEFAULT_AVATAR;
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = DEFAULT_AVATAR;
};

/* Format last login */
const formattedLastLogin = computed(() => {
  if (!profile.value?.lastLoginAt) return 'Never';
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(profile.value.lastLoginAt));
});

/* Load profile from API */
const loadProfile = async () => {
  if (!session.value?.user) return;

  profileLoading.value = true;

  try {
    const res = await $fetch<{ success: boolean; data: Profile }>('/api/profile/profile-settings', {
      credentials: 'include',
      headers: {
        'x-organization-id': currentOrganization.value?.id || '',
      },
    });

    if (res.success) {
      profile.value = res.data;

      // populate form once after load
      form.value = {
        avatar: res.data.avatar,
        name: res.data.name,
        email: res.data.email,
        notificationsEnabled: res.data.notificationsEnabled,
      };
    }
  } catch (err) {
    console.error('Profile API error:', err);
  } finally {
    profileLoading.value = false;
  }
};

/* =========================
   USERS SECTION
========================= */
interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  amount: number;
  percentage: number;
  createdAt: string;
}

const users = ref<User[]>([]);

/* Load users from API */
const loadUsers = async () => {
  if (!session.value?.user) return;

  usersLoading.value = true;

  try {
    const res = await $fetch<{ success: boolean; data: User[] }>('/api/profile/usersProfile', {
      credentials: 'include',
      headers: {
        'x-organization-id': currentOrganization.value?.id || '',
      },
    });

    if (res.success) {
      users.value = res.data;
    }
  } catch (err) {
    console.error('Users API error:', err);
  } finally {
    usersLoading.value = false;
  }
};

/* =========================
   ON MOUNT
========================= */
onMounted(async () => {
  await fetchSession();
  ready.value = true;

  if (session.value?.user) {
    await Promise.all([loadProfile(), loadUsers()]);
  }
});
</script>
<template>
  <div class="min-h-screen space-y-10 p-6 dark:bg-gray-900 dark:text-gray-100">
    <!-- Header with Refresh Button -->

    <!-- ================= PROFILE ================= -->
    <div v-if="profileLoading" class="py-8 text-center text-gray-500">Loading profile...</div>

    <div
      v-else-if="profile"
      class="mx-auto flex h-auto w-full max-w-6xl flex-col items-center justify-center gap-6 rounded-lg bg-gray-100 px-6 sm:h-70 sm:flex-row sm:gap-20 sm:px-20"
    >
      <!-- Avatar -->
      <img
        :src="getAvatarUrl(form.avatar || profile.avatar)"
        alt="Profile avatar"
        class="h-48 w-48 rounded-full bg-gray-300 object-cover"
        @error="handleImageError"
      />

      <!-- Info -->
      <div class="flex-1 text-center font-medium sm:text-left">
        <!-- Notifications Toggle -->
        <div class="mb-3 flex items-center justify-center gap-2 sm:justify-start">
          <span class="text-sm text-gray-500">Notifications</span>
          <label class="relative inline-flex cursor-pointer items-center">
            <input
              v-model="form.notificationsEnabled"
              type="checkbox"
              class="peer sr-only"
              aria-label="Toggle notifications"
            />
            <div
              class="h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full"
            />
          </label>
        </div>

        <!-- Greeting -->
        <h2 class="text-xl font-bold">Howdy, {{ profile.name }}!</h2>

        <!-- Last Login -->
        <div class="mt-2 text-sm text-gray-600">
          <span>Last login:</span>
          <span class="ml-1">{{ formattedLastLogin }}</span>
          <span class="ml-2">from</span>
          <span class="ml-1 font-medium">
            {{ profile.lastLoginIp || '127.0.0.1' }}
          </span>
        </div>

        <!-- Verified Badge -->
        <div class="mt-4">
          <span
            v-if="profile.isVerified"
            class="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white"
          >
            <Icon icon="mdi:check" class="mr-2 h-4 w-4" />
            Verified
          </span>
        </div>
      </div>
    </div>

    <div v-else class="py-8 text-center text-red-500">Failed to load profile</div>

    <!-- ================= USERS ================= -->
    <ClientOnly>
      <div v-if="usersLoading" class="py-8 text-center text-gray-500">Loading users...</div>

      <div v-else class="space-y-4">
        <ProfileUsers v-for="user in users" :key="user.id" :user="user as any" />
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>
/* Optional custom styles */
</style>
