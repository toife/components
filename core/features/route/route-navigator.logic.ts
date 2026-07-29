import { cssPrefix, cssProperty } from "../../utils";
import {
  RouteNavigatorAttrOptions,
  RouteNavigatorBackdropAttrOptions,
  RouteNavigatorComponentAttrOptions,
} from "./route-navigator.type";

export const getRouteNavigatorTransitionDuration = (
  options: Pick<RouteNavigatorAttrOptions, "variant" | "transform">
): string | undefined => {
  if (options.variant === "none") return "0s";
  if (options.transform.duration !== undefined) return options.transform.duration;
  return options.transform.active > 0 ? "0s" : undefined;
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
