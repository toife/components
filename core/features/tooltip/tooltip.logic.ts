import { cssPrefix } from "../../utils";
import { TooltipAttrOptions, TooltipContentAttrOptions } from "./tooltip.type";

export const getTooltipAttrs = (options: TooltipAttrOptions) => ({
  class: [
    cssPrefix(["layer", "tooltip"]),
    cssPrefix(["role", options.role]),
    cssPrefix(["shape", options.shape]),
    cssPrefix(["size", options.size]),
    cssPrefix("tooltip"),
    { disabled: options.disabled },
  ],
});

export const getTooltipContentAttrs = (options: TooltipContentAttrOptions) => ({
  class: [cssPrefix("tooltip-content"), options.placement],
});

export const getTooltipTriggerAttrs = () => ({
  class: [cssPrefix("tooltip-trigger")],
});
