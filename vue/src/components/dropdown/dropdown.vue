<style lang="scss" src="@/core/features/dropdown/dropdown.scss" scoped></style>
<template src="./dropdown.html"></template>
<script lang="ts" setup>
import { unref, computed, inject, onMounted, onUnmounted, ref, watch } from "vue";
import {
  DROPDOWN_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  getDropdownAttrs,
  getDropdownPanelAttrs,
  type AppProviderState,
  type DropdownEvent,
  type DropdownProps,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<DropdownProps>(), {
  ...DROPDOWN_DEFAULT_PROPS,
});
const emit = defineEmits<DropdownEvent>();
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Reactive state
// ----------------------------------------------------------------------------
const rootRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);

// Computed properties
// ----------------------------------------------------------------------------
const wrapperAttrs = computed(() => {
  const role = props.role ?? unref(appState?.role) ?? "";
  const shape = props.shape ?? unref(appState?.shape) ?? "";

  return getDropdownAttrs({
    role,
    shape,
    size: props.size,
    open: isOpen.value,
    disabled: props.disabled,
  });
});

const panelAttrs = computed(() => getDropdownPanelAttrs({ placement: props.placement }));

// Methods
// ----------------------------------------------------------------------------
const toggle = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
  emit("update:modelValue", isOpen.value);
};

const close = () => {
  if (!isOpen.value) return;
  isOpen.value = false;
  emit("update:modelValue", false);
};

const onDocPointerDown = (e: PointerEvent) => {
  if (!isOpen.value) return;
  const root = rootRef.value;
  if (root && !root.contains(e.target as Node)) {
    close();
  }
};

const onDocKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && isOpen.value) {
    e.preventDefault();
    close();
  }
};

// Lifecycle
// ----------------------------------------------------------------------------
watch(
  () => props.modelValue,
  (open) => {
    isOpen.value = open;
  },
  { immediate: true }
);

watch(isOpen, (next, prev) => {
  if (next && !prev) emit("open");
  if (!next && prev) emit("close");
});

onMounted(() => {
  document.addEventListener("pointerdown", onDocPointerDown, true);
  document.addEventListener("keydown", onDocKeydown, true);
});

onUnmounted(() => {
  document.removeEventListener("pointerdown", onDocPointerDown, true);
  document.removeEventListener("keydown", onDocKeydown, true);
});
</script>
