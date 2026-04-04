<script setup>
const logout = async () => {
  await $fetch('/api/auth/logout', { method: 'POST' });
};
</script>

<template>
  <button @click="logout">Logout</button>
</template>
