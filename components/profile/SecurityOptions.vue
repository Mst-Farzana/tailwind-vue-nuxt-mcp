<script setup lang="ts">
import { onMounted, ref } from 'vue';

/* ================= Interfaces ================= */
interface SecuritySettings {
  lastLogin: string;
  ip: string;
  apiStatus: boolean;
  twoFactorAuth: boolean;
  passwordChangedAt: string;
}

/* ================= State ================= */
const security = ref<SecuritySettings | null>(null);
const loading = ref(true);

/* ================= API Calls ================= */
async function fetchSecurity() {
  try {
    const res = await $fetch<{ success: boolean; data: SecuritySettings }>('/api/profile/security');
    if (res.success) {
      security.value = res.data;
    }
  } catch (err) {
    console.error('❌ Error fetching security:', err);
  } finally {
    loading.value = false;
  }
}

/* ================= Toggle Functions ================= */
async function toggleApiStatus() {
  if (!security.value) return;

  try {
    const res = await $fetch('/api/profile/security', {
      method: 'PUT',
      body: { apiStatus: !security.value.apiStatus },
    });

    if (res.success && security.value) {
      security.value.apiStatus = !security.value.apiStatus;
    }
  } catch (err) {
    console.error('❌ Error toggling API status:', err);
  }
}

async function toggleTwoFactorAuth() {
  if (!security.value) return;

  try {
    const res = await $fetch('/api/profile/security', {
      method: 'PUT',
      body: { twoFactorAuth: !security.value.twoFactorAuth },
    });

    if (res.success && security.value) {
      security.value.twoFactorAuth = !security.value.twoFactorAuth;
    }
  } catch (err) {
    console.error('❌ Error toggling 2FA:', err);
  }
}

onMounted(fetchSecurity);
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v6h8z"
          />
        </svg>
        <h1 class="text-2xl font-bold">Security options</h1>
      </div>
      <button class="p-2 text-gray-600 hover:text-gray-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="py-10 text-center text-gray-500">Loading security settings...</div>

    <!-- Error -->
    <div v-else-if="!security" class="text-red-500">Failed to load security settings</div>

    <!-- Content -->
    <template v-else>
      <!-- Last Login -->
      <div class="mb-4 flex items-center justify-between rounded-lg bg-white p-4 shadow">
        <div>
          <span class="text-sm text-gray-500">Last login</span>
          <span class="ml-1 font-medium">{{ security.lastLogin }}</span>
          <span class="ml-1 text-sm text-gray-500">from IP</span>
          <span class="ml-1 font-medium">{{ security.ip }}</span>
        </div>
        <NuxtLink to="/dashboard/security/sessions">
          <button class="rounded bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
            Manage sessions
          </button>
        </NuxtLink>
      </div>

      <!-- API Status -->
      <div class="mb-4 flex items-center justify-between rounded-lg bg-white p-4 shadow">
        <div>
          <span class="text-sm text-gray-500">API status</span>
          <span
            class="ml-1 font-bold"
            :class="{ 'text-green-600': security.apiStatus, 'text-red-600': !security.apiStatus }"
          >
            {{ security.apiStatus ? 'enabled' : 'disabled' }}
          </span>
        </div>
        <button
          class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          :class="{ 'bg-blue-600': security.apiStatus, 'bg-gray-200': !security.apiStatus }"
          @click="toggleApiStatus"
        >
          <span
            class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
            :class="{ 'translate-x-6': security.apiStatus, 'translate-x-1': !security.apiStatus }"
          />
        </button>
      </div>

      <!-- 2-Factor Authentication -->
      <div class="mb-4 flex items-center justify-between rounded-lg bg-white p-4 shadow">
        <div>
          <span class="text-sm text-gray-500">2-factor authentication</span>
          <span
            class="ml-1 rounded-full px-3 py-1 text-sm font-medium"
            :class="{
              'bg-blue-500 text-white': security.twoFactorAuth,
              'bg-yellow-500 text-white': !security.twoFactorAuth,
            }"
          >
            {{ security.twoFactorAuth ? 'Enabled' : 'Disabled' }}
          </span>
        </div>
        <button
          class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          :class="{ 'bg-blue-600': security.twoFactorAuth, 'bg-gray-200': !security.twoFactorAuth }"
          @click="toggleTwoFactorAuth"
        >
          <span
            class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
            :class="{
              'translate-x-6': security.twoFactorAuth,
              'translate-x-1': !security.twoFactorAuth,
            }"
          />
        </button>
      </div>

      <!-- Password Change -->
      <div class="flex items-center justify-between rounded-lg bg-white p-4 shadow">
        <div>
          <span class="text-sm text-gray-500">Password changed</span>
          <span
            class="ml-1 font-bold"
            :class="{
              'text-green-600': security.passwordChangedAt !== 'long time ago',
              'text-red-600': security.passwordChangedAt === 'long time ago',
            }"
          >
            {{ security.passwordChangedAt }}
          </span>
        </div>
        <NuxtLink
          to="/dashboard/security/change-password"
          class="inline-block rounded bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
        >
          Change password
        </NuxtLink>
      </div>
    </template>
  </div>
</template>
