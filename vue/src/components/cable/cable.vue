<style lang="scss" src="@/core/features/cable/cable.scss" scoped></style>
<template src="./cable.html"></template>
<script lang="ts" setup>
import { computed, provide, toRefs } from "vue";
import {
  CABLE_DEFAULT_PROPS,
  CABLE_PROVIDER_STATE_KEY,
  getCableAttrs,
  type CableProps,
  type CableProviderState,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<CableProps>(), {
  ...CABLE_DEFAULT_PROPS,
});

// Reactive state
// ----------------------------------------------------------------------------
const { placement } = toRefs(props);

// Computed properties
// ----------------------------------------------------------------------------
const cableAttrs = computed(() => getCableAttrs({ placement: placement.value }));

// Provide / expose (public API)
// ----------------------------------------------------------------------------
provide<ProviderStateRefs<CableProviderState>>(CABLE_PROVIDER_STATE_KEY, {
  placement,
});
</script>
