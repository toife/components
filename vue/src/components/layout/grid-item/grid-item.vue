<style lang="scss" src="@/core/features/layout/grid-item.scss" scoped></style>
<template src="./grid-item.html"></template>
<script lang="ts" setup>
import { computed } from "vue";
import { GRID_ITEM_DEFAULT_PROPS, getGridItemAttrs, type GridItemProps } from "@/core";
const props = withDefaults(defineProps<GridItemProps>(), {
  ...GRID_ITEM_DEFAULT_PROPS,
});

const gridItemAttrs = computed(() => getGridItemAttrs(props.options));
</script>
