<script setup lang="ts">
import { computed, ref } from 'vue';

// Dummy user data (later we can connect Drizzle ORM)
const users = ref([
  { id: 1, name: 'Farzana Akter', email: 'farzana@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Sarah Ali', email: 'sarah@example.com', role: 'Manager', status: 'Pending' },
]);

const search = ref('');

const filteredUsers = computed(() => {
  return users.value.filter(
    u =>
      u.name.toLowerCase().includes(search.value.toLowerCase()) ||
      u.email.toLowerCase().includes(search.value.toLowerCase()),
  );
});
</script>

<template>
  <div class="p-6 dark:bg-gray-950 dark:text-gray-100">
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold">Users</h1>

      <!-- Search -->
      <input
        v-model="search"
        type="text"
        placeholder="Search users..."
        class="input input-bordered w-64"
      />
    </div>

    <!-- Users Table -->
    <div class="overflow-x-auto">
      <table class="table-zebra table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th class="text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(user, index) in filteredUsers" :key="user.id">
            <td>{{ index + 1 }}</td>
            <td class="font-medium">{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>

            <td>
              <div
                class="badge"
                :class="{
                  'badge-success': user.status === 'Active',
                  'badge-warning': user.status === 'Pending',
                }"
              >
                {{ user.status }}
              </div>
            </td>

            <td class="text-right">
              <button class="btn btn-sm btn-outline">View</button>
              <button class="btn btn-sm btn-error ml-2">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
