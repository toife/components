<style lang="scss" src="@/core/features/collapse/collapse.scss" scoped></style>
<template src="./collapse.html"></template>
<script lang="ts" setup>
import { unref, computed, inject, nextTick, onMounted, ref, watch } from "vue";
import {
  COLLAPSE_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  getCollapseAttrs,
  getCollapseContentAttrs,
  getCollapseContentInnerClass,
  getCollapseTriggerAttrs,
  type AppProviderState,
  type CollapseEvent,
  type CollapseProps,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<CollapseProps>(), {
  ...COLLAPSE_DEFAULT_PROPS,
});
const emit = defineEmits<CollapseEvent>();
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Reactive state
// ----------------------------------------------------------------------------
const contentRef = ref<HTMLElement | null>(null);
const contentHeight = ref(0);
const isOpen = ref(false);
const isFirstOpen = ref(true);

// Computed properties
// ----------------------------------------------------------------------------
const role = computed(() => {
  return props.role ?? unref(appState?.role) ?? "";
});

const durationCss = computed(() =>
  props.duration !== undefined ? `${props.duration / 1000}s` : undefined
);

const wrapperAttrs = computed(() =>
  getCollapseAttrs({
    role: role.value,
    open: isOpen.value,
    disabled: props.disabled,
  })
);

const triggerAttrs = computed(() =>
  getCollapseTriggerAttrs({
    open: isOpen.value,
    disabled: props.disabled,
  })
);

const contentAttrs = computed(() =>
  getCollapseContentAttrs({
    transition: !isFirstOpen.value,
    duration: durationCss.value,
    height: isOpen.value ? `${contentHeight.value}px` : "0px",
  })
);

const contentInnerClass = computed(() => getCollapseContentInnerClass());

// Methods
// ----------------------------------------------------------------------------
const measureContent = () => {
  if (contentRef.value) {
    contentHeight.value = contentRef.value.scrollHeight;
  }
};

const toggle = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
  emit("update:modelValue", isOpen.value);
};

const onTransitionEnd = () => {
  // Optional: hook for transition end (e.g. a11y)
};

// Lifecycle
// ----------------------------------------------------------------------------
watch(
  () => props.modelValue,
  async (open) => {
    isOpen.value = open;
    if (open) {
      await nextTick();
      measureContent();
      isFirstOpen.value = false;
    }
  },
  { immediate: true }
);

watch(
  () => contentRef.value,
  (el) => {
    if (el && isOpen.value) {
      measureContent();
    }
  }
);

watch(
  () => [contentRef.value?.innerHTML, isOpen.value],
  async () => {
    if (isOpen.value) {
      await nextTick();
      measureContent();
    }
  }
);

onMounted(async () => {
  await nextTick();
  if (isOpen.value) {
    measureContent();
  }
});
</script>
