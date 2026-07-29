<style lang="scss" src="@/core/features/layout/grid.scss" scoped></style>
<template src="./grid.html"></template>
<script lang="ts" setup>
import { computed } from "vue";
import { GRID_DEFAULT_PROPS, getGridAttrs, type GridProps } from "@/core";
// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<GridProps>(), {
  ...GRID_DEFAULT_PROPS,
});

// Computed properties
// ----------------------------------------------------------------------------
const gridAttrs = computed(() => getGridAttrs(props.options));
</script>
