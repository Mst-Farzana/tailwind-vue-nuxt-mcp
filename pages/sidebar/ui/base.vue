<script setup lang="ts">
import ButtonCard from '~/components/darkmode/ButtonCard.vue';
import CardComponent from '~/components/darkmode/CardComponent.vue';
import ComingSoonCard from '~/components/darkmode/CominsoonCard.vue';
import DarkModeCard from '~/components/darkmode/darkMode.vue';
import EmptyCard from '~/components/darkmode/EmptyCard.vue';
import ModalExamplesCard from '~/components/darkmode/ExampleCard.vue';

import NotificationsCard from '~/components/darkmode/NotificationsCard.vue';
import PillCard from '~/components/darkmode/PillCard.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold">UI Components</h1>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-1">
      <div>
        <h1 class="m-15 text-center text-sm font-medium text-gray-600">Dark mode</h1>
        <DarkModeCard />
      </div>
      <div>
        <h1 class="m-15 text-center text-sm font-medium text-gray-600">Modal examples</h1>
        <ModalExamplesCard />
      </div>
      <div class="mt-15">
        <!-- Your other cards -->
        <NotificationsCard />
      </div>
      <ComingSoonCard />
    </div>
    <div><ButtonCard /></div>

    <div><PillCard /></div>
    <div><CardComponent /></div>
    <div><EmptyCard /></div>

    <div class="mt-10 text-center text-sm text-gray-500">
      ©2026, JustBoil.me.
      <a href="#" class="text-blue-600 hover:underline">Buy Premium version</a>
    </div>
  </div>
</template>
