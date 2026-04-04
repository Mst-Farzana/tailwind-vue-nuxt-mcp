<script setup lang="ts">
import { ref } from 'vue';

// ✅ Form state (all blank, placeholders only)
const formData = ref<{
  name: string;
  email: string;
  password: string;
  phone: string;
  currency: string;
  ip: string;
  dropdown: string;
  customDropdown: string;
  date: string;
  textarea: string;
  checkbox: string[];
  radio: string;
  radioWarning: string;
  switchOne: boolean;
  switchTwo: boolean;
  switchDangerOne: boolean;
  switchDangerTwo: boolean;
  file: File | null;
  emailState: 'normal' | 'success' | 'error';
  textareaState: 'normal' | 'error';
}>({
  name: '',
  email: '',
  password: '',
  phone: '',
  currency: 'USD',
  ip: '',
  dropdown: '',
  customDropdown: '',
  date: '',
  textarea: '',
  checkbox: [],
  radio: '',
  radioWarning: '',
  switchOne: false,
  switchTwo: false,
  switchDangerOne: false,
  switchDangerTwo: false,
  file: null,
  emailState: 'normal',
  textareaState: 'normal',
});

const showPassword = ref(false);
const loading = ref(false);
const success = ref(false);

// 👁 Show / Hide password
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// 📁 File upload (Type-safe)
const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement | null;

  if (target?.files?.length) {
    formData.value.file = target.files[0] as File;
  } else {
    formData.value.file = null; // ✅ Reset
  }
};

// ✅ Basic validation
const validate = (): boolean => {
  if (!formData.value.name.trim()) {
    alert('Name is required');
    return false;
  }
  if (!formData.value.email.includes('@')) {
    alert('Valid email is required');
    return false;
  }
  if (formData.value.checkbox.length === 0) {
    alert('Select at least one checkbox');
    return false;
  }
  return true;
};

// 🚀 Submit form
const submit = async () => {
  if (!validate()) return;

  loading.value = true;

  try {
    const payload = {
      ...formData.value,
      file: formData.value.file ? formData.value.file.name : null, // Send only file name
    };

    await $fetch('/api/forms', {
      method: 'POST',
      body: payload,
    });

    success.value = true;
  } catch (err: unknown) {
    // ✅ 'unknown' is TypeScript-safe
    console.error('❌ Submission error:', err);

    // ✅ Type guard
    if (err instanceof Error) {
      alert(err.message);
    } else if (err && typeof err === 'object' && 'data' in err) {
      alert((err as { data?: { message?: string } }).data?.message || 'Submission failed');
    } else {
      alert('Something went wrong!');
    }
  } finally {
    loading.value = false;
  }
};

