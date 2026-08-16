<style lang="scss" src="@/core/features/app/app.scss" scoped></style>
<template src="./app.html"></template>
<script lang="ts" setup>
import { computed, provide, ref, toRefs, type Ref } from "vue";
import { Toast } from "../toast";
import { Action, useAction } from "../action";
import { DecisionModal, useDecisionModal } from "../decision-modal";
import {
  APP_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  getAppAttrs,
  type AppProps,
  type AppProviderState,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<AppProps>(), {
  ...APP_DEFAULT_PROPS,
});
const { shape, divider, role, triple, direction, data } = toRefs(props);
const decisionModal = useDecisionModal();
const action = useAction();
const rootEl = ref<HTMLElement>();

// Computed properties
// ----------------------------------------------------------------------------
// Root layout classes for the application shell (global theme layer)
const appAttrs = computed(() => getAppAttrs({ shape: shape.value }));

// Provide / expose (public API)
// ----------------------------------------------------------------------------
// Theme tokens for child components (shape, role, navigation direction)
provide<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY, {
  shape,
  divider,
  role,
  triple,
  direction,
  rootEl: rootEl as Ref<HTMLElement | undefined>,
  data,
});
</script>
