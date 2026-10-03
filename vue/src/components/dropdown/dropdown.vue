<style lang="scss" src="@/core/features/dropdown/dropdown.scss" scoped></style>
<template src="./dropdown.html"></template>
<script lang="ts" setup>
import { unref, computed, inject, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
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
const panelRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const currentPlacement = ref<string>(props.placement);

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
    placement: currentPlacement.value
  });
});

const panelAttrs = computed(() => getDropdownPanelAttrs({}));

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

// Flip vertical/horizontal side when the panel doesn't fit on the preferred side
const updatePlacement = () => {
  const root = rootRef.value;
  const panel = panelRef.value;
  if (!root || !panel) return;

  const rect = root.getBoundingClientRect();
  const panelHeight = panel.offsetHeight;
  const spaceBelow = window.innerHeight - rect.bottom;
  const spaceAbove = rect.top;
  const [side, align] = props.placement.split("-");

  let nextSide = side;
  if (side === "bottom" && spaceBelow < panelHeight && spaceAbove > spaceBelow) nextSide = "top";
  else if (side === "top" && spaceAbove < panelHeight && spaceBelow > spaceAbove) nextSide = "bottom";

  // "start" extends right from the trigger's left edge, "end" extends left from its right edge
  const panelWidth = panel.offsetWidth;
  const overflowStart = Math.max(0, rect.left + panelWidth - window.innerWidth);
  const overflowEnd = Math.max(0, panelWidth - rect.right);

  let nextAlign = align;
  if (align === "start" && overflowStart > 0 && overflowEnd < overflowStart) nextAlign = "end";
  else if (align === "end" && overflowEnd > 0 && overflowStart < overflowEnd) nextAlign = "start";

  currentPlacement.value = `${nextSide}-${nextAlign}`;
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

watch(
  () => props.placement,
  (placement) => {
    currentPlacement.value = placement;
    if (isOpen.value) nextTick(updatePlacement);
  }
);

watch(isOpen, (next, prev) => {
  if (next) {
    currentPlacement.value = props.placement;
    nextTick(updatePlacement);
    window.addEventListener("resize", updatePlacement);
    window.addEventListener("scroll", updatePlacement, true);
  } else {
    window.removeEventListener("resize", updatePlacement);
    window.removeEventListener("scroll", updatePlacement, true);
  }
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
  window.removeEventListener("resize", updatePlacement);
  window.removeEventListener("scroll", updatePlacement, true);
});
</script>
