import { cssPrefix, cssProperty } from "../../utils";
import {
  CollapseAttrOptions,
  CollapseContentAttrOptions,
  CollapseTriggerAttrOptions,
} from "./collapse.type";

export const getCollapseAttrs = (options: CollapseAttrOptions) => ({
  class: [
    cssPrefix(["layer", "collapse"]),
    cssPrefix(["role", options.role]),
    cssPrefix("collapse"),
    { open: options.open, disabled: options.disabled },
  ],
});

export const getCollapseTriggerAttrs = (options: CollapseTriggerAttrOptions) => ({
  class: [cssPrefix("collapse-trigger")],
  "aria-expanded": options.open,
  "aria-disabled": options.disabled,
});

export const getCollapseContentAttrs = (options: CollapseContentAttrOptions) => ({
  class: [cssPrefix("collapse-content"), { transition: options.transition }],
  style: {
    [cssProperty("duration")]: options.duration,
    [cssProperty("height")]: options.height,
  },
});

export const getCollapseContentInnerClass = () => cssPrefix("collapse-content-inner");
