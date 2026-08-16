<style lang="scss" src="@/core/features/button/button.scss" scoped></style>
<template src="./button.html"></template>
<script lang="ts" setup>
import { unref, computed, inject, ref } from "vue";
import {
  BUTTON_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  getButtonAttrs,
  getButtonLoaderAttrs,
  type AppProviderState,
  type ButtonProps,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";
// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<ButtonProps>(), {
  ...BUTTON_DEFAULT_PROPS,
});
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Reactive state
// ----------------------------------------------------------------------------
const isFocused = ref(false);

// Computed properties
// ----------------------------------------------------------------------------
const buttonAttrs = computed(() => {
  const shape = props.shape || unref(appState?.shape) || "";
  const role = props.role || unref(appState?.role) || "";

  return getButtonAttrs({
    role,
    shape,
    variant: props.variant,
    size: props.size,
    block: props.block,
    focus: isFocused.value,
  });
});

const loaderAttrs = getButtonLoaderAttrs();

// Methods
// ----------------------------------------------------------------------------
const onFocus = () => {
  isFocused.value = true;
};

const onBlur = () => {
  isFocused.value = false;
};
</script>
