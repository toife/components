<style lang="scss" src="@/core/features/callout/callout.scss" scoped></style>
<template src="./callout.html"></template>
<script lang="ts" setup>
import { unref, computed, inject } from "vue";
import {
  CALLOUT_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  getCalloutAttrs,
  getCalloutBodyAttrs,
  getCalloutCloseAttrs,
  type AppProviderState,
  type CalloutEvent,
  type CalloutProps,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<CalloutProps>(), {
  ...CALLOUT_DEFAULT_PROPS,
});
const emit = defineEmits<CalloutEvent>();
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Computed properties
// ----------------------------------------------------------------------------
const resolvedRole = computed(() => props.role || unref(appState?.role) || "");
const resolvedShape = computed(() => props.shape || unref(appState?.shape) || "");
const resolvedDirection = computed(() => props.direction || unref(appState?.direction) || "left");

const calloutAttrs = computed(() => {
  return getCalloutAttrs({
    role: resolvedRole.value,
    shape: resolvedShape.value,
    size: props.size,
    direction: resolvedDirection.value,
    variant: props.variant,
  });
});

const bodyAttrs = getCalloutBodyAttrs();
const closeAttrs = getCalloutCloseAttrs();

// Methods
// ----------------------------------------------------------------------------
const onClose = () => {
  emit("close");
};
</script>
