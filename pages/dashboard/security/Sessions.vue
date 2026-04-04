<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Session {
  id: number;
  device: string;
  browser: string;
  ip: string;
  lastActive: string;
  current: boolean;
}

const sessions = ref<Session[]>([]);
const loading = ref(true);

async function fetchSessions() {
  try {
    // later real API replace করবেন
    sessions.value = [
      {
        id: 1,
        device: 'Windows PC',
        browser: 'Chrome',
        ip: '192.168.1.10',
        lastActive: 'Just now',
        current: true,
      },
      {
        id: 2,
        device: 'Android Phone',
        browser: 'Chrome',
        ip: '192.168.1.20',
        lastActive: '2 hours ago',
        current: false,
      },
    ];
  } finally {
    loading.value = false;
  }
}

function logoutSession(id: number) {
  if (!confirm('Logout this session?')) return;
  sessions.value = sessions.value.filter(s => s.id !== id);
}

onMounted(fetchSessions);
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <h1 class="mb-6 text-2xl font-bold">Active sessions</h1>

    <div v-if="loading" class="text-gray-500">Loading sessions...</div>

    <div v-else class="space-y-4">
      <div
        v-for="session in sessions"
        :key="session.id"
        class="flex items-center justify-between rounded-lg bg-white p-4 shadow"
      >
        <div>
          <div class="font-semibold">
            {{ session.device }} · {{ session.browser }}
            <span v-if="session.current" class="ml-2 text-xs text-green-600">(Current)</span>
          </div>
          <div class="text-sm text-gray-500">
            IP: {{ session.ip }} · Last active: {{ session.lastActive }}
          </div>
        </div>

        <button
          v-if="!session.current"
          class="rounded bg-red-500 px-4 py-1 text-sm text-white hover:bg-red-600"
          @click="logoutSession(session.id)"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>
