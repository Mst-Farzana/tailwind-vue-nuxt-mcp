import { mergeProps, defineComponent, ref, computed, unref, withAsyncContext, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc, I as Icon, d as __nuxt_component_0$1 } from './server.mjs';
import { u as useAsyncData } from './asyncData-Bf39Eptr.mjs';
import { u as useAuth } from './useAuth-CFSfgGMr.mjs';
import { u as useOrganization } from './useOrganization-Bp-mDaXd.mjs';
import _sfc_main$9 from './overview-D9ySwccS.mjs';
import '../_/nitro.mjs';
import 'drizzle-orm/node-postgres';
import 'pg';
import 'drizzle-orm';
import 'zod';
import 'drizzle-orm/pg-core';
import 'crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:url';
import 'ipx';
import 'node:fs';
import 'node:path';
import 'pinia';
import 'vue-router';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "ClientsTable",
  __ssrInlineRender: true,
  setup(__props) {
    const clients = ref([]);
    const pagination = ref(null);
    ref(false);
    const currentPage = ref(1);
    const showBanner = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 p-6" }, _attrs))}><div class="mb-6 flex items-center justify-between"><div class="flex items-center justify-center gap-2">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:account-multiple",
        class: "mr-2 h-4 w-4 text-gray-900"
      }, null, _parent));
      _push(`<h1 class="text-2xl font-bold">Clients</h1></div><button class="rounded-lg bg-gray-100 px-4 py-2 text-gray-900 hover:bg-gray-200">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:cog",
        class: "h-4 w-4"
      }, null, _parent));
      _push(`</button></div>`);
      if (showBanner.value) {
        _push(`<div id="responsive-banner" class="mb-6 flex items-center justify-between rounded-md bg-blue-500 p-4 text-white"><span>Responsive table. Collapses on mobile</span><button>`);
        _push(ssrRenderComponent(unref(Icon), {
          icon: "mdi:close",
          class: "h-4 w-4 rounded-full bg-white p-1 text-blue-700"
        }, null, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="overflow-hidden rounded-lg bg-white shadow"><div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th scope="col" class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"> Name </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"> Company </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"> City </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"> Progress </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"> Created </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"> Actions </th></tr></thead><tbody class="divide-y divide-gray-200 bg-white"><!--[-->`);
      ssrRenderList(clients.value, (client) => {
        _push(`<tr class="hover:bg-gray-50"><td class="px-6 py-4 whitespace-nowrap"><div class="flex items-center"><div class="flex h-10 w-10 shrink-0"><img${ssrRenderAttr("src", client.avatar || "https://picsum.photos/seed/default/40/40")} alt="Avatar" class="h-10 w-10 rounded-full"></div><div class="ml-4"><div class="text-sm font-medium text-gray-900">${ssrInterpolate(client.name)}</div></div></div></td><td class="px-6 py-4 whitespace-nowrap"><div class="text-sm text-gray-900">${ssrInterpolate(client.company)}</div></td><td class="px-6 py-4 whitespace-nowrap"><div class="text-sm text-gray-900">${ssrInterpolate(client.city)}</div></td><td class="px-6 py-4 whitespace-nowrap"><div class="h-2 w-24 rounded-full bg-gray-200"><div style="${ssrRenderStyle({ width: `${client.progress}%` })}" class="h-2 rounded-full bg-blue-600"></div></div></td><td class="px-6 py-4 whitespace-nowrap"><div class="text-sm text-gray-900">${ssrInterpolate(client.created)}</div></td><td class="px-6 py-4 text-right text-sm font-medium whitespace-nowrap"><button class="mr-4 text-blue-600 hover:text-blue-900"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C2.458 6.7 6.7 2.458 12 2.458s9.542 4.242 9.542 9.542c0 5.3-4.242 9.542-9.542 9.542"></path></svg></button><button class="text-red-600 hover:text-red-900"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div><div class="mt-6 flex items-center justify-between"><div class="text-sm text-gray-500"> Page ${ssrInterpolate(pagination.value?.currentPage)} of ${ssrInterpolate(pagination.value?.totalPages)}</div><div class="flex space-x-2"><!--[-->`);
      ssrRenderList(pagination.value?.totalPages, (page) => {
        _push(`<button class="${ssrRenderClass([{
          "bg-blue-600 text-white": page === currentPage.value,
          "bg-white text-gray-500 hover:bg-gray-100": page !== currentPage.value
        }, "rounded-md px-3 py-1"])}">${ssrInterpolate(page)}</button>`);
      });
      _push(`<!--]--></div></div><div class="mt-10 text-sm text-gray-500"> ©2026, JustBoil.me. <a href="#" class="text-blue-600 hover:underline">Buy Premium version</a></div></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/ClientsTable.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const clientsTable = Object.assign(_sfc_main$8, { __name: "DashboardClientsTable" });
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "FinanceStatus",
  __ssrInlineRender: true,
  setup(__props) {
    const stats = ref([]);
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen p-6" }, _attrs))}><div class="mb-6 grid grid-cols-1 gap-4"><!--[-->`);
      ssrRenderList(stats.value, (stat) => {
        _push(`<div class="flex items-center justify-between rounded-lg bg-white p-4 shadow"><div><div class="text-sm text-gray-500">${ssrInterpolate(stat.label)}</div><div class="text-xl font-bold">${ssrInterpolate(stat.value)}</div></div><div class="${ssrRenderClass(`${stat.color} flex h-10 w-10 items-center justify-center rounded-full text-white`)}">${ssrInterpolate(stat.icon)}</div></div>`);
      });
      _push(`<!--]--></div><div class="flex space-x-4"><button class="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-600 hover:outline-2 hover:outline-blue-300">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "heroicons:plus",
        class: "h-3 w-3 rounded-full bg-white text-blue-800"
      }, null, _parent));
      _push(` Payout </button><button class="rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50 hover:outline-2 hover:outline-blue-300">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:broadcast",
        class: "text-xl text-blue-500"
      }, null, _parent));
      _push(`</button></div></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/FinanceStatus.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const FinancialStatus = Object.assign(_sfc_main$7, { __name: "DashboardFinanceStatus" });
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "TableCard",
  __ssrInlineRender: true,
  setup(__props) {
    const transactions = ref([]);
    const loading = ref(false);
    const error = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      if (loading.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-8 text-center" }, _attrs))}>Loading...</div>`);
      } else if (error.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-8 text-center text-red-400" }, _attrs))}>${ssrInterpolate(error.value)}</div>`);
      } else if (transactions.value.length === 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-8 text-center text-gray-500" }, _attrs))}>No data</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><!--[-->`);
        ssrRenderList(transactions.value, (trans) => {
          _push(`<div class="flex items-center justify-between rounded-lg bg-gray-50 p-4"><div class="flex items-center space-x-4">`);
          _push(ssrRenderComponent(unref(Icon), {
            icon: trans.icon,
            class: ["text-2xl", {
              "text-green-400": trans.action === "Deposit",
              "text-blue-400": trans.action === "Payment",
              "text-yellow-400": trans.action === "Invoice",
              "text-red-400": trans.action === "Withdrawal"
            }]
          }, null, _parent));
          _push(`<div><div class="text-lg font-bold">${ssrInterpolate(trans.amount)}</div><div class="text-sm text-gray-400">${ssrInterpolate(trans.date)} via ${ssrInterpolate(trans.via)}</div></div></div><div class="space-x-4"><div class="mb-2 text-sm text-gray-400">${ssrInterpolate(trans.account)}</div><span class="${ssrRenderClass([{
            "bg-green-900 text-green-300": trans.action === "Deposit",
            "bg-blue-900 text-blue-300": trans.action === "Payment",
            "bg-yellow-900 text-yellow-300": trans.action === "Invoice",
            "bg-red-900 text-red-300": trans.action === "Withdrawal"
          }, "float-end mr-3 rounded-full px-3 py-1 text-xs"])}">${ssrInterpolate(trans.action)}</span></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/TableCard.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const TableCard = Object.assign(_sfc_main$6, { __name: "DashboardTableCard" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "FinanceTable",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen p-6" }, _attrs))}><div class="mb-6 flex items-center justify-between"><div class="flex items-center">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:trending-up",
        class: "mr-2 h-6 w-6 rounded-full bg-gray-50 p-1"
      }, null, _parent));
      _push(`<h1 class="text-2xl font-bold">Finance</h1></div><button class="rounded-lg bg-gray-100 px-4 py-2 text-gray-900 hover:bg-gray-200">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:cog",
        class: "h-4 w-4"
      }, null, _parent));
      _push(`</button></div>`);
      _push(ssrRenderComponent(TableCard, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/FinanceTable.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const FinanceTable = Object.assign(_sfc_main$5, { __name: "DashboardFinanceTable" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "actionDrop",
  __ssrInlineRender: true,
  props: {
    options: {},
    onAction: { type: Function }
  },
  setup(__props) {
    const isOpen = ref(false);
    const dropdownRef = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "dropdownRef",
        ref: dropdownRef,
        class: "relative"
      }, _attrs))}><button class="rounded-md p-2 hover:bg-gray-100">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:dots-vertical",
        class: "h-5 w-5 text-gray-600"
      }, null, _parent));
      _push(`</button>`);
      if (isOpen.value) {
        _push(`<div class="absolute right-0 z-20 mt-2 w-44 rounded-lg border bg-white shadow"><!--[-->`);
        ssrRenderList(__props.options, (opt, i) => {
          _push(`<button class="${ssrRenderClass([opt.isLast ? "text-red-600 hover:bg-red-50" : "", "flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"])}">`);
          _push(ssrRenderComponent(unref(Icon), {
            icon: opt.icon,
            class: "h-4 w-4"
          }, null, _parent));
          _push(` ${ssrInterpolate(opt.label)}</button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/actionDrop.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const ActionDrop = Object.assign(_sfc_main$4, { __name: "DashboardActionDrop" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ProductList",
  __ssrInlineRender: true,
  setup(__props) {
    const products = ref([]);
    ref(false);
    const handleProductAction = (productId, index) => {
      if (index === 0) console.log("View", productId);
      if (index === 1) console.log("Edit", productId);
      if (index === 2) console.log("Delete", productId);
    };
    const getTagColor = (tag) => {
      const greenTags = ["Awesome", "Unbranded", "Sleek", "Rustic"];
      const blueTags = ["Rubber", "Concrete", "Plastic", "Fresh"];
      const yellowTags = ["Shoes", "Bike", "Pants", "Hat", "Sausages"];
      if (greenTags.includes(tag)) return "bg-green-500 text-white";
      if (blueTags.includes(tag)) return "bg-blue-500 text-white";
      if (yellowTags.includes(tag)) return "bg-yellow-500 text-white";
      return "bg-gray-200 text-gray-800";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 p-6" }, _attrs))}><div class="mb-8 flex items-center justify-between"><div class="flex items-center justify-center gap-2"><svg viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="12" x2="12" y2="20" stroke="white" stroke-width="2"></line><line x1="12" y1="12" x2="20" y2="12" stroke="white" stroke-width="2"></line></svg><h1 class="text-2xl font-bold">Products</h1></div><button class="rounded-lg bg-gray-100 px-4 py-2 text-gray-900 hover:bg-gray-200">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:cog",
        class: "h-4 w-4"
      }, null, _parent));
      _push(`</button></div><div class="space-y-4"><!--[-->`);
      ssrRenderList(products.value, (product) => {
        _push(`<div class="flex items-center justify-between rounded-lg bg-white p-4 shadow"><div class="flex items-center gap-4"><img${ssrRenderAttr("src", product.avatar)} class="h-10 w-10 rounded-full"><div><div class="font-medium">${ssrInterpolate(product.name)}</div><div class="text-sm text-gray-500">${ssrInterpolate(product.date)}</div></div></div><div class="flex items-center gap-3"><!--[-->`);
        ssrRenderList(product.tags, (tag) => {
          _push(`<span class="${ssrRenderClass([getTagColor(tag), "rounded-full px-2 py-1 text-xs font-medium"])}">${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--><div class="font-bold">${ssrInterpolate(product.price)}</div>`);
        _push(ssrRenderComponent(ActionDrop, {
          options: [
            { label: "View", icon: "mdi:eye" },
            { label: "Edit", icon: "mdi:pencil" },
            { label: "Delete", icon: "mdi:delete", isLast: true }
          ],
          "on-action": (index) => handleProductAction(product.id, index)
        }, null, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/ProductList.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const ProductList = Object.assign(_sfc_main$3, { __name: "DashboardProductList" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TrendsList",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const isDark = ref(false);
    ref(null);
    const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "dashboard-trends",
      () => $fetch("/api/dashboard/trends"),
      { server: false }
    )), __temp = await __temp, __restore(), __temp);
    const trends = computed(() => data.value?.data ?? null);
    computed(
      () => trends.value ? trends.value.graph.datasets.map((ds) => ({
        name: ds.label,
        data: ds.data,
        color: ds.borderColor
      })) : []
    );
    const chartColors = computed(
      () => trends.value ? trends.value.graph.datasets.map((ds) => ds.borderColor) : []
    );
    computed(() => ({
      chart: {
        type: "line",
        toolbar: { show: false },
        background: isDark.value ? "#1f2937" : "#ffffff"
      },
      colors: chartColors.value,
      xaxis: {
        categories: trends.value?.graph.labels ?? []
      },
      stroke: {
        curve: "smooth",
        width: 2
      },
      grid: {
        borderColor: isDark.value ? "#374151" : "#e5e7eb"
      },
      legend: {
        labels: {
          colors: isDark.value ? "#f3f4f6" : "#111827"
        }
      },
      tooltip: {
        theme: isDark.value ? "dark" : "light"
      }
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, {}, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/TrendsList.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const TrendsList = Object.assign(_sfc_main$2, { __name: "DashboardTrendsList" });
const DEFAULT_AVATAR = "https://picsum.photos/seed/default/200/200";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    useOrganization();
    ref(false);
    const profileLoading = ref(false);
    ref(false);
    const profile2 = ref(null);
    const form = ref({
      avatar: "",
      name: "",
      email: "",
      notificationsEnabled: false
    });
    const getAvatarUrl = (avatar) => avatar?.trim() || DEFAULT_AVATAR;
    const formattedLastLogin = computed(() => {
      if (!profile2.value?.lastLoginAt) return "Never";
      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short"
      }).format(new Date(profile2.value.lastLoginAt));
    });
    ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen space-y-10 p-6" }, _attrs))} data-v-bc72c491>`);
      if (profileLoading.value) {
        _push(`<div class="py-8 text-center text-gray-500" data-v-bc72c491>Loading profile...</div>`);
      } else if (profile2.value) {
        _push(`<div class="mx-auto flex h-auto w-full max-w-6xl flex-col items-center justify-center gap-6 rounded-lg bg-gray-100 px-6 sm:h-70 sm:flex-row sm:gap-20 sm:px-20" data-v-bc72c491><img${ssrRenderAttr("src", getAvatarUrl(form.value.avatar || profile2.value.avatar))} alt="Profile avatar" class="h-48 w-48 rounded-full bg-gray-300 object-cover" data-v-bc72c491><div class="flex-1 text-center font-medium sm:text-left" data-v-bc72c491><div class="mb-3 flex items-center justify-center gap-2 sm:justify-start" data-v-bc72c491><span class="text-sm text-gray-500" data-v-bc72c491>Notifications</span><label class="relative inline-flex cursor-pointer items-center" data-v-bc72c491><input${ssrIncludeBooleanAttr(Array.isArray(form.value.notificationsEnabled) ? ssrLooseContain(form.value.notificationsEnabled, null) : form.value.notificationsEnabled) ? " checked" : ""} type="checkbox" class="peer sr-only" aria-label="Toggle notifications" data-v-bc72c491><div class="h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[&#39;&#39;] peer-checked:after:translate-x-full" data-v-bc72c491></div></label></div><h2 class="text-xl font-bold" data-v-bc72c491>Howdy, ${ssrInterpolate(profile2.value.name)}!</h2><div class="mt-2 text-sm text-gray-600" data-v-bc72c491><span data-v-bc72c491>Last login:</span><span class="ml-1" data-v-bc72c491>${ssrInterpolate(formattedLastLogin.value)}</span><span class="ml-2" data-v-bc72c491>from</span><span class="ml-1 font-medium" data-v-bc72c491>${ssrInterpolate(profile2.value.lastLoginIp || "127.0.0.1")}</span></div><div class="mt-4" data-v-bc72c491>`);
        if (profile2.value.isVerified) {
          _push(`<span class="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white" data-v-bc72c491>`);
          _push(ssrRenderComponent(unref(Icon), {
            icon: "mdi:check",
            class: "mr-2 h-4 w-4"
          }, null, _parent));
          _push(` Verified </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<div class="py-8 text-center text-red-500" data-v-bc72c491>Failed to load profile</div>`);
      }
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/profile.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const profile = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-bc72c491"]]), { __name: "DashboardProfile" });
const _sfc_main = {
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full p-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$9, null, null, _parent));
      _push(ssrRenderComponent(profile, { class: "m-20" }, null, _parent));
      _push(ssrRenderComponent(FinanceTable, null, null, _parent));
      _push(ssrRenderComponent(FinancialStatus, null, null, _parent));
      _push(ssrRenderComponent(TrendsList, null, null, _parent));
      _push(ssrRenderComponent(ProductList, null, null, _parent));
      _push(ssrRenderComponent(clientsTable, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sidebar/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard-DjO106t-.mjs.map
