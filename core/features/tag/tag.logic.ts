import { cssPrefix } from "../../utils";
import { TagAttrOptions } from "./tag.type";

export const getTagAttrs = (options: TagAttrOptions) => ({
  class: [
    cssPrefix(["layer", "tag"]),
    cssPrefix(["role", options.role + "-" + options.variant]),
    cssPrefix(["shape", options.shape]),
    cssPrefix("tag"),
    cssPrefix(["size", options.size]),
  ],
});
