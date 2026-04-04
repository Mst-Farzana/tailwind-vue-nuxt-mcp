components/statusBadge.vue
<template>
  <span
    :class="[
      'rounded-full px-3 py-1 text-sm font-medium',
      type === 'deposit' && 'bg-green-500/10 text-green-600',
      type === 'payment' && 'bg-blue-500/10 text-blue-600',
      type === 'invoice' && 'bg-yellow-500/10 text-yellow-600',
      type === 'withdrawal' && 'bg-red-500/10 text-red-600',
    ]"
  >
    {{ label }}
  </span>
</template>

<script setup>
defineProps({
  type: { type: String, required: true },
  label: { type: String, required: true },
});
</script>
