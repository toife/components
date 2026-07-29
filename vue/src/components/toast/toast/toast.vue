<style lang="scss" src="@/core/features/toast/toast.scss" scoped></style>
<template src="./toast.html"></template>
<script lang="ts" setup>
import { computed } from "vue";
import { useToast } from "../toast.composable";
import { ToastContent } from "../toast-content";
import { TOAST_DEFAULT_PROPS, getToastAttrs, type ToastProps } from "@/core";
// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<ToastProps>(), {
  ...TOAST_DEFAULT_PROPS,
});
const toast = useToast();

// Computed properties
// ----------------------------------------------------------------------------
const toastAttrs = computed(() => getToastAttrs({ placement: props.placement }));

const toastMessages = computed(() => {
  return toast.messages.value.filter((item) => item.placement == props.placement);
});

// Methods
// ----------------------------------------------------------------------------
const dismiss = (id: number) => {
  toast.close(id);
};
</script>
