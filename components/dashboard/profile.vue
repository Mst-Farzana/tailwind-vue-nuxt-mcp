<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed, onMounted, ref } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { useOrganization } from '~/composables/useOrganization';
import ProfileUsers from '../profile/profileUsers.vue';

/* =========================
   AUTH & ORGANIZATION
========================= */
const { session, fetchSession } = useAuth();
const { currentOrganization } = useOrganization();

/* =========================
   LOADING STATES
========================= */
const ready = ref(false);
const avatarLoading = ref(false);
const usersLoading = ref(false);

/* =========================
   PROFILE SETTINGS (Avatar + Extra Data)
========================= */
interface ProfileSettings {
  avatar: string;
  notificationsEnabled: boolean;
  lastLoginAt: string | null;
  lastLoginIp: string | null;
}

const settings = ref<ProfileSettings>({
  avatar: '',
  notificationsEnabled: false,
  lastLoginAt: null,
  lastLoginIp: null,
});

/* =========================
   COMPUTED: Session Data (নাম, ইমেইল, ভেরিফিকেশন)
========================= */
const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?background=3B82F6&color=fff&size=200&name=User';

// ✅ নাম session থেকে
const userName = computed(() => {
  const user = session.value?.user as any;
  return user?.name || user?.firstName || 'User';
});

// ✅ ইমেইল session থেকে
const userEmail = computed(() => session.value?.user?.email || '');

// ✅ ভেরিফিকেশন session থেকে
const isVerified = computed(() => {
  const user = session.value?.user as any;
  return user?.isVerified || user?.emailVerified || false;
});

// ✅ ছবি session অথবা profile settings থেকে
const userAvatar = computed(() => {
  const user = session.value?.user as any;
  // প্রথমে session থেকে চেষ্টা করবে, না থাকলে settings API থেকে, না থাকলে ডিফল্ট
  return user?.image || user?.avatar || settings.value.avatar || DEFAULT_AVATAR;
});

const formattedLastLogin = computed(() => {
  if (!settings.value.lastLoginAt) return 'Never';
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(settings.value.lastLoginAt));
});

/* =========================
   LOAD AVATAR & SETTINGS ONLY
========================= */
const loadProfileSettings = async () => {
  if (!session.value?.user) return;

  avatarLoading.value = true;

  try {
    const res = await $fetch<{ success: boolean; data: ProfileSettings }>(
      '/api/profile/profile-settings',
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'x-organization-id': currentOrganization.value?.id || '',
        },
      },
    );

    if (res.success && res.data) {
      settings.value = {
        avatar: res.data.avatar || '',
        notificationsEnabled: res.data.notificationsEnabled,
        lastLoginAt: res.data.lastLoginAt,
        lastLoginIp: res.data.lastLoginIp,
      };
    }
  } catch (err: any) {
    console.warn('⚠️ Profile settings fetch failed:', err.status, err.data?.message);
    // এরর হলেও session থেকে নাম/ইমেইল দেখাবে, শুধু ছবি ডিফল্ট থাকবে
  } finally {
    avatarLoading.value = false;
  }
};

/* =========================
   USERS SECTION
========================= */
interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  amount: number;
  percentage: number;
  createdAt: string;
}

const users = ref<User[]>([]);

const loadUsers = async () => {
  if (!session.value?.user) return;
  usersLoading.value = true;

  try {
    const res = await $fetch<{ success: boolean; data: User[] }>('/api/profile/usersProfile', {
      credentials: 'include',
      headers: { 'x-organization-id': currentOrganization.value?.id || '' },
    });

    if (res.success && res.data) {
      users.value = res.data;
    }
  } catch (err: any) {
    console.error(' Users API error:', err);
  } finally {
    usersLoading.value = false;
  }
};

/* =========================
   ON MOUNT
========================= */
onMounted(async () => {
  await fetchSession(); // ✅ নাম, ইমেইল, ভেরিফিকেশন এখানেই লোড হবে
  ready.value = true;

  if (session.value?.user) {
    // শুধু ছবি এবং সেটিংস লোড করবে
    await Promise.all([loadProfileSettings(), loadUsers()]);
  }
});
</script>

