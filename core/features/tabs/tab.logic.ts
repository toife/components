import { cssPrefix } from "../../utils";
import { TabAttrOptions, TabButtonAttrOptions } from "./tab.type";

export const getTabAttrs = (options: TabAttrOptions) => ({
  class: [cssPrefix("tab"), { active: options.active }],
});

export const getTabButtonAttrs = (options: TabButtonAttrOptions) => ({
  class: [cssPrefix(["shape", options.shape]), cssPrefix(["size", options.size])],
});
