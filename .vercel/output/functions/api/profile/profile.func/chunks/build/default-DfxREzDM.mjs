import { ref, mergeProps, computed, watch, resolveDirective, unref, withCtx, createVNode, withDirectives, toDisplayString, vShow, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrGetDirectiveProps, ssrRenderList, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BvdDl6Me.mjs';
import { j as useState, _ as _export_sfc, I as Icon } from './server.mjs';
import __nuxt_component_1 from './index-kToG1-L8.mjs';
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
import './asyncData-Bf39Eptr.mjs';

const _sfc_main$2 = {
  __name: "Sidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const isOpen = ref(false);
    const openSubPanel = ref(false);
    const activeSubItem = ref(null);
    const menuItems = [
      { icon: "mdi:monitor", label: "Dashboard", path: "/sidebar/dashboard" },
      { icon: "mdi:table", label: "Tables & Lists", path: "/sidebar/tables" },
      { icon: "mdi:format-list-bulleted", label: "Forms Base", path: "/forms/base" },
      { icon: "mdi:form-select", label: "Forms Advanced", path: "/forms/advanced" },
      { icon: "mdi:view-dashboard", label: "UI Base", path: "/sidebar/ui/base" },
      { icon: "mdi:view-dashboard-outline", label: "UI Advanced", path: "/sidebar/ui/advanced" },
      { icon: "mdi:palette", label: "Styles", path: "/sidebar/styles" },
      { icon: "mdi:credit-card-outline", label: "Pricing layout", path: "/sidebar/pricing" },
      { icon: "mdi:account-circle", label: "Profile", path: "/dashboard/profile" },
      { icon: "mdi:lock", label: "Login", path: "/sidebar/auth" },
      { icon: "mdi:menu-left", label: "Sub", sub: true },
      { icon: "mdi:information-outline", label: "About", path: "/sidebar/about" }
    ];
    const subItems = ref([
      { icon: "mdi:image", label: "Sample Page", path: "/sample" },
      { icon: "mdi:link", label: "External Link", path: "https://google.com", external: true },
      {
        icon: "mdi:table",
        label: "Dropdown",
        children: [
          { label: "Child 1", path: "/child1" },
          { label: "Child 2", path: "/child2" },
          { label: "Child 3", path: "/child3" }
        ],
        open: false
      }
    ]);
    function selectItem(item) {
      if (item.sub) {
        openSubPanel.value = true;
        activeSubItem.value = subItems.value[0].label;
      } else {
        openSubPanel.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex text-sm" }, _attrs))} data-v-1b3c51e5><aside class="${ssrRenderClass([
        "flex h-screen flex-col overflow-hidden rounded-2xl bg-[#0d1729] text-sm text-white transition-all duration-300",
        isOpen.value ? "w-56" : "w-18"
      ])}" data-v-1b3c51e5><div class="flex items-center justify-center rounded py-3" data-v-1b3c51e5><h1 class="${ssrRenderClass([isOpen.value ? "text-xl" : "text-sm", "text-xl font-bold"])}" data-v-1b3c51e5>One</h1></div><nav class="custom-scroll mt-2 flex-1 space-y-1 overflow-y-auto bg-gray-700 px-2" data-v-1b3c51e5><!--[-->`);
      ssrRenderList(menuItems, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.label,
          to: item.path || "#",
          class: "flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-[#1f2a40]",
          onClick: ($event) => selectItem(item)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Icon), {
                icon: item.icon,
                class: "w-6 shrink-0 text-center text-base"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-sm whitespace-nowrap" style="${ssrRenderStyle(isOpen.value ? null : { display: "none" })}" data-v-1b3c51e5${_scopeId}>${ssrInterpolate(item.label)}</span>`);
            } else {
              return [
                createVNode(unref(Icon), {
                  icon: item.icon,
                  class: "w-6 shrink-0 text-center text-base"
                }, null, 8, ["icon"]),
                withDirectives(createVNode("span", { class: "text-sm whitespace-nowrap" }, toDisplayString(item.label), 513), [
                  [vShow, isOpen.value]
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><button class="flex h-10 items-center justify-center gap-2 rounded-b-xl bg-blue-600 transition-all duration-300 hover:bg-blue-700" data-v-1b3c51e5>`);
      _push(ssrRenderComponent(unref(Icon), {
        icon: isOpen.value ? "mdi:chevron-left" : "mdi:chevron-right",
        class: "text-base text-white"
      }, null, _parent));
      _push(`<span class="text-sm font-medium text-white" style="${ssrRenderStyle(isOpen.value ? null : { display: "none" })}" data-v-1b3c51e5>Collapse</span></button></aside>`);
      if (openSubPanel.value) {
        _push(`<div class="mx-2 flex w-56 flex-col rounded-2xl border-l border-gray-700 bg-[#0d1729] p-4 text-white" data-v-1b3c51e5><div class="mb-4 flex items-center justify-between" data-v-1b3c51e5><div class="flex items-center gap-2" data-v-1b3c51e5>`);
        _push(ssrRenderComponent(unref(Icon), {
          icon: "mdi:menu-left",
          class: "text-xl"
        }, null, _parent));
        _push(`<h2 class="text-lg font-semibold" data-v-1b3c51e5>Sub</h2></div>`);
        _push(ssrRenderComponent(unref(Icon), {
          icon: "mdi:close",
          class: "cursor-pointer text-xl",
          onClick: ($event) => openSubPanel.value = false
        }, null, _parent));
        _push(`</div><div class="flex flex-col space-y-2" data-v-1b3c51e5><!--[-->`);
        ssrRenderList(subItems.value, (sub, i) => {
          _push(`<div class="flex flex-col" data-v-1b3c51e5><div class="${ssrRenderClass([activeSubItem.value === sub.label ? "bg-[#1f2a40]" : "", "flex cursor-pointer items-center justify-between gap-2 rounded p-2 hover:bg-[#1f2a40]"])}" data-v-1b3c51e5><div class="flex items-center gap-2" data-v-1b3c51e5>`);
          _push(ssrRenderComponent(unref(Icon), {
            icon: sub.icon,
            class: "w-6 shrink-0 text-center text-base"
          }, null, _parent));
          _push(`<span class="whitespace-nowrap" data-v-1b3c51e5>${ssrInterpolate(sub.label)}</span></div>`);
          if (sub.children) {
            _push(`<button class="text-white" data-v-1b3c51e5>`);
            _push(ssrRenderComponent(unref(Icon), {
              icon: sub.open ? "mdi:minus" : "mdi:plus"
            }, null, _parent));
            _push(`</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (sub.children && sub.open) {
            _push(`<div class="mt-1 ml-8 flex flex-col space-y-1" data-v-1b3c51e5><!--[-->`);
            ssrRenderList(sub.children, (child, j) => {
              _push(ssrRenderComponent(_component_NuxtLink, {
                key: j,
                to: child.path,
                class: "cursor-pointer rounded p-1 text-sm hover:bg-[#1f2a40]",
                onClick: ($event) => activeSubItem.value = child.label
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(child.label)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(child.label), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sidebar/sidebar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-1b3c51e5"]]);
const useColorMode = () => {
  return useState("color-mode").value;
};
const _sfc_main$1 = {
  __name: "Topbar",
  __ssrInlineRender: true,
  emits: ["toggle"],
  setup(__props, { emit: __emit }) {
    const isOpen = ref(false);
    const dropDownOpen = ref(false);
    const userDropDownOpen = ref(false);
    const closeDropdown = () => {
      dropDownOpen.value = false;
      userDropDownOpen.value = false;
    };
    const searchMargin = computed(() => isOpen.value ? "ml-30" : "ml-0");
    const colorMode = useColorMode();
    const emit = __emit;
    watch(isOpen, (v) => emit("toggle", v));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Sidebar = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _directive_click_outside = resolveDirective("click-outside");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs, ssrGetDirectiveProps(_ctx, _directive_click_outside, closeDropdown)))}><header class="sticky top-0 left-0 z-49 grid h-16 w-full grid-cols-2 items-center gap-2 border-b bg-gray-50 px-4 text-sm">`);
      if (isOpen.value) {
        _push(`<div class="absolute top-4 bottom-1 left-3 flex h-screen">`);
        _push(ssrRenderComponent(_component_Sidebar, null, null, _parent));
        _push(`<div><button class="mt-2 hover:text-blue-600"><svg width="40" height="28" viewBox="0 0 80 70" xmlns="http://www.w3.org/2000/svg"><path d="M30 14 L14 35 L30 56 L36 50 L24 35 L36 20 Z" fill="gray"></path><rect x="38" y="24" width="26" height="6" fill="gray"></rect><rect x="20" y="34" width="44" height="6" fill="gray"></rect><rect x="38" y="44" width="26" height="6" fill="gray"></rect></svg></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center gap-3"><div class="flex items-center gap-3">`);
      if (!isOpen.value) {
        _push(`<button>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:menu",
          size: "25"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input type="text" placeholder="Search (Ctrl + K)" class="${ssrRenderClass([unref(searchMargin), "rounded border-2 border-gray-50 px-3 py-2 transition-all duration-300 focus:border-blue-700 focus:outline-none"])}"></div></div><div class="flex w-full items-center justify-between bg-white px-4 py-2"><ul class="flex items-center gap-5"><li><button class="flex h-8 w-8 items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:menu",
        class: "text-xl"
      }, null, _parent));
      _push(`</button></li><li class="relative flex cursor-pointer items-center gap-5 text-nowrap"><span>Sample menu</span>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:chevron-down",
        class: "text-lg"
      }, null, _parent));
      if (dropDownOpen.value) {
        _push(`<ul class="absolute top-15 right-1 w-45 divide-y divide-gray-200 rounded-lg bg-white shadow-md"><li class="flex cursor-pointer items-center gap-2 px-4 py-2 hover:text-blue-700 active:bg-gray-200 active:text-black">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:clock-outline",
          class: "text-base"
        }, null, _parent));
        _push(`<span>Item One</span></li><li class="flex cursor-pointer items-center gap-2 px-4 py-2 hover:text-blue-700 active:bg-gray-200 active:text-black">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:cloud-outline",
          class: "text-base"
        }, null, _parent));
        _push(`<span>Item Two</span></li><li class="flex cursor-pointer items-center gap-2 px-4 py-2 hover:text-blue-700 active:bg-gray-200 active:text-black">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:crop",
          class: "text-base"
        }, null, _parent));
        _push(`<span>Item Last</span></li></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</li><li class="relative flex cursor-pointer items-center gap-2"><div class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:account",
        class: "text-xl text-gray-700"
      }, null, _parent));
      _push(`</div><span class="text-nowrap">John Doe</span>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:chevron-down",
        class: "text-lg"
      }, null, _parent));
      if (userDropDownOpen.value) {
        _push(`<ul class="absolute top-15 left-5 w-45 divide-y divide-gray-200 rounded-lg bg-white shadow-md"><li>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/profile",
          class: "flex items-center gap-2 px-4 py-2 hover:text-blue-700 active:bg-gray-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:user",
                class: "h-5 w-5"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-[15px]"${_scopeId}>My Profile</span>`);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons:user",
                  class: "h-5 w-5"
                }),
                createVNode("span", { class: "text-[15px]" }, "My Profile")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/settings",
          class: "flex items-center gap-2 px-4 py-2 hover:text-blue-700 active:bg-gray-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:cog-6-tooth",
                class: "h-5 w-5"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-[15px]"${_scopeId}>Settings</span>`);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons:cog-6-tooth",
                  class: "h-5 w-5"
                }),
                createVNode("span", { class: "text-[15px]" }, "Settings")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/messages",
          class: "flex items-center gap-2 px-4 py-2 hover:text-blue-700 active:bg-gray-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:envelope",
                class: "h-5 w-5"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-[15px]"${_scopeId}>Messages</span>`);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons:envelope",
                  class: "h-5 w-5"
                }),
                createVNode("span", { class: "text-[15px]" }, "Messages")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/logout",
          class: "flex items-center gap-2 px-4 py-2 hover:text-blue-700 active:bg-gray-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "mdi:logout",
                class: "h-5 w-5"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-[15px]"${_scopeId}>Log Out</span>`);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "mdi:logout",
                  class: "h-5 w-5"
                }),
                createVNode("span", { class: "text-[15px]" }, "Log Out")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</li><li><button class="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-200">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: unref(colorMode).value === "dark" ? "mdi:white-balance-sunny" : "mdi:weather-night",
        class: "text-xl"
      }, null, _parent));
      _push(`</button></li><li><button class="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-200">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:help-circle-outline",
        class: "text-xl"
      }, null, _parent));
      _push(`</button></li><li><button class="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-200">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:logout",
        class: "text-xl"
      }, null, _parent));
      _push(`</button></li></ul></div></header></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/topbar/topbar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const isSidebarOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-screen overflow-hidden" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        class: "fixed top-0 right-0 left-0 z-50",
        onToggle: ($event) => isSidebarOpen.value = $event
      }, null, _parent));
      _push(`<main class="${ssrRenderClass([isSidebarOpen.value ? "ml-20" : "ml-0", "h-[calc(100vh-4rem)] overflow-y-auto bg-gray-100 pt-5 transition-all duration-300"])}">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-DfxREzDM.mjs.map
