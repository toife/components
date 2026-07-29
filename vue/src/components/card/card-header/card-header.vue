<style lang="scss" src="@/core/features/card/card-header.scss"></style>
<template src="./card-header.html"></template>
<script lang="ts" setup>
import { computed, inject, unref } from "vue";
import { CARD_PROVIDER_STATE_KEY, getCardHeaderAttrs, type CardProviderState } from "@/core";
import type { ProviderStateRefs } from "../../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const cardProviderState = inject<ProviderStateRefs<CardProviderState>>(CARD_PROVIDER_STATE_KEY);

// Computed properties
// ----------------------------------------------------------------------------
const cardHeaderAttrs = computed(() => {
  const divider = unref(cardProviderState?.divider) ?? false;
  return getCardHeaderAttrs({ divider });
});
</script>
