import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, withAsyncContext, computed, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './nuxt-link-BvdDl6Me.mjs';
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

function useProfileAnimation(targetValue, duration = 1500) {
  const displayValue = ref(0);
  const isAnimating = ref(false);
  return {
    displayValue,
    isAnimating
  };
}
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "userCard",
  __ssrInlineRender: true,
  props: {
    profile: {}
  },
  setup(__props) {
    const props = __props;
    const likesCount = useProfileAnimation(props.profile.likes);
    const postsCount = useProfileAnimation(props.profile.posts);
    const mediaCount = useProfileAnimation(props.profile.media);
    const linksCount = useProfileAnimation(props.profile.links);
    const filesCount = useProfileAnimation(props.profile.files);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center space-x-12 rounded-lg bg-white p-4" }, _attrs))}><div class="relative">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/profile/upload",
        class: "block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", __props.profile?.avatar || "https://picsum.photos/seed/default/100/100")} alt="Avatar" class="h-20 w-20 cursor-pointer rounded-full transition hover:opacity-90"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: __props.profile?.avatar || "https://picsum.photos/seed/default/100/100",
                alt: "Avatar",
                class: "h-20 w-20 cursor-pointer rounded-full transition hover:opacity-90"
              }, null, 8, ["src"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="absolute right-0 bottom-0 rounded-full bg-blue-500 p-2 text-white transition hover:bg-blue-600">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:camera",
        class: "h-5 w-5"
      }, null, _parent));
      _push(`</button></div><div><div class="mb-1 flex items-center space-x-2"><h2 class="text-xl font-bold">${ssrInterpolate(__props.profile?.name)}</h2>`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:check-circle",
        class: "h-5 w-5 text-blue-500"
      }, null, _parent));
      _push(`</div><div class="flex items-center space-x-4 text-sm text-gray-500"><div class="flex items-center space-x-1">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:account-tie",
        class: "h-4 w-4 rounded-full bg-gray-400 p-1 text-white"
      }, null, _parent));
      _push(`<span>${ssrInterpolate(__props.profile?.role)}</span></div><div class="flex items-center space-x-1">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:domain",
        class: "h-5 w-5"
      }, null, _parent));
      _push(`<span>${ssrInterpolate(__props.profile?.company)}</span></div><div class="flex items-center space-x-1">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:map-marker",
        class: "h-5 w-5"
      }, null, _parent));
      _push(`<span>${ssrInterpolate(__props.profile?.city)}</span></div></div><div class="mt-5 grid grid-cols-5 gap-4"><div><div class="text-xl font-bold">${ssrInterpolate(unref(likesCount).displayValue)}</div><div class="text-xs text-gray-500">LIKES</div></div><div><div class="text-xl font-bold">${ssrInterpolate(unref(postsCount).displayValue)}</div><div class="text-xs text-gray-500">POSTS</div></div><div><div class="text-xl font-bold">${ssrInterpolate(unref(mediaCount).displayValue)}</div><div class="text-xs text-gray-500">MEDIA</div></div><div><div class="text-xl font-bold">${ssrInterpolate(unref(linksCount).displayValue)}</div><div class="text-xs text-gray-500">LINKS</div></div><div><div class="text-xl font-bold">${ssrInterpolate(unref(filesCount).displayValue)}</div><div class="text-xs text-gray-500">FILES</div></div></div></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/profile/edit",
        class: "ml-auto rounded-full bg-gray-100 p-2 transition hover:bg-gray-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Icon), {
              icon: "mdi:pencil",
              class: "h-5 w-5"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Icon), {
                icon: "mdi:pencil",
                class: "h-5 w-5"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/userCard.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const UserCard = Object.assign(_sfc_main$7, { __name: "ProfileUserCard" });
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "GitHubBanner",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative mt-10 overflow-hidden rounded-2xl p-8 text-center" }, _attrs))}><div class="absolute inset-0 bg-linear-to-br from-purple-500 via-blue-500 to-cyan-500"></div><div class="relative z-10"><h2 class="mb-6 text-2xl font-bold text-white md:text-3xl"> Like the project? Please star on <span class="font-extrabold">GitHub</span> ;-) </h2><a href="https://github.com/Mst-Farzana" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-gray-900 shadow-lg transition-all duration-300 hover:bg-gray-100 hover:shadow-xl">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:github",
        class: "h-5 w-5"
      }, null, _parent));
      _push(` GitHub </a></div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/GitHubBanner.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const GitHubBanner = Object.assign(_sfc_main$6, { __name: "ProfileGitHubBanner" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ProfileCard",
  __ssrInlineRender: true,
  setup(__props) {
    const profile = ref(null);
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 p-6" }, _attrs))}><div class="mb-6 flex items-center justify-between"><div class="flex items-center space-x-5">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:account-tie",
        class: "h-4 w-4"
      }, null, _parent));
      _push(`<h1 class="text-2xl font-bold">Profile</h1></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/profile/add",
        class: "rounded-lg bg-gray-800 px-4 py-2 text-white transition hover:bg-gray-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Icon), {
              icon: "mdi:plus",
              class: "h-5 w-5"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Icon), {
                icon: "mdi:plus",
                class: "h-5 w-5"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (profile.value) {
        _push(ssrRenderComponent(UserCard, { profile: profile.value }, null, _parent));
      } else {
        _push(`<div class="py-12 text-center"><div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div><p class="mt-4 text-gray-500">Loading profile...</p></div>`);
      }
      _push(ssrRenderComponent(GitHubBanner, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfileCard.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const ProfileCard = Object.assign(_sfc_main$5, { __name: "ProfileCard" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "BillingOverview",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: billingRes } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "billing",
      () => $fetch("/api/profile/billing")
    )), __temp = await __temp, __restore(), __temp);
    const { data: invoicesRes } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "invoices",
      () => $fetch("/api/profile/invoice")
    )), __temp = await __temp, __restore(), __temp);
    const billing = computed(() => billingRes.value?.data ?? null);
    const invoices = computed(() => invoicesRes.value?.data ?? []);
    const formattedAmount = computed(() => {
      if (!billing.value) return "$0.00";
      return billing.value.amountDue;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "m-10 space-y-6" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-xl font-semibold">Billing overview</h1><button class="rounded-md p-2 hover:bg-gray-100">⚙️</button></div><div class="flex items-center justify-between rounded-xl bg-blue-500 px-6 py-2 text-white"><div class="flex items-center gap-3"><span class="text-xl">ℹ️</span><p class="font-medium">Payment date is approaching soon.</p></div><button class="rounded-full bg-white px-4 py-2 text-sm font-medium text-blue-600"> See details </button></div><div class="grid grid-cols-1 gap-6 md:grid-cols-3"><div><p class="text-sm text-gray-500">Next payment on</p><p class="mt-1 text-lg font-semibold">${ssrInterpolate(billing.value?.nextPaymentDate || "-")}</p></div><div><p class="text-sm text-gray-500">Last billed on</p><p class="mt-1 text-lg font-semibold">${ssrInterpolate(billing.value?.lastBilledDate || "-")}</p></div><div class="text-right"><p class="text-sm text-gray-500">Amount due</p><p class="mt-1 text-3xl font-bold text-green-600">${ssrInterpolate(formattedAmount.value)}</p></div></div><div class="rounded-xl bg-white"><div class="px-6 py-4"><h2 class="font-semibold">Invoices</h2></div><div class="mb-2"><!--[-->`);
      ssrRenderList(invoices.value, (invoice) => {
        _push(`<div class="flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50"><div class="flex gap-5"><button class="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700 transition hover:bg-gray-200"> View invoice </button><button class="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700 transition hover:bg-gray-200"> PDF </button></div><div class="flex items-center gap-5"><span class="text-gray-500">${ssrInterpolate(invoice.date)}</span><span class="${ssrRenderClass([{
          "bg-blue-500 text-white": invoice.status === "Paid",
          "bg-yellow-500 text-white": invoice.status !== "Paid"
        }, "rounded-full px-3 py-1 text-sm font-medium"])}">${ssrInterpolate(invoice.status)}</span><span class="text-xl font-bold">${ssrInterpolate(invoice.amount)}</span></div></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/BillingOverview.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const BillingOverview = Object.assign(_sfc_main$4, { __name: "ProfileBillingOverview" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "PaymentMethods",
  __ssrInlineRender: true,
  setup(__props) {
    const paymentMethods = ref([]);
    const loading = ref(true);
    const showAddCardModal = ref(false);
    const newCard = ref({
      cardType: "",
      lastFour: "",
      expiryDate: "",
      cardholderName: "",
      isPrimary: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "m-10 min-h-screen bg-gray-50 p-6" }, _attrs))}><div class="mb-6 flex items-center justify-between"><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:credit-card-outline",
        width: "26"
      }, null, _parent));
      _push(`<h1 class="text-2xl font-bold">Payment methods</h1></div><button class="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:plus-circle",
        width: "20"
      }, null, _parent));
      _push(` Add card </button></div>`);
      if (loading.value) {
        _push(`<div class="py-10 text-center text-gray-500">Loading...</div>`);
      } else if (paymentMethods.value.length === 0) {
        _push(`<div class="py-10 text-center text-gray-500"> No payment methods found </div>`);
      } else {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(paymentMethods.value, (method) => {
          _push(`<div class="flex items-center justify-between rounded-xl bg-white p-5 shadow"><div class="flex items-center gap-4"><div class="flex h-10 w-14 items-center justify-center rounded-lg bg-gray-100">`);
          if (method.cardType === "Visa") {
            _push(`<img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" class="h-6">`);
          } else if (method.cardType === "MasterCard") {
            _push(`<img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" class="h-6">`);
          } else {
            _push(`<span>${ssrInterpolate(method.cardType)}</span>`);
          }
          _push(`</div><div><div class="text-lg font-semibold">${ssrInterpolate(method.cardType)} •••• ${ssrInterpolate(method.lastFour)}</div><div class="text-sm text-gray-500">${ssrInterpolate(method.expiryDate)} · ${ssrInterpolate(method.cardholderName)}</div></div>`);
          if (method.isPrimary) {
            _push(`<span class="ml-4 flex items-center gap-1 rounded-full bg-blue-500 px-3 py-1 text-sm text-white">`);
            _push(ssrRenderComponent(unref(Icon), {
              icon: "mdi:credit-card-check",
              width: "14"
            }, null, _parent));
            _push(` Primary </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="flex items-center gap-2">`);
          if (!method.isPrimary) {
            _push(`<button class="rounded-full bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"> Set primary </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button class="rounded-lg bg-gray-100 p-2 hover:bg-gray-200">`);
          _push(ssrRenderComponent(unref(Icon), { icon: "mdi:pencil-outline" }, null, _parent));
          _push(`</button><button class="rounded-lg bg-gray-100 p-2 text-red-600 hover:bg-red-100">`);
          _push(ssrRenderComponent(unref(Icon), { icon: "mdi:delete-outline" }, null, _parent));
          _push(`</button></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      if (showAddCardModal.value) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"><form class="w-full max-w-md space-y-4 rounded-xl bg-white p-6"><div class="flex items-center justify-between"><h2 class="text-xl font-bold">Add card</h2><button type="button">`);
        _push(ssrRenderComponent(unref(Icon), {
          icon: "mdi:close",
          width: "22"
        }, null, _parent));
        _push(`</button></div><select required class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(newCard.value.cardType) ? ssrLooseContain(newCard.value.cardType, "") : ssrLooseEqual(newCard.value.cardType, "")) ? " selected" : ""}>Select card type</option><option${ssrIncludeBooleanAttr(Array.isArray(newCard.value.cardType) ? ssrLooseContain(newCard.value.cardType, null) : ssrLooseEqual(newCard.value.cardType, null)) ? " selected" : ""}>Visa</option><option${ssrIncludeBooleanAttr(Array.isArray(newCard.value.cardType) ? ssrLooseContain(newCard.value.cardType, null) : ssrLooseEqual(newCard.value.cardType, null)) ? " selected" : ""}>MasterCard</option></select><input${ssrRenderAttr("value", newCard.value.lastFour)} placeholder="Last 4 digits" required class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"><input${ssrRenderAttr("value", newCard.value.expiryDate)} placeholder="MM/YY" required class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"><input${ssrRenderAttr("value", newCard.value.cardholderName)} placeholder="Cardholder name" required class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"><label class="flex items-center gap-2 text-sm"><input${ssrIncludeBooleanAttr(Array.isArray(newCard.value.isPrimary) ? ssrLooseContain(newCard.value.isPrimary, null) : newCard.value.isPrimary) ? " checked" : ""} type="checkbox"> Set as primary </label><div class="flex justify-end gap-2"><button type="button" class="rounded-md border px-4 py-2"> Cancel </button><button type="submit" class="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"> Add card </button></div></form></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/PaymentMethods.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const PaymentMethods = Object.assign(_sfc_main$3, { __name: "ProfilePaymentMethods" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ManageProfile",
  __ssrInlineRender: true,
  setup(__props) {
    const profile = ref(null);
    const loading = ref(true);
    ref(null);
    const form = ref({
      avatar: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      notificationsEnabled: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="flex min-h-screen justify-center bg-gray-50 p-6"><div class="w-full max-w-md rounded-lg bg-white p-6 shadow"><h1 class="mb-6 text-2xl font-bold">Manage Profile</h1><div class="mb-6"><h2 class="mb-2 font-semibold">Avatar</h2><div class="flex items-center gap-4"><img${ssrRenderAttr("src", form.value.avatar || profile.value?.avatar || "https://picsum.photos/seed/default/200/200")} class="h-16 w-16 rounded-full"><input type="file" hidden accept="image/*"><button class="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700">`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: "mdi:upload",
        class: "h-5 w-5"
      }, null, _parent));
      _push(` Upload </button></div><p class="mt-2 text-sm text-gray-500">Max 500kb</p></div><div class="mb-4"><h2 class="mb-1 font-semibold">Name</h2><input${ssrRenderAttr("value", form.value.name)} type="text" placeholder="Your name" class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"></div><div class="mb-4"><h2 class="mb-1 font-semibold">Email</h2><input${ssrRenderAttr("value", form.value.email)} type="email" placeholder="Your email" class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"></div><div class="mb-4"><h2 class="mb-1 font-semibold">Password</h2><input${ssrRenderAttr("value", form.value.password)} type="password" placeholder="New password" class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"></div><div class="mb-4"><h2 class="mb-1 font-semibold">Confirm Password</h2><input${ssrRenderAttr("value", form.value.confirmPassword)} type="password" placeholder="Confirm password" class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"></div><div class="mb-4 flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(form.value.notificationsEnabled) ? ssrLooseContain(form.value.notificationsEnabled, null) : form.value.notificationsEnabled) ? " checked" : ""} type="checkbox" class="mr-2"><span>Enable Notifications</span></div><div class="flex gap-2"><button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="rounded-lg bg-blue-500 px-4 py-2 text-white disabled:opacity-50"> Submit </button><button class="flex-1 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"> Options </button></div></div></div><div class="m-10 flex items-center justify-between text-sm text-gray-600"><div> ©2026, <span class="font-medium">JustBoil.me</span> . <a href="#" class="font-medium text-blue-600 hover:underline">Buy Premium</a> version </div><div class="font-serif text-gray-800 italic">JustBoil</div></div><!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ManageProfile.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ManageProfile = Object.assign(_sfc_main$2, { __name: "ProfileManageProfile" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SecurityOptions",
  __ssrInlineRender: true,
  setup(__props) {
    const security = ref(null);
    const loading = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 p-6" }, _attrs))}><div class="mb-6 flex items-center justify-between"><div class="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v6h8z"></path></svg><h1 class="text-2xl font-bold">Security options</h1></div><button class="p-2 text-gray-600 hover:text-gray-800"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></button></div>`);
      if (loading.value) {
        _push(`<div class="py-10 text-center text-gray-500">Loading security settings...</div>`);
      } else if (!security.value) {
        _push(`<div class="text-red-500">Failed to load security settings</div>`);
      } else {
        _push(`<!--[--><div class="mb-4 flex items-center justify-between rounded-lg bg-white p-4 shadow"><div><span class="text-sm text-gray-500">Last login</span><span class="ml-1 font-medium">${ssrInterpolate(security.value.lastLogin)}</span><span class="ml-1 text-sm text-gray-500">from IP</span><span class="ml-1 font-medium">${ssrInterpolate(security.value.ip)}</span></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/dashboard/security/sessions" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="rounded bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"${_scopeId}> Manage sessions </button>`);
            } else {
              return [
                createVNode("button", { class: "rounded bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" }, " Manage sessions ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="mb-4 flex items-center justify-between rounded-lg bg-white p-4 shadow"><div><span class="text-sm text-gray-500">API status</span><span class="${ssrRenderClass([{ "text-green-600": security.value.apiStatus, "text-red-600": !security.value.apiStatus }, "ml-1 font-bold"])}">${ssrInterpolate(security.value.apiStatus ? "enabled" : "disabled")}</span></div><button class="${ssrRenderClass([{ "bg-blue-600": security.value.apiStatus, "bg-gray-200": !security.value.apiStatus }, "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"])}"><span class="${ssrRenderClass([{ "translate-x-6": security.value.apiStatus, "translate-x-1": !security.value.apiStatus }, "inline-block h-4 w-4 transform rounded-full bg-white transition-transform"])}"></span></button></div><div class="mb-4 flex items-center justify-between rounded-lg bg-white p-4 shadow"><div><span class="text-sm text-gray-500">2-factor authentication</span><span class="${ssrRenderClass([{
          "bg-blue-500 text-white": security.value.twoFactorAuth,
          "bg-yellow-500 text-white": !security.value.twoFactorAuth
        }, "ml-1 rounded-full px-3 py-1 text-sm font-medium"])}">${ssrInterpolate(security.value.twoFactorAuth ? "Enabled" : "Disabled")}</span></div><button class="${ssrRenderClass([{ "bg-blue-600": security.value.twoFactorAuth, "bg-gray-200": !security.value.twoFactorAuth }, "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"])}"><span class="${ssrRenderClass([{
          "translate-x-6": security.value.twoFactorAuth,
          "translate-x-1": !security.value.twoFactorAuth
        }, "inline-block h-4 w-4 transform rounded-full bg-white transition-transform"])}"></span></button></div><div class="flex items-center justify-between rounded-lg bg-white p-4 shadow"><div><span class="text-sm text-gray-500">Password changed</span><span class="${ssrRenderClass([{
          "text-green-600": security.value.passwordChangedAt !== "long time ago",
          "text-red-600": security.value.passwordChangedAt === "long time ago"
        }, "ml-1 font-bold"])}">${ssrInterpolate(security.value.passwordChangedAt)}</span></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/security/change-password",
          class: "inline-block rounded bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Change password `);
            } else {
              return [
                createTextVNode(" Change password ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/SecurityOptions.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const SecurityOptions = Object.assign(_sfc_main$1, { __name: "ProfileSecurityOptions" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(ProfileCard, null, null, _parent));
      _push(ssrRenderComponent(BillingOverview, null, null, _parent));
      _push(ssrRenderComponent(PaymentMethods, null, null, _parent));
      _push(ssrRenderComponent(SecurityOptions, null, null, _parent));
      _push(ssrRenderComponent(ManageProfile, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=profile-BrM5A-9Y.mjs.map
