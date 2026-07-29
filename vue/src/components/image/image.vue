<template src="./image.html"></template>
<script setup lang="ts">
import { unref, ref, watch, computed, inject } from "vue";
import { APP_PROVIDER_STATE_KEY, type AppProviderState, type ImageProps } from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = defineProps<ImageProps>();
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Reactive state
// ----------------------------------------------------------------------------
// Initialize from src to avoid an empty src flash before mount
const dataSrc = ref<string>(props.src ?? "");
const defaultSrc = computed(() => props.defaultSrc ?? unref(appState?.data)?.errorImageUrl ?? "");

// Methods
// ----------------------------------------------------------------------------
const handleError = () => {
  if (defaultSrc.value) {
    dataSrc.value = defaultSrc.value as string;
  }
};

watch(
  () => props.src,
  (newVal) => {
    dataSrc.value = newVal ?? "";
  }
);
</script>
