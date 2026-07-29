import { cssPrefix, cssProperty } from "../../utils";
import {
  TabsAttrOptions,
  TabsHighlightPosition,
  TabsHighlightPositionOptions,
  TabsHighlightStyleOptions,
} from "./tabs.type";

export const getTabsAttrs = (options: TabsAttrOptions) => ({
  class: [
    cssPrefix(["layer", "tabs"]),
    cssPrefix(["role", options.role + "-" + options.variant]),
    cssPrefix(["shape", options.shape]),
    cssPrefix("tabs"),
    options.placement,
    options.variant,
    { transition: options.transition },
  ],
});

export const getTabsHighlightPosition = (
  options: TabsHighlightPositionOptions
): TabsHighlightPosition => {
  let top = options.top - options.margin[0];
  let left = options.left - options.margin[1];
  let width = options.width + options.margin[1] * 2;
  let height = options.height + options.margin[0] * 2;

  if (options.variant === "underline") {
    if (options.placement.startsWith("top-")) {
      top = height - options.border[0];
    }

    if (options.placement.startsWith("bottom-")) {
      top = 0;
    }

    if (options.placement.startsWith("top-") || options.placement.startsWith("bottom-")) {
      height = options.border[0] + 0.5;

      if (options.border[1]) {
        left += (width - options.border[1]) / 2;
        width = options.border[1];
      }
    }

    if (options.placement.startsWith("left-")) {
      left = width - options.border[0];
    }

    if (options.placement.startsWith("right-")) {
      left = 0;
    }

    if (options.placement.startsWith("left-") || options.placement.startsWith("right-")) {
      width = options.border[0];

      if (options.border[1]) {
        top += (height - options.border[1]) / 2;
        height = options.border[1];
      }
    }
  }

  return { top, left, width, height };
};

export const getTabsHighlightStyle = (options: TabsHighlightStyleOptions) => ({
  [cssProperty("highlight-top")]: typeof options.top === "string" ? options.top : options.top + "px",
  [cssProperty("highlight-left")]: typeof options.left === "string" ? options.left : options.left + "px",
  [cssProperty("highlight-width")]: typeof options.width === "string" ? options.width : options.width + "px",
  [cssProperty("highlight-height")]: typeof options.height === "string" ? options.height : options.height + "px",
  [cssProperty("highlight-space-x")]: (options.marginX > 0 ? options.marginX : 0) + "px",
  [cssProperty("highlight-space-y")]: (options.marginY > 0 ? options.marginY : 0) + "px",
});
