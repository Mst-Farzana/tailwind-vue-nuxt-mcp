<script setup lang="ts">
import { onMounted, ref } from 'vue';

const DEFAULT_AVATAR = 'https://picsum.photos/seed/default/40/40';

interface Client {
  id: number;
  name: string;
  company: string;
  city: string;
  progress: number;
  created: string;
  avatar: string;
  via: string;
}

const clients = ref<Client[]>([]);
const loading = ref(false);

const getAvatarUrl = (avatar: string | undefined): string => {
  return avatar?.trim() || DEFAULT_AVATAR;
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  if (img.src !== DEFAULT_AVATAR) {
    img.src = DEFAULT_AVATAR;
  }
};

const fetchClients = async () => {
  loading.value = true;
  try {
    const res = await $fetch<{ success: boolean; data: Client[] }>('/api/dashboard/clients');
    clients.value = res.data;
  } catch (err: unknown) {
    console.error('❌ Error fetching clients:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => fetchClients());

const viewClient = (client: Client): void => {
  alert(`Viewing: ${client.name}`);
};

const deleteClient = (client: Client): void => {
  const shouldDelete = confirm(`Delete ${client.name}?`);
  if (!shouldDelete) return;
  clients.value = clients.value.filter(c => c.id !== client.id);
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6 dark:bg-gray-900 dark:text-gray-100">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Clients</h1>
      <p class="text-gray-600">Manage your client list</p>
    </div>

    <div v-if="loading" class="py-8 text-center">
      <div class="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
      <p class="mt-2 text-gray-600">Loading clients...</p>
    </div>

    <div v-else-if="clients.length === 0" class="rounded-lg bg-white py-8 text-center shadow">
      <p class="text-gray-500">No clients found</p>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="client in clients"
        :key="client.id"
        class="flex flex-col items-start justify-between gap-4 rounded-lg bg-white p-4 shadow sm:flex-row sm:items-center"
      >
        <div class="flex flex-1 items-center space-x-4">
          <img
            :src="getAvatarUrl(client.avatar)"
            :alt="client.name"
            class="h-10 w-10 rounded-full object-cover"
            @error="handleImageError"
          />
          <div class="min-w-0 flex-1">
            <div class="truncate font-medium text-gray-900">{{ client.name }}</div>
            <div class="text-sm text-gray-500">{{ client.company }} • {{ client.city }}</div>
            <div class="text-xs text-gray-400">
              {{ client.created }} via {{ client.via || 'unknown' }}
            </div>
          </div>
        </div>

        <div class="flex w-full items-center space-x-3 sm:w-auto">
          <div
            class="flex items-center rounded-full px-3 py-1 text-xs font-medium text-white"
            :class="{
              'bg-green-500': client.progress >= 70,
              'bg-yellow-500': client.progress >= 50 && client.progress < 70,
              'bg-red-500': client.progress < 50,
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-1 h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H7"
              />
            </svg>
            {{ client.progress }}%
          </div>

          <button
            class="rounded-lg bg-blue-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            :aria-label="`View ${client.name}`"
            @click="viewClient(client)"
          >
            View
          </button>

          <button
            class="rounded-lg bg-red-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
            :aria-label="`Delete ${client.name}`"
            @click="deleteClient(client)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
