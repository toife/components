<style lang="scss" src="@/core/features/card/card-footer.scss"></style>
<template src="./card-footer.html"></template>
<script lang="ts" setup>
import { computed, inject, unref } from "vue";
import { CARD_PROVIDER_STATE_KEY, getCardFooterAttrs, type CardProviderState } from "@/core";
import type { ProviderStateRefs } from "../../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const cardProviderState = inject<ProviderStateRefs<CardProviderState>>(CARD_PROVIDER_STATE_KEY);

// Computed properties
// ----------------------------------------------------------------------------
const cardFooterAttrs = computed(() => {
  const divider = unref(cardProviderState?.divider) ?? false;
  return getCardFooterAttrs({ divider });
});
</script>
