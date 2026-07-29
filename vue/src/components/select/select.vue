<style lang="scss" src="@/core/features/select/select.scss" scoped></style>
<template src="./select.html"></template>
<script lang="ts" setup>
import { unref, computed, inject, ref } from "vue";
import { Field } from "../field";
import { Dropdown } from "../dropdown";
import {
  SELECT_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  getSelectAttrs,
  getSelectIconAttrs,
  getSelectMessageAttrs,
  getSelectOptionAttrs,
  type AppProviderState,
  type SelectEvent,
  type SelectOption,
  type SelectProps,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<SelectProps>(), {
  ...SELECT_DEFAULT_PROPS,
});
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);
const emit = defineEmits<SelectEvent>();
const visible = ref(false);

// Computed properties
// ----------------------------------------------------------------------------
const role = computed(() => {
  return props.role || unref(appState?.role) || "";
});

const direction = computed(() => {
  return props.direction || unref(appState?.direction) || "left";
});

const shadow = computed(() => {
  return props.shadow || unref(appState?.shadow) || false;
});

const shape = computed(() => {
  return props.shape || unref(appState?.shape) || "";
});

const selectAttrs = computed(() =>
  getSelectAttrs({
    role: role.value,
    direction: direction.value,
    size: props.size,
    disabled: props.disabled,
  })
);

const dropdownAttrs = computed(() => {
  return {
    role: role.value,
    direction: direction.value,
    shadow: shadow.value,
    shape: shape.value,
    disabled: props.disabled,
  };
});

const fieldAttrs = computed(() => {
  const propsValue = props.modelValue || props.value;
  let val: string[] = [];
  if (propsValue) val = typeof propsValue === "string" ? [propsValue] : (propsValue as string[]);
  const values: string[] = props.options
    .filter((option): option is SelectOption => (val || []).includes(option.value))
    .map((option) => option.label ?? option.value);

  return {
    modelValue: values.join(","),
    size: props.size,
    variant: props.variant,
    placeholder: props.placeholder,
    direction: direction.value,
    role: role.value,
    shape: shape.value,
    readonly: true,
    disabled: props.disabled,
    shadow: shadow.value,
  };
});

const selectIconAttrs = computed(() => getSelectIconAttrs());
const selectOptionAttrs = computed(() => getSelectOptionAttrs());
const selectMessageAttrs = computed(() => getSelectMessageAttrs());

// Methods
// ----------------------------------------------------------------------------
const pickOption = (option: SelectOption) => {
  if (option.disabled || option.value === undefined) return;
  emit("update:modelValue", option.value);
  emit("select", option);
  visible.value = false;
};
</script>
