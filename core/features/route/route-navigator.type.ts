export type RouteNavigatorVariant = "none" | "swipe" | "fade";

/**
 * Route Navigator Props Type
 */
export type RouteNavigatorProps = {
  direction?: "left" | "right" | "up" | "down";
  variant?: RouteNavigatorVariant;
  keepalive?: boolean;
  gesture?: boolean;
  name?: string;
};

/**
 * Route Navigator Gesture Type
 */
export type RouteNavigatorGesture = {
  deltaX: number;
  deltaY: number;
};

/**
 * Route Navigator Event Type
 */
export type RouteNavigatorEvent = {
  (e: "transform", value: RouteNavigatorTransformState): void;
};

/**
 * Route Navigator Transform State Type
 */
export type RouteNavigatorTransformState = {
  back: number;
  prepare: number;
  active: number;
  backdrop: number;
  duration: string | undefined;
};

export type RouteNavigatorAttrOptions = {
  direction: string;
  variant: RouteNavigatorVariant;
  moving: boolean;
  transform: {
    back: number;
    prepare: number;
    active: number;
    backdrop: number;
    duration?: string;
  };
};
export type RouteNavigatorComponentAttrOptions = { direction: string };
export type RouteNavigatorBackdropAttrOptions = { zIndex: number };
