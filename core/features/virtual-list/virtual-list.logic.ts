import { cssPrefix, cssProperty } from "../../utils";
import {
  VIRTUAL_LIST_MIN_ESTIMATE,
  VIRTUAL_LIST_OVERFLOW_RE,
} from "./virtual-list.constants";
import {
  VirtualListAlign,
  VirtualListAttrOptions,
  VirtualListDirection,
  VirtualListItemAttrOptions,
  VirtualListItemKey,
  VirtualListMetrics,
  VirtualListWindow,
  VirtualListWindowOptions,
} from "./virtual-list.type";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const isVertical = (direction: VirtualListDirection) => direction === "vertical";

const estimateSize = (estimate: number) => Math.max(VIRTUAL_LIST_MIN_ESTIMATE, estimate);

export const getVirtualListItemSize = (
  index: number,
  sizes: Array<number | undefined>,
  estimate: number
) => {
  const size = sizes[index];
  return size != null && size >= 0 ? size : estimateSize(estimate);
};

export const getVirtualListAttrs = (options: VirtualListAttrOptions) => ({
  class: [cssPrefix("virtual-list"), { [options.direction]: true }],
  style: {
    [cssProperty("virtual-list-size")]: `${options.size}px`,
  },
});

export const getVirtualListItemAttrs = (options: VirtualListItemAttrOptions) => ({
  class: [cssPrefix("virtual-list-item")],
  style: {
    [cssProperty("virtual-list-offset")]: `${options.offset}px`,
  },
});

export const getVirtualListItemKey = (
  item: unknown,
  index: number,
  itemKey?: VirtualListItemKey
): PropertyKey => {
  if (typeof itemKey === "function") return itemKey(item, index);
  if (typeof itemKey === "string" && item && typeof item === "object" && itemKey in item) {
    const value = (item as Record<string, unknown>)[itemKey];
    if (typeof value === "string" || typeof value === "number") return value;
  }
  return index;
};

/**
 * Prefix offsets: `offsets[i]` is the start of item `i`, `offsets[count]` is
 * the end of the last item plus a trailing `gap` that callers must subtract.
 */
export const buildVirtualListOffsets = (
  count: number,
  sizes: Array<number | undefined>,
  estimate: number,
  gap: number
): number[] => {
  const n = Math.max(0, count);
  const offsets = new Array<number>(n + 1);
  offsets[0] = 0;
  for (let i = 0; i < n; i++) {
    offsets[i + 1] = offsets[i] + getVirtualListItemSize(i, sizes, estimate) + gap;
  }
  return offsets;
};

export const getVirtualListTotalSize = (offsets: number[], gap: number) => {
  const count = Math.max(0, offsets.length - 1);
  if (count === 0) return 0;
  return Math.max(0, offsets[count] - gap);
};

/** Largest `i` whose item starts at or before `offset`. */
export const findVirtualListIndex = (offsets: number[], offset: number) => {
  const count = Math.max(0, offsets.length - 1);
  if (count <= 0) return 0;

  let lo = 0;
  let hi = count;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (offsets[mid] <= offset) lo = mid + 1;
    else hi = mid;
  }
  return clamp(lo - 1, 0, count - 1);
};

export const getVirtualListWindow = (
  offsets: number[],
  metrics: VirtualListMetrics,
  options: VirtualListWindowOptions
): VirtualListWindow => {
  const count = Math.max(0, offsets.length - 1);
  const gap = count > 0 ? options.gap : 0;
  const size = getVirtualListTotalSize(offsets, gap);
  const overscan = Math.max(0, options.overscan | 0);

  if (count === 0) return { start: 0, end: 0, offset: 0, size: 0 };

  // Scrollport not laid out yet: still emit a spacer so the parent can size,
  // and keep a few items in the DOM so they can be measured.
  if (metrics.viewport <= 0) {
    return { start: 0, end: Math.min(count, Math.max(1, overscan * 2)), offset: 0, size };
  }

  const startOffset = Math.max(0, metrics.scrollOffset);
  const endOffset = startOffset + metrics.viewport;

  let start = findVirtualListIndex(offsets, startOffset);
  let end = findVirtualListIndex(offsets, endOffset) + 1;

  start = Math.max(0, start - overscan);
  end = Math.min(count, end + overscan);
  if (end <= start) end = Math.min(count, start + 1);

  return { start, end, offset: offsets[start] ?? 0, size };
};

export const getVirtualListScrollToOffset = (
  offsets: number[],
  index: number,
  viewport: number,
  align: VirtualListAlign,
  current: number,
  gap: number
) => {
  const count = Math.max(0, offsets.length - 1);
  if (count === 0) return 0;

  const i = clamp(Math.floor(index), 0, count - 1);
  const start = offsets[i];
  const itemSize = offsets[i + 1] - offsets[i] - gap;
  const itemEnd = start + itemSize;
  const maxScroll = Math.max(0, getVirtualListTotalSize(offsets, gap) - Math.max(0, viewport));

  let next = start;
  if (align === "end") next = itemEnd - viewport;
  else if (align === "center") next = start + itemSize / 2 - viewport / 2;
  else if (align === "auto") {
    const viewEnd = current + viewport;
    if (start >= current && itemEnd <= viewEnd) return current;
    next = start < current ? start : itemEnd - viewport;
  }

  return clamp(next, 0, maxScroll);
};

export const getVirtualListMetrics = (
  scrollport: HTMLElement,
  direction: VirtualListDirection
): VirtualListMetrics => {
  const vertical = isVertical(direction);
  return {
    scrollOffset: vertical ? scrollport.scrollTop : scrollport.scrollLeft,
    viewport: vertical ? scrollport.clientHeight : scrollport.clientWidth,
  };
};

export const getVirtualListItemExtent = (element: HTMLElement, direction: VirtualListDirection) =>
  isVertical(direction) ? element.offsetHeight : element.offsetWidth;

/** Closest overflow ancestor — `.t-scrollbar-content` when nested in `t-scrollbar`. */
export const getVirtualListScrollport = (
  element: Element | null,
  direction: VirtualListDirection
): HTMLElement | null => {
  const overflowKey = isVertical(direction) ? "overflowY" : "overflowX";
  let node = element?.parentElement ?? null;

  while (node && node !== document.documentElement) {
    if (VIRTUAL_LIST_OVERFLOW_RE.test(getComputedStyle(node)[overflowKey])) return node;
    node = node.parentElement;
  }

  return null;
};

export const scrollVirtualListTo = (
  scrollport: HTMLElement,
  direction: VirtualListDirection,
  offset: number,
  behavior: ScrollBehavior = "auto"
) => {
  scrollport.scrollTo(
    isVertical(direction) ? { top: offset, behavior } : { left: offset, behavior }
  );
};
