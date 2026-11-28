import { cssPrefix } from "../../utils";
import { BadgeMarkAttrOptions } from "./badge.type";

export const getBadgeAttrs = () => ({
  class: [cssPrefix("badge")],
});

export const getBadgeMarkAttrs = (options: BadgeMarkAttrOptions) => ({
  class: [
    cssPrefix(["layer", "badge"]),
    cssPrefix(["role", options.role + "-" + options.variant]),
    cssPrefix(["shape", options.shape]),
    cssPrefix(["badge", "mark"]),
    cssPrefix(["size", options.size]),
    cssPrefix(["badge", options.placement]),
    { [cssPrefix(["badge", "dot"])]: options.dot },
  ],
});
