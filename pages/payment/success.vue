<script setup>
const route = useRoute();

onMounted(async () => {
  const tranId = route.query.tran_id;

  await $fetch('/api/payment/verify', {
    method: 'POST',
    body: { tranId },
  });

  await navigateTo('/sidebar/dashboard');
});
</script>
<template>
  <div></div>
</template>
