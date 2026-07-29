<style lang="scss" src="@/core/features/form-group/form-group.scss" scoped></style>
<template src="./form-group.html"></template>
<script lang="ts" setup>
import { computed } from "vue";
import { FORM_GROUP_DEFAULT_PROPS, getFormGroupAttrs, type FormGroupProps } from "@/core";
// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<FormGroupProps>(), {
  ...FORM_GROUP_DEFAULT_PROPS,
});

// Computed properties
// ----------------------------------------------------------------------------
const formGroupAttrs = computed(() => getFormGroupAttrs({ direction: props.direction }));
</script>
