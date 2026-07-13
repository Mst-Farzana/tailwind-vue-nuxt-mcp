import { _ as __nuxt_component_0 } from './nuxt-link-BvdDl6Me.mjs';
import { defineComponent, ref, computed, watch, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-CFSfgGMr.mjs';
import { u as useOrganization } from './useOrganization-Bp-mDaXd.mjs';
import { c as useRoute } from './server.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "pricing",
  __ssrInlineRender: true,
  setup(__props) {
    const { session } = useAuth();
    const { currentOrganization, subscription, fetchOrganizations } = useOrganization();
    const billingPeriod = ref("monthly");
    const loadingPlan = ref(null);
    const upgradeError = ref(null);
    const isAuthenticated = computed(() => !!session.value?.user);
    computed(
      () => currentOrganization.value?.id || session.value?.user?.currentOrganizationId
    );
    const currentPlan = computed(() => subscription.value?.plan || "free");
    useRoute();
    watch(session, async (newVal) => {
      if (newVal?.user) {
        await fetchOrganizations();
      }
    });
    const isCurrentPlan = (plan) => currentPlan.value === plan;
    const getButtonText = (plan) => {
      if (loadingPlan.value === plan) return "Processing...";
      if (isCurrentPlan(plan)) return "Current Plan";
      return "Subscribe";
    };
    const isButtonDisabled = (plan) => loadingPlan.value !== null || isCurrentPlan(plan);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 py-12" }, _attrs))}>`);
      if (upgradeError.value) {
        _push(`<div class="mx-auto mb-6 max-w-6xl px-4"><div class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">${ssrInterpolate(upgradeError.value)} <button class="float-right font-bold">×</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!isAuthenticated.value) {
        _push(`<div class="mx-auto mb-8 max-w-6xl px-4 text-center"><div class="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-yellow-800"> Please `);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/login",
          class: "font-bold underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`login`);
            } else {
              return [
                createTextVNode("login")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(` to upgrade your plan. </div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-10 text-center"><h1 class="mb-2 text-5xl font-black text-gray-900">Sample Pricing</h1><p class="text-xl text-gray-600">Choose the perfect plan for your needs</p>`);
      if (isAuthenticated.value && unref(currentOrganization)) {
        _push(`<div class="mt-4 text-sm text-gray-500"> Upgrading: <span class="font-semibold">${ssrInterpolate(unref(currentOrganization).name)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-12 flex justify-center gap-4"><button class="${ssrRenderClass([
        "rounded-full px-6 py-3 font-medium transition",
        billingPeriod.value === "monthly" ? "bg-gray-800 text-white" : "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
      ])}"${ssrIncludeBooleanAttr(loadingPlan.value !== null) ? " disabled" : ""}> Monthly </button><button class="${ssrRenderClass([
        "rounded-full px-6 py-3 font-medium transition",
        billingPeriod.value === "yearly" ? "bg-gray-800 text-white" : "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
      ])}"${ssrIncludeBooleanAttr(loadingPlan.value !== null) ? " disabled" : ""}> Yearly <span class="ml-1 text-xs text-green-500">Save 20%</span></button></div><div class="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-3"><div class="rounded-lg border bg-white p-6 shadow"><h2 class="text-3xl font-bold">${ssrInterpolate(billingPeriod.value === "monthly" ? "$19" : "$190")}</h2><p class="mt-2 text-gray-500">Beginner</p><ul class="my-6 space-y-2 text-sm"><li>5 units</li><li>100 minutes</li><li>1 user</li></ul><button${ssrIncludeBooleanAttr(isButtonDisabled("beginner")) ? " disabled" : ""} class="w-full rounded-md border border-blue-600 px-4 py-2 text-blue-600">${ssrInterpolate(getButtonText("beginner"))}</button></div><div class="rounded-lg border-2 border-blue-500 bg-white p-6 shadow-lg"><h2 class="text-3xl font-bold">${ssrInterpolate(billingPeriod.value === "monthly" ? "$29" : "$290")}</h2><p class="mt-2 text-gray-500">Standard</p><ul class="my-6 space-y-2 text-sm"><li>25 units</li><li>1000 minutes</li><li>10 users</li></ul><button${ssrIncludeBooleanAttr(isButtonDisabled("standard")) ? " disabled" : ""} class="w-full rounded-md bg-blue-600 px-4 py-2 text-white">${ssrInterpolate(getButtonText("standard"))}</button></div><div class="rounded-lg border bg-white p-6 shadow"><h2 class="text-3xl font-bold">${ssrInterpolate(billingPeriod.value === "monthly" ? "$39" : "$390")}</h2><p class="mt-2 text-gray-500">Pro</p><ul class="my-6 space-y-2 text-sm"><li>100 units</li><li>10000 minutes</li><li>Unlimited users</li></ul><button${ssrIncludeBooleanAttr(isButtonDisabled("pro")) ? " disabled" : ""} class="w-full rounded-md border border-blue-600 px-4 py-2 text-blue-600">${ssrInterpolate(getButtonText("pro"))}</button></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sidebar/pricing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=pricing-DRx0xaSA.mjs.map
