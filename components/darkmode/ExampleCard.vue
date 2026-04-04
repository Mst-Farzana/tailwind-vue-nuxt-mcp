<script setup lang="ts">
import { ref } from 'vue';
import ConfirmModal from './ConfirmCard.vue';
import ExceptionModal from './ExpectionalCard.vue';
import SuccessModal from './SuccessCard.vue';

const showConfirmModal = ref(false);
const showExceptionModal = ref(false);
const showSuccessModal = ref(false);

const openConfirmModal = () => (showConfirmModal.value = true);
const openExceptionModal = () => (showExceptionModal.value = true);
const openSuccessModal = () => (showSuccessModal.value = true);

const closeConfirmModal = () => (showConfirmModal.value = false);
const closeExceptionModal = () => (showExceptionModal.value = false);
const closeSuccessModal = () => (showSuccessModal.value = false);
</script>

<template>
  <div class="mx-auto grid max-w-sm grid-cols-1 space-y-6 bg-white">
    <div
      class="flex h-48 w-full items-center justify-center rounded-lg bg-white p-6 shadow dark:bg-gray-800"
    >
      <button
        class="h-full w-full rounded-lg bg-blue-500 px-4 py-2 text-white"
        @click="openConfirmModal"
      >
        Confirm Action
      </button>
    </div>

    <div
      class="flex h-48 w-full items-center justify-center rounded-lg bg-white p-6 shadow dark:bg-gray-800"
    >
      <button
        class="h-full w-full rounded-lg bg-red-500 px-4 py-2 text-white"
        @click="openExceptionModal"
      >
        Unhandled Exception
      </button>
    </div>

    <div
      class="flex h-48 w-full items-center justify-center rounded-lg bg-white p-6 shadow dark:bg-gray-800"
    >
      <button
        class="h-full w-full rounded-lg bg-green-500 px-4 py-2 text-white"
        @click="openSuccessModal"
      >
        Success
      </button>
    </div>
  </div>

  <ConfirmModal v-if="showConfirmModal" @close="closeConfirmModal" />
  <ExceptionModal v-if="showExceptionModal" @close="closeExceptionModal" />
  <SuccessModal v-if="showSuccessModal" @close="closeSuccessModal" />
</template>
