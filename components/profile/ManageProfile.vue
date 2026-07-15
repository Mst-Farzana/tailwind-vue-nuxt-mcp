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
const fileInput = ref<HTMLInputElement | null>(null);

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
  if (typeof window === 'undefined') return; // SSR guard

  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  if (file.size > 500 * 1024) {
    alert('Max file size is 500kb');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await $fetch<{ success: boolean; urls?: string[] }>('/api/profile/profileUpload', {
      method: 'POST',
      body: formData,
    });

    if (res.success && res.urls?.[0]) {
      form.value.avatar = res.urls[0];
    } else {
      alert('Upload failed');
    }
  } catch (err) {
    console.error('Avatar upload failed', err);
    alert('Upload failed');
  } finally {
    // Reset input value so same file can be uploaded again
    if (input) input.value = '';
  }
}

/* ================= Update profile ================= */
async function updateProfile() {
  if (!form.value.name || !form.value.email) {
    alert('Name and email are required');
    return;
  }

  if (form.value.password && form.value.password.length < 6) {
    alert('Password must be at least 6 characters');
    return;
  }

  if (form.value.password !== form.value.confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  try {
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
      alert('Profile updated successfully');
      form.value.password = '';
      form.value.confirmPassword = '';
      await fetchProfile();
    } else {
      alert('Failed to update profile');
    }
  } catch (err) {
    console.error('Profile update failed', err);
    alert('Something went wrong');
  }
}

onMounted(fetchProfile);
</script>

<template>
  <div class="flex min-h-screen justify-center bg-gray-50 p-6 dark:bg-gray-900 dark:text-gray-100">
    <div class="w-full max-w-md rounded-lg bg-white p-6 shadow">
      <h1 class="mb-6 text-2xl font-bold">Manage Profile</h1>

      <!-- Avatar -->
      <!-- Avatar -->
      <div class="mb-6">
        <h2 class="mb-2 font-semibold">Avatar</h2>
        <div class="flex items-center gap-4">
          <img
            :src="form.avatar || profile?.avatar || 'https://picsum.photos/seed/default/200/200'"
            class="h-16 w-16 rounded-full"
          />

          <input ref="fileInput" type="file" hidden accept="image/*" @change="handleAvatarUpload" />

          <button
            class="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
            @click="openFilePicker"
          >
            <!-- ✅ Iconify Upload Icon -->
            <Icon icon="mdi:upload" class="h-5 w-5" />
            Upload
          </button>
        </div>
        <p class="mt-2 text-sm text-gray-500">Max 500kb</p>
      </div>

      <!-- Name -->
      <div class="mb-4">
        <h2 class="mb-1 font-semibold">Name</h2>
        <input
          v-model="form.name"
          type="text"
          placeholder="Your name"
          class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <!-- Email -->
      <div class="mb-4">
        <h2 class="mb-1 font-semibold">Email</h2>
        <input
          v-model="form.email"
          type="email"
          placeholder="Your email"
          class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <!-- Password -->
      <div class="mb-4">
        <h2 class="mb-1 font-semibold">Password</h2>
        <input
          v-model="form.password"
          type="password"
          placeholder="New password"
          class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <!-- Confirm Password -->
      <div class="mb-4">
        <h2 class="mb-1 font-semibold">Confirm Password</h2>
        <input
          v-model="form.confirmPassword"
          type="password"
          placeholder="Confirm password"
          class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <!-- Notifications -->
      <div class="mb-4 flex items-center">
        <input v-model="form.notificationsEnabled" type="checkbox" class="mr-2" />
        <span>Enable Notifications</span>
      </div>

      <!-- Actions -->
      <div class="flex gap-2">
        <button
          :disabled="loading"
          class="rounded-lg bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
          @click="updateProfile"
        >
          Submit
        </button>
        <button class="flex-1 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100">
          Options
        </button>
      </div>
    </div>
  </div>
  <div class="m-10 flex items-center justify-between text-sm text-gray-600">
    <div>
      ©2026,
      <span class="font-medium">JustBoil.me</span>
      .
      <a href="#" class="font-medium text-blue-600 hover:underline">Buy Premium</a>
      version
    </div>
    <div class="font-serif text-gray-800 italic">JustBoil</div>
  </div>
</template>
