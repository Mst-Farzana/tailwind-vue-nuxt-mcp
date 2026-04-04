<script setup lang="ts">
import { reactive } from 'vue';

// Settings
type SettingId = 'outline' | 'small' | 'rounded' | 'disabled';
const settings: { id: SettingId; label: string }[] = [
  { id: 'outline', label: 'Outline' },
  { id: 'small', label: 'Small' },
  { id: 'rounded', label: 'Rounded' },
  { id: 'disabled', label: 'Disabled' },
];

// Colors
type Color = 'white' | 'black' | 'blue' | 'green' | 'orange' | 'red';
const colors: { name: string; bg: Color }[] = [
  { name: 'White', bg: 'white' },
  { name: 'Black', bg: 'black' },
  { name: 'Blue', bg: 'blue' },
  { name: 'Green', bg: 'green' },
  { name: 'Orange', bg: 'orange' },
  { name: 'Red', bg: 'red' },
];

// Predefined classes
type ClassSet = { bg: string; hover: string; border: string };
const colorClasses: Record<Color, ClassSet> = {
  white: {
    bg: 'bg-white text-black',
    hover: 'hover:bg-gray-100',
    border: 'border-gray-300 text-black',
  },
  black: {
    bg: 'bg-black text-white',
    hover: 'hover:bg-gray-800',
    border: 'border-black text-black',
  },
  blue: {
    bg: 'bg-blue-500 text-white',
    hover: 'hover:bg-blue-600',
    border: 'border-blue-500 text-blue-500',
  },
  green: {
    bg: 'bg-green-500 text-white',
    hover: 'hover:bg-green-600',
    border: 'border-green-500 text-green-500',
  },
  orange: {
    bg: 'bg-orange-500 text-white',
    hover: 'hover:bg-orange-600',
    border: 'border-orange-500 text-orange-500',
  },
  red: {
    bg: 'bg-red-500 text-white',
    hover: 'hover:bg-red-600',
    border: 'border-red-500 text-red-500',
  },
};

// Reactive state
const currentSettings = reactive<Record<SettingId, boolean>>({
  outline: false,
  small: false,
  rounded: false,
  disabled: false,
});

// Toggle setting
function toggleSetting(id: SettingId) {
  if (id !== 'disabled') currentSettings[id] = !currentSettings[id];
}

// Button class generators
function getButtonClass(color: Color) {
  const base = 'px-4 py-2 font-medium transition-all duration-200 flex items-center gap-2';
  const size = currentSettings.small ? 'text-sm' : 'text-base';
  const shape = currentSettings.rounded ? 'rounded-full' : 'rounded-md';
  const disabled = currentSettings.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90';
  const selected = colorClasses[color];

  if (currentSettings.outline) {
    return `${base} ${size} ${shape} ${disabled} border ${selected.border}`;
  }
  return `${base} ${size} ${shape} ${disabled} ${selected.bg} ${selected.hover}`;
}

function getSquareButtonClass(color: Color) {
  const base = 'p-2.5 font-medium transition-all duration-200 flex items-center justify-center';
  const size = currentSettings.small ? 'w-8 h-8' : 'w-10 h-10';
  const shape = currentSettings.rounded ? 'rounded-full' : 'rounded-md';
  const disabled = currentSettings.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90';
  const selected = colorClasses[color];

  if (currentSettings.outline) {
    return `${base} ${size} ${shape} ${disabled} border ${selected.border}`;
  }
  return `${base} ${size} ${shape} ${disabled} ${selected.bg} ${selected.hover}`;
}
</script>

<template>
  <div class="space-y-6 p-6">
    <!-- Settings -->
    <div class="flex flex-wrap gap-4 rounded-lg bg-gray-800 p-4">
      <div v-for="setting in settings" :key="setting.id" class="flex items-center gap-2">
        <span class="text-gray-300">{{ setting.label }}</span>
        <button
          :class="[
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
            currentSettings[setting.id] ? 'bg-blue-500' : 'bg-gray-600',
          ]"
          :aria-pressed="currentSettings[setting.id]"
          :disabled="setting.id === 'disabled'"
          @click="toggleSetting(setting.id)"
        >
          <span
            :class="[
              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
              currentSettings[setting.id] ? 'translate-x-6' : 'translate-x-1',
            ]"
          />
        </button>
      </div>
    </div>

    <!-- Buttons -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <!-- Default Buttons -->
      <div>
        <h3 class="mb-3 text-gray-400">Default</h3>
        <div class="flex flex-wrap gap-3">
          <button
            v-for="color in colors"
            :key="color.name"
            :class="getButtonClass(color.bg)"
            :disabled="currentSettings.disabled"
          >
            {{ color.name }}
          </button>
        </div>
      </div>

      <!-- Icon Buttons -->
      <div>
        <h3 class="mb-3 text-gray-400">With Icons</h3>
        <div class="flex flex-wrap gap-3">
          <button
            v-for="color in colors"
            :key="color.name"
            :class="getButtonClass(color.bg)"
            :disabled="currentSettings.disabled"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            {{ color.name }}
          </button>
        </div>
      </div>

      <!-- Square Buttons -->
      <div>
        <h3 class="mb-3 text-gray-400">Square</h3>
        <div class="flex flex-wrap gap-3">
          <button
            v-for="color in colors"
            :key="color.name"
            :class="getSquareButtonClass(color.bg)"
            :disabled="currentSettings.disabled"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
