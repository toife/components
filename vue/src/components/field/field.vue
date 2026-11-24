<style lang="scss" src="@/core/features/field/field.scss" scoped></style>
<template src="./field.html"></template>
<script lang="ts" setup>
import { computed, useAttrs } from "vue";
import {
  FIELD_DEFAULT_PROPS,
  getFieldAttrs,
  getFieldHelpAttrs,
  getFieldMessageAttrs,
  type FieldProps,
} from "@/core";

defineOptions({ inheritAttrs: false });

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
withDefaults(defineProps<FieldProps>(), {
  ...FIELD_DEFAULT_PROPS,
});
const attrs = useAttrs();

// Computed properties
// ----------------------------------------------------------------------------
const fieldAttrs = computed(() => getFieldAttrs({ ...attrs }));
const messageAttrs = computed(() => getFieldMessageAttrs());
const helpAttrs = computed(() => getFieldHelpAttrs());
</script>
