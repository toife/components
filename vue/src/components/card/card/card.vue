<style lang="scss" src="@/core/features/card/card.scss"></style>
<template src="./card.html"></template>
<script lang="ts" setup>
import { unref, computed, inject, provide } from "vue";
import {
  CARD_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  CARD_PROVIDER_STATE_KEY,
  getCardAttrs,
  type AppProviderState,
  type CardProps,
  type CardProviderState,
} from "@/core";
import type { ProviderStateRefs } from "../../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<CardProps>(), {
  ...CARD_DEFAULT_PROPS,
});
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Computed properties
// ----------------------------------------------------------------------------
const divider = computed(() => {
  return (props?.divider !== undefined ? props.divider : unref(appState?.divider)) ?? false;
});

const shape = computed(() => {
  return props?.shape || unref(appState?.shape) || "";
});

const role = computed(() => {
  return props.role || unref(appState?.role) || "";
});

const cardAttrs = computed(() =>
  getCardAttrs({
    role: role.value,
    shape: shape.value,
    divider: divider.value,
  })
);

// Provide / expose (public API)
// ----------------------------------------------------------------------------
provide<ProviderStateRefs<CardProviderState>>(CARD_PROVIDER_STATE_KEY, {
  role,
  shape,
  divider,
});
</script>
