<style
  lang="scss"
  src="@/core/features/gesture-indicator/gesture-indicator.scss"
  scoped
></style>
<template src="./gesture-indicator.html"></template>
<script lang="ts" setup>
import { unref, computed, inject } from "vue";
import {
  GESTURE_INDICATOR_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  getGestureIndicatorAttrs,
  type AppProviderState,
  type GestureIndicatorProps,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<GestureIndicatorProps>(), {
  ...GESTURE_INDICATOR_DEFAULT_PROPS,
});
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Computed properties
// ----------------------------------------------------------------------------
const gestureIndicatorAttrs = computed(() => {
  const role = props.role || unref(appState?.role) || "";

  return getGestureIndicatorAttrs({ role, placement: props.placement });
});
</script>
