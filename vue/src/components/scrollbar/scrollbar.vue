<style lang="scss" src="@/core/features/scrollbar/scrollbar.scss" scoped></style>
<template src="./scrollbar.html"></template>
<script lang="ts" setup>
import {
  computed,
  inject,
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  unref,
  watch,
} from "vue";
import { gesture, type GestureDownPayload, type GestureMovePayload } from "@toife/gesture";
import {
  APP_PROVIDER_STATE_KEY,
  SCROLLBAR_CLICK_AFTER_DRAG,
  SCROLLBAR_DEFAULT_PROPS,
  getScrollbarAttrs,
  getScrollbarContentAttrs,
  getScrollbarGeometry,
  getScrollbarMetrics,
  getScrollbarScrollFromDelta,
  getScrollbarScrollFromPoint,
  getScrollbarThumbAttrs,
  getScrollbarThumbSelector,
  getScrollbarTrackAttrs,
  getScrollbarWheelScale,
  hasScrollbarAxis,
  type AppProviderState,
  type ScrollbarAxis,
  type ScrollbarEvent,
  type ScrollbarMetrics,
  type ScrollbarProps,
} from "@/core";
import type { ProviderStateRefs } from "../../shared/provider-state";

/**
 * Scroll container with an overlay scrollbar. It wraps the content rather than
 * pointing at someone else's element:
 *
 *   <t-scrollbar>
 *     <div>…</div>
 *   </t-scrollbar>
 *
 * The slot scrolls natively inside `.t-scrollbar-content`; the tracks are
 * absolutely positioned siblings drawn over it. Owning the scrollport is what
 * makes the geometry trivial — the tracks are laid out by CSS against the same
 * box that scrolls, so nothing has to be measured per frame and no ancestor's
 * `overflow` can push them out of place.
 *
 * Dragging writes back `scrollTop` / `scrollLeft`, so the browser keeps owning
 * momentum, wheel and keyboard scrolling.
 */

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<ScrollbarProps>(), {
  ...SCROLLBAR_DEFAULT_PROPS,
});
// `scroll` does not bubble, so a wrapper has to forward it or callers lose it.
const emit = defineEmits<ScrollbarEvent>();
const appState = inject<ProviderStateRefs<AppProviderState>>(APP_PROVIDER_STATE_KEY);

// Reactive state
// ----------------------------------------------------------------------------
const content = ref<HTMLElement | null>(null);
const trackY = ref<HTMLElement | null>(null);
const trackX = ref<HTMLElement | null>(null);

const dragging = ref<ScrollbarAxis | null>(null);
const hovered = ref(false);
const scrolling = ref(false);

const metrics = reactive<ScrollbarMetrics>({
  clientWidth: 0,
  clientHeight: 0,
  scrollWidth: 0,
  scrollHeight: 0,
  scrollLeft: 0,
  scrollTop: 0,
});

const sessions: Partial<Record<ScrollbarAxis, { destroy: () => void }>> = {};
let frame = 0;
let hideTimer: ReturnType<typeof setTimeout> | undefined;
let resizeObserver: ResizeObserver | null = null;
let mutationObserver: MutationObserver | null = null;
let dragOrigin = 0;
let dragEndAt = Number.NEGATIVE_INFINITY;
let userSelect = "";

// Computed properties
// ----------------------------------------------------------------------------
const hasVertical = computed(() => hasScrollbarAxis("y", props.direction, metrics));
const hasHorizontal = computed(() => hasScrollbarAxis("x", props.direction, metrics));

/** Gutter the other track needs, so the two thumbs never meet in the corner. */
const inset = (axis: ScrollbarAxis) => {
  const opposite = axis === "y" ? hasHorizontal.value : hasVertical.value;
  return opposite ? props.size : 0;
};

const geometryY = computed(() =>
  getScrollbarGeometry("y", metrics, { inset: inset("y"), minThumb: props.minThumb })
);
const geometryX = computed(() =>
  getScrollbarGeometry("x", metrics, { inset: inset("x"), minThumb: props.minThumb })
);
const geometry = (axis: ScrollbarAxis) => (axis === "y" ? geometryY.value : geometryX.value);

const isVisible = computed(
  () => !props.autoHide || hovered.value || dragging.value !== null || scrolling.value
);

const scrollbarAttrs = computed(() =>
  getScrollbarAttrs({
    role: props.role || unref(appState?.role) || "",
    size: props.size,
    thumbSize: props.thumbSize,
    visible: isVisible.value,
    dragging: dragging.value !== null,
  })
);

const contentAttrs = getScrollbarContentAttrs();
const thumbSelector = getScrollbarThumbSelector();

// Methods
// ----------------------------------------------------------------------------
const trackAttrs = (axis: ScrollbarAxis) => getScrollbarTrackAttrs({ axis, inset: inset(axis) });

const thumbAttrs = (axis: ScrollbarAxis) => {
  const { thumb, offset } = geometry(axis);
  return getScrollbarThumbAttrs({ length: thumb, offset });
};

const trackFor = (axis: ScrollbarAxis) => (axis === "y" ? trackY.value : trackX.value);

const isOnThumb = (target: EventTarget | null) =>
  target instanceof Element && !!target.closest(thumbSelector);

const measure = () => {
  if (!content.value) return;
  Object.assign(metrics, getScrollbarMetrics(content.value));
};

/** Coalesce every source of invalidation into one measure per frame. */
const schedule = () => {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    measure();
  });
};

const reveal = () => {
  if (hideTimer) clearTimeout(hideTimer);
  scrolling.value = true;
  hideTimer = setTimeout(() => {
    scrolling.value = false;
  }, props.hideDelay);
};

