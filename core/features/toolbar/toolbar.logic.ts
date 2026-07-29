import { cssPrefix } from "../../utils";
import { ToolbarAttrOptions } from "./toolbar.type";

export const getToolbarAttrs = (options: ToolbarAttrOptions) => ({
  class: [
    cssPrefix(["layer", "toolbar"]),
    cssPrefix(["role", options.role]),
    cssPrefix("toolbar"),
    options.placement,
    { safe: options.safe, divider: options.divider },
  ],
});
