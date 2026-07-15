<template>
  <div>
    <table class="min-w-full divide-y dark:bg-gray-900 dark:text-gray-100">
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in users" :key="u.id">
          <td>{{ u.id }}</td>
          <td>{{ u.email }}</td>
          <td>{{ u.createdAt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const users = ref([]);
const { data } = await useFetch('/api/users/list');
if (data.value) users.value = data.value;
</script>
