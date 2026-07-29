/**
 * Present Default Props
 */
export const PRESENT_DEFAULT_PROPS = {
  keepalive: false,
  visible: false,
  backdrop: "display",
  duration: 200,
  placement: "bottom",
  bounce: false,
} as const;

export const PRESENT_DEFAULT_STYLES = {
  backdropTransitionDuration: "0.2s",
  backdropOpacity: undefined,
  presentTransitionDuration: "0.2s",
  presentTranslate: "0px",
  presentOpacity: 1,
} as const;