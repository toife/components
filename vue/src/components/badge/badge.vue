<style lang="scss" src="@/core/features/badge/badge.scss" scoped></style>
<template src="./badge.html"></template>
<script lang="ts" setup>
import { unref, computed, inject } from "vue";
import {
  BADGE_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  getBadgeAttrs,
  getBadgeMarkAttrs,
  type AppProviderState,
  type BadgeProps,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";
// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<BadgeProps>(), {
  ...BADGE_DEFAULT_PROPS,
});
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Computed properties
// ----------------------------------------------------------------------------
const badgeAttrs = computed(() => getBadgeAttrs());

const markAttrs = computed(() => {
  const shape = props.shape || unref(appState?.shape) || "";
  const role = props.role || unref(appState?.role) || "";

  return getBadgeMarkAttrs({
    role,
    shape,
    size: props.size,
    variant: props.variant,
    placement: props.placement,
    dot: props.dot,
  });
});

const hasContent = computed(
  () => props.content !== undefined && props.content !== null && props.content !== "",
);
</script>
