<script setup lang="ts">
const menuItems = [
  { to: '/auth/login', label: 'Login' },
  { to: '/auth/signup', label: 'Signup' },
  { to: '/auth/remind', label: 'Remind' },
  { to: '/auth/error', label: 'Error' },
];
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-pink-500 to-purple-600">
    <div class="grid min-h-screen grid-cols-3 items-center p-6">
      <!-- LEFT SIDE -->
      <div class="col-span-2">
        <!-- Menu -->
        <div class="mb-6 ml-10 flex gap-2">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.to"
            :to="item.to"
            class="transform rounded-full bg-white px-5 py-2 font-bold text-black shadow-md transition hover:scale-105 hover:bg-gray-100"
            active-class="ring-2 ring-purple-500"
          >
            {{ item.label }}
          </NuxtLink>
        </div>

        <!-- Text -->
        <div class="hidden max-w-md text-center text-white md:block">
          <h1 class="mb-3 text-6xl font-bold">All instances</h1>
          <p class="mb-6 text-xl opacity-90">managed from one place</p>
          <p class="mb-8 text-sm opacity-75">Instagram | Telegram | Teletype</p>
          <div class="font-serif text-3xl tracking-wider">JustBoil</div>
        </div>
      </div>

      <!-- RIGHT SIDE (ROUTER OUTLET) -->
      <div class="flex items-center justify-center">
        <div class="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
          <NuxtPage />
        </div>
      </div>
    </div>
  </div>
</template>
