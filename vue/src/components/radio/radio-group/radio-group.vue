<style lang="scss" src="@/core/features/radio/radio-group.scss" scoped></style>
<template src="./radio-group.html"></template>
<script lang="ts" setup>
import { unref, computed, inject, provide } from "vue";
import {
  RADIO_GROUP_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  RADIO_GROUP_PROVIDER_STATE_KEY,
  getRadioGroupAttrs,
  type AppProviderState,
  type RadioGroupEvent,
  type RadioGroupProps,
  type RadioGroupProviderState,
} from "@/core";
import type { ProviderStateRefs } from "../../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<RadioGroupProps>(), {
  ...RADIO_GROUP_DEFAULT_PROPS,
});
const emit = defineEmits<RadioGroupEvent>();
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Computed properties
// ----------------------------------------------------------------------------
const modelValue = computed(() => props.modelValue);

const role = computed(() => {
  return props.role || unref(appState?.role) || "";
});

const shape = computed(() => {
  return props.shape || unref(appState?.shape) || "";
});

const variant = computed(() => {
  return props.variant;
});

const disabled = computed(() => props.disabled);
const readonly = computed(() => props.readonly);

const radioGroupAttrs = computed(() => getRadioGroupAttrs({ direction: props.direction }));

// Provide / expose (public API)
// ----------------------------------------------------------------------------
provide<ProviderStateRefs<RadioGroupProviderState>>(RADIO_GROUP_PROVIDER_STATE_KEY, {
  modelValue,
  role,
  shape,
  variant,
  disabled,
  readonly,
  setValue: (val: string | number) => {
    emit("update:modelValue", val);
  },
});
</script>
