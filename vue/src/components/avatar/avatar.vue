<style lang="scss" src="@/core/features/avatar/avatar.scss" scoped></style>
<template src="./avatar.html"></template>
<script lang="ts" setup>
import { unref, computed, inject } from "vue";
import {
  AVATAR_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  getAvatarAttrs,
  type AppProviderState,
  type AvatarProps,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";
// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<AvatarProps>(), {
  ...AVATAR_DEFAULT_PROPS,
});
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Computed properties
// ----------------------------------------------------------------------------
const avatarAttrs = computed(() => {
  const shape = props?.shape || unref(appState?.shape) || "";
  const role = props?.role || unref(appState?.role) || "";
  const divider =
    (props?.divider !== undefined ? props.divider : unref(appState?.divider)) ?? false;
  return getAvatarAttrs({
    role,
    shape,
    divider,
    size: props.size,
    src: props.src,
  });
});
</script>
