<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue';

/* ================= Interfaces ================= */
interface PaymentMethod {
  id: number;
  cardType: string;
  lastFour: string;
  expiryDate: string;
  cardholderName: string;
  isPrimary: boolean;
}

/* ================= State ================= */
const paymentMethods = ref<PaymentMethod[]>([]);
const loading = ref(true);
const showAddCardModal = ref(false);

const newCard = ref({
  cardType: '',
  lastFour: '',
  expiryDate: '',
  cardholderName: '',
  isPrimary: false,
});

/* ================= API Calls ================= */
async function fetchPaymentMethods() {
  try {
    const res = await $fetch<{ success: boolean; data: PaymentMethod[] }>(
      '/api/profile/payments-method',
    );
    if (res.success) {
      paymentMethods.value = res.data;
    }
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

async function addCard() {
  const res = await $fetch<{ success: boolean }>('/api/profile/payments-method', {
    method: 'POST',
    body: newCard.value,
  });

  if (res.success) {
    showAddCardModal.value = false;
    newCard.value = {
      cardType: '',
      lastFour: '',
      expiryDate: '',
      cardholderName: '',
      isPrimary: false,
    };
    await fetchPaymentMethods();
  }
}

async function deleteCard(id: number) {
  if (!confirm('Delete this card?')) return;

  const res = await $fetch<{ success: boolean }>(`/api/profile/payments-methods/${id}`, {
    method: 'DELETE',
  });

  if (res.success) await fetchPaymentMethods();
}

async function setAsPrimary(id: number) {
  const res = await $fetch<{ success: boolean }>(`/api/profile/payments-methods/${id}`, {
    method: 'PUT',
    body: { isPrimary: true },
  });

  if (res.success) await fetchPaymentMethods();
}

function editCard(method: PaymentMethod) {
  console.log('Edit card:', method);
}

onMounted(fetchPaymentMethods);
</script>

<template>
  <div class="m-10 min-h-screen bg-gray-50 p-6 dark:bg-gray-900 dark:text-gray-100">
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <Icon icon="mdi:credit-card-outline" width="26" />
        <h1 class="text-2xl font-bold">Payment methods</h1>
      </div>

      <button
        class="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        @click="showAddCardModal = true"
      >
        <Icon icon="mdi:plus-circle" width="20" />
        Add card
      </button>
    </div>

    <!-- States -->
    <div v-if="loading" class="py-10 text-center text-gray-500">Loading...</div>

    <div v-else-if="paymentMethods.length === 0" class="py-10 text-center text-gray-500">
      No payment methods found
    </div>

    <!-- Cards -->
    <div v-else class="space-y-4">
      <div
        v-for="method in paymentMethods"
        :key="method.id"
        class="flex items-center justify-between rounded-xl bg-white p-5 shadow"
      >
        <div class="flex items-center gap-4">
          <div class="flex h-10 w-14 items-center justify-center rounded-lg bg-gray-100">
            <img
              v-if="method.cardType === 'Visa'"
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
              class="h-6"
            />
            <img
              v-else-if="method.cardType === 'MasterCard'"
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              class="h-6"
            />
            <span v-else>{{ method.cardType }}</span>
          </div>

          <div>
            <div class="text-lg font-semibold">
              {{ method.cardType }} •••• {{ method.lastFour }}
            </div>
            <div class="text-sm text-gray-500">
              {{ method.expiryDate }} · {{ method.cardholderName }}
            </div>
          </div>

          <span
            v-if="method.isPrimary"
            class="ml-4 flex items-center gap-1 rounded-full bg-blue-500 px-3 py-1 text-sm text-white"
          >
            <Icon icon="mdi:credit-card-check" width="14" />
            Primary
          </span>
        </div>

        <div class="flex items-center gap-2">
          <button
            v-if="!method.isPrimary"
            class="rounded-full bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
            @click="setAsPrimary(method.id)"
          >
            Set primary
          </button>

          <button class="rounded-lg bg-gray-100 p-2 hover:bg-gray-200" @click="editCard(method)">
            <Icon icon="mdi:pencil-outline" />
          </button>

          <button
            class="rounded-lg bg-gray-100 p-2 text-red-600 hover:bg-red-100"
            @click="deleteCard(method.id)"
          >
            <Icon icon="mdi:delete-outline" />
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="showAddCardModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <form class="w-full max-w-md space-y-4 rounded-xl bg-white p-6" @submit.prevent="addCard">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">Add card</h2>
          <button type="button" @click="showAddCardModal = false">
            <Icon icon="mdi:close" width="22" />
          </button>
        </div>

        <select
          v-model="newCard.cardType"
          required
          class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select card type</option>
          <option>Visa</option>
          <option>MasterCard</option>
        </select>

        <input
          v-model="newCard.lastFour"
          placeholder="Last 4 digits"
          required
          class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />

        <input
          v-model="newCard.expiryDate"
          placeholder="MM/YY"
          required
          class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />

        <input
          v-model="newCard.cardholderName"
          placeholder="Cardholder name"
          required
          class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />

        <label class="flex items-center gap-2 text-sm">
          <input v-model="newCard.isPrimary" type="checkbox" />
          Set as primary
        </label>

        <div class="flex justify-end gap-2">
          <button
            type="button"
            class="rounded-md border px-4 py-2"
            @click="showAddCardModal = false"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Add card
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
