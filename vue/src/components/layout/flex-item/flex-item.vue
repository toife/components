<style lang="scss" src="@/core/features/layout/flex-item.scss" scoped></style>
<template src="./flex-item.html"></template>
<script lang="ts" setup>
import { computed } from "vue";
import { FLEX_ITEM_DEFAULT_PROPS, getFlexItemAttrs, type FlexItemProps } from "@/core";
const props = withDefaults(defineProps<FlexItemProps>(), {
  ...FLEX_ITEM_DEFAULT_PROPS,
});

const flexItemAttrs = computed(() => getFlexItemAttrs(props.options));
</script>
