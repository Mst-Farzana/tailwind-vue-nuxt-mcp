<script setup>
import { ref } from 'vue';
import DarkModel from '~/components/sidebar/DarkModel.vue';

const selectedColor = ref('');

function selectColor(color) {
  console.log('Selected color:', color);
  selectedColor.value = color;
  // In real app: apply theme or store preference
}
</script>

<template>
  <div
    class="min-h-screen bg-gray-50 p-4 transition-colors duration-300 sm:p-6 dark:bg-gray-950 dark:text-gray-100"
  >
    <!-- Header -->
    <h1 class="mb-8 text-center text-xl font-medium text-gray-500 dark:text-gray-400">
      Sidebar Colors
    </h1>

    <!-- Color Swatches Container -->
    <div
      class="mx-auto max-w-4xl rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-colors duration-300 sm:p-6 dark:border-gray-800 dark:bg-gray-900"
    >
      <!-- Responsive Grid -->
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        <!-- Row 1: Grayscale -->
        <div
          class="flex items-center justify-center rounded-full bg-gray-100 px-4 py-2 font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
        >
          White
        </div>
        <button
          class="rounded-full bg-gray-500 px-4 py-2 font-medium text-white shadow-sm transition-all duration-200 hover:bg-gray-600 hover:shadow-md focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none active:scale-95 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-offset-gray-900"
          @click="selectColor('basic')"
        >
          Basic
        </button>
        <button
          class="rounded-full bg-slate-500 px-4 py-2 font-medium text-white shadow-sm transition-all duration-200 hover:bg-slate-600 hover:shadow-md focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:outline-none active:scale-95 dark:bg-slate-600 dark:hover:bg-slate-500 dark:focus:ring-offset-gray-900"
          @click="selectColor('slate')"
        >
          Slate
        </button>
        <button
          class="rounded-full bg-zinc-500 px-4 py-2 font-medium text-white shadow-sm transition-all duration-200 hover:bg-zinc-600 hover:shadow-md focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:outline-none active:scale-95 dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:focus:ring-offset-gray-900"
          @click="selectColor('zinc')"
        >
          Zinc
        </button>
        <button
          class="rounded-full bg-neutral-500 px-4 py-2 font-medium text-white shadow-sm transition-all duration-200 hover:bg-neutral-600 hover:shadow-md focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:outline-none active:scale-95 dark:bg-neutral-600 dark:hover:bg-neutral-500 dark:focus:ring-offset-gray-900"
          @click="selectColor('neutral')"
        >
          Neutral
        </button>
        <button
          class="rounded-full bg-stone-500 px-4 py-2 font-medium text-white shadow-sm transition-all duration-200 hover:bg-stone-600 hover:shadow-md focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 focus:outline-none active:scale-95 dark:bg-stone-600 dark:hover:bg-stone-500 dark:focus:ring-offset-gray-900"
          @click="selectColor('stone')"
        >
          Stone
        </button>

        <!-- Row 2: Primary & Secondary -->
        <button
          class="rounded-full bg-emerald-500 px-4 py-2 font-medium text-white shadow-sm transition-all duration-200 hover:bg-emerald-600 hover:shadow-md focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:outline-none active:scale-95 dark:focus:ring-offset-gray-900"
          @click="selectColor('emerald')"
        >
          Emerald
        </button>
        <button
          class="rounded-full bg-teal-500 px-4 py-2 font-medium text-white shadow-sm transition-all duration-200 hover:bg-teal-600 hover:shadow-md focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:outline-none active:scale-95 dark:focus:ring-offset-gray-900"
          @click="selectColor('teal')"
        >
          Teal
        </button>
        <button
          class="rounded-full bg-cyan-500 px-4 py-2 font-medium text-white shadow-sm transition-all duration-200 hover:bg-cyan-600 hover:shadow-md focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:outline-none active:scale-95 dark:focus:ring-offset-gray-900"
          @click="selectColor('cyan')"
        >
          Cyan
        </button>
        <button
          class="rounded-full bg-sky-500 px-4 py-2 font-medium text-white shadow-sm transition-all duration-200 hover:bg-sky-600 hover:shadow-md focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:outline-none active:scale-95 dark:focus:ring-offset-gray-900"
          @click="selectColor('sky')"
        >
          Sky
        </button>
        <button
          class="rounded-full bg-blue-500 px-4 py-2 font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-600 hover:shadow-md focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none active:scale-95 dark:focus:ring-offset-gray-900"
          @click="selectColor('blue')"
        >
          Blue
        </button>
        <button
          class="rounded-full bg-indigo-500 px-4 py-2 font-medium text-white shadow-sm transition-all duration-200 hover:bg-indigo-600 hover:shadow-md focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:outline-none active:scale-95 dark:focus:ring-offset-gray-900"
          @click="selectColor('indigo')"
        >
          Indigo
        </button>

        <!-- Row 3: Vibrant -->
        <button
          class="rounded-full bg-violet-500 px-4 py-2 font-medium text-white shadow-sm transition-all duration-200 hover:bg-violet-600 hover:shadow-md focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:outline-none active:scale-95 dark:focus:ring-offset-gray-900"
          @click="selectColor('violet')"
        >
          Violet
        </button>
        <button
          class="rounded-full bg-purple-500 px-4 py-2 font-medium text-white shadow-sm transition-all duration-200 hover:bg-purple-600 hover:shadow-md focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:outline-none active:scale-95 dark:focus:ring-offset-gray-900"
          @click="selectColor('purple')"
        >
          Purple
        </button>
        <button
          class="rounded-full bg-fuchsia-500 px-4 py-2 font-medium text-white shadow-sm transition-all duration-200 hover:bg-fuchsia-600 hover:shadow-md focus:ring-2 focus:ring-fuchsia-400 focus:ring-offset-2 focus:outline-none active:scale-95 dark:focus:ring-offset-gray-900"
          @click="selectColor('fuchsia')"
        >
          Fuchsia
        </button>
        <button
          class="rounded-full bg-pink-500 px-4 py-2 font-medium text-white shadow-sm transition-all duration-200 hover:bg-pink-600 hover:shadow-md focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:outline-none active:scale-95 dark:focus:ring-offset-gray-900"
          @click="selectColor('pink')"
        >
          Pink
        </button>
        <button
          class="rounded-full bg-rose-500 px-4 py-2 font-medium text-white shadow-sm transition-all duration-200 hover:bg-rose-600 hover:shadow-md focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 focus:outline-none active:scale-95 dark:focus:ring-offset-gray-900"
          @click="selectColor('rose')"
        >
          Rose
        </button>
      </div>
    </div>

    <!-- Dark Mode Toggle Component -->
    <div class="mt-8 flex justify-center">
      <DarkModel />
    </div>

    <!-- Footer -->
    <div
      class="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 text-center text-sm text-gray-600 transition-colors duration-300 sm:flex-row sm:text-left dark:border-gray-800 dark:text-gray-400"
    >
      <div>
        ©2026,
        <span class="font-medium text-gray-900 dark:text-gray-200">JustBoil.me</span>
        .
        <a
          href="#"
          class="font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
        >
          Buy Premium
        </a>
        version
      </div>

      <div class="font-serif text-gray-800 italic dark:text-gray-200">JustBoil</div>
    </div>
  </div>
</template>