/** The global reset may set `scroll-behavior: smooth`; drags must not animate. */
const scrollAxisTo = (axis: ScrollbarAxis, value: number, behavior: ScrollBehavior) => {
  content.value?.scrollTo(axis === "y" ? { top: value, behavior } : { left: value, behavior });
};

const onScroll = (event: Event) => {
  if (!content.value) return;
  metrics.scrollLeft = content.value.scrollLeft;
  metrics.scrollTop = content.value.scrollTop;
  // Content can grow while scrolling (lazy renders); keep the ratio honest.
  schedule();
  reveal();
  emit("scroll", event);
};

/** The tracks sit outside the scrollport, so wheeling over them must forward. */
const onWheel = (event: WheelEvent) => {
  if (!content.value) return;
  const scale = getScrollbarWheelScale(event.deltaMode, content.value.clientHeight);
  event.preventDefault();
  content.value.scrollBy({
    top: event.deltaY * scale,
    left: event.deltaX * scale,
    behavior: "instant",
  });
};

/** Click on the empty part of the track: glide the thumb to where it landed. */
const onTrackClick = (axis: ScrollbarAxis, event: MouseEvent) => {
  if (dragging.value) return;
  if (performance.now() - dragEndAt < SCROLLBAR_CLICK_AFTER_DRAG) return;
  if (isOnThumb(event.target)) return;
  scrollToPoint(axis, event.clientX, event.clientY, "smooth");
};

/** Scroll so the thumb centers on a point given in client coordinates. */
const scrollToPoint = (
  axis: ScrollbarAxis,
  clientX: number,
  clientY: number,
  behavior: ScrollBehavior
) => {
  const track = trackFor(axis);
  if (!track) return;

  const rect = track.getBoundingClientRect();
  const point = axis === "y" ? clientY - rect.top : clientX - rect.left;
  scrollAxisTo(axis, getScrollbarScrollFromPoint(geometry(axis), point), behavior);
};

const startDrag = (axis: ScrollbarAxis, { startX, startY, event }: GestureDownPayload) => {
  if (!content.value) return;

  // Pressing the empty part of the track drags too: jump the thumb under the
  // pointer first, then track from there — the way a native scrollbar behaves.
  if (!isOnThumb(event.target)) {
    scrollToPoint(axis, startX, startY, "instant");
  }

  dragging.value = axis;
  dragOrigin = axis === "y" ? content.value.scrollTop : content.value.scrollLeft;
  // Dragging over text would select it otherwise.
  userSelect = content.value.style.userSelect;
  content.value.style.userSelect = "none";
};

const moveDrag = (axis: ScrollbarAxis, { deltaX, deltaY }: GestureMovePayload) => {
  const delta = axis === "y" ? deltaY : deltaX;
  const value = getScrollbarScrollFromDelta(geometry(axis), dragOrigin, delta);
  scrollAxisTo(axis, value, "instant");
};

const endDrag = () => {
  if (content.value) content.value.style.userSelect = userSelect;
  dragging.value = null;
  // The browser still fires a `click` after the release; remember when so the
  // track handler can ignore it instead of jumping a second time.
  dragEndAt = performance.now();
  reveal();
};

/** Tracks are `v-if`-ed on overflow, so drag binding follows the element. */
const syncTrack = (axis: ScrollbarAxis, element: HTMLElement | null) => {
  sessions[axis]?.destroy();
  delete sessions[axis];
  if (!element) return;

  sessions[axis] = gesture(
    element,
    {
      options: {
        // Thin handle: react to the first pixel, and keep tracking once the
        // pointer wanders off the thumb — that is how native scrollbars feel.
        minMove: 1,
        trackOutsideElement: true,
      },
      down: (payload: GestureDownPayload) => startDrag(axis, payload),
      move: (payload: GestureMovePayload) => {
        payload.event.preventDefault();
        moveDrag(axis, payload);
      },
      up: endDrag,
      cancel: endDrag,
    },
    { move: { passive: false } }
  );
};

/**
 * Watch the scrollport *and* its children: the port keeps its size while the
 * content grows, and `scrollHeight` changes with neither a scroll nor a resize
 * of the port itself (images loading, async renders).
 */
const observeContent = () => {
  if (!content.value || !resizeObserver) return;

  resizeObserver.disconnect();
  resizeObserver.observe(content.value);
  Array.from(content.value.children).forEach((child) => resizeObserver?.observe(child));
};

// Lifecycle
// ----------------------------------------------------------------------------
watch(trackY, (element) => syncTrack("y", element));
watch(trackX, (element) => syncTrack("x", element));

onMounted(() => {
  if (!content.value) return;

  resizeObserver = new ResizeObserver(schedule);
  // No `attributes`: our own inline thumb styles would loop back in here.
  mutationObserver = new MutationObserver(() => {
    observeContent();
    schedule();
  });
  mutationObserver.observe(content.value, {
    childList: true,
    subtree: true,
    characterData: true,
  });
  observeContent();

  window.addEventListener("resize", schedule);

  measure();
  // Fonts, `v-html` and hidden panes settle a tick after mount.
  nextTick(schedule);
});

onUnmounted(() => {
  if (frame) cancelAnimationFrame(frame);
  if (hideTimer) clearTimeout(hideTimer);
  syncTrack("y", null);
  syncTrack("x", null);
  resizeObserver?.disconnect();
  resizeObserver = null;
  mutationObserver?.disconnect();
  mutationObserver = null;
  window.removeEventListener("resize", schedule);
});

defineExpose({
  /** The element that actually scrolls. */
  scrollport: content,
  /** Re-measure after a change no observer can see. */
  update: schedule,
  metrics,
});
</script>