<template>
  <div
    class="min-h-screen bg-gray-50 p-4 transition-colors duration-300 sm:p-6 lg:p-8 dark:bg-gray-950 dark:text-gray-100"
  >
    <!-- ✅ ১. যদি লগইন না থাকে -->
    <div
      v-if="!ready || !session?.user"
      class="flex min-h-[60vh] flex-col items-center justify-center gap-4"
    >
      <div
        class="rounded-2xl border border-yellow-200 bg-yellow-50 p-8 text-center dark:border-yellow-900/50 dark:bg-yellow-900/20"
      >
        <Icon
          icon="mdi:lock-outline"
          class="mx-auto mb-4 h-16 w-16 text-yellow-600 dark:text-yellow-400"
        />
        <h2 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          Authentication Required
        </h2>
        <p class="mb-6 text-gray-600 dark:text-gray-400">Please log in to view your profile.</p>
        <NuxtLink
          to="/auth/login"
          class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <Icon icon="mdi:login" class="h-5 w-5" />
          Login Now
        </NuxtLink>
      </div>
    </div>

    <!-- ✅ ২. যদি লগইন থাকে -->
    <div v-else class="mx-auto max-w-5xl space-y-8">
      <!-- Profile Card -->
      <div
        class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors sm:p-8 dark:border-gray-800 dark:bg-gray-900"
      >
        <div class="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <!-- Avatar (Session অথবা Profile Settings থেকে) -->
          <div class="relative">
            <img
              :src="userAvatar"
              alt="Profile avatar"
              class="h-24 w-24 rounded-full border-4 border-gray-100 object-cover shadow-md sm:h-32 sm:w-32 dark:border-gray-800"
            />
            <div
              v-if="isVerified"
              class="absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-600 dark:border-gray-900"
            >
              <Icon icon="mdi:check" class="h-5 w-5 text-white" />
            </div>
            <!-- Avatar Loading Indicator -->
            <div
              v-if="avatarLoading"
              class="absolute inset-0 flex items-center justify-center rounded-full bg-black/30"
            >
              <Icon icon="mdi:loading" class="h-6 w-6 animate-spin text-white" />
            </div>
          </div>

          <!-- Info -->
          <div class="flex-1 text-center sm:text-left">
            <div class="mb-1 flex flex-col items-center gap-1 sm:flex-row sm:gap-3">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                Howdy, {{ userName }}!
              </h2>
              <span
                v-if="isVerified"
                class="hidden items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700 sm:inline-flex dark:bg-blue-900/30 dark:text-blue-400"
              >
                <Icon icon="mdi:shield-check" class="h-3 w-3" />
                Verified
              </span>
            </div>

            <p class="mb-4 text-gray-500 dark:text-gray-400">{{ userEmail }}</p>

            <!-- Last Login (Settings API থেকে) -->
            <div
              class="mb-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600 sm:justify-start dark:bg-gray-800 dark:text-gray-300"
            >
              <Icon icon="mdi:clock-outline" class="h-4 w-4 text-gray-400" />
              <span>Last login:</span>
              <span class="font-medium text-gray-900 dark:text-white">
                {{ formattedLastLogin }}
              </span>
              <span>from</span>
              <span class="font-mono text-xs font-medium text-gray-900 dark:text-white">
                {{ settings.lastLoginIp || '127.0.0.1' }}
              </span>
            </div>

            <!-- Notifications Toggle -->
            <div class="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
              <label class="relative inline-flex cursor-pointer items-center">
                <input
                  v-model="settings.notificationsEnabled"
                  type="checkbox"
                  class="peer sr-only"
                  aria-label="Toggle notifications"
                />
                <div
                  class="h-6 w-11 rounded-full bg-gray-200 transition-colors peer-checked:bg-blue-600 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full dark:bg-gray-700"
                />
              </label>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Notifications
                <span
                  :class="
                    settings.notificationsEnabled
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-400'
                  "
                >
                  ({{ settings.notificationsEnabled ? 'On' : 'Off' }})
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= USERS SECTION ================= -->
      <div class="pt-4">
        <div class="mb-4 flex items-center gap-2">
          <Icon icon="mdi:account-group" class="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Associated Users</h3>
        </div>

        <ClientOnly>
          <div
            v-if="usersLoading"
            class="flex h-40 items-center justify-center rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
          >
            <Icon icon="mdi:loading" class="h-6 w-6 animate-spin text-blue-600" />
          </div>

          <div v-else-if="users && users.length > 0" class="space-y-3">
            <ProfileUsers v-for="user in users" :key="user.id" :user="user" />
          </div>

          <div
            v-else
            class="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400"
          >
            <Icon icon="mdi:account-off" class="mx-auto mb-2 h-8 w-8 text-gray-400" />
            <p>No associated users found.</p>
          </div>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
