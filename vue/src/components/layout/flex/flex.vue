<style lang="scss" src="@/core/features/layout/flex.scss" scoped></style>
<template src="./flex.html"></template>
<script lang="ts" setup>
import { computed } from "vue";
import { FLEX_DEFAULT_PROPS, getFlexAttrs, type FlexProps } from "@/core";
// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<FlexProps>(), {
  ...FLEX_DEFAULT_PROPS,
});

// Computed properties
// ----------------------------------------------------------------------------
const flexAttrs = computed(() => getFlexAttrs(props.options));
</script>
