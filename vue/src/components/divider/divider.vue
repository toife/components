<style lang="scss" src="@/core/features/divider/divider.scss" scoped></style>
<template src="./divider.html"></template>
<script lang="ts" setup>
import { unref, computed, inject } from "vue";
import {
  DIVIDER_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  getDividerAttrs,
  type AppProviderState,
  type DividerProps,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";
// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<DividerProps>(), {
  ...DIVIDER_DEFAULT_PROPS,
});
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Computed properties
// ----------------------------------------------------------------------------
const dividerAttrs = computed(() => {
  const role = props.role || unref(appState?.role) || "";
  return getDividerAttrs({ role, direction: props.direction });
});
</script>
