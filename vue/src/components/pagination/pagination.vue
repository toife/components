<style lang="scss" src="@/core/features/pagination/pagination.scss" scoped></style>
<template src="./pagination.html"></template>
<script lang="ts" setup>
import { unref, computed, inject, ref } from "vue";
import { Button } from "../button";
import {
  PAGINATION_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  clampPaginationPage,
  getPaginationAttrs,
  getPaginationEllipsisAttrs,
  getPaginationItemAttrs,
  getPaginationItems,
  type AppProviderState,
  type PaginationEvent,
  type PaginationProps,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<PaginationProps>(), {
  ...PAGINATION_DEFAULT_PROPS,
});
const emit = defineEmits<PaginationEvent>();
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Reactive state
// ----------------------------------------------------------------------------
const keepValue = ref(1);

// Computed properties
// ----------------------------------------------------------------------------
const pageLength = computed(() => Math.max(1, Math.floor(props.length)));

const currentPage = computed(() => {
  const source =
    props.modelValue !== undefined
      ? props.modelValue
      : props.value !== undefined
        ? props.value
        : keepValue.value;

  return clampPaginationPage(source, pageLength.value);
});

const items = computed(() =>
  getPaginationItems({
    current: currentPage.value,
    length: pageLength.value,
    siblings: props.siblings,
    boundaries: props.boundaries,
  }),
);

const paginationAttrs = computed(() => {
  const direction = props.direction || unref(appState?.direction) || "left";

  return getPaginationAttrs({
    direction,
    size: props.size,
    disabled: props.disabled,
  });
});

const buttonAttrs = computed(() => {
  const role = props.role || unref(appState?.role) || "";
  const shape = props.shape || unref(appState?.shape) || "";

  return {
    role,
    shape,
    size: props.size,
    ...getPaginationItemAttrs({ active: false }),
  };
});

const ellipsisAttrs = getPaginationEllipsisAttrs();

// Methods
// ----------------------------------------------------------------------------
const setPage = (page: number) => {
  if (props.disabled) return;
  const next = clampPaginationPage(page, pageLength.value);
  if (next === currentPage.value) return;

  keepValue.value = next;
  emit("update:modelValue", next);
  emit("change", next);
};
</script>
