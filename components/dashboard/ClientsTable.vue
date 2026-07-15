<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue';

// ✅ TypeScript Interface
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

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

const clients = ref<Client[]>([]);
const pagination = ref<Pagination | null>(null);
const loading = ref(false);
const currentPage = ref(1);

const fetchClients = async (page = 1) => {
  loading.value = true;
  try {
    const res = await $fetch<{ success: boolean; data: Client[]; pagination: Pagination }>(
      '/api/dashboard/clients',
      {
        method: 'GET',
        query: {
          page: page.toString(),
          limit: '5',
        },
      },
    );
    clients.value = res.data;
    pagination.value = res.pagination;
    currentPage.value = page;
  } catch (err: unknown) {
    console.error('❌ Error fetching clients:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => fetchClients());

// 🖱 View/Edit/Delete Actions
const viewClient = (client: Client) => {
  alert(`Viewing: ${client.name}`);
};

const deleteClient = (client: Client) => {
  if (confirm(`Delete ${client.name}?`)) {
    const index = clients.value.findIndex(c => c.id === client.id);
    if (index !== -1) {
      clients.value.splice(index, 1);
    }
  }
};

const showBanner = ref(true);
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <div class="flex items-center justify-center gap-2">
        <Icon icon="mdi:account-multiple" class="mr-2 h-4 w-4 text-gray-900" />
        <h1 class="text-2xl font-bold">Clients</h1>
      </div>
      <button class="rounded-lg bg-gray-100 px-4 py-2 text-gray-900 hover:bg-gray-200">
        <Icon icon="mdi:cog" class="h-4 w-4" />
      </button>
    </div>

    <!-- Info Banner -->
    <div
      v-if="showBanner"
      id="responsive-banner"
      class="mb-6 flex items-center justify-between rounded-md bg-blue-500 p-4 text-white"
    >
      <span>Responsive table. Collapses on mobile</span>

      <button @click="showBanner = false">
        <Icon icon="mdi:close" class="h-4 w-4 rounded-full bg-white p-1 text-blue-700" />
      </button>
    </div>

    <!-- Clients Table -->
    <div class="overflow-hidden rounded-lg bg-white shadow">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
              >
                Name
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
              >
                Company
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
              >
                City
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
              >
                Progress
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
              >
                Created
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="client in clients" :key="client.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex h-10 w-10 shrink-0">
                    <img
                      :src="client.avatar || 'https://picsum.photos/seed/default/40/40'"
                      alt="Avatar"
                      class="h-10 w-10 rounded-full"
                    />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ client.name }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ client.company }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ client.city }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="h-2 w-24 rounded-full bg-gray-200">
                  <div
                    :style="{ width: `${client.progress}%` }"
                    class="h-2 rounded-full bg-blue-600"
                  />
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ client.created }}</div>
              </td>
              <td class="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                <button class="mr-4 text-blue-600 hover:text-blue-900" @click="viewClient(client)">
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C2.458 6.7 6.7 2.458 12 2.458s9.542 4.242 9.542 9.542c0 5.3-4.242 9.542-9.542 9.542"
                    />
                  </svg>
                </button>
                <button class="text-red-600 hover:text-red-900" @click="deleteClient(client)">
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-6 flex items-center justify-between">
      <div class="text-sm text-gray-500">
        Page {{ pagination?.currentPage }} of {{ pagination?.totalPages }}
      </div>
      <div class="flex space-x-2">
        <button
          v-for="page in pagination?.totalPages"
          :key="page"
          :class="{
            'bg-blue-600 text-white': page === currentPage,
            'bg-white text-gray-500 hover:bg-gray-100': page !== currentPage,
          }"
          class="rounded-md px-3 py-1"
          @click="fetchClients(page)"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </div>
</template>
