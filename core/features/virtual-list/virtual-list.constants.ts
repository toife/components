/**
 * Virtual List Default Props
 */
export const VIRTUAL_LIST_DEFAULT_PROPS = {
  estimate: 48,
  overscan: 4,
  gap: 0,
  direction: "vertical",
  measure: true,
} as const;

/** Unmeasured items must not collapse to 0 or the window search cannot move. */
export const VIRTUAL_LIST_MIN_ESTIMATE = 1;

/** Sub-pixel resize noise is not a real size change. */
export const VIRTUAL_LIST_SIZE_EPSILON = 0.5;

export const VIRTUAL_LIST_OVERFLOW_RE = /(auto|scroll|overlay)/;
