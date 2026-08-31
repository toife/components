<style lang="scss" src="@/core/features/progress/progress.scss" scoped></style>
<template src="./progress.html"></template>
<script lang="ts" setup>
import { unref, computed, inject } from "vue";
import {
  PROGRESS_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  getProgressAttrs,
  getProgressBarAttrs,
  getProgressCircleBarAttrs,
  getProgressCircleTrackAttrs,
  getProgressLabelAttrs,
  getProgressPercent,
  getProgressSvgAttrs,
  getProgressTrackAttrs,
  type AppProviderState,
  type ProgressProps,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";
// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<ProgressProps>(), {
  ...PROGRESS_DEFAULT_PROPS,
});
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Computed properties
// ----------------------------------------------------------------------------
const percent = computed(() => getProgressPercent(props.value, props.max));

const progressAttrs = computed(() => {
  const shape = props.shape || unref(appState?.shape) || "";
  const role = props.role || unref(appState?.role) || "";

  return getProgressAttrs({
    role,
    shape,
    size: props.size,
    variant: props.variant,
    indeterminate: props.indeterminate,
    percent: percent.value,
  });
});

const trackAttrs = getProgressTrackAttrs();
const barAttrs = getProgressBarAttrs();
const svgAttrs = getProgressSvgAttrs();
const circleTrackAttrs = getProgressCircleTrackAttrs();
const circleBarAttrs = getProgressCircleBarAttrs();
const labelAttrs = getProgressLabelAttrs();
</script>
