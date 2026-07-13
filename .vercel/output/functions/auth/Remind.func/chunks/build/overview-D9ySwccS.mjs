import { defineComponent, withAsyncContext, computed, mergeProps, unref, ref, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { I as Icon } from './server.mjs';
import { u as useAsyncData } from './asyncData-Bf39Eptr.mjs';
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

function useCountAnimation(targetValue, duration = 1500, delay = 0, testMode = false) {
  const displayValue = ref(0);
  if (testMode) {
    displayValue.value = targetValue;
    return { displayValue };
  }
  watch(
    () => targetValue,
    () => {
      displayValue.value = 0;
    }
  );
  return { displayValue };
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "card",
  __ssrInlineRender: true,
  props: {
    statusText: {},
    statusColor: {},
    title: {},
    value: {},
    icon: {},
    iconColor: {},
    index: {}
  },
  setup(__props) {
    const props = __props;
    const numericValue = computed(() => {
      const num = Number(props.value.replace(/[^\d.-]/g, ""));
      return isNaN(num) ? 0 : num;
    });
    const prefix = computed(() => props.value.match(/^[^\d.-]*/)?.[0] ?? "");
    const suffix = computed(() => props.value.match(/[\d.-]+(.*)$/)?.[1] ?? "");
    const { displayValue } = useCountAnimation(numericValue.value, 1500, props.index * 200);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm" }, _attrs))}><div class="mb-4 flex items-start justify-between"><span class="${ssrRenderClass([
        "rounded-full px-3 py-1 text-xs font-medium",
        __props.statusColor === "green" ? "bg-green-500 text-white" : __props.statusColor === "red" ? "bg-red-500 text-white" : __props.statusColor === "yellow" ? "bg-yellow-500 text-white" : "bg-blue-500 text-white"
      ])}">${ssrInterpolate(__props.statusText)}</span><button class="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-gray-100 transition hover:bg-gray-200" aria-label="Settings">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:cog-outline",
        class: "text-xl text-gray-600"
      }, null, _parent));
      _push(`</button></div><h3 class="mb-2 text-lg font-semibold text-gray-900">${ssrInterpolate(__props.title)}</h3><div class="mb-4 text-2xl font-bold text-gray-900">${ssrInterpolate(prefix.value)}${ssrInterpolate(unref(displayValue))}${ssrInterpolate(suffix.value)}</div><div class="absolute right-5 bottom-5">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: __props.icon,
        class: [
          "text-3xl",
          __props.statusColor === "green" ? "text-green-500" : __props.statusColor === "red" ? "text-red-500" : __props.statusColor === "yellow" ? "text-yellow-500" : "text-blue-500"
        ]
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/overview/card.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const DashboardCard = Object.assign(_sfc_main$1, { __name: "OverviewCard" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "overview",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: cardsData, pending } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "overview",
      () => $fetch("/api/overview", { credentials: "include" }),
      { server: true, default: () => [] }
    )), __temp = await __temp, __restore(), __temp);
    const cards = computed(() => cardsData.value ?? []);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}><div class="mb-8 flex items-center justify-between"><div class="flex items-center gap-3"><div class="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:trending-up",
        class: "text-xl text-gray-700"
      }, null, _parent));
      _push(`</div><h1 class="text-3xl font-semibold text-gray-800">Overview</h1></div><button class="flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2 text-white shadow transition hover:bg-gray-800">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:credit-card-outline",
        class: "text-xl"
      }, null, _parent));
      _push(` Buy dashboard </button></div>`);
      if (unref(pending)) {
        _push(`<div class="py-12 text-center"><div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div><p class="mt-4 text-gray-500">Loading dashboard data...</p></div>`);
      } else {
        _push(`<div class="grid grid-cols-2 gap-6"><!--[-->`);
        ssrRenderList(cards.value, (card, index) => {
          _push(ssrRenderComponent(DashboardCard, {
            key: card.id,
            index,
            "status-text": card.statusText,
            "status-color": card.statusColor,
            title: card.title,
            value: card.value,
            icon: card.icon,
            "icon-color": card.iconColor
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sidebar/overview.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=overview-D9ySwccS.mjs.map
