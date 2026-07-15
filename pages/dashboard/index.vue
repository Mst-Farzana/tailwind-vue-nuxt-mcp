<script setup>
definePageMeta({ layout: 'dashboard', middleware: 'auth' });
const { data } = await useFetch('/api/analytics/stats');
</script>

<template>
  <div class="dark:bg-gray-950 dark:text-gray-100">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-4 dark:bg-gray-950 dark:text-gray-100">
      <StatsCard
        title="Revenue"
        :value="`$${data.value.revenue}`"
        :delta="`${data.value.growth}%`"
      />
      <StatsCard title="Users" :value="data.value.users.toString()" :delta="'+8%'" />
      <StatsCard title="Orders" :value="data.value.orders.toString()" :delta="'+3%'" />
      <StatsCard title="Growth" :value="`${data.value.growth}%`" :delta="'+0.4%'" />
    </div>

    <div class="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div class="rounded-xl bg-white p-6 shadow dark:bg-gray-800">
        <LineChart :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May']" :series="data.value.series" />
      </div>

      <div class="rounded-xl bg-white p-6 shadow dark:bg-gray-800">
        <p>Other chart here</p>
      </div>
    </div>
  </div>
</template>
