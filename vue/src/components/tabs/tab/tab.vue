<template src="./tab.html"></template>
<style lang="scss" src="@/core/features/tabs/tab.scss" scoped></style>
<script lang="ts" setup>
import { computed, inject, unref } from "vue";
import {
  TAB_DEFAULT_PROPS,
  TABS_PROVIDER_STATE_KEY,
  getTabAttrs,
  getTabButtonAttrs,
  type TabProps,
  type TabsProviderState,
} from "@/core";
import type { ProviderStateRefs } from "../../../shared/provider-state";
// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<TabProps>(), {
  ...TAB_DEFAULT_PROPS,
});
const tabsState = inject<ProviderStateRefs<TabsProviderState>>(TABS_PROVIDER_STATE_KEY);

// Computed properties
// ----------------------------------------------------------------------------
const shape = computed(() => unref(tabsState?.shape) || "");
const size = computed(() => unref(tabsState?.size) || "standard");
const isActive = computed(() => unref(tabsState?.activeValue) === props.value);
const tabAttrs = computed(() => getTabAttrs({ active: isActive.value }));
const buttonAttrs = computed(() => getTabButtonAttrs({ shape: shape.value, size: size.value }));
// Methods
// ----------------------------------------------------------------------------
const handleClick = () => {
  if (props.disabled) return;
  tabsState?.setValue(props.value || "");
};
</script>
