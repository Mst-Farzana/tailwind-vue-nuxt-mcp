<script setup>
import clientsTable from '~/components/dashboard/ClientsTable.vue';
import FinancialStatus from '~/components/dashboard/FinanceStatus.vue';
import FinanceTable from '~/components/dashboard/FinanceTable.vue';
import ProductList from '~/components/dashboard/ProductList.vue';

import TrendsList from '~/components/dashboard/TrendsList.vue';
import profile from '~/components/dashboard/profile.vue';
import overview from './overview.vue';
// definePageMeta({
//   // middleware: 'auth',
// });
</script>

<template>
  <div class="w-full p-6">
    <overview />
    <profile class="m-20" />
    <finance-table />
    <financial-status />
    <trends-list />
    <product-list />

    <clients-table />
  </div>
</template>
