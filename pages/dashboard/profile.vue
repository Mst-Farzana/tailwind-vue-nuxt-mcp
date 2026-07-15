<script setup lang="ts">
import ProfileCard from '~/components/profile/ProfileCard.vue';

import BillingOverview from '~/components/profile/BillingOverview.vue';

import PaymentMethods from '~/components/profile/PaymentMethods.vue';

import ManageProfile from '~/components/profile/ManageProfile.vue';
import SecurityOptions from '~/components/profile/SecurityOptions.vue';
</script>

<template>
  <div class="dark:bg-gray-950 dark:text-gray-100">
    <ProfileCard />
    <BillingOverview />
    <PaymentMethods />
    <SecurityOptions />
    <ManageProfile />
  </div>
</template>
