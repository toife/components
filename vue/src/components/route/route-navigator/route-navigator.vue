<style lang="scss" src="@/core/features/route/route-navigator.scss" scoped></style>
<template src="./route-navigator.html"></template>
<script lang="ts" setup>
import { computed, inject, onMounted, onUnmounted, reactive, ref, watch, unref } from "vue";
import {
  gesture,
  type GestureFastPayload,
  type GestureMovePayload,
  type GestureUpPayload,
} from "@toife/gesture";
import { RouteProvider } from "../route-provider";
import { RouteOutlet } from "../route-outlet";
import { useRouter } from "vue-router";
import { clone } from "../route.util";
import {
  ROUTE_NAVIGATOR_DEFAULT_PROPS,
  ROUTE_PROVIDER_STATE_KEY,
  getRouteNavigatorAttrs,
  getRouteNavigatorBackdropAttrs,
  getRouteNavigatorComponentAttrs,
  type RouteNavigatorEvent,
  type RouteNavigatorGesture,
  type RouteNavigatorProps,
  type RouteNavigatorTransformState,
  type RouteProviderState,
  type RouteStack,
} from "@/core";
import type { ProviderStateRefs } from "../../../shared/provider-state";

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
// Max translate offset (%) for the layer behind the active page during swipe.
// Active uses 0–100%; back uses (peek)*(100−percent)/100, so a peek of 40 makes the
// back layer move 2.5× slower than the active layer (parallax). Use 100 for 1:1 motion
// (no edge peek at rest: back starts at -100%).
const BACK_LAYER_PEEK_PCT = -40;

const props = withDefaults(defineProps<RouteNavigatorProps>(), {
  ...ROUTE_NAVIGATOR_DEFAULT_PROPS,
});
const emit = defineEmits<RouteNavigatorEvent>();
const provider = inject<ProviderStateRefs<RouteProviderState>>(ROUTE_PROVIDER_STATE_KEY);
const router = useRouter();

// Reactive state
// ----------------------------------------------------------------------------
const navigatorRef = ref<HTMLElement>();
const ges = ref<unknown>(null);
const transform = reactive<RouteNavigatorTransformState>({
  back: BACK_LAYER_PEEK_PCT,
  prepare: 100,
  active: 0,
  backdrop: 0,
  duration: undefined,
});
const stack = ref<RouteStack[]>([]);
const activeIndex = ref(0);
const backdropIndex = ref(0);

// Computed properties
// ----------------------------------------------------------------------------
const navigatorAttrs = computed(() =>
  getRouteNavigatorAttrs({
    direction: props.direction,
    variant: props.variant,
    moving: transform.active !== 0,
    transform,
  })
);

const componentAttrs = computed(() =>
  getRouteNavigatorComponentAttrs({ direction: props.direction })
);

const backdropAttrs = computed(() =>
  getRouteNavigatorBackdropAttrs({ zIndex: backdropIndex.value * 2 + 99 })
);

const prevPage = computed(() => {
  if (activeIndex.value > 0) {
    return stack.value.at(activeIndex.value - 1) ?? null;
  }
  return null;
});

const isGestureEnabled = computed(() => {
  return props.variant === "swipe" && props.gesture && prevPage.value;
});

// Methods
// ----------------------------------------------------------------------------
const changeRoute = (value: RouteStack[]) => {
  const data = clone(value);

  // Case init
  if (stack.value.length === 0) {
    stack.value = data;
    activeIndex.value = Math.max(0, data.length - 1);
    backdropIndex.value = activeIndex.value;
    return;
  }

  // Case update
  if (stack.value.length === data.length) {
    stack.value = data;
    return;
  }

  // Case Back
  if (data.length < stack.value.length) {
    // Clear gesture freeze (duration:"0s" + mid-swipe active %) so CSS can animate
    transform.duration = undefined;
    transform.active = 0;
    transform.back = BACK_LAYER_PEEK_PCT;
    transform.prepare = 100;
    transform.backdrop = 0;

    activeIndex.value = Math.max(0, data.length - 1);
    backdropIndex.value = activeIndex.value;
    emit("transform", transform);

    setTimeout(() => {
      stack.value = data;
    }, 400);
    return;
  }

  // Case Next
  if (data.length > stack.value.length) {
    stack.value = data;

    setTimeout(() => {
      activeIndex.value = Math.max(0, data.length - 1);
      backdropIndex.value = activeIndex.value;
    }, 50);

    return;
  }
};

