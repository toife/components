<style lang="scss" src="@/core/features/tooltip/tooltip.scss" scoped></style>
<template src="./tooltip.html"></template>
<script lang="ts" setup>
import { unref, computed, inject, ref } from "vue";
import {
  TOOLTIP_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  getTooltipAttrs,
  getTooltipContentAttrs,
  getTooltipTriggerAttrs,
  type AppProviderState,
  type TooltipProps,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<TooltipProps>(), {
  ...TOOLTIP_DEFAULT_PROPS,
});
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Reactive state
// ----------------------------------------------------------------------------
const rootRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);
const visible = ref(false);

// Computed properties
// ----------------------------------------------------------------------------
const wrapperAttrs = computed(() => {
  const role = props.role ?? unref(appState?.role) ?? "";
  const shape = props.shape ?? unref(appState?.shape) ?? "";

  return getTooltipAttrs({
    role,
    shape,
    size: props.size,
    disabled: props.disabled,
  });
});

const contentAttrs = computed(() => getTooltipContentAttrs({ placement: props.placement }));
const triggerAttrs = getTooltipTriggerAttrs();

// Methods
// ----------------------------------------------------------------------------
const show = () => {
  if (props.disabled) return;
  visible.value = true;
};

const hide = () => {
  visible.value = false;
};

const onFocusOut = (event: FocusEvent) => {
  const root = rootRef.value;
  const next = event.relatedTarget as Node | null;
  if (root && next && root.contains(next)) return;
  hide();
};
</script>
