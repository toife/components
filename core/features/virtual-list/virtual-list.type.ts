export type VirtualListDirection = "vertical" | "horizontal";

export type VirtualListAlign = "start" | "center" | "end" | "auto";

export type VirtualListItemKey = string | ((item: unknown, index: number) => PropertyKey);

export type VirtualListProps = {
  items?: unknown[];
  /** Estimated (or fixed) item size in px along the scroll axis. */
  estimate?: number;
  /** Extra items rendered before and after the viewport. */
  overscan?: number;
  /** Space between items in px. Not applied after the last item. */
  gap?: number;
  direction?: VirtualListDirection;
  /** Measure rendered items and remember their sizes. */
  measure?: boolean;
  /** Field name or getter used as the Vue/Lit item key. Defaults to the index. */
  itemKey?: VirtualListItemKey;
};

export type VirtualListVisibleRange = {
  start: number;
  end: number;
};

export type VirtualListEvent = {
  (e: "visible", range: VirtualListVisibleRange): void;
};

export type VirtualListMetrics = {
  scrollOffset: number;
  viewport: number;
};

/** One window of `items` that should be in the DOM. `end` is exclusive. */
export type VirtualListWindow = {
  start: number;
  end: number;
  /** Offset of `items[start]` from the start of the list. */
  offset: number;
  /** Total size of the list along the scroll axis — what the scrollport must see. */
  size: number;
};

export type VirtualListAttrOptions = {
  direction: VirtualListDirection;
  size: number;
};

export type VirtualListItemAttrOptions = {
  direction: VirtualListDirection;
  offset: number;
};

export type VirtualListWindowOptions = {
  overscan: number;
  gap: number;
};
