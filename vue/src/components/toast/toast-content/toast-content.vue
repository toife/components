<style lang="scss" src="@/core/features/toast/toast-content.scss" scoped></style>
<template src="./toast-content.html"></template>
<script lang="ts" setup>
import { unref, computed, inject, onMounted, ref } from "vue";
import {
  TOAST_CONTENT_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  getToastContentAttrs,
  type AppProviderState,
  type ToastContentEvent,
  type ToastContentProps,
} from "@/core";
import type { ProviderStateRefs } from "../../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<ToastContentProps>(), {
  ...TOAST_CONTENT_DEFAULT_PROPS,
});
const emit = defineEmits<ToastContentEvent>();
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Reactive state
// ----------------------------------------------------------------------------
const isClosing = ref(false);

// Computed properties
// ----------------------------------------------------------------------------
const contentAttrs = computed(() => {
  const role = props.role || unref(appState?.role) || "";
  const shape = props.shape || unref(appState?.shape) || "";
  return getToastContentAttrs({
    role,
    shape,
    variant: props.variant,
    closing: isClosing.value,
  });
});

// Lifecycle
// ----------------------------------------------------------------------------
onMounted(() => {
  setTimeout(() => {
    isClosing.value = true;

    setTimeout(() => {
      emit("close");
    }, 500);
  }, props.duration);
});
</script>
