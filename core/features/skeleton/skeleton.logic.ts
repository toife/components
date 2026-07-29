import { cssPrefix, cssProperty } from "../../utils";
import { SkeletonAttrOptions } from "./skeleton.type";

export const getSkeletonAttrs = (options: SkeletonAttrOptions) => ({
  class: [
    cssPrefix(["layer", "skeleton"]),
    cssPrefix(["role", options.role]),
    cssPrefix(["shape", options.shape]),
    cssPrefix("skeleton"),
  ],
  style: {
    [cssProperty("width")]: options.width + (typeof options.width === "number" ? "px" : ""),
    [cssProperty("height")]: options.height + (typeof options.height === "number" ? "px" : ""),
  },
});
