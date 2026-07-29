<style lang="scss" src="@/core/features/toolbar/toolbar.scss" scoped></style>
<template src="./toolbar.html"></template>
<script lang="ts" setup>
import { unref, computed, inject } from "vue";
import {
  TOOLBAR_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  CABLE_PROVIDER_STATE_KEY,
  getToolbarAttrs,
  type AppProviderState,
  type CableProviderState,
  type ToolbarProps,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<ToolbarProps>(), {
  ...TOOLBAR_DEFAULT_PROPS,
});
const cable = inject<ProviderStateRefs<CableProviderState>>(CABLE_PROVIDER_STATE_KEY);
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Computed properties
// ----------------------------------------------------------------------------
const toolbarAttrs = computed(() => {
  const role = props.role || unref(appState?.role) || "";
  const placement = props.placement || unref(cable?.placement) || "";
  const divider =
    (props?.divider !== undefined ? props.divider : unref(appState?.divider)) ?? false;

  return getToolbarAttrs({
    role,
    placement,
    safe: props.safe,
    divider,
  });
});
</script>
