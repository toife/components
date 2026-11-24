<style lang="scss" src="@/core/features/text-field/text-field.scss" scoped></style>
<template src="./text-field.html"></template>
<script lang="ts" setup>
import { unref, computed, inject, ref, watch } from "vue";
import { Field } from "../field";
import {
  TEXT_FIELD_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  getTextFieldAttrs,
  getTextFieldContentAttrs,
  getTextFieldInputAttrs,
  type AppProviderState,
  type TextFieldEvent,
  type TextFieldProps,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<TextFieldProps>(), {
  ...TEXT_FIELD_DEFAULT_PROPS,
});
const emit = defineEmits<TextFieldEvent>();
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Reactive state
// ----------------------------------------------------------------------------
const isFocus = ref(false);
const content = ref("");

// Computed properties
// ----------------------------------------------------------------------------
const textFieldAttrs = computed(() => {
  const role = props.role || unref(appState?.role) || "";
  const shape = props.shape || unref(appState?.shape) || "";
  const direction = props.direction || unref(appState?.direction) || "left";

  return getTextFieldAttrs({
    role,
    shape,
    size: props.size,
    direction,
    variant: props.variant,
    type: props.type,
    disabled: props.disabled,
    focus: isFocus.value,
    readonly: props.readonly,
    line: Number(props.line),
    maxLine: props.maxLine !== undefined ? Number(props.maxLine) : undefined,
  });
});

const rawContent = computed(() => {
  const model = props.modelValue;
  if (model !== null && model !== undefined && model !== "") {
    return String(model);
  }
  const value = props.value;
  if (value !== null && value !== undefined && value !== "") {
    return String(value);
  }
  return "";
});

const textFieldContentAttrs = computed(() => getTextFieldContentAttrs());

const textFieldInputAttrs = computed(() => ({
  ...getTextFieldInputAttrs(),
  name: props.name,
  id: props.id,
  placeholder: props.placeholder,
  autocomplete: props.autocomplete,
  type: props.type,
  readonly: props.readonly,
  disabled: props.disabled,
  maxlength: props.maxLength,
  tabindex: props.tabindex,
}));

// Methods
// ----------------------------------------------------------------------------
const onFocus = (ev: FocusEvent) => {
  if (props.disabled) return;
  isFocus.value = true;
  emit("focus", ev);
};

const onBlur = (ev: FocusEvent) => {
  if (props.disabled) return;
  isFocus.value = false;
  emit("blur", ev);
};

const onInput = (ev: Event) => {
  emit("input", ev);
};

const onBeforeinput = (ev: Event) => {
  emit("beforeinput", ev);
};

watch(
  () => rawContent.value,
  (value) => {
    content.value = value.toString();
  },
  { immediate: true }
);

watch(
  () => content.value,
  (value) => {
    emit("update:modelValue", value.toString());
  }
);
</script>
