<template>
  <div class="navbar bg-base-100 px-4 shadow-md dark:bg-gray-900 dark:text-gray-100">
    <!-- Left Logo -->
    <div class="flex-1">
      <NuxtLink to="/" class="btn btn-ghost text-xl">MyApp</NuxtLink>
    </div>
    <!-- Middle: Search + Desktop Menu -->
    <div class="hidden items-center gap-4 md:flex">
      <!-- Search -->
      <div class="form-control">
        <input type="text" placeholder="Search" class="input input-bordered w-40 md:w-64" />
      </div>

      <ul class="menu menu-horizontal text-green-500 hover:text-red-700">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/blog">Blog</NuxtLink></li>

        <li><NuxtLink to="/services">Services</NuxtLink></li>
        <li><NuxtLink to="/contact">Contact</NuxtLink></li>
      </ul>
    </div>

    <!-- Right: Dark Mode Button -->
    <div class="flex-none">
      <UColorModeButton />
    </div>

    <!-- Mobile Menu -->
    <div class="ml-2 flex-none md:hidden" />
    <details class="dropdown dropdown-end">
      <summary class="btn btn-ghost">
        <i class="fa-solid fa-bars text-xl" />
      </summary>

      <ul class="menu dropdown-content bg-base-100 rounded-box w-52 space-y-1 p-2 shadow">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/blog">Blog</NuxtLink></li>
        <li><NuxtLink to="/services">Services</NuxtLink></li>
        <li><NuxtLink to="/contact">Contact</NuxtLink></li>
      </ul>
    </details>
  </div>
</template>
