import { cssPrefix, cssProperty } from "../../utils";
import {
  RouteNavigatorAttrOptions,
  RouteNavigatorBackdropAttrOptions,
  RouteNavigatorComponentAttrOptions,
  RouteNavigatorGesture,
  RouteNavigatorProps,
} from "./route-navigator.type";

export const getRouteNavigatorTransitionDuration = (
  options: Pick<RouteNavigatorAttrOptions, "variant" | "transform">
): string | undefined => {
  if (options.variant === "none") return "0s";
  if (options.transform.duration !== undefined) return options.transform.duration;
  return options.transform.active > 0 ? "0s" : undefined;
};

/**
 * Progress (%) along the swipe-back axis. Reverse past the start clamps to 0
 * so the active page does not bounce the opposite way.
 */
export const getRouteNavigatorSwipePercent = (
  data: RouteNavigatorGesture,
  direction: RouteNavigatorProps["direction"],
  size: number
): number => {
  if (size <= 0) return 0;

  let delta = 0;
  switch (direction) {
    case "right":
      delta = data.deltaX;
      break;
    case "left":
      delta = -data.deltaX;
      break;
    case "down":
      delta = data.deltaY;
      break;
    case "up":
      delta = -data.deltaY;
      break;
  }

  return (Math.max(0, delta) / size) * 100;
};

export const getRouteNavigatorAttrs = (options: RouteNavigatorAttrOptions) => ({
  class: [
    cssPrefix("route-navigator"),
    options.direction,
    options.variant,
    { moving: options.moving },
  ],
  style: {
    [cssProperty("transform-back")]: options.transform.back + "%",
    [cssProperty("transform-prepare")]: options.transform.prepare + "%",
    [cssProperty("transform-active")]: options.transform.active + "%",
    [cssProperty("transition-duration")]: getRouteNavigatorTransitionDuration(options),
    [cssProperty("percent")]: options.transform.backdrop,
  },
});

export const getRouteNavigatorComponentAttrs = (options: RouteNavigatorComponentAttrOptions) => ({
  class: [cssPrefix("route-navigator-component"), options.direction],
});

export const getRouteNavigatorBackdropAttrs = (options: RouteNavigatorBackdropAttrOptions) => ({
  class: [cssPrefix("route-navigator-backdrop"), cssPrefix(["layer", "backdrop"])],
  style: { zIndex: options.zIndex },
});
