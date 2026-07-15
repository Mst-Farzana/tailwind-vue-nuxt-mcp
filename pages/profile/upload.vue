<!-- pages/profile/upload.vue -->
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// Default avatar
const defaultAvatar = 'https://picsum.photos/seed/default/200/200';
const currentAvatar = ref(defaultAvatar);
const previewUrl = ref('');
const selectedFile = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

// Profile data
interface Profile {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

const profile = ref<Profile | null>(null);
const router = useRouter();

// Fetch current profile
const fetchProfile = async () => {
  try {
    const res = await $fetch<{ success: boolean; data: Profile }>('/api/profile/profile');
    profile.value = res.data;
    currentAvatar.value = res.data.avatar || defaultAvatar;
  } catch (error) {
    console.error('Failed to fetch profile:', error);
  }
};

// Handle file selection
const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB
      alert('File size must be less than 5MB');
      return;
    }

    selectedFile.value = file;
    previewUrl.value = URL.createObjectURL(file);
  }
};

// Trigger file input click
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

// Handle drag and drop
const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    const file = event.dataTransfer.files[0];
    const fakeEvent = { target: { files: [file] } } as unknown as Event;
    handleFileSelect(fakeEvent);
  }
};

// Remove image
const removeImage = () => {
  selectedFile.value = null;
  previewUrl.value = '';
  currentAvatar.value = defaultAvatar;
};

// Save avatar to server
const saveAvatar = async () => {
  try {
    if (!selectedFile.value) {
      // If no file selected but want to remove
      if (currentAvatar.value !== defaultAvatar) {
        // In real app, send request to remove avatar
        currentAvatar.value = defaultAvatar;
        alert('Avatar removed successfully!');
        router.push('/profile');
        return;
      }
      return;
    }

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('avatar', selectedFile.value);

    // Send to server
    const response = await $fetch<{ success: boolean; avatarUrl: string }>('/api/profile/avatar', {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type - let browser handle it for multipart/form-data
      },
    });

    if (response.success) {
      // Update local state
      currentAvatar.value = response.avatarUrl;
      alert('Avatar updated successfully!');
      router.push('/profile');
    }
  } catch (error) {
    console.error('Failed to save avatar:', error);
    alert('Failed to save avatar. Please try again.');
  }
};

onMounted(() => {
  fetchProfile();
});
</script>

<template>
  <div class="mx-auto max-w-2xl p-6 dark:bg-gray-950 dark:text-gray-100">
    <!-- Header -->
    <div class="mb-8 flex items-center gap-4">
      <NuxtLink to="/profile" class="text-blue-600 hover:text-blue-800">
        <Icon icon="mdi:arrow-left" class="h-6 w-6" />
      </NuxtLink>
      <h1 class="text-2xl font-bold">Upload New Avatar</h1>
    </div>

    <!-- Current Avatar Preview -->
    <div class="mb-8">
      <h2 class="mb-4 text-lg font-semibold">Current Avatar</h2>
      <div class="flex items-center gap-6">
        <img
          :src="currentAvatar"
          alt="Current Avatar"
          class="h-24 w-24 rounded-full border-2 border-gray-200"
        />
        <div>
          <p class="text-gray-700">{{ profile?.name }}</p>
          <p class="text-sm text-gray-500">{{ profile?.role }}</p>
        </div>
      </div>
    </div>

    <!-- Upload Form -->
    <div class="rounded-lg bg-white p-6 shadow">
      <h2 class="mb-4 text-lg font-semibold">Choose New Image</h2>

      <!-- File Input -->
      <div
        class="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition hover:border-blue-400"
        @click="triggerFileInput"
        @dragover.prevent
        @drop.prevent="handleDrop"
      >
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleFileSelect"
        />

        <div class="flex flex-col items-center justify-center gap-4">
          <Icon icon="mdi:cloud-upload" class="h-12 w-12 text-gray-400" />
          <div>
            <p class="font-medium text-gray-700">Click to upload or drag and drop</p>
            <p class="mt-1 text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>
          </div>
        </div>
      </div>

      <!-- Preview -->
      <div v-if="previewUrl" class="mt-6">
        <h3 class="text-md mb-3 font-medium">Preview</h3>
        <img
          :src="previewUrl"
          alt="Preview"
          class="h-32 w-32 rounded-full border-2 border-gray-200"
        />
      </div>

      <!-- Actions -->
      <div class="mt-8 flex gap-4">
        <button
          v-if="previewUrl || currentAvatar !== defaultAvatar"
          class="rounded-lg bg-red-100 px-4 py-2 text-red-700 transition hover:bg-red-200"
          @click="removeImage"
        >
          Remove Image
        </button>

        <button
          :disabled="!selectedFile && currentAvatar === defaultAvatar"
          class="ml-auto rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          @click="saveAvatar"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>
