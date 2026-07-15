<!-- pages/index.vue -->
<script setup>
definePageMeta({
  middleware: () => {
    return navigateTo('/sidebar/dashboard');
  },
});
</script>

<template>
  <div />
</template>
