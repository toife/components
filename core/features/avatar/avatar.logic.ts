import { cssPrefix, cssProperty } from "../../utils";
import { AvatarAttrOptions } from "./avatar.type";

export const getAvatarAttrs = (options: AvatarAttrOptions) => ({
  class: [
    cssPrefix("avatar"),
    cssPrefix(["layer", "avatar"]),
    cssPrefix(["role", options.role]),
    cssPrefix(["shape", options.shape]),
    { divider: options.divider },
  ],
  style: {
    [cssProperty("width")]: options.size + (typeof options.size === "number" ? "px" : ""),
    backgroundImage: options.src ? `url(${options.src})` : undefined,
  },
});
