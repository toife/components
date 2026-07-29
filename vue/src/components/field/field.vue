<style lang="scss" src="@/core/features/field/field.scss" scoped></style>
<template src="./field.html"></template>
<script lang="ts" setup>
import { unref, computed, inject, nextTick, onMounted, ref, watch } from "vue";
import {
  FIELD_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  getFieldAttrs,
  getFieldContentAttrs,
  getFieldInputAttrs,
  getFieldMessageAttrs,
  type AppProviderState,
  type FieldEvent,
  type FieldProps,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<FieldProps>(), {
  ...FIELD_DEFAULT_PROPS,
});
const emit = defineEmits<FieldEvent>();
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Reactive state
// ----------------------------------------------------------------------------
const isFocus = ref(false);
const caret = ref(0);
const content = ref("");

// Computed properties
// ----------------------------------------------------------------------------
const fieldAttrs = computed(() => {
  const role = props.role || unref(appState?.role) || "";
  const shape = props.shape || unref(appState?.shape) || "";
  const shadow = (props?.shadow !== undefined ? props.shadow : unref(appState?.shadow)) ?? false;
  const direction = props.direction || unref(appState?.direction) || "left";

  return getFieldAttrs({
    role,
    shape,
    size: props.size,
    direction,
    variant: props.variant,
    type: props.type,
    disabled: props.disabled,
    focus: isFocus.value,
    shadow,
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

const fieldContentAttrs = computed(() => getFieldContentAttrs());

const fieldInputAttrs = computed(() => ({
  ...getFieldInputAttrs(),
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

const fieldMessageAttrs = computed(() => getFieldMessageAttrs());

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
