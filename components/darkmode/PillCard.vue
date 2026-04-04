<script setup>
const currentSettings = reactive({
  outline: false,
  small: false,
  icon: true, // default ON as shown in your image
});

function toggleSetting(key) {
  currentSettings[key] = !currentSettings[key];
}

const pills = [
  { name: 'contrast', label: 'Contrast', color: 'gray-900', text: 'white' },
  { name: 'info', label: 'Info', color: 'blue-500', text: 'white' },
  { name: 'success', label: 'Success', color: 'green-500', text: 'white' },
  { name: 'warning', label: 'Warning', color: 'yellow-500', text: 'black' },
  { name: 'danger', label: 'Danger', color: 'red-500', text: 'white' },
];

function getPillClass(pill) {
  const base = 'px-4 py-2 font-medium flex items-center gap-1 transition-all duration-200';
  const size = currentSettings.small ? 'text-sm px-3 py-1.5' : 'text-base';
  const shape = 'rounded-full';
  const disabled = 'hover:opacity-90';

  if (currentSettings.outline) {
    return `${base} ${size} ${shape} ${disabled} border border-${pill.color} text-${pill.color} hover:bg-${pill.color}/10`;
  }

  return `${base} ${size} ${shape} ${disabled} bg-${pill.color} text-${pill.text} hover:bg-${pill.color}/90`;
}
</script>
<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header -->
    <h1 class="mb-8 text-center text-xl font-medium text-gray-500">Pills</h1>

    <!-- Settings Panel -->
    <div class="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h3 class="mb-3 font-bold text-gray-800">Settings</h3>
      <div class="flex flex-wrap items-center gap-6">
        <div class="flex items-center gap-2">
          <button
            :class="[
              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
              currentSettings.outline ? 'bg-blue-500' : 'bg-gray-300',
            ]"
            :aria-pressed="currentSettings.outline"
            @click="toggleSetting('outline')"
          >
            <span
              :class="[
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                currentSettings.outline ? 'translate-x-6' : 'translate-x-1',
              ]"
            />
          </button>
          <span class="text-gray-700">Outline</span>
        </div>

        <div class="flex items-center gap-2">
          <button
            :class="[
              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
              currentSettings.small ? 'bg-blue-500' : 'bg-gray-300',
            ]"
            :aria-pressed="currentSettings.small"
            @click="toggleSetting('small')"
          >
            <span
              :class="[
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                currentSettings.small ? 'translate-x-6' : 'translate-x-1',
              ]"
            />
          </button>
          <span class="text-gray-700">Small</span>
        </div>

        <div class="flex items-center gap-2">
          <button
            :class="[
              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
              currentSettings.icon ? 'bg-blue-500' : 'bg-gray-300',
            ]"
            :aria-pressed="currentSettings.icon"
            @click="toggleSetting('icon')"
          >
            <span
              :class="[
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                currentSettings.icon ? 'translate-x-6' : 'translate-x-1',
              ]"
            />
          </button>
          <span class="text-gray-700">Icon</span>
        </div>
      </div>
    </div>

    <!-- Pill Buttons -->
    <div class="flex flex-wrap gap-3">
      <button v-for="pill in pills" :key="pill.name" :class="getPillClass(pill)" :disabled="false">
        <svg
          v-if="currentSettings.icon"
          xmlns="http://www.w3.org/2000/svg"
          class="mr-1 h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3 3a1 1 0 000 2v12a1 1 0 000 2h12a1 1 0 000-2V5a1 1 0 000-2H5zm12 4l-4 4m0 0l-4 4m4-4v8M7 7h.01V7z"
            clip-rule="evenodd"
          />
        </svg>
        {{ pill.label }}
      </button>
    </div>
  </div>
</template>
