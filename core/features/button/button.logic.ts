import { cssPrefix } from "../../utils";
import { ButtonAttrOptions } from "./button.type";

export const getButtonAttrs = (options: ButtonAttrOptions) => ({
  class: [
    cssPrefix(["layer", "button"]),
    cssPrefix(["role", options.role + "-" + options.variant]),
    cssPrefix(["shape", options.shape]),
    cssPrefix("button"),
    cssPrefix(["size", options.size]),
    {
      block: options.block,
      shadow: options.shadow,
      focus: options.focus
    },
  ],
});

export const getButtonLoaderAttrs = () => ({
  class: [cssPrefix("loader")],
});
