// vitest.config.ts
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';

// ✅ প্রজেক্ট রুট ডিটেকশন (আরও নির্ভরযোগ্য)
const projectRoot = fileURLToPath(new URL('./', import.meta.url));

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      // ✅ Nuxt স্ট্যান্ডার্ড অ্যালাইস
      '~': projectRoot,
      '@': projectRoot,
      '~~': projectRoot,
      '@@': projectRoot,

      // ✅ Server alias (ঐচ্ছিক, কিন্তু ভালো প্র্যাকটিস)
      '#build': projectRoot + '/.nuxt',
    },
  },

  test: {
    globals: true,
    testTimeout: 60000,
    hookTimeout: 60000,

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json'],
      reportsDirectory: './coverage',
      exclude: ['node_modules/**', '.nuxt/**', 'tests/**', '**/*.d.ts', '**/*.config.ts'],
    },

    onConsoleLog(log) {
      if (
        log.includes('daisyUI') ||
        log.includes('DeprecationWarning') ||
        log.includes('Iconify') ||
        log.includes('[nuxt]')
      ) {
        return false;
      }
      return true;
    },

    server: {
      deps: {
        inline: [
          '@nuxt/test-utils',
          'nitropack',
          'h3',
          '#imports',
          '#app',
          '#build',
          '@iconify/vue', // ✅ Iconify মকিংয়ের জন্য জরুরি
        ],
      },
    },

    // 🚀 Projects Configuration
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['tests/unit/**/*.test.ts', 'tests/frontend/**/*.test.ts'],
          exclude: ['tests/unit/**/*.server.test.ts'],
          environment: 'happy-dom',
          setupFiles: ['./tests/setup.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          include: ['tests/e2e/**/*.test.ts', 'tests/backend/**/*.test.ts'],
          environment: 'node',
          setupFiles: ['./tests/e2e.setup.ts'],
        },
      },
    ],
  },
});