// 🔄 Reset form (clear all fields)
const reset = () => {
  formData.value = {
    name: '',
    email: '',
    password: '',
    phone: '',
    currency: 'USD',
    ip: '',
    dropdown: '',
    customDropdown: '',
    date: '',
    textarea: '',
    checkbox: [],
    radio: '',
    radioWarning: '',
    switchOne: false,
    switchTwo: false,
    switchDangerOne: false,
    switchDangerTwo: false,
    file: null,
    emailState: 'normal',
    textareaState: 'normal',
  };
  success.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header -->
    <div class="mb-8 flex items-center justify-between">
      <h1 class="text-2xl font-bold">Advanced forms example</h1>
      <button class="rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-700">
        Buy dashboard
      </button>
    </div>

    <!-- Form -->
    <form class="space-y-8" @submit.prevent="submit">
      <!-- 1. Horizontal Fields + Show/Hide -->
      <div>
        <h3 class="mb-4 font-medium">Horizontal fields layout and advanced controls</h3>
        <div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
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
            <p class="mt-1 text-sm text-gray-500">Your full name</p>
          </div>
          <div>
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
            <p class="mt-1 text-sm text-gray-500">Your e-mail</p>
          </div>
        </div>

        <!-- Show/Hide Password -->
        <div>
          <h3 class="mb-2 font-medium">*** Show/hide</h3>
          <div class="relative">
            <input
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••"
              class="w-full rounded-lg border p-3 pr-10"
            />
            <button
              type="button"
              class="absolute top-3.5 right-3 text-gray-400 hover:text-gray-600"
              @click="togglePassword"
            >
              <span v-if="showPassword">🙈</span>
              <span v-else>👁️</span>
            </button>
          </div>
          <p class="mt-1 text-sm text-gray-500">Show/hide by clicking icon on the right</p>
        </div>
      </div>

      <!-- 2. With Addons -->
      <div>
        <h3 class="mb-4 font-medium">With addons</h3>
        <div class="mb-4">
          <div class="relative flex items-center">
            <span class="rounded-l-lg border border-r-0 bg-gray-100 px-3 py-2">+44 (0)</span>
            <input
              v-model="formData.phone"
              type="text"
              placeholder="Your phone number"
              class="flex-1 rounded-r-lg border p-3"
            />
            <span class="rounded-r-lg border border-l-0 bg-gray-100 px-3 py-2">UK</span>
          </div>
          <p class="mt-1 text-sm text-gray-500">Field with prefix & suffix</p>
        </div>
        <div class="mb-4">
          <div class="relative flex items-center">
            <span class="rounded-l-lg border border-r-0 bg-gray-100 px-3 py-2">$</span>
            <input
              v-model="formData.currency"
              type="number"
              placeholder="1024"
              class="flex-1 rounded-r-lg border p-3"
            />
            <select
              v-model="formData.currency"
              class="rounded-r-lg border border-l-0 bg-gray-100 px-3 py-2"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <p class="mt-1 text-sm text-gray-500">Static prefix with dropdown at the end</p>
        </div>
        <div class="mb-4">
          <div class="relative flex items-center">
            <span class="rounded-l-lg border border-r-0 bg-gray-100 px-3 py-2">IPv6:</span>
            <input
              v-model="formData.ip"
              type="text"
              placeholder="fe80::/10"
              class="flex-1 rounded-r-lg border p-3"
            />
            <button
              type="button"
              class="rounded-r-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Fetch
            </button>
          </div>
          <p class="mt-1 text-sm text-gray-500">Static prefix with button at the end</p>
        </div>
        <div class="mb-4">
          <div class="relative flex items-center">
            <button
              type="button"
              class="rounded-l-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5a8.001 8.001 0 00-8-8"
                />
              </svg>
            </button>
            <input
              v-model="formData.ip"
              type="text"
              placeholder="127.0.0.1"
              class="flex-1 rounded-r-lg border p-3"
            />
          </div>
          <p class="mt-1 text-sm text-gray-500">Button and text field</p>
        </div>
      </div>

      <!-- 3. Dropdowns + Date + Textarea -->
      <div>
        <h3 class="mb-2 font-medium">Custom dropdown</h3>
        <select v-model="formData.customDropdown" class="mb-4 w-full rounded-lg border p-3">
          <option value="Howell Hand">Howell Hand</option>
          <option value="Alice Smith">Alice Smith</option>
          <option value="Bob Johnson">Bob Johnson</option>
        </select>
        <p class="mt-1 mb-4 text-sm text-gray-500">Customized dropdown component</p>

        <h3 class="mb-2 font-medium">Dropdown</h3>
        <select v-model="formData.dropdown" class="mb-4 w-full rounded-lg border p-3">
          <option value="Business development">Business development</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="Support">Support</option>
        </select>
        <p class="mt-1 mb-4 text-sm text-gray-500">Classic select</p>

        <h3 class="mb-2 font-medium">Date</h3>
        <div class="relative mb-4">
          <input
            v-model="formData.date"
            type="text"
            placeholder="mm/dd/yyyy"
            class="w-full rounded-lg border p-3 pr-10"
          />
          <span class="absolute top-3.5 right-3 text-gray-400">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14"
              />
            </svg>
          </span>
        </div>
        <p class="mt-1 mb-4 text-sm text-gray-500">Date picker</p>

        <h3 class="mb-2 font-medium">Textarea</h3>
        <textarea
          v-model="formData.textarea"
          placeholder="Textarea"
          rows="4"
          class="w-full rounded-lg border p-3"
        />
        <p class="mt-1 text-sm text-gray-500">Your question. Max 255 characters</p>
      </div>

      <!-- 4. Checkbox + Radio -->
      <div>
        <h3 class="mb-2 font-medium">Checkbox</h3>
        <div class="mb-4 space-y-2">
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
        <p class="mt-1 mb-4 text-sm text-gray-500">Vertical layout</p>

        <h3 class="mb-2 font-medium">Success</h3>
        <div class="mb-4 flex space-x-4">
          <label class="flex items-center">
            <input
              v-model="formData.checkbox"
              type="checkbox"
              value="Lorem"
              class="mr-2 h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500"
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
        <p class="mt-1 mb-4 text-sm text-gray-500">Horizontal layout with color</p>

        <h3 class="mb-2 font-medium">Radio</h3>
        <div class="mb-4 space-y-2">
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
        <p class="mt-1 mb-4 text-sm text-gray-500">Vertical layout</p>
      </div>
      <!-- pages/forms.vue-এ যোগ করুন -->
      <div>
        <h3 class="mb-2 font-medium">Warning</h3>
        <div class="flex items-center space-x-6">
          <label class="flex items-center">
            <input
              v-model="formData.radioWarning"
              type="radio"
              name="radioWarning"
              value="One"
              class="mr-2 h-5 w-5 rounded-full border-yellow-300 text-yellow-500 focus:ring-2 focus:ring-yellow-500"
            />
            One
          </label>
          <label class="flex items-center">
            <input
              v-model="formData.radioWarning"
              type="radio"
              name="radioWarning"
              value="Two"
              class="mr-2 h-5 w-5 rounded-full border-gray-300 text-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            Two
          </label>
        </div>
        <p class="mt-1 text-sm text-gray-500">Horizontal layout with color</p>
      </div>

      <!-- 5. Switches -->
      <div>
        <h3 class="mb-2 font-medium">Switch</h3>
        <div class="mb-4 flex items-center space-x-4">
          <label class="flex items-center">
            <input v-model="formData.switchOne" type="checkbox" class="sr-only" />
            <div
              class="relative h-6 w-12 cursor-pointer rounded-full bg-blue-600 transition-colors"
              :class="{ 'bg-gray-300': !formData.switchOne }"
            >
              <div
                class="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform"
                :class="{ 'translate-x-6 transform': formData.switchOne }"
              />
            </div>
            <span class="ml-2">One</span>
          </label>
          <label class="flex items-center">
            <input v-model="formData.switchTwo" type="checkbox" class="sr-only" />
            <div
              class="relative h-6 w-12 cursor-pointer rounded-full bg-gray-300 transition-colors"
              :class="{ 'bg-blue-600': formData.switchTwo }"
            >
              <div
                class="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform"
                :class="{ 'translate-x-6 transform': formData.switchTwo }"
              />
            </div>
            <span class="ml-2">Two</span>
          </label>
        </div>
        <p class="mt-1 mb-4 text-sm text-gray-500">Vertical layout</p>

        <h3 class="mb-2 font-medium text-red-600">Danger</h3>
        <div class="flex items-center space-x-4">
          <label class="flex items-center">
            <input v-model="formData.switchDangerOne" type="checkbox" class="sr-only" />
            <div
              class="relative h-6 w-12 cursor-pointer rounded-full bg-red-600 transition-colors"
              :class="{ 'bg-gray-300': !formData.switchDangerOne }"
            >
              <div
                class="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform"
                :class="{ 'translate-x-6 transform': formData.switchDangerOne }"
              />
            </div>
            <span class="ml-2">One</span>
          </label>
          <label class="flex items-center">
            <input v-model="formData.switchDangerTwo" type="checkbox" class="sr-only" />
            <div
              class="relative h-6 w-12 cursor-pointer rounded-full bg-gray-300 transition-colors"
              :class="{ 'bg-red-600': formData.switchDangerTwo }"
            >
              <div
                class="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform"
                :class="{ 'translate-x-6 transform': formData.switchDangerTwo }"
              />
            </div>
            <span class="ml-2">Two</span>
          </label>
        </div>
        <p class="mt-1 text-sm text-gray-500">Horizontal layout with color</p>
      </div>

      <!-- 6. File Upload -->
      <div>
        <h3 class="mb-2 font-medium">File</h3>
        <label
          class="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
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
          <span>Upload</span>
          <input type="file" class="hidden" @change="handleFileChange" />
        </label>
        <p v-if="formData.file" class="mt-1 text-sm text-gray-500">
          Selected: {{ formData.file.name }}
        </p>
      </div>

      <!-- 7. Submit & Reset Buttons -->
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

    <!-- Footer -->
    <div class="mt-10 text-sm text-gray-500">
      ©2026, JustBoil.me.
      <a href="#" class="text-blue-600 hover:underline">Buy Premium version</a>
    </div>
  </div>
</template>
