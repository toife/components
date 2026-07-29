<style lang="scss" src="@/core/features/slide-range/slide-range.scss" scoped></style>
<template src="./slide-range.html"></template>
<script lang="ts" setup>
import { gesture } from "@toife/gesture";
import { computed, inject, onMounted, onUnmounted, ref, unref } from "vue";
import {
  SLIDE_RANGE_DEFAULT_PROPS,
  APP_PROVIDER_STATE_KEY,
  getSlideRangeAttrs,
  getSlideRangeTickAttrs,
  getSlideRangeThumbAttrs,
  getSlideRangeThumbInnerAttrs,
  getSlideRangeTooltipAttrs,
  getSlideRangeTrackBackAttrs,
  getSlideRangeTrackBodyAttrs,
  getSlideRangeTrackContainerAttrs,
  getSlideRangeTrackFrontAttrs,
  type AppProviderState,
  type SlideRangeEvent,
  type SlideRangeProps,
  type SlideRangeValue,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<SlideRangeProps>(), {
  ...SLIDE_RANGE_DEFAULT_PROPS,
});
const emit = defineEmits<SlideRangeEvent>();
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Reactive state
// ----------------------------------------------------------------------------
const point = ref<HTMLElement | null>(null);
const container = ref<HTMLElement | null>(null);
const isShowTooltip = ref(false);
let tooltipTimeout: ReturnType<typeof setTimeout> | undefined;
let gestureCleanup: { destroy: () => void } | null = null;
let dragStartPercent = 0;
let isHorizontalDrag = false;

const suppressPointerEvent = (ev?: Event) => {
  if (!ev) return;
  ev.stopPropagation();
};

const isHorizontalDirection = (direction?: string) => direction === "left" || direction === "right";

const parseRangeValue = (value: SlideRangeValue | undefined, fallback: number): number => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);
    return Number.isNaN(parsed) ? fallback : parsed;
  }
  return fallback;
};

// Computed properties
// ----------------------------------------------------------------------------
const rangeMin = computed(() => parseRangeValue(props.min, 0));
const rangeMax = computed(() => parseRangeValue(props.max, 100));
const rangeStep = computed(() => {
  const step = parseRangeValue(props.step, 1);
  return step > 0 ? step : 1;
});

const snapToStep = (rawValue: number) => {
  const min = rangeMin.value;
  const max = rangeMax.value;
  const stepSize = rangeStep.value;
  if (max <= min) return min;
  const clamped = Math.max(min, Math.min(max, rawValue));
  const stepIndex = Math.round((clamped - min) / stepSize);
  return Math.max(min, Math.min(max, min + stepIndex * stepSize));
};

const normalizedValue = computed(() => {
  const value = parseRangeValue(props.modelValue, rangeMin.value);
  return snapToStep(value);
});

const percent = computed(() => getPercentFromValue(normalizedValue.value));

const ticks = computed(() => {
  if (props.tick === false) return [];
  const min = rangeMin.value;
  const max = rangeMax.value;
  const tickStep = props.tick === true ? 1 : parseRangeValue(props.tick, 0);
  if (tickStep <= 0 || max < min) return [min, max];

  const result: number[] = [];
  for (let value = min; value <= max; value += tickStep) {
    result.push(value);
  }

  if (result.at(-1) !== max) {
    result.push(max);
  }

  return result;
});

const displayValue = computed(() => {
  const value = getValueFromPercent(percent.value);
  return `${value}${props.unit || ""}`;
});

const slideRangeAttrs = computed(() => {
  const role = props.role || unref(appState?.role) || "";
  const shape = props.shape || unref(appState?.shape) || "";
  return getSlideRangeAttrs({
    role,
    shape,
    disabled: props.disabled,
    readonly: props.readonly,
  });
});

const trackContainerAttrs = getSlideRangeTrackContainerAttrs();
const trackBodyAttrs = getSlideRangeTrackBodyAttrs();
const trackBackAttrs = getSlideRangeTrackBackAttrs();
const trackFrontAttrs = computed(() => getSlideRangeTrackFrontAttrs({ percent: percent.value }));
const thumbAttrs = computed(() => getSlideRangeThumbAttrs({ percent: percent.value }));
const thumbInnerAttrs = getSlideRangeThumbInnerAttrs();
const tooltipAttrs = getSlideRangeTooltipAttrs();

