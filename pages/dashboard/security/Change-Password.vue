<script setup lang="ts">
import { ref } from 'vue';

const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const message = ref('');

async function changePassword() {
  if (newPassword.value !== confirmPassword.value) {
    message.value = 'Passwords do not match';
    return;
  }

  loading.value = true;
  message.value = '';

  try {
    // later real API connect করবেন
    await new Promise(resolve => setTimeout(resolve, 1000));

    message.value = 'Password updated successfully';
    currentPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Failed to update password: ${errorMessage}`);
    message.value = 'Failed to update password';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="mx-auto min-h-screen max-w-lg bg-gray-50 p-6">
    <h1 class="mb-6 text-2xl font-bold">Change password</h1>

    <form class="space-y-4 rounded-lg bg-white p-6 shadow" @submit.prevent="changePassword">
      <input
        v-model="currentPassword"
        type="password"
        placeholder="Current password"
        required
        class="w-full rounded border px-3 py-2"
      />

      <input
        v-model="newPassword"
        type="password"
        placeholder="New password"
        required
        class="w-full rounded border px-3 py-2"
      />

      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Confirm new password"
        required
        class="w-full rounded border px-3 py-2"
      />

      <p v-if="message" class="text-center text-sm text-red-500">
        {{ message }}
      </p>

      <button
        type="submit"
        :disabled="loading"
        class="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {{ loading ? 'Updating...' : 'Change password' }}
      </button>
    </form>
  </div>
</template>
