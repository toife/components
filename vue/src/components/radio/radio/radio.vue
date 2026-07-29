<style lang="scss" src="@/core/features/radio/radio.scss" scoped></style>
<template src="./radio.html"></template>
<script lang="ts" setup>
import { unref, computed, inject, ref } from "vue";
import {
  RADIO_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  RADIO_GROUP_PROVIDER_STATE_KEY,
  getRadioAttrs,
  getRadioIconAttrs,
  type AppProviderState,
  type RadioGroupProviderState,
  type RadioProps,
} from "@/core";
import type { ProviderStateRefs } from "../../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<RadioProps>(), {
  ...RADIO_DEFAULT_PROPS,
});
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);
const radioGroupState = inject<ProviderStateRefs<RadioGroupProviderState> | null>(
  RADIO_GROUP_PROVIDER_STATE_KEY,
  null
);

// Reactive state
// ----------------------------------------------------------------------------
const isFocused = ref(false);

// Computed properties
// ----------------------------------------------------------------------------
const disabled = computed(() => {
  return props.disabled || (unref(radioGroupState?.disabled) ?? false);
});

const readonly = computed(() => {
  return props.readonly || (unref(radioGroupState?.readonly) ?? false);
});

const radioAttrs = computed(() => {
  const shadow = (props?.shadow !== undefined ? props.shadow : unref(appState?.shadow)) ?? false;
  const role = props.role || unref(radioGroupState?.role) || unref(appState?.role) || "";
  const shape = props.shape || unref(radioGroupState?.shape) || unref(appState?.shape) || "";
  const variant = props.variant || unref(radioGroupState?.variant) || "";
  const isChecked = unref(radioGroupState?.modelValue) === props.value;

  return getRadioAttrs({
    role,
    shape,
    size: props.size,
    variant,
    checked: isChecked,
    disabled: disabled.value,
    readonly: readonly.value,
    shadow: shadow && !props.disabled && isFocused.value,
    focus: isFocused.value,
  });
});

const radioIconAttrs = getRadioIconAttrs();

// Methods
// ----------------------------------------------------------------------------
const onRadio = () => {
  if (disabled.value || readonly.value || !radioGroupState) return;
  radioGroupState.setValue(props.value);
};

const onFocus = () => {
  if (disabled.value || readonly.value) return;
  isFocused.value = true;
};

const onBlur = () => {
  if (disabled.value || readonly.value) return;
  isFocused.value = false;
};

const onKeydown = (e: KeyboardEvent) => {
  if (e.key !== " " && e.key !== "Enter") return;
  e.preventDefault();
  onRadio();
};
</script>
