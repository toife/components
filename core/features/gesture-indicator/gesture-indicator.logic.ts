import { cssPrefix } from "../../utils";
import { GestureIndicatorAttrOptions } from "./gesture-indicator.type";

export const getGestureIndicatorAttrs = (options: GestureIndicatorAttrOptions) => ({
  class: [
    cssPrefix(["layer", "gesture-indicator"]),
    cssPrefix(["role", options.role]),
    cssPrefix("gesture-indicator"),
    options.placement,
  ],
});
