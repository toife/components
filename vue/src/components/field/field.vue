<style lang="scss" src="@/core/features/field/field.scss" scoped></style>
<template src="./field.html"></template>
<script lang="ts" setup>
import { computed } from "vue";
import {
  FIELD_DEFAULT_PROPS,
  getFieldAttrs,
  getFieldHintAttrs,
  getFieldMessageAttrs,
  type FieldProps,
} from "@/core";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<FieldProps>(), {
  ...FIELD_DEFAULT_PROPS,
});

// Computed properties
// ----------------------------------------------------------------------------
const fieldAttrs = computed(() => getFieldAttrs());
const messageAttrs = computed(() => getFieldMessageAttrs());
const hintAttrs = computed(() => getFieldHintAttrs());
</script>
