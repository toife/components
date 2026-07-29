<style lang="scss" src="@/core/features/checkbox/checkbox.scss" scoped></style>
<template src="./checkbox.html"></template>
<script lang="ts" setup>
import { unref, computed, inject, ref } from "vue";
import {
  CHECKBOX_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  getCheckboxAttrs,
  getCheckboxIconAttrs,
  type AppProviderState,
  type CheckboxEvent,
  type CheckboxProps,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<CheckboxProps>(), {
  ...CHECKBOX_DEFAULT_PROPS,
});
const emit = defineEmits<CheckboxEvent>();
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Reactive state
// ----------------------------------------------------------------------------
const isFocused = ref(false);

// Computed properties
// ----------------------------------------------------------------------------
const checkboxAttrs = computed(() => {
  const baseRole = unref(appState?.role) || "";
  const role = props.role || baseRole;
  const shape = props.shape || unref(appState?.shape) || "";
  const shadow = (props?.shadow !== undefined ? props.shadow : unref(appState?.shadow)) ?? false;
  return getCheckboxAttrs({
    role,
    shape,
    size: props.size,
    variant: props.variant,
    modelValue: props.modelValue,
    disabled: props.disabled,
    readonly: props.readonly,
    shadow: shadow && !props.disabled && isFocused.value,
    focus: isFocused.value,
  });
});

const checkboxIconAttrs = getCheckboxIconAttrs();

// Methods
// ----------------------------------------------------------------------------
const onCheckbox = () => {
  if (props.disabled || props.readonly) return;
  emit("update:modelValue", !props.modelValue);
};

const onFocus = () => {
  if (props.disabled || props.readonly) return;
  isFocused.value = true;
  emit("focus");
};

const onBlur = () => {
  if (props.disabled || props.readonly) return;
  isFocused.value = false;
  emit("blur");
};

const onKeydown = (e: KeyboardEvent) => {
  if (e.key !== " " && e.key !== "Enter") return;
  e.preventDefault();
  onCheckbox();
};
</script>
