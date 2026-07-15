<script setup lang="ts">
import { useRoute, useRouter } from '#imports';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { useAuth } from '~/composables/useAuth';

const router = useRouter();
const route = useRoute();

const email = ref('');
const password = ref('');
const remember = ref(false);
const loading = ref(false);
const errorMessage = ref('');

const { signIn, fetchSession } = useAuth();

const clearError = () => {
  if (errorMessage.value) errorMessage.value = '';
};

const submit = async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    // signIn ফাংশনটি কী রিটার্ন করছে তা দেখার জন্য লগ করা হলো
    const result = await signIn(email.value, password.value);
    console.log('SignIn Result:', result);

    // যদি signIn ফাংশনটি { error: ... } অবজেক্ট রিটার্ন করে
    if (result && result.error) {
      const err = result.error as any;
      errorMessage.value = err.message || err.data?.message || 'Invalid email or password';
      return;
    }

    // সেশন আপডেট করা
    await fetchSession();

    // রিডাইরেক্ট লজিক
    const redirectPath = (route.query.redirect as string) || '/sidebar/dashboard';
    router.push(redirectPath);
  } catch (err: any) {
    // যদি signIn ফাংশনটি এরর থ্রো (throw) করে (Nuxt $fetch এর ডিফল্ট আচরণ)
    console.error('❌ Login Fetch Error:', err);

    // ব্যাকএন্ড থেকে আসা সঠিক এরর মেসেজ বের করা
    const errMsg = err.data?.message || err.message || 'Invalid email or password';
    errorMessage.value = errMsg;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="mx-auto w-full max-w-md">
    <div class="mb-8 text-center">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Don't have an account?
        <NuxtLink
          to="/auth/signup"
          class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Sign up for free
        </NuxtLink>
      </p>
    </div>

    <form
      class="space-y-5 rounded-xl bg-white p-6 shadow-lg transition-colors dark:bg-gray-900 dark:shadow-gray-950/50"
      @submit.prevent="submit"
    >
      <!-- Error Banner -->
      <div
        v-if="errorMessage"
        class="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400"
      >
        <Icon icon="mdi:alert-circle" class="mt-0.5 h-5 w-5 flex-shrink-0" />
        <span>{{ errorMessage }}</span>
      </div>

      <!-- Email -->
      <div>
        <label
          for="email"
          class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email Address
        </label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="you@example.com"
          class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-500"
          required
          autocomplete="email"
          @input="clearError"
        />
      </div>

      <!-- Password -->
      <div>
        <div class="mb-1.5 flex items-center justify-between">
          <label for="password" class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <NuxtLink
            to="/auth/forgot-password"
            class="text-xs font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Forgot password?
          </NuxtLink>
        </div>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="••••••••"
          class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-500"
          required
          autocomplete="current-password"
          @input="clearError"
        />
      </div>

      <!-- Remember Me -->
      <div class="flex items-center">
        <input
          id="remember"
          v-model="remember"
          type="checkbox"
          class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
        />
        <label for="remember" class="ml-2 text-sm text-gray-600 dark:text-gray-400">
          Remember me for 30 days
        </label>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="loading"
        class="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 dark:focus:ring-offset-gray-900"
      >
        <Icon v-if="loading" icon="mdi:loading" class="h-5 w-5 animate-spin" />
        {{ loading ? 'Logging in...' : 'Sign In' }}
      </button>
    </form>
  </div>
</template>
