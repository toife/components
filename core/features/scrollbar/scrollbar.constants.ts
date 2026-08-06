/**
 * Scrollbar Default Props
 */
export const SCROLLBAR_DEFAULT_PROPS = {
  direction: "vertical",
  size: 10,
  thumbSize: 6,
  minThumb: 24,
  autoHide: true,
  hideDelay: 500,
  role: "",
} as const;

/** Overflow of 1px or less is rounding noise, not something worth a scrollbar. */
export const SCROLLBAR_OVERFLOW_EPSILON = 1;

/** `WheelEvent.deltaMode: 1` is lines; browsers expose no size for one. */
export const SCROLLBAR_WHEEL_LINE = 16;

/** A `click` this soon after a drag is that drag's release, not a new click. */
export const SCROLLBAR_CLICK_AFTER_DRAG = 200;
