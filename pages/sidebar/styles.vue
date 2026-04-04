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
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header -->
    <h1 class="mb-8 text-center text-xl font-medium text-gray-500">Sidebar Colors</h1>

    <!-- Color Swatches -->
    <div class="mx-auto max-w-4xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        <!-- Row 1: Grayscale -->
        <div class="flex items-center gap-2">
          <span class="font-medium text-gray-700">White</span>
        </div>
        <button
          class="rounded-full bg-gray-500 px-4 py-2 font-medium text-white transition hover:bg-gray-600"
          @click="selectColor('basic')"
        >
          Basic
        </button>
        <button
          class="rounded-full bg-slate-500 px-4 py-2 font-medium text-white transition hover:bg-slate-600"
          @click="selectColor('slate')"
        >
          Slate
        </button>
        <button
          class="rounded-full bg-zinc-500 px-4 py-2 font-medium text-white transition hover:bg-zinc-600"
          @click="selectColor('zinc')"
        >
          Zinc
        </button>
        <button
          class="rounded-full bg-neutral-500 px-4 py-2 font-medium text-white transition hover:bg-neutral-600"
          @click="selectColor('neutral')"
        >
          Neutral
        </button>
        <button
          class="rounded-full bg-stone-500 px-4 py-2 font-medium text-white transition hover:bg-stone-600"
          @click="selectColor('stone')"
        >
          Stone
        </button>

        <!-- Row 2: Primary & Secondary -->
        <button
          class="rounded-full bg-emerald-500 px-4 py-2 font-medium text-white transition hover:bg-emerald-600"
          @click="selectColor('emerald')"
        >
          Emerald
        </button>
        <button
          class="rounded-full bg-teal-500 px-4 py-2 font-medium text-white transition hover:bg-teal-600"
          @click="selectColor('teal')"
        >
          Teal
        </button>
        <button
          class="rounded-full bg-cyan-500 px-4 py-2 font-medium text-white transition hover:bg-cyan-600"
          @click="selectColor('cyan')"
        >
          Cyan
        </button>
        <button
          class="rounded-full bg-sky-500 px-4 py-2 font-medium text-white transition hover:bg-sky-600"
          @click="selectColor('sky')"
        >
          Sky
        </button>
        <button
          class="rounded-full bg-blue-500 px-4 py-2 font-medium text-white transition hover:bg-blue-600"
          @click="selectColor('blue')"
        >
          Blue
        </button>
        <button
          class="rounded-full bg-indigo-500 px-4 py-2 font-medium text-white transition hover:bg-indigo-600"
          @click="selectColor('indigo')"
        >
          Indigo
        </button>

        <!-- Row 3: Vibrant -->
        <button
          class="rounded-full bg-violet-500 px-4 py-2 font-medium text-white transition hover:bg-violet-600"
          @click="selectColor('violet')"
        >
          Violet
        </button>
        <button
          class="rounded-full bg-purple-500 px-4 py-2 font-medium text-white transition hover:bg-purple-600"
          @click="selectColor('purple')"
        >
          Purple
        </button>
        <button
          class="rounded-full bg-fuchsia-500 px-4 py-2 font-medium text-white transition hover:bg-fuchsia-600"
          @click="selectColor('fuchsia')"
        >
          Fuchsia
        </button>
        <button
          class="rounded-full bg-pink-500 px-4 py-2 font-medium text-white transition hover:bg-pink-600"
          @click="selectColor('pink')"
        >
          Pink
        </button>
        <button
          class="rounded-full bg-rose-500 px-4 py-2 font-medium text-white transition hover:bg-rose-600"
          @click="selectColor('rose')"
        >
          Rose
        </button>
      </div>
    </div>
    <DarkModel />

    <!-- Footer -->
    <div class="mt-10 flex items-center justify-between text-sm text-gray-600">
      <div>
        ©2026,
        <span class="font-medium">JustBoil.me</span>
        .
        <a href="#" class="font-medium text-blue-600 hover:underline">Buy Premium</a>
        version
      </div>
      <div class="font-serif text-gray-800 italic">JustBoil</div>
    </div>
  </div>
</template>
