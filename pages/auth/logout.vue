<script setup>
import { useAuth } from '~/composables/useAuth';

const { signOut } = useAuth();

const logout = async () => {
  await signOut();

  await navigateTo('/auth/login');
};
</script>

<template>
  <button
    class="px-4 py-2 text-sm font-medium text-red-600 transition hover:text-red-700"
    @click="logout"
  >
    Logout
  </button>
</template>
