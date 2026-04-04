<script setup lang="ts">
import { ref } from 'vue';

const isOutline = ref(false);
</script>

<template>
  <div class="mx-auto max-w-4xl bg-white p-8">
    <!-- Header -->
    <h2 class="mb-4 text-center text-xl font-semibold">Notifications</h2>

    <!-- Outline Toggle -->
    <div class="mb-10 flex items-center justify-center gap-2">
      <label class="relative inline-flex cursor-pointer items-center">
        <input v-model="isOutline" type="checkbox" class="peer sr-only" />
        <div class="h-6 w-11 rounded-full bg-gray-300 transition peer-checked:bg-blue-600" />
        <div
          class="absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5"
        />
      </label>
      <span class="text-sm">Outline</span>
    </div>

    <!-- Notifications -->
    <div class="space-y-4">
      <!-- Info -->
      <div
        :class="isOutline ? 'border border-blue-500 text-blue-600' : 'bg-blue-500 text-white'"
        class="flex items-center justify-between rounded-lg px-5 py-4"
      >
        <div class="flex items-center gap-2 font-medium">ℹ️ Info state. NotificationBar</div>
        <button
          :class="isOutline ? 'border border-blue-500 text-blue-600' : 'bg-white text-blue-600'"
          class="rounded-full px-4 py-1.5 text-sm"
        >
          Button
        </button>
      </div>

      <!-- Success -->
      <div
        :class="isOutline ? 'border border-green-500 text-green-600' : 'bg-green-500 text-white'"
        class="flex items-center justify-between rounded-lg px-5 py-4"
      >
        <div class="flex items-center gap-2 font-medium">✅ Success state. NotificationBar</div>
        <button
          :class="isOutline ? 'border border-green-500 text-green-600' : 'bg-white text-green-600'"
          class="rounded-full px-4 py-1.5 text-sm"
        >
          Button
        </button>
      </div>

      <!-- Warning -->
      <div
        :class="isOutline ? 'border border-yellow-500 text-yellow-600' : 'bg-yellow-500 text-white'"
        class="flex items-center justify-between rounded-lg px-5 py-4"
      >
        <div class="flex items-center gap-2 font-medium">⚠️ Warning state. NotificationBar</div>
        <button
          :class="
            isOutline ? 'border border-yellow-500 text-yellow-600' : 'bg-white text-yellow-600'
          "
          class="rounded-full px-4 py-1.5 text-sm"
        >
          Button
        </button>
      </div>

      <!-- Danger -->
      <div
        :class="isOutline ? 'border border-red-500 text-red-600' : 'bg-red-500 text-white'"
        class="flex items-center justify-between rounded-lg px-5 py-4"
      >
        <div class="flex items-center gap-2 font-medium">⛔ Danger state. NotificationBar</div>
        <button
          :class="isOutline ? 'border border-red-500 text-red-600' : 'bg-white text-red-600'"
          class="rounded-full px-4 py-1.5 text-sm"
        >
          Button
        </button>
      </div>

      <!-- Contrast -->
      <div
        :class="isOutline ? 'border border-gray-800 text-black' : 'bg-gray-900 text-white'"
        class="flex items-center justify-between rounded-lg px-5 py-4"
      >
        <div class="flex items-center gap-2 font-medium">🌓 Contrast. NotificationBar</div>
        <button
          :class="isOutline ? 'border border-gray-800 text-black' : 'bg-white text-black'"
          class="flex h-8 w-8 items-center justify-center rounded-full"
        >
          ×
        </button>
      </div>
    </div>
  </div>
</template>
