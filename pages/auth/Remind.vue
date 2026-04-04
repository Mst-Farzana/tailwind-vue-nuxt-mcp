<script setup lang="ts">
import { ref } from 'vue';

const username = ref('');
const message = ref('');
const loading = ref(false);
const error = ref('');
interface RemindResponse {
  success: boolean;
  message: string;
}

const submit = async () => {
  const trimmedUsername = username.value.trim();
  if (!trimmedUsername) {
    error.value = 'Please enter your username';
    return;
  }

  loading.value = true;
  error.value = '';
  message.value = '';

  try {
    const res = await $fetch<RemindResponse>('/api/auth/remind', {
      method: 'POST',
      body: { username: username.value },
    });
    message.value = res.message || "We'll remind you soon!";
  } catch (err: any) {
    error.value = err.data?.message || err.message || 'Something went wrong';

    if (err.statusCode === 404) {
      error.value = 'User not found';
    } else if (err.statusCode === 400) {
      error.value = 'Please enter a valid username';
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div
    class="flex min-h-screen items-center justify-center bg-linear-to-br from-orange-400 via-yellow-400 to-blue-400 p-4"
  >
    <div class="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <h2 class="mb-4 text-xl font-bold">Username</h2>

      <input
        v-model="username"
        type="text"
        placeholder="johndoe"
        class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
      <p v-else class="mt-1 text-sm text-gray-500">Please enter your username</p>

      <div class="mt-6 flex items-center justify-between">
        <button
          :disabled="loading"
          class="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
          @click="submit"
        >
          {{ loading ? 'Sending...' : 'Remind' }}
        </button>

        <NuxtLink to="/auth/login" class="text-sm text-gray-600 hover:underline">
          Back to login
        </NuxtLink>
      </div>

      <p v-if="message" class="mt-4 text-sm text-green-500">{{ message }}</p>
    </div>
  </div>
</template>