/** Finish swipe visually (active → 100%), then navigate back after the transition. */
const commitGestureBack = () => {
  if (activeIndex.value <= 0) return;

  // Match CSS transition so the page eases out instead of snapping
  const durationMs = 250;
  transform.duration = `${durationMs / 1000}s`;
  transform.active = 100;
  transform.back = 0;
  transform.backdrop = 0;
  emit("transform", transform);

  setTimeout(() => goBack(), durationMs);
};

const goBack = () => {
  if (activeIndex.value <= 0) return;
  const prev = stack.value[activeIndex.value - 1];
  if (!prev) return;
  router.back();
};

const resetTransform = () => {
  transform.back = BACK_LAYER_PEEK_PCT;
  transform.prepare = 100;
  transform.active = 0;
  transform.duration = undefined;
  emit("transform", transform);
};

const move = (data: RouteNavigatorGesture) => {
  const width = navigatorRef.value?.offsetWidth ?? 0;
  let activePercent = 0;

  if (props.direction == "left" || props.direction == "right") {
    activePercent = (Math.abs(data.deltaX) / width) * 100;
  } else {
    activePercent = (Math.abs(data.deltaY) / width) * 100;
  }

  transform.back = ((100 - activePercent) * BACK_LAYER_PEEK_PCT) / 100;
  transform.active = activePercent;
  transform.backdrop = 100 - transform.active;
  transform.duration = "0s";

  emit("transform", transform);
};

const up = (data: RouteNavigatorGesture) => {
  const width = navigatorRef.value?.offsetWidth ?? 0;
  let percent = 0;

  if (props.direction == "left" || props.direction == "right") {
    percent = (Math.abs(data.deltaX) / width) * 100;
  } else {
    percent = (Math.abs(data.deltaY) / width) * 100;
  }

  if (percent >= 60) {
    commitGestureBack();
  } else {
    resetTransform();
  }
};

// Lifecycle
// ----------------------------------------------------------------------------
watch(
  () => unref(provider?.stack),
  (value) => {
    changeRoute(value as RouteStack[]);
  }
);

onMounted(() => {
  changeRoute(unref(provider?.stack) as RouteStack[]);

  // Initialize gesture
  ges.value =
    navigatorRef.value &&
    gesture(
      navigatorRef.value,
      {
        options: {
          trackOutsideElement: true,
        },

        beforeEvent(e: Event) {
          const target = e.target as HTMLElement | null;
          const isEditable = target?.closest("input, textarea, select, button, [contenteditable]");
          if (isEditable || !isGestureEnabled.value) return false;
          e.stopPropagation();
          return true;
        },

        fast({ initialDirection }: GestureFastPayload) {
          if (!initialDirection || initialDirection !== props.direction) return;
          commitGestureBack();
        },

        move({ deltaX, deltaY, initialDirection, event }: GestureMovePayload) {
          if (!initialDirection || initialDirection !== props.direction) return;
          if (event.cancelable) event.preventDefault();
          move({ deltaX, deltaY });
        },

        up({ deltaX, deltaY, initialDirection }: GestureUpPayload) {
          if (!initialDirection || initialDirection !== props.direction) return;
          up({ deltaX, deltaY });
        },

        cancel() {
          resetTransform();
        },
      },
      {
        element: { passive: false },
        move: { passive: false },
      }
    );
});

onUnmounted(() => {
  if (ges.value) (ges.value as { destroy: () => void }).destroy();
});
</script>
