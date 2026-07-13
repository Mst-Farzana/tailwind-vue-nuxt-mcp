import { defineComponent, mergeProps, reactive, unref, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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

const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "ButtonCard",
  __ssrInlineRender: true,
  setup(__props) {
    const settings = [
      { id: "outline", label: "Outline" },
      { id: "small", label: "Small" },
      { id: "rounded", label: "Rounded" },
      { id: "disabled", label: "Disabled" }
    ];
    const colors = [
      { name: "White", bg: "white" },
      { name: "Black", bg: "black" },
      { name: "Blue", bg: "blue" },
      { name: "Green", bg: "green" },
      { name: "Orange", bg: "orange" },
      { name: "Red", bg: "red" }
    ];
    const colorClasses = {
      white: {
        bg: "bg-white text-black",
        hover: "hover:bg-gray-100",
        border: "border-gray-300 text-black"
      },
      black: {
        bg: "bg-black text-white",
        hover: "hover:bg-gray-800",
        border: "border-black text-black"
      },
      blue: {
        bg: "bg-blue-500 text-white",
        hover: "hover:bg-blue-600",
        border: "border-blue-500 text-blue-500"
      },
      green: {
        bg: "bg-green-500 text-white",
        hover: "hover:bg-green-600",
        border: "border-green-500 text-green-500"
      },
      orange: {
        bg: "bg-orange-500 text-white",
        hover: "hover:bg-orange-600",
        border: "border-orange-500 text-orange-500"
      },
      red: {
        bg: "bg-red-500 text-white",
        hover: "hover:bg-red-600",
        border: "border-red-500 text-red-500"
      }
    };
    const currentSettings = reactive({
      outline: false,
      small: false,
      rounded: false,
      disabled: false
    });
    function getButtonClass(color) {
      const base = "px-4 py-2 font-medium transition-all duration-200 flex items-center gap-2";
      const size = currentSettings.small ? "text-sm" : "text-base";
      const shape = currentSettings.rounded ? "rounded-full" : "rounded-md";
      const disabled = currentSettings.disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90";
      const selected = colorClasses[color];
      if (currentSettings.outline) {
        return `${base} ${size} ${shape} ${disabled} border ${selected.border}`;
      }
      return `${base} ${size} ${shape} ${disabled} ${selected.bg} ${selected.hover}`;
    }
    function getSquareButtonClass(color) {
      const base = "p-2.5 font-medium transition-all duration-200 flex items-center justify-center";
      const size = currentSettings.small ? "w-8 h-8" : "w-10 h-10";
      const shape = currentSettings.rounded ? "rounded-full" : "rounded-md";
      const disabled = currentSettings.disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90";
      const selected = colorClasses[color];
      if (currentSettings.outline) {
        return `${base} ${size} ${shape} ${disabled} border ${selected.border}`;
      }
      return `${base} ${size} ${shape} ${disabled} ${selected.bg} ${selected.hover}`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 p-6" }, _attrs))}><div class="flex flex-wrap gap-4 rounded-lg bg-gray-800 p-4"><!--[-->`);
      ssrRenderList(settings, (setting) => {
        _push(`<div class="flex items-center gap-2"><span class="text-gray-300">${ssrInterpolate(setting.label)}</span><button class="${ssrRenderClass([
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
          currentSettings[setting.id] ? "bg-blue-500" : "bg-gray-600"
        ])}"${ssrRenderAttr("aria-pressed", currentSettings[setting.id])}${ssrIncludeBooleanAttr(setting.id === "disabled") ? " disabled" : ""}><span class="${ssrRenderClass([
          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
          currentSettings[setting.id] ? "translate-x-6" : "translate-x-1"
        ])}"></span></button></div>`);
      });
      _push(`<!--]--></div><div class="grid grid-cols-1 gap-6 md:grid-cols-3"><div><h3 class="mb-3 text-gray-400">Default</h3><div class="flex flex-wrap gap-3"><!--[-->`);
      ssrRenderList(colors, (color) => {
        _push(`<button class="${ssrRenderClass(getButtonClass(color.bg))}"${ssrIncludeBooleanAttr(currentSettings.disabled) ? " disabled" : ""}>${ssrInterpolate(color.name)}</button>`);
      });
      _push(`<!--]--></div></div><div><h3 class="mb-3 text-gray-400">With Icons</h3><div class="flex flex-wrap gap-3"><!--[-->`);
      ssrRenderList(colors, (color) => {
        _push(`<button class="${ssrRenderClass(getButtonClass(color.bg))}"${ssrIncludeBooleanAttr(currentSettings.disabled) ? " disabled" : ""}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg> ${ssrInterpolate(color.name)}</button>`);
      });
      _push(`<!--]--></div></div><div><h3 class="mb-3 text-gray-400">Square</h3><div class="flex flex-wrap gap-3"><!--[-->`);
      ssrRenderList(colors, (color) => {
        _push(`<button class="${ssrRenderClass(getSquareButtonClass(color.bg))}"${ssrIncludeBooleanAttr(currentSettings.disabled) ? " disabled" : ""}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></button>`);
      });
      _push(`<!--]--></div></div></div></div>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/darkmode/ButtonCard.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const ButtonCard = Object.assign(_sfc_main$b, { __name: "DarkmodeButtonCard" });
const _sfc_main$a = {
  __name: "DarkmodeCardComponent",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 p-6" }, _attrs))}><h1 class="mb-8 text-center text-xl font-medium text-gray-500">Cards</h1><div class="grid grid-cols-1 gap-6 md:grid-cols-2"><div class="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"><div class="mb-3 flex items-start justify-between"><div><h3 class="text-lg font-bold text-gray-900">With title &amp; icon</h3><p class="mt-1 text-gray-600">Card with title, icon &amp; footer</p></div><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.46 9.25 6.253 8 7.253s-1.25 1.793-1.25 3.253v6c0 1.46.75 2.253 1.25 3.253s1.5 1.793 3 2.503c1.5.71 3.5.71 5 0 .75-.35 1.25-.7 1.75-1.25.5-.55.75-1.1.75-1.75v-6c0-1.46-.75-2.253-1.25-3.253s-1.5-1.793-3-2.503z"></path></svg></div><div class="flex gap-3 border-t border-gray-200 pt-4"><button class="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"> Confirm </button><button class="rounded-md border border-blue-600 px-4 py-2 font-medium text-blue-600 transition hover:bg-blue-50"> Cancel </button></div></div><div class="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"><div class="mb-3"><h3 class="font-medium text-gray-900">Just body &amp; footer</h3></div><div class="flex gap-3 border-t border-gray-200 pt-4"><button class="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"> Confirm </button><button class="rounded-md border border-blue-600 px-4 py-2 font-medium text-blue-600 transition hover:bg-blue-50"> Cancel </button></div></div></div></div>`);
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/darkmode/CardComponent.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto flex h-48 max-w-sm items-center justify-center rounded-lg bg-white p-6 shadow" }, _attrs))}><h2 class="text-xl font-bold">Coming Soon</h2></div>`);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/darkmode/CominsoonCard.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const ComingSoonCard = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender]]), { __name: "DarkmodeCominsoonCard" });
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "darkMode",
  __ssrInlineRender: true,
  setup(__props) {
    const isDarkMode = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto flex h-48 max-w-sm items-center justify-center rounded-lg bg-white p-6 shadow dark:bg-gray-800" }, _attrs))}><button class="${ssrRenderClass([{ "bg-gray-900 text-white": !isDarkMode.value, "bg-blue-600 text-white": isDarkMode.value }, "font-sm rounded-lg px-4 py-2 text-sm outline-1 outline-orange-600"])}">${ssrInterpolate(isDarkMode.value ? "Light mode" : "Toggle")}</button></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/darkmode/darkMode.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const DarkModeCard = Object.assign(_sfc_main$8, { __name: "DarkmodeDarkMode" });
const _sfc_main$7 = {
  __name: "DarkmodeEmptyCard",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 p-6" }, _attrs))}><div class="mb-4 flex items-center justify-between"><h1 class="flex items-center gap-2 font-bold text-gray-900"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 001 1h1a1 1 0 100-2H9a1 1 0 00-1 1z" clip-rule="evenodd"></path></svg> Empty variation </h1><button class="rounded-md border border-gray-200 bg-white p-2 transition hover:bg-gray-100" aria-label="Settings"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.63-1.56-3 0a1.532 1.532 0 01-1.532 1.532c1.04 1.04 2.07 2.07 3.09 3.09 1.04 1.04 2.07 2.07 3.09 3.09a1.532 1.532 0 011.532 1.532c0 .87-.7 1.56-1.532 1.532-1.04 0-2.07-2.07-3.09-3.09a1.532 1.532 0 01-1.532-1.532c0-.87.7-1.56 1.532-1.532 1.04 0 2.07-2.07 3.09-3.09a1.532 1.532 0 011.532-1.532z" clip-rule="evenodd"></path></svg></button></div><div class="flex h-64 items-center justify-center rounded-lg border border-gray-200 bg-white p-10 shadow-sm"><p class="text-gray-400 italic">Nothing&#39;s here...</p></div><div class="mt-10 flex items-center justify-between text-sm text-gray-600"><div> ©2026, <span class="font-medium">JustBoil.me</span> . <a href="#" class="font-medium text-blue-600 hover:underline">Buy Premium</a> version </div><div class="font-serif text-gray-800 italic">JustBoil</div></div></div>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/darkmode/EmptyCard.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ConfirmCard",
  __ssrInlineRender: true,
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black" }, _attrs))}><div class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"><div class="mb-4 flex items-center justify-between"><button class="text-gray-500 hover:text-gray-700 dark:text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><p class="mb-6 text-gray-700 dark:text-gray-300">Click to see in action</p><div class="flex space-x-4"><button class="rounded-lg bg-blue-500 px-4 py-2 text-white">Confirm</button><button class="rounded-lg border border-blue-500 px-4 py-2 text-blue-500"> Cancel </button></div></div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/darkmode/ConfirmCard.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const ConfirmModal = Object.assign(_sfc_main$6, { __name: "DarkmodeConfirmCard" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ExpectionalCard",
  __ssrInlineRender: true,
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black" }, _attrs))}><div class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"><div class="mb-4 flex items-center justify-between"><h3 class="text-xl font-bold text-gray-900 dark:text-white">Unhandled exception</h3><button class="text-gray-500 hover:text-gray-700 dark:text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><p class="mb-6 text-gray-700 dark:text-gray-300">Click to see in action</p><div class="flex space-x-4"><button class="rounded-lg bg-red-500 px-4 py-2 text-white">Done</button></div></div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/darkmode/ExpectionalCard.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const ExceptionModal = Object.assign(_sfc_main$5, { __name: "DarkmodeExpectionalCard" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "SuccessCard",
  __ssrInlineRender: true,
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black" }, _attrs))}><div class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"><div class="mb-4 flex items-center justify-between"><h3 class="text-xl font-bold text-gray-900 dark:text-white">Success</h3><button class="text-gray-500 hover:text-gray-700 dark:text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><p class="mb-6 text-gray-700 dark:text-gray-300">Click to see in action</p><div class="flex space-x-4"><button class="rounded-lg bg-green-500 px-4 py-2 text-white">Done</button></div></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/darkmode/SuccessCard.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const SuccessModal = Object.assign(_sfc_main$4, { __name: "DarkmodeSuccessCard" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ExampleCard",
  __ssrInlineRender: true,
  setup(__props) {
    const showConfirmModal = ref(false);
    const showExceptionModal = ref(false);
    const showSuccessModal = ref(false);
    const closeConfirmModal = () => showConfirmModal.value = false;
    const closeExceptionModal = () => showExceptionModal.value = false;
    const closeSuccessModal = () => showSuccessModal.value = false;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="mx-auto grid max-w-sm grid-cols-1 space-y-6 bg-white"><div class="flex h-48 w-full items-center justify-center rounded-lg bg-white p-6 shadow dark:bg-gray-800"><button class="h-full w-full rounded-lg bg-blue-500 px-4 py-2 text-white"> Confirm Action </button></div><div class="flex h-48 w-full items-center justify-center rounded-lg bg-white p-6 shadow dark:bg-gray-800"><button class="h-full w-full rounded-lg bg-red-500 px-4 py-2 text-white"> Unhandled Exception </button></div><div class="flex h-48 w-full items-center justify-center rounded-lg bg-white p-6 shadow dark:bg-gray-800"><button class="h-full w-full rounded-lg bg-green-500 px-4 py-2 text-white"> Success </button></div></div>`);
      if (showConfirmModal.value) {
        _push(ssrRenderComponent(ConfirmModal, { onClose: closeConfirmModal }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showExceptionModal.value) {
        _push(ssrRenderComponent(ExceptionModal, { onClose: closeExceptionModal }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showSuccessModal.value) {
        _push(ssrRenderComponent(SuccessModal, { onClose: closeSuccessModal }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/darkmode/ExampleCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const ModalExamplesCard = Object.assign(_sfc_main$3, { __name: "DarkmodeExampleCard" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "NotificationsCard",
  __ssrInlineRender: true,
  setup(__props) {
    const isOutline = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-4xl bg-white p-8" }, _attrs))}><h2 class="mb-4 text-center text-xl font-semibold">Notifications</h2><div class="mb-10 flex items-center justify-center gap-2"><label class="relative inline-flex cursor-pointer items-center"><input${ssrIncludeBooleanAttr(Array.isArray(isOutline.value) ? ssrLooseContain(isOutline.value, null) : isOutline.value) ? " checked" : ""} type="checkbox" class="peer sr-only"><div class="h-6 w-11 rounded-full bg-gray-300 transition peer-checked:bg-blue-600"></div><div class="absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5"></div></label><span class="text-sm">Outline</span></div><div class="space-y-4"><div class="${ssrRenderClass([isOutline.value ? "border border-blue-500 text-blue-600" : "bg-blue-500 text-white", "flex items-center justify-between rounded-lg px-5 py-4"])}"><div class="flex items-center gap-2 font-medium">ℹ️ Info state. NotificationBar</div><button class="${ssrRenderClass([isOutline.value ? "border border-blue-500 text-blue-600" : "bg-white text-blue-600", "rounded-full px-4 py-1.5 text-sm"])}"> Button </button></div><div class="${ssrRenderClass([isOutline.value ? "border border-green-500 text-green-600" : "bg-green-500 text-white", "flex items-center justify-between rounded-lg px-5 py-4"])}"><div class="flex items-center gap-2 font-medium">✅ Success state. NotificationBar</div><button class="${ssrRenderClass([isOutline.value ? "border border-green-500 text-green-600" : "bg-white text-green-600", "rounded-full px-4 py-1.5 text-sm"])}"> Button </button></div><div class="${ssrRenderClass([isOutline.value ? "border border-yellow-500 text-yellow-600" : "bg-yellow-500 text-white", "flex items-center justify-between rounded-lg px-5 py-4"])}"><div class="flex items-center gap-2 font-medium">⚠️ Warning state. NotificationBar</div><button class="${ssrRenderClass([
        isOutline.value ? "border border-yellow-500 text-yellow-600" : "bg-white text-yellow-600",
        "rounded-full px-4 py-1.5 text-sm"
      ])}"> Button </button></div><div class="${ssrRenderClass([isOutline.value ? "border border-red-500 text-red-600" : "bg-red-500 text-white", "flex items-center justify-between rounded-lg px-5 py-4"])}"><div class="flex items-center gap-2 font-medium">⛔ Danger state. NotificationBar</div><button class="${ssrRenderClass([isOutline.value ? "border border-red-500 text-red-600" : "bg-white text-red-600", "rounded-full px-4 py-1.5 text-sm"])}"> Button </button></div><div class="${ssrRenderClass([isOutline.value ? "border border-gray-800 text-black" : "bg-gray-900 text-white", "flex items-center justify-between rounded-lg px-5 py-4"])}"><div class="flex items-center gap-2 font-medium">🌓 Contrast. NotificationBar</div><button class="${ssrRenderClass([isOutline.value ? "border border-gray-800 text-black" : "bg-white text-black", "flex h-8 w-8 items-center justify-center rounded-full"])}"> × </button></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/darkmode/NotificationsCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const NotificationsCard = Object.assign(_sfc_main$2, { __name: "DarkmodeNotificationsCard" });
const _sfc_main$1 = {
  __name: "DarkmodePillCard",
  __ssrInlineRender: true,
  setup(__props) {
    const currentSettings = reactive({
      outline: false,
      small: false,
      icon: true
      // default ON as shown in your image
    });
    const pills = [
      { name: "contrast", label: "Contrast", color: "gray-900", text: "white" },
      { name: "info", label: "Info", color: "blue-500", text: "white" },
      { name: "success", label: "Success", color: "green-500", text: "white" },
      { name: "warning", label: "Warning", color: "yellow-500", text: "black" },
      { name: "danger", label: "Danger", color: "red-500", text: "white" }
    ];
    function getPillClass(pill) {
      const base = "px-4 py-2 font-medium flex items-center gap-1 transition-all duration-200";
      const size = currentSettings.small ? "text-sm px-3 py-1.5" : "text-base";
      const shape = "rounded-full";
      const disabled = "hover:opacity-90";
      if (currentSettings.outline) {
        return `${base} ${size} ${shape} ${disabled} border border-${pill.color} text-${pill.color} hover:bg-${pill.color}/10`;
      }
      return `${base} ${size} ${shape} ${disabled} bg-${pill.color} text-${pill.text} hover:bg-${pill.color}/90`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 p-6" }, _attrs))}><h1 class="mb-8 text-center text-xl font-medium text-gray-500">Pills</h1><div class="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"><h3 class="mb-3 font-bold text-gray-800">Settings</h3><div class="flex flex-wrap items-center gap-6"><div class="flex items-center gap-2"><button class="${ssrRenderClass([
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
        unref(currentSettings).outline ? "bg-blue-500" : "bg-gray-300"
      ])}"${ssrRenderAttr("aria-pressed", unref(currentSettings).outline)}><span class="${ssrRenderClass([
        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
        unref(currentSettings).outline ? "translate-x-6" : "translate-x-1"
      ])}"></span></button><span class="text-gray-700">Outline</span></div><div class="flex items-center gap-2"><button class="${ssrRenderClass([
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
        unref(currentSettings).small ? "bg-blue-500" : "bg-gray-300"
      ])}"${ssrRenderAttr("aria-pressed", unref(currentSettings).small)}><span class="${ssrRenderClass([
        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
        unref(currentSettings).small ? "translate-x-6" : "translate-x-1"
      ])}"></span></button><span class="text-gray-700">Small</span></div><div class="flex items-center gap-2"><button class="${ssrRenderClass([
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
        unref(currentSettings).icon ? "bg-blue-500" : "bg-gray-300"
      ])}"${ssrRenderAttr("aria-pressed", unref(currentSettings).icon)}><span class="${ssrRenderClass([
        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
        unref(currentSettings).icon ? "translate-x-6" : "translate-x-1"
      ])}"></span></button><span class="text-gray-700">Icon</span></div></div></div><div class="flex flex-wrap gap-3"><!--[-->`);
      ssrRenderList(pills, (pill) => {
        _push(`<button class="${ssrRenderClass(getPillClass(pill))}"${ssrIncludeBooleanAttr(false) ? " disabled" : ""}>`);
        if (unref(currentSettings).icon) {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 3a1 1 0 000 2v12a1 1 0 000 2h12a1 1 0 000-2V5a1 1 0 000-2H5zm12 4l-4 4m0 0l-4 4m4-4v8M7 7h.01V7z" clip-rule="evenodd"></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(pill.label)}</button>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/darkmode/PillCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "base",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 p-6" }, _attrs))}><div class="mb-6 flex items-center justify-between"><h1 class="text-2xl font-bold">UI Components</h1></div><div class="grid grid-cols-1 gap-6 md:grid-cols-1"><div><h1 class="m-15 text-center text-sm font-medium text-gray-600">Dark mode</h1>`);
      _push(ssrRenderComponent(DarkModeCard, null, null, _parent));
      _push(`</div><div><h1 class="m-15 text-center text-sm font-medium text-gray-600">Modal examples</h1>`);
      _push(ssrRenderComponent(ModalExamplesCard, null, null, _parent));
      _push(`</div><div class="mt-15">`);
      _push(ssrRenderComponent(NotificationsCard, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(ComingSoonCard, null, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(ButtonCard, null, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$a, null, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$7, null, null, _parent));
      _push(`</div><div class="mt-10 text-center text-sm text-gray-500"> ©2026, JustBoil.me. <a href="#" class="text-blue-600 hover:underline">Buy Premium version</a></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sidebar/ui/base.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=base-Dz68JzkU.mjs.map
