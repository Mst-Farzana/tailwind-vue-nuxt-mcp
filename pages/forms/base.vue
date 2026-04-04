<script setup lang="ts">
import { FetchError } from 'ofetch';
import { ref } from 'vue';

// Form state
const formData = ref({
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '',
  category: 'Business development',
  question: '',
  checkbox: ['Lorem'],
  radio: 'One',
  switch1: true,
  switch2: false,
});

// UI state
const errors = ref<Record<string, string>>({});
const loading = ref(false);
const success = ref(false);

// Validation
const validate = () => {
  errors.value = {};
  if (!formData.value.phone) {
    errors.value.phone = 'Phone number is required';
  } else if (!/^\d{10}$/.test(formData.value.phone)) {
    errors.value.phone = 'Phone must be 10 digits';
  }
  if (!formData.value.question.trim()) {
    errors.value.question = 'Question is required';
  } else if (formData.value.question.length > 255) {
    errors.value.question = 'Max 255 characters allowed';
  }
  return Object.keys(errors.value).length === 0;
};

const submit = async () => {
  if (!validate()) return;

  loading.value = true;
  try {
    const result = await $fetch('/api/forms/submit', {
      method: 'POST',
      body: formData.value,
    });
    success.value = true;
    console.log('✅ Form submitted:', result);
  } catch (err: unknown) {
    console.error('❌ Error:', err);

    if (err instanceof FetchError) {
      alert(err.data?.message || err.message || 'Failed to submit');
    } else if (err instanceof Error) {
      alert(err.message || 'Something went wrong!');
    } else {
      alert('An unknown error occurred');
    }
  } finally {
    loading.value = false;
  }
};
// Reset form
const reset = () => {
  formData.value = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '',
    category: 'Business development',
    question: '',
    checkbox: ['Lorem'],
    radio: 'One',
    switch1: true,
    switch2: false,
  };
  errors.value = {};
  success.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header -->
    <div class="mb-8 flex items-center justify-between">
      <h1 class="text-2xl font-bold">Forms example</h1>
      <button class="rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-700">
        Buy dashboard
      </button>
    </div>

    <!-- Form -->
    <form class="space-y-6" @submit.prevent="submit">
      <!-- Grouped with icons -->
      <div>
        <h3 class="mb-2 font-medium">Grouped with icons</h3>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div class="relative">
            <input
              v-model="formData.name"
              type="text"
              placeholder="John Doe"
              class="w-full rounded-lg border p-3 pl-10"
            />
            <span class="absolute top-3.5 left-3 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
          </div>
          <div class="relative">
            <input
              v-model="formData.email"
              type="email"
              placeholder="john.doe@example.com"
              class="w-full rounded-lg border p-3 pl-10"
            />
            <span class="absolute top-3.5 left-3 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14v-2H5v2z"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <!-- With help line -->
      <div>
        <h3 class="mb-2 font-medium">With help line</h3>
        <div class="relative">
          <input
            v-model="formData.phone"
            type="text"
            placeholder="Your phone number"
            :class="{ 'border-red-500': errors.phone }"
            class="w-full rounded-lg border p-3"
          />
          <p v-if="errors.phone" class="mt-1 text-sm text-red-500">{{ errors.phone }}</p>
          <p class="mt-1 text-sm text-gray-500">Do not enter the leading zero</p>
        </div>
      </div>

      <!-- Dropdown -->
      <div>
        <h3 class="mb-2 font-medium">Dropdown</h3>
        <select v-model="formData.category" class="w-full rounded-lg border p-3">
          <option value="Business development">Business development</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="Support">Support</option>
        </select>
      </div>

      <!-- Question -->
      <div>
        <h3 class="mb-2 font-medium">Question</h3>
        <textarea
          v-model="formData.question"
          placeholder="Explain how we can help you"
          rows="4"
          :class="{ 'border-red-500': errors.question }"
          class="w-full rounded-lg border p-3"
        />
        <p v-if="errors.question" class="mt-1 text-sm text-red-500">{{ errors.question }}</p>
        <p class="mt-1 text-sm text-gray-500">Your question. Max 255 characters</p>
      </div>

      <!-- Checkbox -->
      <div>
        <h3 class="mb-2 font-medium">Checkbox</h3>
        <div class="flex gap-4">
          <label class="flex items-center">
            <input
              v-model="formData.checkbox"
              type="checkbox"
              value="Lorem"
              class="mr-2 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            Lorem
          </label>
          <label class="flex items-center">
            <input
              v-model="formData.checkbox"
              type="checkbox"
              value="Ipsum"
              class="mr-2 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            Ipsum
          </label>
          <label class="flex items-center">
            <input
              v-model="formData.checkbox"
              type="checkbox"
              value="Dolore"
              class="mr-2 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            Dolore
          </label>
        </div>
      </div>

      <!-- Radio -->
      <div>
        <h3 class="mb-2 font-medium">Radio</h3>
        <div class="flex gap-4">
          <label class="flex items-center">
            <input
              v-model="formData.radio"
              type="radio"
              value="One"
              class="mr-2 h-5 w-5 rounded-full border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            One
          </label>
          <label class="flex items-center">
            <input
              v-model="formData.radio"
              type="radio"
              value="Two"
              class="mr-2 h-5 w-5 rounded-full border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            Two
          </label>
        </div>
      </div>

      <!-- Switch -->
      <div>
        <h3 class="mb-2 font-medium">Switch</h3>
        <div class="flex items-center gap-4">
          <label class="flex items-center">
            <input v-model="formData.switch1" type="checkbox" class="sr-only" />
            <div
              class="relative h-6 w-12 cursor-pointer rounded-full bg-blue-600 transition-colors"
              :class="{ 'bg-gray-300': !formData.switch1 }"
            >
              <div
                class="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform"
                :class="{ 'translate-x-6 transform': formData.switch1 }"
              />
            </div>
            <span class="ml-2">One</span>
          </label>
          <label class="flex items-center">
            <input v-model="formData.switch2" type="checkbox" class="sr-only" />
            <div
              class="relative h-6 w-12 cursor-pointer rounded-full bg-gray-300 transition-colors"
              :class="{ 'bg-blue-600': formData.switch2 }"
            >
              <div
                class="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform"
                :class="{ 'translate-x-6 transform': formData.switch2 }"
              />
            </div>
            <span class="ml-2">Two</span>
          </label>
        </div>
      </div>

      <!-- Upload Button (Non-functional - just UI) -->
      <div>
        <button
          type="button"
          disabled
          class="flex cursor-not-allowed items-center gap-2 rounded-lg bg-gray-400 px-4 py-2 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          Upload (UI only)
        </button>
        <p class="mt-1 text-sm text-gray-500">* File upload not implemented in this demo</p>
      </div>

      <!-- Submit & Reset Buttons -->
      <div class="flex gap-4 pt-4">
        <button
          type="submit"
          :disabled="loading"
          class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {{ loading ? 'Submitting...' : 'Submit' }}
        </button>
        <button
          type="button"
          class="rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50"
          @click="reset"
        >
          Reset
        </button>
      </div>

      <!-- Success Message -->
      <div v-if="success" class="mt-4 rounded-lg bg-green-100 p-4 text-green-700">
        ✅ Form submitted successfully!
      </div>
    </form>

    <!-- Info State Box -->
    <div class="mx-auto mt-10 max-w-md rounded-xl bg-white p-6 shadow-md">
      <div class="rounded-t-xl bg-blue-600 p-4 font-semibold text-white">Info state</div>
      <div class="p-4">
        <h3 class="mb-2 font-medium">Fields</h3>
        <input v-model="formData.name" type="text" class="w-full rounded-lg border p-3" />
        <button
          class="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          @click="submit"
        >
          Trigger
        </button>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-10 text-sm text-gray-500">
      ©2026, JustBoil.me.
      <a href="#" class="text-blue-600 hover:underline">Buy Premium version</a>
    </div>
  </div>
</template>
