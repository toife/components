<style lang="scss" src="@/core/features/virtual-list/virtual-list.scss" scoped></style>
<template src="./virtual-list.html"></template>
<script lang="ts" setup>
import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } from "vue";
import {
  VIRTUAL_LIST_DEFAULT_PROPS,
  VIRTUAL_LIST_SIZE_EPSILON,
  buildVirtualListOffsets,
  getVirtualListAttrs,
  getVirtualListItemAttrs,
  getVirtualListItemExtent,
  getVirtualListItemKey,
  getVirtualListMetrics,
  getVirtualListScrollToOffset,
  getVirtualListScrollport,
  getVirtualListWindow,
  scrollVirtualListTo,
  type VirtualListAlign,
  type VirtualListEvent,
  type VirtualListMetrics,
  type VirtualListProps,
  type VirtualListWindow,
} from "@/core";

/**
 * Windowed list that lives *inside* a scrollport — typically `t-scrollbar`.
 *
 *   <t-scrollbar>
 *     <t-virtual-list :items="rows" item-key="id">
 *       <template #item="{ item }">…</template>
 *     </t-virtual-list>
 *   </t-scrollbar>
 *
 * The root is a spacer whose height (or width) is the sum of item sizes, so the
 * parent still sees the full document and can draw a thumb. Only the visible
 * window plus `overscan` is in the DOM; items are absolutely positioned along
 * that spacer. Native scroll stays on the ancestor — this component does not
 * own overflow.
 */

// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<VirtualListProps>(), {
  ...VIRTUAL_LIST_DEFAULT_PROPS,
});
const emit = defineEmits<VirtualListEvent>();

defineSlots<{
  item(props: { item: unknown; index: number }): unknown;
}>();

// Reactive state
// ----------------------------------------------------------------------------
const root = ref<HTMLElement | null>(null);
const scrollport = ref<HTMLElement | null>(null);
const offsets = ref<number[]>([0]);

const metrics = reactive<VirtualListMetrics>({
  scrollOffset: 0,
  viewport: 0,
});

const windowRange = reactive<VirtualListWindow>({
  start: 0,
  end: 0,
  offset: 0,
  size: 0,
});

const itemEls = new Map<number, HTMLElement>();
let sizes: Array<number | undefined> = [];
let frame = 0;
let portResizeObserver: ResizeObserver | null = null;
let itemObserver: ResizeObserver | null = null;

// Computed properties
// ----------------------------------------------------------------------------
const items = computed(() => props.items ?? []);
const count = computed(() => items.value.length);

const listAttrs = computed(() =>
  getVirtualListAttrs({
    direction: props.direction,
    size: windowRange.size,
  })
);

const visible = computed(() => {
  const list = items.value;
  const offs = offsets.value;
  const entries = [];
  for (let i = windowRange.start; i < windowRange.end; i++) {
    entries.push({
      index: i,
      item: list[i],
      key: getVirtualListItemKey(list[i], i, props.itemKey),
      offset: offs[i] ?? 0,
    });
  }
  return entries;
});

// Methods
// ----------------------------------------------------------------------------
const itemAttrs = (entry: { offset: number }) =>
  getVirtualListItemAttrs({
    direction: props.direction,
    offset: entry.offset,
  });

const setItemRef = (el: unknown, index: number) => {
  const prev = itemEls.get(index);
  if (prev && prev !== el) {
    itemObserver?.unobserve(prev);
    itemEls.delete(index);
  }
  if (el instanceof HTMLElement) {
    itemEls.set(index, el);
    if (props.measure) itemObserver?.observe(el);
  }
};

const sync = () => {
  if (sizes.length > count.value) sizes.length = count.value;

  offsets.value = buildVirtualListOffsets(count.value, sizes, props.estimate, props.gap);
  const next = getVirtualListWindow(offsets.value, metrics, {
    overscan: props.overscan,
    gap: props.gap,
  });
  const rangeChanged = next.start !== windowRange.start || next.end !== windowRange.end;
  Object.assign(windowRange, next);
  if (rangeChanged) emit("visible", { start: next.start, end: next.end });
};

/** Coalesce scroll, resize and size writes into one window per frame. */
const schedule = () => {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    if (scrollport.value) {
      Object.assign(metrics, getVirtualListMetrics(scrollport.value, props.direction));
    }
    sync();
  });
};

const onScroll = () => schedule();

const onItemResize: ResizeObserverCallback = (entries) => {
  if (!props.measure) return;

  let changed = false;
  for (const entry of entries) {
    const element = entry.target;
    if (!(element instanceof HTMLElement)) continue;
    const index = Number(element.dataset.index);
    if (!Number.isFinite(index)) continue;

    const next = getVirtualListItemExtent(element, props.direction);
    const prev = sizes[index];
    if (prev != null && Math.abs(prev - next) < VIRTUAL_LIST_SIZE_EPSILON) continue;
    sizes[index] = next;
    changed = true;
  }
  if (changed) schedule();
};

const unbindScrollport = () => {
  scrollport.value?.removeEventListener("scroll", onScroll);
  portResizeObserver?.disconnect();
  portResizeObserver = null;
  scrollport.value = null;
};

const bindScrollport = () => {
  unbindScrollport();
  if (!root.value) return;

  const port = getVirtualListScrollport(root.value, props.direction);
  if (!port) return;

  scrollport.value = port;
  port.addEventListener("scroll", onScroll, { passive: true });
  portResizeObserver = new ResizeObserver(schedule);
  portResizeObserver.observe(port);
  Object.assign(metrics, getVirtualListMetrics(port, props.direction));
  sync();
};

const scrollToIndex = (index: number, align: VirtualListAlign = "auto") => {
  if (!scrollport.value) return;
  scrollVirtualListTo(
    scrollport.value,
    props.direction,
    getVirtualListScrollToOffset(
      offsets.value,
      index,
      metrics.viewport,
      align,
      metrics.scrollOffset,
      props.gap
    )
  );
};

const scrollToOffset = (offset: number) => {
  if (!scrollport.value) return;
  scrollVirtualListTo(scrollport.value, props.direction, offset);
};

// Lifecycle
// ----------------------------------------------------------------------------
watch(count, schedule);
watch(
  () => [props.estimate, props.gap, props.overscan] as const,
  schedule
);
watch(
  () => props.direction,
  () => nextTick(bindScrollport)
);
watch(
  () => props.measure,
  (measure) => {
    itemEls.forEach((element) => {
      if (measure) itemObserver?.observe(element);
      else itemObserver?.unobserve(element);
    });
    schedule();
  }
);

onMounted(() => {
  itemObserver = new ResizeObserver(onItemResize);
  if (props.measure) itemEls.forEach((element) => itemObserver?.observe(element));
  bindScrollport();
  // Nested layout (t-scrollbar filling a sized parent) can settle a tick later.
  nextTick(bindScrollport);
});

onUnmounted(() => {
  if (frame) cancelAnimationFrame(frame);
  unbindScrollport();
  itemObserver?.disconnect();
  itemObserver = null;
  itemEls.clear();
});

defineExpose({
  /** Ancestor that actually scrolls. */
  scrollport,
  scrollToIndex,
  scrollToOffset,
  /** Recompute the window after a change no observer can see. */
  update: schedule,
  range: windowRange,
});
</script>
