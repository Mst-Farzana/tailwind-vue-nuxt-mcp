<!-- pages/index.vue -->
<script setup>
definePageMeta({
  middleware: () => {
    return navigateTo('/sidebar/dashboard');
  },
});
</script>

<template>
  <div class="dark:bg-gray-950 dark:text-gray-100" />
</template>
