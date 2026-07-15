<template>
  <footer
    class="border-t border-gray-200 bg-white transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900"
  >
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
        <!-- Brand Column -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center gap-2">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
              <Icon name="mdi:cube-outline" class="text-2xl text-white" />
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white">YourBrand</span>
          </div>
          <p class="mt-4 max-w-md text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Building modern web applications with cutting-edge technology. Empowering developers to
            create amazing digital experiences.
          </p>

          <!-- Social Links -->
          <div class="mt-6 flex gap-4">
            <a
              href="#"
              class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-blue-600 hover:text-white dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-blue-600 dark:hover:text-white"
              aria-label="Twitter"
            >
              <Icon name="mdi:twitter" class="text-lg" />
            </a>
            <a
              href="#"
              class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-blue-600 hover:text-white dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-blue-600 dark:hover:text-white"
              aria-label="GitHub"
            >
              <Icon name="mdi:github" class="text-lg" />
            </a>
            <a
              href="#"
              class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-blue-600 hover:text-white dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-blue-600 dark:hover:text-white"
              aria-label="LinkedIn"
            >
              <Icon name="mdi:linkedin" class="text-lg" />
            </a>
            <a
              href="#"
              class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-blue-600 hover:text-white dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-blue-600 dark:hover:text-white"
              aria-label="YouTube"
            >
              <Icon name="mdi:youtube" class="text-lg" />
            </a>
          </div>
        </div>

        <!-- Product Links -->
        <div>
          <h3 class="text-sm font-semibold tracking-wider text-gray-900 uppercase dark:text-white">
            Product
          </h3>
          <ul class="mt-4 space-y-3">
            <li>
              <NuxtLink
                to="/features"
                class="text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                Features
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/pricing"
                class="text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                Pricing
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/documentation"
                class="text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                Documentation
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/changelog"
                class="text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                Changelog
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Company Links -->
        <div>
          <h3 class="text-sm font-semibold tracking-wider text-gray-900 uppercase dark:text-white">
            Company
          </h3>
          <ul class="mt-4 space-y-3">
            <li>
              <NuxtLink
                to="/about"
                class="text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                About Us
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/blog"
                class="text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                Blog
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/careers"
                class="text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                Careers
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/contact"
                class="text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                Contact
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 md:flex-row dark:border-gray-800"
      >
        <p class="text-sm text-gray-600 dark:text-gray-400">
          © {{ new Date().getFullYear() }} YourBrand. All rights reserved.
        </p>

        <div class="flex flex-wrap justify-center gap-6 text-sm">
          <NuxtLink
            to="/privacy"
            class="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            Privacy Policy
          </NuxtLink>
          <NuxtLink
            to="/terms"
            class="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            Terms of Service
          </NuxtLink>
          <NuxtLink
            to="/cookies"
            class="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            Cookie Policy
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Icon } from '@iconify/vue';
</script>