// Methods
// ----------------------------------------------------------------------------
const tickAttrs = (value: number) => {
  const tickPercent = getPercentFromValue(value);
  return getSlideRangeTickAttrs({
    active: percent.value > tickPercent,
    percent: tickPercent,
  });
};

const getValueFromPercent = (currentPercent: number) => {
  const min = rangeMin.value;
  const max = rangeMax.value;
  const raw = min + (max - min) * (currentPercent / 100);
  return snapToStep(raw);
};

const getPercentFromValue = (value: number) => {
  const min = rangeMin.value;
  const max = rangeMax.value;
  if (max <= min) return 0;
  const p = ((value - min) / (max - min)) * 100;
  return Math.max(0, Math.min(100, p));
};

const showTooltipTemporarily = () => {
  if (tooltipTimeout) clearTimeout(tooltipTimeout);
  isShowTooltip.value = true;
  tooltipTimeout = setTimeout(() => {
    isShowTooltip.value = false;
  }, 300);
};

const emitValueFromPercent = (currentPercent: number) => {
  if (props.disabled || props.readonly) return;
  const value = getValueFromPercent(currentPercent);

  if (value !== props.modelValue) {
    emit("update:modelValue", value);
    emit("change", value);
  }
};

const onTickSelect = (value: number, ev?: Event) => {
  suppressPointerEvent(ev);
  const tickPercent = getPercentFromValue(value);
  emitValueFromPercent(tickPercent);
  showTooltipTemporarily();
};

const onTrackPointerDown = (ev: Event) => {
  if (props.disabled || props.readonly) return;
  suppressPointerEvent(ev);
};

const onThumbPointerDown = (ev: Event) => {
  if (props.disabled || props.readonly) return;
  suppressPointerEvent(ev);
};

const getClientX = (ev: MouseEvent | TouchEvent) => {
  if ("changedTouches" in ev && ev.changedTouches.length > 0) {
    return ev.changedTouches[0].clientX;
  }
  return (ev as MouseEvent).clientX;
};

const onClickPath = (ev: MouseEvent | TouchEvent) => {
  if (props.disabled || props.readonly || !container.value) return;
  suppressPointerEvent(ev);
  const width = container.value.offsetWidth;
  const rect = container.value.getBoundingClientRect();
  const x = getClientX(ev) - rect.left;
  const p = (x / width) * 100;
  emitValueFromPercent(Math.max(0, Math.min(100, p)));
  showTooltipTemporarily();
};

// Lifecycle
// ----------------------------------------------------------------------------
onMounted(() => {
  if (!point.value || !container.value) return;
  gestureCleanup = gesture(
    point.value,
    {
      options: { trackOutsideElement: true },
      beforeEvent(ev: Event) {
        if (props.disabled || props.readonly) return false;
        return true;
      },
      afterEvent(ev?: Event) {
        if (isHorizontalDrag) suppressPointerEvent(ev);
      },
      down({ event }: { event?: Event }) {
        if (props.disabled || props.readonly) return;
        dragStartPercent = percent.value;
        isHorizontalDrag = false;
        suppressPointerEvent(event);
      },
      up({ event }: { event?: Event }) {
        isHorizontalDrag = false;
        isShowTooltip.value = false;
        suppressPointerEvent(event);
      },
      cancel(event?: Event) {
        isHorizontalDrag = false;
        isShowTooltip.value = false;
        suppressPointerEvent(event);
      },
      move({
        initialDirection,
        deltaX,
        event,
      }: {
        initialDirection?: string;
        deltaX: number;
        event?: Event;
      }) {
        if (props.disabled || props.readonly) return;
        if (!isHorizontalDirection(initialDirection)) return;
        if (!container.value) return;

        isHorizontalDrag = true;
        suppressPointerEvent(event);

        const width = container.value.offsetWidth;
        const p = (deltaX / width) * 100;
        const nextPercent = Math.max(0, Math.min(100, dragStartPercent + p));
        emitValueFromPercent(nextPercent);
        if (tooltipTimeout) clearTimeout(tooltipTimeout);
        isShowTooltip.value = true;
      },
    },
    { passive: false, capture: true }
  );
});

onUnmounted(() => {
  if (tooltipTimeout) clearTimeout(tooltipTimeout);
  gestureCleanup?.destroy();
});
</script>
