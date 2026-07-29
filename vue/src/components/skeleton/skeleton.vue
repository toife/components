<style lang="scss" src="@/core/features/skeleton/skeleton.scss" scoped></style>
<template src="./skeleton.html"></template>
<script lang="ts" setup>
import { unref, computed, inject } from "vue";
import {
  SKELETON_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  getSkeletonAttrs,
  type AppProviderState,
  type SkeletonProps,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";
// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<SkeletonProps>(), {
  ...SKELETON_DEFAULT_PROPS,
});
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Computed properties
// ----------------------------------------------------------------------------
const skeletonAttrs = computed(() => {
  const shape = props.shape || unref(appState?.shape) || "";
  const role = props.role || unref(appState?.role) || "";

  return getSkeletonAttrs({
    role,
    shape,
    width: props.width,
    height: props.height,
  });
});
</script>
