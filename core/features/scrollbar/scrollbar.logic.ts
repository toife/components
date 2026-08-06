import { cssPrefix, cssProperty } from "../../utils";
import { SCROLLBAR_OVERFLOW_EPSILON, SCROLLBAR_WHEEL_LINE } from "./scrollbar.constants";
import {
  ScrollbarAttrOptions,
  ScrollbarAxis,
  ScrollbarAxisGeometry,
  ScrollbarDirection,
  ScrollbarGeometryOptions,
  ScrollbarMetrics,
  ScrollbarThumbAttrOptions,
  ScrollbarTrackAttrOptions,
} from "./scrollbar.type";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const isVertical = (axis: ScrollbarAxis) => axis === "y";

export const getScrollbarAttrs = (options: ScrollbarAttrOptions) => ({
  class: [
    cssPrefix(["layer", "scrollbar"]),
    cssPrefix(["role", options.role]),
    cssPrefix("scrollbar"),
    { visible: options.visible, dragging: options.dragging },
  ],
  style: {
    [cssProperty("scrollbar-size")]: `${options.size}px`,
    [cssProperty("scrollbar-thumb-size")]: `${options.thumbSize}px`,
    // Centers the painted thumb inside the wider gutter.
    [cssProperty("scrollbar-thumb-inset")]:
      `${Math.max(0, (options.size - options.thumbSize) / 2)}px`,
    [cssProperty("scrollbar-thumb-radius")]: `${options.thumbSize / 2}px`,
  },
});

export const getScrollbarContentAttrs = () => ({
  class: [cssPrefix("scrollbar-content")],
});

export const getScrollbarTrackAttrs = (options: ScrollbarTrackAttrOptions) => ({
  class: [
    cssPrefix("scrollbar-track"),
    { [isVertical(options.axis) ? "vertical" : "horizontal"]: true },
  ],
  style: { [cssProperty("scrollbar-inset")]: `${options.inset}px` },
});

export const getScrollbarThumbAttrs = (options: ScrollbarThumbAttrOptions) => ({
  class: [cssPrefix("scrollbar-thumb")],
  style: {
    [cssProperty("scrollbar-thumb-length")]: `${options.length}px`,
    [cssProperty("scrollbar-thumb-offset")]: `${options.offset}px`,
  },
});

/** Hit-testing a press against the thumb needs the class as a selector. */
export const getScrollbarThumbSelector = () => `.${cssPrefix("scrollbar-thumb")}`;

/** Read the scrollport in one go — every number the geometry needs. */
export const getScrollbarMetrics = (element: Element): ScrollbarMetrics => ({
  clientWidth: element.clientWidth,
  clientHeight: element.clientHeight,
  scrollWidth: element.scrollWidth,
  scrollHeight: element.scrollHeight,
  scrollLeft: element.scrollLeft,
  scrollTop: element.scrollTop,
});

/** Is this axis both allowed by `direction` and actually overflowing? */
export const hasScrollbarAxis = (
  axis: ScrollbarAxis,
  direction: ScrollbarDirection,
  metrics: ScrollbarMetrics
) => {
  if (direction === (isVertical(axis) ? "horizontal" : "vertical")) return false;

  const client = isVertical(axis) ? metrics.clientHeight : metrics.clientWidth;
  const scroll = isVertical(axis) ? metrics.scrollHeight : metrics.scrollWidth;

  return scroll - client > SCROLLBAR_OVERFLOW_EPSILON;
};

/**
 * Everything the track and thumb need for one axis. The thumb is the visible
 * share of the content, floored at `minThumb` so long documents keep a grabbable
 * handle.
 */
export const getScrollbarGeometry = (
  axis: ScrollbarAxis,
  metrics: ScrollbarMetrics,
  options: ScrollbarGeometryOptions
): ScrollbarAxisGeometry => {
  const vertical = isVertical(axis);
  const client = vertical ? metrics.clientHeight : metrics.clientWidth;
  const scroll = vertical ? metrics.scrollHeight : metrics.scrollWidth;
  const position = vertical ? metrics.scrollTop : metrics.scrollLeft;

  const track = Math.max(0, client - options.inset);
  const maxScroll = Math.max(0, scroll - client);
  const thumb =
    track && scroll ? Math.min(track, Math.max(options.minThumb, (client / scroll) * track)) : 0;
  const travel = Math.max(0, track - thumb);

  return {
    track,
    thumb,
    travel,
    maxScroll,
    offset: maxScroll ? (position / maxScroll) * travel : 0,
  };
};

/**
 * Scroll offset that centers the thumb on `point`, measured in px from the start
 * of the track — what a click on the empty part of the track jumps to.
 */
export const getScrollbarScrollFromPoint = (geometry: ScrollbarAxisGeometry, point: number) => {
  if (!geometry.travel) return 0;
  const position = clamp(point - geometry.thumb / 2, 0, geometry.travel);
  return (position / geometry.travel) * geometry.maxScroll;
};

/**
 * Scroll offset for a drag that has moved `delta` px since it grabbed the thumb
 * at `origin`. One px of thumb travel is `maxScroll / travel` px of content.
 */
export const getScrollbarScrollFromDelta = (
  geometry: ScrollbarAxisGeometry,
  origin: number,
  delta: number
) => {
  if (!geometry.travel) return origin;
  const value = origin + (delta * geometry.maxScroll) / geometry.travel;
  return clamp(value, 0, geometry.maxScroll);
};

/** Wheel deltas arrive in px, lines or pages depending on the device. */
export const getScrollbarWheelScale = (deltaMode: number, page: number) => {
  if (deltaMode === 1) return SCROLLBAR_WHEEL_LINE;
  if (deltaMode === 2) return page;
  return 1;
};
