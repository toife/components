<style lang="scss" src="@/core/features/tabs/tabs.scss" scoped></style>
<template src="./tabs.html"></template>
<script lang="ts" setup>
import {
  unref,
  computed,
  inject,
  nextTick,
  onMounted,
  onUnmounted,
  provide,
  ref,
  watch,
} from "vue";
import {
  TABS_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  TABS_PROVIDER_STATE_KEY,
  getTabsAttrs,
  getTabsHighlightPosition,
  getTabsHighlightStyle,
  type AppProviderState,
  type TabsEvent,
  type TabsProps,
  type TabsProviderState,
} from "@/core";
import type { ProviderStateRefs } from "../../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<TabsProps>(), {
  ...TABS_DEFAULT_PROPS,
});
const emit = defineEmits<TabsEvent>();
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Reactive state
// ----------------------------------------------------------------------------
const width = ref(0);
const height = ref(0);
const top = ref(0);
const left = ref(0);
const container = ref();
const isFirstRender = ref(true);

// Computed properties
// ----------------------------------------------------------------------------
const role = computed(() => {
  return props.role || unref(appState?.role) || "";
});

const shape = computed(() => {
  return props.shape || unref(appState?.shape) || "";
});

const size = computed(() => {
  return props.size;
});

const activeValue = computed(() => {
  return props.modelValue || "";
});

const tabsAttrs = computed(() => {
  const highlight = getTabsHighlightPosition({
    top: top.value,
    left: left.value,
    width: width.value,
    height: height.value,
    margin: props.margin,
    border: props.border,
    variant: props.variant,
    placement: props.placement,
  });

  return {
    ...getTabsAttrs({
      role: role.value,
      shape: shape.value,
      placement: props.placement,
      variant: props.variant,
      transition: isFirstRender.value ? false : props.transition,
    }),
    style: getTabsHighlightStyle({
      top: highlight.top,
      left: highlight.left,
      width: highlight.width,
      height: highlight.height,
      marginX: props.margin[1],
      marginY: props.margin[0],
    }),
  };
});

// Methods
// ----------------------------------------------------------------------------
const calcPosition = () => {
  let active = container.value.querySelector(".active");
  if (active) {
    width.value = active.offsetWidth;
    height.value = active.offsetHeight;
    left.value =
      active.getBoundingClientRect().left -
      container.value.getBoundingClientRect().left +
      container.value.scrollLeft;
    top.value =
      active.getBoundingClientRect().top -
      container.value.getBoundingClientRect().top +
      container.value.scrollTop;
  }
};

const checkRender = async () => {
  await nextTick();
  calcPosition();
};

// Lifecycle
// ----------------------------------------------------------------------------
watch(
  () => props.modelValue,
  () => {
    checkRender();
  }
);

onMounted(() => {
  checkRender();
  window.addEventListener("resize", calcPosition);

  setTimeout(() => {
    isFirstRender.value = false;
  }, 500);
});

onUnmounted(() => {
  window.removeEventListener("resize", calcPosition);
});

// Provide / expose (public API)
// ----------------------------------------------------------------------------
provide<ProviderStateRefs<TabsProviderState>>(TABS_PROVIDER_STATE_KEY, {
  activeValue,
  role,
  shape,
  size,
  setValue: (val: unknown) => {
    emit("update:modelValue", val as string);
  },
});
</script>
