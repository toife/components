<style lang="scss" src="@/core/features/tag/tag.scss" scoped></style>
<template src="./tag.html"></template>
<script lang="ts" setup>
import { unref, computed, inject } from "vue";
import {
  TAG_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  getTagAttrs,
  type AppProviderState,
  type TagProps,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";
// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<TagProps>(), {
  ...TAG_DEFAULT_PROPS,
});
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Computed properties
// ----------------------------------------------------------------------------
const tagAttrs = computed(() => {
  const shape = props.shape || unref(appState?.shape) || "";
  const role = props.role || unref(appState?.role) || "";

  return getTagAttrs({
    role,
    shape,
    size: props.size,
    variant: props.variant,
  });
});
</script>
