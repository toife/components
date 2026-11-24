import { cssPrefix } from "../../utils";
import { BadgeAttrOptions } from "./badge.type";

export const getBadgeAttrs = (options: BadgeAttrOptions) => ({
  class: [
    cssPrefix(["layer", "badge"]),
    cssPrefix(["role", options.role]),
    cssPrefix(["shape", options.shape]),
    cssPrefix("badge"),
    cssPrefix(["size", options.size]),
    { [cssPrefix(["badge", "dot"])]: options.dot },
  ],
});
