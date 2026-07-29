import { cssPrefix } from "../../utils";
import { DividerAttrOptions } from "./divider.type";

export const getDividerAttrs = (options: DividerAttrOptions) => ({
  class: [
    cssPrefix(["layer", "divider"]),
    cssPrefix(["role", options.role]),
    cssPrefix("divider"),
    { [options.direction]: true },
  ],
});
