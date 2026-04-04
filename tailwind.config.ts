// tailwind.config.js
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  safelist: [
    'border-gray-500',
    'border-black',
    'border-blue-500',
    'border-green-500',
    'border-yellow-500',
    'border-red-500',
    'text-gray-500',
    'text-black',
    'text-blue-500',
    'text-green-500',
    'text-yellow-500',
    'text-red-500',
    'bg-gray-500',
    'bg-black',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
  ],
  theme: {
    extend: {},
  },
  plugins: ['@tailwindcss/typography'],
  daisyui: {
    themes: ['light', 'dark', 'cupcake', 'bumblebee'],
  },
};
