<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue';

interface Profile {
  avatar: string;
  name: string;
  email: string;
  notificationsEnabled: boolean;
  isVerified?: boolean;
}

const profile = ref<Profile | null>(null);
const loading = ref(true);
const isSubmitting = ref(false);
const isUploadingAvatar = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

// Status message for better UX (replaces alert)
const status = ref<{ type: 'success' | 'error'; message: string } | null>(null);

const form = ref({
  avatar: '',
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  notificationsEnabled: false,
});

/* ================= Fetch profile ================= */
async function fetchProfile() {
  loading.value = true;
  status.value = null;
  try {
    const res = await $fetch<{ success: boolean; data: Profile }>('/api/profile/profile-settings');

    if (res.success && res.data) {
      profile.value = res.data;
      Object.assign(form.value, {
        avatar: res.data.avatar,
        name: res.data.name,
        email: res.data.email,
        notificationsEnabled: res.data.notificationsEnabled,
      });
    }
  } catch (err) {
    console.error('Fetch profile failed', err);
    status.value = { type: 'error', message: 'Failed to load profile data.' };
  } finally {
    loading.value = false;
  }
}

/* ================= Open file picker ================= */
function openFilePicker() {
  fileInput.value?.click();
}

/* ================= Avatar upload ================= */
async function handleAvatarUpload(e: Event) {
  if (typeof window === 'undefined') return;

  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  if (file.size > 500 * 1024) {
    status.value = { type: 'error', message: 'Max file size is 500kb' };
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    isUploadingAvatar.value = true;
    status.value = null;

    const res = await $fetch<{ success: boolean; urls?: string[] }>('/api/profile/profileUpload', {
      method: 'POST',
      body: formData,
    });

    if (res.success && res.urls?.[0]) {
      form.value.avatar = res.urls[0];
      status.value = { type: 'success', message: 'Avatar uploaded successfully!' };
    } else {
      status.value = { type: 'error', message: 'Upload failed. Please try again.' };
    }
  } catch (err) {
    console.error('Avatar upload failed', err);
    status.value = { type: 'error', message: 'Upload failed. Please try again.' };
  } finally {
    isUploadingAvatar.value = false;
    if (input) input.value = ''; // Reset input
  }
}

/* ================= Update profile ================= */
async function updateProfile() {
  status.value = null;

  if (!form.value.name || !form.value.email) {
    status.value = { type: 'error', message: 'Name and email are required.' };
    return;
  }

  if (form.value.password && form.value.password.length < 6) {
    status.value = { type: 'error', message: 'Password must be at least 6 characters.' };
    return;
  }

  if (form.value.password !== form.value.confirmPassword) {
    status.value = { type: 'error', message: 'Passwords do not match.' };
    return;
  }

  try {
    isSubmitting.value = true;

    const res = await $fetch<{ success: boolean }>('/api/profile/profile-settings', {
      method: 'POST',
      body: {
        avatar: form.value.avatar,
        name: form.value.name,
        email: form.value.email,
        password: form.value.password || undefined,
        notificationsEnabled: form.value.notificationsEnabled,
      },
    });

    if (res.success) {
      status.value = { type: 'success', message: 'Profile updated successfully!' };
      form.value.password = '';
      form.value.confirmPassword = '';
      await fetchProfile();
    } else {
      status.value = { type: 'error', message: 'Failed to update profile.' };
    }
  } catch (err) {
    console.error('Profile update failed', err);
    status.value = { type: 'error', message: 'Something went wrong. Please try again.' };
  } finally {
    isSubmitting.value = false;
  }
}

onMounted(fetchProfile);
</script>

<template>
  <div
    class="min-h-screen bg-gray-50 p-4 transition-colors duration-300 sm:p-6 lg:p-8 dark:bg-gray-950 dark:text-gray-100"
  >
    <div class="mx-auto w-full max-w-2xl">
      <!-- Page Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Manage Profile</h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Update your account settings and preferences.
        </p>
      </div>

      <!-- Status Banner (Replaces alert) -->
      <div
        v-if="status"
        class="mb-6 flex items-center gap-3 rounded-lg border p-4 transition-all"
        :class="
          status.type === 'success'
            ? 'border-green-200 bg-green-50 text-green-800 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-400'
            : 'border-red-200 bg-red-50 text-red-800 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400'
        "
      >
        <Icon
          :icon="status.type === 'success' ? 'mdi:check-circle' : 'mdi:alert-circle'"
          class="h-5 w-5 flex-shrink-0"
        />
        <span class="text-sm font-medium">{{ status.message }}</span>
        <button class="ml-auto hover:opacity-75" @click="status = null">
          <Icon icon="mdi:close" class="h-5 w-5" />
        </button>
      </div>

      <!-- Main Card -->
      <div
        v-if="!loading"
        class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-colors sm:p-8 dark:border-gray-800 dark:bg-gray-900"
      >
        <!-- Avatar Section -->
        <div class="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <img
            :src="form.avatar || profile?.avatar || 'https://picsum.photos/seed/default/200/200'"
            class="h-20 w-20 rounded-full border-2 border-gray-200 object-cover dark:border-gray-700"
            alt="Profile Avatar"
          />
          <div class="flex flex-col gap-2">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Profile Picture</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">PNG, JPG or GIF. Max size 500kb.</p>
            <div class="flex gap-3">
              <input
                ref="fileInput"
                type="file"
                hidden
                accept="image/*"
                @change="handleAvatarUpload"
              />
              <button
                :disabled="isUploadingAvatar"
                class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                @click="openFilePicker"
              >
                <Icon v-if="!isUploadingAvatar" icon="mdi:upload" class="h-4 w-4" />
                <Icon v-else icon="mdi:loading" class="h-4 w-4 animate-spin" />
                {{ isUploadingAvatar ? 'Uploading...' : 'Upload New' }}
              </button>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <!-- Name -->
          <div>
            <label
              for="name"
              class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Full Name
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="Enter your full name"
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-500"
            />
          </div>

          <!-- Email -->
          <div>
            <label
              for="email"
              class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="you@example.com"
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-500"
            />
          </div>

          <!-- Password -->
          <div class="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                for="password"
                class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                New Password
              </label>
              <input
                id="password"
                v-model="form.password"
                type="password"
                placeholder="••••••••"
                class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                for="confirmPassword"
                class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                type="password"
                placeholder="••••••••"
                class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          <!-- Notifications -->
          <div
            class="flex items-start gap-3 rounded-lg border border-gray-200 p-4 dark:border-gray-800"
          >
            <input
              id="notifications"
              v-model="form.notificationsEnabled"
              type="checkbox"
              class="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <div>
              <label for="notifications" class="text-sm font-medium text-gray-900 dark:text-white">
                Enable Notifications
              </label>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Receive email updates about your account activity.
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3 pt-4">
            <button
              :disabled="isSubmitting"
              class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              @click="updateProfile"
            >
              <Icon v-if="isSubmitting" icon="mdi:loading" class="h-4 w-4 animate-spin" />
              {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
            </button>
            <button
              class="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              @click="fetchProfile"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <!-- Loading Skeleton -->
      <div v-else class="flex h-96 items-center justify-center">
        <Icon icon="mdi:loading" class="h-8 w-8 animate-spin text-blue-600" />
      </div>
    </div>
  </div>
</template>
