/** CSS overflow values that allow scrolling on an axis. */
export const SCROLLABLE_OVERFLOW_VALUES = ["auto", "scroll", "overlay"];

/**
 * Modal Default Props
 */
export const MODAL_DEFAULT_PROPS = {
  backdrop: "display",
  keepalive: true,
  visible: false,
  gesture: true,
  fullscreen: false,
  placement: "bottom",
  indicator: true,
  duration: 200,
  bounce: 0,
} as const;