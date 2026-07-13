<script setup>
import clientsTable from '~/components/dashboard/ClientsTable.vue';
import FinancialStatus from '~/components/dashboard/FinanceStatus.vue';
import FinanceTable from '~/components/dashboard/FinanceTable.vue';
import ProductList from '~/components/dashboard/ProductList.vue';
import TrendsList from '~/components/dashboard/TrendsList.vue';
import profile from '~/components/dashboard/profile.vue';
import overview from '~/overview.vue';

// definePageMeta({
//   // middleware: 'auth',
// });
</script>

<template>
  <!-- এখানে bg-white, dark:bg-gray-900 এবং transition-colors যোগ করা হয়েছে -->
  <div
    class="min-h-screen w-full bg-gray-50 p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100"
  >
    <overview />
    <profile class="m-4 md:m-10 lg:m-20" />
    <finance-table />
    <financial-status />
    <trends-list />
    <product-list />
    <clients-table />
  </div>
</template>
