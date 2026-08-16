<style lang="scss" src="@/core/features/switch/switch.scss" scoped></style>
<template src="./switch.html"></template>
<script lang="ts" setup>
import { unref, computed, inject, ref, onMounted } from "vue";
import {
  SWITCH_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  getSwitchAttrs,
  getSwitchIconAttrs,
  getSwitchWrapperAttrs,
  type AppProviderState,
  type SwitchEvent,
  type SwitchProps,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<SwitchProps>(), {
  ...SWITCH_DEFAULT_PROPS,
});
const emit = defineEmits<SwitchEvent>();
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Reactive state
// ----------------------------------------------------------------------------
const isFocused = ref(false);
const isFirstRender = ref(true);

// Computed properties
// ----------------------------------------------------------------------------
const switchWrapperAttrs = computed(() => {
  return getSwitchWrapperAttrs({
    disabled: props.disabled,
    readonly: props.readonly,
    focus: isFocused.value,
    modelValue: props.modelValue,
    transition: !isFirstRender.value,
    bounce: props.bounce,
  });
});

const switchAttrs = computed(() => {
  const shape = props.shape || unref(appState?.shape) || "";
  const baseRole = unref(appState?.role) || "";
  const role = props.role || baseRole;
  return getSwitchAttrs({
    role,
    shape,
    size: props.size,
  });
});

const switchIconAttrs = getSwitchIconAttrs();

// Methods
// ----------------------------------------------------------------------------
const onSwitch = () => {
  if (props.disabled || props.readonly) return;
  emit("update:modelValue", !props.modelValue);
};

const onFocus = () => {
  if (props.disabled || props.readonly) return;
  isFocused.value = true;
};

const onBlur = () => {
  if (props.disabled || props.readonly) return;
  isFocused.value = false;
};

const onKeydown = (e: KeyboardEvent) => {
  if (e.key !== " " && e.key !== "Enter") return;
  e.preventDefault();
  onSwitch();
};

onMounted(() => {
  setTimeout(() => {
    isFirstRender.value = false;
  }, 500);
});
</script>
