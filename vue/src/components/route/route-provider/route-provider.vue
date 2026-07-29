<template src="./route-provider.html"></template>
<script lang="ts" setup>
import { provide, computed } from "vue";
import {
  ROUTE_PROVIDER_STATE_KEY,
  type RouteProviderProps,
  type RouteProviderState,
} from "@/core";
import type { ProviderStateRefs } from "../../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = defineProps<RouteProviderProps>();

// Computed properties
// ----------------------------------------------------------------------------
const stack = computed(() => props.stack);

// Provide / expose (public API)
// ----------------------------------------------------------------------------
provide<ProviderStateRefs<RouteProviderState>>(ROUTE_PROVIDER_STATE_KEY, {
  stack,
});
</script>
