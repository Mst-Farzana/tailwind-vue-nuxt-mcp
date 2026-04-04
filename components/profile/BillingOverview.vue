<script setup lang="ts">
import { computed } from 'vue';

/* ---------------- Interfaces ---------------- */
interface Invoice {
  id: number;
  date: string;
  amount: string;
  status: string;
  invoiceUrl: string;
}

interface Billing {
  nextPaymentDate: string;
  lastBilledDate: string;
  amountDue: string;
  status: string;
}

/* ---------------- Fetch billing ---------------- */
const { data: billingRes } = await useAsyncData<{ success: boolean; data: Billing | null }>(
  'billing',
  () => $fetch('/api/profile/billing'),
);

const { data: invoicesRes } = await useAsyncData<{ success: boolean; data: Invoice[] }>(
  'invoices',
  () => $fetch('/api/profile/invoice'),
);

/* ---------------- Computed ---------------- */
const billing = computed(() => billingRes.value?.data ?? null);
const invoices = computed(() => invoicesRes.value?.data ?? []);

const formattedAmount = computed(() => {
  if (!billing.value) return '$0.00';
  return billing.value.amountDue;
});

/* ---------------- Methods ---------------- */
function handleViewInvoice(invoice: Invoice) {
  console.log('Viewing invoice:', invoice);
  window.open(invoice.invoiceUrl, '_blank');
}

function handleDownloadPDF(invoice: Invoice) {
  console.log('Downloading PDF:', invoice);
  if (invoice.invoiceUrl) {
    const link = document.createElement('a');
    link.href = invoice.invoiceUrl;
    link.download = `invoice_${invoice.id}.pdf`;
    link.click();
  }
}
</script>

<template>
  <section class="m-10 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-semibold">Billing overview</h1>
      <button class="rounded-md p-2 hover:bg-gray-100">⚙️</button>
    </div>

    <!-- Alert -->
    <div class="flex items-center justify-between rounded-xl bg-blue-500 px-6 py-2 text-white">
      <div class="flex items-center gap-3">
        <span class="text-xl">ℹ️</span>
        <p class="font-medium">Payment date is approaching soon.</p>
      </div>
      <button class="rounded-full bg-white px-4 py-2 text-sm font-medium text-blue-600">
        See details
      </button>
    </div>

    <!-- Billing summary -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div>
        <p class="text-sm text-gray-500">Next payment on</p>
        <p class="mt-1 text-lg font-semibold">
          {{ billing?.nextPaymentDate || '-' }}
        </p>
      </div>

      <div>
        <p class="text-sm text-gray-500">Last billed on</p>
        <p class="mt-1 text-lg font-semibold">
          {{ billing?.lastBilledDate || '-' }}
        </p>
      </div>

      <div class="text-right">
        <p class="text-sm text-gray-500">Amount due</p>
        <p class="mt-1 text-3xl font-bold text-green-600">
          {{ formattedAmount }}
        </p>
      </div>
    </div>

    <!-- Invoices -->
    <div class="rounded-xl bg-white">
      <div class="px-6 py-4">
        <h2 class="font-semibold">Invoices</h2>
      </div>

      <div class="mb-2">
        <div
          v-for="invoice in invoices"
          :key="invoice.id"
          class="flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50"
        >
          <!-- Left: View invoice & PDF buttons -->
          <div class="flex gap-5">
            <button
              class="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700 transition hover:bg-gray-200"
              @click.prevent="handleViewInvoice(invoice)"
            >
              View invoice
            </button>
            <button
              class="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700 transition hover:bg-gray-200"
              @click.prevent="handleDownloadPDF(invoice)"
            >
              PDF
            </button>
          </div>

          <!-- Right: Date, Status, Amount -->
          <div class="flex items-center gap-5">
            <span class="text-gray-500">{{ invoice.date }}</span>

            <!-- Status Badge -->
            <span
              class="rounded-full px-3 py-1 text-sm font-medium"
              :class="{
                'bg-blue-500 text-white': invoice.status === 'Paid',
                'bg-yellow-500 text-white': invoice.status !== 'Paid',
              }"
            >
              {{ invoice.status }}
            </span>

            <!-- Amount -->
            <span class="text-xl font-bold">{{ invoice.amount }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
