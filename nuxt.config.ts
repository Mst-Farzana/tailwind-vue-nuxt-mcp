import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },

  css: ['~/assets/css/main.css'],

  vite: {
    build: {
      sourcemap: false,
    },
  },

  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@nuxt/eslint',
    ...(process.env.NODE_ENV !== 'test' ? ['@nuxtjs/color-mode'] : []),
    ...(process.env.NODE_ENV === 'test' ? ['@nuxt/test-utils/module'] : []),
  ],

  colorMode:
    process.env.NODE_ENV === 'test'
      ? false
      : {
          preference: 'system',
          fallback: 'light',
          classSuffix: '',
        },

  app: {
    baseURL: process.env.GITHUB_PAGES === 'true' ? '/tailwind-vue-nuxt-mcp/' : '/',
    head: {
      title: 'My Nuxt App',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }],
      htmlAttrs: {
        class: '',
      },
    },
  },

  eslint: {
    checker: false,
  },

  runtimeConfig: {
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    OLLAMA_URL: process.env.OLLAMA_URL || 'http://127.0.0.1:11434/v1/chat/completions',

    public: {
      BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || 'http://localhost:3000/api/auth',
    },
  },

  build: {
    transpile: ['@iconify/vue'],
  },

  typescript: {
    strict: true,
  },

  nitro: {
    preset: process.env.GITHUB_PAGES === 'true' ? 'github-pages' : 'node-server',
  },

  // GitHub Pages এর জন্য সব routes prerender করুন
  routeRules:
    process.env.GITHUB_PAGES === 'true'
      ? {
          '/': { prerender: true },
          '/auth/**': { prerender: true },
          '/payment/**': { prerender: true },
          '/forms/**': { prerender: true },
          '/dashboard/**': { prerender: true },
          '/settings/**': { prerender: true },
          '/profile/**': { prerender: true },
        }
      : {},

  fonts: {
    providers: {
      fontshare: false,
    },
  },

  ...(process.env.NODE_ENV === 'test' && {
    ssr: false,
    experimental: {
      componentIslands: false,
    },
  }),
});
