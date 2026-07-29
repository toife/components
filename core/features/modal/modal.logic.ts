import { cssPrefix } from "../../utils";
import { ModalAttrOptions } from "./modal.type";

export const getModalAttrs = (options: ModalAttrOptions) => ({
  class: [
    cssPrefix(["layer", "modal"]),
    cssPrefix(["role", options.role]),
    cssPrefix(["shape", options.shape]),
    cssPrefix("modal"),
    { fullscreen: options.fullscreen, [options.placement]: true },
    options.className,
  ],
  style: options.style,
});
